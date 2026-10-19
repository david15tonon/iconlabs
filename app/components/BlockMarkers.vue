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
          <span class="desc">{{ tr(item.label) }}</span>
        </li>
      </ul>
      <p class="note label" v-reveal="260">{{ tr(markers.note) }}</p>
    </div>
  </section>
</template>

<style scoped>
/* La bande se détache du sol par le ton, pas par un filet : `--ground-raise`
   sur `--ground`, le seul niveau de surélévation du système. */
.markers {
  background: var(--ground-raise);
  padding-block: clamp(2.5rem, 4vw, 4.5rem);
}
ul { list-style: none; display: grid; gap: 2rem; }
li { display: grid; gap: 0.5rem; }
.value {
  font-family: var(--display);
  font-size: var(--fs-xl);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.035em;
  color: var(--signal-text);
}
.desc { color: var(--on-ground-soft); max-width: 24ch; }
.note { margin-top: 2rem; }

@media (min-width: 760px) { ul { grid-template-columns: repeat(3, 1fr); gap: 3rem; } }
</style>
