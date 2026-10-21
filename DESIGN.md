---
version: beta-2
name: Icon Labs
description: Laboratoire d'ingénierie AI à Cotonou. Feuille sérigraphiée — trois encres et le calage visible, sur papier blanc par défaut ou sur noir au choix du visiteur.
# Le thème CLAIR, qui est le défaut. Le sombre est sous `colors-dark`.
colors:
  primary: "#2563EB"
  on-primary: "#FFFFFF"
  primary-text: "#1D4FD8"
  secondary: "#7C3AED"
  on-secondary: "#FFFFFF"
  secondary-text: "#6D28D9"
  tertiary: "#10B981"
  on-tertiary: "#0B0B0B"
  tertiary-text: "#0A7D58"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  surface-raised: "#F7F7F5"
  surface-sunken: "#F1F1EE"
  on-surface: "#0B0B0B"
  on-surface-variant: "#444440"
  on-surface-mute: "#6B6B66"
  on-primary-variant: "#EAF1FF"
  outline: "#8A8A86"
  outline-on-primary: "#C2D6FD"
  rule: "#E2E2DD"
  error: "#6D28D9"
# Le thème SOMBRE, sous `[data-theme='dark']`. Seuls les rôles qui dépendent
# du sol sont redéclarés ; les couleurs posées SUR un aplat ne bougent pas.
colors-dark:
  primary: "#2563EB"
  primary-text: "#5B8DF6"
  secondary: "#7C3AED"
  secondary-text: "#A78BFA"
  tertiary: "#10B981"
  tertiary-text: "#10B981"
  neutral: "#0B0B0B"
  surface: "#0B0B0B"
  surface-raised: "#141414"
  surface-sunken: "#1E1E1E"
  on-surface: "#FFFFFF"
  on-surface-variant: "#BBBBB5"
  on-surface-mute: "#8A8A86"
  outline: "#6B6B66"
  rule: "#2A2A2A"
  error: "#A78BFA"
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 104px
    fontWeight: "800"
    lineHeight: 0.88
    letterSpacing: -0.045em
    textTransform: uppercase
  display-lg:
    fontFamily: Syne
    fontSize: 60px
    fontWeight: "800"
    lineHeight: 0.95
    letterSpacing: -0.04em
    textTransform: uppercase
  headline:
    fontFamily: Syne
    fontSize: 38px
    fontWeight: "700"
    lineHeight: 1.0
    letterSpacing: -0.035em
  title:
    fontFamily: Syne
    fontSize: 21px
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: -0.02em
  body-lg:
    fontFamily: DM Mono
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 1.8
    letterSpacing: 0em
  body:
    fontFamily: DM Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.75
    letterSpacing: 0em
  caption:
    fontFamily: DM Mono
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 1.6
    letterSpacing: 0.06em
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  2xl: "104px"
motion:
  ease-out: "cubic-bezier(0.23, 1, 0.32, 1)"
  ease-in-out: "cubic-bezier(0.77, 0, 0.175, 1)"
  duration-press: "140ms"
  duration-reveal: "300ms"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.none}"
    padding: "11px 20px"
  button-contrast:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "15px 28px"
  panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 32px
  panel-signal:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.none}"
    padding: 32px
  status-live:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.none}"
    padding: "3px 7px"
---

# Icon Labs

## Overview

Icon Labs est un **studio d'ingénierie IA indépendant** installé à
**Cotonou**, qui livre des systèmes IA en production — agents commerciaux,
automatisations, assistants documentaires, tableaux de pilotage — **en trois
semaines, à prix fixe**, code intégralement transféré, sans intermédiaire entre
le client et l'ingénieur.

⚠️ **« deux à quatre semaines » est périmé depuis le 2026-10-21** : la durée
est **trois semaines**, et c'est le Sprint à 3 000 € qui la tient. Le site ne
doit plus porter l'ancienne fourchette nulle part — elle contredisait `/methode`
contre la home.

Signature : **« On montre ce qui tourne, pas ce qu'on promet. »** Le public visé
est une fondatrice ou un fondateur qui a déjà un prototype et doit le mettre en
production : il cherche de la compétence vérifiable, pas de l'enthousiasme. Le
succès d'une visite est **une réservation d'appel**, pas un formulaire de devis.

Le ton suit : direct, précis, technique, sans mots-valises. Phrases courtes,
verbes actifs, aucune métrique qui ne puisse être produite, aucun superlatif.
Proscrit nommément : « révolutionnaire », « solutions innovantes », « croissance
exponentielle ».

### Ce que cette version remplace, et pourquoi

La version *alpha* de ce document (2026-10-18, papier `#F4F1EC` et vermillon
`#F2360A`) déclarait remplacer les *Brand Guidelines v1.0* du dépôt
`david15tonon/iconlabs`. **Cette décision est annulée.** Le même jour,
l'utilisateur a tranché dans l'autre sens : `iconlabs-brand.html` fait loi, et
c'est acté dans `PRODUCT.md` § Brand Commitments. La charte de marque reprend
donc la main sur la palette, les polices et la dominante sombre ; ce document ne
décide plus du monde, il décide de **la forme que ce monde prend sur le site**.

### La forme : la feuille sérigraphiée

Le site est **une feuille sérigraphiée** : trois encres passées l'une après
l'autre sur du noir, et le calage laissé visible comme preuve du métier. Ce n'est
pas un décor, c'est la règle de composition :

- **une classe d'information par encre.** Le blanc est le papier qui traverse,
  le bleu porte ce qui se lit comme système, le vert porte ce qui est acquis
  (livré, transféré, tenu), le violet ne porte que des changements d'état.
- **un seul champ possède le premier écran.** La feuille s'ouvre en pleine page,
  à pleine conviction — jamais un empilement de blocs.
- **le calage est visible.** Les repères de registre, décalés de 2 px et
  dépareillés par encre, sont la trace de la fabrication. Ils ne sont pas
  décoratifs : ils disent que la page a été imprimée, pas générée.
- **les quantités sont de la matière.** Quatre, six, trois, cent pour cent.
  Elles sont à position fixe et jamais inventées — aucune n'entre sur la page
  sans une source dans `PRODUCT.md`. Depuis la v10 elles ne sont même plus
  écrites : `app/composables/useCounts.ts` les **calcule** depuis `work`, parce
  qu'un chiffre recopié à la main survit toujours à la donnée qu'il décrivait
  (« 7 systèmes livrés » était faux deux fois).
- **la face d'une réalisation est un résumé complet.** On n'a pas besoin de
  l'ouvrir pour savoir ce qui a été construit ; l'ouvrir est la vue de détail.

Cette forme a été choisie contre le héros centré sur dégradé que la catégorie
des studios IA imprime à l'identique, et contre le portail shader plein écran,
écarté pour une raison nommée par la charte elle-même : *peu d'animations*.

## Colors

Cinq couleurs, et la règle de proportion **80 / 15 / 5 / 5** de la charte de
marque. Une couleur sans rôle n'existe pas.

Le site a **deux sols**. Le **clair est le défaut** — décision de
l'utilisateur du 2026-10-19, qui l'emporte sur le « dark mode dominant » de la
charte de marque et est actée dans `PRODUCT.md`. Le sombre est l'option, et le
choix du visiteur est mémorisé.

### Le renversement des encres

Ce n'est pas une nuance de réglage, c'est la règle qui gouverne les deux
thèmes, et elle est contre-intuitive :

| Encre | sur sombre | sur clair | Porte du texte courant |
|---|---|---|---|
| Neural Blue `#2563EB` | 3,81 | **5,17** | sur le clair **seulement** |
| Signal Purple `#7C3AED` | 3,45 | **5,70** | sur le clair **seulement** |
| Automation Green `#10B981` | **7,76** | 2,54 | sur le sombre **seulement** |

Bleu et violet portent du texte sur le clair et pas sur le sombre ; le vert
fait exactement l'inverse. **Aucune des trois n'est donc écrite en dur dans un
composant** : chacune a sa variante `-text` dont la valeur change avec le
thème, et un composant qui écrit `--state-text` ne sait pas sur quel sol il
est posé. C'est le seul moyen d'avoir un composant unique pour deux thèmes
sans repasser la table de contraste à chaque fois.

### Le thème clair — le défaut

| Rôle | Valeur | Contraste |
|---|---|---|
| `--ground` | `#FFFFFF` Pure White | — |
| `--ground-raise` | `#F7F7F5` | 1,07 / sol |
| `--ground-sunken` | `#F1F1EE` | 1,13 / sol |
| `--rule` | `#E2E2DD` | 1,30 / sol |
| `--on-ground` | `#0B0B0B` | **19,68** |
| `--on-ground-soft` | `#444440` | **9,78** |
| `--on-ground-mute` | `#6B6B66` | **5,36** |
| `--signal` | `#2563EB` | **5,17** — aplat, titre **et** texte |
| `--signal-text` | `#1D4FD8` | **6,64** |
| `--accent` | `#7C3AED` | **5,70** |
| `--accent-text` | `#6D28D9` | **7,10** |
| `--state` | `#10B981` | 2,54 — **aplat seulement** |
| `--state-text` | `#0A7D58` | **5,14** |
| `--outline` | `#8A8A86` | **3,47** |

### Le thème sombre — l'option

| Rôle | Valeur | Contraste |
|---|---|---|
| `--ground` | `#0B0B0B` Tech Black | — |
| `--ground-raise` | `#141414` | 1,07 / sol |
| `--ground-sunken` | `#1E1E1E` | 1,18 / sol |
| `--rule` | `#2A2A2A` | 1,37 / sol |
| `--on-ground` | `#FFFFFF` | **19,68** |
| `--on-ground-soft` | `#BBBBB5` | **10,21** |
| `--on-ground-mute` | `#8A8A86` | **5,68** |
| `--signal` | `#2563EB` | 3,81 — **aplat et grand titre seulement** |
| `--signal-text` | `#5B8DF6` | **6,17** |
| `--accent` | `#7C3AED` | 3,45 — aplat et titre ≥ 32 px |
| `--accent-text` | `#A78BFA` | **7,23** |
| `--state` | `#10B981` | **7,76** — aplat **et** texte |
| `--state-text` | `#10B981` | **7,76** |
| `--outline` | `#6B6B66` | **3,67** |

### Sur aplat — identique dans les deux thèmes

L'aplat coloré, lui, ne change pas avec le sol : ces valeurs sont communes.

| Fond | Texte admis | Contraste | Texte interdit |
|---|---|---|---|
| `--signal` `#2563EB` | blanc `#FFFFFF` | **5,17** | — |
| `--signal` `#2563EB` | secondaire `#EAF1FF` | **4,56** | `#D7E3FD` (4,01) |
| `--accent` `#7C3AED` | blanc `#FFFFFF` | **5,70** | noir (3,45) |
| `--state` `#10B981` | noir `#0B0B0B` | **7,76** | **blanc (2,54)** |

### Les règles qui tombent de ces mesures

1. **Aucune encre n'est écrite en dur.** Voir le renversement ci-dessus.
2. **Sur aplat vert, c'est le noir qui tient**, jamais le blanc. 7,76 contre
   2,54 : l'erreur inverse est un échec de 44 % sous le seuil.
3. **Le texte secondaire sur aplat bleu est `#EAF1FF`**, pas `#D7E3FD`.
   L'écart entre les deux est de 0,5 point de contraste et de part et d'autre
   du seuil.
4. **La bordure d'un champ vaut 3,0 au minimum contre son sol** — WCAG 1.4.11.
   `#3A3A3A`, qu'on écrit d'instinct sur du noir, n'en vaut que 1,73.

### La règle 80 / 15 / 5 / 5 somme à 105

La charte de marque écrit quatre poids — noir et blanc 80, bleu 15, violet 5,
vert 5 — qui font **105 et non 100**. Ce n'est pas corrigé en silence : la
barre d'encres rend des **rapports**, donc un poids de 80 sur 105 occupe 76 %
de la largeur. Les chiffres affichés sont ceux de la charte, les largeurs sont
leur proportion exacte. Normaliser à 100 reviendrait à réécrire la charte sans
le dire.

## Typography

**Deux familles, et seulement deux**, celles de la charte de marque.

**Syne** porte l'affichage, en 800 et 700, interlettrage serré (−0,035 à
−0,045 em). En capitales pour les niveaux `display`, en casse de phrase en
dessous. Elle ne descend jamais sous **21 px** : plus bas elle perd ses
jonctions, et le niveau concerné passe à DM Mono 500.

**DM Mono** porte tout ce qui se lit : texte courant, légende, étiquette, champ
de formulaire. C'est le choix de la charte, et il est tenu jusqu'au bout plutôt
qu'à moitié — la monospace est ici la voix de labeur, pas un costume technique
collé sur un paragraphe. Elle impose deux contraintes qu'on accepte :

- **interligne 1,6 à 1,75**, jamais moins : une monospace a besoin d'air.
- **mesure de 60 à 70 caractères** au lieu de 65 à 75 : les chasses égales
  allongent la ligne à nombre de caractères constant.

**Plancher absolu : 13 px.** Aucun texte en dessous, y compris les légendes et
les numéros de passe.

Échelle : `display-xl` 104 px · `display-lg` 60 px · `headline` 38 px ·
`title` 21 px · `body-lg` 15 px · `body` 14 px · `caption` 13 px.

## Logo

`public/brand/logo-source.png` vectorisé par `tools/trace-logo.mjs` (potrace).
Dans l'interface, le mot-image est posé en **masque CSS** et peint à
`currentColor` : il suit donc le thème au lieu d'exister en deux fichiers dont
l'un serait invisible sur l'autre sol. Les fichiers `lockup{,-ink}.svg`
restent pour les usages hors page (documents, exports). Le point final du mot-image est en
`--state` `#10B981` : c'est la seule couleur que le logo porte.

Interdits par la charte de marque, sans exception : ombre, dégradé, effet 3D,
couleur non définie, distorsion, fond coloré non validé.

## Layout

Largeur maximale 1440 px, gouttière 56 px au bureau. La feuille occupe toute la
largeur : il n'y a pas de colonne centrée étroite, parce qu'une affiche n'en a
pas.

La page se lit en **neuf passes**, dans cet ordre, et aucune ne se saute.
**Réécrites le 2026-10-21** : la forme ne change pas, ce sont les passes qui
changent de contenu.

1. **la feuille** — la phrase de positionnement découpée en trois encres, et le
   bloc d'affiche (`PriceBlock`) ;
2. **le bandeau de preuves** — quatre quantités d'activité, calculées, datées ;
3. **les résultats** — trois colonnes, grand caractère dimensionné pour le
   chiffre qu'il accueillera ;
4. **quatre problèmes, quatre systèmes** — la pile qui colle ;
5. **l'offre** — le Sprint domine, deux satellites, l'échelle à un clic ;
6. **la méthode** — semaine 0 à semaine 3 ;
7. **ce qui tourne** — le seul système client public, montré et ouvrable ;
8. **la FAQ** — six questions, prix compris ;
9. **la dernière passe** : le bleu prend toute la feuille, et on réserve.

Le site compte **sept pages** : `/`, `/offres`, `/cas` (+ `/cas/:slug`),
`/methode`, `/securite`, `/a-propos`, `/contact`. `/studio` et les quatre
`/services/:slug` ont disparu le 2026-10-21 ; cinq redirections 301 passent
leur signal, variantes de langue comprises.

**Le corps du titre de la feuille passe de `--fs-3xl` à `--fs-2xl`.** Ce n'est
pas un assouplissement du « laisser le titre aller jusqu'au bout » : la phrase
de positionnement fait une centaine de signes là où « De l'idée / au système /
en production. » en faisait trente, et à 104 px elle ne tient sur aucun écran.
La règle vaut pour un titre de trois mots ; elle est réécrite ici plutôt que
contournée en silence.

## Elevation & Depth

**Un seul niveau de surélévation** : `--ground-raise` sur `--ground` —
`#F7F7F5` sur blanc, `#141414` sur noir. Le même pas de ton (1,07) dans les
deux thèmes.
Pas d'ombre portée, pas de flou d'arrière-plan, pas de verre dépoli — la charte
de marque les exclut, et un pas de ton suffit sur fond sombre.

La profondeur vient des **passes** : une classe d'information par encre, et les
couches se séparent à des vitesses différentes au défilement.

## Shapes

**Angle vif partout**, rayon 0. Une feuille imprimée n'a pas de coin arrondi.
La seule exception tolérée serait un élément natif du navigateur qu'on ne
redessine pas ; il n'y en a aucun sur ce site.

Les **repères de calage** sont la forme signature : une croix de 26 px, filet de
1 px, une par encre, décalées de 2 px les unes des autres. Elles se posent aux
angles d'une passe, jamais au milieu, et jamais plus de quatre par écran.

## Motion

*Peu d'animations* — c'était une contrainte de la charte de marque, assouplie
le 2026-10-19 à la demande de l'utilisateur. Assouplie, pas levée : **une
seule intention de mouvement par page**, et elle est nommée.

**L'intention : les passes se séparent au défilement.** Une feuille
sérigraphiée est imprimée en plusieurs passes d'encre sur le même papier ; ici
elles se décollent les unes des autres quand on quitte le premier écran.
Le papier qui traverse ne bouge pas, le bleu descend de 26 px, le vert de
58 px, proportionnellement au défilement. **Les repères de calage, eux, restent
immobiles** : ils sont la presse, pas l'encre, et c'est leur immobilité qui
rend la séparation lisible.

Le reste n'est pas de l'intention, c'est de la fonction :

- **La barre d'encres se remplit** à son arrivée dans l'écran, segment par
  segment. Sans quoi la règle 80/15/5/5 se lit comme un bandeau décoratif au
  lieu d'une règle.
- **Les quantités se comptent.** `arc-animated-number` (ARC UI) compte les
  quatre poids de la barre et le « 100 % » des repères. Uniquement ceux-là :
  « 2–4 » est un intervalle et non un nombre, et compter « 0 » revient à
  compter de zéro à zéro. Animer les trois repères demanderait d'inventer un
  point de départ à chacun — ce serait de la décoration déguisée en
  information.
- **Les objections se traitent une par une.** La pile de cartes en `sticky`
  (`SectionServices`) est une **seconde mise en scène**, et elle est nommée
  ici depuis le 2026-10-21 : elle était en production depuis la v9 sans que ce
  document la couvre. Elle n'a droit de cité que là où empiler veut dire
  quelque chose — une objection à la fois sur la home, une gradation de cinq
  niveaux sur `/offres` — et jamais deux fois sur la même page, où les deux
  piles cesseraient de se distinguer. En mouvement réduit elle n'a pas lieu :
  les cartes redeviennent une suite.
- **Les états** : survol, focus, désactivé. Un état n'est pas une animation.

Règles de fabrication :

- `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` pour toute entrée.
- Rien au-dessus de **300 ms** en interface. Le décompte d'un nombre est une
  lecture et non un retour d'interface : 900 ms, dans le registre marketing
  que la charte autorise à dépasser.
- Le défilement n'écrit qu'une variable CSS, une fois par trame
  (`requestAnimationFrame`), et ne touche que `transform`.
- `prefers-reduced-motion: reduce` **ne désactive pas seulement la
  transition** : l'écouteur de défilement n'est pas posé du tout, et la barre
  d'encres naît remplie. La page reste entièrement lisible ; seule la mise en
  scène tombe.

### Ce qui a été écarté, et pourquoi

ARC UI (`arcui.dev`) est une bibliothèque d'écrans d'application : sur ses
169 composants, cinq seulement touchent au mouvement. Trois sont refusés ici —
**Gradient Text** parce que l'emphase vient de la graisse ou du corps et jamais
d'un dégradé ; **Typewriter** parce qu'il se bat avec une typographie
d'affiche, qui est posée d'un coup ou ne l'est pas ; **Marquee** parce qu'un
bandeau défilant est le cliché de la catégorie. Reste `AnimatedNumber`, qui
sert les quantités — et les quantités sont de la matière dans cette direction.

## Components

- **Bouton principal** — aplat `--signal`, texte blanc, angle vif, 11×20 px.
- **Bouton de contraste** — aplat blanc, texte noir, 15×28 px. Il clôt une
  passe, il ne cohabite pas avec le bouton principal dans le même bloc.
- **Panneau** — `--ground-raise`, plein, sans contour ni ombre.
- **Pastille d'état** — `LIVRÉ` sur aplat `--state` en texte noir ; `EN COURS`
  sur `--rule` en texte blanc. Jamais d'autre état : il n'y en a pas d'autre.
- **Barre d'encres** — 80 / 15 / 5 / 5 en largeurs réelles, légendée. Elle
  sépare deux passes à la place d'un filet.
- **Ligne de réalisation** — nom en Syne, secteur et ville, résumé complet,
  catégorie et statut. Deux colonnes, pas une carte.
  **La règle du survol a changé le 2026-10-21**, et c'est la matière qui l'a
  changée : une ligne **qui a une page de cas mène quelque part**, donc elle
  est un lien et son survol tient sa promesse. Une ligne sans page reste
  inerte et garde la vignette au curseur, qui montre sans promettre. La règle
  d'avant — « pas de survol, la ligne ne mène nulle part » — valait tant
  qu'aucune fiche n'existait.
- **Bloc de prix / d'affiche** (`PriceBlock`) — filet de tête de 2 px, titre en
  capitales, `<dl>` clé/valeur, bouton pleine largeur. C'est la **seule
  exception** à « rien ne se sépare par un filet » : celui-ci ne sépare rien,
  il ouvre le bloc. Il sert à la feuille et à la carte Sprint, et nulle part
  ailleurs.
- **Bascule de thème** — un disque mi-plein, dessiné, dans l'en-tête. La
  moitié pleine est le sol vers lequel on bascule, pas celui où l'on est. Pas
  de contour au repos. Le choix est mémorisé, et un script synchrone dans
  `<head>` le repose **avant la première peinture** : un visiteur qui a choisi
  le sombre ne voit jamais le clair passer.
- **Mot-image** — posé en masque CSS et peint à `currentColor`, il suit donc
  le thème. Deux fichiers dont l'un serait invisible sur l'autre sol serait
  une faute d'entretien programmée.

## Do's and Don'ts

**Do**

- Laisser le titre aller jusqu'au bout. La forme ne tient que si la typographie
  est posée à pleine taille ; posée timidement, la feuille redevient une page
  sombre ordinaire.
- Mesurer chaque couleur **sur la page rendue**, pas sur cette table.
- Écrire les quantités comme de la matière, à position fixe.
- Garder le calage visible.

**Don't**

- **Pas d'étiquette au-dessus d'un titre.** Le titre porte son propre poids. La
  ligne d'imprimeur se signe au pied de la feuille, en colophon.
- **Pas de numéro de section décoratif.** Les numéros des réalisations et des
  étapes de la méthode sont du contenu — ils disent un ordre réel. Ailleurs, non.
- **Pas de carte à icône, titre et texte** comme structure de page. Les
  compétences sont des bandes, pas une grille de cartes égales.
- **Pas de texte en Neural Blue ni en Signal Purple.** Voir la règle 1.
- **Pas de blanc sur aplat vert.** Voir la règle 2.
- **Pas de filet pour séparer deux surfaces**, hors champ de formulaire et hors
  séparateur de liste à l'intérieur d'une passe.
- **Pas de verre dépoli, pas de flou d'arrière-plan, pas d'ombre au repos.**
- **Pas de couleur d'encre écrite en dur dans un composant.** Voir le
  renversement : la même valeur qui passe sur un sol échoue sur l'autre.
- **Pas de texte en dégradé, pas de machine à écrire, pas de bandeau
  défilant** — même disponibles dans la bibliothèque installée.
- **Pas de métrique inventée.** Aucun témoignage, aucun chiffre d'affaires,
  aucune performance, aucun logo client : `PRODUCT.md` les nomme comme des
  absences à ne jamais combler au jugé.
- **Aucune mention de hackathon**, jamais.
