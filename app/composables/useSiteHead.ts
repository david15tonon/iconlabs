import type { T } from '~~/content/site'
import { prefixOf, useLocale } from '~/composables/useSite'

export const SITE_URL = 'https://iconlabs.qzz.io'

/**
 * Le `<head>` d'une page : titre, description, Open Graph, canonique et
 * hreflang. Écrit une fois ici plutôt que recopié dans les sept pages — c'est
 * exactement le genre de bloc qu'on finit par ne corriger que dans trois
 * fichiers sur sept.
 *
 * La canonique pointe toujours vers l'adresse **préfixée** correspondant à la
 * langue rendue, jamais vers `/chemin` : cette dernière change de langue selon
 * le pays du visiteur, et une adresse dont le contenu dépend du lecteur ne
 * peut pas être la version de référence d'une page.
 */
export function useSiteHead(meta: { title: T; description: T }) {
  const route = useRoute()
  const { locale, tr } = useLocale()

  /** Le chemin sans son préfixe de langue : `/fr/methode` → `/methode`. */
  const bare = computed(() => route.path.slice(prefixOf(route.path).length) || '')

  useHead(() => ({
    htmlAttrs: { lang: locale.value },
    title: tr(meta.title),
    meta: [
      { name: 'description', content: tr(meta.description) },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: tr(meta.title) },
      { property: 'og:description', content: tr(meta.description) },
      { property: 'og:url', content: `${SITE_URL}/${locale.value}${bare.value}` },
      { property: 'og:image', content: `${SITE_URL}/brand/og.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: locale.value === 'fr' ? 'fr_FR' : 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'canonical', href: `${SITE_URL}/${locale.value}${bare.value}` },
      { rel: 'alternate', hreflang: 'fr', href: `${SITE_URL}/fr${bare.value}` },
      { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/en${bare.value}` },
      { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/en${bare.value}` },
    ],
  }))

  useSeoMeta({ ogSiteName: 'Icon Labs' })

  /* Rendue, parce que les fiches JSON-LD doivent citer exactement l'adresse
     canonique : la recalculer dans chaque page, c'est se garantir qu'un jour
     les deux divergeront. */
  return { url: computed(() => `${SITE_URL}/${locale.value}${bare.value}`) }
}

/**
 * Le studio, cité tel quel par les pages internes comme fournisseur du service
 * ou sujet de la page. La fiche complète (`ProfessionalService`) reste sur la
 * home : ici on ne fait que la référencer, sans redéclarer ce qu'elle dit.
 */
export const ORG = {
  '@type': 'Organization',
  name: 'Icon Labs',
  url: SITE_URL,
} as const

/**
 * Pose une fiche JSON-LD sur la page courante. `build` est rappelé à chaque
 * changement de langue — la description et le nom suivent donc la langue
 * rendue, comme le `<title>`.
 */
export function useJsonLd(build: () => Record<string, unknown>) {
  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...build() }),
      },
    ],
  }))
}
