<script setup lang="ts">
import { skills, servicesIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()

/* Les cartes empilées d'awakeagency.dev/#services, portées sur nos six
 * compétences : chaque carte se fige sous la barre et la suivante vient la
 * recouvrir, décalée d'un cran, jusqu'à ce que la pile entière quitte
 * l'écran.
 *
 * Ce qu'on reprend, et ce qu'on traduit dans la langue de la feuille :
 * — la rampe de tons de la référence (#E8E9EB → #DBDCDE…) n'est pas copiée
 *   en valeurs : elle est écrite en `color-mix` de l'encre dans le sol
 *   surélevé, donc elle s'inverse avec le thème — elle fonce sur le clair,
 *   elle éclaircit sur le sombre, et c'est la même rampe dans les deux cas ;
 * — l'appel est une pastille, et c'est un PAS DE TON et non un contour : la
 *   charte ne contourne que les champs de formulaire ;
 * — les deux compétences sans page ne portent pas de pastille du tout. La
 *   référence en met une sur chaque carte ; nous n'avons pas six pages, et
 *   un lien mort est pire qu'un lien absent.
 *
 * Le numéro passe en `--on-ground-soft` et non en `--on-ground-mute` : au
 * bout de la rampe le sol a monté d'un dixième, et le ton sourd y tombe
 * sous le seuil de 4,5. C'est la rampe qui décide, pas l'habitude.
 */
const pad = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="services" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(servicesIntro.heading) }}</h2>
        <p class="lede">{{ tr(servicesIntro.lede) }}</p>
      </header>

      <ul class="stack">
        <li
          v-for="(s, i) in skills"
          :key="s.title.fr"
          class="card"
          :style="{ '--i': i }"
        >
          <div class="inner">
            <p class="n">{{ pad(i) }}</p>
            <h3>{{ tr(s.title) }}</h3>
            <div class="say">
              <p class="body">{{ tr(s.body) }}</p>
              <NuxtLink
                v-if="s.page"
                class="more"
                :to="localePath(`/services/${s.page}`)"
              >
                {{ tr(servicesIntro.more) }}
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
  min-height: clamp(320px, 42vh, 440px);
  align-content: center;
  padding: clamp(1.75rem, 4vw, 3.5rem);
  border-radius: 24px;
  /* Opaque, obligatoirement : c'est ce fond qui cache la carte du dessous
     quand la pile se recouvre. */
  background: var(--ground-raise);
}

/* La rampe. Six crans de 2 points d'encre dans le sol surélevé — la carte 1
   est le sol nu, la carte 6 a monté d'un dixième. Elle s'arrête là : au cran
   suivant le ton sourd passe sous le seuil de contraste, et la rampe n'a pas
   à coûter une classe d'information. */
.card:nth-child(2) .inner { background: color-mix(in oklab, var(--on-ground) 2%,  var(--ground-raise)); }
.card:nth-child(3) .inner { background: color-mix(in oklab, var(--on-ground) 4%,  var(--ground-raise)); }
.card:nth-child(4) .inner { background: color-mix(in oklab, var(--on-ground) 6%,  var(--ground-raise)); }
.card:nth-child(5) .inner { background: color-mix(in oklab, var(--on-ground) 8%,  var(--ground-raise)); }
.card:nth-child(6) .inner { background: color-mix(in oklab, var(--on-ground) 10%, var(--ground-raise)); }

.n {
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  color: var(--on-ground-soft);
}

h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: var(--fs-xl);
  line-height: 1.02;
  letter-spacing: -0.035em;
  max-width: 18ch;
}

/* L'encre tourne de carte en carte, comme elle tournait de bande en bande :
   une classe d'information par encre, et la couleur reste rare. Les grands
   titres seuls la portent.
   Les trois passent par leur variante `-text`, et pas par l'encre pleine : la
   rampe ci-dessus déplace le sol de chaque carte, donc les ratios mesurés
   contre `--ground` ne valent plus ici. Mesuré sur le sombre, `--accent`
   plein sur le sol de la carte 6 tombe à **2,63** — sous les 3,0 d'un grand
   titre — parce que le fond y a monté d'un dixième. C'est la règle déjà
   tenue partout ailleurs : aucune encre n'est écrite en dur, chacune a sa
   variante dont la valeur dépend du thème. */
.card:nth-child(2) h3 { color: var(--signal-text); }
.card:nth-child(4) h3 { color: var(--state-text); }
.card:nth-child(6) h3 { color: var(--accent-text); }

.body {
  color: var(--on-ground-soft);
  max-width: 54ch;
}

/* La pastille. Pas de contour : elle revient au sol de base, sous le sol
   surélevé de la carte — le pas de ton suffit à la détacher, et il se lit
   dans les deux thèmes. Au survol elle prend l'aplat bleu, comme l'appel de
   la barre. */
.more {
  justify-self: start;
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
  h3 { grid-row: 1; }
  .say { grid-row: 1; }

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
