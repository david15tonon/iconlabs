import { chromium } from 'playwright-core'
const browser = await chromium.launch({ executablePath: '/usr/bin/microsoft-edge-stable' })
for (let run = 1; run <= 4; run++) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://127.0.0.1:3123/fr/services/mvp', { waitUntil: 'networkidle' })
  const h0 = await page.evaluate(() => document.body.scrollHeight)
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.6) { scrollTo(0, y); await new Promise(r => setTimeout(r, 160)) }
    scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 400))
  })
  const h1 = await page.evaluate(() => document.body.scrollHeight)
  await page.waitForTimeout(1500)
  const late = await page.evaluate(() => [...document.querySelectorAll('.reveal:not(.is-in)')].map(el => {
    const r = el.getBoundingClientRect()
    return { tag: el.tagName, cls: el.className, top: Math.round(r.top + scrollY), h: Math.round(r.height), text: el.textContent.trim().slice(0, 30) }
  }))
  console.log(`run ${run}: hauteur ${h0} -> ${h1}, en retard:`, JSON.stringify(late))
  await page.close()
}
await browser.close()
