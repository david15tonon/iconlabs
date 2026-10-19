#!/usr/bin/env node
/**
 * Vectorisation du mot-image Icon Labs.
 *
 * Entrée  : public/brand/logo-source.png — le logo de référence, un PNG de
 *           1536 × 1024 noir sur blanc, avec de larges marges.
 * Sortie  : les fichiers de marque de public/brand/.
 *
 * DESIGN.md § Logo pose trois contraintes que ce script applique sans que
 * personne ait à les retrouver à l'œil :
 *
 *  — le recadrage se fait sur la **zone de protection**, qui vaut « la hauteur
 *    de la capitale d'icon sur les quatre côtés ». Cette hauteur n'est pas
 *    devinée : elle est mesurée sur les pixels, en isolant la colonne du « i »
 *    et en y relevant la hauteur de la hampe, le point détaché exclu ;
 *  — le logo est **monochrome** et ne prend jamais le vermillon. Deux variantes
 *    seulement : `-ink` (encre, pour fond clair) et sans suffixe (papier, pour
 *    fond sombre) ;
 *  — il n'y a **pas de symbole**. Le favicon ne peut donc pas en être un : il
 *    est découpé dans le mot-image lui-même, sur le « i » et son point détaché,
 *    qui est l'un des trois traits signature. Rien n'est dessiné en plus.
 *
 * Usage : node tools/trace-logo.mjs
 */

import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import potrace from 'potrace'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BRAND = join(ROOT, 'public', 'brand')
const SOURCE = join(BRAND, 'logo-source.png')

/* Les trois valeurs viennent de DESIGN.md § Colors, lui-même aligné sur la
   charte de marque. La charte interdit au logo toute couleur non définie :
   le clair est donc le blanc pur, et non un blanc cassé.                    */
const INK = '#0B0B0B'     // Tech Black — le sol
const PAPER = '#FFFFFF'   // Pure White — le mot-image sur fond sombre
const SIGNAL = '#2563EB'  // Neural Blue

/* --------------------------------------------------- lecture des pixels --- */

/** Le PNG en niveaux de gris bruts, via ImageMagick — Node ne décode pas le PNG. */
function readGray(path) {
  const size = execFileSync('magick', ['identify', '-format', '%w %h', path]).toString().trim()
  const [w, h] = size.split(' ').map(Number)
  const raw = execFileSync(
    'magick',
    [path, '-colorspace', 'gray', '-depth', '8', 'gray:-'],
    { maxBuffer: 1 << 28 },
  )
  return { w, h, px: raw }
}

const { w: W, h: H, px } = readGray(SOURCE)
const isInk = (x, y) => px[y * W + x] < 128

/** Boîte englobante de l'encre. */
function inkBox() {
  let x0 = W, y0 = H, x1 = -1, y1 = -1
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!isInk(x, y)) continue
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
  return { x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 }
}

/**
 * Hauteur de hampe du « i », qui donne la zone de protection.
 *
 * Le « i » est la lettre la plus à gauche. Sa colonne contient deux amas
 * d'encre séparés par du blanc : le point, en haut, et la hampe, en dessous.
 * On relève la hauteur du second — c'est la hauteur de capitale d'« icon ».
 */
function stemHeight(box) {
  // La colonne du « i » : la première tranche d'encre en partant de la gauche.
  let col = box.x0
  while (col <= box.x1) {
    let any = false
    for (let y = box.y0; y <= box.y1 && !any; y++) if (isInk(col, y)) any = true
    if (!any) break
    col++
  }
  const probe = Math.floor((box.x0 + col - 1) / 2) // milieu de la hampe

  // Les amas verticaux d'encre dans cette colonne.
  const runs = []
  let start = null
  for (let y = box.y0; y <= box.y1 + 1; y++) {
    const ink = y <= box.y1 && isInk(probe, y)
    if (ink && start === null) start = y
    if (!ink && start !== null) { runs.push({ top: start, bottom: y - 1 }); start = null }
  }
  if (runs.length < 2) throw new Error(`« i » non reconnu : ${runs.length} amas dans la colonne ${probe}`)

  const stem = runs[runs.length - 1]
  const dot = runs[0]
  return { height: stem.bottom - stem.top + 1, stem, dot, left: box.x0, right: col - 1 }
}

/* ------------------------------------------------------------- traçage --- */

const trace = (opts) =>
  new Promise((resolve, reject) =>
    potrace.trace(SOURCE, opts, (err, svg) => (err ? reject(err) : resolve(svg))),
  )

/** Potrace rend un SVG complet ; on n'en garde que la géométrie. */
function pathsOf(svg) {
  const ds = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1])
  if (!ds.length) throw new Error('potrace n’a rendu aucun tracé')
  return ds
}

/* --------------------------------------------------------------- sortie --- */

function svgDoc({ width, height, viewBox, body, title }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" role="img" aria-label="${title}">
  <title>${title}</title>
${body}
</svg>
`
}

const box = inkBox()
const { height: cap, stem, dot, left: iLeft, right: iRight } = stemHeight(box)

/* `turdSize` écarte les amas de moins de N pixels : le point du « i » fait
   plusieurs centaines de pixels, il n'est donc jamais emporté, mais les
   escaliers d'anticrénelage le sont. `alphaMax` garde les jonctions franches
   de cette grotesque géométrique plutôt que de les arrondir. */
const svgRaw = await trace({ threshold: 128, turdSize: 8, alphaMax: 1, optCurve: true, optTolerance: 0.2 })
const paths = pathsOf(svgRaw)

/* ---- 1 & 2. le mot-image, en deux recadrages ----------------------------- */

/* La charte demande de recadrer « sur la zone de protection ». Un seul fichier
   ne peut pas servir les deux usages qu'elle recouvre :
   —  dans la page, le fichier est posé dans une mise en page qui gère déjà
      ses marges. Un fichier rembourré de 110 px sur chaque côté y décale le
      logo de la gouttière : le bord optique du « i » ne tombe plus sur le
      même axe que la navigation et le texte, et la taille rendue ne se règle
      plus à vue puisque le dessin n'occupe que 70 % de la largeur du fichier.
      Pour cet usage, le recadrage est serré et la zone de protection est une
      règle de mise en page, pas un contenu de fichier ;
   —  quand le fichier voyage seul — un dossier de presse, un partenaire, une
      signature de mail — personne n'applique cette règle. La zone de
      protection y est donc intégrée.
   D'où `lockup*.svg`, serré, et `lockup*-safe.svg`, rembourré.               */

const pad = cap
const crops = [
  { suffix: '', x: box.x0, y: box.y0, w: box.w, h: box.h },
  { suffix: '-safe', x: box.x0 - pad, y: box.y0 - pad, w: box.w + pad * 2, h: box.h + pad * 2 },
]

const lockupW = 600
let reported = ''

for (const crop of crops) {
  const h = Math.round((lockupW * crop.h) / crop.w)
  for (const [variant, fill] of [['-ink', INK], ['', PAPER]]) {
    const body = paths.map((d) => `  <path fill="${fill}" fill-rule="evenodd" d="${d}"/>`).join('\n')
    writeFileSync(
      join(BRAND, `lockup${variant}${crop.suffix}.svg`),
      svgDoc({
        width: lockupW,
        height: h,
        viewBox: `${crop.x} ${crop.y} ${crop.w} ${crop.h}`,
        body,
        title: 'Icon Labs',
      }),
    )
  }
  reported += `lockup${crop.suffix || ' (serré)'}  ${lockupW} × ${h}  rapport ${(crop.w / crop.h).toFixed(4)}\n`
}

/* ---- 3. le favicon : le « i » et son point, détourés dans le mot-image ---- */

/* Le mot-image ne tient pas dans un carré de 16 px — la charte lui impose
   96 px de large au minimum. Le favicon est donc le « i » et son point
   détaché, qui est l'un des trois traits signature du dessin. Il n'est pas
   redessiné : le tracé du mot-image est **détouré** sur la lettre, puis posé
   dans un carré d'encre. Un carré pris directement dans la source ne pouvait
   pas convenir — la lettre est haute et étroite, et tout carré assez grand
   pour la contenir attrapait le « c » voisin.                               */
const iH = stem.bottom - dot.top + 1
const iW = iRight - iLeft + 1
const m = 3                                   // marge de détourage, en pixels source
const clip = { x: iLeft - m, y: dot.top - m, w: iW + m * 2, h: iH + m * 2 }

const SQ = 100
const targetH = SQ * 0.66                     // la lettre occupe 66 % du carré : en deçà,
                                              // le point et la hampe se rejoignent à 16 px
const k = targetH / clip.h
const iconBody = [
  '  <defs>',
  `    <clipPath id="i"><rect x="${clip.x}" y="${clip.y}" width="${clip.w}" height="${clip.h}"/></clipPath>`,
  '  </defs>',
  `  <rect width="${SQ}" height="${SQ}" fill="${INK}"/>`,
  `  <g transform="translate(${(SQ / 2 - (clip.x + clip.w / 2) * k).toFixed(3)} ${(SQ / 2 - (clip.y + clip.h / 2) * k).toFixed(3)}) scale(${k.toFixed(6)})" clip-path="url(#i)">`,
  ...paths.map((d) => `    <path fill="${PAPER}" fill-rule="evenodd" d="${d}"/>`),
  '  </g>',
].join('\n')

writeFileSync(
  join(BRAND, 'favicon.svg'),
  svgDoc({ width: 64, height: 64, viewBox: `0 0 ${SQ} ${SQ}`, body: iconBody, title: 'Icon Labs' }),
)

/* ---- 4. l'image sociale, 1200 × 630 -------------------------------------- */

/* Noir au sol, mot-image en blanc, et une bande de Neural Blue en pied : c'est
   l'un des emplois que la charte réserve à la couleur signature — elle occupe
   une surface, elle ne souligne pas. La dominante sombre de la charte vaut
   aussi pour l'image sociale : c'est la première chose qu'on voit du site.   */
const OG_W = 1200, OG_H = 630
const BAND = 24
const markW = 560
const scale = markW / box.w
const markH = box.h * scale
const ogBody = [
  `  <rect width="${OG_W}" height="${OG_H}" fill="${INK}"/>`,
  `  <rect y="${OG_H - BAND}" width="${OG_W}" height="${BAND}" fill="${SIGNAL}"/>`,
  `  <g transform="translate(${((OG_W - markW) / 2 - box.x0 * scale).toFixed(2)} ${((OG_H - BAND - markH) / 2 - box.y0 * scale).toFixed(2)}) scale(${scale.toFixed(6)})">`,
  ...paths.map((d) => `    <path fill="${PAPER}" fill-rule="evenodd" d="${d}"/>`),
  '  </g>',
].join('\n')

writeFileSync(
  join(BRAND, 'og.svg'),
  svgDoc({ width: OG_W, height: OG_H, viewBox: `0 0 ${OG_W} ${OG_H}`, body: ogBody, title: 'Icon Labs' }),
)

/* ---- 5. les bitmaps dérivés ---------------------------------------------- */

const png = (src, out, w, h) =>
  execFileSync('magick', ['-background', 'none', join(BRAND, src), '-resize', `${w}x${h}`, join(BRAND, out)])

png('og.svg', 'og.png', OG_W, OG_H)
png('favicon.svg', 'icon-512.png', 512, 512)
png('favicon.svg', 'apple-touch-icon.png', 180, 180)
execFileSync('magick', [join(BRAND, 'favicon.svg'), '-resize', '64x64', join(ROOT, 'public', 'favicon.png')])

/* ------------------------------------------------------------- rapport --- */

console.log(`source        ${W} × ${H}`)
console.log(`encre         ${box.w} × ${box.h} à (${box.x0}, ${box.y0})`)
console.log(`hampe du i    ${cap} px  →  zone de protection ${pad} px sur les quatre côtés`)
console.log(`point du i    ${dot.bottom - dot.top + 1} px, détaché de ${stem.top - dot.bottom - 1} px`)
console.log(`largeur du i  ${iW} px`)
console.log(`tracés        ${paths.length}`)
process.stdout.write(reported)
console.log('écrits        lockup{,-ink}{,-safe}.svg, favicon.svg, og.svg, og.png, icon-512.png, apple-touch-icon.png, ../favicon.png')
