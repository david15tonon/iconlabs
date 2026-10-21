<script setup lang="ts">
import { casPage, work, hasCase } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG, SITE_URL } from '~/composables/useSiteHead'

definePageMeta({ alias: ['/fr/cas', '/en/cas'] })

const { locale, tr } = useLocale()

const { url } = useSiteHead({
  title: { fr: 'Cas clients — Icon Labs', en: 'Case studies — Icon Labs' },
  description: casPage.lede,
})

/* La liste des réalisations pour les moteurs. Elle porte les SEPT clients et
   non les seules pages de cas : la ligne d'un client sans page contient déjà
   son résumé complet, et la masquer donnerait d'un studio de sept clients
   l'image d'un studio d'un seul.
   `url` n'est posé que là où une page existe — un lien vers une adresse qui
   tombe en 404 est une erreur signalée comme telle. */
useJsonLd(() => ({
  '@graph': [
    {
      '@type': 'ItemList',
      '@id': `${url.value}#cas`,
      name: tr(casPage.title).replace('\n', ' '),
      url: url.value,
      numberOfItems: work.length,
      itemListElement: work.map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: w.name,
        description: tr(w.summary),
        ...(hasCase(w) ? { url: `${SITE_URL}/${locale.value}/cas/${w.slug}` } : {}),
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Icon Labs', item: `${SITE_URL}/${locale.value}` },
        { '@type': 'ListItem', position: 2, name: tr(casPage.title).replace('\n', ' '), item: url.value },
      ],
    },
  ],
  provider: ORG,
}))
</script>

<template>
  <PageHero :title="casPage.title" :lede="casPage.lede" />

  <!-- Sans `intro` : `PageHero` porte déjà ce titre. La grille montre ce qui
       a une capture, le bloc-index porte tout le reste, et chaque ligne
       contient son résumé complet — c'est la promesse du chapô. -->
  <SectionWork />

  <!-- Pourquoi certaines lignes s'ouvrent et d'autres non. Sans cette
       explication, une seule ligne cliquable sur sept se lit comme six liens
       cassés ; avec elle, c'est une règle annoncée. -->
  <section class="section bg">
    <div class="shell">
      <div class="note" v-reveal>
        <h2>{{ tr(casPage.noteHeading) }}</h2>
        <p>{{ tr(casPage.note) }}</p>
      </div>
    </div>
  </section>

  <BlockCta />
</template>

<style scoped>
.bg { background: var(--ground-raise); }

.note { display: grid; gap: 1rem; }
.note h2 { font-size: var(--fs-lg); }
.note p { color: var(--on-ground-soft); max-width: var(--measure-wide); }

@media (min-width: 900px) {
  .note { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: clamp(2rem, 5vw, 4rem); }
}
</style>
