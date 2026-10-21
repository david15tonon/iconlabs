/**
 * Contenu éditorial du site Icon Labs — bilingue FR / EN.
 * C'est LE fichier à modifier pour changer les textes du site :
 * aucun texte n'est écrit en dur dans les composants.
 *
 * Convention : chaque champ est un objet { fr, en }.
 *
 * ⚠️ Aucun export de ce fichier ne doit porter le nom d'un global Node
 * (`process`, `module`, `exports`, `Buffer`…) : le bundle de production les
 * inline au niveau module, là où Nitro a déjà injecté ses imports, et le
 * serveur tombe à chaque requête. Voir `processSteps` plus bas, et
 * tasks/lessons.md (2026-10-02).
 *
 * ---------------------------------------------------------------------------
 * v10 — 2026-10-21. Le document « Icon Labs — Structure du site » change le
 * positionnement, pas seulement la mise en page :
 *   · le prix s'affiche (il se discutait en appel jusqu'ici) ;
 *   · six compétences deviennent une échelle de cinq offres, avec un système
 *     au choix parmi quatre ;
 *   · la preuve devient le résultat, là où elle était la liste du livré.
 * Ce qui ne change pas : rien n'est inventé. Aucun chiffre de résultat,
 * aucune citation client, aucun engagement de garantie n'est écrit ici tant
 * que le studio ne l'a pas fourni. Voir PRODUCT.md § Evidence on Hand.
 */

export type Locale = 'fr' | 'en'
export type T = Record<Locale, string>

const t = (fr: string, en: string): T => ({ fr, en })

export const brand = {
  wordmark: 'Icon Labs',
  tagline: t('On montre ce qui tourne, pas ce qu’on promet.', 'We show what runs, not what we promise.'),
  /* La phrase de positionnement du document, que celui-ci appelle lui-même
     « accroche du site ». Elle est reprise telle quelle par le titre de la
     feuille, découpée en trois passes d'encre. */
  positioning: t('Des systèmes IA qui font gagner du temps et du chiffre d’affaires, livrés en production en 3 semaines, à prix fixe.',
                 'AI systems that win back time and revenue, shipped to production in 3 weeks, at a fixed price.'),
  /* Ce qui est vérifiable : les sept clients sont à Cotonou, Lomé et Abidjan.
     « Scaled worldwide » a été retiré le 2026-10-20 — la phrase affirmait une
     portée que rien dans le site ne soutient. Le marché visé (Europe et
     Afrique francophone) est une intention commerciale, dite au sur-titre ;
     elle ne se déguise pas en preuve de livraison. */
  origin: t('Construit en Afrique de l’Ouest.', 'Built in West Africa.'),
  market: t('Studio d’ingénierie IA · Europe & Afrique francophone',
            'AI engineering studio · Europe & French-speaking Africa'),
  email: 'contact@iconlabs.dev',
  domain: 'iconlabs.qzz.io',
  linkedin: 'https://www.linkedin.com/company/iconlabs',   // TODO: confirmer l'URL réelle
}

/* ------------------------------------------------------------- navigation */
/* Les sept pages du document, chacune avec un seul rôle. Le bouton d'appel
   n'est pas dans cette liste : il est rendu à part dans l'en-tête, parce que
   c'est une action et non une destination parmi d'autres. */

export const nav = [
  { to: '/offres',   label: t('Offres', 'Offers') },
  { to: '/cas',      label: t('Cas clients', 'Case studies') },
  { to: '/methode',  label: t('Méthode', 'Process') },
  { to: '/securite', label: t('Sécurité', 'Security') },
  { to: '/a-propos', label: t('À propos', 'About') },
]

export const footerNav = [
  {
    title: t('Ce qu’on livre', 'What we ship'),
    links: [
      { to: '/offres',  label: t('Les cinq offres', 'The five offers') },
      { to: '/offres#sprint',  label: t('Sprint IA — 3 000 €', 'AI Sprint — €3,000') },
      { to: '/offres#systemes', label: t('Les quatre systèmes', 'The four systems') },
      { to: '/cas',     label: t('Cas clients', 'Case studies') },
    ],
  },
  {
    title: t('La maison', 'The studio'),
    links: [
      { to: '/methode',  label: t('Méthode', 'Process') },
      { to: '/securite', label: t('Sécurité & conformité', 'Security & compliance') },
      { to: '/a-propos', label: t('À propos', 'About') },
      { to: '/contact',  label: t('Réserver un appel', 'Book a call') },
    ],
  },
]

export const cta = {
  primary:   t('Réserver un appel de 30 min', 'Book a 30-min call'),
  secondary: t('Voir la méthode', 'See how we work'),
  call:      t('Réserver un appel de 30 min', 'Book a 30-min call'),
  callNote:  t('Gratuit · 30 min · sans engagement', 'Free · 30 min · no commitment'),
  results:   t('Voir les résultats', 'See the results'),
  allOffers: t('Voir toutes les offres', 'See all offers'),
  seePage:   t('Voir la page', 'See the page'),
  allCases:  t('Tous les cas clients', 'All case studies'),
}

/* ------------------------------------------------------- la feuille */
/* Le premier écran. Trois passes d'encre : le papier traverse, le bleu porte
   le système, le vert porte l'acquis. Les césures sont écrites à la main.
   ⚠️ Le titre est passé de --fs-3xl à --fs-2xl en v10 : la phrase de
   positionnement fait une centaine de signes là où « De l'idée / au système /
   en production. » en faisait trente. La règle est réécrite dans DESIGN.md,
   pas contournée en silence. */

export const hero = {
  /* `depth` : de combien de pixels la ligne descend quand la feuille a
     entièrement quitté l'écran. Le papier reste à zéro — c'est le fond, et
     les encres se décollent de lui. */
  lines: [
    { ink: 'paper'  as const, depth: 0,  fr: 'Des systèmes IA qui font gagner', en: 'AI systems that win back' },
    { ink: 'paper'  as const, depth: 0,  fr: 'du temps et du chiffre d’affaires,', en: 'time and revenue,' },
    { ink: 'signal' as const, depth: 26, fr: 'livrés en production en 3 semaines,', en: 'shipped to production in 3 weeks,' },
  ],
  /* La dernière proposition porte la troisième encre, celle qui se décolle le
     plus : c'est la dernière passée, celle qui est au-dessus des autres.
     Le vert est l'encre de l'acquis — un prix qui ne bouge pas en est un. */
  lastWord: { ink: 'state' as const, depth: 58, ...t('à prix fixe.', 'at a fixed price.') },
  body: t('Agents commerciaux, automatisations, assistants documentaires. Périmètre écrit, démo chaque semaine, et le code vous appartient.',
          'Sales agents, automations, document assistants. Written scope, a demo every week, and the code is yours.'),
  /* Le bloc d'affiche. Rendu par PriceBlock, qui sert aussi à la carte Sprint.
     ⚠️ Aucun créneau n'est écrit ici : les disponibilités réelles viennent de
     Cal.com, et en inventer serait affirmer une disponibilité qu'on n'a pas. */
  booking: {
    heading: t('Réserver un appel', 'Book a call'),
    note:    t('Trente minutes, gratuit, sans engagement.', 'Thirty minutes, free, no commitment.'),
    rows: [
      { k: t('Durée', 'Length'),   v: t('30 min', '30 min') },
      { k: t('Prix', 'Price'),     v: t('Gratuit', 'Free') },
      { k: t('Avec', 'With'),      v: t('L’ingénieur, pas un commercial', 'The engineer, not a salesperson') },
      { k: t('Repartir avec', 'You leave with'), v: t('Un prix et un délai', 'A price and a timeline') },
    ],
    action: t('Réserver un appel de 30 min', 'Book a 30-min call'),
  },
  /* Le colophon se signe au PIED de la feuille, jamais au-dessus du titre :
     DESIGN.md interdit l'étiquette en surplomb d'un titre. C'est là que
     descend le sur-titre du document — la substance est tenue, la position
     change. */
  colophon: [
    t('Studio d’ingénierie IA · Europe & Afrique francophone',
      'AI engineering studio · Europe & French-speaking Africa'),
    t('Construit en Afrique de l’Ouest.', 'Built in West Africa.'),
  ],
}

/* ------------------------------------------------------- la barre d'encres */
/* Conservée pour `InkBar`, au repos depuis le 2026-10-20 : la règle 80/15/5/5
   est une consigne de charte interne, elle n'apprend rien à un prospect. Le
   composant et sa donnée restent dans le dépôt pour une page interne. */

export const inks = [
  { key: 'ink'    as const, weight: 80, label: t('Noir', 'Black'),  role: t('le sol et le texte', 'ground and text') },
  { key: 'signal' as const, weight: 15, label: t('Bleu', 'Blue'),   role: t('le système', 'the system') },
  { key: 'accent' as const, weight: 5,  label: t('Violet', 'Purple'), role: t('le changement d’état', 'state change') },
  { key: 'state'  as const, weight: 5,  label: t('Vert', 'Green'),  role: t('l’acquis', 'what is secured') },
]

/* Conservé pour `ScrollStory`, au repos depuis la v7. Ses 135 images sont
   générées dans l'ancienne palette claire : le rétablir demande de les
   regénérer. */
export const story = [
  { at: 0,    title: t('Le brief', 'The brief'),       body: t('Un problème, pas un cahier des charges.', 'A problem, not a spec sheet.') },
  { at: 0.25, title: t('L’architecture', 'The architecture'), body: t('Ce qui doit tenir, et ce qui doit céder.', 'What must hold, and what may give.') },
  { at: 0.5,  title: t('Le build', 'The build'),       body: t('Une démo par semaine, pas une promesse.', 'A demo a week, not a promise.') },
  { at: 0.75, title: t('La mise en production', 'Going live'), body: t('Le jour où ça sert à quelqu’un.', 'The day it serves someone.') },
  { at: 1,    title: t('Le transfert', 'The handover'), body: t('Le code est à vous, les accès aussi.', 'The code is yours, so are the keys.') },
]

/* ===========================================================================
   PASSE 2 — LE BANDEAU DE PREUVES
   ---------------------------------------------------------------------------
   Ce sont des chiffres d'ACTIVITÉ, et c'est nouveau : la bande ne portait
   jusqu'ici que des engagements. Ils sont donc tous traçables jusqu'à la
   liste `work` plus bas, et la note les date — un chiffre d'activité sans
   date est une affirmation, pas une preuve.

   ⚠️ Ils ne sont PAS écrits à la main : `app/composables/useCounts.ts` les
   calcule depuis `work`. Les valeurs ci-dessous sont les libellés, pas les
   quantités. Un huitième client met la bande à jour tout seul.

   « En production » a une définition, sans quoi « 4 systèmes » sur « 6 projets
   livrés » se contredit à l'œil : un système en production est un système
   qu'un client utilise tous les jours. Un audit et un accompagnement sont des
   livrables, pas des systèmes.                                            */

export const proof = {
  note: t('Comptés sur les projets nommés en cas clients, au 21 octobre 2026. « En production » : un système qu’un client utilise tous les jours — un audit et un accompagnement sont des livrables, pas des systèmes.',
          'Counted from the projects named under case studies, as of 21 October 2026. “In production”: a system a client uses every day — an audit and an advisory engagement are deliverables, not systems.'),
  items: [
    { key: 'systems',   suffix: '',   label: t('systèmes en production', 'systems in production') },
    { key: 'shipped',   suffix: '',   label: t('projets livrés', 'projects delivered') },
    { key: 'countries', suffix: '',   label: t('pays', 'countries') },
    { key: 'ownership', suffix: ' %', label: t('du code transféré à la livraison', 'of the code transferred on delivery') },
  ],
}

/* ===========================================================================
   PASSE 3 — LES RÉSULTATS
   ---------------------------------------------------------------------------
   ⚠️ LIRE AVANT DE TOUCHER. Il n'y a PAS de champ `figure` optionnel ici, et
   c'est délibéré : un champ nullable EST un gabarit vide. Il invite le
   composant à rendre une case quand il vaut `null`, et c'est exactement la
   faute que la grille des réalisations a payée le 2026-10-20 — trois cases
   sur quatre affichaient une plaque, et une case vide à cet endroit se lit
   comme une preuve manquante.

   `outcome` est le GRAND CARACTÈRE. Il est dimensionné pour ce qu'il
   accueillera — un nombre court, « −40 % », « ×3 », « 4 h/semaine » — et il
   porte aujourd'hui le groupe nominal le plus court du fait vérifiable.

   LE JOUR OÙ UN CHIFFRE EXISTE, rien ne change dans le composant :
   `outcome` devient le chiffre, et le groupe nominal descend en tête de
   `detail`. La donnée bouge, la forme ne bouge pas.

   Interdits : « [X] », « à venir », « bientôt », une case grise, un « % »
   posé d'avance, une barre de progression à zéro.                         */

export const resultsIntro = {
  heading: t('Ce que nos systèmes\nchangent, concrètement.', 'What our systems\nactually change.'),
  note:    t('Les systèmes sont en production. Les gains chiffrés seront publiés quand les clients les auront mesurés, avec leur période de mesure — pas avant.',
             'The systems are in production. Measured gains will be published once clients have measured them, with the measurement window — not before.'),
}

export const results = [
  {
    client: 'MIA Corporate',
    outcome: t('La qualification des demandes', 'Qualifying inbound requests'),
    detail:  t('et la prise de rendez-vous ont quitté l’équipe. Agent sur base documentaire, réservation en trois étapes, relances automatiques.',
               'and booking appointments left the team. Document-grounded agent, three-step booking, automatic follow-ups.'),
  },
  {
    client: 'Transko',
    outcome: t('L’affectation des coursiers', 'Assigning couriers'),
    detail:  t('et l’optimisation des tournées se font sans intervention. Le tableau de bord expéditeur se met à jour en temps réel.',
               'and optimising routes now run unattended. The shipper dashboard updates in real time.'),
  },
  {
    client: 'Aurora Pâtisserie',
    outcome: t('Les commandes WhatsApp', 'WhatsApp orders'),
    detail:  t('arrivent sans ressaisie. Catalogue refondu, moteur de recommandations, commandes automatisées de bout en bout.',
               'arrive without re-keying. Rebuilt catalogue, recommendation engine, orders automated end to end.'),
  },
]

/* ===========================================================================
   PASSE 4 — QUATRE PROBLÈMES, QUATRE SYSTÈMES
   ---------------------------------------------------------------------------
   Rendue par la pile de cartes qui collent : quatre objections traitées une
   par une, chacune recouvrant la précédente. C'est le seul endroit du site
   où empiler veut dire quelque chose.

   `problem` est une citation à la première personne — c'est la voix du
   client. `system` est un nom de produit : il ne se traduit qu'à peine, et
   jamais en jargon.                                                        */

export const systemsIntro = {
  heading: t('Quatre problèmes,\nquatre systèmes.', 'Four problems,\nfour systems.'),
  lede:    t('Un Sprint construit un seul de ces systèmes, en entier. C’est ce qui permet de tenir trois semaines et un prix fixe.',
             'A Sprint builds exactly one of these systems, in full. That is what makes three weeks and a fixed price possible.'),
}

export const systems = [
  {
    slug: 'agent-whatsapp',
    problem: t('« On perd des clients faute de réponse rapide. »', '“We lose customers because nobody answers fast enough.”'),
    system:  t('Agent commercial WhatsApp', 'WhatsApp sales agent'),
    body:    t('Il répond, qualifie, prend les commandes ou les rendez-vous, 24 h/24. Branché à votre catalogue et à votre agenda, il passe la main à un humain dès qu’il faut.',
               'It answers, qualifies, takes orders or books appointments, around the clock. Wired to your catalogue and your calendar, it hands over to a human the moment it should.'),
  },
  {
    slug: 'automatisation',
    problem: t('« Mes équipes perdent des heures sur des tâches répétitives. »', '“My team loses hours on repetitive work.”'),
    system:  t('Automatisation d’un processus', 'Process automation'),
    body:    t('Devis, relances, saisie, reporting. La tâche quitte vos équipes et devient un flux surveillé, qui vous prévient quand il s’arrête.',
               'Quotes, follow-ups, data entry, reporting. The task leaves your team and becomes a monitored flow that tells you when it stops.'),
  },
  {
    slug: 'assistant-documentaire',
    problem: t('« Personne ne retrouve la bonne information. »', '“Nobody can find the right information.”'),
    system:  t('Assistant documentaire', 'Document assistant'),
    body:    t('Vos équipes interrogent vos documents en langage courant et obtiennent des réponses sourcées — avec le passage exact d’où vient la réponse.',
               'Your team queries your documents in plain language and gets sourced answers — with the exact passage the answer came from.'),
  },
  {
    slug: 'tableau-de-pilotage',
    problem: t('« Je pilote sans visibilité sur mes chiffres. »', '“I am steering without visibility on my numbers.”'),
    system:  t('Tableau de pilotage', 'Operations dashboard'),
    body:    t('Vos données rassemblées en un seul endroit, avec des alertes automatiques quand un seuil est franchi. Vous ne cherchez plus le chiffre, il vient à vous.',
               'Your data gathered in one place, with automatic alerts when a threshold is crossed. You stop hunting for the number; it comes to you.'),
  },
]

/* ===========================================================================
   PASSE 5 — L'OFFRE, ET L'ÉCHELLE COMPLÈTE
   ---------------------------------------------------------------------------
   Les prix S'AFFICHENT depuis le 2026-10-21. C'est un renversement de la
   décision du 2026-10-18 (« le prix se discute en appel »), acté et daté dans
   PRODUCT.md § Capabilities. Sur une offre packagée, le prix visible filtre
   les prospects sans budget et raccourcit la vente.

   ⚠️ AUCUNE GARANTIE DE RETARD N'EST ÉCRITE ICI. Le document en proposait une
   (« la semaine suivante est offerte ») ; l'utilisateur a tranché le
   2026-10-21 : non. Le prix fixe et le périmètre écrit sont les engagements,
   et ils suffisent. Ne pas en ajouter une sans décision explicite — c'est un
   engagement contractuel, pas une formule de page.                         */

export const offerIntro = {
  heading: t('Un Sprint,\nun système, un prix.', 'One Sprint,\none system, one price.'),
}

export const sprint = {
  name:  t('Sprint IA', 'AI Sprint'),
  price: t('3 000 €', '€3,000'),
  terms: t('prix fixe · 3 semaines', 'fixed price · 3 weeks'),
  for:   t('Un problème précis, un système en production au bout.',
           'One precise problem, one system in production at the end.'),
  rows: [
    { k: t('Prix', 'Price'),    v: t('3 000 €, fixe', '€3,000, fixed') },
    { k: t('Durée', 'Duration'), v: t('3 semaines', '3 weeks') },
    { k: t('Périmètre', 'Scope'), v: t('Un système, écrit avant de commencer', 'One system, written down before we start') },
    { k: t('Après', 'After'),    v: t('30 jours de support inclus', '30 days of support included') },
  ],
  deliverables: [
    t('Un système IA en production, pas une maquette.', 'An AI system in production, not a mockup.'),
    t('La documentation pour le faire tourner sans nous.', 'The documentation to run it without us.'),
    t('Le transfert du code et des accès.', 'Transfer of the code and the credentials.'),
    t('30 jours de support après la mise en ligne.', '30 days of support after launch.'),
  ],
  action: t('Réserver un appel de 30 min', 'Book a 30-min call'),
}

/* Les deux satellites de la home : du texte sur le sol, pas des sous-cartes.
   Il n'y a qu'un seul niveau de surélévation. */
export const satellites = [
  { name: t('Diagnostic IA', 'AI Diagnostic'), price: t('750 €', '€750'),
    body: t('Une semaine pour trouver le bon cas d’usage. Déduits du Sprint si vous le lancez.',
            'One week to find the right use case. Deducted from the Sprint if you start one.') },
  { name: t('Suivi & optimisation', 'Monitoring & optimisation'), price: t('390 € / mois', '€390 / month'),
    body: t('Surveillance, corrections, améliorations. Sans engagement de durée.',
            'Monitoring, fixes, improvements. No minimum term.') },
]

/* L'échelle complète, page /offres. Rendue par la pile de cartes : cinq
   niveaux sont une gradation, et une pile qui colle est faite pour ça. */
/* ⚠️ Ce titre NE PEUT PAS être celui de `offresPage` : les deux se suivent
   sur /offres — le grand titre de la page, puis l'en-tête de la pile — et la
   même phrase deux fois d'affilée n'est pas une hiérarchie, c'est un bégaiement
   (constaté sur la capture du 2026-10-21). La page annonce le nombre, la
   section annonce la gradation. */
export const offersIntro = {
  heading: t('Du premier appel\nau déploiement.', 'From the first call\nto rollout.'),
  lede:    t('Chaque niveau se suffit à lui-même. La plupart des clients commencent par un Sprint ; ceux qui hésitent sur le cas d’usage commencent par un Diagnostic.',
             'Each level stands on its own. Most clients start with a Sprint; those unsure which use case to pick start with a Diagnostic.'),
}

/* LE MONTANT LISIBLE PAR UNE MACHINE, à côté du montant lisible par un
   humain. `price` est une chaîne rédigée (« À partir de 9 000 € », « 390 € /
   mois ») : elle dit la nuance, elle ne se calcule pas. `amount` dit la même
   chose à schema.org, et `kind` porte précisément la nuance que le texte
   portait — un prix exact, un plancher, un abonnement. Sans lui, la fiche
   JSON-LD annonçait une devise sans montant, ce qui ne dit rien du tout.
   Les deux champs se contrôlent l'un l'autre : `.v10.mjs` vérifie que les
   chiffres de `price.fr` sont bien ceux de `amount.eur`. */
export type AmountKind = 'exact' | 'from' | 'monthly'

export const offers = [
  {
    name:   t('Appel découverte', 'Discovery call'),
    price:  t('Gratuit', 'Free'),
    amount: { eur: 0, kind: 'exact' as AmountKind },
    length: t('30 min', '30 min'),
    who:    t('Tout prospect', 'Anyone considering us'),
    body:   t('Une réponse claire : l’IA peut-elle régler votre problème, et à quel prix. Si la réponse est non, on vous le dit, et on vous dit vers qui aller.',
              'A clear answer: can AI solve your problem, and at what price. If the answer is no, we say so, and we say who to talk to instead.'),
  },
  {
    name:   t('Diagnostic IA', 'AI Diagnostic'),
    price:  t('750 €', '€750'),
    amount: { eur: 750, kind: 'exact' as AmountKind },
    length: t('1 semaine', '1 week'),
    who:    t('Qui hésite sur le bon cas d’usage', 'Anyone unsure which use case to pick'),
    body:   t('Cartographie de vos tâches, trois cas d’usage chiffrés en gain de temps et en euros, et une recommandation écrite. Les 750 € sont déduits si vous lancez un Sprint.',
              'A map of your tasks, three use cases costed in time and euros, and a written recommendation. The €750 is deducted if you start a Sprint.'),
  },
  {
    name:   t('Sprint IA', 'AI Sprint'),
    price:  t('3 000 €', '€3,000'),
    amount: { eur: 3000, kind: 'exact' as AmountKind },
    length: t('3 semaines', '3 weeks'),
    who:    t('Qui a un problème précis', 'Anyone with one precise problem'),
    body:   t('Un système IA en production, choisi parmi les quatre. Documentation, transfert du code, 30 jours de support. Prix fixe, périmètre écrit avant de commencer.',
              'One AI system in production, chosen from the four. Documentation, code transfer, 30 days of support. Fixed price, scope written before we start.'),
    featured: true,
  },
  {
    name:   t('Déploiement', 'Rollout'),
    price:  t('À partir de 9 000 €', 'From €9,000'),
    amount: { eur: 9000, kind: 'from' as AmountKind },
    length: t('4 à 8 semaines', '4 to 8 weeks'),
    who:    t('Qui étend après un premier Sprint', 'Anyone extending after a first Sprint'),
    body:   t('Plusieurs processus automatisés, intégration à votre CRM ou votre ERP, formation de vos équipes. Le périmètre est écrit à partir de ce que le premier Sprint a appris.',
              'Several processes automated, integration with your CRM or ERP, training for your teams. The scope is written from what the first Sprint taught us.'),
  },
  {
    name:   t('Suivi & optimisation', 'Monitoring & optimisation'),
    price:  t('390 € / mois', '€390 / month'),
    amount: { eur: 390, kind: 'monthly' as AmountKind },
    length: t('Sans engagement', 'No minimum term'),
    who:    t('Tout client livré', 'Any client already live'),
    body:   t('Surveillance, corrections, améliorations mensuelles, et un rapport de résultats. Personne ne reste client parce qu’il ne peut pas partir.',
              'Monitoring, fixes, monthly improvements, and a results report. Nobody stays a client because leaving is impossible.'),
  },
]

/* ===========================================================================
   LES TROIS PREUVES
   ---------------------------------------------------------------------------
   Le document les appelle « les trois preuves qu'on répète partout ». Elles
   sont rendues par la même forme que les résultats — trois colonnes de texte
   sur le sol nu, sans carte ni filet.                                      */

export const proofsIntro = {
  heading: t('Trois engagements,\nles mêmes pour tout le monde.', 'Three commitments,\nthe same for everyone.'),
}

export const proofs = [
  {
    title: t('Un résultat, pas une livraison', 'An outcome, not a delivery'),
    body:  t('Chaque projet dit ce qu’il a changé : du temps, des ventes, des coûts. Un système livré que personne n’utilise n’est pas un projet réussi, et nous ne le comptons pas comme tel.',
             'Every project states what it changed: time, sales, costs. A delivered system nobody uses is not a successful project, and we do not count it as one.'),
  },
  {
    title: t('Un engagement écrit', 'A written commitment'),
    body:  t('Périmètre écrit avant de commencer, prix fixe, et une démo chaque semaine. Vous voyez le système fonctionner avant la fin, pas à la fin.',
             'Scope written before we start, a fixed price, and a demo every week. You see the system work before the end, not at the end.'),
  },
  {
    title: t('Une propriété totale', 'Full ownership'),
    body:  t('Code, documentation et accès vous sont transférés à la livraison. N’importe quel développeur peut reprendre le système après nous — c’est la condition pour que vous soyez libres.',
             'Code, documentation and credentials are transferred to you on delivery. Any developer can take the system over after us — that is the condition of you being free.'),
  },
]

/* ===========================================================================
   PASSE 6 — LA MÉTHODE
   ---------------------------------------------------------------------------
   Nommée `processSteps`, et non `process` : le bundle de production inline les
   exports de ce fichier au niveau module, où Nitro a déjà injecté
   `import process from 'node:process'`. La collision passe le build et fait
   tomber le serveur à chaque requête. Voir tasks/lessons.md (2026-10-02).

   Le numéro est du CONTENU, pas de la décoration : une semaine dit un ordre
   réel. DESIGN.md interdit le numéro décoratif, pas celui-là.              */

export const processIntro = {
  heading: t('Vous voyez un système qui fonctionne\navant d’aller plus loin.',
             'You see a system that works\nbefore going any further.'),
}

export const processSteps = [
  { num: 'S0', title: t('L’appel, puis la proposition', 'The call, then the proposal'),
    body: t('30 minutes pour comprendre le problème. Vous recevez ensuite une proposition écrite à prix fixe, avec le périmètre exact de ce qui sera construit.',
            '30 minutes to understand the problem. You then receive a written fixed-price proposal, with the exact scope of what will be built.'),
    meta: t('Proposition sous 72 h', 'Proposal within 72 h') },
  { num: 'S1', title: t('Conception et première démo', 'Design and first demo'),
    body: t('L’architecture est posée et vous voyez le système tourner pour la première fois, sur un cas réduit. C’est là qu’on corrige la direction, pas à la fin.',
            'The architecture is laid down and you see the system run for the first time, on a reduced case. That is where direction gets corrected, not at the end.'),
    meta: t('Démo en fin de semaine', 'Demo at the end of the week') },
  { num: 'S2', title: t('Construction et tests réels', 'Build and real tests'),
    body: t('Le système est construit et testé sur vos vraies données, pas sur un jeu d’exemple. Les cas qui cassent se trouvent cette semaine-là.',
            'The system is built and tested on your real data, not on a sample set. The cases that break are found that week.'),
    meta: t('Vos données, pas un exemple', 'Your data, not a sample') },
  { num: 'S3', title: t('Mise en production et transfert', 'Launch and handover'),
    body: t('Mise en ligne, formation de vos équipes, transfert du code, de la documentation et des accès. 30 jours de support commencent ce jour-là.',
            'Go-live, training for your teams, transfer of the code, the documentation and the credentials. 30 days of support start that day.'),
    meta: t('Propriété totale', 'Full ownership') },
]

/* ===========================================================================
   PASSE 7 — CE QUI TOURNE
   ---------------------------------------------------------------------------
   À la place d'une section « témoignages » qui ne peut pas exister : aucune
   citation client écrite n'a été fournie (PRODUCT.md § Evidence on Hand).
   Décision de l'utilisateur du 2026-10-21 : remplacer par une preuve d'une
   autre nature. Ici, la seule qui existe — le seul système client
   publiquement atteignable, montré et cliquable.

   Le chapô dit pourquoi il n'y en a qu'un. Sans lui, une seule vignette se
   lit comme un manque ; avec lui, c'est une structure annoncée. Même
   manœuvre que « quatre d'entre elles ont une page dédiée » le 2026-10-20.

   Extensible sans écrire une ligne : le composant lit `work.filter(w => w.shot)`.
   Un deuxième système en ligne cesse automatiquement d'être `:only-child`,
   et la grille retombe dans son zigzag à deux vignettes.                   */

export const inUseIntro = {
  heading: t('Ce qui tourne,\net que vous pouvez ouvrir.', 'What runs,\nand what you can open.'),
  lede:    t('Un seul des systèmes livrés est public ; les autres tournent derrière un compte client. Celui-ci s’ouvre dans un nouvel onglet, et il répond.',
             'Only one of the delivered systems is public; the others run behind a client account. This one opens in a new tab, and it answers.'),
}

/* ===========================================================================
   LES CAS CLIENTS
   ---------------------------------------------------------------------------
   `kind` sépare ce qui est un SYSTÈME de ce qui n'en est pas : un audit de
   pile et un accompagnement sont des livrables, pas des systèmes. C'est ce
   champ qui empêche le bandeau de preuves de mentir — « 7 systèmes livrés »
   était faux deux fois avant lui (trois des sept n'étaient pas des systèmes,
   et un n'était pas livré).

   `shot` décide de la mise en avant : la grille ne montre que ce qui est
   prouvé par une capture. Il n'y a pas de drapeau `featured` à tenir à jour.
   `href` décide du lien sortant ; `null` quand le client n'est pas en ligne.

   LE GABARIT DE LA PAGE DE CAS (document § 5) : `result`, `before`, `built`,
   `after`, `quote`. Un cas n'obtient sa page que s'il a de quoi la remplir —
   aujourd'hui MIA seul. Un bloc dont la matière manque NE PARAÎT PAS : pas de
   « — », pas de section vide, pas de « à venir ».                          */

export type WorkStatus = 'live' | 'wip'
export type WorkKind = 'system' | 'audit' | 'advisory'
export type WorkInk = 'ink' | 'signal' | 'accent' | 'state'

/* Le type est ÉCRIT, et non déduit du tableau : seul MIA porte `result` et
   `built` aujourd'hui, et une inférence en ferait une union que ni
   `SectionWork` ni la page de cas ne peuvent interroger. Les deux champs du
   gabarit sont donc optionnels ici — ce sont les SEULS du fichier, et ils le
   sont pour dire « ce cas n'a pas encore sa page », jamais pour laisser un
   composant rendre une case vide. */
export type WorkItem = {
  slug: string
  name: string
  kind: WorkKind
  status: WorkStatus
  shot: string | null
  href: string | null
  ink: WorkInk
  category: T
  sector: T
  place: T
  summary: T
  result?: T
  built?: T[]
}

export const work: WorkItem[] = [
  {
    slug: 'mia-corporate',
    name: 'MIA Corporate',
    kind: 'system' as WorkKind,
    status: 'live' as WorkStatus,
    shot: '/work/mia-corporate.webp',
    href: 'https://miacorporate.netlify.app',
    ink: 'signal' as WorkInk,
    category: t('Full AI MVP', 'Full AI MVP'),
    sector:   t('Beauté & bien-être', 'Beauty & wellness'),
    place:    t('Cotonou, Bénin', 'Cotonou, Benin'),
    summary:  t('Agent de qualification sur base documentaire, réservation en trois étapes, relances automatiques. RAG, agents, Cal.com, EmailJS.',
                'Document-grounded qualification agent, three-step booking, automatic follow-ups. RAG, agents, Cal.com, EmailJS.'),
    /* Le titre de la page de cas. Le document veut que ce soit le résultat
       chiffré ; aucun n'existe, donc c'est le fait vérifiable, dans la même
       position. Le chiffre le remplacera au même endroit. */
    result: t('La qualification des demandes et la prise de rendez-vous ont quitté l’équipe.',
              'Qualifying requests and booking appointments left the team.'),
    built: [
      t('Un agent qui répond sur la base des documents du salon, et qui cite le passage d’où vient sa réponse.',
        'An agent that answers from the salon’s own documents, and cites the passage its answer came from.'),
      t('Une réservation en trois étapes, branchée sur l’agenda réel.',
        'A three-step booking flow, wired to the real calendar.'),
      t('Des relances automatiques après une demande restée sans suite.',
        'Automatic follow-ups after a request goes quiet.'),
    ],
  },
  {
    slug: 'aurora-patisserie',
    name: 'Aurora Pâtisserie',
    kind: 'system' as WorkKind,
    status: 'live' as WorkStatus,
    shot: null,
    href: null,
    ink: 'accent' as WorkInk,
    category: t('Production Sprint', 'Production Sprint'),
    sector:   t('Restauration & pâtisserie', 'Food & pastry'),
    place:    t('Lomé, Togo', 'Lomé, Togo'),
    summary:  t('Refonte du catalogue, moteur de recommandations, commandes WhatsApp automatisées.',
                'Catalogue rebuild, recommendation engine, automated WhatsApp ordering.'),
  },
  {
    slug: 'transko',
    name: 'Transko',
    kind: 'system' as WorkKind,
    status: 'live' as WorkStatus,
    shot: null,
    href: null,
    ink: 'signal' as WorkInk,
    category: t('Full AI MVP', 'Full AI MVP'),
    sector:   t('Logistique & transport', 'Logistics & transport'),
    place:    t('Cotonou, Bénin', 'Cotonou, Benin'),
    summary:  t('Agent d’affectation des coursiers, optimisation de tournées, tableau de bord expéditeur en temps réel.',
                'Courier assignment agent, route optimisation, real-time shipper dashboard.'),
  },
  {
    slug: 'bella-hair-studio',
    name: 'Bella Hair Studio',
    kind: 'system' as WorkKind,
    status: 'live' as WorkStatus,
    shot: null,
    href: null,
    ink: 'state' as WorkInk,
    category: t('Production Sprint', 'Production Sprint'),
    sector:   t('Beauté & mode', 'Beauty & fashion'),
    place:    t('Abidjan, Côte d’Ivoire', 'Abidjan, Ivory Coast'),
    summary:  t('Assistant conversationnel WhatsApp branché au catalogue, automatisation du service client.',
                'WhatsApp conversational assistant wired to the catalogue, customer service automation.'),
  },
  {
    slug: 'immo-elite',
    name: 'Immo Elite',
    kind: 'audit' as WorkKind,
    status: 'live' as WorkStatus,
    shot: null,
    href: null,
    ink: 'ink' as WorkInk,
    category: t('Stack Audit', 'Stack Audit'),
    sector:   t('Immobilier', 'Real estate'),
    place:    t('Cotonou, Bénin', 'Cotonou, Benin'),
    summary:  t('Revue d’infrastructure, plan de migration vers une recherche sémantique, feuille de route chiffrée.',
                'Infrastructure review, migration plan towards semantic search, costed roadmap.'),
  },
  {
    slug: 'green-harvest',
    name: 'Green Harvest',
    kind: 'advisory' as WorkKind,
    status: 'live' as WorkStatus,
    shot: null,
    href: null,
    ink: 'state' as WorkInk,
    category: t('Fractional AI CTO', 'Fractional AI CTO'),
    sector:   t('Agro-alimentaire', 'Agri-food'),
    place:    t('Abidjan, Côte d’Ivoire', 'Abidjan, Ivory Coast'),
    summary:  t('Architecture cible des données, priorisation de la feuille de route IA, gouvernance, montée en compétence de l’équipe.',
                'Target data architecture, AI roadmap prioritisation, governance, team upskilling.'),
  },
  {
    slug: 'adjani-prive',
    name: 'Adjani Privé',
    kind: 'system' as WorkKind,
    status: 'wip' as WorkStatus,
    shot: null,
    href: null,
    ink: 'accent' as WorkInk,
    category: t('Sites & expériences', 'Sites & experiences'),
    sector:   t('Mode, héritage yoruba', 'Fashion, Yoruba heritage'),
    place:    t('Cotonou, Bénin', 'Cotonou, Benin'),
    summary:  t('E-commerce de marque, direction artistique comprise. Pas encore en ligne — la fiche existe, le lien viendra.',
                'Brand e-commerce, art direction included. Not live yet — the entry exists, the link will follow.'),
  },
]

/* Un cas a sa page quand il a de quoi la remplir, et c'est la MATIÈRE qui
   décide — pas un drapeau tenu à la main. Même règle que la grille, qui ne
   montre que ce qui a une capture : le jour où un client autorise le détail
   de son projet, sa ligne devient un lien, son adresse entre au sitemap et
   sa page existe, sans qu'on touche à autre chose que son contenu. */
export const hasCase = (w: WorkItem): boolean => Boolean(w.result && w.built?.length)

/** Les cas qui ont une page. Lu par le sitemap et par la route /cas/[slug]. */
export const casePages = () => work.filter(hasCase)

export const workStatus = {
  live: t('Livré', 'Shipped'),
  wip:  t('En cours', 'In progress'),
}

/* ===========================================================================
   PASSE 8 — LA FAQ
   ---------------------------------------------------------------------------
   Les six questions du document § 6.3, avec leurs réponses, prix compris.  */

export const faqIntro = {
  heading: t('Ce qu’on nous\ndemande le plus.', 'What we get\nasked most.'),
}

export const faq = [
  { q: t('Combien coûte un projet ?', 'What does a project cost?'),
    a: t('Le Sprint IA coûte 3 000 €, prix fixe. Le Diagnostic coûte 750 €, déduits si vous lancez un Sprint ensuite. Un déploiement plus large démarre à 9 000 €.',
         'The AI Sprint costs €3,000, fixed. The Diagnostic costs €750, deducted if you start a Sprint afterwards. A wider rollout starts at €9,000.') },
  { q: t('En combien de temps est-ce en production ?', 'How long until it is in production?'),
    a: t('Trois semaines pour un Sprint, à partir de la validation du périmètre. La proposition écrite, elle, arrive sous 72 h après l’appel.',
         'Three weeks for a Sprint, from the moment the scope is agreed. The written proposal itself arrives within 72 hours of the call.') },
  { q: t('Faut-il une équipe technique chez nous ?', 'Do we need a technical team?'),
    a: t('Non. Nous gérons la construction et la mise en production, et nous formons vos équipes à l’utilisation. Vous n’avez besoin de personne en interne pour que le système tourne.',
         'No. We handle the build and the launch, and we train your teams to use it. You need nobody in-house for the system to run.') },
  { q: t('À qui appartient le système ?', 'Who owns the system?'),
    a: t('À vous : le code, la documentation et les accès vous sont transférés à la livraison. Pas de licence cachée, pas de verrou.',
         'You do: the code, the documentation and the credentials are transferred to you on delivery. No hidden licence, no lock-in.') },
  { q: t('Et si vous n’êtes plus disponibles ?', 'What if you are no longer available?'),
    a: t('Tout est documenté pour ça. N’importe quel développeur peut reprendre le système — c’est une condition de la livraison, pas une promesse.',
         'Everything is documented for that. Any developer can take the system over — it is a delivery condition, not a promise.') },
  { q: t('Mes données sont-elles protégées ?', 'Is my data protected?'),
    a: t('Vous restez propriétaire de vos données, les accès d’Icon Labs sont retirés après le transfert, et nos agents annoncent à vos utilisateurs qu’ils parlent à une IA. Le détail est sur la page Sécurité.',
         'You remain the owner of your data, Icon Labs’ access is revoked after the handover, and our agents tell your users they are talking to an AI. The detail is on the Security page.') },
]

/* ===========================================================================
   PASSE 9 — L'APPEL FINAL, ET LA PAGE CONTACT
   ---------------------------------------------------------------------------
   ⚠️ `cal.enabled` est à `false` et RIEN n'est rendu à cet emplacement tant
   qu'il l'est. Pas de case grise, pas de faux créneau, pas de « agenda
   bientôt disponible ». Le jour où Cal.com est branché : poser l'URL et
   passer le drapeau à `true`.

   Les deux fuseaux ne coïncident pas toute l'année — Cotonou est à UTC+1 en
   permanence, Paris passe à UTC+2 d'avril à octobre. L'heure n'est donc PAS
   écrite en dur : elle est calculée par le navigateur. Voir SectionContact.  */

export const contact = {
  heading: t('Quelle tâche vous coûte\nle plus aujourd’hui ?', 'Which task costs you\nthe most today?'),
  body:    t('Décrivez-la en deux lignes. En 30 minutes, on vous dit si l’IA peut la régler, en combien de temps, et pour quel prix.',
             'Describe it in two lines. In 30 minutes we tell you whether AI can solve it, how long it takes, and what it costs.'),
  cal: { enabled: false, url: null as string | null },
  zones: [
    { tz: 'Europe/Paris',      label: t('Paris', 'Paris') },
    { tz: 'Africa/Porto-Novo', label: t('Cotonou', 'Cotonou') },
  ],
  zonesLabel: t('Heure locale', 'Local time'),
  fields: {
    name:    t('Nom', 'Name'),
    email:   t('E-mail', 'Email'),
    project: t('La tâche, en deux lignes', 'The task, in two lines'),
    send:    t('Envoyer', 'Send'),
    sending: t('Envoi…', 'Sending…'),
  },
}

/* -------------------------------------------------------------------- équipe */
/* UN SEUL rôle affiché par personne, décision du document : six casquettes
   par personne donnent l'image d'une petite équipe dispersée.
   Pas de photo ni de LinkedIn tant qu'ils n'existent pas — le traitement est
   typographique, il n'y a pas d'avatar gris à combler. */

export const team = [
  { name: 'David Tonon',     role: t('Fondateur · Stratégie et ingénierie IA', 'Founder · AI strategy and engineering') },
  { name: 'Ernesto',         role: t('Ingénieur IA et backend', 'AI and backend engineer') },
  { name: 'Kenneth Kpanou',  role: t('Direction artistique et motion', 'Art direction and motion') },
  { name: 'Marc-Arthur',     role: t('UX, contenus et intégration', 'UX, content and integration') },
  { name: 'Emmanuel Attiba', role: t('Croissance et relation client', 'Growth and client relations') },
]

export const values = [
  t('Résilience', 'Resilience'),
  t('Innovation', 'Innovation'),
  t('Créativité', 'Creativity'),
  t('Satisfaction client', 'Client satisfaction'),
  t('Connaître ses limites', 'Knowing our limits'),
]

export const studioIntro = {
  heading: t('Cinq personnes.\nUn ingénieur par projet.', 'Five people.\nOne engineer per project.'),
  body: [
    t('Icon Labs est un studio d’ingénierie IA indépendant, basé en Afrique de l’Ouest et travaillant pour l’Europe et l’Afrique francophone. L’architecture, l’interface et le code de production sortent de la même équipe.',
      'Icon Labs is an independent AI engineering studio, based in West Africa and working for Europe and French-speaking Africa. Architecture, interface and production code all come from the same team.'),
    t('Pas de chef de projet entre vous et la personne qui construit. Chaque projet appartient à un ingénieur qui a déjà livré en production.',
      'No project manager between you and the person building. Every project is owned by an engineer who has already shipped to production.'),
  ],
}

export const footer = {
  rights: t('Tous droits réservés.', 'All rights reserved.'),
}

export const seo = {
  title: t('Icon Labs — Systèmes IA en production en 3 semaines',
           'Icon Labs — AI systems in production in 3 weeks'),
  description: t('Icon Labs livre des systèmes IA en production en 3 semaines, à prix fixe : agents commerciaux, automatisations, assistants documentaires. Sprint à 3 000 €, code transféré, six projets livrés à Cotonou, Lomé et Abidjan.',
                 'Icon Labs ships AI systems to production in 3 weeks, at a fixed price: sales agents, automations, document assistants. €3,000 Sprint, code transferred, six projects delivered in Cotonou, Lomé and Abidjan.'),
}

/* ===========================================================================
   PAGES INTERNES
   ---------------------------------------------------------------------------
   Un titre qui est une phrase, un chapô qui dit à qui ça s'adresse, et du
   contenu qui ne répète pas la home.
   ========================================================================= */

export const offresPage = {
  title: t('Cinq façons\nde travailler ensemble.', 'Five ways\nto work together.'),
  lede:  t('Les prix sont fixes et affichés. Sur une offre packagée, un prix visible vous fait gagner l’appel que vous auriez passé pour le demander.',
           'Prices are fixed and public. On a packaged offer, a visible price saves you the call you would have made to ask for it.'),
  systemsHeading: t('Les quatre systèmes du Sprint', 'The four Sprint systems'),
  systemsLede:    t('Un Sprint en construit un seul, en entier. C’est ce qui permet de tenir trois semaines et un prix fixe.',
                    'A Sprint builds exactly one, in full. That is what makes three weeks and a fixed price possible.'),
}

export const casPage = {
  title: t('Des clients réels,\nnommés avec leur accord.', 'Real clients,\nnamed with their consent.'),
  lede:  t('Sept clients, dans trois pays, dont six déjà livrés. Ce qui a été construit est écrit ici en entier : il n’y a pas de fiche à ouvrir pour le savoir.',
           'Seven clients, in three countries, six of them already delivered. What was built is written here in full: there is no case study to open to find out.'),
  /* Le gabarit d'une page de cas, et pourquoi toutes ne l'ont pas. */
  noteHeading: t('Pourquoi certains cas s’ouvrent et d’autres non', 'Why some cases open and others do not'),
  note: t('Une page de cas porte le résultat, le problème d’avant, ce qui a été construit et les chiffres après. Tant qu’un client n’a pas mesuré ses gains et autorisé leur publication, la page n’existe pas : la ligne dit déjà tout ce qui est vérifiable.',
          'A case page carries the outcome, the problem before, what was built and the numbers after. Until a client has measured their gains and allowed us to publish them, the page does not exist: the line already says everything that is verifiable.'),
}

export const casePage = {
  fiche:  t('La fiche', 'At a glance'),
  before: t('Avant', 'Before'),
  built:  t('Ce qu’on a construit', 'What we built'),
  after:  t('Après', 'After'),
  visit:  t('Ouvrir le système', 'Open the system'),
  back:   t('Tous les cas clients', 'All case studies'),
  rows: {
    client:  t('Client', 'Client'),
    sector:  t('Secteur', 'Sector'),
    place:   t('Pays', 'Country'),
    offer:   t('Offre', 'Offer'),
    status:  t('Statut', 'Status'),
  },
}

export const methodePage = {
  title: t('Vous voyez un système qui fonctionne\navant d’aller plus loin.',
           'You see a system that works\nbefore going any further.'),
  lede:  t('Trois semaines, quatre temps, et une démo à chaque fois. La méthode existe pour que vous puissiez arrêter à tout moment en sachant exactement où vous en êtes.',
           'Three weeks, four stages, and a demo at each one. The process exists so you can stop at any point knowing exactly where you stand.'),
  exchange: {
    heading: t('Ce que chacun apporte', 'What each side brings'),
    give: t('Vous recevez', 'You receive'),
    take: t('Nous attendons', 'We need'),
    rows: [
      { gives: t('Une proposition écrite, à prix fixe, avec le périmètre exact.', 'A written proposal, fixed price, with the exact scope.'),
        needs: t('30 minutes, et le problème décrit sans l’habiller.', '30 minutes, and the problem described without dressing it up.') },
      { gives: t('L’architecture, et le système qui tourne sur un cas réduit.', 'The architecture, and the system running on a reduced case.'),
        needs: t('Une personne qui connaît le métier, joignable dans la semaine.', 'One person who knows the business, reachable that week.') },
      { gives: t('Le système construit, testé sur vos données réelles.', 'The system built, tested on your real data.'),
        needs: t('L’accès aux données et aux outils à brancher.', 'Access to the data and the tools to connect.') },
      { gives: t('La mise en production, la formation, le code et les accès.', 'The launch, the training, the code and the credentials.'),
        needs: t('Les personnes qui s’en serviront, une heure, pour la prise en main.', 'The people who will use it, for an hour, to get started.') },
    ],
  },
  constants: {
    heading: t('Ce qui ne change jamais', 'What never changes'),
    items: [
      t('Le prix est fixe. Il est écrit avant de commencer, et il ne bouge pas.',
        'The price is fixed. It is written before we start, and it does not move.'),
      t('Le périmètre est écrit. Ce qui n’y est pas fera l’objet d’une autre proposition, pas d’une facture surprise.',
        'The scope is written. What is not in it becomes another proposal, not a surprise invoice.'),
      t('Une démo par semaine. Vous ne découvrez pas le système à la fin.',
        'A demo every week. You do not discover the system at the end.'),
      t('Vous parlez à l’ingénieur qui construit. Il n’y a personne à prévenir avant lui.',
        'You talk to the engineer who builds. There is nobody to go through first.'),
      t('Le code vous appartient à la livraison, sans condition.',
        'The code is yours on delivery, unconditionally.'),
    ],
  },
}

/* ===========================================================================
   SÉCURITÉ & CONFORMITÉ
   ---------------------------------------------------------------------------
   ⚠️ LIRE AVANT D'AJOUTER QUOI QUE CE SOIT ICI.

   Cette page ne porte QUE ce qui est structurellement vrai et que le studio
   applique réellement. Une promesse de conformité non tenue est un risque
   juridique, pas une formule de page.

   CE QUI N'EST PAS ÉCRIT ICI, ET POURQUOI : le dépôt ne contient aucune
   matière de conformité. Les cinq points suivants attendent une confirmation
   de l'utilisateur et NE DOIVENT PAS être ajoutés au jugé —
     1. l'hébergeur des systèmes clients et sa région (« UE par défaut » n'est
        PAS affirmé tant que ce n'est pas vérifié) ;
     2. les modèles utilisés, et ce que leurs conditions disent de
        l'entraînement sur les données clients ;
     3. si un contrat de sous-traitance (DPA) est réellement fourni ;
     4. si un registre des traitements existe ;
     5. comment une demande d'effacement est traitée, et sous quel délai.
   Voir tasks/todo.md § v10.                                                */

export const securitePage = {
  title: t('Ce que nous faisons\nde vos données.', 'What we do\nwith your data.'),
  lede:  t('Cette page ne dit que ce que nous appliquons. Ce qui n’y figure pas n’est pas un oubli : c’est un point que nous ne voulons pas affirmer avant de pouvoir le prouver.',
           'This page states only what we actually do. What is missing is not an oversight: it is a point we will not claim before we can prove it.'),
  items: [
    { title: t('Le système est à vous, les accès aussi', 'The system is yours, and so are the keys'),
      body:  t('Le code, la documentation et les accès vous sont transférés à la livraison. Vous n’avez pas besoin de notre accord pour déplacer, modifier ou arrêter votre système.',
               'The code, the documentation and the credentials are transferred to you on delivery. You do not need our approval to move, change or shut down your system.') },
    { title: t('Nos accès sont retirés après le transfert', 'Our access is revoked after handover'),
      body:  t('À la fin du transfert, les accès d’Icon Labs à vos environnements sont retirés. S’ils doivent être maintenus — par exemple dans le cadre d’un suivi mensuel — c’est écrit dans le contrat, et c’est vous qui les rouvrez.',
               'Once the handover is complete, Icon Labs’ access to your environments is revoked. If it must be kept — under a monthly retainer, for instance — it is written into the contract, and you are the one who reopens it.') },
    { title: t('Vos utilisateurs savent qu’ils parlent à une IA', 'Your users know they are talking to an AI'),
      body:  t('Les agents que nous construisons annoncent qu’ils sont une IA, et passent la main à un humain quand il le faut. C’est une obligation de transparence européenne, et c’est aussi ce qui évite qu’un client se sente trompé.',
               'The agents we build state that they are an AI, and hand over to a human when they should. It is a European transparency obligation, and it is also what keeps a customer from feeling deceived.') },
    { title: t('Vos données restent vos données', 'Your data stays your data'),
      body:  t('Nous n’exploitons pas vos données pour autre chose que votre système, et nous ne les revendons pas. Les données de vos clients ne quittent pas votre périmètre pour alimenter le nôtre.',
               'We do not use your data for anything other than your system, and we do not resell it. Your customers’ data does not leave your perimeter to feed ours.') },
  ],
  pending: {
    heading: t('Ce que cette page ne dit pas encore', 'What this page does not say yet'),
    body: t('Hébergement et région, modèles utilisés et leur politique d’entraînement, contrat de sous-traitance, registre des traitements, délai d’effacement : ces points dépendent de votre projet et nous les écrivons dans la proposition, pas sur une page publique. Demandez-les pendant l’appel — c’est une question légitime et nous y répondons par écrit.',
            'Hosting and region, models used and their training policy, data processing agreement, processing register, erasure timelines: these depend on your project and we write them into the proposal, not onto a public page. Ask for them on the call — it is a fair question and we answer it in writing.'),
  },
}

export const aProposPage = {
  title: t('Cinq personnes.\nUn ingénieur par projet.', 'Five people.\nOne engineer per project.'),
  lede:  t('Icon Labs est un studio d’ingénierie IA indépendant, basé en Afrique de l’Ouest. L’architecture, l’interface et le code de production sortent de la même équipe.',
           'Icon Labs is an independent AI engineering studio based in West Africa. Architecture, interface and production code all come from the same team.'),
  body: [
    t('Nous travaillons pour des entreprises d’Europe et d’Afrique francophone. Les six projets livrés à ce jour sont à Cotonou, Lomé et Abidjan — c’est là que nous sommes nés, et nous ne le déguisons pas.',
      'We work for companies in Europe and French-speaking Africa. The six projects delivered so far are in Cotonou, Lomé and Abidjan — that is where we come from, and we do not dress it up.'),
    t('Chaque projet appartient à un ingénieur qui a déjà livré en production. Vous lui parlez directement, chaque semaine, démo à l’appui. Il n’y a pas de chef de projet entre vous et lui.',
      'Every project is owned by an engineer who has already shipped to production. You talk to them directly, every week, demo in hand. There is no project manager between you.'),
    t('Les sites et le motion design sont un savoir-faire de la maison : ils rendent les livrables présentables, ils ne sont pas l’offre. Ce que nous vendons, ce sont des systèmes qui tournent.',
      'Websites and motion design are an in-house craft: they make the deliverables presentable, they are not the offer. What we sell is systems that run.'),
  ],
  teamHeading:   t('L’équipe', 'The team'),
  valuesHeading: t('Ce à quoi nous tenons', 'What we hold to'),
  limits: {
    heading: t('Ce que nous ne faisons pas', 'What we do not do'),
    lede: t('Dire non vite est le seul moyen de tenir trois semaines et un prix fixe sur le reste.',
            'Saying no quickly is the only way to hold three weeks and a fixed price on everything else.'),
    items: [
      t('Nous ne prenons pas de projet dont le périmètre ne peut pas être écrit.',
        'We do not take a project whose scope cannot be written down.'),
      t('Nous ne vendons pas d’IA quand un script de dix lignes suffit. Nous le disons pendant l’appel.',
        'We do not sell AI when a ten-line script will do. We say so on the call.'),
      t('Nous ne prenons pas plus de projets que nous ne pouvons en livrer. L’agenda se remplit, et il se dit.',
        'We do not take on more projects than we can deliver. The calendar fills up, and we say so.'),
    ],
  },
}

export const contactPage = {
  title: t('Quelle tâche vous coûte\nle plus aujourd’hui ?', 'Which task costs you\nthe most today?'),
  lede:  t('Décrivez-la en deux lignes. En 30 minutes, on vous dit si l’IA peut la régler, en combien de temps, et pour quel prix. Si la réponse est non, on vous le dit aussi.',
           'Describe it in two lines. In 30 minutes we tell you whether AI can solve it, how long it takes, and what it costs. If the answer is no, we tell you that too.'),
}

export const pageCta = {
  heading: t('Un problème similaire ?', 'A similar problem?'),
  body:    t('Trente minutes suffisent pour savoir si l’IA peut le régler, en combien de temps, et pour quel prix.',
             'Thirty minutes is enough to know whether AI can solve it, how long it takes, and what it costs.'),
}
