<script setup lang="ts">
import { brand, footerNav, footer } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <div class="shell inner">
      <div class="brand">
        <img src="/brand/lockup.svg" :alt="brand.wordmark" width="600" height="483" />
        <p>{{ tr(brand.tagline) }}</p>
        <p class="origin">{{ tr(brand.origin) }}</p>
      </div>

      <nav
        v-for="col in footerNav"
        :key="col.title.fr"
        class="col"
        :aria-label="tr(col.title)"
      >
        <h2>{{ tr(col.title) }}</h2>
        <NuxtLink v-for="link in col.links" :key="link.to" :to="localePath(link.to)">
          {{ tr(link.label) }}
        </NuxtLink>
      </nav>

      <div class="col contact">
        <h2>{{ tr({ fr: 'Contact', en: 'Contact' }) }}</h2>
        <a :href="`mailto:${brand.email}`">{{ brand.email }}</a>
        <a :href="brand.linkedin" rel="noopener" target="_blank">LinkedIn</a>
        <a :href="brand.x" rel="noopener" target="_blank">X</a>
      </div>
    </div>

    <div class="shell legal">
      <span>© {{ year }} Icon Labs. {{ tr(footer.rights) }}</span>
      <span>{{ brand.domain }}</span>
    </div>
  </footer>
</template>

<style scoped>
/* Le pied de page suit toujours un aplat vermillon — la section contact sur
   la home, le bloc d'appel sur les pages internes. Le filet qui l'ouvrait
   doublait donc une séparation déjà faite par le ton ; il a disparu, comme
   celui qui détachait la ligne légale. */
.foot { padding-top: clamp(3rem, 6vw, 5rem); }
.inner {
  display: grid;
  gap: 2.5rem;
  padding-bottom: clamp(3rem, 6vw, 5rem);
}
.brand img { width: 148px; height: auto; margin-bottom: 1.5rem; }
.brand p { color: var(--on-ground-mute); font-size: var(--fs-sm); }
.origin {
  color: var(--signal-text) !important;
  font-size: var(--fs-xs) !important;
  font-weight: 500;
  margin-top: 0.5rem;
}

.col { display: grid; gap: 0.6rem; align-content: start; }
/* Titre de colonne : casse de phrase et graisse 500, plus de capitales
   espacées en monospace. */
.col h2 {
  font-family: var(--text);
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
  color: var(--on-ground);
  margin-bottom: 0.4rem;
}
.col a {
  font-size: var(--fs-sm);
  color: var(--on-ground-mute);
  justify-self: start;
  transition: color var(--duration-press) var(--ease-out);
}
.col a:hover { color: var(--on-ground); }

.legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  padding-bottom: 2.5rem;
  padding-top: 1.5rem;
  font-size: var(--fs-xs);
  color: var(--on-ground-mute);
}

@media (min-width: 680px) { .inner { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1040px) { .inner { grid-template-columns: 1.6fr 1fr 1fr 1fr; } }
</style>
