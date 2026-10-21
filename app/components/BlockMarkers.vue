<script setup lang="ts">
import { proof } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useCounts } from '~/composables/useCounts'
const { tr } = useLocale()

/* La bande ne portait que des engagements jusqu'au 2026-10-21 ; elle porte
 * désormais des chiffres d'ACTIVITÉ, et c'est ce qui change tout : un
 * engagement se promet, un chiffre d'activité se vérifie. Ils sont donc tous
 * traçables jusqu'aux fiches de `work`, et la note les date.
 *
 * Le décompte d'ARC UI (`CountUp`) se branche enfin ici. Il dormait dans le
 * dépôt depuis la v8 : seul `InkBar` s'en servait, et `InkBar` est au repos
 * depuis le 2026-10-20. Il ne se branche que maintenant parce que les quatre
 * quantités sont enfin COMPTABLES — les anciennes ne l'étaient pas, « 2–4 »
 * est un intervalle et « 0 » se compte de zéro à zéro.
 *
 * ⚠️ La valeur réelle est rendue par le SERVEUR dans le repli de
 * `<ClientOnly>` : le chiffre est dans le HTML servi, lisible sans
 * JavaScript et par les moteurs. Le décompte n'est qu'une animation posée
 * par-dessus, jamais la source du nombre.
 */
const counts = useCounts()
</script>

<template>
  <section class="markers">
    <div class="shell">
      <ul>
        <li v-for="(item, i) in proof.items" :key="item.key" v-reveal="i * 80">
          <span class="value">
            <ClientOnly>
              <CountUp :value="counts[item.key]" :suffix="item.suffix" />
              <template #fallback>{{ counts[item.key] }}{{ item.suffix }}</template>
            </ClientOnly>
          </span>
          <span class="desc">{{ tr(item.label) }}</span>
        </li>
      </ul>
      <p class="note label" v-reveal="260">{{ tr(proof.note) }}</p>
    </div>
  </section>
</template>

<style scoped>
/* La bande se détache du sol par le ton, pas par un filet : `--ground-raise`
   sur `--ground`, le seul niveau de surélévation du système. */
.markers {
  background: var(--ground-raise);
  padding-block: clamp(2.5rem, 4vw, 4.5rem);
}
ul { list-style: none; display: grid; gap: 2rem; }
li { display: grid; gap: 0.5rem; }
.value {
  font-family: var(--display);
  font-size: var(--fs-xl);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.035em;
  color: var(--signal-text);
}
.desc { color: var(--on-ground-soft); max-width: 24ch; }
/* La note porte une définition, pas une mention légale : elle se lit, donc
   elle garde la mesure d'un paragraphe au lieu de filer sur toute la page. */
.note { margin-top: 2rem; max-width: var(--measure-wide); }

/* Quatre quantités et non trois depuis la v10 : à deux colonnes elles se
   rangent deux par deux, à quatre colonnes elles se lisent d'un trait. */
@media (min-width: 620px) { ul { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; } }
@media (min-width: 960px) { ul { grid-template-columns: repeat(4, 1fr); gap: 2.5rem; } }
</style>
