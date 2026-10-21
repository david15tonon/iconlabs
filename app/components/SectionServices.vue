<script setup lang="ts">
import type { T } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

/* Les cartes empilées d'awakeagency.dev/#services : chaque carte se fige sous
 * la barre et la suivante vient la recouvrir, décalée d'un cran, jusqu'à ce
 * que la pile entière quitte l'écran.
 *
 * Depuis la v10 elle sert DEUX fois, et c'est la forme qui le justifie :
 * empiler veut dire « une chose à la fois, chacune recouvrant la précédente ».
 *   · les quatre problèmes de la home — quatre objections traitées une par
 *     une, la citation du client puis le système qui y répond ;
 *   · les cinq offres de /offres — une gradation, du gratuit au déploiement.
 * Un `SectionProblems.vue` séparé n'aurait différé que par le contenu.
 *
 * Ce qu'on reprend de la référence, et ce qu'on traduit :
 * — la rampe de tons n'est pas copiée en valeurs : elle est écrite en
 *   `color-mix` de l'encre dans le sol surélevé, donc elle s'inverse avec le
 *   thème — elle fonce sur le clair, elle éclaircit sur le sombre ;
 * — l'appel est une pastille, et c'est un PAS DE TON et non un contour : la
 *   charte ne contourne que les champs de formulaire ;
 * — une carte sans destination ne porte pas de pastille du tout. La
 *   référence en met une partout ; un lien mort est pire qu'un lien absent.
 *
 * LE NUMÉRO EST OPTIONNEL, et c'est une décision, pas un réglage. DESIGN.md
 * interdit le numéro décoratif et n'admet que celui qui dit un ordre réel.
 * Les cinq offres sont une échelle : elles sont numérotées. Les quatre
 * problèmes n'ont pas d'ordre — aucun ne vient « après » un autre — et ils
 * ne le sont donc pas.
 *
 * ⚠️ La rampe s'arrête à cinq cartes. Au sixième cran le sol avait monté
 * d'un dixième et le ton sourd y tombait sous 4,5 (mesuré le 2026-10-20) :
 * la rampe ne coûte pas une classe d'information.
 */
withDefaults(
  defineProps<{
    id?: string
    heading: T
    lede?: T
    items: {
      id?: string
      over?: T
      title: T
      body: T
      meta?: T
      to?: string
      linkLabel?: T
    }[]
    numbered?: boolean
  }>(),
  { numbered: false },
)

const { tr, localePath } = useLocale()
const pad = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section :id="id" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(heading) }}</h2>
        <p v-if="lede" class="lede">{{ tr(lede) }}</p>
      </header>

      <ul class="stack">
        <li
          v-for="(item, i) in items"
          :key="item.title.fr"
          class="card"
          :style="{ '--i': i }"
        >
          <div :id="item.id" class="inner">
            <p v-if="numbered" class="n">{{ pad(i) }}</p>
            <!-- La citation du client, ou le prix. Elle précède le titre dans
                 la carte sans être une étiquette posée au-dessus d'un titre de
                 page : la charte vise le sur-titre de section, pas la voix
                 qu'une carte rapporte. -->
            <p v-if="item.over" class="over">{{ tr(item.over) }}</p>
            <h3>{{ tr(item.title) }}</h3>
            <div class="say">
              <p class="body">{{ tr(item.body) }}</p>
              <p v-if="item.meta" class="meta label">{{ tr(item.meta) }}</p>
              <NuxtLink
                v-if="item.to && item.linkLabel"
                class="more"
                :to="localePath(item.to)"
              >
                {{ tr(item.linkLabel) }}
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* La pile doit être un bloc et non une grille : un élément `sticky` qui est
   lui-même élément de grille est collé dans sa propre zone, c'est-à-dire
   dans sa propre hauteur — il ne bouge jamais. La liste reste donc en flux
   normal, et c'est le `<ul>` qui sert de bloc conteneur au collage. */
.stack { list-style: none; display: block; }

.card {
  position: sticky;
  /* 7,5 rem couvre la barre fixe (logo sur deux lignes + 0,9 rem de part et
     d'autre) et laisse respirer. Le cran de 12 px par carte est ce qui rend
     la pile lisible : on voit combien de cartes sont déjà passées. */
  top: calc(7.5rem + var(--i) * 12px);
  margin-bottom: clamp(1rem, 2vw, 1.75rem);
}
.card:last-child { margin-bottom: 0; }

.inner {
  display: grid;
  gap: 0.75rem;
  /* Mesuré le 2026-10-20 : 386 px de carte pour 176 px de contenu, soit plus
     de la moitié de vide. Le plancher descend à ce qu'il faut pour qu'une
     carte reste une carte, et c'est le contenu qui décide au-delà. */
  min-height: clamp(200px, 26vh, 300px);
  align-content: center;
  padding: clamp(1.75rem, 4vw, 3.5rem);
  border-radius: 24px;
  /* Opaque, obligatoirement : c'est ce fond qui cache la carte du dessous
     quand la pile se recouvre. */
  background: var(--ground-raise);
  /* L'ancre d'une carte (`#sprint`) vise un élément collé sous une barre
     fixe : sans ce décalage, le navigateur l'amène sous la barre. */
  scroll-margin-top: 8rem;
}

/* La rampe. Quatre crans de 2 points d'encre dans le sol surélevé — la carte
   1 est le sol nu, la carte 5 a monté de huit centièmes. Elle s'arrête là :
   au cran suivant le ton sourd passe sous le seuil de contraste. */
.card:nth-child(2) .inner { background: color-mix(in oklab, var(--on-ground) 2%, var(--ground-raise)); }
.card:nth-child(3) .inner { background: color-mix(in oklab, var(--on-ground) 4%, var(--ground-raise)); }
.card:nth-child(4) .inner { background: color-mix(in oklab, var(--on-ground) 6%, var(--ground-raise)); }
.card:nth-child(5) .inner { background: color-mix(in oklab, var(--on-ground) 8%, var(--ground-raise)); }

.n {
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  color: var(--on-ground-soft);
}

/* La voix du client, ou le prix. En ton sourd et en graisse ordinaire : ce
   qui doit être lu en premier reste le titre. */
.over {
  font-size: var(--fs-sm);
  color: var(--on-ground-soft);
  max-width: 46ch;
}

h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: var(--fs-xl);
  line-height: 1.02;
  letter-spacing: -0.035em;
  max-width: 18ch;
}

/* L'encre tourne de carte en carte : une classe d'information par encre, et
   la couleur reste rare. Les grands titres seuls la portent.
   Les trois passent par leur variante `-text`, et pas par l'encre pleine :
   la rampe déplace le sol de chaque carte, donc les ratios mesurés contre
   `--ground` n'y valent plus. */
.card:nth-child(2) h3 { color: var(--signal-text); }
.card:nth-child(3) h3 { color: var(--state-text); }
.card:nth-child(5) h3 { color: var(--accent-text); }

.body {
  color: var(--on-ground-soft);
  max-width: 54ch;
}

/* `--on-ground-soft` et non le ton sourd de `.label`, pour la même raison que
   le numéro : au bout de la rampe le sol a monté de huit centièmes, et
   `--on-ground-mute` (5,36 sur le sol nu) y tombe à **4,31** sur la carte 4 et
   **4,09** sur la carte 5 — sous le seuil, en thème CLAIR seulement, le sombre
   passant sans rien changer. Mesuré le 2026-10-21, et c'est la troisième fois
   que la rampe coûte un ton : dès qu'un composant déplace son propre sol, les
   ratios de la charte ne s'y appliquent plus. */
.meta { margin-top: 0.75rem; color: var(--on-ground-soft); }

/* La pastille. Pas de contour : elle revient au sol de base, sous le sol
   surélevé de la carte — le pas de ton suffit à la détacher, et il se lit
   dans les deux thèmes. */
.more {
  display: inline-block;
  margin-top: 1.25rem;
  padding: 0.65rem 1.25rem;
  border-radius: 40px;
  background: var(--ground);
  color: var(--on-ground);
  font-size: var(--fs-xs);
  font-weight: 500;
  white-space: nowrap;
  transition:
    background var(--duration-press) var(--ease-out),
    color var(--duration-press) var(--ease-out);
}
.more:hover { background: var(--signal); color: var(--on-signal); }

@media (min-width: 900px) {
  .inner {
    grid-template-columns: 56px minmax(0, 1fr) minmax(0, 1fr);
    gap: 1rem 2.5rem;
    align-items: start;
  }
  .n { grid-row: 1; padding-top: 0.6rem; }
  .over { grid-row: 1; grid-column: 2; }
  h3 { grid-row: 2; grid-column: 2; }
  .say { grid-row: 1 / span 2; grid-column: 3; }

  /* Sans numéro, la colonne de 56 px n'a plus de contenu : la carte repasse
     à deux colonnes au lieu de laisser un vide qui ne veut rien dire. */
  .inner:not(:has(.n)) { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .inner:not(:has(.n)) .over { grid-column: 1; }
  .inner:not(:has(.n)) h3 { grid-column: 1; }
  .inner:not(:has(.n)) .say { grid-column: 2; }

  /* Le léger pivot de la référence. Il ne tient qu'ici : sous 900 px la
     carte est haute et étroite, et une rotation y coûte de la largeur pour
     rien. 0,35° sur une carte de 440 px n'ajoute que 2,7 px à l'emprise —
     la gouttière l'absorbe, et le débordement horizontal est vérifié aux
     six largeurs. */
  .card:nth-child(odd)  .inner { transform: rotate(-0.35deg); }
  .card:nth-child(even) .inner { transform: rotate(0.35deg); }
}

/* En mouvement réduit la pile n'a pas lieu : les cartes redeviennent une
   suite, posées l'une sous l'autre, et le pivot tombe avec elle. C'est la
   même règle que les passes du premier écran — on ne pose pas l'effet du
   tout plutôt que de le poser inerte. */
@media (prefers-reduced-motion: reduce) {
  .card { position: static; }
  .card .inner { transform: none; }
}
</style>
