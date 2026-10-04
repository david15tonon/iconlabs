import { chromium } from 'playwright-core'
const out = process.argv[2]
const base = 'http://127.0.0.1:3123'
const browser = await chromium.launch({ executablePath: '/usr/bin/microsoft-edge-stable' })
const PAGES = ['/fr', '/en', '/fr/methode', '/en/methode', '/fr/studio', '/en/studio',
  '/fr/services/sites-experiences', '/en/services/sites-experiences',
  '/fr/services/plateformes', '/en/services/plateformes',
  '/fr/services/produits-ia', '/en/services/produits-ia',
  '/fr/services/mvp', '/en/services/mvp']
const VIEWS = [{ w: 1440, h: 900, n: 'desk' }, { w: 390, h: 844, n: 'mob' }]
for (const v of VIEWS) {
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: { width: v.w, height: v.h } })
    const errs = []
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
    /* Le chargeur du récit annule lui-même les images dépassées
    (AbortController) : `requestfailed` les signale, et ce ne sont pas des
    erreurs. Seul ce qui échoue pour une autre raison est retenu. */
    page.on('requestfailed', (r) => {
      const why = r.failure()?.errorText ?? ''
      if (why !== 'net::ERR_ABORTED') errs.push(`${why} ${r.url()}`)
    })
    const resp = []
    page.on('response', (r) => r.status() >= 400 && resp.push(`${r.status()} ${r.url()}`))
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.6) { scrollTo(0, y); await new Promise(r => setTimeout(r, 160)) }
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 600))
    })
    await page.waitForTimeout(1200)
    const name = `${v.n}${path.replace(/\//g, '_')}.png`
    await page.screenshot({ path: `${out}/${name}`, fullPage: true })
    const bad = [...errs, ...resp]
    console.log(`${v.n} ${path.padEnd(32)} ${bad.length ? '❌ ' + bad.join(' | ').slice(0, 200) : '✓'}`)
    await page.close()
  }
}
await browser.close()
