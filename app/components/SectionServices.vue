<script setup lang="ts">
import { skills, servicesIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()

const pad = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="services" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(servicesIntro.heading) }}</h2>
        <p class="lede">{{ tr(servicesIntro.lede) }}</p>
      </header>

      <!-- Six passes d'encre, pas six cartes : chaque compétence est une bande
           pleine largeur. Quatre d'entre elles ont une page, deux n'en ont pas
           — on n'invente pas une route pour faire symétrique. -->
      <ul class="passes">
        <li v-for="(s, i) in skills" :key="s.title.fr" v-reveal="i * 60">
          <component
            :is="s.page ? 'NuxtLink' : 'div'"
            v-bind="s.page ? { to: localePath(`/services/${s.page}`) } : {}"
            class="pass"
            :class="{ linked: s.page }"
          >
            <span class="n">{{ pad(i) }}</span>
            <h3>{{ tr(s.title) }}</h3>
            <p>{{ tr(s.body) }}</p>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.passes { list-style: none; }
.passes > li { border-top: 1px solid var(--rule); }
.passes > li:last-child { border-bottom: 1px solid var(--rule); }

.pass {
  display: grid;
  gap: 0.5rem 1.6rem;
  padding-block: 1.5rem;
  transition: color var(--duration-press) var(--ease-out);
}

.n { font-size: var(--fs-xs); color: var(--on-ground-mute); }

h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: var(--fs-xl);
  line-height: 1.05;
  letter-spacing: -0.03em;
}
/* L'encre tourne de bande en bande : une classe d'information par encre, et
   le bleu et le violet ne portent ici que du titre — 3,81 et 3,45 leur
   interdisent le texte courant. */
.passes > li:nth-child(2) h3 { color: var(--signal); }
.passes > li:nth-child(4) h3 { color: var(--state); }
.passes > li:nth-child(6) h3 { color: var(--accent); }

p { color: var(--on-ground-soft); }

.linked:hover h3 { color: var(--signal-text); }

@media (min-width: 900px) {
  .pass { grid-template-columns: 52px minmax(0, 1fr) minmax(0, 1fr); align-items: baseline; }
  .n { align-self: start; padding-top: 0.5rem; }
}
</style>
