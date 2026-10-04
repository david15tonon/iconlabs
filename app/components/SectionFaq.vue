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
        <p class="kicker"><span class="kicker-num">{{ faqIntro.index }}</span>{{ tr(faqIntro.kicker) }}</p>
        <h2>{{ tr(faqIntro.heading) }}</h2>
      </header>

      <ul class="list">
        <li v-for="(item, i) in faq" :key="i" v-reveal="i * 60">
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
.list { list-style: none; border-top: 1px solid var(--hairline); }
.list li { border-bottom: 1px solid var(--hairline); }

h3 { font-size: var(--fs-lg); font-weight: 700; letter-spacing: -0.015em; }
button {
  width: 100%;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  padding: 1.5rem 0;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: baseline;
  font-size: var(--fs-lg);
  transition: color 0.3s var(--ease);
}
button:hover { color: var(--signal-deep); }
.sign { color: var(--signal-deep); font-size: var(--fs-lg); }

.answer { padding-bottom: 1.75rem; }
.answer p { color: var(--ink-soft); max-width: var(--measure-wide); }
</style>
