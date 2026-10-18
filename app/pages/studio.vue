<script setup lang="ts">
import { studioPage, team, values, brand } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG } from '~/composables/useSiteHead'

definePageMeta({ alias: ['/fr/studio', '/en/studio'] })

const { tr } = useLocale()

const { url } = useSiteHead({
  title: {
    fr: 'Le studio — Icon Labs',
    en: 'The studio — Icon Labs',
  },
  description: studioPage.lede,
})

/* `AboutPage` : la page parle du studio, elle n'est pas le studio. La fiche
   complète vit sur la home ; on la désigne ici comme sujet. */
useJsonLd(() => ({
  '@type': 'AboutPage',
  name: tr(studioPage.title).replace('\n', ' '),
  description: tr(studioPage.lede),
  url: url.value,
  mainEntity: ORG,
}))

</script>

<template>
  <PageHero :title="studioPage.title" :lede="studioPage.lede" />

  <section class="section">
    <div class="shell inner">
      <div class="prose" v-reveal>
        <p v-for="(para, i) in studioPage.body" :key="i">{{ tr(para) }}</p>
        <p class="origin">{{ tr(brand.origin) }}</p>
      </div>

      <div class="aside" v-reveal="120">
        <h2>{{ tr(studioPage.teamHeading) }}</h2>
        <ul class="team">
          <li v-for="member in team" :key="member.name">
            <strong>{{ member.name }}</strong>
            <span>{{ tr(member.role) }}</span>
          </li>
        </ul>

        <h2 class="second">{{ tr(studioPage.valuesHeading) }}</h2>
        <p class="values">{{ values.map((v) => tr(v)).join(' · ') }}</p>
      </div>
    </div>
  </section>

  <section class="section limits">
    <div class="shell">
      <header v-reveal>
        <h2>{{ tr(studioPage.limits.heading) }}</h2>
        <p class="lede">{{ tr(studioPage.limits.lede) }}</p>
      </header>
      <ul>
        <li v-for="(item, i) in studioPage.limits.items" :key="i" v-reveal="i * 70">
          {{ tr(item) }}
        </li>
      </ul>
    </div>
  </section>

  <BlockCta />
</template>

<style scoped>
.inner { display: grid; gap: clamp(2.5rem, 5vw, 5rem); align-items: start; }
.prose { display: grid; gap: 1.25rem; }
.prose p { color: var(--ink-soft); font-size: var(--fs-lg); max-width: var(--measure); }
.origin {
  color: var(--signal-deep) !important;
  font-size: var(--fs-xs) !important;
  font-weight: 500;
  margin-top: 0.75rem;
}

/* Titres de colonne en casse de phrase : plus de capitales espacées, plus de
   monospace — la charte la réserve au code littéral. */
.aside h2 {
  font-family: var(--text);
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
  color: var(--ink);
  margin-bottom: 1rem;
}
.aside .second { margin-top: 2.5rem; }

/* La liste d'équipe n'est plus réglée par un filet sous chaque ligne, et les
   valeurs ne sont plus des boîtes contournées de 1 px : espace et ton. */
.team { list-style: none; display: grid; gap: 0.85rem; }
.team li {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  justify-content: space-between;
  align-items: baseline;
}
.team strong { font-size: var(--fs-lg); font-weight: 500; }
.team span { font-size: var(--fs-sm); color: var(--ink-mute); }

.values { color: var(--ink-mute); font-size: var(--fs-xs); }

/* Bande blanche : le pas de ton tient la section, les filets ont sauté. */
.limits { background: var(--paper-raise); }
.limits h2 { font-size: var(--fs-2xl); margin-bottom: 1rem; }
.limits header { margin-bottom: clamp(2rem, 4vw, 3.5rem); }
.limits ul { list-style: none; display: grid; gap: clamp(1rem, 2vw, 1.5rem); }
.limits li {
  font-size: var(--fs-lg);
  max-width: var(--measure-wide);
}

@media (min-width: 900px) { .inner { grid-template-columns: 1.3fr 1fr; } }
</style>
