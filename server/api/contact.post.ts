/**
 * Réception du formulaire de contact.
 *
 * Tant qu'aucune destination n'est configurée, la route le dit franchement :
 * elle répond `delivered: false` et le formulaire bascule alors sur l'ouverture
 * du client mail du visiteur. Rien n'affiche « envoyé » si rien n'est parti.
 *
 * Pour activer l'envoi réel, définir NUXT_CONTACT_WEBHOOK (Formspree, Resend,
 * n8n, Slack… toute URL acceptant un POST JSON).
 */

type Payload = { name?: string; email?: string; message?: string; locale?: string }

export default defineEventHandler(async (event) => {
  const body = await readBody<Payload>(event)

  const name = (body?.name ?? '').trim().slice(0, 120)
  const email = (body?.email ?? '').trim().slice(0, 180)
  const message = (body?.message ?? '').trim().slice(0, 4000)

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }

  const destination = process.env.NUXT_CONTACT_WEBHOOK
  if (!destination) {
    return { ok: true, delivered: false, reason: 'no-destination-configured' as const }
  }

  await $fetch(destination, {
    method: 'POST',
    body: { name, email, message, locale: body?.locale ?? 'en', source: 'iconlabs.site' },
  })

  return { ok: true, delivered: true }
})
