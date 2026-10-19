<script setup lang="ts">
import { work, workIntro, workStatus } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr } = useLocale()

const pad = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <section id="work" class="section">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(workIntro.heading) }}</h2>
        <p class="lede">{{ tr(workIntro.lede) }}</p>
      </header>

      <!-- Une ligne par ouvrage, pas une carte : la face d'une réalisation est
           un résumé complet en soi, on n'a pas besoin de l'ouvrir pour savoir
           ce qui a été construit. Les numéros sont du contenu — ils disent un
           ordre réel — et non une décoration de section. -->
      <ol class="list">
        <li v-for="(w, i) in work" :key="w.name" :class="w.status" v-reveal="i * 60">
          <span class="n">{{ pad(i) }}</span>
          <div class="id">
            <h3>{{ w.name }}</h3>
            <p class="place">{{ tr(w.sector) }} · {{ tr(w.place) }}</p>
          </div>
          <p class="summary">{{ tr(w.summary) }}</p>
          <div class="tail">
            <span class="cat">{{ tr(w.category) }}</span>
            <span class="status">{{ tr(workStatus[w.status]) }}</span>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.list { list-style: none; border-top: 2px solid var(--on-ground); }
.list > li {
  display: grid;
  gap: 0.6rem 1.75rem;
  padding-block: 1.6rem;
  border-bottom: 1px solid var(--rule);
}

.n { font-size: var(--fs-xs); color: var(--on-ground-mute); }

h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: var(--fs-xl);
  line-height: 1;
  letter-spacing: -0.035em;
}
.place { margin-top: 0.5rem; font-size: var(--fs-xs); color: var(--on-ground-soft); }
.summary { color: var(--on-ground-soft); }

.tail { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
.cat {
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--on-ground-mute);
}
/* Sur aplat vert le texte est noir (7,76) ; le blanc y tombe à 2,54.
   « En cours » n'est pas un état coloré : c'est l'absence de l'état acquis. */
.status {
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 7px;
  background: var(--state);
  color: var(--on-state);
}
.wip .status { background: var(--rule); color: var(--on-ground); }
.wip h3 { color: var(--on-ground-soft); }

@media (min-width: 900px) {
  .list > li {
    grid-template-columns: 48px minmax(0, 1fr) minmax(0, 1.1fr) 150px;
    align-items: start;
  }
  .n { padding-top: 0.55rem; }
  .summary { padding-top: 0.35rem; }
  .tail { flex-direction: column; align-items: flex-end; text-align: right; gap: 0.6rem; }
}
</style>
