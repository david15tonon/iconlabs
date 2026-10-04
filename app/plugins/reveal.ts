/**
 * Directive `v-reveal` — apparition douce à l'entrée dans l'écran.
 * Inerte si le visiteur demande « mouvement réduit » : le contenu est alors
 * simplement visible dès le départ.
 *
 * Le greffon est universel : au rendu serveur la directive ne pose rien, donc
 * le contenu part visible et reste lisible même si le JavaScript ne
 * s'exécute jamais. L'état caché n'est appliqué qu'au montage, par le client.
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    nuxtApp.vueApp.directive('reveal', { getSSRProps: () => ({}) })
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const observer = reduced
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-in')
            observer!.unobserve(entry.target)
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (!observer) {
        el.classList.add('is-in')
        return
      }
      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
