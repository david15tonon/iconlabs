<script setup lang="ts">
import { studioIntro, team, values, brand } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section id="studio" class="section">
    <div class="shell inner">
      <div v-reveal>
        <h2 class="breaks">{{ tr(studioIntro.heading) }}</h2>
        <p class="origin">{{ tr(brand.origin) }}</p>
      </div>

      <div class="prose" v-reveal="120">
        <p v-for="(para, i) in studioIntro.body" :key="i">{{ tr(para) }}</p>

        <ul class="team">
          <li v-for="member in team" :key="member.name">
            <strong>{{ member.name }}</strong>
            <span>{{ tr(member.role) }}</span>
          </li>
        </ul>

        <p class="values">{{ values.map((v) => tr(v)).join(' · ') }}</p>

        <NuxtLink class="more" :to="localePath('/studio')">
          {{ tr({ fr: 'Qui nous sommes', en: 'Who we are' }) }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Section sur le sol : la méthode qui précède est une bande surélevée, et
   deux sections voisines ne partagent pas la même composition. Le titre tient
   la colonne de gauche, la prose celle de droite.

   La liste d'équipe n'a plus ni gouttière de 1 px ni filet sous chaque ligne,
   et les valeurs ne sont plus des boîtes contournées : espace et ton. */
.inner { display: grid; gap: clamp(2rem, 5vw, 5rem); align-items: start; }
/* Colonne de gauche d'une grille 1 / 1,15 : le corps se règle sur elle,
   pas sur la page. */
h2 { font-size: var(--fs-xl); margin-bottom: 1rem; }
.origin { font-size: var(--fs-xs); font-weight: 500; color: var(--signal-text); }

.prose { display: grid; gap: 1.5rem; }
.prose p { color: var(--on-ground-soft); max-width: var(--measure-wide); }

.team { list-style: none; display: grid; gap: 0.75rem; margin-top: 0.5rem; }
.team li {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  justify-content: space-between;
  align-items: baseline;
  max-width: var(--measure-wide);
}
.team strong { font-weight: 500; }
.team span { color: var(--on-ground-mute); font-size: var(--fs-sm); }

.values { color: var(--on-ground-mute) !important; font-size: var(--fs-xs); }

.more {
  justify-self: start;
  margin-top: clamp(0.5rem, 2vw, 1rem);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--signal-text);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.2rem;
  transition: color var(--duration-press) var(--ease-out);
}
.more::after { content: ' \2192'; }
.more:hover { color: var(--on-ground); }

@media (min-width: 980px) { .inner { grid-template-columns: 1fr 1.15fr; } }
</style>
