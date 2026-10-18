<script setup lang="ts">
import { services, servicesIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section id="services" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(servicesIntro.heading) }}</h2>
      </header>

      <ul class="grid">
        <li v-for="(s, i) in services" :key="s.slug" v-reveal="i * 90">
          <NuxtLink class="card panel" :to="localePath(`/services/${s.slug}`)">
            <h3>{{ tr(s.title) }}</h3>
            <p>{{ tr(s.body) }}</p>
            <p class="tags">{{ s.tags.join(' · ') }}</p>
            <span class="more">{{ tr({ fr: 'Voir la page', en: 'See the page' }) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Quatre panneaux pleins sur le papier. Les filets qui ouvraient la grille et
   fermaient chaque carte ont disparu : le blanc du panneau fait la séparation,
   et le demi-pas de grille fait le reste.

   Les cartes ne sont plus numérotées : ce n'est pas une suite ordonnée, c'est
   un ensemble de quatre services — le numéro ne portait qu'un ordre arbitraire. */
.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: var(--sp-sm);
}
.grid > li { display: grid; }

/* La carte entière est le lien : la cible de clic suit la carte, et le survol
   ne se joue pas sur trois mots en bas à gauche. */
.card {
  height: 100%;
  padding: clamp(1.75rem, 3vw, 2.5rem);
  display: grid;
  align-content: start;
  gap: 0.9rem;
}
.card h3 { font-size: var(--fs-lg); }
.card p { color: var(--ink-soft); max-width: var(--measure-tight); }

/* Les mots-clés étaient des boîtes de 1 px : la charte les refuse. Ils
   redeviennent ce qu'ils sont, une ligne de texte secondaire. */
.tags {
  font-size: var(--fs-xs);
  color: var(--ink-mute) !important;
  margin-top: 0.1rem;
}

.more {
  margin-top: 1.25rem;
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--signal-deep);
  transition: color var(--duration-press) var(--ease-out);
}
.more::after { content: ' \2192'; }
.card:hover .more { color: var(--ink); }

@media (min-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
</style>
