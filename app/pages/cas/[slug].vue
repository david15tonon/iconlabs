<script setup lang="ts">
import { casePage, casePages, workStatus } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useSiteHead, useJsonLd, ORG, SITE_URL } from '~/composables/useSiteHead'

definePageMeta({
  alias: ['/fr/cas/:slug()', '/en/cas/:slug()'],
  /* Une adresse inconnue doit tomber en 404, pas afficher une page vide.
     Le garde interroge `casePages()` et non `work` : une réalisation qui n'a
     pas de quoi remplir sa page n'en a pas, et son slug n'est pas une
     adresse. C'est la même règle qu'au sitemap, lu depuis la même source. */
  validate: (route) => casePages().some((c) => c.slug === route.params.slug),
})

const route = useRoute()
const { locale, tr, localePath } = useLocale()

const page = computed(() => casePages().find((c) => c.slug === route.params.slug)!)

const { url } = useSiteHead({
  title: {
    fr: `${page.value.name} — Icon Labs`,
    en: `${page.value.name} — Icon Labs`,
  },
  description: page.value.summary,
})

/* La fiche. Cinq lignes, toutes présentes dans la donnée de toute
   réalisation : il n'y a donc aucune ligne à masquer ici, et aucune à
   remplir d'un tiret. */
const rows = computed(() => [
  { k: casePage.rows.client, v: { fr: page.value.name, en: page.value.name } },
  { k: casePage.rows.sector, v: page.value.sector },
  { k: casePage.rows.place,  v: page.value.place },
  { k: casePage.rows.offer,  v: page.value.category },
  { k: casePage.rows.status, v: workStatus[page.value.status] },
])

useJsonLd(() => ({
  '@graph': [
    {
      '@type': 'CreativeWork',
      '@id': `${url.value}#cas`,
      name: page.value.name,
      headline: tr(page.value.result!),
      description: tr(page.value.summary),
      url: url.value,
      creator: ORG,
      ...(page.value.href ? { sameAs: page.value.href } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Icon Labs', item: `${SITE_URL}/${locale.value}` },
        { '@type': 'ListItem', position: 2, name: tr(casePage.back), item: `${SITE_URL}/${locale.value}/cas` },
        { '@type': 'ListItem', position: 3, name: page.value.name, item: url.value },
      ],
    },
  ],
}))
</script>

<template>
  <!-- LE RÉSULTAT EST LE TITRE, c'est l'ordre imposé par le document : on
       apprend ce qui a changé avant d'apprendre pour qui. Le nom du client
       est juste en dessous, dans la fiche. -->
  <PageHero :title="page.result!" :lede="page.summary" />

  <section class="section">
    <div class="shell inner">
      <!-- Le visuel. Une capture quand elle existe, la plaque sinon : on ne
           fabrique pas de faux écran, c'est la règle de PRODUCT.md. -->
      <figure class="shot" v-reveal>
        <WorkPlate
          :shot="page.shot"
          :ink="page.ink"
          :sector="tr(page.sector)"
          :name="page.name"
        />
        <figcaption v-if="page.href">
          <a :href="page.href" target="_blank" rel="noopener">{{ tr(casePage.visit) }}</a>
        </figcaption>
      </figure>

      <div class="facts" v-reveal="90">
        <h2>{{ tr(casePage.fiche) }}</h2>
        <dl>
          <div v-for="row in rows" :key="row.k.fr">
            <dt>{{ tr(row.k) }}</dt>
            <dd>{{ tr(row.v) }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <!-- CE QU'ON A CONSTRUIT. Les blocs « Avant », « Après » et la citation du
       document ne paraissent PAS : la matière n'existe pas, et un gabarit
       affiché vide se lit comme une preuve manquante. Ils reviendront quand
       le client aura mesuré ses gains et autorisé leur publication — pas de
       « — », pas de section grise, pas de « à venir ». -->
  <section class="section bg">
    <div class="shell">
      <h2 class="head" v-reveal>{{ tr(casePage.built) }}</h2>
      <ul class="built">
        <li v-for="(item, i) in page.built" :key="i" v-reveal="i * 70">{{ tr(item) }}</li>
      </ul>

      <!-- `localePath` et non un préfixe reconstruit : sur une adresse nue
           (/cas/mia-corporate), le retour doit rester nu, sinon le visiteur
           change d'adresse sans l'avoir demandé. -->
      <NuxtLink class="back" :to="localePath('/cas')" v-reveal="200">
        {{ tr(casePage.back) }}
      </NuxtLink>
    </div>
  </section>

  <BlockCta />
</template>

<style scoped>
.inner { display: grid; gap: clamp(2rem, 5vw, 4rem); align-items: start; }

.shot { display: grid; gap: 0.75rem; }
.shot figcaption a {
  justify-self: start;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--signal-text);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.15rem;
  transition: color var(--duration-press) var(--ease-out);
}
.shot figcaption a::after { content: ' \2197'; }
.shot figcaption a:hover { color: var(--on-ground); }

/* Titre de colonne en casse de phrase : plus de capitales espacées, la
   charte réserve la monospace au code littéral. */
.facts h2 {
  font-family: var(--text);
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 1.2;
  color: var(--on-ground);
  margin-bottom: 1rem;
}
.facts dl > div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--rule);
}
.facts dt { font-size: var(--fs-xs); color: var(--on-ground-mute); }
.facts dd { font-size: var(--fs-xs); color: var(--on-ground); text-align: right; }

/* Bande surélevée : le pas de ton tient la section, pas un filet. */
.bg { background: var(--ground-raise); }
.head { font-size: var(--fs-2xl); margin-bottom: clamp(2rem, 4vw, 3.5rem); }
.built { list-style: none; display: grid; gap: clamp(1rem, 2vw, 1.5rem); }
.built li { font-size: var(--fs-lg); max-width: var(--measure-wide); }

.back {
  display: inline-block;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--signal-text);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.2rem;
  transition: color var(--duration-press) var(--ease-out);
}
.back::before { content: '\2190 '; }
.back:hover { color: var(--on-ground); }

@media (min-width: 900px) { .inner { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); } }
</style>
