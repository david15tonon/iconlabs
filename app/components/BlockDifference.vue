<script setup lang="ts">
import { difference, differenceIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr } = useLocale()
</script>

<template>
  <section id="difference" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(differenceIntro.heading) }}</h2>
        <p class="lede">{{ tr(differenceIntro.lede) }}</p>
      </header>

      <ul class="grid">
        <li v-for="(item, i) in difference" :key="i" v-reveal="i * 90">
          <h3>{{ tr(item.title) }}</h3>
          <p>{{ tr(item.body) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Trois colonnes de texte nu sur le papier, et rien d'autre. Le filet qui
   ouvrait la liste a disparu sans être remplacé : la section qui précède est
   une grille de panneaux blancs et celle qui suit est une bande blanche —
   deux sections voisines n'ont jamais la même composition, donc celle-ci est
   tenue par l'espace seul. */
.grid {
  list-style: none;
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
}
.grid > li { display: grid; align-content: start; gap: 0.75rem; }
h3 { font-size: var(--fs-lg); }
p { color: var(--ink-soft); font-size: var(--fs-sm); max-width: var(--measure-tight); }

@media (min-width: 880px) { .grid { grid-template-columns: repeat(3, 1fr); } }
</style>
