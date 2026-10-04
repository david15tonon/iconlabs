<script setup lang="ts">
import { pageCta, cta, brand } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section class="cta">
    <div class="shell inner">
      <div v-reveal>
        <h2>{{ tr(pageCta.heading) }}</h2>
        <p>{{ tr(pageCta.body) }}</p>
      </div>
      <div class="actions" v-reveal="100">
        <NuxtLink class="primary" :to="`${localePath('/')}#contact`">{{ tr(cta.primary) }}</NuxtLink>
        <a class="mail" :href="`mailto:${brand.email}`">{{ brand.email }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* L'aplat signature, comme la section contact de la home : tout y passe en
   encre (4,97), seule combinaison qui tienne le petit texte — cf. BRAND.md. */
.cta {
  background: var(--signal);
  color: var(--ink);
  padding-block: clamp(4rem, 3rem + 6vw, 8rem);
}
.inner { display: grid; gap: 2.5rem; align-items: end; }
h2 { font-size: var(--fs-2xl); white-space: pre-line; margin-bottom: 1.25rem; }
p { max-width: var(--measure); }

.actions { display: grid; gap: 1rem; justify-items: start; }
.primary {
  background: var(--ink);
  color: var(--paper);
  padding: 0.95rem 2rem;
  font-size: var(--fs-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid var(--ink);
  transition: background 0.3s var(--ease), color 0.3s var(--ease);
}
.primary:hover { background: transparent; color: var(--ink); }
.mail { border-bottom: 1px solid currentColor; font-size: var(--fs-lg); }

@media (min-width: 880px) { .inner { grid-template-columns: 1.4fr 1fr; } }
</style>
