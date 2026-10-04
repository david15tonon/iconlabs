import type { Locale, T } from '~~/content/site'

/** Les deux préfixes d'adresse explicites. `''` = adresse déduite du pays. */
const PREFIXES = ['/fr', '/en'] as const

/**
 * Lit le préfixe de langue d'un chemin. `/fr/methode` → `/fr`, `/methode` → ``.
 * Exporté pour que le middleware de route s'en serve sans monter le composable.
 */
export function prefixOf(path: string): '' | '/fr' | '/en' {
  for (const p of PREFIXES) {
    if (path === p || path.startsWith(`${p}/`)) return p
  }
  return ''
}

/**
 * État de langue partagé + traducteur + fabrique de liens.
 *
 * `locale` est initialisé côté serveur par server/middleware/geo-locale.ts
 * (pays de l'IP), puis figé dans le payload pour que l'hydratation côté
 * client parte exactement de la même valeur — sinon le texte « saute ».
 */
export function useLocale() {
  const locale = useState<Locale>('locale', () => {
    const event = useRequestEvent()
    return (event?.context.locale as Locale) ?? 'en'
  })

  const route = useRoute()

  /** Le préfixe de l'adresse courante — vide sur les adresses déduites. */
  const prefix = computed(() => prefixOf(route.path))

  /** Traduit un champ { fr, en } dans la langue courante. */
  const tr = (field: T): string => field[locale.value]

  /**
   * Fabrique un lien interne qui reste dans la langue de l'adresse courante.
   * Sans cela, un visiteur arrivé par `/fr/methode` repart vers `/studio`,
   * c'est-à-dire vers une page de nouveau déduite du pays : il perd son choix.
   * Sur une adresse non préfixée on ne préfixe pas, pour que `/` continue
   * d'être l'adresse neutre que les moteurs voient.
   */
  function localePath(path: string): string {
    const [bare = '/', hash] = path.split('#')
    const base = `${prefix.value}${bare === '/' ? '' : bare}` || '/'
    return hash ? `${base}#${hash}` : base
  }

  /** Choix explicite du visiteur : mémorisé un an, prioritaire sur la géo. */
  function setLocale(next: Locale) {
    locale.value = next
    useCookie<Locale>('il_locale', {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      path: '/',
    }).value = next

    // Sur une adresse préfixée, changer de langue change d'adresse : c'est le
    // chemin qui fait foi côté serveur (geo-locale le lit avant tout le reste).
    // Rester sur /fr/methode en affichant l'anglais produirait une page dont
    // l'URL ment, et que le prochain rendu serveur contredirait.
    const current = prefixOf(route.path)
    console.log('[dbg]', performance.now().toFixed(0), 'setLocale', next, 'path=', route.path, 'current=', current)
    if (current && current !== `/${next}`) {
      const target = `/${next}${route.path.slice(current.length)}${route.hash}`
      console.log('[dbg] navigateTo', target)
      Promise.resolve(navigateTo(target)).then((r) => console.log('[dbg] ok', JSON.stringify({ type: (r)?.type, msg: (r)?.message, from: (r)?.from?.fullPath, to: (r)?.to?.fullPath }))).catch((e) => console.log('[dbg] err', String(e)))
    }
  }

  return { locale, prefix, tr, localePath, setLocale }
}
