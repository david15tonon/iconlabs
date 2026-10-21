<script setup lang="ts">
import { hero } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, locale } = useLocale()

/* La profondeur du dernier mot est ABSOLUE dans le contenu (58 px sous le
 * papier), mais le `<em>` qui le porte est imbriqué dans la dernière ligne,
 * qui descend déjà de la sienne : les deux transformations se composent.
 * On retranche donc la profondeur de la ligne hôte, sinon le mot descendrait
 * de 84 px au lieu de 58 et la troisième passe doublerait la deuxième.
 * Le contenu reste lisible tel qu'il est écrit — c'est le composant qui sait
 * qu'il imbrique, pas le fichier de contenu. */
const lastDepth = computed(() => {
  const host = hero.lines[hero.lines.length - 1]
  return hero.lastWord.depth - (host?.depth ?? 0)
})

/* LE MOUVEMENT DE LA DIRECTION — les passes se séparent au défilement.
 *
 * Une feuille sérigraphiée est imprimée en plusieurs passes d'encre sur le
 * même papier ; ici elles se décollent les unes des autres quand on quitte le
 * premier écran. Chaque ligne du titre porte une encre et une profondeur
 * distinctes, et c'est tout : une seule intention de mouvement par page, ce
 * que demande DESIGN.md § Motion.
 *
 * Les repères de calage, eux, NE BOUGENT PAS. Ils sont la presse, pas l'encre
 * — c'est leur immobilité qui rend la séparation lisible.
 *
 * Contraintes tenues : rien que `transform`, une écriture par trame via
 * `requestAnimationFrame`, et pas d'écouteur du tout quand le visiteur
 * demande un mouvement réduit. */
const sheet = ref<HTMLElement | null>(null)

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let frame = 0
  const onScroll = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      const el = sheet.value
      if (!el) return
      /* 0 au repos, 1 quand la feuille a entièrement quitté l'écran. */
      const p = Math.min(Math.max(window.scrollY / el.offsetHeight, 0), 1)
      el.style.setProperty('--p', String(p))
    })
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (frame) cancelAnimationFrame(frame)
  })
})
</script>

<template>
  <section ref="sheet" class="sheet" aria-labelledby="sheet-title">
    <!-- Les repères de calage. Décalés de 2 px et dépareillés par encre :
         c'est le décalage qui prouve les passes. Décoratifs pour une liseuse
         d'écran, donc masqués. -->
    <span class="reg b" aria-hidden="true" />
    <span class="reg p" aria-hidden="true" />
    <span class="reg g" aria-hidden="true" />

    <div class="shell grid">
      <!-- La phrase de positionnement, découpée en trois passes d'encre.
           Le dernier mot porte la troisième encre : il est la dernière passée,
           celle qui se décolle le plus. Il est accroché à la DERNIÈRE ligne
           et non à une ligne reconnue par son texte — la v9 testait
           `line.fr === 'en '`, ce qui liait le gabarit à une césure. -->
      <h1 id="sheet-title">
          <span
            v-for="(line, i) in hero.lines"
            :key="line.fr"
            class="line"
            :class="`ink-${line.ink}`"
            :style="{ '--depth': line.depth }"
          >{{ i === hero.lines.length - 1 ? `${line[locale]} ` : line[locale] }}<em
            v-if="i === hero.lines.length - 1"
            :class="`ink-${hero.lastWord.ink}`"
            :style="{ '--depth': lastDepth }"
          >{{ hero.lastWord[locale] }}</em></span>
      </h1>

      <div class="col">
        <p class="body">{{ tr(hero.body) }}</p>
      </div>

      <!-- Le bloc de dates d'une affiche de concert, à sa place sur la
           feuille. Extrait en `PriceBlock` le 2026-10-21 : la carte Sprint de
           l'offre a exactement la même forme, et il n'y a pas deux endroits
           où la corriger. Il mène maintenant à /contact, qui est une page
           depuis la v10 et non plus une section de celle-ci. -->
      <aside class="booking">
        <PriceBlock
          :heading="hero.booking.heading"
          :note="hero.booking.note"
          :rows="hero.booking.rows"
          :action="hero.booking.action"
          to="/contact"
        />
      </aside>

      <!-- Le colophon se signe au pied de la feuille. DESIGN.md interdit
           l'étiquette posée au-dessus d'un titre. -->
      <p class="colophon">
        <span v-for="c in hero.colophon" :key="c.fr">{{ tr(c) }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.sheet {
  position: relative;
  /* L'en-tête est fixe et haut de 106 px au bureau (le mot-image est sur deux
     lignes) : la marge haute lui laisse sa place, sinon le titre démarre
     dessous. Même valeur que PageHero, pour que la home et les pages internes
     ouvrent au même endroit. */
  padding-block: clamp(7rem, 5rem + 7vw, 10rem) clamp(3rem, 5vw, 4rem);
}

/* Une croix par encre, 26 px, filet de 1 px. Posées aux angles d'une passe,
   jamais au milieu, et jamais plus de quatre par écran. */
.reg {
  position: absolute;
  width: 26px;
  height: 26px;
  pointer-events: none;
}
.reg::before, .reg::after { content: ''; position: absolute; background: currentColor; }
.reg::before { left: 50%; top: 0; width: 1px; height: 100%; }
.reg::after { top: 50%; left: 0; height: 1px; width: 100%; }
/* Posées sous la barre fixe, et non derrière elle. */
.reg.b { color: var(--signal); left: 18px;  top: clamp(5rem, 3.5rem + 5vw, 7rem); }
.reg.p { color: var(--accent); left: 20px;  top: calc(clamp(5rem, 3.5rem + 5vw, 7rem) + 2px); }
.reg.g { color: var(--state-text);  right: 18px; top: clamp(5rem, 3.5rem + 5vw, 7rem); }

.grid { display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }

/* Le titre prend TOUTE la feuille, et non une colonne de gauche : « EN
   PRODUCTION. » mesure 11,6 em, soit 1210 px au corps de 104 px, quand une
   colonne amputée du bloc d'affiche n'en offre que 938. DESIGN.md demande de
   laisser le titre aller jusqu'au bout — c'est donc le bloc d'affiche qui
   descend d'un cran, pas le corps qui se rabote. Le texte et le bloc se
   partagent la ligne suivante, comme sur une affiche où la manchette barre
   la feuille et le bloc de dates se pose dessous à droite. */
@media (min-width: 1000px) {
  .grid { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; }
  h1, .colophon { grid-column: 1 / -1; }
  .col { padding-top: 0.4rem; }
}

/* `--fs-2xl` et non `--fs-3xl` depuis la v10. « De l'idée / au système / en
   production. » faisait trente signes ; la phrase de positionnement en fait
   une centaine, et à 104 px elle ne tient sur aucun écran. La règle est
   réécrite dans DESIGN.md, elle n'est pas contournée en silence. */
h1 {
  font-size: var(--fs-2xl);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  text-wrap: initial;        /* les césures sont écrites, pas équilibrées */
}
/* Chaque ligne descend d'autant que sa profondeur, proportionnellement au
   défilement. Le papier qui traverse ne bouge pas (`--depth: 0`) : c'est le
   fond de la feuille, et les encres se décollent de lui. */
.line {
  display: block;
  transform: translate3d(0, calc(var(--p, 0) * var(--depth, 0) * 1px), 0);
  will-change: transform;
}
.ink-paper  { color: var(--on-ground); }
.ink-signal { color: var(--signal); margin-left: 0.06em; }
/* `--state-text` et non `--state` : Automation Green ne vaut que 2,54 sur le
   sol clair, sous le seuil même pour du grand texte. La variante suit le
   thème — elle vaut #10B981 sur le sombre, #0A7D58 sur le clair.

   `inline-block` est nécessaire, pas cosmétique : une transformation ne
   s'applique pas à une boîte en ligne, et ce mot est la troisième passe —
   celle qui se décolle le plus.

   ⚠️ CONSÉQUENCE : un `inline-block` établit un conteneur de bloc, et une
   espace en TÊTE d'un conteneur de bloc est supprimée au repli. L'espace qui
   sépare ce mot de la ligne qui le précède est donc écrite dans le texte
   HÔTE (voir le gabarit), jamais devant le mot — sinon on lit
   « SEMAINES,À PRIX FIXE. », et une marge CSS ne la rétablirait qu'à l'œil :
   le texte copié et la liseuse d'écran resteraient collés. */
.ink-state {
  color: var(--state-text);
  font-style: normal;
  display: inline-block;
  transform: translate3d(0, calc(var(--p, 0) * var(--depth, 0) * 1px), 0);
  will-change: transform;
}

.body {
  color: var(--on-ground-soft);
  max-width: var(--measure-wide);
}
/* Le bloc d'affiche. Sa forme vit dans `PriceBlock` ; il ne reste ici que
   sa place sur la feuille. */
.booking { margin-top: 0.25rem; }

.colophon {
  margin-top: clamp(2rem, 4vw, 3rem);
  padding-top: 1rem;
  border-top: 1px solid var(--rule);
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 2.5rem;
  justify-content: space-between;
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  color: var(--on-ground-mute);
  text-transform: uppercase;
}
</style>
