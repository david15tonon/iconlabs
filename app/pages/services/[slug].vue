<script setup lang="ts">
import { servicePages } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG, SITE_URL } from '~/composables/useSiteHead'

definePageMeta({
  alias: ['/fr/services/:slug()', '/en/services/:slug()'],
  /* Une adresse inconnue doit tomber en 404, pas afficher une page vide : sans
     ce garde, `/services/nimporte-quoi` rendrait un squelette sans contenu. */
  validate: (route) => servicePages.some((p) => p.slug === route.params.slug),
})

const route = useRoute()
const { locale, tr } = useLocale()

const page = computed(() => servicePages.find((p) => p.slug === route.params.slug)!)

const { url } = useSiteHead({
  title: {
    fr: `${page.value.nav.fr} — Icon Labs`,
    en: `${page.value.nav.en} — Icon Labs`,
  },
  description: page.value.lede,
})

/* Deux fiches : le service lui-même, et le fil d'Ariane qui le rattache à la
   home. Pas de niveau « Services » entre les deux — cette page d'index
   n'existe pas, et un fil d'Ariane qui pointe vers du vide est une erreur
   signalée comme telle par les moteurs.

   Ni prix ni délai dans la fiche : ce sont des fourchettes dans le texte, et
   un `Offer` chiffré affirmerait plus que ce que le studio s'engage à tenir. */
useJsonLd(() => ({
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${url.value}#service`,
      name: tr(page.value.nav),
      description: tr(page.value.lede),
      url: url.value,
      serviceType: page.value.nav.en,
      provider: ORG,
      areaServed: 'Worldwide',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Icon Labs', item: `${SITE_URL}/${locale.value}` },
        { '@type': 'ListItem', position: 2, name: tr(page.value.nav), item: url.value },
      ],
    },
  ],
}))
</script>

<template>
  <PageHero
    :index="page.index"
    :kicker="page.nav"
    :title="page.title"
    :lede="page.lede"
  />

  <section class="section">
    <div class="shell">
      <ul class="tags" v-reveal>
        <li v-for="tag in page.tags" :key="tag">{{ tag }}</li>
      </ul>

      <h2 class="head" v-reveal="60">{{ tr({ fr: 'Ce que ça comprend', en: 'What it includes' }) }}</h2>
      <ul class="includes">
        <li v-for="(item, i) in page.includes" :key="i" v-reveal="i * 70">
          <h3>{{ tr(item.title) }}</h3>
          <p>{{ tr(item.body) }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section outcome">
    <div class="shell cols">
      <div v-reveal>
        <h2>{{ tr({ fr: 'À la livraison, vous avez', en: 'On delivery, you have' }) }}</h2>
        <ul class="list">
          <li v-for="(item, i) in page.outcome" :key="i">{{ tr(item) }}</li>
        </ul>
      </div>

      <div class="example" v-reveal="120">
        <h2>{{ tr({ fr: 'Un périmètre-type', en: 'A sample scope' }) }}</h2>
        <p>{{ tr(page.example) }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell fit">
      <div v-reveal>
        <h2 class="yes">{{ tr({ fr: 'C’est pour vous si', en: 'This is for you if' }) }}</h2>
        <ul>
          <li v-for="(item, i) in page.fitYes" :key="i">{{ tr(item) }}</li>
        </ul>
      </div>
      <div v-reveal="120">
        <h2 class="no">{{ tr({ fr: 'Ce n’est pas pour vous si', en: 'This is not for you if' }) }}</h2>
        <ul>
          <li v-for="(item, i) in page.fitNo" :key="i">{{ tr(item) }}</li>
        </ul>
      </div>
    </div>
  </section>

  <BlockCta />
</template>

<style scoped>
.tags { list-style: none; display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: clamp(2.5rem, 5vw, 4rem); }
.tags li {
  font-size: var(--fs-xs);
  letter-spacing: 0.1em;
  color: var(--ink-mute);
  border: 1px solid var(--hairline);
  padding: 0.3rem 0.65rem;
}

.head { font-size: var(--fs-2xl); margin-bottom: clamp(1.75rem, 3vw, 3rem); }

.includes { list-style: none; display: grid; border-top: 1px solid var(--hairline); }
.includes li {
  display: grid;
  gap: 0.6rem;
  padding: clamp(1.5rem, 3vw, 2.25rem) 0;
  border-bottom: 1px solid var(--hairline);
}
.includes h3 { font-size: var(--fs-lg); font-weight: 700; }
.includes p { color: var(--ink-soft); max-width: var(--measure-wide); }

.outcome { background: var(--paper-raise); border-block: 1px solid var(--hairline); }
.cols, .fit { display: grid; gap: clamp(2.5rem, 5vw, 5rem); align-items: start; }
.outcome h2, .fit h2 {
  font-family: var(--label);
  font-size: var(--fs-xs);
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}
.outcome h2 { color: var(--ink-mute); }

.list { list-style: none; display: grid; border-top: 1px solid var(--hairline); }
.list li {
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--hairline);
  font-size: var(--fs-lg);
}
.example p { color: var(--ink-soft); max-width: var(--measure); }

.fit ul { list-style: none; display: grid; gap: 1rem; }
.fit li { color: var(--ink-soft); max-width: var(--measure); padding-left: 1.5rem; position: relative; }
.fit li::before { position: absolute; left: 0; top: 0; }
.fit .yes { color: var(--signal-deep); }
.fit .no  { color: var(--ink-mute); }
/* Le signe est décoratif : il double une information déjà portée par le titre
   de colonne, donc il reste hors du flux accessible. */
.fit > div:first-child li::before { content: '\002B'; color: var(--signal-deep); }
.fit > div:last-child  li::before { content: '\2212'; color: var(--ink-mute); }

@media (min-width: 880px) {
  .includes { grid-template-columns: 1fr 1fr; column-gap: clamp(2rem, 5vw, 5rem); }
  .cols { grid-template-columns: 1fr 1fr; }
  .fit { grid-template-columns: 1fr 1fr; }
}
</style>
