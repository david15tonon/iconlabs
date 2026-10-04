# Icon Labs — site

Site public d'Icon Labs, studio d'ingénierie créative basé en Afrique de
l'Ouest. **Nuxt 4** (Vue 3, Nitro), bilingue français / anglais, rendu serveur.

> Structure d'abord, effet ensuite.

## Ce que contient le dépôt

| Chemin | Rôle |
| --- | --- |
| `app/` | pages, composants, composables, styles (`assets/css/main.css` porte les tokens) |
| `content/site.ts` | **tous** les textes et la liste des services — jamais de texte dans un composant |
| `server/` | middleware de détection de langue par pays, route du formulaire de contact |
| `public/story/` | les 135 images du récit au scroll + leur `manifest.json` |
| `public/brand/` | logo, verrouillages, favicon, image Open Graph |
| `tools/` | génération des images du récit (`make-story-frames.mjs`, `build-story.sh`) |
| `BRAND.md` | **la** charte : couleurs, polices, mesures, contrastes mesurés |

Les scripts `.audit.mjs`, `.nav.mjs`, `.probe.mjs` et `.shots.mjs` sont les
sondes de vérification (Playwright) : contraste mesuré sur la page rendue,
parcours des adresses, captures aux arrêts du récit.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
```

Build et serveur de production :

```bash
npm run build
node .output/server/index.mjs
```

Un `npm run build` qui passe ne prouve rien : les erreurs d'édition de liens
n'apparaissent qu'au **serveur de production interrogé**. Toute vérification
démarre ce serveur et appelle les adresses.

## Langues

Les adresses de référence sont préfixées (`/fr/...`, `/en/...`) et reliées par
`hreflang` ; elles seules sont au sitemap. Les adresses sans préfixe (`/`,
`/methode`, `/studio`) servent la langue déduite du pays du visiteur
(`x-vercel-ip-country` sur Vercel, `cf-ipcountry` derrière Cloudflare), puis de
`Accept-Language`, avec l'anglais par défaut. Le cookie `il_locale` fixe un
choix explicite.

## Déploiement

Hébergé sur **Vercel** : Nitro détecte le preset `vercel`, aucun réglage de
build à fournir. Chaque push sur `main` déclenche un déploiement.

### Variable d'environnement

| Nom | Effet |
| --- | --- |
| `NUXT_CONTACT_WEBHOOK` | URL acceptant un `POST` JSON (Formspree, Resend, n8n, Slack…). **Non définie**, la route `/api/contact` répond `delivered: false` et le formulaire bascule sur le client mail du visiteur — rien n'affiche « envoyé » si rien n'est parti. |
