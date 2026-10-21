<script setup lang="ts">
import { methodePage, processSteps, proofsIntro, proofs } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG } from '~/composables/useSiteHead'

definePageMeta({ alias: ['/fr/methode', '/en/methode'] })

const { tr } = useLocale()

/* Les trois engagements, rendus par la même forme que sur /offres : trois
   colonnes de texte sur le sol nu. Ils paraissent ici parce que la méthode
   EST ce qui les rend tenables — le périmètre écrit, la démo hebdomadaire et
   le transfert sont des étapes avant d'être des promesses. */
const proofItems = computed(() => proofs.map((p) => ({ lead: p.title, body: p.body })))

const { url } = useSiteHead({
  title: {
    fr: 'Méthode — Icon Labs',
    en: 'Process — Icon Labs',
  },
  description: methodePage.lede,
})

/* La page décrit un déroulé en quatre étapes : `HowTo` est le seul type qui
   porte cette structure. Les étapes ne sont pas réécrites pour les moteurs,
   elles sont les mêmes qu'à l'écran — sinon la fiche décrirait une méthode
   que la page ne montre pas. */
useJsonLd(() => ({
  '@type': 'HowTo',
  /* Le titre, césure de mise en page retirée : l'étiquette qui servait
     ici n'existe plus, et une fiche ne porte pas de retour à la ligne. */
  name: tr(methodePage.title).replace('\n', ' '),
  description: tr(methodePage.lede),
  url: url.value,
  provider: ORG,
  step: processSteps.map((step, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: tr(step.title),
    text: tr(step.body),
  })),
}))

</script>

<template>
  <PageHero :title="methodePage.title" :lede="methodePage.lede" />

  <section class="section">
    <div class="shell">
      <h2 class="exchange-head" v-reveal>{{ tr(methodePage.exchange.heading) }}</h2>
      <ol class="steps">
        <li v-for="(step, i) in processSteps" :key="step.num" v-reveal="i * 70">
          <span class="num">{{ step.num }}</span>
          <div class="body">
            <h3>{{ tr(step.title) }}</h3>
            <p class="lede">{{ tr(step.body) }}</p>
            <p class="meta label">{{ tr(step.meta) }}</p>

            <dl class="exchange">
              <div>
                <dt>{{ tr(methodePage.exchange.give) }}</dt>
                <dd>{{ tr(methodePage.exchange.rows[i]!.gives) }}</dd>
              </div>
              <div>
                <dt>{{ tr(methodePage.exchange.take) }}</dt>
                <dd>{{ tr(methodePage.exchange.rows[i]!.needs) }}</dd>
              </div>
            </dl>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="section constants">
    <div class="shell">
      <h2 class="head" v-reveal>{{ tr(methodePage.constants.heading) }}</h2>
      <ul>
        <li v-for="(item, i) in methodePage.constants.items" :key="i" v-reveal="i * 70">
          {{ tr(item) }}
        </li>
      </ul>
    </div>
  </section>

  <BlockDifference
    id="engagements"
    :heading="proofsIntro.heading"
    :items="proofItems"
  />

  <BlockCta />
</template>

<style scoped>
/* Les étapes ne sont plus ouvertes par un filet : chacune est un panneau
   blanc sur le papier, et l'ordre se lit par le numéro — c'est un vrai
   `<ol>`, la seule forme sous laquelle la charte admet une numérotation. */
/* Le sur-titre de l'échange. Il est le titre de la section, pas une
   étiquette posée au-dessus d'un titre : la charte vise la seconde, pas le
   premier. */
.exchange-head { font-size: var(--fs-2xl); margin-bottom: clamp(2rem, 4vw, 3rem); }

.steps { list-style: none; display: grid; gap: var(--sp-sm); }
.steps > li {
  display: grid;
  gap: 1rem 3rem;
  background: var(--ground-raise);
  padding: clamp(1.75rem, 3vw, 2.5rem);
}
.num { font-size: var(--fs-xs); font-weight: 500; color: var(--signal-text); }
.steps h3 { font-size: var(--fs-xl); margin-bottom: 0.75rem; }
.steps .lede { font-size: var(--fs-base); color: var(--on-ground-soft); }
.meta { margin-top: 0.6rem; }

.exchange { display: grid; gap: 1.5rem; margin-top: 2rem; }
.exchange dt {
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--signal-text);
  margin-bottom: 0.5rem;
}
.exchange dd { color: var(--on-ground-soft); font-size: var(--fs-sm); max-width: var(--measure); }

/* Bande blanche : le pas de ton remplace le filet qui ouvrait la section et
   ceux qui réglaient la liste. Les constantes sont espacées, pas lignées. */
.constants { background: var(--ground-raise); }
.constants .head { font-size: var(--fs-2xl); margin-bottom: clamp(2rem, 4vw, 3.5rem); }
.constants ul { list-style: none; display: grid; gap: clamp(1rem, 2vw, 1.5rem); }
.constants li {
  font-size: var(--fs-lg);
  max-width: var(--measure-wide);
}

@media (min-width: 820px) {
  .steps > li { grid-template-columns: 6rem 1fr; }
  .exchange { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
}
</style>
