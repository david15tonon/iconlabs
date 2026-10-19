<script setup lang="ts">
import { brand, nav, cta } from '~~/content/site'
import { useLocale } from '~/composables/useSite'
import { useTheme } from '~/composables/useTheme'

const { locale, tr, localePath, setLocale } = useLocale()
const { theme, toggle: toggleTheme, label: themeLabel } = useTheme()
const scrolled = ref(false)
const open = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="bar" :class="{ solid: scrolled }">
    <div class="inner">
      <NuxtLink class="logo" :to="localePath('/')" :aria-label="brand.wordmark">
        <span class="mark" />
      </NuxtLink>

      <nav class="links" :class="{ open }" :aria-label="tr({ fr: 'Navigation principale', en: 'Main navigation' })">
        <NuxtLink v-for="item in nav" :key="item.to" :to="localePath(item.to)" @click="open = false">
          {{ tr(item.label) }}
        </NuxtLink>
      </nav>

      <div class="right">
        <div class="lang" role="group" :aria-label="tr({ fr: 'Langue', en: 'Language' })">
          <button
            v-for="code in (['fr', 'en'] as const)"
            :key="code"
            type="button"
            :aria-pressed="locale === code"
            :class="{ on: locale === code }"
            @click="setLocale(code)"
          >{{ code.toUpperCase() }}</button>
        </div>
        <button
          class="theme"
          type="button"
          :aria-label="themeLabel(locale)"
          :title="themeLabel(locale)"
          @click="toggleTheme"
        >
          <!-- Un disque mi-plein : la moitié pleine est le sol du thème vers
               lequel on bascule. Dessiné, jamais un glyphe ni un emoji. -->
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path
              v-if="theme === 'dark'"
              d="M10 1.75a8.25 8.25 0 0 0 0 16.5z"
              fill="currentColor"
            />
            <path v-else d="M10 1.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
          </svg>
        </button>

        <NuxtLink class="cta" :to="localePath('/#contact')">{{ tr(cta.primary) }}</NuxtLink>
        <button
          class="burger"
          type="button"
          :aria-expanded="open"
          :aria-label="tr({ fr: 'Menu', en: 'Menu' })"
          @click="open = !open"
        ><span /><span /></button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* La barre était en verre dépoli : fond translucide, `backdrop-filter` et
   filet de 1 px en bas. La charte exclut les trois — pas de verre dépoli en
   navigation, aucun flou d'arrière-plan, et rien ne se sépare par un filet.
   Au défilement elle devient donc simplement pleine : le noir opaque, et
   le pas de ton avec le contenu qui passe dessous fait le reste. */
.bar {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 60;
  background: transparent;
  transition: background var(--duration-dropdown) var(--ease-out);
}
.bar.solid { background: var(--ground-bar); }

.inner {
  max-width: var(--maxw);
  margin-inline: auto;
  padding: 0.9rem var(--gutter);
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* 96 px est la largeur minimale que la charte fixe au mot-image : en deçà,
   l'arc et le point détaché se referment. Le dessin étant maintenant sur deux
   lignes (rapport 1,24, contre 4,56 pour l'ancien mot-image d'une ligne), la
   barre est plus haute qu'avant — c'est la conséquence du logo, pas un
   réglage. La zone de protection vaut la hauteur de capitale, soit 20 px à
   cette taille ; la gouttière de 2 rem entre le logo et la navigation la
   couvre. */
/* Le mot-image est posé en MASQUE et peint à `currentColor` : il suit donc le
   thème au lieu d'exister en deux fichiers dont l'un serait invisible sur
   l'autre sol. Le tracé est un chemin unique d'une seule couleur — c'est ce
   qui rend le masque fidèle au fichier. Le rapport 600 × 483 est celui du
   verrouillage serré. */
.mark {
  display: block;
  width: 96px;
  aspect-ratio: 600 / 483;
  background: currentColor;
  -webkit-mask: var(--lockup) center / contain no-repeat;
  mask: var(--lockup) center / contain no-repeat;
}

/* Casse de phrase, jamais de capitales espacées, et au plancher de lecture
   et non à 10 px comme auparavant. */
.links {
  display: flex;
  gap: clamp(1rem, 2.2vw, 2.4rem);
  margin-inline: auto;
}
.links a {
  font-size: var(--fs-sm);
  color: var(--on-ground-mute);
  transition: color var(--duration-press) var(--ease-out);
}
.links a:hover { color: var(--on-ground); }

.right { display: flex; align-items: center; gap: 0.75rem; }

/* Le sélecteur de langue n'est plus une boîte contournée : la langue active
   est un aplat d'encre, l'autre du texte. L'état se lit au ton. */
.lang { display: flex; gap: var(--sp-xs); }
.lang button {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0.35rem 0.55rem;
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--on-ground-mute);
  transition:
    color var(--duration-press) var(--ease-out),
    background var(--duration-press) var(--ease-out);
}
.lang button:hover { color: var(--on-ground); }
.lang button.on { color: var(--ground); background: var(--on-ground); }

.cta {
  font-size: var(--fs-xs);
  font-weight: 500;
  background: var(--signal);
  color: var(--on-signal);            /* 5,17 sur Neural Blue — cf. DESIGN.md */
  padding: 0.6rem 1.1rem;
  white-space: nowrap;
  transition:
    background var(--duration-press) var(--ease-out),
    color var(--duration-press) var(--ease-out);
}
/* Au survol le fond s’éclaircit d’un cran — `--signal-text`, #5B8DF6 — et le
   texte passe au noir : il y tient 6,17, quand le blanc n’y tiendrait que
   3,19. Sur fond sombre, un survol qui éclaire se lit mieux qu’un survol qui
   assombrit. */
.cta:hover { background: var(--signal-text); color: var(--ground); }

/* La bascule de thème. Pas de contour au repos — la charte n'autorise le
   filet qu'au champ de formulaire — et le disque mi-plein dit vers quoi on
   va, pas où l'on est. */
.theme {
  display: grid;
  place-items: center;
  background: none;
  border: 0;
  padding: 0.4rem;
  color: var(--on-ground-mute);
  cursor: pointer;
  transition: color var(--duration-press) var(--ease-out);
}
.theme:hover { color: var(--on-ground); }

.burger { display: none; background: none; border: 0; cursor: pointer; padding: 0.5rem; }
.burger span { display: block; width: 22px; height: 2px; background: var(--on-ground); }
.burger span + span { margin-top: 5px; }

@media (max-width: 900px) {
  /* Le menu est un panneau qui glisse : le pas de ton le détache du sol, et
     ses liens sont espacés plutôt que réglés par un filet. */
  .links {
    position: absolute;
    inset: 100% 0 auto 0;
    flex-direction: column;
    gap: 0;
    background: var(--ground-raise);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--duration-overlay) var(--ease-drawer);
  }
  .links.open { max-height: 60vh; }
  .links a { padding: 0.9rem var(--gutter); }
  .links a:first-child { padding-top: 1.4rem; }
  .links a:last-child { padding-bottom: 1.4rem; }
  .cta { display: none; }
  .burger { display: block; }
}
</style>
