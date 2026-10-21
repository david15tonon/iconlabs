<script setup lang="ts">
import {
  offresPage, offersIntro, offers, nav,
  systems, proofsIntro, proofs,
} from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, priceNode, ORG, SITE_URL } from '~/composables/useSiteHead'

definePageMeta({ alias: ['/fr/offres', '/en/offres'] })

const { locale, tr } = useLocale()

const { url } = useSiteHead({
  title: { fr: 'Offres et tarifs — Icon Labs', en: 'Offers and pricing — Icon Labs' },
  description: offresPage.lede,
})

/* L'échelle dans la pile. Elle EST numérotée, contrairement aux quatre
   systèmes de la home : cinq niveaux sont une gradation, et la charte admet
   la numérotation là où elle dit un ordre réel.
   `over` porte le prix et la durée — ce qu'on veut savoir avant le nom.
   L'ancre `#sprint` est posée sur le niveau mis en avant : c'est la cible du
   lien du pied de page, et elle se déduit de la donnée au lieu d'être un
   index écrit à la main. */
const offerItems = computed(() =>
  offers.map((o) => ({
    id: o.featured ? 'sprint' : undefined,
    over: {
      fr: `${o.price.fr} · ${o.length.fr}`,
      en: `${o.price.en} · ${o.length.en}`,
    },
    title: o.name,
    body: o.body,
    meta: o.who,
  })),
)

const proofItems = computed(() => proofs.map((p) => ({ lead: p.title, body: p.body })))

/* Le catalogue complet, et le fil d'Ariane qui le rattache à la home.
   Les montants sont écrits, chacun dans la forme que schema.org lui réserve
   — `priceNode` tient la distinction entre un prix ferme, un plancher et un
   abonnement, pour que le plancher de 9 000 € ne se lise jamais comme un
   engagement de prix. */
useJsonLd(() => ({
  '@graph': [
    {
      '@type': 'OfferCatalog',
      '@id': `${url.value}#offres`,
      name: tr(offresPage.title).replace('\n', ' '),
      url: url.value,
      provider: ORG,
      itemListElement: offers.map((offer, i) => ({
        '@type': 'Offer',
        position: i + 1,
        name: tr(offer.name),
        description: tr(offer.body),
        ...priceNode(offer.amount),
        itemOffered: { '@type': 'Service', name: tr(offer.name) },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Icon Labs', item: `${SITE_URL}/${locale.value}` },
        /* Le fil d'Ariane porte le NOM DE LA PAGE, pas son titre rédactionnel :
           « Du premier appel au déploiement. » décrit la section, il ne
           nomme pas une étape de navigation. C'est le libellé du menu. */
        { '@type': 'ListItem', position: 2, name: tr(nav[0]!.label), item: url.value },
      ],
    },
  ],
}))
</script>

<template>
  <PageHero :title="offresPage.title" :lede="offresPage.lede" />

  <!-- Les cinq niveaux. La pile qui colle est faite pour une gradation :
       on monte d'un cran à la fois, et chaque carte recouvre la précédente. -->
  <SectionServices
    id="offres"
    :heading="offersIntro.heading"
    :lede="offersIntro.lede"
    :items="offerItems"
    numbered
  />

  <!-- Les quatre systèmes du Sprint. PAS une seconde pile : deux piles qui
       collent à la suite sur la même page ne se distinguent plus l'une de
       l'autre, et celle-ci ne dit aucune gradation — ce sont quatre options
       de même rang, dont on en choisit UNE. Elles sont donc posées à plat. -->
  <section id="systemes" class="section bg">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(offresPage.systemsHeading) }}</h2>
        <p class="lede">{{ tr(offresPage.systemsLede) }}</p>
      </header>

      <ul class="systems">
        <li v-for="(s, i) in systems" :id="s.slug" :key="s.slug" v-reveal="i * 70">
          <!-- La voix du client d'abord : c'est le problème qu'on reconnaît
               avant de reconnaître la solution. -->
          <p class="problem">{{ tr(s.problem) }}</p>
          <h3>{{ tr(s.system) }}</h3>
          <p class="body">{{ tr(s.body) }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Les trois engagements, dans la même forme que les résultats de la
       home : trois colonnes de texte sur le sol nu. -->
  <BlockDifference
    id="engagements"
    :heading="proofsIntro.heading"
    :items="proofItems"
  />

  <BlockCta />
</template>

<style scoped>
/* Bande surélevée : la pile qui précède est sur le sol nu, et deux sections
   voisines ne partagent jamais la même composition. */
.bg { background: var(--ground-raise); }

.systems {
  list-style: none;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
}
.systems > li {
  display: grid;
  align-content: start;
  gap: 0.6rem;
  /* L'ancre d'un système (`/offres#agent-whatsapp`) vise un élément sous une
     barre fixe : sans ce décalage, le navigateur l'amène dessous. */
  scroll-margin-top: 8rem;
}

/* La citation du client. Elle ouvre le bloc sans être une étiquette posée
   au-dessus d'un titre : c'est une voix rapportée, pas un sur-titre. */
.problem {
  font-size: var(--fs-sm);
  color: var(--on-ground-soft);
  max-width: var(--measure);
}

.systems h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: var(--fs-lg);
  line-height: 1.05;
  letter-spacing: -0.025em;
}
/* L'encre tourne d'un système à l'autre, par sa variante `-text` : Automation
   Green plein ne vaut que 2,54 sur le sol clair. */
.systems > li:nth-child(1) h3 { color: var(--signal-text); }
.systems > li:nth-child(2) h3 { color: var(--state-text); }
.systems > li:nth-child(3) h3 { color: var(--accent-text); }

.systems .body { color: var(--on-ground-soft); max-width: var(--measure); }

@media (min-width: 900px) {
  .systems { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 5vw, 5rem); }
}
</style>
