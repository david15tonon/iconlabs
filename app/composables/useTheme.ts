import type { Locale } from '~~/content/site'

export type Theme = 'light' | 'dark'

/** La clé de stockage. Changer sa valeur réinitialise le choix de tous les
 *  visiteurs : elle est figée ici et nulle part ailleurs. */
export const THEME_KEY = 'icon-theme'

/** Le sol de chaque thème, pour `<meta name="theme-color">` — c'est la seule
 *  couleur du système qui vive hors de `main.css`, parce qu'une balise meta ne
 *  sait pas lire une variable CSS. Elle doit donc être tenue à jour à la main
 *  si `--ground` change (DESIGN.md § Colors). */
export const THEME_GROUND: Record<Theme, string> = {
  light: '#FFFFFF',
  dark: '#0B0B0B',
}

/**
 * Le thème clair / sombre.
 *
 * Le clair est le défaut — décision de l'utilisateur du 2026-10-19, qui
 * l'emporte sur le « dark mode dominant » de la charte de marque.
 * `prefers-color-scheme` n'est volontairement pas écouté : le défaut est un
 * choix de marque, pas une préférence système. Le visiteur bascule, et son
 * choix est mémorisé.
 *
 * Le rendu serveur sort toujours en clair. Ce n'est pas une approximation :
 * le script posé dans `<head>` par `nuxt.config.ts` lit le stockage local et
 * pose `data-theme` **avant la première peinture**, donc un visiteur qui a
 * choisi le sombre ne voit jamais le clair passer. Le composable se contente
 * de relire ce que le script a posé.
 */
export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  onMounted(() => {
    const posed = document.documentElement.dataset.theme
    if (posed === 'dark' || posed === 'light') theme.value = posed
  })

  function apply(next: Theme) {
    theme.value = next
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* navigation privée, stockage refusé : le thème tient pour la visite. */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEME_GROUND[next])
  }

  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')

  /** Le libellé du bouton nomme l'action, pas l'état courant. */
  const label = (locale: Locale) =>
    theme.value === 'dark'
      ? (locale === 'fr' ? 'Passer en clair' : 'Switch to light')
      : (locale === 'fr' ? 'Passer en sombre' : 'Switch to dark')

  return { theme, toggle, label }
}
