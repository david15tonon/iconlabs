# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Fondateurs et responsables techniques de startups et de PME en croissance, en
Afrique de l'Ouest (Cotonou, Lomé, Abidjan) et au-delà, qui doivent mettre un
système en production vite et sans monter d'équipe interne.

Ils arrivent en train d'évaluer si un petit laboratoire peut être chargé de
travail réel. Leur tâche : passer d'une idée à un système qui tourne, et savoir
avant de s'engager à quoi ressemblent le périmètre et le délai. Le succès de la
visite, c'est **une réservation d'appel** — pas un formulaire de devis.

Audience secondaire : les clients déjà engagés qui montent d'une offre à la
suivante (audit → sprint → MVP → direction technique continue).

## Product Purpose

Icon Labs est un **laboratoire d'ingénierie AI indépendant** qui transforme
rapidement des idées complexes en systèmes réels : produits IA, plateformes,
automatisations. Le site existe pour qu'un prospect comprenne ce qui est
construit ici, voie que ça a déjà été livré, et réserve un appel.

## Positioning

« Un laboratoire d'ingénierie AI indépendant capable de transformer rapidement
des idées complexes en systèmes réels. » — *Built in West Africa. Scaled
worldwide.*

Ce que la marque **n'est pas**, et que le site ne doit jamais laisser croire :
une agence web, un freelance classique, une startup hype, un marketeur, du
corporate froid.

## Operating Context

- Le prospect **réserve un appel** (intégration Cal.com dans le matériel
  existant), il ne demande pas un devis. Décision de l'utilisateur, 2026-10-18.
- Audience bilingue FR / EN, langue déduite du pays à l'arrivée.
- Les notifications de formulaire passent par EmailJS dans le matériel
  existant ; le site Nuxt actuel poste sur `/api/contact` et bascule sur le
  client mail tant que `NUXT_CONTACT_WEBHOOK` n'est pas défini.
- Adresse de contact : `contact@iconlabs.dev`.

## Capabilities and Constraints

### Amendement du 2026-10-21 — le document « Icon Labs · Structure du site »

Trois renversements, demandés par l'utilisateur et appliqués dans la v10. Ils
**remplacent** ce que cette section disait depuis le 2026-10-18.

**1. Les prix s'affichent.** Le principe n° 2 (« le prix se discute en appel »)
tombe. Sur une offre packagée, un prix visible filtre les prospects sans budget
et épargne au client l'appel qu'il aurait passé pour le demander.

**2. Six compétences deviennent cinq offres**, avec un système au choix parmi
quatre. Une compétence décrit ce qu'on sait faire ; une offre dit ce qu'on
achète, combien de temps ça prend et combien ça coûte.

| Offre | Prix | Durée | Pour qui |
|---|---|---|---|
| Appel découverte | Gratuit | 30 min | Tout prospect |
| Diagnostic IA | 750 € | 1 semaine | Qui hésite sur le cas d'usage — déduit d'un Sprint |
| **Sprint IA** | **3 000 €, fixe** | **3 semaines** | **Qui a un problème précis** |
| Déploiement | À partir de 9 000 € | 4 à 8 semaines | Qui étend après un premier Sprint |
| Suivi & optimisation | 390 € / mois | Sans engagement | Tout client livré |

Un Sprint construit **un seul** des quatre systèmes, en entier — agent
commercial WhatsApp, automatisation d'un processus, assistant documentaire,
tableau de pilotage. C'est ce qui rend tenables trois semaines et un prix fixe.

⚠️ **Aucune garantie de retard n'est publiée.** Le document en proposait une
(« la semaine suivante est offerte ») ; l'utilisateur a tranché le 2026-10-21 :
non. Le prix fixe et le périmètre écrit sont les engagements. Ne pas en ajouter
une sans décision explicite — c'est contractuel, pas rédactionnel.

**3. La preuve devient le résultat**, là où elle était la liste du livré. Ce
qui ne change pas : le principe n° 5 gouverne le reste. **Aucun chiffre de
résultat n'existe aujourd'hui** (voir § Evidence on Hand) ; les blocs de
résultats portent donc le fait vérifiable — la tâche qui a quitté le client —
dans la position qu'un chiffre occupera, sans gabarit vide ni « à venir ».

**La grille en dollars du matériel d'origine est périmée** (Stack Audit 200 $,
Production Sprint 800 $, Full AI MVP 3 000 $, Fractional AI CTO 1 000 $/mois).
Elle survit uniquement comme **catégorie de réalisation** dans les fiches
clients, jamais comme tarif.

**Bibliothèque de composants** : **ARC UI** (`arcui.dev`,
`@arclux/arc-ui-vue` + `@arclux/arc-ui` + `lit`), choisie par l'utilisateur le
2026-10-19. C'est une bibliothèque de web components Lit avec un vrai paquet
Vue 3 — donc utilisable en Nuxt, contrairement à magicui.design et uiarc.dev
qui sont React seulement. Elle est importée **composant par composant**, et un
seul sert : `AnimatedNumber`. Ses composants appellent `customElements.define`
au niveau module et ne passent pas le rendu serveur : ils vivent dans un
fichier `.client.vue`, avec la vraie valeur rendue par le serveur en repli.

**Contraintes techniques** : Nuxt 4 + Vue 3. Adresses préfixées `/fr` et `/en`
plus `/` déduit du pays (`cf-ipcountry` lu avant `x-vercel-ip-country`).
Hébergé sur Vercel aujourd'hui, Cloudflare Pages visé. Le plafond de 100
règles du `_routes.json` a été levé le 2026-10-19 (`defaultRoutes: false` et
cinq chemins déclarés à la main, 7 règles) : tout fichier ajouté dans
`public/` hors `brand/`, `story/` et `work/` doit entrer dans cette liste, et
`npm run check:cf` échoue s'il n'y est pas.

## Brand Commitments

**`iconlabs-brand.html` (Brand Guidelines v1.0, 2026) fait loi** — décision
explicite de l'utilisateur le 2026-10-18, face à l'implémentation précédente
qui s'en écartait.

- **Palette, règle 80 / 15 / 5** : Tech Black `#0B0B0B` et Pure White `#FFFFFF`
  à 80 %, Neural Blue `#2563EB` à 15 % (IA · confiance · infra), Signal Purple
  `#7C3AED` à 5 % (innovation · R&D), Automation Green `#10B981` à 5 %
  (efficacité · ROI). Gris `--g1` `#141414` → `--g6` `#BBBBB5`.
- **Typographie** : Syne en display (800 / 700, interlettrage −1 à −3 px),
  DM Mono en labeur et légende (400 / 300, interligne 1,6–1,75).
- **Le site en usage** : la charte écrit *dark mode dominant, espace vide
  généreux, typo large, peu d'animations, sections claires et respirantes.*
  **Deux de ces points ont été amendés par l'utilisateur le 2026-10-19**, et
  l'amendement l'emporte sur la charte :
  - **le clair devient le thème par défaut**, le sombre reste disponible par
    une bascule mémorisée. La dominante sombre n'est donc plus la règle, elle
    est une option offerte au visiteur ;
  - **« peu d'animations » est assoupli, pas levé** : une seule intention de
    mouvement par page — les passes d'encre se séparent au défilement — plus
    le remplissage de la barre d'encres et le décompte des quantités. Le texte
    en dégradé, la machine à écrire et le bandeau défilant restent exclus.
- **Logo** interdit de : ombres, dégradés, effets 3D, couleurs non définies,
  distorsion, fond coloré non validé.
- **Voix** : direct, précis, technique, sans buzzwords, confiance implicite,
  phrases courtes, verbes actifs. Proscrit : « révolutionnaire », « solutions
  innovantes », « croissance exponentielle ».
- **Taglines** disponibles : *Build smarter systems.* · *AI. Automation.
  Execution.* · *Built in West Africa. Scaled worldwide.* · *From idea to
  intelligent system.* · *Build. Automate. Scale.*
- **Personnalité** : intelligent, minimaliste, pragmatique, futuriste, premium,
  ingénieur, crédible, calme.
- **Référence pour la section réalisations** : `awakeagency.dev`, donnée par
  l'utilisateur le 2026-10-18.

## Evidence on Hand

**Sept réalisations, clients réels, publiables nommément** — confirmé par
l'utilisateur le 2026-10-18. Source : `~/Téléchargements/Iconlabs-main/`
(`realisations.html` et les fiches `projet-*.html`).

| Projet | Catégorie | Secteur · Lieu | Matière |
|---|---|---|---|
| MIA CORPORATE | Full AI MVP | Beauté & bien-être · Cotonou, Bénin | Agent de qualification sur base documentaire, réservation en 3 étapes, relances automatiques. RAG, agents, Cal.com, EmailJS |
| AURORA PÂTISSERIE | Production Sprint | Restauration & pâtisserie · Lomé, Togo | Refonte du catalogue, moteur de recommandations, commandes WhatsApp automatisées |
| TRANSKO | Full AI MVP | Logistique & transport · Cotonou, Bénin | Agent d'affectation des coursiers, optimisation de tournées, tableau de bord expéditeur temps réel |
| BELLA HAIR STUDIO | Production Sprint | Beauté & mode · Abidjan, Côte d'Ivoire | Assistant conversationnel WhatsApp branché au catalogue, automatisation du service client |
| IMMO ELITE | Stack Audit | Immobilier · Cotonou, Bénin | Revue d'infrastructure, plan de migration vers une recherche sémantique, feuille de route chiffrée |
| GREEN HARVEST | Fractional AI CTO | Agro-alimentaire · Abidjan, Côte d'Ivoire | Architecture cible des données, priorisation de roadmap IA, gouvernance, montée en compétence |
| Adjani Privé | Sites & expériences | Mode, héritage yoruba · Cotonou | E-commerce de marque. **Pas encore en ligne → fiche sans lien sortant** (décision de l'utilisateur) |

**« En production » a une définition**, sans quoi « 4 systèmes en production »
sur « 6 projets livrés » se contredit à l'œil : un système en production est un
système **qu'un client utilise tous les jours**. Un audit de pile (Immo Elite)
et un accompagnement (Green Harvest) sont des livrables, pas des systèmes ; ils
comptent dans les projets livrés, jamais dans les systèmes. Adjani Privé est en
cours et ne compte nulle part. D'où : **4 systèmes, 6 projets, 3 pays.**

**Absences à ne jamais combler au jugé** : aucun témoignage client écrit,
aucun chiffre d'affaires, aucune métrique de performance, aucun logo client.
**Aucun résultat chiffré** non plus — pas un gain de temps, pas une hausse de
ventes, pas une baisse de coût. Un résultat ne se publie qu'avec sa période de
mesure, et seulement quand le client l'a mesuré et autorisé.

**Aucune matière de conformité** : ni hébergeur ni région pour les systèmes
clients, ni politique d'entraînement des modèles, ni contrat de sous-traitance
(DPA), ni registre des traitements, ni délai d'effacement. La page `/securite`
porte uniquement ce qui est structurellement vrai et nomme ce silence au lieu
de le combler — une promesse de conformité non tenue est un risque juridique.

**Six captures clients manquent.** `miacorporate.netlify.app` est le seul
système client publiquement atteignable ; les cinq autres « URL clients » du
matériel d'origine sont de la fausse barre d'adresse décorative (aucun des
domaines ne résout, vérifié le 2026-10-20), et les « aperçus de projet » de
l'ancien site sont 18 photos Unsplash. La grille de `/cas` ne montre que ce qui
a une capture : une capture fournie, et la réalisation y monte toute seule.
**Toute mention de hackathon est proscrite** — NASA Space Apps Challenge et
LabLab AI ont été retirés sur demande explicite le 2026-10-02 et ne doivent
pas revenir.

## Product Principles

1. **On montre ce qui tourne, pas ce qu'on promet.** Six projets livrés et
   quatre systèmes en production sont la preuve ; rien d'autre n'est affirmé.
   ⚠️ « Sept projets livrés » est **faux** : Adjani Privé est en cours. Les
   comptes du site sont calculés depuis `work` (`app/composables/useCounts.ts`)
   pour qu'ils ne puissent plus mentir.
2. ~~Le prix se discute en appel, pas sur la page.~~ **Renversé le
   2026-10-21** : les prix sont publics et affichés. La page amène toujours à
   réserver, mais elle répond d'abord à la question du prix.
3. **Technique et calme plutôt que vendeur.** Le registre marketing est un
   échec de ton, pas un accélérateur.
4. **Pas une agence web.** Les sites et le motion design sont un savoir-faire
   de la maison — ils rendent les livrables présentables, ils ne sont pas
   l'offre. Ce qui se vend, ce sont des systèmes qui tournent.
5. **Rien d'inventé.** Chaque nom, chiffre ou référence vient d'une source que
   l'utilisateur a fournie.

## Accessibility & Inclusion

Le contraste se mesure **sur la page rendue**, jamais sur la table de la
charte : parcours de tous les nœuds textuels, en `/fr` et en `/en`, plancher
4,5. Plancher de corps à 13 px. Conséquence directe de la palette retenue —
Neural Blue (3,81 sur le noir) et Signal Purple (3,45) **ne peuvent pas porter
de texte courant**, seulement du gros titre ou un aplat ; sur aplat vert c'est
le noir qui tient (7,76), pas le blanc (2,54).
