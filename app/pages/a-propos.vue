<script setup lang="ts">
import { aProposPage, team, values, brand } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG } from '~/composables/useSiteHead'

/* Remplace `/studio`, supprimée le 2026-10-21. L'ancienne adresse n'est pas
   abandonnée : `nuxt.config.ts` la redirige en 301 vers celle-ci, variantes
   de langue comprises, pour que son signal passe au lieu de se perdre. */
definePageMeta({ alias: ['/fr/a-propos', '/en/a-propos'] })

const { tr } = useLocale()

const { url } = useSiteHead({
  title: { fr: 'À propos — Icon Labs', en: 'About — Icon Labs' },
  description: aProposPage.lede,
})

/* `AboutPage` : la page parle du studio, elle n'est pas le studio. La fiche
   complète (`ProfessionalService`) vit sur la home ; on la désigne ici comme
   sujet au lieu de la redire. */
useJsonLd(() => ({
  '@type': 'AboutPage',
  name: tr(aProposPage.title).replace('\n', ' '),
  description: tr(aProposPage.lede),
  url: url.value,
  mainEntity: ORG,
}))
</script>

<template>
  <PageHero :title="aProposPage.title" :lede="aProposPage.lede" />

  <section class="section">
    <div class="shell inner">
      <div class="prose" v-reveal>
        <p v-for="(para, i) in aProposPage.body" :key="i">{{ tr(para) }}</p>
        <p class="origin">{{ tr(brand.origin) }}</p>
      </div>

      <div class="aside" v-reveal="120">
        <h2>{{ tr(aProposPage.teamHeading) }}</h2>
        <!-- UN SEUL rôle par personne. Six casquettes chacune donnaient
             l'image d'une petite équipe dispersée ; une ligne nette dit qui
             fait quoi. Pas de photo ni de LinkedIn tant qu'ils n'existent
             pas — le traitement est typographique, il n'y a pas d'avatar
             gris à combler. -->
        <ul class="team">
          <li v-for="member in team" :key="member.name">
            <strong>{{ member.name }}</strong>
            <span>{{ tr(member.role) }}</span>
          </li>
        </ul>

        <h2 class="second">{{ tr(aProposPage.valuesHeading) }}</h2>
        <p class="values">{{ values.map((v) => tr(v)).join(' · ') }}</p>
      </div>
    </div>
  </section>

  <!-- Ce qu'on ne fait pas. Dire non vite est ce qui rend tenable le prix
       fixe sur le reste : cette section est donc une preuve, pas une
       coquetterie. -->
  <section class="section limits">
    <div class="shell">
      <header v-reveal>
        <h2>{{ tr(aProposPage.limits.heading) }}</h2>
        <p class="lede">{{ tr(aProposPage.limits.lede) }}</p>
      </header>
      <ul>
        <li v-for="(item, i) in aProposPage.limits.items" :key="i" v-reveal="i * 70">
          {{ tr(item) }}
        </li>
      </ul>
    </div>
  </section>

  <BlockCta />
</template>

<style scoped>
.inner { display: grid; gap: clamp(2.5rem, 5vw, 5rem); align-items: start; }
.prose { display: grid; gap: 1.25rem; }
.prose p { color: var(--on-ground-soft); font-size: var(--fs-lg); max-width: var(--measure); }
.origin {
  color: var(--signal-text) !important;
  font-size: var(--fs-xs) !important;
  font-weight: 500;
  margin-top: 0.75rem;
}

/* Titres de colonne en casse de phrase : plus de capitales espacées, plus de
   monospace — la charte la réserve au code littéral. */
.aside h2 {
  font-family: var(--text);
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
  color: var(--on-ground);
  margin-bottom: 1rem;
}
.aside .second { margin-top: 2.5rem; }

/* La liste d'équipe n'est pas réglée par un filet sous chaque ligne, et les
   valeurs ne sont pas des boîtes contournées : espace et ton. */
.team { list-style: none; display: grid; gap: 0.85rem; }
.team li {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  justify-content: space-between;
  align-items: baseline;
}
.team strong { font-size: var(--fs-lg); font-weight: 500; }
.team span { font-size: var(--fs-sm); color: var(--on-ground-mute); }

.values { color: var(--on-ground-mute); font-size: var(--fs-xs); }

/* Bande surélevée : le pas de ton tient la section, pas un filet. */
.limits { background: var(--ground-raise); }
.limits h2 { font-size: var(--fs-2xl); margin-bottom: 1rem; }
.limits header { margin-bottom: clamp(2rem, 4vw, 3.5rem); }
.limits ul { list-style: none; display: grid; gap: clamp(1rem, 2vw, 1.5rem); }
.limits li { font-size: var(--fs-lg); max-width: var(--measure-wide); }

@media (min-width: 900px) { .inner { grid-template-columns: 1.3fr 1fr; } }
</style>
