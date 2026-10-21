import { casePages } from './content/site'

/* Les adresses déclarées au sitemap : les deux langues × les pages.
   Les pages de cas sont DÉRIVÉES de `work` plutôt que recopiées — un client
   qui autorise le détail de son projet entre au sitemap sans qu'on y pense,
   et aucune adresse n'y est inscrite deux fois.

   Les quatre pages `/services/:slug` et `/studio` en sont sorties le
   2026-10-21 : elles n'existent plus, et des redirections 301 passent leur
   signal à leurs remplaçantes. */
const PATHS = [
  '',
  '/offres',
  '/cas',
  '/methode',
  '/securite',
  '/a-propos',
  '/contact',
  ...casePages().map((c) => `/cas/${c.slug}`),
]
const URLS = ['fr', 'en'].flatMap((l) => PATHS.map((p) => `/${l}${p}`))

/* LES REDIRECTIONS DE LA V10.
 *
 * Les quatre pages de service et la page studio étaient dans le sitemap
 * servi jusqu'ici : les laisser tomber en 404 jetterait leur signal au lieu
 * de le passer à `/offres` et `/a-propos`. Un 301 le transmet, un 302 ne le
 * transmet pas — d'où `statusCode: 301` écrit explicitement.
 *
 * Les trois variantes de chaque adresse sont posées (nue, `/fr`, `/en`) :
 * `routeRules` travaille sur le chemin brut, il ne connaît pas les alias de
 * langue déclarés page par page dans `definePageMeta`.
 *
 * ⚠️ La destination garde le préfixe de l'origine : un visiteur arrivé sur
 * /fr/studio atterrit sur /fr/a-propos, et non sur une page dont la langue
 * serait de nouveau déduite de son pays. */
const GONE: Record<string, string> = {
  '/studio': '/a-propos',
  '/services/mvp': '/offres',
  '/services/plateformes': '/offres',
  '/services/produits-ia': '/offres',
  '/services/sites-experiences': '/offres',
}

const REDIRECTS = Object.fromEntries(
  ['', '/fr', '/en'].flatMap((prefix) =>
    Object.entries(GONE).map(([from, to]) => [
      `${prefix}${from}`,
      { redirect: { to: `${prefix}${to}`, statusCode: 301 as const } },
    ]),
  ),
)

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://iconlabs.qzz.io',
    name: 'Icon Labs',
  },

  routeRules: REDIRECTS,

  sitemap: {
    /* `excludeAppSources` coupe la découverte automatique des routes : sans
       elle, le sitemap listait aussi `/`, `/methode` et `/studio` sans
       préfixe. Or ce sont les adresses dont la langue dépend du pays du
       visiteur — une page dont le contenu change selon le lecteur ne peut pas
       être la version de référence d'une page. Seules les adresses préfixées
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
        { name: 'theme-color', content: '#FFFFFF' }  // --ground du thème clair, le défaut
      ],
      /* Le thème, posé AVANT la première peinture.
         Le rendu serveur sort toujours en clair — c'est le défaut. Sans ce
         script, un visiteur qui a choisi le sombre verrait le clair le temps
         que Vue s'hydrate : un éclair blanc d'une demi-seconde, exactement ce
         qu'une bascule de thème doit éviter. Il est volontairement minuscule
         et synchrone, et il échoue en silence si le stockage est refusé
         (navigation privée), auquel cas le clair tient. */
      script: [
        {
          tagPosition: 'head',
          innerHTML:
            "(function(){try{var t=localStorage.getItem('icon-theme');" +
            "if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;" +
            "var m=document.querySelector('meta[name=\"theme-color\"]');" +
            "if(m)m.setAttribute('content',t==='dark'?'#0B0B0B':'#FFFFFF')}}catch(e){}})()",
        },
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

    /* Cloudflare Pages — le routage du Worker.
     *
     * Pages refuse un `_routes.json` de plus de 100 règles. Laissé à lui-même,
     * le préréglage Nitro énumère **fichier par fichier** tout ce qui n'est pas
     * un dossier d'assets déclaré : 137 images du récit, 22 fichiers de marque…
     * puis il coupe la liste à cent, en silence
     * (`routes.exclude.splice(100 - include.length)` dans
     * `nitropack/dist/presets/cloudflare/utils.mjs`). Le déploiement passe, et
     * tout ce qui est tombé après la centième règle — ici 61 images du récit —
     * part dans le Worker au lieu d'être servi en statique.
     *
     * On reprend donc la main : `defaultRoutes: false` coupe l'énumération, et
     * on déclare les quatre chemins statiques à la place. Six règles au lieu de
     * cent, et de la marge pour longtemps.
     *
     * ⚠️ Tout fichier ajouté dans `public/` ailleurs que sous `brand/` ou
     * `story/` doit être ajouté ici, sinon il passera par le Worker.
     * `npm run check:cf` le vérifie et échoue si un fichier n'est couvert. */
    cloudflare: {
      pages: {
        defaultRoutes: false,
        routes: {
          version: 1,
          include: ['/*'],
          exclude: [
            '/_nuxt/*',
            '/brand/*',
            '/story/*',
            '/work/*',
            '/favicon.png',
            '/manifest.webmanifest',
          ],
        },
      },
    },
  },
})
