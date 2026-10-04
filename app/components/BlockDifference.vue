<script setup lang="ts">
import { difference, differenceIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr } = useLocale()
</script>

<template>
  <section id="difference" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <p class="kicker"><span class="kicker-num">{{ differenceIntro.index }}</span>{{ tr(differenceIntro.kicker) }}</p>
        <h2>{{ tr(differenceIntro.heading) }}</h2>
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
.grid { list-style: none; display: grid; gap: 2.5rem; border-top: 1px solid var(--hairline); padding-top: 2.5rem; }
h3 { font-size: var(--fs-lg); font-weight: 700; margin-bottom: 0.75rem; }
p { color: var(--ink-soft); font-size: var(--fs-sm); }

@media (min-width: 880px) { .grid { grid-template-columns: repeat(3, 1fr); gap: 3rem; } }
</style>
