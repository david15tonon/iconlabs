<script setup lang="ts">
import type { T } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

defineProps<{ title: T; lede: T }>()
const { tr } = useLocale()
</script>

<template>
  <section class="hero">
    <div class="shell">
      <h1 class="breaks" v-reveal>{{ tr(title) }}</h1>
      <p class="statement" v-reveal="90">{{ tr(lede) }}</p>
    </div>
  </section>
</template>

<style scoped>
/* L'en-tête est fixe : la marge haute lui laisse sa place, sinon le titre
   démarre sous la barre. Rien ne clôt le bloc par le bas — l'intervalle de
   section suffit à le détacher, et la charte exclut le filet de séparation.
   Il n'y a plus d'étiquette au-dessus du titre : l'information qu'elle
   portait est celle du titre lui-même. */
.hero {
  padding-top: clamp(7rem, 5rem + 7vw, 12rem);
  padding-bottom: clamp(3rem, 2rem + 5vw, 6rem);
}
h1 {
  font-size: var(--fs-2xl);
  margin-bottom: 1.5rem;
}
</style>
