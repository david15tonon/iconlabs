<script setup lang="ts">
import { securitePage } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG } from '~/composables/useSiteHead'

definePageMeta({ alias: ['/fr/securite', '/en/securite'] })

const { tr } = useLocale()

const { url } = useSiteHead({
  title: { fr: 'Sécurité & conformité — Icon Labs', en: 'Security & compliance — Icon Labs' },
  description: securitePage.lede,
})

/* ⚠️ CETTE PAGE NE PORTE QUE CE QUI EST STRUCTURELLEMENT VRAI.
 *
 * Le dépôt ne contient aucune matière de conformité : ni politique RGPD, ni
 * contrat de sous-traitance, ni politique de modèle. Cinq points attendent
 * une confirmation de l'utilisateur et NE DOIVENT PAS être ajoutés au jugé —
 * l'hébergeur des systèmes clients et sa région, les modèles utilisés et ce
 * que leurs conditions disent de l'entraînement, l'existence d'un DPA, celle
 * d'un registre des traitements, et le délai de traitement d'une demande
 * d'effacement. Voir tasks/todo.md § v10.
 *
 * Une promesse de conformité non tenue est un risque juridique, pas une
 * formule de page. Le bloc « ce que cette page ne dit pas encore » assume le
 * silence au lieu de le masquer : c'est la seule façon honnête de publier
 * une page de sécurité incomplète.
 */
useJsonLd(() => ({
  '@type': 'WebPage',
  name: tr(securitePage.title).replace('\n', ' '),
  description: tr(securitePage.lede),
  url: url.value,
  publisher: ORG,
}))
</script>

<template>
  <PageHero :title="securitePage.title" :lede="securitePage.lede" />

  <section class="section">
    <div class="shell">
      <ul class="points">
        <li v-for="(item, i) in securitePage.items" :key="i" v-reveal="i * 70">
          <h2>{{ tr(item.title) }}</h2>
          <p>{{ tr(item.body) }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Ce que la page ne dit pas, et pourquoi. Nommer le silence vaut mieux
       que de le combler : une page qui promettrait « hébergement UE par
       défaut » sans l'avoir vérifié engagerait le studio sur un fait que
       personne ici ne peut produire. -->
  <section class="section bg">
    <div class="shell">
      <div class="pending" v-reveal>
        <h2>{{ tr(securitePage.pending.heading) }}</h2>
        <p>{{ tr(securitePage.pending.body) }}</p>
      </div>
    </div>
  </section>

  <BlockCta />
</template>

<style scoped>
/* Les quatre points sont posés sur le sol, espacés, sans panneau ni filet :
   ce sont quatre affirmations de même rang, pas une liste à cocher. */
.points { list-style: none; display: grid; gap: clamp(2.5rem, 5vw, 4rem); }
.points > li { display: grid; align-content: start; gap: 0.75rem; }
.points h2 { font-size: var(--fs-lg); }
.points p { color: var(--on-ground-soft); max-width: var(--measure); }

.bg { background: var(--ground-raise); }
.pending { display: grid; gap: 1rem; }
.pending h2 { font-size: var(--fs-lg); }
.pending p { color: var(--on-ground-soft); max-width: var(--measure-wide); }

@media (min-width: 900px) {
  .points { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 5vw, 5rem); }
  .pending { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: clamp(2rem, 5vw, 4rem); }
}
</style>
