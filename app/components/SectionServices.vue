<script setup lang="ts">
import { services, servicesIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
</script>

<template>
  <section id="services" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <p class="kicker"><span class="kicker-num">{{ servicesIntro.index }}</span>{{ tr(servicesIntro.kicker) }}</p>
        <h2>{{ tr(servicesIntro.heading) }}</h2>
      </header>

      <ul class="grid">
        <li v-for="(s, i) in services" :key="s.num" v-reveal="i * 90">
          <NuxtLink class="card" :to="localePath(`/services/${s.slug}`)">
            <span class="num">{{ s.num }}</span>
            <h3>{{ tr(s.title) }}</h3>
            <p>{{ tr(s.body) }}</p>
            <ul class="tags">
              <li v-for="tag in s.tags" :key="tag">{{ tag }}</li>
            </ul>
            <span class="more">{{ tr({ fr: 'Voir la page', en: 'See the page' }) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* La carte entière est le lien : la cible de clic suit la carte, et le survol
   ne se joue pas sur trois mots en bas à gauche. */
.more {
  margin-top: 1.25rem;
  font-family: var(--label);
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--signal-deep);
}
.more::after { content: ' \2192'; }
.card:hover .more { color: var(--ink); }

.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  border-top: 1px solid var(--hairline);
}
.grid > li { display: grid; }
.card {
  height: 100%;
  padding: clamp(1.75rem, 3vw, 2.75rem) 0;
  padding-right: clamp(1rem, 3vw, 3rem);
  border-bottom: 1px solid var(--hairline);
  display: grid;
  align-content: start;
  gap: 0.9rem;
}
.num {
  font-size: var(--fs-xs);
  color: var(--signal-deep);
  letter-spacing: 0.2em;
}
.card h3 {
  font-size: var(--fs-xl);
  letter-spacing: -0.02em;
}
.card p { color: var(--ink-soft); max-width: var(--measure-tight); }

.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.4rem;
}
.tags li {
  font-size: var(--fs-xs);
  letter-spacing: 0.1em;
  color: var(--ink-mute);
  border: 1px solid var(--hairline);
  padding: 0.3rem 0.65rem;
}

@media (min-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; column-gap: clamp(2rem, 5vw, 6rem); }
}
</style>
