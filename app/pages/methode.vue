<script setup lang="ts">
import { methodePage, processSteps } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG } from '~/composables/useSiteHead'

definePageMeta({ alias: ['/fr/methode', '/en/methode'] })

const { tr } = useLocale()

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
      <ol class="steps">
        <li v-for="(step, i) in processSteps" :key="step.num" v-reveal="i * 70">
          <span class="num">{{ step.num }}</span>
          <div class="body">
            <h2>{{ tr(step.title) }}</h2>
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

  <BlockCta />
</template>

<style scoped>
/* Les étapes ne sont plus ouvertes par un filet : chacune est un panneau
   blanc sur le papier, et l'ordre se lit par le numéro — c'est un vrai
   `<ol>`, la seule forme sous laquelle la charte admet une numérotation. */
.steps { list-style: none; display: grid; gap: var(--sp-sm); }
.steps > li {
  display: grid;
  gap: 1rem 3rem;
  background: var(--paper-raise);
  padding: clamp(1.75rem, 3vw, 2.5rem);
}
.num { font-size: var(--fs-xs); font-weight: 500; color: var(--signal-deep); }
.steps h2 { font-size: var(--fs-xl); margin-bottom: 0.75rem; }
.steps .lede { font-size: var(--fs-base); color: var(--ink-soft); }
.meta { margin-top: 0.6rem; }

.exchange { display: grid; gap: 1.5rem; margin-top: 2rem; }
.exchange dt {
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--signal-deep);
  margin-bottom: 0.5rem;
}
.exchange dd { color: var(--ink-soft); font-size: var(--fs-sm); max-width: var(--measure); }

/* Bande blanche : le pas de ton remplace le filet qui ouvrait la section et
   ceux qui réglaient la liste. Les constantes sont espacées, pas lignées. */
.constants { background: var(--paper-raise); }
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
