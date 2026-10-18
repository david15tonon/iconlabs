<script setup lang="ts">
import { pacing, totalScrollVh } from '~~/content/story-pacing'
import { story, cta } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

/**
 * Récit au scroll — scène épinglée pilotée par une séquence d'images.
 *
 * Deux modes, décidés avant le premier rendu par un script en <head> qui pose
 * `data-story="pinned"` sur <html> :
 *   · sans l'attribut (pas de JS, ou « mouvement réduit » demandé) le bloc est
 *     une suite de sections normales, entièrement lisibles — c'est aussi ce que
 *     voient les moteurs de recherche ;
 *   · avec l'attribut, la scène s'épingle et l'image suit le défilement.
 * Décider en amont évite tout décalage de mise en page à l'hydratation.
 *
 * Le défilement reste natif dans les deux cas : rien n'est détourné.
 */

type Manifest = {
  pattern: string
  count: number
  width: number
  height: number
  poster: string
}

const { tr } = useLocale()

const wrapper = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const copyEls = ref<HTMLElement[]>([])
const bar = ref<HTMLElement | null>(null)
const after = ref<HTMLElement | null>(null)

const manifest = ref<Manifest | null>(null)
const mediaFailed = ref(false)

/* ------------------------------------------------------------- réglages moteur */

const MAX_CONCURRENT = 6        // requêtes réseau simultanées
const AHEAD = 10                // images préchargées dans le sens du défilement
const BEHIND = 4                // images gardées en arrière (retour en arrière)
const MAX_RETRIES = 2
const SEARCH_RADIUS = 30        // rayon de repli si l'image exacte manque

/* État du moteur — volontairement hors de la réactivité Vue : il est touché
   à chaque image et ne doit déclencher aucun rendu de composant. */
const bitmaps = new Map<number, ImageBitmap>()
const inflight = new Map<number, AbortController>()
const attempts = new Map<number, number>()
const dead = new Set<number>()

let maxDecoded = 32
let target = 0
let lastDrawn = -1
let direction = 1
let needsUpdate = true
let running = false
let rafId = 0
let ctx: CanvasRenderingContext2D | null = null
let ro: ResizeObserver | null = null
let io: IntersectionObserver | null = null

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v)

/* Décide du mode avant la première peinture : pas de saut à l'hydratation. */
useHead({
  script: [
    {
      key: 'story-mode',
      innerHTML:
        "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)" +
        "document.documentElement.setAttribute('data-story','pinned')}catch(e){}",
      tagPosition: 'head',
    },
  ],
})

function frameUrl(i: number): string {
  const m = manifest.value
  if (!m) return ''
  return m.pattern.replace(/%0(\d)d/, (_, width) => String(i).padStart(Number(width), '0'))
}

/* ------------------------------------------------------- chargement des images */

function request(i: number) {
  const m = manifest.value
  if (!m || i < 0 || i >= m.count) return
  if (bitmaps.has(i) || inflight.has(i) || dead.has(i)) return
  if (inflight.size >= MAX_CONCURRENT) return

  const controller = new AbortController()
  inflight.set(i, controller)

  fetch(frameUrl(i), { signal: controller.signal, cache: 'force-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(String(res.status))
      return res.blob()
    })
    .then((blob) => createImageBitmap(blob))
    .then((bitmap) => {
      inflight.delete(i)
      // Le défilement a pu partir loin pendant le décodage : si l'image n'est
      // plus dans la fenêtre utile, on la libère immédiatement.
      if (Math.abs(i - target) > AHEAD + BEHIND + 4) {
        bitmap.close()
        pump()
        return
      }
      bitmaps.set(i, bitmap)
      evict()
      needsUpdate = true
      pump()
    })
    .catch((err: unknown) => {
      inflight.delete(i)
      if ((err as Error)?.name === 'AbortError') return
      const n = (attempts.get(i) ?? 0) + 1
      attempts.set(i, n)
      if (n > MAX_RETRIES) {
        dead.add(i)
        // Toute la séquence est muette : on reste sur l'affiche.
        if (dead.size > 8 && bitmaps.size === 0) mediaFailed.value = true
      }
      pump()
    })
}

/** Fenêtre d'images utiles autour de la cible, dans le sens du défilement. */
function window_(): number[] {
  const m = manifest.value
  if (!m) return []
  const want: number[] = [target]
  const forward = direction >= 0 ? AHEAD : BEHIND
  const back = direction >= 0 ? BEHIND : AHEAD
  for (let d = 1; d <= Math.max(forward, back); d++) {
    if (d <= forward && target + d < m.count) want.push(target + d)
    if (d <= back && target - d >= 0) want.push(target - d)
  }
  return want
}

/** Annule ce qui n'est plus utile, puis relance des requêtes par priorité. */
function pump() {
  const want = window_()
  const wanted = new Set(want)
  for (const [i, controller] of inflight) {
    if (!wanted.has(i)) {
      controller.abort()
      inflight.delete(i)
    }
  }
  for (const i of want) {
    if (inflight.size >= MAX_CONCURRENT) break
    request(i)
  }
}

/** Libère les bitmaps les plus éloignés de la cible au-delà du budget mémoire. */
function evict() {
  if (bitmaps.size <= maxDecoded) return
  const byDistance = [...bitmaps.keys()].sort((a, b) => Math.abs(b - target) - Math.abs(a - target))
  for (const i of byDistance) {
    if (bitmaps.size <= maxDecoded) break
    if (i === lastDrawn) continue
    bitmaps.get(i)!.close()
    bitmaps.delete(i)
  }
}

function nearestAvailable(i: number): number {
  if (bitmaps.has(i)) return i
  for (let d = 1; d <= SEARCH_RADIUS; d++) {
    if (bitmaps.has(i - d)) return i - d
    if (bitmaps.has(i + d)) return i + d
  }
  return -1
}

/* ------------------------------------------------------------------- rendu */

function sizeCanvas() {
  const el = canvas.value
  const host = stage.value
  if (!el || !host) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.round(host.clientWidth * dpr)
  const h = Math.round(host.clientHeight * dpr)
  if (el.width !== w || el.height !== h) {
    el.width = w
    el.height = h
    ctx = el.getContext('2d', { alpha: false })
    // Un contexte `alpha: false` naît en noir pur, et redimensionner le canvas
    // le remet à neuf : sans ce premier remplissage, la scène est un aplat noir
    // tant qu'aucune image n'est décodée. Sur fond encre cela ne se voyait pas ;
    // sur papier, c'est tout l'écran.
    if (ctx) {
      ctx.fillStyle = groundColor()
      ctx.fillRect(0, 0, w, h)
    }
    lastDrawn = -1
    needsUpdate = true
  }
  // Moins de mémoire décodée sur petit écran et sur appareil contraint.
  const slim = host.clientWidth < 720 || (navigator as any).deviceMemory <= 4
  maxDecoded = slim ? 16 : 32
}

/* Le sol du canvas vient du token --paper : aucune couleur n'est écrite ici.
   Il doit rester celui des images de la séquence, sans quoi le cadrage
   « cover » borderait la scène d'une bande d'une autre couleur. */
let groundFill = ''
function groundColor(): string {
  if (!groundFill) {
    groundFill = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()
  }
  return groundFill
}

function draw() {
  const el = canvas.value
  const m = manifest.value
  if (!el || !m) return
  if (!ctx) ctx = el.getContext('2d', { alpha: false })
  if (!ctx) return

  const idx = nearestAvailable(target)
  if (idx < 0 || idx === lastDrawn) return
  const bmp = bitmaps.get(idx)!

  // Cadrage « cover » : on remplit la scène sans déformer l'image.
  const sw = bmp.width
  const sh = bmp.height
  const dw = el.width
  const dh = el.height
  const scale = Math.max(dw / sw, dh / sh)
  const w = sw * scale
  const h = sh * scale
  ctx.fillStyle = groundColor()
  ctx.fillRect(0, 0, dw, dh)
  ctx.drawImage(bmp, (dw - w) / 2, (dh - h) / 2, w, h)
  lastDrawn = idx
}

/* ---------------------------------------------- progression et texte au scroll */

function fadeAt(local: number, fade: [number, number, number, number]): number {
  const [i0, i1, o0, o1] = fade
  if (local <= i0 || local >= o1) return 0
  if (local < i1) return (local - i0) / Math.max(1e-6, i1 - i0)
  if (local <= o0) return 1
  return 1 - (local - o0) / Math.max(1e-6, o1 - o0)
}

function update() {
  const w = wrapper.value
  const s = stage.value
  const m = manifest.value
  if (!w || !s) return

  const travel = w.offsetHeight - s.clientHeight
  if (travel <= 0) return
  const p = clamp(-w.getBoundingClientRect().top / travel)

  if (bar.value) bar.value.style.transform = `scaleX(${p.toFixed(4)})`

  // Découpage par battement : chaque battement a sa part de défilement et son
  // propre intervalle d'images, avec éventuellement une image tenue à la fin.
  let acc = 0
  for (let bi = 0; bi < pacing.length; bi++) {
    const beat = pacing[bi]!
    const share = beat.scrollVh / totalScrollVh
    const isLast = bi === pacing.length - 1
    const local = clamp((p - acc) / share)
    const active = p >= acc && (p < acc + share || isLast)

    if (active && m) {
      const motion = clamp(local / beat.motionEnd)
      const [f0, f1] = beat.frames
      const next = Math.round(f0 + motion * (f1 - f0))
      if (next !== target) {
        direction = next >= target ? 1 : -1
        target = next
        pump()
      }
    }

    if (beat.copy !== null) {
      const el = copyEls.value[beat.copy]
      if (el) {
        const o = active ? fadeAt(local, beat.fade) : 0
        el.style.opacity = o.toFixed(3)
        el.style.transform = `translate3d(0, ${((1 - o) * 18).toFixed(2)}px, 0)`
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
      }
    }
    acc += share
  }

  draw()
}

function loop() {
  rafId = requestAnimationFrame(loop)
  if (!needsUpdate) return
  needsUpdate = false
  update()
}

function onScroll() {
  needsUpdate = true
}

function skip() {
  after.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ------------------------------------------------------------ cycle de vie */

onMounted(async () => {
  if (document.documentElement.dataset.story !== 'pinned') return

  try {
    const res = await fetch('/story/manifest.json', { cache: 'force-cache' })
    if (!res.ok) throw new Error(String(res.status))
    manifest.value = await res.json()
  } catch {
    mediaFailed.value = true
    return
  }

  sizeCanvas()
  pump()

  ro = new ResizeObserver(() => {
    sizeCanvas()
    needsUpdate = true
  })
  if (stage.value) ro.observe(stage.value)

  // Le moteur ne tourne que lorsque la scène est à l'écran.
  io = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting)
      if (visible && !running) {
        running = true
        needsUpdate = true
        rafId = requestAnimationFrame(loop)
      } else if (!visible && running) {
        running = false
        cancelAnimationFrame(rafId)
      }
    },
    { rootMargin: '200px 0px' },
  )
  if (wrapper.value) io.observe(wrapper.value)

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  running = false
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  ro?.disconnect()
  io?.disconnect()
  for (const c of inflight.values()) c.abort()
  inflight.clear()
  for (const b of bitmaps.values()) b.close()
  bitmaps.clear()
})
</script>

<template>
  <section id="story" ref="wrapper" class="story" :style="{ '--scroll-vh': totalScrollVh }" aria-label="Icon Labs">
    <div ref="stage" class="stage">
      <!-- Image de secours : visible tant que la séquence n'est pas prête,
           et définitivement si elle ne charge pas. -->
      <img class="poster" src="/story/poster.jpg" alt="" aria-hidden="true" decoding="async" />
      <canvas v-show="!mediaFailed" ref="canvas" class="canvas" aria-hidden="true" />

      <div class="copyLayer">
        <article
          v-for="(scene, i) in story"
          :key="scene.id"
          ref="copyEls"
          class="copy"
        >
          <h2 class="title breaks">{{ tr(scene.heading) }}</h2>
          <p class="lede">{{ tr(scene.body) }}</p>
          <a v-if="scene.action" class="action" href="#contact">
            {{ scene.action === 'call' ? tr(cta.call) : tr(cta.primary) }}
            <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>

      <button class="skipStory" type="button" @click="skip">
        {{ tr({ fr: 'Passer l’animation', en: 'Skip the animation' }) }}
      </button>

      <div class="progress" aria-hidden="true"><i ref="bar" /></div>
    </div>
  </section>
  <div ref="after" class="storyEnd" />
</template>

<style scoped>
/* ------------------------------------------------------------------------
   Mode par défaut : aucune animation. Sections empilées, entièrement
   lisibles — c'est ce que voient les moteurs de recherche, les visiteurs
   sans JavaScript et ceux qui demandent « mouvement réduit ».
   ------------------------------------------------------------------------ */

.story { position: relative; }

.stage { position: relative; }

.poster {
  width: 100%;
  height: clamp(220px, 42vw, 440px);
  object-fit: cover;
  /* Sur fond encre, 0,5 assourdissait l'image ; sur papier, elle n'a presque
     plus rien à perdre — les tracés y disparaîtraient. */
  opacity: 0.85;
}

.canvas { display: none; }

.copyLayer {
  display: grid;
  gap: var(--section);
  padding: var(--section) var(--gutter);
  max-width: var(--maxw);
  margin-inline: auto;
}

/* Le bloc ne se borne plus : c'est le chapô qui porte sa propre mesure
   (`.lede`, 54 ch), et le titre qui règle la sienne par son corps. Un cap
   commun aux deux forçait le titre à se replier sur quatre lignes. */
.copy { max-width: none; }

/* Les titres du récit portent des césures écrites à la main dans
   `content/site.ts`, et la charte impose deux lignes au maximum **à toutes
   les largeurs**. Le corps se règle donc sur la largeur réellement
   disponible — la fenêtre moins les deux gouttières — et non sur la fenêtre :
   mesurée au navigateur, la ligne la plus longue (« La plupart des sites
   sont ») fait 1184 px à 96 px, soit 0,0811 px de large par pixel de corps ; le
   coefficient retenu est 0,0790, une marge de 3 % — à égalité exacte le
   navigateur replie quand même.
   Le plancher est à 2 rem, taille minimale de Syne. */
.title {
  font-size: clamp(2rem, calc(0.0790 * (100vw - 2 * var(--gutter))), 6rem);
  margin: 0 0 1.25rem;
}

/* Bouton plein, et non une boîte contournée de 1 px : l'aplat vermillon est
   l'action principale de l'ouverture. Au survol le fond s'assombrit et le
   texte passe en papier — l'encre ne tient que 3,50 sur `--signal-deep`. */
.action {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
  padding: var(--sp-md) var(--sp-lg);
  background: var(--signal);
  color: var(--ink);
  font-size: var(--fs-sm);
  font-weight: 500;
  transition:
    background var(--duration-press) var(--ease-out),
    color var(--duration-press) var(--ease-out);
}
.action:hover { background: var(--signal-deep); color: var(--paper); }

/* `skipStory`, et non `skip` : `.skip` est l'utilitaire global du lien
   d'évitement (app.vue), qui pose `position:absolute; left:-9999px; top:0;
   z-index:999`. Un style scoped n'annule pas une règle globale de même
   spécificité — le bouton héritait donc de `left:-9999px` et de `top:0`, et
   comme la règle épinglée ci-dessous lui donne `right` et `bottom`, il
   s'étirait en une boîte de dix mille pixels par-dessus tout le récit, à
   z-index 999. Invisible tant que son fond était `none`, mais elle
   interceptait déjà les clics sur le texte et sur le bouton d'appel. */
.skipStory, .progress { display: none; }

/* ------------------------------------------------------------------------
   Ne pas écrire `:global(html[...]) .story` : le compilateur de styles
   scoped ne garde que l'intérieur du `:global()` et jette le descendant —
   la règle atterrit alors sur <html> lui-même. Sans `:global()`, l'attribut
   de portée est posé sur le dernier élément du sélecteur, ce qui est
   précisément le comportement voulu ici.
   ------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------
   Mode cinématique — activé seulement si le visiteur ne demande pas de
   mouvement réduit. Le défilement reste natif : la scène est simplement
   collée (`sticky`) le temps du récit.
   ------------------------------------------------------------------------ */

html[data-story='pinned'] .story {
  height: calc((var(--scroll-vh) + 1) * 100svh);
}

html[data-story='pinned'] .stage {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
  background: var(--paper);
}

html[data-story='pinned'] .poster {
  position: absolute;
  inset: 0;
  height: 100%;
  opacity: 1;
}

html[data-story='pinned'] .canvas {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

html[data-story='pinned'] .copyLayer {
  position: absolute;
  inset: 0;
  display: block;
  padding: 0;
  pointer-events: none;
}

html[data-story='pinned'] .copy {
  position: absolute;
  left: var(--gutter);
  right: var(--gutter);
  bottom: clamp(5rem, 12vh, 9rem);
  /* Aucun cap : les bords gauche et droit sont déjà posés sur les gouttières,
     et c'est le corps du titre qui garantit la règle des deux lignes. Le
     cap précédent (42 rem) la rendait impossible à tenir. */
  opacity: 0;
  visibility: hidden;
  will-change: opacity, transform;
}

/* Le texte reste cliquable et sélectionnable ; seule la couche est neutre. */
html[data-story='pinned'] .copy > * { pointer-events: auto; }

html[data-story='pinned'] .skipStory {
  display: block;
  position: absolute;
  right: var(--gutter);
  bottom: 1.5rem;
  background: var(--paper-raise);
  border: 0;
  color: var(--ink-soft);
  padding: 0.55rem 1rem;
  font-size: var(--fs-xs);
  font-weight: 500;
  cursor: pointer;
  transition: color var(--duration-press) var(--ease-out);
}
html[data-story='pinned'] .skipStory:hover { color: var(--ink); }

html[data-story='pinned'] .progress {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--outline);
}
html[data-story='pinned'] .progress i {
  display: block;
  height: 100%;
  background: var(--signal);
  transform-origin: 0 50%;
  transform: scaleX(0);
}

/* Sur écran étroit le texte remonte : le sujet garde le bas du cadre. */
@media (max-width: 760px) {
  html[data-story='pinned'] .copy {
    bottom: auto;
    top: 14vh;
  }
  html[data-story='pinned'] .skipStory { bottom: 1rem; right: 1rem; }
}
</style>
