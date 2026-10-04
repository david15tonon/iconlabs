<script setup lang="ts">
import { brand, nav, cta } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

const { locale, tr, localePath, setLocale } = useLocale()
const scrolled = ref(false)
const open = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="bar" :class="{ solid: scrolled }">
    <div class="inner">
      <NuxtLink class="logo" :to="localePath('/')" :aria-label="brand.wordmark">
        <img src="/brand/lockup-ink.svg" :alt="brand.wordmark" width="292" height="64" />
      </NuxtLink>

      <nav class="links" :class="{ open }" :aria-label="tr({ fr: 'Navigation principale', en: 'Main navigation' })">
        <NuxtLink v-for="item in nav" :key="item.to" :to="localePath(item.to)" @click="open = false">
          {{ tr(item.label) }}
        </NuxtLink>
      </nav>

      <div class="right">
        <div class="lang" role="group" :aria-label="tr({ fr: 'Langue', en: 'Language' })">
          <button
            v-for="code in (['fr', 'en'] as const)"
            :key="code"
            type="button"
            :aria-pressed="locale === code"
            :class="{ on: locale === code }"
            @click="setLocale(code)"
          >{{ code.toUpperCase() }}</button>
        </div>
        <NuxtLink class="cta" :to="localePath('/#contact')">{{ tr(cta.primary) }}</NuxtLink>
        <button
          class="burger"
          type="button"
          :aria-expanded="open"
          :aria-label="tr({ fr: 'Menu', en: 'Menu' })"
          @click="open = !open"
        ><span /><span /></button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.bar {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  transition: background 0.4s var(--ease), border-color 0.4s var(--ease);
  border-bottom: 1px solid transparent;
}
.bar.solid {
  background: var(--paper-veil);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--hairline);
}

.inner {
  max-width: var(--maxw);
  margin-inline: auto;
  padding: 0.9rem var(--gutter);
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo img { width: 132px; height: auto; }

.links {
  display: flex;
  gap: clamp(1rem, 2.2vw, 2.4rem);
  margin-inline: auto;
}
.links a {
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mute);
  transition: color 0.3s var(--ease);
}
.links a:hover { color: var(--ink); }

.right { display: flex; align-items: center; gap: 1rem; }

.lang { display: flex; border: 1px solid var(--hairline); }
.lang button {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0.35rem 0.6rem;
  font-size: var(--fs-xs);
  letter-spacing: 0.1em;
  color: var(--ink-mute);
  transition: color 0.25s var(--ease), background 0.25s var(--ease);
}
.lang button.on { color: var(--paper); background: var(--ink); }

.cta {
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: var(--signal);
  border: 1px solid var(--signal);
  color: var(--ink);            /* 4,97 sur le vermillon — cf. BRAND.md */
  padding: 0.6rem 1.1rem;
  white-space: nowrap;
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
}
/* Au survol le fond s’assombrit : l’encre n’y tient plus que 3,50, le
   papier y tient 4,99 — c’est donc le texte qui change, pas le fond. */
.cta:hover { background: var(--signal-deep); border-color: var(--signal-deep); color: var(--paper); }

.burger { display: none; background: none; border: 0; cursor: pointer; padding: 0.5rem; }
.burger span { display: block; width: 22px; height: 1px; background: var(--ink); }
.burger span + span { margin-top: 6px; }

@media (max-width: 900px) {
  .links {
    position: absolute;
    inset: 100% 0 auto 0;
    flex-direction: column;
    gap: 0;
    background: var(--paper-raise);
    border-bottom: 1px solid var(--hairline);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s var(--ease);
  }
  .links.open { max-height: 60vh; }
  .links a { padding: 1rem var(--gutter); border-top: 1px solid var(--hairline-soft); }
  .cta { display: none; }
  .burger { display: block; }
}
</style>
