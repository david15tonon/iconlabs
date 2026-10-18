/**
 * Contenu éditorial du site Icon Labs — bilingue FR / EN.
 * C'est LE fichier à modifier pour changer les textes du site :
 * aucun texte n'est écrit en dur dans les composants.
 *
 * Convention : chaque champ est un objet { fr, en }.
 * Les valeurs marquées TODO: sont des hypothèses à confirmer (voir PRODUCTION.md).
 */

export type Locale = 'fr' | 'en'
export type T = Record<Locale, string>

const t = (fr: string, en: string): T => ({ fr, en })

export const brand = {
  name: 'icon labs',
  wordmark: 'Icon Labs',
  tagline: t('Structure d’abord, effet ensuite.', 'Structure first, effect second.'),
  origin: t('Conçu en Afrique de l’Ouest. Déployé partout.', 'Built in West Africa. Shipped worldwide.'),
  email: 'contact@iconlabs.dev',
  domain: 'iconlabs.qzz.io',
  linkedin: 'https://www.linkedin.com/company/iconlabs',   // TODO: confirmer l'URL réelle
  x: 'https://x.com/iconlabs',                             // TODO: confirmer l'URL réelle
}

/* ---------------------------------------------------------------- navigation */

/* Les chemins sont écrits sans préfixe de langue : `localePath()` (voir
   app/composables/useSite.ts) le pose au moment du rendu, pour qu'un visiteur
   de /fr/methode reste en français en cliquant. Une ancre seule (#contact)
   vise la home — depuis une page interne, elle y ramène.                    */

export const nav = [
  { to: '/#story',    label: t('L’approche', 'Approach') },
  { to: '/#services', label: t('Ce que nous faisons', 'What we do') },
  { to: '/methode',   label: t('Méthode', 'Process') },
  { to: '/studio',    label: t('Le studio', 'Studio') },
  { to: '/#contact',  label: t('Contact', 'Contact') },
]

/* Le pied de page en colonnes : il est devenu le plan du site, puisque
   l'en-tête ne peut pas porter les quatre pages de services. */
export const footerNav = [
  {
    title: t('Ce que nous faisons', 'What we do'),
    links: [
      { to: '/services/sites-experiences', label: t('Sites & expériences', 'Sites & experiences') },
      { to: '/services/plateformes',       label: t('Plateformes & applications', 'Platforms & apps') },
      { to: '/services/produits-ia',       label: t('Produits IA & automatisation', 'AI products & automation') },
      { to: '/services/mvp',               label: t('MVP en 2 à 4 semaines', 'MVP in 2 to 4 weeks') },
    ],
  },
  {
    title: t('Le studio', 'The studio'),
    links: [
      { to: '/methode',  label: t('Méthode', 'Process') },
      { to: '/studio',   label: t('Qui nous sommes', 'Who we are') },
      { to: '/#faq',     label: t('Questions fréquentes', 'Common questions') },
    ],
  },
]

export const cta = {
  primary:   t('Démarrer un projet', 'Start a project'),
  secondary: t('Voir la méthode', 'See how we work'),
  call:      t('Réserver un appel de 30 min', 'Book a 30-min call'),
  callNote:  t('Gratuit · 30 min · sans engagement', 'Free · 30 min · no commitment'),
}

/* ------------------------------------------------- scènes du récit au scroll */
/* Le texte de chaque scène apparaît par-dessus l'animation épinglée.          */

export const story = [
  {
    id: 'opening',
    heading: t('La plupart des sites sont\ndes documents.',
               'Most websites are\ndocuments.'),
    body:    t('Nous en faisons des expériences : conçues, animées et codées par la même équipe, du premier trait au déploiement.',
               'We make them experiences: designed, animated and coded by the same team, from first stroke to deploy.'),
    action:  'primary' as const,
  },
  {
    id: 'craft',
    heading: t('Une structure avant\nun habillage.',
               'Structure before\ndecoration.'),
    body:    t('Chaque expérience commence par une architecture : parcours, hiérarchie, performance. Le mouvement vient après, et il sert le propos. Jamais l’inverse.',
               'Every experience starts as architecture: flow, hierarchy, performance. Motion comes after, and it serves the point. Never the other way round.'),
    action:  null,
  },
  {
    id: 'ship',
    heading: t('Livré, mesuré,\nà vous.',
               'Shipped, measured,\nyours.'),
    body:    t('Code propre, documentation, passation. Vous êtes autonome dès le premier jour — pas de dépendance au studio.',
               'Clean code, documentation, handoff. You are autonomous from day one — no lock-in to the studio.'),
    action:  'call' as const,
  },
]

/* ------------------------------------------------------------------ services */
export const servicesIntro = {
  heading: t('Quatre façons de\ntravailler ensemble.', 'Four ways to\nwork together.'),
}

export const services = [
  {
    slug: 'sites-experiences',
    title: t('Sites & expériences sur mesure',   'Custom sites & experiences'),
    body:  t('Un site vitrine, une landing de lancement ou une marque entière mise en mouvement. Direction artistique, animation au scroll, code de production.',
             'A brand site, a launch page, or a whole identity put into motion. Art direction, scroll animation, production code.'),
    tags:  ['Direction artistique', 'Motion', 'Nuxt / Next', 'WebGL'],
  },
  {
    slug: 'plateformes',
    title: t('Plateformes & applications web',   'Web platforms & apps'),
    body:  t('Tableaux de bord, outils internes, SaaS complets. Même exigence d’expérience, appliquée à des produits que l’on utilise tous les jours.',
             'Dashboards, internal tools, full SaaS products. The same experience standard, applied to products people use daily.'),
    tags:  ['Architecture', 'Design système', 'API', 'CI/CD'],
  },
  {
    slug: 'produits-ia',
    title: t('Produits IA & automatisation',     'AI products & automation'),
    body:  t('Agents, intégration LLM, RAG, et automatisation de processus. L’ingénierie qui tient en production, pas la démo qui casse au premier vrai utilisateur.',
             'Agents, LLM integration, RAG, and process automation. Engineering that holds in production, not a demo that breaks on the first real user.'),
    tags:  ['LLM', 'RAG', 'Agents', 'n8n / MCP'],
  },
  {
    slug: 'mvp',
    title: t('MVP en 2 à 4 semaines',            'MVP in 2 to 4 weeks'),
    body:  t('De l’idée validée au produit en ligne. Périmètre défini, prix fixe, démos chaque semaine. Vous parlez à vos clients, nous construisons.',
             'From validated idea to live product. Defined scope, fixed price, weekly demos. You talk to customers, we build.'),
    tags:  ['Prix fixe', 'Démo hebdo', 'Déploiement inclus'],
  },
]

/* ------------------------------------------------------------------ repères */
/* ⚠️ Ce ne sont PAS des métriques : ce sont des engagements déjà écrits
   ailleurs dans ce fichier (durée d'un sprint, transfert de propriété, absence
   de chef de projet). Aucun chiffre d'activité n'est affirmé ici, et aucun ne
   doit l'être sans source. La bande est juste sous le récit, à la place qu'une
   bande de logos clients occuperait si nous en avions.                      */

export const markers = {
  note: t('Des engagements, pas des moyennes.', 'Commitments, not averages.'),
  items: [
    { value: '2–4',   label: t('semaines du brief à la mise en ligne', 'weeks from brief to launch') },
    { value: '100 %', label: t('du code transféré à la livraison', 'of the code transferred on delivery') },
    { value: '0',     label: t('chef de projet entre vous et l’ingénieur', 'project managers between you and the engineer') },
  ],
}

/* ---------------------------------------------------------------- différence */

export const differenceIntro = {
  heading: t('Une seule équipe,\ndu premier trait au déploiement.',
             'One team,\nfrom first stroke to deploy.'),
  lede:    t('La plupart des prestataires tiennent un maillon : le design, ou le code, ou l’hébergement. Nous tenons la chaîne — et c’est ce qui nous autorise à vous conseiller.',
             'Most vendors hold one link: the design, or the code, or the hosting. We hold the chain — and that is what lets us advise you.'),
}

export const difference = [
  {
    title: t('Structure d’abord, effet ensuite', 'Structure first, effect second'),
    body:  t('Chaque projet commence par une architecture : parcours, hiérarchie, performance. Le mouvement vient après, et il sert le propos. C’est aussi pourquoi les sites que nous livrons restent rapides.',
             'Every project starts as architecture: flow, hierarchy, performance. Motion comes after, and it serves the point. It is also why the sites we ship stay fast.'),
  },
  {
    title: t('Pas d’intermédiaire', 'No middle layer'),
    body:  t('Chaque projet appartient à un ingénieur qui a déjà livré en production. Vous lui parlez directement, chaque semaine, démo à l’appui. Il n’y a personne à prévenir avant lui.',
             'Every project is owned by an engineer who has already shipped to production. You talk to them directly, every week, demo in hand. There is nobody to go through first.'),
  },
  {
    title: t('Autonome à la livraison', 'Autonomous on delivery'),
    body:  t('Transfert de propriété, documentation, accès. La maintenance mensuelle existe, elle n’est jamais imposée : personne ne reste client parce qu’il ne peut pas partir.',
             'IP transfer, documentation, credentials. The monthly retainer exists, it is never imposed: nobody stays a client because leaving is impossible.'),
  },
]

/* ------------------------------------------------------------------- méthode */

export const processIntro = {
  heading: t('Du brief à la\nmise en ligne.', 'From brief to\nlaunch.'),
}

/* Nommée `processSteps`, et non `process` : le bundle de production inline les
   exports de ce fichier au niveau module, où Nitro a déjà injecté
   `import process from 'node:process'`. La collision passe le build et fait
   tomber le serveur à chaque requête (« Identifier 'process' has already been
   declared »). Aucun export de ce fichier ne doit porter un nom de global Node. */
export const processSteps = [
  { num: '01', title: t('Appel de cadrage', 'Discovery call'),
    body: t('30 minutes pour comprendre le problème, la stack, le délai et le budget. Pas de pitch.',
            '30 minutes to understand the problem, the stack, the timeline and the budget. No pitch.'),
    meta: t('Gratuit · 30 min', 'Free · 30 min') },
  { num: '02', title: t('Proposition chiffrée', 'Scoped proposal'),
    body: t('Périmètre, livrables, stack et prix fixe. Vous savez exactement ce que vous achetez avant de signer.',
            'Scope, deliverables, stack and fixed price. You know exactly what you are buying before signing.'),
    meta: t('2–3 jours', '2–3 days') },
  { num: '03', title: t('Sprint de conception & build', 'Design & build sprint'),
    body: t('Maquettes animées, puis code. Démo fonctionnelle chaque semaine, communication directe avec l’ingénieur qui construit.',
            'Animated mockups, then code. A working demo every week, direct line to the engineer building it.'),
    meta: t('1–4 semaines', '1–4 weeks') },
  { num: '04', title: t('Livraison & passation', 'Delivery & handoff'),
    body: t('Déploiement, documentation, transfert complet de propriété. Maintenance mensuelle en option, jamais imposée.',
            'Deployment, documentation, full IP transfer. Optional monthly retainer, never imposed.'),
    meta: t('Propriété totale', 'Full ownership') },
]

/* -------------------------------------------------------------------- studio */

export const studioIntro = {
  heading: t('Trois personnes,\nune seule table.', 'Three people,\none table.'),
  body: [
    t('Icon Labs est un studio d’ingénierie créative basé en Afrique de l’Ouest. Nous concevons des expériences web : la direction artistique, le mouvement et le code de production sortent de la même équipe.',
      'Icon Labs is a creative engineering studio based in West Africa. We design web experiences: art direction, motion and production code all come from the same team.'),
    t('Pas de chef de projet entre vous et la personne qui construit. Chaque projet appartient à un ingénieur qui a déjà livré en production.',
      'No project manager between you and the person building. Every project is owned by an engineer who has already shipped to production.'),
    t('Notre flux de travail augmenté par l’IA nous donne une vitesse que les studios traditionnels n’atteignent pas, à un coût qui rend inutile l’embauche d’un CTO à temps plein.',
      'Our AI-augmented workflow gives us a pace traditional studios cannot match, at a cost that makes hiring a full-time CTO unnecessary.'),
  ],
}

export const team = [
  { name: 'David Tonon',      role: t('Fondateur · Ingénieur IA & web', 'Founder · AI & web engineer') },
  { name: 'Kenneth Kpanou',   role: t('Motion designer', 'Motion designer') },
  { name: 'Emmanuel Attiba',  role: t('Contenu & croissance', 'Content & growth') },
]

export const values = [
  t('Résilience', 'Resilience'),
  t('Innovation', 'Innovation'),
  t('Créativité', 'Creativity'),
  t('Satisfaction client', 'Client satisfaction'),
  t('Connaître ses limites', 'Knowing our limits'),
]

/* ----------------------------------------------------------------------- FAQ */

export const faqIntro = {
  heading: t('Ce qu’on nous\ndemande le plus.', 'What we get\nasked most.'),
}

export const faq = [
  { q: t('En combien de temps livrez-vous ?', 'How fast do you deliver?'),
    a: t('Un sprint se livre en 2 semaines, un MVP complet en 4. Ce sont des engagements, pas des estimations : nous ne prenons pas plus de projets que nous ne pouvons en livrer.',
         'A sprint ships in 2 weeks, a full MVP in 4. These are commitments, not estimates: we never take on more than we can deliver.') },
  { q: t('En quoi êtes-vous différents d’un freelance ?', 'How are you different from a freelancer?'),
    a: t('Nous fonctionnons comme un studio : design, motion et ingénierie au même endroit, avec des jalons définis. Vous ne coordonnez pas trois prestataires.',
         'We work as a studio: design, motion and engineering in one place, with defined milestones. You are not coordinating three vendors.') },
  { q: t('Travaillez-vous avec des fondateurs non techniques ?', 'Do you work with non-technical founders?'),
    a: t('Oui. Notre rôle est de rendre la technique invisible : vous restez sur le produit et le marché, nous prenons l’ingénierie.',
         'Yes. Our job is to make the technical invisible: you stay on product and market, we take the engineering.') },
  { q: t('À qui appartient le code après livraison ?', 'Who owns the code after delivery?'),
    a: t('À vous, entièrement. Transfert de propriété intellectuelle à la livraison, sans verrou ni licence cachée.',
         'You do, entirely. Full IP transfer on delivery, no lock-in, no hidden licensing.') },
  { q: t('Pouvez-vous reprendre une stack existante ?', 'Can you work with our existing stack?'),
    a: t('Dans la plupart des cas, oui : Python, TypeScript, React, Next.js, Nuxt, Django, FastAPI, Node, Docker, PostgreSQL. Dites-nous la vôtre pendant l’appel.',
         'In most cases, yes: Python, TypeScript, React, Next.js, Nuxt, Django, FastAPI, Node, Docker, PostgreSQL. Tell us yours on the call.') },
  { q: t('Et après la mise en ligne ?', 'What happens after launch?'),
    a: t('30 jours de support inclus. Ensuite, un forfait mensuel de maintenance et d’évolutions, sans engagement de durée.',
         '30 days of post-launch support included. After that, an optional monthly retainer for maintenance and new features, with no lock-in.') },
]

/* ------------------------------------------------------------------- contact */

export const contact = {
  heading: t('Parlons de ce que\nvous construisez.', 'Let’s talk about what\nyou are building.'),
  body:    t('Un appel de 30 minutes, gratuit. On regarde votre projet, on vous dit franchement si nous sommes les bons, et si non, vers qui aller.',
             'A free 30-minute call. We look at your project and tell you honestly whether we are the right fit, and if not, who is.'),
  fields: {
    name:    t('Nom', 'Name'),
    email:   t('E-mail', 'Email'),
    project: t('Votre projet en deux lignes', 'Your project in two lines'),
    send:    t('Envoyer', 'Send'),
    sending: t('Envoi…', 'Sending…'),
  },
}

export const footer = {
  rights: t('Tous droits réservés.', 'All rights reserved.'),
}

export const seo = {
  title: t('Icon Labs — Studio d’ingénierie créative', 'Icon Labs — Creative engineering studio'),
  description: t('Icon Labs conçoit des expériences web sur mesure : direction artistique, animation et code de production par la même équipe. Afrique de l’Ouest, projets dans le monde entier.',
                 'Icon Labs designs custom web experiences: art direction, motion and production code from one team. Based in West Africa, shipping worldwide.'),
}

/* ===========================================================================
   PAGES INTERNES
   ---------------------------------------------------------------------------
   Sur le modèle des pages de bumpslab.com : un titre qui est une phrase, un
   sous-titre qui dit à qui ça s'adresse, ce que la prestation comprend, ce
   qu'on a entre les mains à la fin, et — c'est le plus utile — ce pour quoi
   ce n'est PAS fait.

   Rien ici ne décrit un client ou un projet réel. Les blocs `example` sont
   explicitement présentés comme des périmètres-types, jamais comme des cas.
   La seule exception est vérifiable : ce site-ci.
   ========================================================================= */

type Bullet = { title: T; body: T }

export type ServicePage = {
  slug: string
  nav: T
  title: T
  lede: T
  tags: string[]
  includes: Bullet[]
  outcome: T[]
  fitYes: T[]
  fitNo: T[]
  example: T
}

export const servicePages: ServicePage[] = [
  {
    slug: 'sites-experiences',
    nav: t('Sites & expériences', 'Sites & experiences'),
    title: t('Un site dont on se\nsouvient le lendemain.', 'A site people still\nremember tomorrow.'),
    lede: t('Une marque mise en mouvement : direction artistique, animation au scroll, et le code de production qui tient derrière.',
            'A brand put into motion: art direction, scroll animation, and the production code that holds it up.'),
    tags: ['Direction artistique', 'Motion', 'Nuxt / Next', 'WebGL'],
    includes: [
      { title: t('Direction artistique', 'Art direction'),
        body:  t('Une piste visuelle dessinée pour votre marque : typographie, couleur, grille, ton. Pas un gabarit repeint.',
                 'A visual direction drawn for your brand: type, colour, grid, tone. Not a template repainted.') },
      { title: t('Mouvement', 'Motion'),
        body:  t('Le défilement, les transitions, les états. Le mouvement hiérarchise la lecture ; il ne décore pas, et il se coupe si le visiteur a demandé moins d’animation.',
                 'Scroll, transitions, states. Motion ranks what matters; it does not decorate, and it stands down when the visitor has asked for less of it.') },
      { title: t('Code de production', 'Production code'),
        body:  t('Nuxt ou Next, rendu côté serveur, images et polices optimisées, performances mesurées avant la livraison et non après.',
                 'Nuxt or Next, server rendering, optimised images and fonts, performance measured before delivery rather than after.') },
      { title: t('Accessibilité', 'Accessibility'),
        body:  t('Contrastes mesurés sur la page rendue, navigation au clavier, mouvement réduit respecté. Ce n’est pas une option à cocher.',
                 'Contrast measured on the rendered page, keyboard navigation, reduced motion respected. Not a box to tick.') },
    ],
    outcome: [
      t('Le site en ligne, sur votre nom de domaine', 'The site live, on your domain'),
      t('Le dépôt de code, à vous', 'The repository, yours'),
      t('La documentation pour publier sans nous', 'The documentation to publish without us'),
      t('30 jours de support inclus', '30 days of support included'),
    ],
    fitYes: [
      t('Vous lancez une marque, un produit ou une refonte, et le site doit porter le propos.',
        'You are launching a brand, a product or a redesign, and the site has to carry the point.'),
      t('Vous voulez une pièce unique, pas un thème habillé.', 'You want a one-off, not a dressed-up theme.'),
      t('Vous avez une date, et elle ne bouge pas.', 'You have a date, and it does not move.'),
    ],
    fitNo: [
      t('Vous cherchez le moins cher : un gabarit fera mieux l’affaire, et nous vous le dirons.',
        'You are after the cheapest option: a template will serve you better, and we will say so.'),
      t('Le contenu n’existe pas encore et personne n’est désigné pour l’écrire.',
        'The content does not exist yet and nobody has been put in charge of writing it.'),
    ],
    example: t('Pour un lancement de marque : une page unique racontée au défilement, trois arrêts animés, deux langues, un formulaire relié à votre messagerie, en ligne en trois semaines. Ce site-ci en est un — c’est le seul exemple que nous puissions vous montrer de bout en bout.',
               'For a brand launch: a single page told through scroll, three animated stops, two languages, a form wired to your inbox, live in three weeks. This very site is one — it is the only example we can show you end to end.'),
  },

  {
    slug: 'plateformes',
    nav: t('Plateformes & applications', 'Platforms & apps'),
    title: t('Un produit qu’on utilise\ntous les jours.', 'A product people use\nevery day.'),
    lede: t('Tableaux de bord, outils internes, SaaS complets. La même exigence d’expérience, appliquée à ce qui sert au travail.',
            'Dashboards, internal tools, full SaaS products. The same experience standard, applied to what people work in.'),
    tags: ['Architecture', 'Design système', 'API', 'CI/CD'],
    includes: [
      { title: t('Architecture', 'Architecture'),
        body:  t('Modèle de données, découpage des services, choix d’hébergement. Décidé avant d’écrire la première ligne, pas découvert en cours de route.',
                 'Data model, service boundaries, hosting. Decided before the first line is written, not discovered along the way.') },
      { title: t('Design système', 'Design system'),
        body:  t('Composants, états, cas vides, erreurs. Un vocabulaire qui tient encore quand le produit aura doublé de surface.',
                 'Components, states, empty cases, errors. A vocabulary that still holds once the product has doubled in surface.') },
      { title: t('API & intégrations', 'API & integrations'),
        body:  t('REST ou GraphQL, authentification, webhooks, connexion à ce que vous utilisez déjà plutôt qu’un système de plus à administrer.',
                 'REST or GraphQL, authentication, webhooks, connected to what you already use rather than one more system to administer.') },
      { title: t('Mise en production', 'Shipping'),
        body:  t('Intégration continue, environnement de recette, journaux et alertes. Déployer doit être un non-événement.',
                 'Continuous integration, a staging environment, logs and alerts. Deploying should be a non-event.') },
    ],
    outcome: [
      t('Un produit en ligne, avec ses environnements', 'A live product, with its environments'),
      t('Le dépôt, les secrets et les accès, à vous', 'The repository, secrets and credentials, yours'),
      t('Un schéma d’architecture tenu à jour', 'An architecture diagram kept current'),
      t('30 jours de support inclus', '30 days of support included'),
    ],
    fitYes: [
      t('Vous avez des utilisateurs, ou vous en aurez dans trois mois.', 'You have users, or you will within three months.'),
      t('L’outil actuel est un tableur, et il a atteint sa limite.', 'The current tool is a spreadsheet, and it has hit its ceiling.'),
      t('Vous voulez pouvoir reprendre le code en interne un jour.', 'You want to be able to take the code in-house one day.'),
    ],
    fitNo: [
      t('Le périmètre n’est pas encore arrêté : commencez par un MVP, cela vous coûtera moins cher.',
        'The scope is not settled yet: start with an MVP, it will cost you less.'),
      t('Vous cherchez une régie au mois sans périmètre défini.', 'You are looking for an open-ended monthly retainer with no defined scope.'),
    ],
    example: t('Un périmètre-type, et non un client : un outil interne avec authentification, rôles, tableau de bord, export, et une API pour le reste du système. Quatre semaines, prix fixe, démo chaque vendredi.',
               'A sample scope, not a client: an internal tool with authentication, roles, a dashboard, exports, and an API for the rest of the system. Four weeks, fixed price, a demo every Friday.'),
  },

  {
    slug: 'produits-ia',
    nav: t('Produits IA & automatisation', 'AI products & automation'),
    title: t('De l’IA qui tient\nen production.', 'AI that holds up\nin production.'),
    lede: t('Agents, intégration LLM, RAG, automatisation de processus. L’ingénierie qui survit au premier vrai utilisateur, pas la démo qui impressionne en réunion.',
            'Agents, LLM integration, RAG, process automation. Engineering that survives the first real user, not the demo that impresses in a meeting.'),
    tags: ['LLM', 'RAG', 'Agents', 'n8n / MCP'],
    includes: [
      { title: t('Cadrage de l’usage', 'Framing the use case'),
        body:  t('Quelle tâche, pour qui, et à quoi on mesurera que ça marche. Sans cette réponse, un agent reste un jouet coûteux.',
                 'Which task, for whom, and how we will measure that it works. Without that answer, an agent stays an expensive toy.') },
      { title: t('Récupération & contexte', 'Retrieval & context'),
        body:  t('Vos documents indexés, les réponses sourcées, les sources citées. Une réponse sans source n’est pas une réponse.',
                 'Your documents indexed, answers grounded, sources cited. An answer without a source is not an answer.') },
      { title: t('Agents & automatisation', 'Agents & automation'),
        body:  t('Des enchaînements qui vont au bout : lire, décider, écrire dans vos outils. n8n, MCP, ou du code quand les deux ne suffisent pas.',
                 'Chains that run to completion: read, decide, write into your tools. n8n, MCP, or code when neither is enough.') },
      { title: t('Garde-fous', 'Guardrails'),
        body:  t('Plafond de coût, traçabilité des appels, reprise sur erreur, et une porte de sortie humaine à chaque étape qui engage.',
                 'A cost ceiling, traceable calls, recovery on failure, and a human way out at every step that commits you.') },
    ],
    outcome: [
      t('L’usage en production, et sa mesure', 'The use case in production, and its measurement'),
      t('Le code, les prompts et les évaluations, à vous', 'The code, the prompts and the evals, yours'),
      t('Le coût par appel, connu avant la mise en ligne', 'The cost per call, known before launch'),
      t('30 jours de support inclus', '30 days of support included'),
    ],
    fitYes: [
      t('Une tâche répétitive occupe quelqu’un plusieurs heures par semaine.', 'A repetitive task takes someone several hours a week.'),
      t('Vous avez de la documentation, et personne ne la retrouve.', 'You have documentation, and nobody can find anything in it.'),
      t('Vous avez essayé un outil générique : il ne connaît pas votre métier.', 'You tried a generic tool: it does not know your trade.'),
    ],
    fitNo: [
      t('Vous voulez « faire de l’IA » sans tâche précise en tête. Nous vous le dirons, c’est le genre de projet qui coûte sans rien rendre.',
        'You want to “do AI” with no specific task in mind. We will say so — that is the kind of project that costs without returning anything.'),
      t('Les données nécessaires n’existent pas, ou personne n’a le droit d’y toucher.',
        'The data it would need does not exist, or nobody is allowed to touch it.'),
    ],
    example: t('Un périmètre-type, et non un client : un assistant interne branché sur vos documents, qui répond en citant ses sources, qui dit quand il ne sait pas, et dont le coût mensuel est plafonné.',
               'A sample scope, not a client: an internal assistant wired to your documents, answering with its sources cited, saying when it does not know, with a capped monthly cost.'),
  },

  {
    slug: 'mvp',
    nav: t('MVP en 2 à 4 semaines', 'MVP in 2 to 4 weeks'),
    title: t('De l’idée au produit\nen ligne, en un mois.', 'From idea to live\nproduct, in a month.'),
    lede: t('Périmètre défini, prix fixe, démo chaque semaine. Vous parlez à vos clients, nous construisons.',
            'Defined scope, fixed price, weekly demos. You talk to customers, we build.'),
    tags: ['Prix fixe', 'Démo hebdo', 'Déploiement inclus'],
    includes: [
      { title: t('Semaine 0 : on coupe', 'Week 0: cutting'),
        body:  t('Ce qui reste est ce qui prouve l’idée, rien d’autre. Un MVP se définit d’abord par ce qu’il ne fait pas.',
                 'What survives is what proves the idea, nothing else. An MVP is defined first by what it does not do.') },
      { title: t('Semaines 1 à 3 : on construit', 'Weeks 1 to 3: building'),
        body:  t('Une démo fonctionnelle chaque semaine, sur une vraie adresse que vous pouvez partager. Pas une maquette cliquable.',
                 'A working demo every week, on a real address you can share. Not a clickable mockup.') },
      { title: t('Dernière semaine : on met en ligne', 'Final week: shipping'),
        body:  t('Déploiement, nom de domaine, mesure d’usage branchée, passation. La mise en ligne fait partie du forfait.',
                 'Deployment, domain, usage analytics wired in, handoff. Launch is part of the price.') },
      { title: t('Après : vous décidez', 'After: your call'),
        body:  t('On s’arrête, on continue sur un deuxième sprint, ou vous reprenez en interne. Les trois sont des issues normales.',
                 'We stop, we run a second sprint, or you take it in-house. All three are normal outcomes.') },
    ],
    outcome: [
      t('Un produit en ligne que vos clients peuvent utiliser', 'A live product your customers can use'),
      t('Le dépôt et les accès, à vous', 'The repository and credentials, yours'),
      t('La mesure d’usage en place dès le premier jour', 'Usage measurement in place from day one'),
      t('30 jours de support inclus', '30 days of support included'),
    ],
    fitYes: [
      t('Vous avez une idée, et il faut savoir si elle tient — pas la perfectionner.',
        'You have an idea, and you need to know whether it holds — not to perfect it.'),
      t('Vous avez une levée, un salon, une date.', 'You have a raise, a trade show, a date.'),
      t('Vous acceptez de couper.', 'You are willing to cut.'),
    ],
    fitNo: [
      t('Le périmètre doit tout contenir : alors ce n’est pas un MVP, c’est une plateforme, et c’est une autre page.',
        'The scope has to contain everything: then it is not an MVP, it is a platform, and that is another page.'),
      t('Personne chez vous ne peut trancher en une journée.', 'Nobody on your side can settle a question within a day.'),
    ],
    example: t('Un périmètre-type, et non un client : une place de marché à deux faces réduite à son cœur — inscription, annonce, recherche, mise en relation. Le paiement attend la phase 2. En ligne à la fin de la quatrième semaine.',
               'A sample scope, not a client: a two-sided marketplace cut down to its core — sign-up, listing, search, introduction. Payments wait for phase 2. Live at the end of week four.'),
  },
]

/* ------------------------------------------------------------ page : méthode */

export const methodePage = {
  title:   t('Comment un projet se passe,\nétape par étape.', 'How a project runs,\nstep by step.'),
  lede:    t('Quatre étapes, des jalons datés, un prix fixe. À tout moment vous savez où en est le projet et ce qu’il vous reste à décider.',
             'Four steps, dated milestones, a fixed price. At any point you know where the project stands and what is left for you to decide.'),

  /* Ce que chaque étape produit, et ce qu'elle réclame de vous. C'est la
     seconde colonne qui manque le plus souvent aux pages de méthode : un
     projet dérape presque toujours du côté du client, faute d'avoir dit qui
     devait répondre, et en combien de temps.                                */
  exchange: {
    heading: t('Ce que chaque étape demande', 'What each step asks of you'),
    give:    t('Vous recevez', 'You receive'),
    take:    t('Nous attendons', 'We need'),
    rows: [
      { gives: t('Un compte rendu écrit, et un avis franc : si nous ne sommes pas les bons, nous le disons et nous vous orientons ailleurs.',
                 'A written summary, and a straight answer: if we are not the right fit, we say so and point you elsewhere.'),
        needs: t('Trente minutes, et la personne qui décide.', 'Thirty minutes, and the person who decides.') },
      { gives: t('Périmètre, livrables, stack, calendrier et prix fixe. Un document, pas une fourchette.',
                 'Scope, deliverables, stack, schedule and fixed price. A document, not a range.'),
        needs: t('Une réponse, oui ou non. Une proposition n’est pas une négociation sans fin.',
                 'An answer, yes or no. A proposal is not an open-ended negotiation.') },
      { gives: t('Une démo fonctionnelle chaque semaine, sur une adresse que vous pouvez partager autour de vous.',
                 'A working demo every week, on an address you can share around you.'),
        needs: t('Une heure par semaine, et des retours groupés plutôt qu’au fil de l’eau.',
                 'An hour a week, and feedback gathered rather than dripped.') },
      { gives: t('Le dépôt, la documentation, les accès, et le transfert de propriété intellectuelle.',
                 'The repository, the documentation, the credentials, and the IP transfer.'),
        needs: t('Une personne désignée pour recevoir la passation.', 'One named person to receive the handoff.') },
    ],
  },

  /* Les engagements qui ne dépendent pas du projet. Tous sont déjà tenus
     ailleurs sur le site (FAQ, étapes, studio) : rien de neuf n'est promis. */
  constants: {
    heading: t('Ce qui ne change jamais', 'What never changes'),
    items: [
      t('Le prix est fixe. Un changement de périmètre se chiffre à part — et il nous arrive de le refuser.',
        'The price is fixed. A change of scope is quoted separately — and we do turn some down.'),
      t('Vous parlez à l’ingénieur qui construit. Il n’y a personne à prévenir avant lui.',
        'You talk to the engineer who builds. There is nobody to go through first.'),
      t('Le code vous appartient dès la livraison. Pas de licence, pas de verrou, pas d’abonnement obligatoire.',
        'The code is yours on delivery. No licence, no lock-in, no mandatory subscription.'),
      t('Nous ne prenons pas plus de projets que nous ne pouvons en livrer.',
        'We never take on more projects than we can deliver.'),
    ],
  },
}

/* ------------------------------------------------------------- page : studio */

export const studioPage = {
  title:   t('Trois personnes,\nune seule table.', 'Three people,\none table.'),
  lede:    t('Icon Labs est un studio d’ingénierie créative basé en Afrique de l’Ouest. La direction artistique, le mouvement et le code de production sortent de la même équipe.',
             'Icon Labs is a creative engineering studio based in West Africa. Art direction, motion and production code all come from the same team.'),

  /* Les paragraphes de la page, distincts de ceux du bloc de la home : le
     chapô ci-dessus reprend déjà le premier de `studioIntro.body`, et les
     réafficher ici répétait deux fois la même phrase à trois centimètres
     d'écart. La page développe, la home résume.                            */
  body: [
    t('Le studio est né d’un constat simple : entre l’agence qui dessine sans construire et le développeur qui construit sans dessiner, le client paie deux fois la traduction. Nous avons monté une équipe qui n’a pas besoin de traducteur.',
      'The studio started from a simple observation: between the agency that designs without building and the developer who builds without designing, the client pays twice for the translation. We put together a team that needs no translator.'),
    t('Trois personnes, c’est une contrainte autant qu’un choix. Cela nous interdit de prendre dix projets à la fois, et cela garantit que celui qui vous répond est celui qui écrit le code. Il n’y a pas de chef de projet à prévenir, pas de relais, pas de version déformée de votre demande.',
      'Three people is as much a constraint as a choice. It stops us taking ten projects at once, and it guarantees that whoever answers you is the one writing the code. There is no project manager to go through, no relay, no distorted version of your request.'),
    t('Notre flux de travail augmenté par l’IA nous donne une vitesse que les studios traditionnels n’atteignent pas, à un coût qui rend inutile l’embauche d’un CTO à temps plein. Ce n’est pas un argument de vente : c’est la raison pour laquelle un MVP tient en quatre semaines et non en quatre mois.',
      'Our AI-augmented workflow gives us a pace traditional studios cannot match, at a cost that makes hiring a full-time CTO unnecessary. That is not a sales line: it is why an MVP fits in four weeks rather than four months.'),
  ],

  teamHeading:   t('Qui vous aurez en face', 'Who you will be dealing with'),
  valuesHeading: t('Ce à quoi nous tenons', 'What we hold to'),

  /* Le pendant honnête de la page : une page « à propos » qui n'énonce que
     des forces ne renseigne personne. La valeur « connaître ses limites »
     n'aurait aucun sens sans cette liste-ci.                                */
  limits: {
    heading: t('Ce que nous ne faisons pas', 'What we do not do'),
    lede:    t('« Connaître ses limites » est l’une de nos valeurs. Elle ne vaut qu’écrite noir sur blanc.',
               '“Knowing our limits” is one of our values. It only counts written down.'),
    items: [
      t('Ni référencement payant, ni publicité, ni production vidéo. Nous connaissons des gens qui le font bien, et nous vous donnons leurs noms.',
        'No paid search, no advertising, no video production. We know people who do those well, and we will give you their names.'),
      t('Pas de régie au mois sans périmètre : c’est le meilleur moyen de facturer longtemps sans livrer.',
        'No open-ended monthly retainer: it is the surest way to bill for a long time without delivering.'),
      t('Pas de code que vous ne pourriez pas reprendre. Si une technologie nous arrange mais vous enferme, nous ne la choisissons pas.',
        'No code you could not take over. If a technology suits us but traps you, we do not pick it.'),
    ],
  },
}

/* ----------------------------------------------------- bande d'appel finale */
/* Les pages internes n'embarquent pas le formulaire : il vit sur la home, et
   un seul formulaire veut dire un seul chemin à tester et à maintenir.      */

export const pageCta = {
  heading: t('Parlons de ce que\nvous construisez.', 'Let’s talk about what\nyou are building.'),
  body:    t('Un appel de 30 minutes, gratuit. On regarde votre projet, et on vous dit franchement si nous sommes les bons, et si non, vers qui aller.',
             'A free 30-minute call. We look at your project and tell you honestly whether we are the right fit, and if not, who is.'),
}
