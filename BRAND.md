# Icon Labs — charte de marque

**v2, 2 octobre 2026.** Ce fichier est la source unique de l'identité. Toute
valeur de couleur, de police ou de mesure employée dans le site vient d'ici et
figure comme token dans `app/assets/css/main.css`. Si une décision manque, elle
se prend ici d'abord.

> **v2 — le site se lit en clair.** Décision du 2 octobre 2026 : le papier
> devient le sol, l'encre redevient ce qu'elle est, une marque posée dessus.
> Les deux pôles et la couleur signature ne changent pas de valeur ; ils
> changent de rôle. S'y ajoute un seul token neuf, `--paper-raise` — le blanc
> pur, réservé aux surfaces qui se détachent du papier. La v1 (sol encre) est
> dans l'historique du dépôt ; rien ici n'en est hérité sans être re-mesuré.

> Ce document remplace une charte citée dans le code mais inexistante
> (« brandbook v1.0, avril 2026 »). Rien de ce qui suit n'est hérité : chaque
> valeur est une décision datée, prise le 1er octobre 2026, et vérifiable.

## 1. Positionnement

Icon Labs est un studio d'ingénierie créative basé en Afrique de l'Ouest. Il
conçoit des sites et des produits dont l'expérience est tenue par la structure,
pas par l'effet.

- Signature : **« Structure d'abord, effet ensuite. »** / *Structure first,
  effect second.*
- Origine : « Conçu en Afrique de l'Ouest. Déployé partout. »

Le ton est direct et vérifiable : aucune métrique qui ne puisse être produite,
aucun superlatif. Les textes vivent dans `content/site.ts`, jamais dans les
composants.

## 2. Couleur

Deux pôles — papier et encre — et **une** couleur signature. Pas de palette
décorative : la couleur qui n'a pas de rôle n'existe pas.

Le papier est le sol. L'encre est ce qui s'écrit dessus : un titre, un filet, un
contour de maquette. Les noms des tokens disent le pigment, les commentaires de
`main.css` disent le rôle — une inversion future ne touche que `:root`.

| Token | Valeur | Rôle |
|---|---|---|
| `--paper` | `#F4F1EC` | le sol : fond général, chaud |
| `--paper-raise` | `#FFFFFF` | **l'élément blanc** — bandes et cartes qui se détachent du papier |
| `--paper-line` | `#CBC6BE` | bordure affirmée, au survol |
| `--ink` | `#0B0B0B` | titres, texte sur aplat vermillon |
| `--ink-soft` | `#2A2621` | texte courant |
| `--ink-mute` | `#6A635B` | texte secondaire |
| `--signal` | `#F2360A` | **vermillon** — la couleur signature |
| `--signal-deep` | `#C62A06` | le vermillon assombri, la seule forme admise pour du texte |
| `--paper-veil` | `rgba(244,241,236,0.82)` | le papier en voile, header sur contenu |
| `--hairline` / `--hairline-soft` | encre à 12 % / 6 % | filets de séparation |

### Contrastes mesurés (WCAG 2.1)

Chaque couple est calculé, pas estimé — `tools/` n'embarque pas le calcul, mais
toute valeur ajoutée ici doit l'être avec la formule de luminance relative 2.1.

| Couple | Ratio | Verdict |
|---|---|---|
| titres `--ink` sur `--paper` | 17,47 | AAA |
| titres `--ink` sur `--paper-raise` | 19,68 | AAA |
| texte courant `--ink-soft` sur `--paper` | 13,34 | AAA |
| texte courant `--ink-soft` sur `--paper-raise` | 15,03 | AAA |
| texte secondaire `--ink-mute` sur `--paper` | 5,25 | AA |
| texte secondaire `--ink-mute` sur `--paper-raise` | 5,92 | AA |
| `--signal-deep` sur `--paper` | 4,99 | AA |
| `--signal-deep` sur `--paper-raise` | 5,62 | AA |
| texte `--ink` sur aplat `--signal` | 4,97 | AA |
| texte `--paper` sur aplat `--signal-deep` | 4,99 | AA |
| `--signal` sur `--paper` | 3,51 | AA **grand texte seulement** |
| texte `--ink` sur aplat `--signal-deep` | 3,50 | AA **grand texte seulement** |

### Règles d'emploi du vermillon

1. Le vermillon **occupe des surfaces** : aplats pleins, images sociales, zones
   d'appel. Ce n'est pas un simple filet d'accent.
2. Sur un aplat `--signal`, le texte est **en encre** (4,97). Le papier n'y est
   admis que pour du grand texte (≥ 24 px ou ≥ 19 px gras).
3. Sur un aplat `--signal-deep` — le fond assombri d'un survol — la règle
   s'inverse : le texte est **en papier** (4,99), jamais en encre (3,50).
   C'est le fond qui fonce, donc c'est le texte qui doit s'éclaircir.
4. Sur papier ou sur blanc, le texte en couleur utilise `--signal-deep`, jamais
   `--signal` : 3,51 ne suffit pas pour du petit texte, et aucun texte coloré du
   site n'atteint 24 px.
5. Une seule couleur signature. Aucun second accent n'est introduit sans une
   mesure de contraste ajoutée au tableau ci-dessus.
6. La **pastille de section** — le numéro 01 à 05 posé devant l'étiquette — est
   un aplat `--signal-deep` portant du texte `--paper` (4,99). Sur la section
   contact, qui est elle-même un aplat `--signal`, elle s'inverse en encre et
   papier (17,47) : `--signal-deep` sur `--signal` ne se détacherait pas. Cette
   pastille existe pour qu'on ne confonde pas le numéro de la section avec les
   numéros des cartes et des étapes, qui sont du texte `--signal-deep` au même
   corps et dans la même monospace.

### Ce que le blanc a le droit d'être

`--paper-raise` n'est pas une nuance de fond parmi d'autres : c'est **le seul
niveau de surélévation du système**. Une bande de section et une carte posée
dedans portent le même blanc, séparées par un filet — jamais par une troisième
teinte. S'il faut un deuxième niveau, c'est que la hiérarchie est à revoir, pas
la palette.

## 3. Typographie

| Rôle | Police | Graisses | Emploi |
|---|---|---|---|
| Display | **Bricolage Grotesque** (variable, axes `opsz` 12–96 et `wght`) | 400–800 | titres, mot-image |
| Texte | **Instrument Sans** (variable) | 400–600 | texte courant, interface |
| Étiquette | **Martian Mono** | 300–500 | kickers, numéros, méta — capitales et chiffres uniquement |

- Le texte courant **n'est pas** en monospace : la monospace est réservée aux
  étiquettes, où elle signe le côté « labs » sans ralentir la lecture.
- Titres : graisse 800, interligne 0,97, approche −0,02 em.
- Étiquettes : approche +0,18 em, capitales.
- Échelle fluide `--fs-xs` … `--fs-3xl`, recalibrée sur la hauteur d'x de
  Bricolage Grotesque, plus généreuse que celle de Syne.
- Largeur de colonne par tokens `--measure-tight` (44ch), `--measure` (54ch),
  `--measure-wide` (62ch) — en `ch`, donc solidaires de la police.

## 4. Logo

Le logo est **redessiné**, pas décalqué. Le symbole est une géométrie exacte sur
grille de 64 ; le mot-image est composé à partir des contours réels de
Bricolage Grotesque instanciée à `opsz=96, wght=800`, approche −0,028 em, puis
converti en tracés (il ne dépend donc d'aucune police au moment de l'affichage).

**Le geste** : un trait continu qui se referme en structure — le même geste que
le récit au scroll de la page d'accueil. Le coin manquant devient le point : la
seule touche de vermillon du logo.

| Fichier | Usage |
|---|---|
| `public/brand/symbol.svg` · `symbol-ink.svg` | symbole seul |
| `public/brand/wordmark.svg` · `wordmark-ink.svg` | mot-image seul (ratio 5,105) |
| `public/brand/lockup.svg` · `lockup-ink.svg` | verrouillage symbole + mot-image (ratio 4,558) |
| `public/brand/favicon.svg` | symbole papier sur carré encre, rayon 14/64 |
| `public/brand/icon-512.png` · `apple-touch-icon.png` · `public/favicon.png` | rendus matriciels du favicon |
| `public/brand/og.svg` · `og.png` | image sociale 1200 × 630, aplat vermillon |

**Règles.** Zone de protection : la hauteur du symbole divisée par deux, sur les
quatre côtés. Taille minimale du symbole : 16 px (vérifiée). Le suffixe `-ink`
sert aux fonds clairs, la version sans suffixe aux fonds sombres. Le point
vermillon ne change jamais de couleur. Le logo ne se déforme pas, ne se
recolore pas, ne reçoit ni ombre ni contour.

**Depuis la v2**, le site étant sur papier, c'est `lockup-ink.svg` qui est servi
dans le header et le pied de page ; la version sans suffixe reste la bonne pour
tout fond sombre (présentations, documents). Deux fichiers ne changent pas de
sol pour autant, et c'est voulu :

- `favicon.svg` et ses rendus matriciels gardent leur carré d'encre. Une icône
  porte son propre fond : elle doit tenir dans un onglet clair comme sombre, pas
  s'accorder au site.
- `og.png` reste un aplat vermillon à marques d'encre (règle 2). Il ne dépend
  pas du sol du site, et la v2 ne l'a donc pas regénéré.

## 5. Images du récit au scroll

`tools/make-story-frames.mjs` regroupe en tête les constantes de palette, puis
les traduit en **trois rôles** : `GROUND` (le fond du cadre), `MARK` (grille,
contours, remplissages de la maquette filaire) et `SURFACE` (le panneau surélevé
du dernier battement). Un SVG ne peut pas lire une variable CSS : c'est la seule
duplication admise de la palette, et une nouvelle inversion du site ne toucherait
que ces trois lignes. Depuis la v2 : `GROUND = PAPER`, `MARK = INK`,
`SURFACE = PAPER_RAISE` — le récit se termine sur le même élément blanc que les
sections de la page.

Le dégradé signature module **une seule couleur**
(`SIGNAL_DEEP → SIGNAL → SIGNAL_LIFT`) au lieu de traverser trois teintes sans
rapport.

**Ce qui a dû être re-réglé, et pourquoi.** Un dessin conçu sur fond sombre ne
s'inverse pas en changeant deux couleurs : trois procédés y étaient des procédés
de nuit.

- Le *bloom* (`feGaussianBlur`) autour du trait vermillon : sur encre il
  éclairait, sur papier il tachait. Rayon ramené de 7 à 2,5 — il ne reste qu'un
  adoucissement du trait.
- Le halo radial, de 13 % à 5 % : sur papier, une brume colorée se lit comme une
  salissure bien avant de se lire comme une lumière.
- Les opacités. Un trait sombre sur fond clair porte plus loin que l'inverse :
  les contours de maquette descendent de 0,45 à 0,32 (`EDGE_OP`), les
  remplissages de 0,06 à 0,05. L'arc signature fait le chemin contraire — un
  vermillon translucide se dilue dans le papier, il est donc remonté à 0,75
  (`ARC_OP`), valeur unique sur laquelle les quatre battements se calent.

Regénération : `./tools/build-story.sh` — 135 images, indices 0 à 134, contrôlés
par le script lui-même.
