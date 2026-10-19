<script setup lang="ts">
import { inks } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr } = useLocale()
</script>

<template>
  <!-- La règle 80 / 15 / 5 / 5 de la charte, rendue littérale : les largeurs
       SONT les proportions. Elle sépare deux passes à la place d'un filet.
       Elle ne dit rien qu'un lecteur d'écran doive entendre. -->
  <div class="inks" aria-hidden="true">
    <span
      v-for="ink in inks"
      :key="ink.role"
      :class="ink.role"
      :style="{ flex: ink.flex }"
    >{{ tr(ink.label) }}</span>
  </div>
</template>

<style scoped>
.inks {
  display: flex;
  height: 34px;
  margin-inline: var(--gutter);
  max-width: var(--maxw);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.inks span {
  display: flex;
  align-items: center;
  padding-left: 10px;
  overflow: hidden;
  white-space: nowrap;
}
/* Sur aplat vert c'est le noir qui tient (7,76) ; le blanc y tombe à 2,54. */
.ground { background: var(--ground-sunken); color: var(--on-ground-soft); }
.signal { background: var(--signal); color: var(--on-signal); }
.accent { background: var(--accent); color: var(--on-accent); }
.state  { background: var(--state);  color: var(--on-state); }

/* Sous 700 px les deux encres à 5 % ne peuvent plus porter leur légende :
   elles gardent leur largeur, qui est l'information, et perdent le texte. */
@media (max-width: 700px) {
  .accent, .state { font-size: 0; }
}
</style>
