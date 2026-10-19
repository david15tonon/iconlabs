/**
 * Garde-fou du `_routes.json` de Cloudflare Pages.
 *
 * Deux fautes sont possibles, et aucune ne se voit au déploiement :
 *
 * 1. **Plus de 100 règles.** Pages refuse le fichier. Nitro, lui, coupe la
 *    liste à cent sans rien dire — le déploiement passe et une partie des
 *    assets part dans le Worker.
 * 2. **Un fichier statique non couvert.** Tout ce qui n'est pas exclu traverse
 *    le Worker : plus lent, facturé à l'invocation, et le cache de Pages ne
 *    s'applique pas. Un fichier ajouté dans `public/` l'oublie sans bruit.
 *
 * Ce script lit le `dist/` réellement produit et vérifie les deux. Il tourne
 * après `npm run build:cf`.
 */
import { readFileSync, existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DIST = 'dist'

/* Ce que Pages consomme lui-même : ces fichiers ne sont jamais des routes. */
const INFRA = new Set(['_routes.json', '_headers', '_redirects', 'nitro.json'])

if (!existsSync(join(DIST, '_routes.json'))) {
  console.error(`✖ ${DIST}/_routes.json absent — lancer d'abord « npm run build:cf ».`)
  process.exit(1)
}

const routes = JSON.parse(readFileSync(join(DIST, '_routes.json'), 'utf8'))
const total = routes.include.length + routes.exclude.length

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name)
    /* `_worker.js` est le Worker lui-même, pas un asset. */
    if (e.name === '_worker.js') continue
    if (e.isDirectory()) out.push(...(await walk(full)))
    else out.push('/' + relative(DIST, full).split('\\').join('/'))
  }
  return out
}

const couvert = (p) =>
  routes.exclude.some((r) => (r.endsWith('/*') ? p.startsWith(r.slice(0, -1)) : p === r))

const fichiers = (await walk(DIST)).filter((f) => !INFRA.has(f.slice(1)))
const orphelins = fichiers.filter((f) => !couvert(f))

console.log(`règles   ${total} / 100   (${routes.include.length} include, ${routes.exclude.length} exclude)`)
console.log(`statiques ${fichiers.length} fichiers, ${fichiers.length - orphelins.length} couverts`)

let ko = false
if (total > 100) {
  console.error(`✖ ${total} règles : Pages en refuse plus de 100.`)
  ko = true
}
if (total === 100) {
  console.error('✖ exactement 100 règles : Nitro a probablement tronqué la liste en silence.')
  ko = true
}
if (orphelins.length) {
  console.error(`✖ ${orphelins.length} fichiers statiques passeraient par le Worker :`)
  for (const f of orphelins.slice(0, 20)) console.error(`    ${f}`)
  if (orphelins.length > 20) console.error(`    … et ${orphelins.length - 20} autres`)
  console.error('  → les couvrir dans nitro.cloudflare.pages.routes.exclude (nuxt.config.ts)')
  ko = true
}
if (ko) process.exit(1)
console.log('✓ routage Cloudflare sain')
