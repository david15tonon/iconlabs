/**
 * Générateur de la séquence d'images du récit au scroll.
 *
 * ⚠️ PLACEHOLDER — ce script produit une séquence vectorielle déterministe qui
 * tient le rôle de la vidéo finale (celle qui doit être générée via Higgsfield).
 * Il existe pour que le moteur de scroll, le rythme et la lisibilité du texte
 * soient réellement testables dès maintenant. Quand les plans Higgsfield sont
 * prêts, on remplace public/story/ et manifest.json — le site ne change pas.
 *
 * Sortie : frames SVG dans <out>/svg, à convertir ensuite (voir tools/build-story.sh).
 */

import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const W = 1280
const H = 720
const OUT = process.argv[2] || '/tmp/story-build'

/* ---------------------------------------------------------------- découpage */
/* Chaque battement a sa propre plage d'images. Les transitions isolent le     */
/* sujet : le décor précédent est sorti, le suivant n'est pas encore entré.    */

const BEATS = [
  { id: 'opening',      from: 0,   to: 29  },  // le trait se trace
  { id: 'transition-a', from: 30,  to: 54  },  // le trait se courbe, seul
  { id: 'craft',        from: 55,  to: 89  },  // la structure s'assemble
  { id: 'transition-b', from: 90,  to: 109 },  // la matière entre
  { id: 'ship',         from: 110, to: 134 },  // le produit fini, recul caméra
]
const COUNT = BEATS[BEATS.length - 1].to + 1

/* ------------------------------------------------------------------ easings */

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
/** Progression locale d'un battement, pour une image donnée. */
const local = (i, beat) => clamp((i - beat.from) / Math.max(1, beat.to - beat.from))

/* ----------------------------------------------------------------- palette */
/* Reprise exacte des tokens de BRAND.md. Un SVG ne peut pas lire une variable
   CSS : ces constantes sont la seule duplication admise, et elles sont
   regroupées ici pour qu'un changement de charte se fasse en un seul endroit. */

const INK         = '#0B0B0B'  // --ink
const PAPER       = '#F4F1EC'  // --paper
const PAPER_RAISE = '#FFFFFF'  // --paper-raise
const SIGNAL      = '#F2360A'  // --signal
const SIGNAL_DEEP = '#C62A06'  // --signal-deep
const SIGNAL_LIFT = '#FF8A5B'  // signal éclairci, extrémité du dégradé

/* Rôles, et non pigments : depuis le passage du site en clair (2026-10-02) le
   sol est le papier et les tracés sont à l'encre. Le reste du script ne parle
   plus qu'en GROUND / MARK / SURFACE, de sorte qu'une nouvelle inversion ne
   touche que ces trois lignes.                                              */
const GROUND  = PAPER        // le fond du cadre
const MARK    = INK          // grille, contours, remplissages de maquette
const SURFACE = PAPER_RAISE  // le panneau surélevé du dernier battement

/* Opacités des tracés. Un trait sombre sur fond clair porte plus loin que
   l'inverse : les valeurs héritées du fond encre sont descendues d'un tiers
   environ, sans quoi la maquette filaire couvrirait l'arc vermillon.        */
const GRID_OP    = 0.05
const EDGE_OP    = 0.32   // contour des blocs, battement « craft »
const EDGE_FADE  = 0.14   // ce que ce contour perd en se remplissant
const MATTER_OP  = 0.05   // remplissage des blocs, battement « transition-b »
const SETTLED_OP = 0.06   // remplissage au battement final
const SETTLED_EDGE = 0.18

/* Opacité de référence de l'arc signature. Sur fond encre, un vermillon à 25 %
   brillait encore ; sur papier il vire au rose pâle et le récit perd son fil
   conducteur. Les battements se calent désormais sur cette valeur unique.   */
const ARC_OP = 0.75

/* ------------------------------------------------------------------- décors */

function defs() {
  return `
  <defs>
    <linearGradient id="stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1280" y2="0">
      <stop offset="0%"  stop-color="${SIGNAL_DEEP}"/>
      <stop offset="55%" stop-color="${SIGNAL}"/>
      <stop offset="100%" stop-color="${SIGNAL_LIFT}"/>
    </linearGradient>
    <linearGradient id="fill" gradientUnits="userSpaceOnUse" x1="760" y1="222" x2="980" y2="408">
      <stop offset="0%"  stop-color="${SIGNAL}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${SIGNAL_DEEP}" stop-opacity="0.06"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="${SIGNAL}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${SIGNAL}" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" filterUnits="userSpaceOnUse" x="-80" y="-80" width="1440" height="880">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`
}

function grid(opacity) {
  if (opacity <= 0.004) return ''
  const lines = []
  for (let x = 80; x < W; x += 80) lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`)
  for (let y = 80; y < H; y += 80) lines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`)
  return `<g stroke="${MARK}" stroke-width="1" opacity="${opacity.toFixed(3)}">${lines.join('')}</g>`
}

/* --------------------------------------------------------- rendu par battement */

function opening(p) {
  // Un trait unique se trace depuis le centre. Rien d'autre à l'écran.
  const half = 560 * easeOut(p)
  const g = grid(GRID_OP * easeOut(p))
  const halo = `<ellipse cx="${W / 2}" cy="${H / 2}" rx="${440 * p}" ry="${150 * p}" fill="url(#halo)"/>`
  return `${halo}${g}
    <line x1="${W / 2 - half}" y1="${H / 2}" x2="${W / 2 + half}" y2="${H / 2}"
          stroke="url(#stroke)" stroke-width="3" stroke-linecap="round" filter="url(#glow)"/>`
}

function transitionA(p) {
  // Le trait se courbe en arc — le sujet occupe seul le cadre.
  const e = easeInOut(p)
  const depth = 300 * e
  const y = H / 2 + 40 * e
  return `${grid(GRID_OP * (1 - e))}
    <path d="M 120 ${y} Q ${W / 2} ${y + depth} ${W - 120} ${y}"
          fill="none" stroke="url(#stroke)" stroke-width="3" stroke-linecap="round" filter="url(#glow)"/>`
}

/** L'arc signature, repris tel quel par les battements suivants. */
function arc(y, opacity = 1, width = 3) {
  return `<path d="M 120 ${y} Q ${W / 2} ${y + 300} ${W - 120} ${y}"
    fill="none" stroke="url(#stroke)" stroke-width="${width}" stroke-linecap="round"
    opacity="${opacity}" filter="url(#glow)"/>`
}

/** Blocs de la maquette filaire, en coordonnées absolues. */
const BLOCKS = [
  { x: 300, y: 150, w: 680, h: 46 },   // barre de navigation
  { x: 300, y: 222, w: 420, h: 112 },  // titre
  { x: 300, y: 356, w: 300, h: 18 },   // texte
  { x: 300, y: 390, w: 240, h: 18 },   // texte
  { x: 760, y: 222, w: 220, h: 186 },  // visuel
  { x: 300, y: 440, w: 210, h: 44 },   // bouton
]

function craft(p) {
  // La structure s'assemble bloc par bloc, en décalé. Traits seuls, pas de matière.
  const y = H / 2 + 40
  const out = [grid(GRID_OP * easeOut(p)), arc(y, ARC_OP - 0.25 * p, 2)]
  BLOCKS.forEach((b, i) => {
    const t = clamp((p - i * 0.11) / 0.4)
    if (t <= 0) return
    const e = easeOut(t)
    const cx = b.x + b.w / 2
    const cy = b.y + b.h / 2
    out.push(`<g transform="translate(${cx} ${cy}) scale(${(0.88 + 0.12 * e).toFixed(3)}) translate(${-cx} ${-cy})" opacity="${e.toFixed(3)}">
      <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="4"
            fill="none" stroke="${MARK}" stroke-opacity="${EDGE_OP}" stroke-width="1.5"/></g>`)
  })
  return out.join('')
}

function transitionB(p) {
  // La matière entre : les blocs se remplissent, une lumière balaie le cadre.
  const e = easeInOut(p)
  const y = H / 2 + 40
  const out = [grid(GRID_OP * (1 - 0.6 * e)), arc(y, ARC_OP - 0.25, 2)]
  BLOCKS.forEach((b, i) => {
    const t = clamp((p - i * 0.08) / 0.5)
    const accent = i === 4 ? 'url(#fill)' : MARK
    const op = i === 4 ? t : MATTER_OP * t
    out.push(`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="4"
      fill="${accent}" fill-opacity="${op.toFixed(3)}"
      stroke="${MARK}" stroke-opacity="${(EDGE_OP - EDGE_FADE * t).toFixed(3)}" stroke-width="1.5"/>`)
  })
  const sweep = -300 + (W + 600) * e
  out.push(`<rect x="${sweep}" y="0" width="160" height="${H}" fill="url(#halo)" opacity="0.5"/>`)
  return out.join('')
}

function ship(p) {
  // Recul caméra : l'ensemble se consolide en un objet unique, posé sur l'arc.
  const e = easeInOut(p)
  const scale = 1 - 0.18 * e
  const y = H / 2 + 40 + 60 * e
  const inner = BLOCKS.map((b, i) => {
    const accent = i === 4 ? 'url(#fill)' : MARK
    const op = i === 4 ? 1 : SETTLED_OP
    return `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="4"
      fill="${accent}" fill-opacity="${op}" stroke="${MARK}" stroke-opacity="${SETTLED_EDGE}" stroke-width="1.5"/>`
  }).join('')
  const frame = `<rect x="262" y="112" width="756" height="420" rx="10"
    fill="${SURFACE}" fill-opacity="${(0.9 * e).toFixed(3)}"
    stroke="url(#stroke)" stroke-opacity="${(0.55 * e).toFixed(3)}" stroke-width="2"/>`
  return `${grid(GRID_OP * 0.4)}
    <g transform="translate(${W / 2} ${H / 2}) scale(${scale.toFixed(4)}) translate(${-W / 2} ${-H / 2})">
      ${frame}${inner}
    </g>
    ${arc(y, ARC_OP - 0.15 + 0.4 * e, 3)}`
}

const RENDER = { opening, 'transition-a': transitionA, craft, 'transition-b': transitionB, ship }

/* ------------------------------------------------------------------- écriture */

rmSync(join(OUT, 'svg'), { recursive: true, force: true })
mkdirSync(join(OUT, 'svg'), { recursive: true })

for (let i = 0; i < COUNT; i++) {
  const beat = BEATS.find((b) => i >= b.from && i <= b.to)
  const body = RENDER[beat.id](local(i, beat))
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${GROUND}"/>${defs()}${body}
</svg>`
  writeFileSync(join(OUT, 'svg', `frame-${String(i).padStart(4, '0')}.svg`), svg)
}

writeFileSync(join(OUT, 'beats.json'), JSON.stringify({ count: COUNT, width: W, height: H, beats: BEATS }, null, 2))
console.log(`${COUNT} images SVG écrites dans ${join(OUT, 'svg')}`)
