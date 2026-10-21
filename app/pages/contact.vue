<script setup lang="ts">
import { contactPage, faq } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG } from '~/composables/useSiteHead'

/* Une page depuis la v10. C'était une section de la home (`/#contact`), et
   une ancre ne peut pas être une destination de menu : elle ramène sur la
   home depuis chaque page interne, elle n'a pas de titre propre, et elle
   n'entre pas au sitemap. Toutes les cibles `/#contact` du site pointent
   désormais ici. */
definePageMeta({ alias: ['/fr/contact', '/en/contact'] })

const { tr } = useLocale()

const { url } = useSiteHead({
  title: { fr: 'Réserver un appel — Icon Labs', en: 'Book a call — Icon Labs' },
  description: contactPage.lede,
})

/* Les deux questions que se pose quelqu'un qui est sur le point d'écrire :
   ce que ça coûte, et en combien de temps c'est en production. Elles sont
   reprises telles quelles de la FAQ — les réécrire pour cette page ferait
   deux réponses à la même question, qui divergeraient au premier changement
   de prix. */
const asked = computed(() => faq.slice(0, 2))

useJsonLd(() => ({
  '@type': 'ContactPage',
  name: tr(contactPage.title).replace('\n', ' '),
  description: tr(contactPage.lede),
  url: url.value,
  mainEntity: ORG,
}))
</script>

<template>
  <PageHero :title="contactPage.title" :lede="contactPage.lede" />

  <!-- Le titre est déjà porté par `PageHero` : la section ne le redit pas.
       Elle garde son aplat bleu, qui est la dernière passe de la feuille —
       ici, c'est la page entière qui finit dessus. -->
  <SectionContact :heading="false" />

  <section class="section">
    <div class="shell">
      <ul class="asked">
        <li v-for="(item, i) in asked" :key="i" v-reveal="i * 80">
          <h2>{{ tr(item.q) }}</h2>
          <p>{{ tr(item.a) }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Deux réponses posées sur le sol, sans panneau : la section qui précède est
   un aplat d'encre, et deux sections voisines ne partagent jamais la même
   composition. Pas de `BlockCta` ici — on est déjà sur la page d'appel, et
   un second bouton vers elle-même n'irait nulle part. */
.asked { list-style: none; display: grid; gap: clamp(2rem, 4vw, 3.5rem); }
.asked > li { display: grid; align-content: start; gap: 0.75rem; }
.asked h2 { font-size: var(--fs-lg); }
.asked p { color: var(--on-ground-soft); max-width: var(--measure); }

@media (min-width: 880px) {
  .asked { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 5vw, 5rem); }
}
</style>
