import { servicePages } from './content/site'

/* Les adresses déclarées au sitemap : les deux langues × les sept pages.
   Elles sont dérivées des slugs plutôt que recopiées — une page de service
   ajoutée dans content/site.ts entre au sitemap sans qu'on y pense. */
const PATHS = ['', '/methode', '/studio', ...servicePages.map((p) => `/services/${p.slug}`)]
const URLS = ['fr', 'en'].flatMap((l) => PATHS.map((p) => `/${l}${p}`))

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://iconlabs.qzz.io',
    name: 'Icon Labs',
  },

  sitemap: {
    /* `excludeAppSources` coupe la découverte automatique des routes : sans
       elle, le sitemap listait aussi `/`, `/methode` et `/studio` sans
       préfixe. Or ce sont les adresses dont la langue dépend du pays du
       visiteur — une page dont le contenu change selon le lecteur ne peut pas
       être la version de référence. Seules les quatorze adresses préfixées
       sont déclarées, et `hreflang` les relie deux à deux. */
    excludeAppSources: true,
    urls: URLS,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#0B0B0B' }  // --ground, cf. DESIGN.md,
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/brand/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        /* Deux familles, et seulement deux (DESIGN.md § Typography).
           Syne en 700 et 800 porte l'affichage ; DM Mono en 300, 400 et 500
           porte tout ce qui se lit. Ce sont les deux familles de la charte
           de marque `iconlabs-brand.html`, qui fait loi depuis le
           2026-10-18. Instrument Sans disparaît avec la version alpha de
           DESIGN.md, qui prétendait remplacer cette charte.
           `css2` sert latin et latin-ext dans la même feuille, découpés par
           `unicode-range` : les accents français sont couverts. */
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2' +
            '?family=Syne:wght@700;800' +
            '&family=DM+Mono:wght@300;400;500' +
            '&display=swap',
        },
      ],
    },
  },

  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
  },
})
