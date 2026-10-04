/**
 * Détection automatique de la langue à partir du pays de la requête.
 *
 * Ordre de décision :
 *   0. chemin /fr ou /en — une adresse explicite gagne sur tout
 *   1. cookie `il_locale` — un choix explicite du visiteur gagne ensuite
 *   2. pays de l'IP, fourni par l'hébergeur dans un en-tête :
 *        Cloudflare → cf-ipcountry | Vercel → x-vercel-ip-country
 *   3. en-tête Accept-Language (et seul arbitre pour les pays bilingues)
 *   4. anglais par défaut
 *
 * Le résultat est posé dans event.context.locale, lu côté page.
 */

type Locale = 'fr' | 'en'

/** Pays où le français est la langue dominante de lecture. */
const FRENCH_FIRST = new Set([
  'FR', 'BJ', 'BF', 'CI', 'ML', 'NE', 'SN', 'TG', 'GN', 'CM', 'GA', 'CG', 'CD',
  'CF', 'TD', 'MG', 'HT', 'MC', 'GF', 'GP', 'MQ', 'RE', 'YT', 'NC', 'PF',
  'PM', 'WF', 'BL', 'MF',
])

/** Pays partiellement francophones : Accept-Language tranche. */
const FRENCH_MAYBE = new Set([
  'BE', 'CA', 'CH', 'LU', 'MA', 'DZ', 'TN', 'MR', 'MU', 'VU', 'RW', 'KM',
  'DJ', 'SC', 'BI', 'GQ',
])

function prefersFrench(acceptLanguage: string | undefined): boolean {
  if (!acceptLanguage) return false
  // On ne lit que la langue de plus haut poids, pas toute la liste.
  const best = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { tag: (tag || '').toLowerCase(), q: q ? Number(q.split('=')[1]) || 0 : 1 }
    })
    .sort((a, b) => b.q - a.q)[0]
  return Boolean(best?.tag.startsWith('fr'))
}

export default defineEventHandler((event) => {
  const headers = getRequestHeaders(event)
  const accept = headers['accept-language']

  // Une adresse explicite gagne sur tout le reste : /fr et /en sont les deux
  // versions indexées, et elles doivent être rendues dans leur langue dès le
  // serveur. Sans cela l'en-tête est rendu avant que la page ne corrige la
  // valeur, et l'hydratation signale un écart de texte.
  const path = getRequestURL(event).pathname
  if (path === '/fr' || path.startsWith('/fr/')) {
    event.context.locale = 'fr'
    return
  }
  if (path === '/en' || path.startsWith('/en/')) {
    event.context.locale = 'en'
    return
  }

  const chosen = getCookie(event, 'il_locale')
  if (chosen === 'fr' || chosen === 'en') {
    event.context.locale = chosen as Locale
    return
  }

  const country = (
    headers['cf-ipcountry'] ||
    headers['x-vercel-ip-country'] ||
    headers['x-country-code'] ||
    ''
  ).toUpperCase()

  let locale: Locale = 'en'
  if (FRENCH_FIRST.has(country)) locale = 'fr'
  else if (FRENCH_MAYBE.has(country)) locale = prefersFrench(accept) ? 'fr' : 'en'
  else if (!country) locale = prefersFrench(accept) ? 'fr' : 'en'

  event.context.locale = locale
})
