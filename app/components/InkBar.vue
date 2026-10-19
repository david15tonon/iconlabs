<script setup lang="ts">
import { inks } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr } = useLocale()

/* La barre se remplit à son arrivée dans l'écran : chaque segment part d'une
   largeur nulle et pousse jusqu'à sa proportion. C'est la seule façon de
   rendre la règle 80/15/5/5 lisible comme une règle et non comme un bandeau
   décoratif — on voit le noir prendre sa part, puis le bleu, puis les deux
   cinq pour cent.

   `v-reveal` ne convient pas ici : il fait monter une opacité, et ce qu'on
   veut faire croître est une largeur. On pose donc notre propre observateur,
   une seule fois, et on le débranche dès qu'il a servi. */
const bar = ref<HTMLElement | null>(null)
const filled = ref(false)

onMounted(() => {
  if (!bar.value) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    filled.value = true
    return
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      filled.value = true
      io.disconnect()
    },
    { threshold: 0.4 },
  )
  io.observe(bar.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <!-- La règle 80 / 15 / 5 / 5 de la charte, rendue littérale : les largeurs
       SONT les proportions. Elle sépare deux passes à la place d'un filet. -->
  <div ref="bar" class="inks" :class="{ filled }">
    <span
      v-for="(ink, i) in inks"
      :key="ink.role"
      :class="ink.role"
      :style="{ '--flex': ink.flex, '--step': `${i * 90}ms` }"
    >
      <span class="legend">
        {{ tr(ink.label) }}
        <ClientOnly>
          <CountUp :value="ink.value" />
          <template #fallback>{{ ink.value }}</template>
        </ClientOnly>
      </span>
    </span>
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
.inks > span {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 0;
  flex-basis: 0;
  /* Sans ça, `min-width: auto` empêche un segment de descendre sous la
     largeur de sa légende : les deux segments à 5 % restaient larges et
     volaient leur part au 80 %, qui sortait à 76. Les proportions sont
     l'information — elles doivent être exactes. */
  min-width: 0;
  transition: flex-grow var(--duration-overlay) var(--ease-out) var(--step);
}
.inks.filled > span { flex-grow: var(--flex); }

.legend {
  padding-left: 10px;
  opacity: 0;
  transition: opacity var(--duration-press) var(--ease-out) calc(var(--step) + var(--duration-overlay));
}
.inks.filled .legend { opacity: 1; }

/* Sur aplat vert c'est le noir qui tient (7,76) ; le blanc y tombe à 2,54. */
.ground { background: var(--ground-sunken); color: var(--on-ground-soft); }
.signal { background: var(--signal); color: var(--on-signal); }
.accent { background: var(--accent); color: var(--on-accent); }
.state  { background: var(--state);  color: var(--on-state); }

/* Sous 700 px les deux encres à 5 % ne peuvent plus porter leur légende :
   elles gardent leur largeur, qui est l'information, et perdent le texte. */
@media (max-width: 700px) {
  .accent .legend, .state .legend { font-size: 0; }
}

/* Mouvement réduit : la barre est à sa place dès le départ, et c'est tout ce
   que la mise en scène apportait. */
@media (prefers-reduced-motion: reduce) {
  .inks > span { flex-grow: var(--flex); transition: none; }
  .legend { opacity: 1; transition: none; }
}
</style>
