import { chromium } from 'playwright-core'
const base = 'http://127.0.0.1:3123'
const browser = await chromium.launch({ executablePath: '/usr/bin/microsoft-edge-stable' })

const PAGES = ['/fr', '/en', '/fr/methode', '/en/methode', '/fr/studio', '/en/studio',
  '/fr/services/sites-experiences', '/en/services/sites-experiences',
  '/fr/services/plateformes', '/en/services/plateformes',
  '/fr/services/produits-ia', '/en/services/produits-ia',
  '/fr/services/mvp', '/en/services/mvp']

const AUDIT = () => {
  const lum = ([r, g, b]) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  }
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05) }
  const rgb = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number)
  const alpha = (s) => { const m = s.match(/[\d.]+/g); return m && m.length > 3 ? Number(m[3]) : 1 }
  const mix = (fg, a, bg) => fg.map((c, i) => c * a + bg[i] * (1 - a))

  /* L'opacité d'un élément s'applique à TOUT son sous-arbre et se compose en
     remontant : c'est elle qui masquait les trois échecs de la section
     contact, puisque `getComputedStyle().color` n'en porte aucune trace. */
  const opacityOf = (el) => {
    let o = 1, n = el
    while (n && n !== document.documentElement) { o *= Number(getComputedStyle(n).opacity); n = n.parentElement }
    return o
  }
  const bgOf = (el) => {
    let n = el
    while (n) {
      const c = getComputedStyle(n).backgroundColor
      if (c && alpha(c) === 1 && !/rgba\(0, 0, 0, 0\)/.test(c)) return rgb(c)
      n = n.parentElement
    }
    return [255, 255, 255]
  }

  const fails = []
  let checked = 0, invisible = 0
  for (const el of document.querySelectorAll('body *')) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('')
    if (!text) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') continue
    if (el.matches(':disabled')) continue          // WCAG 1.4.3 exempte l'inactif
    const size = parseFloat(cs.fontSize)
    const weight = Number(cs.fontWeight) || 400
    const large = size >= 24 || (size >= 18.66 && weight >= 700)
    const o = opacityOf(el)
    /* Opacité composée nulle : le nœud n'affiche rien, il n'a pas de
       contraste à mesurer. Le compter en échec ferait passer une apparition
       en retard pour un défaut de couleur — mais le passer sous silence
       masquerait un texte qui ne s'affiche jamais, d'où le compteur. */
    if (o === 0) { invisible++; continue }
    const bg = bgOf(el)
    const fg = mix(rgb(cs.color), alpha(cs.color) * o, bg)
    const r = ratio(fg, bg)
    checked++
    if (r < (large ? 3 : 4.5)) fails.push({ r: +r.toFixed(2), size, tag: el.tagName, cls: String(el.className).slice(0, 30), text: text.slice(0, 36) })
  }
  return { checked, invisible, fails, probe: +ratio(mix([11, 11, 11], 0.72, [242, 54, 10]), [242, 54, 10]).toFixed(2) }
}

let total = 0, bad = 0, unrevealed = 0

/* `v-reveal` fait monter l'opacité de 0 à 1 en 0,9 s, délai compris. Mesurer
   pendant le fondu, c'est mesurer une couleur que personne ne lit : la
   première version de cette sonde a compté 158 « échecs » qui n'étaient que
   des éléments pris à mi-apparition. On fait donc défiler toute la page pour
   déclencher l'observateur, puis on attend que plus un seul `.reveal` ne soit
   en retard, puis on laisse passer la transition — et seulement alors on
   mesure. Ce qui n'est jamais apparu est compté à part, jamais mesuré. */
async function settle(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.6) {
      scrollTo(0, y); await new Promise((r) => setTimeout(r, 160))
    }
    scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 400))
  })
  await page.waitForFunction(
    () => [...document.querySelectorAll('.reveal')].every((el) => el.classList.contains('is-in')),
    null, { timeout: 15000 },
  ).catch(() => {})
  await page.waitForTimeout(1400)

  /* Sous charge, un saut de défilement peut passer entre deux rappels de
     l'IntersectionObserver et laisser un élément à l'opacité zéro. On le
     repasse devant l'écran plutôt que de le déclarer en échec : c'est
     l'observateur qu'on a raté, pas une couleur qui manque. */
  let late = await page.$$('.reveal:not(.is-in)')
  if (late.length) {
    for (const el of late) { await el.scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(120) }
    await page.waitForTimeout(1400)
  }
  return page.evaluate(() => document.querySelectorAll('.reveal:not(.is-in)').length)
}

for (const path of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(base + path, { waitUntil: 'networkidle' })
  const late = await settle(page)
  unrevealed += late

  /* Deux positions : le bas de page, et le haut — où le récit est épinglé et
     pose son texte sur le canvas, fond que seule cette position montre. */
  const seen = []
  for (const y of ['bottom', 'top']) {
    if (y === 'top') { await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600) }
    seen.push(await page.evaluate(AUDIT))
  }
  const checked = Math.max(...seen.map((r) => r.checked))
  const blind = Math.max(...seen.map((r) => r.invisible))
  const fails = seen.flatMap((r) => r.fails)
  total += checked; bad += fails.length
  console.log(`${path.padEnd(34)} ${String(checked).padStart(4)} éléments  ${fails.length ? '❌ ' + fails.length : '✓'}${blind ? `  (${blind} invisibles, non mesurés)` : ''}`)
  for (const f of fails) console.log('   ', f.r, f.size + 'px', f.tag, f.cls, '|', f.text)
  if (path === '/fr') console.log(`   (sonde : l'ancien réglage encre-72%-sur-vermillon mesure ${seen[0].probe} — la mesure voit bien l'échec)`)
  await page.close()
}
console.log(`\n${total} éléments textuels mesurés sur 14 pages, ${bad} sous le seuil, ${unrevealed} jamais apparus.`)
if (bad || unrevealed) process.exitCode = 1
await browser.close()
