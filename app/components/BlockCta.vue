<script setup lang="ts">
import { pageCta, cta, brand } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section class="cta">
    <div class="shell inner">
      <div v-reveal>
        <h2 class="breaks">{{ tr(pageCta.heading) }}</h2>
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
   blanc (5,17), le noir n'y tenant que 3,81 — cf. DESIGN.md § Colors. */
.cta {
  background: var(--signal);
  color: var(--on-signal);
  padding-block: clamp(4rem, 3rem + 6vw, 8rem);
}
.inner { display: grid; gap: 2.5rem; align-items: end; }
/* `--fs-xl` et non `--fs-2xl` : ce titre vit dans la colonne large d'une
   grille 1,4 / 1, pas sur toute la page. À 72 px il s'y repliait sur trois
   lignes, ce que la charte interdit. */
h2 { font-size: var(--fs-xl); margin-bottom: 1.25rem; }
p { max-width: var(--measure); }

.actions { display: grid; gap: 1rem; justify-items: start; }

/* Bouton plein, sans contour : le contour redoublait le fond et ne servait
   qu'au survol. L'inversion se fait d'un aplat à l'autre — blanc sur bleu,
   puis noir sur bleu, le texte suivant le fond. */
.primary {
  background: var(--on-signal);
  color: var(--signal);
  padding: var(--sp-md) var(--sp-lg);
  font-size: var(--fs-sm);
  font-weight: 500;
  transition:
    background var(--duration-press) var(--ease-out),
    color var(--duration-press) var(--ease-out);
}
.primary:hover { background: var(--ground); color: var(--on-ground); }

/* Le soulignement d'un lien n'est pas un filet de séparation : la charte le
   demande à l'épaisseur du texte. */
.mail { border-bottom: 1px solid currentColor; font-size: var(--fs-lg); }

@media (min-width: 880px) { .inner { grid-template-columns: 1.4fr 1fr; } }
</style>
