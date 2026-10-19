<script setup lang="ts">
import { processSteps, processIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section id="process" class="section bg">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(processIntro.heading) }}</h2>
      </header>

      <ol class="steps">
        <li v-for="(step, i) in processSteps" :key="step.num" v-reveal="i * 80">
          <span class="num">{{ step.num }}</span>
          <h3>{{ tr(step.title) }}</h3>
          <p>{{ tr(step.body) }}</p>
          <span class="meta label">{{ tr(step.meta) }}</span>
        </li>
      </ol>

      <NuxtLink class="more" :to="localePath('/methode')" v-reveal="120">
        {{ tr({ fr: 'La méthode en détail', en: 'The process in detail' }) }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* Bande blanche, et les étapes posées dessus sans panneau ni filet : la
   grille de 1 px qui les séparait était un filet déguisé en gouttière. Seul
   l'espace les tient maintenant.

   Le numéro reste, et lui seul : c'est un vrai `<ol>`, l'ordre des étapes
   compte, et la charte autorise la numérotation à cette condition. */
.bg { background: var(--ground-raise); }

.steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: clamp(2rem, 3.5vw, 3rem);
}
.steps li {
  display: grid;
  align-content: start;
  gap: 0.6rem;
}
.num { font-size: var(--fs-xs); font-weight: 500; color: var(--signal-text); }
.steps h3 { font-size: var(--fs-lg); }
.steps p { color: var(--on-ground-soft); font-size: var(--fs-sm); }
.meta { margin-top: 0.4rem; }

.more {
  display: inline-block;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--signal-text);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.2rem;
  transition: color var(--duration-press) var(--ease-out);
}
.more::after { content: ' \2192'; }
.more:hover { color: var(--on-ground); }
</style>
