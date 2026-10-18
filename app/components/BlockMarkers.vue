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
/* La bande blanche se détache du papier par le ton, pas par les deux filets
   qui la bordaient : c'est exactement le pas de ton que la charte demande à
   la place du filet. */
.markers {
  background: var(--paper-raise);
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
  color: var(--signal-deep);
}
.desc { color: var(--ink-soft); max-width: 24ch; }
.note { margin-top: 2rem; }

@media (min-width: 760px) { ul { grid-template-columns: repeat(3, 1fr); gap: 3rem; } }
</style>
