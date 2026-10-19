---
version: beta
name: Icon Labs
description: Laboratoire d'ingénierie AI à Cotonou. Feuille sérigraphiée — trois encres passées sur du noir, et le calage visible comme preuve du métier.
colors:
  primary: "#2563EB"
  on-primary: "#FFFFFF"
  primary-text: "#5B8DF6"
  secondary: "#7C3AED"
  on-secondary: "#FFFFFF"
  secondary-text: "#A78BFA"
  tertiary: "#10B981"
  on-tertiary: "#0B0B0B"
  neutral: "#0B0B0B"
  surface: "#0B0B0B"
  surface-raised: "#141414"
  surface-sunken: "#1E1E1E"
  on-surface: "#FFFFFF"
  on-surface-variant: "#BBBBB5"
  on-surface-mute: "#8A8A86"
  on-primary-variant: "#EAF1FF"
  outline: "#3A3A3A"
  outline-on-primary: "#C2D6FD"
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

Icon Labs est un **laboratoire d'ingénierie AI indépendant** installé à
**Cotonou**, qui transforme des idées complexes en systèmes réels — produits IA,
plateformes, automatisations — et les livre en deux à quatre semaines, code
intégralement transféré, sans intermédiaire entre le client et l'ingénieur.

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
- **les quantités sont de la matière.** Sept, six, deux à quatre, cent pour cent.
  Elles sont à position fixe et jamais inventées — aucune n'entre sur la page
  sans une source dans `PRODUCT.md`.
- **la face d'une réalisation est un résumé complet.** On n'a pas besoin de
  l'ouvrir pour savoir ce qui a été construit ; l'ouvrir est la vue de détail.

Cette forme a été choisie contre le héros centré sur dégradé que la catégorie
des studios IA imprime à l'identique, et contre le portail shader plein écran,
écarté pour une raison nommée par la charte elle-même : *peu d'animations*.

## Colors

Cinq couleurs, et la règle de proportion **80 / 15 / 5 / 5** de la charte de
marque. Une couleur sans rôle n'existe pas. Le noir est le sol ; les encres
passent dessus.

| Rôle | Valeur | Emploi | Contraste mesuré |
|---|---|---|---|
| `--ground` | `#0B0B0B` Tech Black | le sol, 80 % avec le blanc | — |
| `--ground-raise` | `#141414` | panneau, le seul niveau de surélévation | 1,07 / sol |
| `--ground-sunken` | `#1E1E1E` | aplat neutre, barre d'encres | 1,18 / sol |
| `--rule` | `#2A2A2A` | séparateur **non porteur de sens** | 1,37 / sol |
| `--on-ground` | `#FFFFFF` | titres et texte courant | **19,68** / sol |
| `--on-ground-soft` | `#BBBBB5` | texte secondaire | **10,21** / sol |
| `--on-ground-mute` | `#8A8A86` | légende, numéro de passe | **5,68** / sol |
| `--signal` | `#2563EB` Neural Blue | **aplat et grand titre seulement** | 3,81 / sol |
| `--signal-text` | `#5B8DF6` | la seule forme admise en texte courant | **6,17** / sol |
| `--accent` | `#7C3AED` Signal Purple | aplat et titre ≥ 32 px | 3,45 / sol |
| `--accent-text` | `#A78BFA` | texte courant violet, rare | **7,23** / sol |
| `--state` | `#10B981` Automation Green | aplat **et** texte courant | **7,76** / sol |

Sur aplat :

| Fond | Texte admis | Contraste | Texte interdit |
|---|---|---|---|
| `--signal` `#2563EB` | blanc `#FFFFFF` | **5,17** | — |
| `--signal` `#2563EB` | secondaire `#EAF1FF` | **4,56** | `#D7E3FD` (4,01) |
| `--accent` `#7C3AED` | blanc `#FFFFFF` | **5,70** | noir (3,45) |
| `--state` `#10B981` | noir `#0B0B0B` | **7,76** | **blanc (2,54)** |
| `--on-ground` `#FFFFFF` | noir `#0B0B0B` | **19,68** | — |

**Les trois règles qui tombent de ces mesures**, et qu'aucune exception ne lève :

1. **Neural Blue et Signal Purple ne portent jamais de texte courant.** 3,81 et
   3,45 : ils tiennent le grand titre (≥ 24 px, ou ≥ 18,66 px gras) et l'aplat,
   rien d'autre. Le texte bleu existe sous la forme `--signal-text` `#5B8DF6`.
2. **Sur aplat vert, c'est le noir qui tient**, jamais le blanc. 7,76 contre
   2,54 : l'erreur inverse est un échec de 44 % sous le seuil.
3. **Le texte secondaire sur aplat bleu est `#EAF1FF`**, pas `#D7E3FD`. L'écart
   entre les deux est de 0,5 point de contraste et de part et d'autre du seuil.

La bordure d'un champ de formulaire vaut `--outline` `#3A3A3A` sur le sol, et
`#C2D6FD` (3,53) sur aplat bleu — un champ doit se voir, c'est la seule
séparation par filet que le système autorise.

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
Le verrouillage sur fond sombre est la forme par défaut ; la variante `-ink`
sert les rares aplats clairs. Le point final du mot-image est en
`--state` `#10B981` : c'est la seule couleur que le logo porte.

Interdits par la charte de marque, sans exception : ombre, dégradé, effet 3D,
couleur non définie, distorsion, fond coloré non validé.

## Layout

Largeur maximale 1440 px, gouttière 56 px au bureau. La feuille occupe toute la
largeur : il n'y a pas de colonne centrée étroite, parce qu'une affiche n'en a
pas.

La page se lit en **neuf passes**, dans cet ordre, et aucune ne se saute :

1. la feuille — titre monumental et les créneaux d'appel réels ;
2. la barre d'encres 80 / 15 / 5 / 5, rendue littérale ;
3. les repères — trois engagements, une encre chacun ;
4. les six compétences, en bandes pleine largeur ;
5. les sept réalisations, une ligne chacune, résumé compris ;
6. la différence, en trois colonnes ;
7. la méthode, en quatre passes datées ;
8. le labo et les questions fréquentes ;
9. la dernière passe : le bleu prend toute la feuille, et on réserve.

## Elevation & Depth

**Un seul niveau de surélévation** : `--ground-raise` `#141414` sur `--ground`.
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

*Peu d'animations* — c'est une contrainte de marque, pas une préférence.

- Une seule intention par page : les passes se séparent au défilement, à des
  vitesses légèrement différentes. Rien d'autre ne bouge de soi-même.
- `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` pour toute entrée.
- Rien au-dessus de **300 ms**. Retour d'appui à 140 ms.
- `prefers-reduced-motion` coupe la séparation des passes : la page reste
  entièrement lisible, seule la mise en scène tombe.

## Components

- **Bouton principal** — aplat `--signal`, texte blanc, angle vif, 11×20 px.
- **Bouton de contraste** — aplat blanc, texte noir, 15×28 px. Il clôt une
  passe, il ne cohabite pas avec le bouton principal dans le même bloc.
- **Panneau** — `--ground-raise`, plein, sans contour ni ombre.
- **Pastille d'état** — `LIVRÉ` sur aplat `--state` en texte noir ; `EN COURS`
  sur `--rule` en texte blanc. Jamais d'autre état : il n'y en a pas d'autre.
- **Barre d'encres** — 80 / 15 / 5 / 5 en largeurs réelles, légendée. Elle
  sépare deux passes à la place d'un filet.
- **Ligne de réalisation** — numéro, nom en Syne 38 px, secteur et ville,
  résumé complet, catégorie en pastille. Quatre colonnes, pas une carte.

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
- **Pas de métrique inventée.** Aucun témoignage, aucun chiffre d'affaires,
  aucune performance, aucun logo client : `PRODUCT.md` les nomme comme des
  absences à ne jamais combler au jugé.
- **Aucune mention de hackathon**, jamais.
