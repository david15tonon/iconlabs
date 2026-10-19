<script setup lang="ts">
import { hero } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, locale } = useLocale()

/* `facts` porte des **gras** parce que deux fragments seulement sont marqués,
   dans les deux langues. On les coupe plutôt que de poser un v-html : le
   texte vient de notre propre fichier, mais la règle du dépôt est de ne
   jamais injecter de HTML depuis le contenu. */
const factParts = computed(() => tr(hero.facts).split('**'))
</script>

<template>
  <section class="sheet" aria-labelledby="sheet-title">
    <!-- Les repères de calage. Décalés de 2 px et dépareillés par encre :
         c'est le décalage qui prouve les passes. Décoratifs pour une liseuse
         d'écran, donc masqués. -->
    <span class="reg b" aria-hidden="true" />
    <span class="reg p" aria-hidden="true" />
    <span class="reg g" aria-hidden="true" />

    <div class="shell grid">
      <h1 id="sheet-title">
          <span
            v-for="line in hero.lines"
            :key="line.fr"
            class="line"
            :class="`ink-${line.ink}`"
          >{{ line[locale] }}<em
            v-if="line.ink === 'paper' && line.fr === 'en '"
            :class="`ink-${hero.lastWord.ink}`"
          >{{ hero.lastWord[locale] }}</em></span>
      </h1>

      <div class="col">
        <p class="body">{{ tr(hero.body) }}</p>
        <p class="facts">
          <template v-for="(part, i) in factParts" :key="i">
            <strong v-if="i % 2">{{ part }}</strong><template v-else>{{ part }}</template>
          </template>
        </p>
      </div>

      <!-- Le bloc de dates d'une affiche de concert, à sa place sur la
           feuille. Il ne porte aucun créneau : les disponibilités réelles
           viennent de Cal.com, et en inventer serait affirmer une
           disponibilité qu'on n'a pas. -->
      <aside class="booking">
        <h2>{{ tr(hero.booking.heading) }}</h2>
        <p class="note">{{ tr(hero.booking.note) }}</p>
        <dl>
          <div v-for="row in hero.booking.rows" :key="row.k.fr">
            <dt>{{ tr(row.k) }}</dt>
            <dd>{{ tr(row.v) }}</dd>
          </div>
        </dl>
        <a class="book" href="#contact">{{ tr(hero.booking.action) }}</a>
      </aside>

      <!-- Le colophon se signe au pied de la feuille. DESIGN.md interdit
           l'étiquette posée au-dessus d'un titre. -->
      <p class="colophon">
        <span v-for="c in hero.colophon" :key="c.fr">{{ tr(c) }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.sheet {
  position: relative;
  /* L'en-tête est fixe et haut de 106 px au bureau (le mot-image est sur deux
     lignes) : la marge haute lui laisse sa place, sinon le titre démarre
     dessous. Même valeur que PageHero, pour que la home et les pages internes
     ouvrent au même endroit. */
  padding-block: clamp(7rem, 5rem + 7vw, 10rem) clamp(3rem, 5vw, 4rem);
}

/* Une croix par encre, 26 px, filet de 1 px. Posées aux angles d'une passe,
   jamais au milieu, et jamais plus de quatre par écran. */
.reg {
  position: absolute;
  width: 26px;
  height: 26px;
  pointer-events: none;
}
.reg::before, .reg::after { content: ''; position: absolute; background: currentColor; }
.reg::before { left: 50%; top: 0; width: 1px; height: 100%; }
.reg::after { top: 50%; left: 0; height: 1px; width: 100%; }
/* Posées sous la barre fixe, et non derrière elle. */
.reg.b { color: var(--signal); left: 18px;  top: clamp(5rem, 3.5rem + 5vw, 7rem); }
.reg.p { color: var(--accent); left: 20px;  top: calc(clamp(5rem, 3.5rem + 5vw, 7rem) + 2px); }
.reg.g { color: var(--state);  right: 18px; top: clamp(5rem, 3.5rem + 5vw, 7rem); }

.grid { display: grid; gap: clamp(1.5rem, 3vw, 2.5rem); }

/* Le titre prend TOUTE la feuille, et non une colonne de gauche : « EN
   PRODUCTION. » mesure 11,6 em, soit 1210 px au corps de 104 px, quand une
   colonne amputée du bloc d'affiche n'en offre que 938. DESIGN.md demande de
   laisser le titre aller jusqu'au bout — c'est donc le bloc d'affiche qui
   descend d'un cran, pas le corps qui se rabote. Le texte et le bloc se
   partagent la ligne suivante, comme sur une affiche où la manchette barre
   la feuille et le bloc de dates se pose dessous à droite. */
@media (min-width: 1000px) {
  .grid { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; }
  h1, .colophon { grid-column: 1 / -1; }
  .col { padding-top: 0.4rem; }
}

h1 {
  font-size: var(--fs-3xl);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  text-wrap: initial;        /* les césures sont écrites, pas équilibrées */
}
.line { display: block; }
.ink-paper  { color: var(--on-ground); }
.ink-signal { color: var(--signal); margin-left: 0.06em; }
.ink-state  { color: var(--state); font-style: normal; }

.body {
  color: var(--on-ground-soft);
  max-width: var(--measure-wide);
}
.facts { margin-top: 0.9rem; color: var(--on-ground-soft); max-width: var(--measure-wide); }
.facts strong { color: var(--on-ground); font-weight: 500; }

/* Le bloc d'affiche : un trait de 2 px l'ouvre, comme le filet de tête d'un
   bloc de dates. C'est le seul filet de la feuille, et il est porteur. */
.booking { border-top: 2px solid var(--on-ground); padding-top: 1.1rem; margin-top: 0.25rem; }
.booking h2 {
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
  transition: background var(--duration-press) var(--ease-out);
}
.book:hover { background: var(--signal); color: var(--on-signal); }

.colophon {
  margin-top: clamp(2rem, 4vw, 3rem);
  padding-top: 1rem;
  border-top: 1px solid var(--rule);
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 2.5rem;
  justify-content: space-between;
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  color: var(--on-ground-mute);
  text-transform: uppercase;
}
</style>
