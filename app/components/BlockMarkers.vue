<script setup lang="ts">
import { markers } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr } = useLocale()
</script>

<template>
  <section class="markers">
    <div class="shell">
      <ul>
        <li v-for="(item, i) in markers.items" :key="item.value" v-reveal="i * 80">
          <span class="value">{{ item.value }}</span>
          <span class="label">{{ tr(item.label) }}</span>
        </li>
      </ul>
      <p class="note" v-reveal="260">{{ tr(markers.note) }}</p>
    </div>
  </section>
</template>

<style scoped>
.markers {
  background: var(--paper-raise);
  border-block: 1px solid var(--hairline);
  padding-block: clamp(2.5rem, 4vw, 4.5rem);
}
ul { list-style: none; display: grid; gap: 2rem; }
li { display: grid; gap: 0.5rem; }
.value {
  font-family: var(--display);
  font-size: var(--fs-2xl);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--signal-deep);
}
.label { color: var(--ink-soft); max-width: 24ch; }
.note {
  margin-top: 2rem;
  font-family: var(--label);
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

@media (min-width: 760px) { ul { grid-template-columns: repeat(3, 1fr); gap: 3rem; } }
</style>
