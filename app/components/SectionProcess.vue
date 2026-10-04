<script setup lang="ts">
import { processSteps, processIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section id="process" class="section bg">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <p class="kicker"><span class="kicker-num">{{ processIntro.index }}</span>{{ tr(processIntro.kicker) }}</p>
        <h2>{{ tr(processIntro.heading) }}</h2>
      </header>

      <ol class="steps">
        <li v-for="(step, i) in processSteps" :key="step.num" v-reveal="i * 80">
          <span class="num">{{ step.num }}</span>
          <h3>{{ tr(step.title) }}</h3>
          <p>{{ tr(step.body) }}</p>
          <span class="meta">{{ tr(step.meta) }}</span>
        </li>
      </ol>

      <NuxtLink class="more" :to="localePath('/methode')" v-reveal="120">
        {{ tr({ fr: 'La méthode en détail', en: 'The process in detail' }) }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.more {
  display: inline-block;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  font-family: var(--label);
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--signal-deep);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.25rem;
  transition: color 0.3s var(--ease);
}
.more::after { content: ' \2192'; }
.more:hover { color: var(--ink); }

.bg { background: var(--paper-raise); }

.steps {
  list-style: none;
  display: grid;
  gap: 1px;
  background: var(--hairline);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
}
.steps li {
  background: var(--paper-raise);
  padding: clamp(1.5rem, 2.5vw, 2.25rem);
  display: grid;
  align-content: start;
  gap: 0.75rem;
}
.num { font-size: var(--fs-xs); color: var(--signal-deep); letter-spacing: 0.2em; }
.steps h3 { font-size: var(--fs-lg); font-weight: 700; }
.steps p { color: var(--ink-soft); font-size: var(--fs-sm); }
.meta {
  font-size: var(--fs-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-top: 0.4rem;
}
</style>
