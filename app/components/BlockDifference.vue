<script setup lang="ts">
import type { T } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

/* Trois colonnes de texte nu sur le sol, et rien d'autre : ni icône, ni
 * cadre égal, ni filet. C'est la seule forme du site qui met trois choses
 * côte à côte, et elle sert DEUX fois depuis la v10 — les résultats sur la
 * home, les trois engagements sur /offres et /methode.
 *
 * Elle sert deux fois plutôt que d'être copiée en deux composants parce que
 * c'est la même forme, et qu'un `SectionResults.vue` n'aurait différé que
 * par le contenu. La charte interdit la grille de cartes égales (§ Don'ts) ;
 * ce que le document appelle « trois cartes » est rendu ici sans la forme
 * proscrite : la quantité est monumentale, le reste est une légende.
 *
 * `tone` dit lequel des deux registres on sert :
 *   · `figure` — `lead` est le GRAND CARACTÈRE. Il est dimensionné pour ce
 *     qu'il accueillera (« −40 % », « ×3 », « 4 h/semaine ») et porte
 *     aujourd'hui le groupe nominal court du fait vérifiable. Le jour où un
 *     chiffre existe, il prend sa place sans qu'on touche au composant.
 *   · `heading` — `lead` est un titre de colonne ordinaire.
 *
 * ⚠️ Il n'y a pas de champ optionnel qui vaudrait « vide » : `caption` est
 * soit un nom de client, soit absent de la donnée. Un champ nullable EST un
 * gabarit vide, et une case vide à cet endroit se lit comme une preuve
 * manquante — la faute payée le 2026-10-20 par la grille des réalisations.
 */
withDefaults(
  defineProps<{
    id?: string
    heading: T
    lede?: T
    note?: T
    items: { lead: T; body: T; caption?: string }[]
    tone?: 'figure' | 'heading'
    raised?: boolean
  }>(),
  { tone: 'heading', raised: false },
)

const { tr } = useLocale()
</script>

<template>
  <section :id="id" class="section" :class="{ bg: raised }">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(heading) }}</h2>
        <p v-if="lede" class="lede">{{ tr(lede) }}</p>
      </header>

      <ul class="grid" :class="tone">
        <li v-for="(item, i) in items" :key="i" v-reveal="i * 90">
          <p v-if="item.caption" class="caption">{{ item.caption }}</p>
          <h3>{{ tr(item.lead) }}</h3>
          <p class="body">{{ tr(item.body) }}</p>
        </li>
      </ul>

      <!-- Ce que la section ne dit pas encore, et pourquoi. Un bloc de trois
           résultats sans chiffres a besoin de cette phrase : sans elle, il se
           lit comme trois chiffres qu'on aurait oublié de mettre. -->
      <p v-if="note" class="note label" v-reveal="300">{{ tr(note) }}</p>
    </div>
  </section>
</template>

<style scoped>
/* Le filet qui ouvrait la liste a disparu sans être remplacé : la section
   est tenue par l'espace seul, comme le veut la charte. */
.bg { background: var(--ground-raise); }

.grid {
  list-style: none;
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
}
.grid > li { display: grid; align-content: start; gap: 0.75rem; }

h3 { font-size: var(--fs-lg); }
.body { color: var(--on-ground-soft); font-size: var(--fs-sm); max-width: var(--measure-tight); }

/* Le registre monumental. Le grand caractère porte la quantité — ou, tant
   qu'aucune n'est mesurée, le groupe nominal le plus court du fait. Il est
   déjà à la taille qu'un chiffre demandera, pour que le remplacement ne
   déplace rien. */
.figure > li { gap: 0.5rem; }
.figure .caption {
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--on-ground-mute);
}
.figure h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: var(--fs-xl);
  line-height: 1.02;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.figure .body { font-size: var(--fs-base); margin-top: 0.35rem; }

/* L'encre tourne d'une colonne à l'autre : une classe d'information par
   encre, et toutes par leur variante `-text`, jamais l'encre pleine.
   Sur le sol clair, Automation Green plein ne vaut que 2,54. */
.figure > li:nth-child(1) h3 { color: var(--signal-text); }
.figure > li:nth-child(2) h3 { color: var(--accent-text); }
.figure > li:nth-child(3) h3 { color: var(--state-text); }

.note { margin-top: clamp(2rem, 4vw, 3rem); max-width: var(--measure-wide); }

@media (min-width: 880px) { .grid { grid-template-columns: repeat(3, 1fr); } }
</style>
