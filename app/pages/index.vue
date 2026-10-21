<script setup lang="ts">
import {
  seo, brand, offers,
  resultsIntro, results,
  systemsIntro, systems,
  inUseIntro,
} from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, priceNode, SITE_URL } from '~/composables/useSiteHead'

/**
 * La home, à trois adresses :
 *   /     → langue déduite du pays (server/middleware/geo-locale)
 *   /fr   → français forcé
 *   /en   → anglais forcé
 * Les deux adresses explicites existent pour que les moteurs indexent chaque
 * version ; `hreflang` les relie. La langue n'est plus décidée ici mais dans
 * app/middleware/locale.global.ts, commun à toutes les pages.
 */
definePageMeta({ alias: ['/fr', '/en'] })

const { tr } = useLocale()

useSiteHead({ title: seo.title, description: seo.description })

/* Les résultats et les engagements passent par la même forme (trois colonnes
   de texte sur le sol nu) : le mappage est écrit ici, au point d'appel, parce
   que c'est la PAGE qui décide ce qui occupe le grand caractère. Pour les
   résultats c'est `outcome` — la tâche qui a quitté le client aujourd'hui,
   un chiffre le jour où un client en mesure un. */
const resultItems = computed(() =>
  results.map((r) => ({ lead: r.outcome, body: r.detail, caption: r.client })),
)

/* Les quatre systèmes dans la pile : la citation du client vient avant le nom
   du système, parce que c'est le problème qu'on reconnaît en premier.
   Pas de numéro — quatre problèmes n'ont pas d'ordre, et la charte n'admet
   la numérotation que là où elle dit un ordre réel. */
const systemItems = computed(() =>
  systems.map((s) => ({ id: s.slug, over: s.problem, title: s.system, body: s.body })),
)

// Fiche d'organisation pour les moteurs — uniquement des faits que le studio
// peut produire ; aucune métrique inventée. C'est la seule fiche complète du
// site : les pages internes la référencent (`ORG`) sans la redire.
//
// Le catalogue est rebâti sur `offers` depuis la v10 : il était construit sur
// `servicePages`, qui n'existe plus. Un catalogue qui décrit des services que
// la page n'affiche plus est une fiche qui ment aux moteurs.
//
// Les prix y sont écrits, maintenant qu'ils sont publics — mais seulement les
// prix FERMES. « À partir de 9 000 € » est un plancher, pas un prix : il entre
// en `description`, jamais en `price`, sinon la fiche affirme un prix fixe que
// le studio ne tient pas.
useJsonLd(() => ({
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#studio`,
  name: 'Icon Labs',
  url: SITE_URL,
  email: brand.email,
  logo: `${SITE_URL}/brand/icon-512.png`,
  areaServed: ['Europe', 'Africa'],
  description: tr(seo.description),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: tr({ fr: 'Offres', en: 'Offers' }),
    itemListElement: offers.map((offer) => ({
      '@type': 'Offer',
      name: tr(offer.name),
      description: tr(offer.body),
      ...priceNode(offer.amount),
      itemOffered: { '@type': 'Service', name: tr(offer.name) },
    })),
  },
}))
</script>

<template>
  <!-- LES NEUF PASSES DE LA V10, dans l'ordre de DESIGN.md § Layout.

       `ScrollStory` ne figure plus sur la home depuis la v7, et `InkBar`
       depuis le 2026-10-20. Les deux composants, les 135 images et la donnée
       `inks` sont intacts dans le dépôt : il suffit de remonter la ligne.
       Les raisons tiennent toujours — un seul champ possède le premier écran,
       la charte de marque écrit « peu d'animations », la règle 80/15/5/5 est
       une consigne interne qui n'apprend rien à un prospect, et les images du
       récit sont générées dans l'ancienne palette claire.
       <ScrollStory /> <InkBar /> -->

  <!-- 1. La feuille. -->
  <SectionHero />

  <!-- 2. Le bandeau de preuves. Les quatre quantités sont calculées depuis
          `work`, jamais recopiées : c'est ce qui les empêche de mentir. -->
  <BlockMarkers />

  <!-- 3. Les résultats. Le grand caractère est dimensionné pour le chiffre
          qu'il accueillera ; il porte aujourd'hui le fait vérifiable. La note
          dit pourquoi il n'y a pas encore de chiffre — sans elle, la section
          se lirait comme trois chiffres qu'on aurait oublié de mettre. -->
  <BlockDifference
    id="resultats"
    :heading="resultsIntro.heading"
    :note="resultsIntro.note"
    :items="resultItems"
    tone="figure"
  />

  <!-- 4. Quatre problèmes, quatre systèmes. La pile qui colle est le seul
          endroit du site où empiler veut dire quelque chose : une objection
          à la fois, chacune recouvrant la précédente. -->
  <SectionServices
    id="systemes"
    :heading="systemsIntro.heading"
    :lede="systemsIntro.lede"
    :items="systemItems"
  />

  <!-- 5. L'offre : le Sprint domine, les deux autres niveaux sont dits en une
          ligne, et l'échelle complète est à un clic. -->
  <SectionOffer />

  <!-- 6. La méthode, semaine 0 à semaine 3. Sur le sol nu : l'offre qui
          précède est une bande surélevée. -->
  <SectionProcess :raised="false" />

  <!-- 7. Ce qui tourne. À la place d'une section « témoignages » qui ne peut
          pas exister — aucune citation client n'a été fournie. Une preuve
          qu'on peut aller ouvrir vaut mieux qu'une citation invérifiable.
          Pas de bloc-index ici : /cas le porte en entier. -->
  <SectionWork :intro="inUseIntro" :index="false" outbound raised />

  <!-- 8. La FAQ, prix compris. -->
  <SectionFaq />

  <!-- 9. La dernière passe : l'encre bleue prend toute la feuille. -->
  <SectionContact />
</template>
