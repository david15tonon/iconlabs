<script setup lang="ts">
import type { T } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

defineProps<{ index: string; kicker: T; title: T; lede: T }>()
const { tr } = useLocale()
</script>

<template>
  <section class="hero">
    <div class="shell">
      <p class="kicker" v-reveal><span class="kicker-num">{{ index }}</span>{{ tr(kicker) }}</p>
      <h1 v-reveal="60">{{ tr(title) }}</h1>
      <p class="lede" v-reveal="120">{{ tr(lede) }}</p>
    </div>
  </section>
</template>

<style scoped>
/* L'en-tête est fixe : la marge haute lui laisse sa place, sinon le titre
   démarre sous la barre. */
.hero {
  padding-top: clamp(7rem, 5rem + 7vw, 12rem);
  padding-bottom: clamp(3rem, 2rem + 5vw, 6rem);
  border-bottom: 1px solid var(--hairline);
}
h1 {
  font-size: var(--fs-3xl);
  white-space: pre-line;
  margin: 1rem 0 1.5rem;
}
.lede { max-width: var(--measure-wide); }
</style>
