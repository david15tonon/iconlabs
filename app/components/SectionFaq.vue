<script setup lang="ts">
import { faq, faqIntro } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr } = useLocale()
const openIndex = ref<number | null>(0)
</script>

<template>
  <section id="faq" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(faqIntro.heading) }}</h2>
      </header>

      <ul class="list">
        <li v-for="(item, i) in faq" :key="i" class="panel" v-reveal="i * 60">
          <h3>
            <button
              type="button"
              :aria-expanded="openIndex === i"
              :aria-controls="`faq-${i}`"
              @click="openIndex = openIndex === i ? null : i"
            >
              <span>{{ tr(item.q) }}</span>
              <span class="sign" aria-hidden="true">{{ openIndex === i ? '−' : '+' }}</span>
            </button>
          </h3>
          <div :id="`faq-${i}`" class="answer" :hidden="openIndex !== i">
            <p>{{ tr(item.a) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Chaque question est un panneau blanc sur le papier. Les deux filets qui
   réglaient la liste ont disparu : c'est le pas de ton qui dit où une
   question finit et où la suivante commence, et le demi-pas de grille qui
   les espace. */
.list { list-style: none; display: grid; gap: var(--sp-sm); }
.list > li { padding-block: 0; }

h3 { font-size: var(--fs-lg); }
button {
  width: 100%;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  padding: clamp(1.1rem, 2vw, 1.5rem) 0;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: baseline;
  font: inherit;
  transition: color var(--duration-press) var(--ease-out);
}
button:hover { color: var(--signal-deep); }
.sign { color: var(--signal-deep); font-size: var(--fs-lg); }

.answer { padding-bottom: clamp(1.1rem, 2vw, 1.5rem); }
.answer p { color: var(--ink-soft); max-width: var(--measure-wide); }
</style>
