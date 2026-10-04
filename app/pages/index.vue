<script setup lang="ts">
import { seo, brand, servicePages } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, SITE_URL } from '~/composables/useSiteHead'

/**
 * La home, à trois adresses :
 *   /     → langue déduite du pays (server/middleware/geo-locale)
 *   /fr   → français forcé
 *   /en   → anglais forcé
 * Les deux adresses explicites existent pour que les moteurs indexent chaque
 * version ; `hreflang` les relie. La langue n'est plus décidée ici mais dans
 * app/middleware/locale.global.ts, commun aux sept pages.
 */
definePageMeta({ alias: ['/fr', '/en'] })

const { locale, tr } = useLocale()

useSiteHead({ title: seo.title, description: seo.description })

// Fiche d'organisation pour les moteurs — uniquement des faits que le studio
// peut produire ; aucune métrique inventée. C'est la seule fiche complète du
// site : les pages internes la référencent (`ORG`) sans la redire.
useJsonLd(() => ({
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#studio`,
  name: 'Icon Labs',
  url: SITE_URL,
  email: brand.email,
  logo: `${SITE_URL}/brand/icon-512.png`,
  areaServed: 'Worldwide',
  description: tr(seo.description),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: tr({ fr: 'Services', en: 'Services' }),
    itemListElement: servicePages.map((page) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale.value}/services/${page.slug}#service`,
        name: tr(page.nav),
      },
    })),
  },
}))

</script>

<template>
  <ScrollStory />
  <BlockMarkers />
  <SectionServices />
  <BlockDifference />
  <SectionProcess />
  <SectionStudio />
  <SectionFaq />
  <SectionContact />
</template>
