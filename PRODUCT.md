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

**Six compétences** (arbitrage de l'utilisateur, 2026-10-18 — les cinq de la
charte, plus les sites qu'il vend réellement) :

1. AI Product Development — agents, intégration LLM, RAG, chatbots, pipelines
2. Web Platforms & SaaS — applications web, tableaux de bord, outils internes
3. Automation & Workflows — n8n, Make, Zapier, scripts sur mesure
4. R&D Projects — recherche appliquée, prototypage
5. MVP for Startups — de l'idée au produit en 2 à 4 semaines
6. Sites & expériences sur mesure

**Prix : non publics.** Une grille existe dans le matériel de l'utilisateur
(Stack Audit 200 $, Production Sprint 800 $, Full AI MVP 3 000 $ en 4 à 6
semaines, Fractional AI CTO 1 000 $/mois) — elle **ne va pas sur le site** :
« on ne met pas les prix, le client réserve un call » (2026-10-18). Les quatre
offres restent utiles comme **catégories de réalisation**, pas comme tarifs.

**Contraintes techniques** : Nuxt 4 + Vue 3. Adresses préfixées `/fr` et `/en`
plus `/` déduit du pays (`cf-ipcountry` lu avant `x-vercel-ip-country`).
Hébergé sur Vercel aujourd'hui, Cloudflare Pages visé — le `_routes.json`
généré pour Pages est à 100 règles sur 100 autorisées, tout ajout dans
`public/` doit tenir compte de ce plafond.

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
- **Le site en usage** : *dark mode dominant, espace vide généreux, typo large,
  peu d'animations, sections claires et respirantes.*
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

**Absences à ne jamais combler au jugé** : aucun témoignage client écrit,
aucun chiffre d'affaires, aucune métrique de performance, aucun logo client.
**Toute mention de hackathon est proscrite** — NASA Space Apps Challenge et
LabLab AI ont été retirés sur demande explicite le 2026-10-02 et ne doivent
pas revenir.

## Product Principles

1. **On montre ce qui tourne, pas ce qu'on promet.** Sept projets livrés sont
   la preuve ; rien d'autre n'est affirmé.
2. **Le prix se discute en appel, pas sur la page.** La page amène à réserver.
3. **Technique et calme plutôt que vendeur.** Le registre marketing est un
   échec de ton, pas un accélérateur.
4. **Pas une agence web.** Les sites sont une compétence parmi six, pas
   l'identité de la maison.
5. **Rien d'inventé.** Chaque nom, chiffre ou référence vient d'une source que
   l'utilisateur a fournie.

## Accessibility & Inclusion

Le contraste se mesure **sur la page rendue**, jamais sur la table de la
charte : parcours de tous les nœuds textuels, en `/fr` et en `/en`, plancher
4,5. Plancher de corps à 13 px. Conséquence directe de la palette retenue —
Neural Blue (3,81 sur le noir) et Signal Purple (3,45) **ne peuvent pas porter
de texte courant**, seulement du gros titre ou un aplat ; sur aplat vert c'est
le noir qui tient (7,76), pas le blanc (2,54).
