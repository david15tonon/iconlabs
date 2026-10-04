<script setup lang="ts">
import { studioIntro, team, values, brand } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section id="studio" class="section bg">
    <div class="shell inner">
      <div v-reveal>
        <p class="kicker"><span class="kicker-num">{{ studioIntro.index }}</span>{{ tr(studioIntro.kicker) }}</p>
        <h2>{{ tr(studioIntro.heading) }}</h2>
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

        <ul class="values">
          <li v-for="(value, i) in values" :key="i">{{ tr(value) }}</li>
        </ul>

        <NuxtLink class="more" :to="localePath('/studio')">
          {{ tr({ fr: 'Qui nous sommes', en: 'Who we are' }) }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.more {
  justify-self: start;
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
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
.inner { display: grid; gap: clamp(2rem, 5vw, 5rem); align-items: start; }
h2 { font-size: var(--fs-2xl); white-space: pre-line; margin: 1rem 0; }
.origin {
  font-size: var(--fs-xs);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--signal-deep);
}
.prose { display: grid; gap: 1.5rem; }
.prose p { color: var(--ink-soft); max-width: var(--measure-wide); }

.team { list-style: none; display: grid; gap: 1px; background: var(--hairline); margin-top: 1rem; }
.team li {
  background: var(--paper-raise);
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid var(--hairline);
}
.team strong { font-family: var(--display); font-weight: 700; letter-spacing: -0.01em; }
.team span { color: var(--ink-mute); font-size: var(--fs-sm); }

.values { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
.values li {
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  border: 1px solid var(--hairline);
  padding: 0.35rem 0.75rem;
}

@media (min-width: 980px) { .inner { grid-template-columns: 1fr 1.15fr; } }
</style>
