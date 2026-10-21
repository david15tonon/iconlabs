<script setup lang="ts">
import { offerIntro, sprint, satellites, cta } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
const { tr, localePath } = useLocale()

/* Passe 5 — l'offre. Une seule carte domine, et c'est le Sprint : c'est par
 * lui que la plupart des clients entrent, et une page qui présente cinq
 * niveaux à égalité oblige le visiteur à choisir avant de comprendre.
 * L'échelle complète est à un clic, sur /offres.
 *
 * Les deux satellites — Diagnostic et Suivi — sont du TEXTE SUR LE SOL, pas
 * des sous-cartes : le système n'a qu'un seul niveau de surélévation, et
 * poser une carte dans une carte en inventerait un second.
 *
 * ⚠️ AUCUNE LIGNE DE GARANTIE. Le document en proposait une (« la semaine
 * suivante est offerte ») ; l'utilisateur a tranché le 2026-10-21 : non. Le
 * prix fixe et le périmètre écrit sont les engagements, et ils suffisent.
 * Ne pas en ajouter sans décision explicite — c'est un engagement
 * contractuel, pas une formule de page.
 */
</script>

<template>
  <section id="offre" class="section bg">
    <div class="shell">
      <header class="sectionHead" v-reveal>
        <h2 class="breaks">{{ tr(offerIntro.heading) }}</h2>
      </header>

      <div class="main" v-reveal="80">
        <div class="say">
          <p class="price">{{ tr(sprint.price) }}</p>
          <p class="terms label">{{ tr(sprint.terms) }}</p>
          <p class="for">{{ tr(sprint.for) }}</p>

          <ul class="deliverables">
            <li v-for="(d, i) in sprint.deliverables" :key="i">{{ tr(d) }}</li>
          </ul>
        </div>

        <!-- La même forme que le bloc d'affiche de la feuille : c'est le même
             objet — ce qu'on achète, à quel prix, et le bouton qui l'engage. -->
        <aside class="block">
          <PriceBlock
            :heading="sprint.name"
            :rows="sprint.rows"
            :action="sprint.action"
            to="/contact"
          />
        </aside>
      </div>

      <!-- Les deux autres niveaux, dits en une ligne chacun. Celui qui vient
           avant le Sprint et celui qui vient après : la gradation se devine
           sans qu'on ait à déplier l'échelle entière. -->
      <ul class="satellites" v-reveal="160">
        <li v-for="(s, i) in satellites" :key="i">
          <p class="sat-head">
            <span class="sat-name">{{ tr(s.name) }}</span>
            <span class="sat-price">{{ tr(s.price) }}</span>
          </p>
          <p class="sat-body">{{ tr(s.body) }}</p>
        </li>
      </ul>

      <NuxtLink class="more" :to="localePath('/offres')" v-reveal="220">
        {{ tr(cta.allOffers) }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* Bande surélevée : la section qui précède est sur le sol nu, et deux
   sections voisines ne partagent jamais la même composition. */
.bg { background: var(--ground-raise); }

.main { display: grid; gap: clamp(2rem, 4vw, 3.5rem); align-items: start; }

/* Le prix est une quantité, donc de la matière : il se lit comme le grand
   caractère d'un résultat, pas comme une ligne de tarif. */
.price {
  font-family: var(--display);
  font-size: var(--fs-2xl);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.045em;
  color: var(--signal-text);
}
.terms { margin-top: 0.5rem; }
.for {
  margin-top: 1.25rem;
  font-size: var(--fs-lg);
  max-width: var(--measure);
}

/* La liste de ce qu'on emporte. Pas de puce dessinée ni de coche : un
   décalage et un tiret cadratin, qui est déjà dans la fonte. */
.deliverables {
  list-style: none;
  display: grid;
  gap: 0.75rem;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
}
.deliverables li {
  color: var(--on-ground-soft);
  font-size: var(--fs-sm);
  max-width: var(--measure);
  padding-left: 1.6rem;
  text-indent: -1.6rem;
}
.deliverables li::before { content: '— '; color: var(--on-ground-mute); }

/* Les satellites : du texte posé sur le sol de la bande, sans panneau. Le
   pas de ton est déjà pris par la bande elle-même. */
.satellites {
  list-style: none;
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  margin-top: clamp(2.5rem, 5vw, 4rem);
}
.satellites li { display: grid; gap: 0.4rem; }
.sat-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
  justify-content: space-between;
  max-width: var(--measure);
}
.sat-name { font-size: var(--fs-lg); font-weight: 500; }
.sat-price { font-size: var(--fs-sm); font-weight: 500; color: var(--state-text); }
.sat-body { color: var(--on-ground-soft); font-size: var(--fs-sm); max-width: var(--measure); }

.more {
  display: inline-block;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--signal-text);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.2rem;
  transition: color var(--duration-press) var(--ease-out);
}
.more::after { content: ' \2192'; }
.more:hover { color: var(--on-ground); }

@media (min-width: 1000px) {
  .main { grid-template-columns: minmax(0, 1fr) 340px; }
  .satellites { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
