import { prefixOf } from '~/composables/useSite'

/**
 * L'adresse fait foi : `/fr/...` est français, `/en/...` est anglais.
 *
 * Ce middleware remplace les deux `if` qui vivaient dans `index.vue` — avec
 * plusieurs pages, chacune aurait dû les répéter. Il tourne au serveur comme
 * au client, et le serveur a déjà posé la même valeur dans
 * `event.context.locale` (server/middleware/geo-locale.ts) : les deux
 * décisions concordent, donc l'hydratation ne signale aucun écart.
 */
export default defineNuxtRouteMiddleware((to) => {
  const prefix = prefixOf(to.path)
  if (!prefix) return

  const { locale } = useLocale()
  const next = prefix.slice(1) as 'fr' | 'en'
  if (locale.value !== next) locale.value = next
})
