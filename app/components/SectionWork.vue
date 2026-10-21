<script setup lang="ts">
import type { T } from '~~/content/site'
import { work, workStatus, casePage, cta, hasCase } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()

/* Depuis la v10 le composant sert DEUX fois, avec le même contenu et deux
 * étendues différentes :
 *   · la home, passe 7 — `index: false`, et seule la grille paraît : ce qui
 *     tourne, montré et ouvrable. Elle remplace la section « témoignages »
 *     qui ne peut pas exister, aucune citation client n'ayant été fournie ;
 *   · la page /cas — la grille PUIS le bloc-index, c'est-à-dire tout.
 * `outbound` dit laquelle des deux destinations la vignette vise : le
 * système en ligne (nouvel onglet) ou la page de cas (interne).
 */
withDefaults(
  defineProps<{
    /** Absent sur /cas : `PageHero` y porte déjà le même titre, et deux
     *  titres identiques à la suite ne sont pas une hiérarchie. */
    intro?: { heading: T; lede: T }
    /** Le bloc-index des réalisations sans capture. Faux sur la home. */
    index?: boolean
    /** La vignette mène au système en ligne plutôt qu'à la page de cas. */
    outbound?: boolean
    /** Bande surélevée. Réglage de voisinage, décidé par la page. */
    raised?: boolean
  }>(),
  { index: true, outbound: false, raised: false },
)

/* La disposition d'awakeagency.dev/#projects, portée sur nos sept clients :
 * une grille décalée pour les quatre mises en avant, puis un bloc-index pour
 * les trois autres, avec la vignette qui suit le curseur.
 *
 * Ce qu'on NE reprend pas, et pourquoi :
 * — pas d'année : nous n'en avons aucune de source sûre, et la colonne de
 *   droite porte donc `catégorie • statut`, qui sont dans le contenu ;
 * — pas de « voir tout » DANS la section : la page /cas EST le voir-tout,
 *   et c'est la home qui y mène.
 *
 * LA RÈGLE DU SURVOL CHANGE EN V10, et pour une raison de matière. La v8
 * l'avait écarté parce qu'une ligne qui ne mène nulle part ne doit pas
 * promettre un clic. Depuis que les pages de cas existent, une ligne qui a
 * sa page MÈNE quelque part : elle devient un lien, et son survol tient sa
 * promesse. Une ligne sans page reste inerte et garde la vignette, qui
 * montre sans promettre. DESIGN.md est corrigé en ce sens.
 *
 * Et les résumés restent, contre la ligne nue de la référence : le chapô de
 * la section promet qu'« il n'y a rien à ouvrir pour le savoir ». Couper les
 * résumés rendrait cette phrase fausse.
 */
/* La mise en avant se DÉDUIT de l'existence d'une capture, elle ne se déclare
 * pas. Un drapeau `featured` posé à la main finissait par mettre en grille des
 * réalisations sans image : trois cases sur quatre affichaient une plaque
 * vide, et une case vide à cet endroit se lit comme une preuve manquante —
 * pire que pas de case du tout. En liant la grille à `shot`, une réalisation y
 * monte le jour où le studio fournit sa capture, et pas avant. */
const featured = computed(() => work.filter((w) => w.shot))
const listed = computed(() => work.filter((w) => !w.shot))

/* La destination d'une ligne : sa page de cas, ou rien. `null` est rendu en
 * `<div>` et pas en lien éteint — un lien qui ne mène nulle part promet un
 * clic qui n'existe pas, et c'est la raison pour laquelle la v8 avait
 * écarté le survol ici. */
const caseLink = (w: typeof work[number]) =>
  hasCase(w) ? localePath(`/cas/${w.slug}`) : null

const board = ref<HTMLElement | null>(null)
const hovered = ref<number | null>(null)
const x = ref(0)
const y = ref(0)

/* La vignette flottante n'est posée que là où elle a un sens. Un pointeur
 * grossier n'a pas de survol — la vignette resterait collée au dernier appui
 * — et en mouvement réduit on ne pose pas l'écouteur **du tout**, plutôt que
 * de poser un écouteur qui ne fait rien : c'est la règle déjà tenue par les
 * passes du premier écran en v8. */
const tracking = ref(false)
onMounted(() => {
  tracking.value =
    matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches
})

/* La moitié de la vignette, en pixels — la même valeur que la largeur et la
 * marge négative posées plus bas en CSS. Elle sert à la borner : sans borne,
 * la vignette dépasse le bord droit du bloc, le document s'élargit de 55 px
 * et un ascenseur horizontal apparaît **pendant le survol** (mesuré :
 * scrollWidth 1495 pour 1440 de fenêtre). Un élément en `position: absolute`
 * qui sort de son conteneur compte bien dans le débordement de la page, et
 * aucun ancêtre ne le coupe ici : `.index` est arrondi mais pas tronqué.
 * On borne plutôt que de couper — la vignette ralentit au bord au lieu
 * d'être rognée. */
const HALF = 110
const HIGH = 82

function track(e: MouseEvent) {
  if (!tracking.value || !board.value) return
  const r = board.value.getBoundingClientRect()
  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max < min ? min : max)
  x.value = clamp(e.clientX - r.left, HALF, r.width - HALF)
  y.value = clamp(e.clientY - r.top, HIGH, r.height - HIGH)
}

function leave() {
  hovered.value = null
}

const peeked = computed(() =>
  hovered.value === null ? null : (listed.value[hovered.value] ?? null),
)
</script>

<template>
  <section id="work" class="section" :class="{ bg: raised }">
    <div class="shell">
      <header v-if="intro" class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(intro.heading) }}</h2>
        <p class="lede">{{ tr(intro.lede) }}</p>
      </header>

      <!-- La grille décalée. Le décalage est écrit par position et non par une
           règle automatique : quatre vignettes, quatre places, et rien qui
           bouge si l'ordre du contenu change. -->
      <ul class="scatter">
        <li v-for="(w, i) in featured" :key="w.name" v-reveal="i * 70">
          <figure>
            <WorkPlate :shot="w.shot" :ink="w.ink" :sector="tr(w.sector)" :name="w.name" />
            <figcaption>
              <span class="cat">{{ tr(w.category) }}</span>
              <h3>{{ w.name }}</h3>
              <!-- Le secteur et la ville existaient dans la liste de la v7 et
                   n'ont nulle part ailleurs où aller : la plaque qui les
                   estampe est `aria-hidden`, donc sans cette ligne ils sortent
                   purement et simplement du contenu pour qui ne voit pas la
                   plaque — et ils disparaissent tout court dès qu'une vraie
                   capture remplace la plaque. -->
              <p class="place">{{ tr(w.sector) }} · {{ tr(w.place) }}</p>
              <p class="summary">{{ tr(w.summary) }}</p>

              <!-- La vignette est MONTRÉE et OUVRABLE, et c'est ce qui en
                   fait une preuve : on peut aller vérifier. Sur la home elle
                   mène au système lui-même, qui répond ; sur /cas elle mène
                   à la page du cas quand elle existe. Aucun des deux liens
                   n'est rendu quand sa destination n'existe pas. -->
              <a
                v-if="outbound && w.href"
                class="open"
                :href="w.href"
                target="_blank"
                rel="noopener"
              >{{ tr(casePage.visit) }}</a>
              <NuxtLink
                v-else-if="!outbound && caseLink(w)"
                class="open"
                :to="caseLink(w)!"
              >{{ tr(cta.seePage) }}</NuxtLink>
            </figcaption>
          </figure>
        </li>
      </ul>

      <!-- Le bloc-index. Une bande surélevée, pas un cadre : le pas de ton
           porte la séparation, la charte n'autorise pas le filet.
           Absent de la home : celle-ci ne montre que ce qui tourne et
           s'ouvre, et renvoie à /cas pour le reste. -->
      <div
        v-if="index"
        ref="board"
        class="index"
        :class="{ lit: hovered !== null }"
        v-reveal="120"
        @mousemove="track"
        @mouseleave="leave"
      >
        <ol>
          <li
            v-for="(w, i) in listed"
            :key="w.name"
            :class="{ away: hovered !== null && hovered !== i }"
            @mouseenter="hovered = i"
          >
            <!-- Une ligne qui a sa page EST un lien ; une ligne qui n'en a
                 pas reste un bloc inerte. Les deux cas sont écrits plutôt
                 que choisis par `:is` : un `<a>` sans `href` n'est pas un
                 lien éteint, c'est un lien cassé pour le clavier. -->
            <NuxtLink v-if="caseLink(w)" class="id linked" :to="caseLink(w)!">
              <h3>{{ w.name }}</h3>
              <p class="place">{{ tr(w.sector) }} · {{ tr(w.place) }}</p>
              <p class="summary">{{ tr(w.summary) }}</p>
            </NuxtLink>
            <div v-else class="id">
              <h3>{{ w.name }}</h3>
              <p class="place">{{ tr(w.sector) }} · {{ tr(w.place) }}</p>
              <p class="summary">{{ tr(w.summary) }}</p>
            </div>
            <p class="meta">
              <span>{{ tr(w.category) }}</span>
              <span class="dot" aria-hidden="true">•</span>
              <span class="status">{{ tr(workStatus[w.status]) }}</span>
            </p>
          </li>
        </ol>

        <!-- Décorative : elle ne porte que ce qui est déjà écrit dans la
             ligne survolée, donc rien ne se perd au clavier ni au doigt. -->
        <div
          v-if="tracking && peeked"
          class="peek"
          :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
          aria-hidden="true"
        >
          <WorkPlate
            :shot="peeked.shot"
            :ink="peeked.ink"
            :sector="tr(peeked.sector)"
            :name="peeked.name"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg { background: var(--ground-raise); }

/* ------------------------------------------------- la grille décalée */

.scatter { list-style: none; display: grid; gap: clamp(3rem, 6vw, 5rem); }

figure { display: grid; gap: 1rem; }
figcaption { display: grid; gap: 0.35rem; }

.cat {
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--on-ground-mute);
}

h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: var(--fs-xl);
  line-height: 1;
  letter-spacing: -0.035em;
}

.summary { color: var(--on-ground-soft); }

/* Le lien sous la légende. Souligné à l'épaisseur du texte, comme tous les
   liens de texte du site — ce n'est pas un filet de séparation. */
.open {
  justify-self: start;
  margin-top: 0.5rem;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--signal-text);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.15rem;
  transition: color var(--duration-press) var(--ease-out);
}
.open::after { content: ' \2192'; }
.open:hover { color: var(--on-ground); }

/* Le lieu se lit sous le nom, en ton sourd : c'est une précision, pas une
   promesse. Même traitement dans la grille et dans l'index — c'est la même
   donnée, elle n'a pas à changer d'allure selon la case où elle tombe. */
.place {
  font-size: var(--fs-xs);
  color: var(--on-ground-mute);
}

@media (min-width: 860px) {
  .scatter { grid-template-columns: repeat(12, 1fr); column-gap: 2rem; }
  /* Quatre places, en zigzag. Les décalages verticaux viennent du contenu
     qu'on veut faire respirer, pas d'un effet : chaque vignette prend sa
     hauteur et la colonne d'en face démarre plus bas.
     Ces règles ne s'appliquent qu'à partir de deux vignettes — `:only-child`
     reprend la main plus bas et l'emporte à nombre de classes égal, étant
     écrit après. */
  .scatter > li:nth-child(1) { grid-column: 1 / span 5; }
  .scatter > li:nth-child(2) { grid-column: 8 / span 5; margin-top: 9rem; }
  .scatter > li:nth-child(3) { grid-column: 2 / span 5; }
  .scatter > li:nth-child(4) { grid-column: 7 / span 5; margin-top: 5rem; }
  .scatter > li:nth-child(3) .summary,
  .scatter > li:nth-child(1) .summary { max-width: 34ch; }

  /* Une seule mise en avant — l'état d'aujourd'hui, un seul client ayant un
     site réellement en ligne. Un zigzag d'un élément n'est pas un zigzag :
     la vignette seule occupe toute la largeur et sa légende se range à
     côté d'elle, sinon elle flotte dans une demi-page vide. */
  .scatter > li:only-child { grid-column: 1 / span 12; margin-top: 0; }
  .scatter > li:only-child figure {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    align-items: center;
    gap: clamp(2rem, 4vw, 3.5rem);
  }
  .scatter > li:only-child .summary { max-width: 42ch; }
}

/* ------------------------------------------------------- le bloc-index */

/* ⚠️ Le bloc-index est en `--ground-raise` : il ne peut donc pas vivre dans
   une section elle-même surélevée, où il se confondrait avec elle. Les deux
   réglages ne se rencontrent jamais — `index` est faux partout où `raised`
   est vrai — et la règle ci-dessous le rend visible au lieu de le supposer. */
.bg .index { background: var(--ground); }

.index {
  position: relative;
  margin-top: clamp(3rem, 6vw, 6rem);
  padding: clamp(1.25rem, 3vw, 2.5rem);
  background: var(--ground-raise);
  border-radius: 20px;
}

.index ol { list-style: none; }

.index li {
  display: grid;
  gap: 0.5rem;
  padding-block: clamp(1.1rem, 2vw, 1.6rem);
  /* La couleur du texte est la seule chose qui change au survol. On ne
     touche pas à `opacity` : elle compose et emporte tout le sous-arbre,
     et un texte dilué n'a plus de contraste mesurable (leçon 2026-10-02).
     `--on-ground-mute` vaut 5,36 sur le clair et 5,68 sur le sombre : la
     ligne en retrait reste au-dessus du seuil, elle n'est pas effacée. */
  transition: color var(--duration-dropdown) var(--ease-out);
}
.index li + li { border-top: 1px solid var(--rule); }

/* La ligne qui mène quelque part. Le bloc entier est la cible : c'est un
   lien de bloc, donc rien ne se souligne — c'est l'encre qui dit, au survol,
   que le clic existe. Le focus clavier, lui, est visible : la règle globale
   de `main.css` pose le contour sur tout élément focalisable. */
.id.linked { color: inherit; }
.lit li:not(.away) .id.linked h3 { color: var(--signal-text); }

.index li h3,
.index li .meta,
.index li .place,
.index li .summary {
  transition: color var(--duration-dropdown) var(--ease-out);
}

/* Le lieu est déjà au ton sourd : la ligne en retrait ne peut pas l'éteindre
   davantage sans passer sous le seuil, elle le laisse donc où il est. */
.away h3,
.away .summary,
.away .meta { color: var(--on-ground-mute); }

/* La ligne survolée reprend l'encre pleine, et son statut passe au bleu —
   le signal de la charte, dans sa variante qui porte le texte sur les deux
   sols. */
.lit li:not(.away) .status { color: var(--signal-text); }

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--on-ground-mute);
}
.dot { color: var(--on-ground-mute); }

@media (min-width: 860px) {
  .index li {
    grid-template-columns: minmax(0, 1fr) 260px;
    align-items: baseline;
    gap: 2rem;
  }
  .index li .id { display: grid; gap: 0.4rem; }
  .meta { justify-content: flex-end; }
}

/* ------------------------------------------------- la vignette au curseur */

/* Posée au point du curseur et recentrée sur lui. `pointer-events: none`
   est obligatoire : sans elle, la vignette passe sous la souris, déclenche
   un `mouseleave` sur la ligne, disparaît, et se remet à clignoter. */
.peek {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  /* 220 de large, 165 de haut (4/3), recentrée sur le curseur. Ces trois
     nombres sont ceux de `HALF` et `HIGH` dans le script : si l'un bouge,
     les deux autres bougent, sinon la borne ne borne plus. */
  width: 220px;
  margin: -82px 0 0 -110px;
  border-radius: 14px;
  overflow: hidden;
  pointer-events: none;
  box-shadow: 0 18px 40px -24px rgb(0 0 0 / 0.45);
}

@media (prefers-reduced-motion: reduce) {
  .peek { display: none; }
}
</style>
