<script setup lang="ts">
/**
 * Le compteur d'ARC UI (`arc-animated-number`), un web component Lit.
 *
 * Ce fichier est suffixé `.client` **par nécessité** et non par confort : le
 * module d'ARC appelle `customElements.define` au niveau module, et
 * `customElements` n'existe pas au rendu serveur. Nuxt n'évalue jamais un
 * composant `.client` côté serveur, ce qui suffit à écarter le problème.
 *
 * Le nombre réel est rendu par le serveur dans le repli de `<ClientOnly>` chez
 * l'appelant : la valeur est donc dans le HTML servi, lisible sans JavaScript
 * et par les moteurs. Ici on n'ajoute que le décompte.
 */
import AnimatedNumber from '@arclux/arc-ui-vue/AnimatedNumber'

withDefaults(defineProps<{ value: number; suffix?: string; duration?: number }>(), {
  suffix: '',
  /* DESIGN.md plafonne le mouvement d'interface à 300 ms. Un décompte n'est
     pas un retour d'interface mais une lecture : la charte range ce cas dans
     le registre marketing, où le plafond ne s'applique pas. On reste court
     quand même — au-delà d'une seconde on attend le chiffre au lieu de le
     lire. */
  duration: 900,
})
</script>

<template>
  <AnimatedNumber :value="value" :suffix="suffix" :duration="duration" :decimals="0" />
</template>

<style scoped>
/* Rien ici. La police du compteur se règle par `--font-mono-family`, posé une
   fois pour toutes sur `:root` dans `main.css` : ARC le lit depuis son
   `:host`, et une variable CSS traverse la frontière du shadow DOM là où une
   règle `font-family` venue du dehors est coupée par `:host`. Un `:deep()`
   écrit ici ne pouvait pas marcher — l'attribut de portée est posé sur le
   custom element lui-même, pas sur un ancêtre. */
</style>
