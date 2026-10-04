import { chromium } from 'playwright-core'
const base = 'http://127.0.0.1:3123'
const browser = await chromium.launch({ executablePath: '/usr/bin/microsoft-edge-stable' })
const ok = (label, got, want) => console.log(`${got === want ? '✓' : '❌'} ${label.padEnd(52)} ${got}${got === want ? '' : `   (attendu ${want})`}`)

// --- bureau : la langue de l'adresse se propage aux liens internes
let page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(base + '/fr/methode', { waitUntil: 'networkidle' })
const hrefs = await page.$$eval('header a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')))
ok('en-tête /fr/methode : tous les liens préfixés /fr', hrefs.every((h) => h.startsWith('/fr')), true)
console.log('   ', hrefs.join(' '))
await page.click('header a[href="/fr/studio"]')
await page.waitForURL('**/fr/studio')
ok('clic « Le studio » depuis /fr/methode', new URL(page.url()).pathname, '/fr/studio')

// --- bascule de langue : même page, autre langue
await page.click('header button:has-text("EN"), header a:has-text("EN")')
await page.waitForURL('**/en/studio', { timeout: 5000 })
ok('bascule EN depuis /fr/studio', new URL(page.url()).pathname, '/en/studio')
ok('lang du document après bascule', await page.getAttribute('html', 'lang'), 'en')

// --- CTA d'une page interne : ancre contact sur la home, langue conservée
const cta = await page.$eval('a.primary', (a) => a.getAttribute('href'))
ok('CTA d’une page interne (langue conservée)', cta, '/en#contact')

// --- pied de page
const foot = await page.$$eval('footer a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')))
ok('pied de page : tous les liens préfixés /en', foot.every((h) => h.startsWith('/en')), true)
console.log('   ', foot.join(' '))

// --- adresse neutre : pas de préfixe imposé aux liens
await page.goto(base + '/', { waitUntil: 'networkidle' })
const bare = await page.$$eval('header a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')))
ok('home neutre : aucun lien préfixé', bare.every((h) => !/^\/(fr|en)(\/|$)/.test(h)), true)
await page.close()

// --- mobile : le menu s'ouvre et navigue
page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto(base + '/fr', { waitUntil: 'networkidle' })
await page.click('header button[aria-controls], header button[aria-expanded]')
await page.waitForTimeout(400)
const visible = await page.isVisible('header a[href="/fr/methode"], nav a[href="/fr/methode"]')
ok('menu mobile ouvert : lien Méthode visible', visible, true)
await page.click('a[href="/fr/methode"]')
await page.waitForURL('**/fr/methode')
ok('navigation depuis le menu mobile', new URL(page.url()).pathname, '/fr/methode')
const stillOpen = await page.isVisible('header [data-open="true"]').catch(() => false)
ok('menu refermé après navigation', !stillOpen, true)
await page.close()
await browser.close()
