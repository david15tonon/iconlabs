<script setup lang="ts">
import type { WorkInk } from '~~/content/site'

/* La face d'une réalisation.
 *
 * Quand une capture existe, c'est la capture — et il n'en existe qu'une, le
 * seul site client réellement en ligne. Pour les six autres, on ne fabrique
 * pas de faux écran : l'ancien site posait des photos Unsplash dans une
 * fausse barre d'adresse portant un domaine qui ne résout pas, et PRODUCT.md
 * interdit exactement ça.
 *
 * À la place, une **plaque** : le sol neutre de la section, les repères de
 * calage de la feuille sérigraphiée, une trame de points, et le secteur du
 * client estampé. Le secteur plutôt que le nom ou la catégorie — ces deux-là
 * sont déjà dans la légende sous la vignette, et une plaque qui les répète
 * n'ajoute rien. La plaque n'imite rien ; elle se remplace par une capture le
 * jour où le studio en fournit une, sans toucher au gabarit.
 */
defineProps<{
  shot: string | null
  ink: WorkInk
  sector: string
  name: string
}>()
</script>

<template>
  <img
    v-if="shot"
    :src="shot"
    :alt="`Capture du site ${name}`"
    class="face shot"
    width="1280"
    height="800"
    loading="lazy"
    decoding="async"
  >
  <!-- Décoratif : la légende porte déjà le nom et la catégorie, et le secteur
       estampé ici est répété dans le texte de la ligne d'index. -->
  <div v-else class="face plate" :class="`ink-${ink}`" aria-hidden="true">
    <span class="reg a" />
    <span class="reg b" />
    <span class="reg c" />
    <span class="stamp">{{ sector }}</span>
  </div>
</template>

<style scoped>
.face {
  display: block;
  width: 100%;
  /* `height: auto` est obligatoire, et c'est la moitié de la paire : les
     attributs `width`/`height` de l'`<img>` restent (ils réservent la place
     et évitent le saut de mise en page), mais `height="800"` est une valeur
     de présentation qui vaut `height: 800px`. Tant qu'elle n'est pas remise
     à `auto`, la hauteur n'est pas automatique et `aspect-ratio` est ignoré :
     la capture sortait en 538 × 800 au lieu de 538 × 404, et le recadrage
     `cover` la grossissait d'un facteur deux. La plaque, elle, n'a pas
     d'attribut et respectait déjà le rapport — d'où un seul cadre faux
     sur sept. */
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: top center;
  background: var(--ground-sunken);
}

/* La trame est posée en fond et non en pseudo-élément : un `::before` en
   `position: absolute` demanderait un conteneur, et la plaque n'en a pas
   besoin. Les points font 1 px sur un pas de 6 — assez pour se lire comme
   une trame d'impression, trop peu pour devenir un motif. */
.plate {
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(currentColor 0.8px, transparent 0.9px);
  background-size: 6px 6px;
  background-position: 0 0;
  color: var(--trame);
  --trame: color-mix(in oklab, var(--on-ground) 11%, transparent);
}

/* Les repères de calage, repris de la feuille du premier écran : dépareillés
   par encre et décalés de 2 px, c'est le décalage qui prouve les passes.
   Ils ne bougent pas — ils sont la presse, pas l'encre. */
.reg {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 1.5px solid;
  border-radius: 50%;
}
.reg.a { top: 14px;    left: 14px;    border-color: var(--signal); }
.reg.b { top: 16px;    left: 16px;    border-color: var(--accent); }
.reg.c { bottom: 14px; right: 14px;   border-color: var(--state); }

.stamp {
  position: absolute;
  left: 1.25rem;
  bottom: 1.1rem;
  max-width: calc(100% - 2.5rem);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--plate-ink);
}

/* L'encre de la plaque. `ink` est le noir de la charte : c'est le défaut, et
   la règle 80/15/5/5 veut que la couleur reste rare — elle ne touche ici que
   l'estampe et un repère, jamais l'aplat entier.
   Chaque encre passe par sa variante `-text`, dont la valeur change avec le
   thème : sur le clair, bleu et violet portent le texte et le vert non ; sur
   le sombre, c'est l'inverse. Aucune valeur n'est écrite en dur. */
.ink-ink    { --plate-ink: var(--on-ground-soft); }
.ink-signal { --plate-ink: var(--signal-text); }
.ink-accent { --plate-ink: var(--accent-text); }
.ink-state  { --plate-ink: var(--state-text); }
</style>
