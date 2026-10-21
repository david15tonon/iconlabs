<script setup lang="ts">
import type { T } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

/* Le bloc de dates d'une affiche de concert : un filet de tête porteur, le
 * titre en capitales, une liste clé/valeur, et le bouton pleine largeur qui
 * la referme.
 *
 * Extrait de `SectionHero` le 2026-10-21, parce qu'il sert désormais DEUX
 * fois — la feuille, et la carte Sprint de l'offre. C'est la seule forme du
 * site qui s'autorise un filet non décoratif : il tient la tête du bloc, il
 * ne sépare pas deux choses.
 *
 * ⚠️ Aucun créneau n'est écrit nulle part ici. Les disponibilités réelles
 * viennent de Cal.com, qui n'est pas branché : en inventer serait affirmer
 * une disponibilité qu'on n'a pas. Le bloc dit ce qu'il est — une durée, un
 * prix, un interlocuteur — et rien d'autre.
 */
defineProps<{
  heading: T
  note?: T
  rows: { k: T; v: T }[]
  action: T
  /** Chemin interne. Préfixé par `localePath` : un visiteur de /fr y reste. */
  to: string
}>()

const { tr, localePath } = useLocale()
</script>

<template>
  <div class="block">
    <p class="heading">{{ tr(heading) }}</p>
    <p v-if="note" class="note">{{ tr(note) }}</p>
    <dl>
      <div v-for="row in rows" :key="row.k.fr">
        <dt>{{ tr(row.k) }}</dt>
        <dd>{{ tr(row.v) }}</dd>
      </div>
    </dl>
    <NuxtLink class="book" :to="localePath(to)">{{ tr(action) }}</NuxtLink>
  </div>
</template>

<style scoped>
/* Le filet de tête de 2 px est PORTEUR : il ouvre le bloc comme le filet
   d'un bloc de dates ouvre une affiche. C'est l'exception nommée à la règle
   « rien ne se sépare par un filet », parce qu'il ne sépare rien. */
.block { border-top: 2px solid var(--on-ground); padding-top: 1.1rem; }

/* Pas un `<h2>` : ce bloc se pose dans une feuille qui a déjà son titre, et
   dans une carte d'offre qui a déjà le sien. Lui donner un niveau de titre
   casserait la hiérarchie du document partout où il tombe. */
.heading {
  font-family: var(--display);
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.note { font-size: var(--fs-xs); color: var(--on-ground-soft); margin-top: 0.3rem; }

dl { margin-top: 1.2rem; }
dl > div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--rule);
}
dt { font-size: var(--fs-xs); color: var(--on-ground-mute); }
dd { font-size: var(--fs-xs); color: var(--on-ground); text-align: right; }

.book {
  display: block;
  margin-top: 1.4rem;
  background: var(--on-ground);
  color: var(--ground);
  text-align: center;
  padding: 0.95rem 1rem;
  font-weight: 500;
  transition:
    background var(--duration-press) var(--ease-out),
    color var(--duration-press) var(--ease-out);
}
.book:hover { background: var(--signal); color: var(--on-signal); }
</style>
