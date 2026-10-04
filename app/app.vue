<template>
  <div>
    <a class="skip" href="#main">{{ tr({ fr: 'Aller au contenu', en: 'Skip to content' }) }}</a>
    <SiteHeader />
    <main id="main">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { prefixOf, useLocale } from '~/composables/useSite'

const { locale, tr, setLocale } = useLocale()
const route = useRoute()

/**
 * Un visiteur arrivé par une adresse préfixée a choisi sa langue : on la
 * mémorise, pour qu'un retour ultérieur sur `/` ne le renvoie pas vers la
 * langue de son pays. Une seule fois, au montage — pas à chaque navigation :
 * le cookie ne doit suivre que l'adresse d'entrée.
 */
onMounted(() => {
  const r = useRouter()
  const push = r.push.bind(r), rep = r.replace.bind(r)
  // @ts-expect-error debug
  r.push = (...a) => { console.log('[dbg] push', JSON.stringify(a[0]), new Error().stack?.split('\n').slice(1, 5).join(' <- ')); return push(...a) }
  // @ts-expect-error debug
  r.replace = (...a) => { console.log('[dbg] replace', JSON.stringify(a[0]), new Error().stack?.split('\n').slice(1, 5).join(' <- ')); return rep(...a) }
  const prefix = prefixOf(route.path)
  if (prefix) setLocale(prefix.slice(1) as 'fr' | 'en')
})
</script>
