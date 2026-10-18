---
version: alpha
name: Icon Labs
description: Studio d'ingénierie créative à Cotonou. Papier, encre et un seul vermillon ; la tenue vient de la structure, pas de l'effet.
colors:
  primary: "#0B0B0B"
  on-primary: "#F4F1EC"
  secondary: "#6A635B"
  tertiary: "#F2360A"
  tertiary-deep: "#C62A06"
  on-tertiary: "#0B0B0B"
  on-tertiary-deep: "#F4F1EC"
  neutral: "#F4F1EC"
  surface: "#F4F1EC"
  surface-raised: "#FFFFFF"
  on-surface: "#2A2621"
  on-surface-variant: "#6A635B"
  outline: "#CBC6BE"
  error: "#C62A06"
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 160px
    fontWeight: "800"
    lineHeight: 0.9
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Syne
    fontSize: 72px
    fontWeight: "700"
    lineHeight: 0.92
    letterSpacing: -0.035em
  headline-md:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 0.95
    letterSpacing: -0.03em
  headline-sm:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 1
    letterSpacing: -0.02em
  statement-lg:
    fontFamily: Instrument Sans
    fontSize: 36px
    fontWeight: "400"
    lineHeight: 1.25
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Instrument Sans
    fontSize: 19px
    fontWeight: "400"
    lineHeight: 1.55
  body-md:
    fontFamily: Instrument Sans
    fontSize: 17px
    fontWeight: "400"
    lineHeight: 1.5
  body-sm:
    fontFamily: Instrument Sans
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 1.45
  label-md:
    fontFamily: Instrument Sans
    fontSize: 15px
    fontWeight: "500"
    lineHeight: 1.2
  label-sm:
    fontFamily: Instrument Sans
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 1.2
    letterSpacing: 0.01em
  code-sm:
    fontFamily: DM Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 2px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  2xl: 96px
  gutter: 64px
  section: 176px
  max-width: 1440px
  grid-columns: 12
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 16px
  button-primary-hover:
    backgroundColor: "{colors.tertiary-deep}"
    textColor: "{colors.on-tertiary-deep}"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 16px
  button-secondary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  link-inline:
    textColor: "{colors.tertiary-deep}"
    typography: "{typography.body-md}"
  input-text:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px
  input-text-focus:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.primary}"
  nav-bar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 16px
  panel-raised:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 32px
  panel-ink:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.none}"
    padding: 32px
  panel-signal:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.none}"
    padding: 32px
---

# Icon Labs

## Overview

Icon Labs est un studio d'ingénierie créative installé à **Cotonou**, qui conçoit
des sites, des plateformes et des produits IA et les livre en deux à quatre
semaines, code intégralement transféré, sans intermédiaire entre le client et
l'ingénieur.

Signature : **« Structure d'abord, effet ensuite. »** L'interface doit donner
l'impression d'un travail d'atelier tenu, pas d'une démonstration. Elle est
claire, large, calme ; elle montre ce qu'elle sait faire par la mise en page
plutôt que par des effets. Le public visé est une fondatrice ou un fondateur qui
a déjà un prototype et doit le mettre en production : il cherche de la
compétence vérifiable, pas de l'enthousiasme.

Le ton suit : direct, précis, technique, sans mots-valises. Phrases courtes,
verbes actifs, aucune métrique qui ne puisse être produite, aucun superlatif.
« We build intelligent systems that scale », jamais « nous révolutionnons le
digital de demain ».

Cette identité remplace la charte *Brand Guidelines v1.0* (fond noir dominant,
bleu/violet/vert) du dépôt `david15tonon/iconlabs`, dont seuls le
positionnement, la voix et la règle de proportion 80/15/5 sont conservés.

## Colors

Deux pôles — papier et encre — et **une** couleur signature. Une couleur sans
rôle n'existe pas. Le papier est le sol ; l'encre est ce qui s'écrit dessus.

- **Primary (#0B0B0B) :** l'encre. Titres, et texte posé sur aplat vermillon.
- **On-surface (#2A2621) :** l'encre adoucie, le texte courant. Le texte long
  n'est jamais en gris clair.
- **Secondary (#6A635B) :** texte secondaire, métadonnées, légendes.
- **Tertiary (#F2360A) :** le vermillon. **Il occupe des surfaces** — aplats
  pleins, zones d'appel, image sociale — ce n'est pas un filet d'accent.
- **Tertiary-deep (#C62A06) :** le même vermillon assombri. **La seule forme
  admise pour du texte coloré**, et le fond des états survolés.
- **Neutral / Surface (#F4F1EC) :** le papier, chaud, plus doux que le blanc pur.
- **Surface-raised (#FFFFFF) :** le blanc, réservé aux surfaces qui se détachent
  du papier.
- **Outline (#CBC6BE) :** bordure de champ de formulaire. Rien d'autre.
- **Error (#C62A06) :** le système n'introduit pas de second rouge. Le vermillon
  assombri, dont le contraste est mesuré, porte aussi l'erreur.

**Proportion 80 / 15 / 5** : 80 % de papier et d'encre, 15 % d'aplats
(bandes et panneaux), 5 % de vermillon. Quatre apparitions du vermillon sur une
page, pas cinq.

Contrastes mesurés (WCAG 2.1), pas estimés :

| Couple | Ratio | Verdict |
|---|---|---|
| primary sur surface | 17,47 | AAA |
| primary sur surface-raised | 19,68 | AAA |
| on-surface sur surface | 13,34 | AAA |
| on-surface-variant sur surface | 5,25 | AA |
| tertiary-deep sur surface | 4,99 | AA |
| primary sur aplat tertiary | 4,97 | AA |
| on-tertiary-deep sur aplat tertiary-deep | 4,99 | AA |
| tertiary sur surface | 3,51 | **grand texte seulement** |

Trois règles qui se violent toutes seules à l'implémentation : sur un aplat
vermillon le texte est en **encre** ; sur vermillon assombri la règle
s'**inverse** et le texte passe en papier ; sur papier, un texte coloré prend
toujours `tertiary-deep`, jamais `tertiary`.

## Typography

Deux familles, pas trois. **Syne** porte l'affichage, **Instrument Sans** porte
tout ce qui se lit.

- **Syne (700/800)** — titres et mot-image. C'est une display à fort caractère :
  largeurs irrégulières, jonctions franches. Elle fait l'identité en grand corps
  et s'effondre en petit, donc elle ne descend jamais sous 32 px.
- **Instrument Sans (400/500)** — texte courant, énoncés, étiquettes, interface.
  Grotesque neutre, hauteur d'x généreuse, lisible à 15 px. Elle ne dispute rien
  à Syne : c'est la condition pour que le couple tienne.
- **DM Mono** — **uniquement dans du code littéral** (`<pre>`, `<code>`). Elle
  n'est pas chargée tant qu'il n'y a pas de code sur la page.

Ce que cette combinaison remplace : **Bricolage Grotesque** cède l'affichage à
Syne, et **Martian Mono** disparaît — la monospace servait aux étiquettes et aux
numéros de section, deux dispositifs supprimés. Le mot-image ne dépend d'aucune
des deux : c'est un dessin (voir **Logo**), donc le changement de famille
d'affichage ne l'atteint pas.

Onze niveaux. Les corps donnés en tokens sont les **valeurs de bureau** ; dans
le site ils sont fluides (`clamp()`), le plancher mobile étant 60 à 65 % de la
valeur de bureau pour l'affichage et inchangé pour le texte. Le texte courant ne
descend jamais sous 15 px, et aucun texte sous 13 px.

- **display-xl** — un seul emploi par page : le nom posé en très grand.
- **headline-lg / md / sm** — titres de section et de bloc. Tout titre tient en
  **deux lignes au maximum, à toutes les largeurs** : on coupe des mots d'abord,
  on élargit la mesure ensuite, on réduit le corps en dernier.
- **statement-lg** — une phrase posée en grand, 36 px au plafond, 25 mots
  environ. Au-delà, c'est un titre et la règle des deux lignes s'applique.
- **body-lg / md / sm** — lecture. Mesure de 44 à 62 caractères (exprimée en
  `ch`, donc solidaire de la police).
- **label-md / sm** — étiquettes et interface. **En casse de phrase**, jamais en
  capitales espacées.

Chargement : `Syne:wght@700;800` et `Instrument+Sans:wght@400;500`,
`display=swap`, sous-ensembles `latin` **et** `latin-ext` — les textes français
portent des accents que `latin` seul coupe.

## Logo

Le logo de référence est **`logo.png` du dépôt `david15tonon/iconlabs`**. Il
remplace le symbole et le mot-image décrits dans `BRAND.md` §4 : ceux-ci sont
retirés du système.

C'est un mot-image seul, sans symbole : **« icon labs » en bas-de-casse**, dans
une grotesque géométrique à terminaisons droites et à anneaux circulaires. Trois
traits le signent :

- **deux lignes décalées** — « labs » décroche vers la droite et remonte sous
  « icon », les deux blocs se chevauchant verticalement. Ce décalage est le
  dessin : il ne se corrige pas en alignant les lignes ;
- **le point du *i* détaché**, posé nettement plus haut que la hauteur d'x ;
- **l'arc sous « la »**, un segment de cercle ouvert vers le haut, du même
  poids de trait que les lettres.

**Monochrome.** Le logo est noir sur blanc dans sa source : en usage il est en
`primary` sur `surface` ou `surface-raised`, et en `on-primary` sur aplat
d'encre. Il ne prend jamais le vermillon, ne reçoit ni ombre, ni contour, ni
dégradé, et ne se déforme pas.

**Zone de protection** : la hauteur de la capitale d'« icon » sur les quatre
côtés. **Taille minimale** : 96 px de large — en deçà, l'arc et le point
détaché se referment et le mot-image devient illisible.

*À produire avant mise en ligne* : la source livrée est un **PNG de
1536 × 1024** avec de larges marges blanches. Il faut le vectoriser en SVG,
le recadrer sur la zone de protection, et en sortir deux variantes (`-ink` pour
fond clair, sans suffixe pour fond sombre) plus le favicon.

## Layout

Grille de **12 colonnes**, largeur maximale 1440 px, une seule paire de marges
sur tout le site. La gouttière et l'intervalle de section sont fluides : 20 px
en bas d'échelle jusqu'à 64 px pour la gouttière, 80 px jusqu'à 176 px entre
deux sections.

La règle qui tient le rythme : **l'écart entre deux sections est nettement plus
grand que tout écart à l'intérieur d'une section.** Les blocs de texte partagent
deux ou trois bords gauches sur toute la page ; l'alignement est à gauche
partout, et il n'y a au plus **qu'un seul moment centré** sur une page.

Deux sections voisines n'ont jamais la même composition, et aucune n'est une
grille de cartes identiques. Les grands éléments — image, aplat, bande — vont
jusqu'aux bords.

L'échelle d'espacement est en multiples de 8 px, avec un demi-pas de 4 px pour
les micro-réglages.

## Elevation & Depth

Le système est **plat**. La profondeur se fait par **couches de ton**, jamais
par une ombre : le papier est le sol, le blanc est ce qui se détache.

`surface-raised` est **le seul niveau de surélévation du système**. Une bande de
section et un panneau posé dedans portent le même blanc ; ils se distinguent par
l'espace, pas par une troisième teinte. S'il faut un deuxième niveau, c'est la
hiérarchie qui est à revoir, pas la palette.

Aucune ombre sur un élément au repos. Les ombres sont réservées à ce qui flotte
réellement : un menu ouvert, une boîte de dialogue. Aucun flou d'arrière-plan.

## Shapes

**Angles droits.** Le rayon du système est `none` (0 px) : boutons, champs,
panneaux, images. Le pas `sm` (2 px) existe pour les rares éléments où un angle
parfaitement vif accroche à l'écran ; `full` est réservé à d'éventuels éléments
circulaires. **On ne mélange jamais deux rayons dans une même vue.**

Les surfaces se séparent par un aplat, de l'espace ou un pas de ton — **pas par
un filet**. Les seuls contours admis sont ceux des champs de formulaire, en
`outline`.

## Motion

Le mouvement n'existe que s'il a une raison nommable : retour, continuité
spatiale, lisibilité d'un changement d'état, ou transition qui évite un saut.
**Un élément vu cent fois par jour ne s'anime pas** — ni la navigation au
clavier, ni l'ouverture d'un menu déclenché par raccourci.

Les valeurs ne s'approximent pas. Celles-ci viennent de la méthode d'Emil
Kowalski, pas d'équivalents « qui ressemblent » — les courbes natives de CSS
sont trop molles pour de l'interface. Elles vivent en CSS et non dans les
tokens : le schéma DESIGN.md ne couvre pas le mouvement, et une clé inventée
serait ignorée à l'export.

```css
:root {
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);     /* entrées et sorties */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* déplacement à l'écran */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* panneau glissant */

  --duration-press:    140ms;   /* retour d'appui          : 100–160 ms */
  --duration-tooltip:  160ms;   /* infobulle, petit popover: 125–200 ms */
  --duration-dropdown: 200ms;   /* menu, sélecteur         : 150–250 ms */
  --duration-overlay:  320ms;   /* modale, panneau         : 200–500 ms */
  --duration-marquee:  28s;     /* bandeau défilant, linear */
}
```

- **`ease-out` pour tout ce qui entre et sort.** `ease-in` est interdit sur de
  l'interface : il commence lentement, c'est-à-dire exactement au moment que
  l'œil regarde. À 200 ms, `ease-out` *paraît* plus rapide que `ease-in`.
- **`ease-in-out`** pour ce qui se déplace ou se transforme à l'écran,
  **`linear`** pour une motion constante (bandeau défilant, barre de
  progression).
- **`transform` et `opacity` uniquement.** Elles évitent la mise en page et la
  peinture. `width`, `height`, `margin`, `top` déclenchent les trois.
- **Jamais `scale(0)`** : une entrée part de `scale(0.96)` avec `opacity: 0`.
  Rien n'apparaît à partir de rien.
- **Toute animation d'interface reste sous 300 ms.** Au-delà, seul le registre
  marketing — le bandeau défilant, qui est un mouvement continu, pas une
  transition.
- **`prefers-reduced-motion` est livré avec l'animation**, jamais après : le
  contenu reste, le déplacement saute. Et aucun contenu ne doit rester invisible
  si le script échoue.
- **Transitions plutôt que keyframes** pour ce qui peut être déclenché deux fois
  en une seconde : une transition repart de la valeur courante, une keyframe
  recommence à zéro.
- **On sort par où l'on est entré.** Ce qui est monté du bas redescend par le
  bas.

## Components

Un seul bouton par écran porte le vermillon : c'est l'action principale, et il
n'y en a qu'une.

- **button-primary** — aplat vermillon, texte en encre (4,97). Au survol, le
  fond fonce (`tertiary-deep`) **et le texte passe en papier** : c'est une
  inversion, pas un assombrissement.
- **button-secondary** — blanc sur papier, texte en encre, sans contour. Au
  survol il s'inverse en encre et papier.
- **link-inline** — `tertiary-deep`, souligné à l'épaisseur du texte. Jamais
  `tertiary`, qui ne passe pas sous 24 px.
- **input-text** — fond blanc, bordure `outline` (c'est la seule exception à la
  règle « pas de filet » : un champ de formulaire doit se voir), focus visible
  qui change le remplissage, jamais un halo flou.
- **panel-raised / panel-ink / panel-signal** — les trois aplats dans lesquels
  une section peut se poser. Pleins, sans contour, sans ombre.

Navigation : mot-image, trois à cinq liens simples, une action. Pas de barre en
verre dépoli, pas de pilule flottante.

## Do's and Don'ts

- **Do** garder le vermillon pour quatre surfaces au maximum par page ; il
  occupe des aplats, il ne souligne pas.
- **Don't** écrire du texte en `tertiary` sur papier : 3,51 ne passe pas sous
  24 px. C'est `tertiary-deep`.
- **Do** inverser le texte en papier dès que le fond passe en `tertiary-deep`.
- **Don't** séparer deux surfaces par un filet de 1 px. *Le site en compte 29
  aujourd'hui : ils sont à remplacer par un pas de ton ou de l'espace.*
- **Don't** poser une étiquette au-dessus d'un titre. *Il y en a 9 aujourd'hui
  (`.kicker`) : l'information passe dans le titre ou dans la première phrase, ou
  elle saute.*
- **Don't** numéroter les sections 01, 02, 03. L'ordre se lit par la position,
  la taille ou le ton — ou par un vrai `<ol>` si l'ordre compte vraiment.
- **Don't** employer une monospace hors d'un bloc de code réel.
- **Do** des panneaux pleins ; **don't** des boîtes contournées de 1 px.
- **Don't** d'ombre ni de flou d'arrière-plan sur un élément au repos.
- **Don't** de dégradé, nulle part — ni fond, ni bouton, ni texte.
- **Do** limiter la page à cinq corps de texte et deux familles.
- **Do** du texte courant à pleine force (`on-surface`) : une page en gris clair
  se lit comme inachevée.
- **Don't** plus d'un ou deux tirets cadratins par page. *Il y en a 21.*
- **Don't** de carte dans une carte : un seul niveau de contenant.
- **Do** distinguer visuellement un état en attente d'un état actif — pas
  seulement par le texte.
- **Don't** `ease-in` sur de l'interface, **don't** `scale(0)`, **don't** plus
  de 300 ms sur une transition.
- **Do** penser le petit écran comme une composition à part, pas comme la
  version empilée du bureau : états de survol inopérants au doigt, surbrillance
  de tap, zones sûres, zoom au focus d'un champ.
