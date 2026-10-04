<script setup lang="ts">
import { contact, brand, cta } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

const { locale, tr } = useLocale()

const form = reactive({ name: '', email: '', message: '' })
const state = ref<'idle' | 'sending' | 'delivered' | 'mailto' | 'error'>('idle')

/** Repli honnête : on ouvre la messagerie du visiteur, sans prétendre avoir envoyé. */
function openMailClient() {
  const subject = encodeURIComponent(`[Icon Labs] ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
  window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`
}

async function submit() {
  if (state.value === 'sending') return
  state.value = 'sending'
  try {
    const res = await $fetch<{ delivered: boolean }>('/api/contact', {
      method: 'POST',
      body: { ...form, locale: locale.value },
    })
    if (res.delivered) {
      state.value = 'delivered'
      form.name = form.email = form.message = ''
    } else {
      state.value = 'mailto'
      openMailClient()
    }
  } catch {
    state.value = 'error'
  }
}

const feedback = computed(() => {
  switch (state.value) {
    case 'delivered':
      return tr({ fr: 'Message envoyé. Réponse sous 24 h ouvrées.', en: 'Message sent. We reply within one business day.' })
    case 'mailto':
      return tr({
        fr: `Votre messagerie vient de s'ouvrir avec le message prérempli — il n'est pas encore parti, il reste à l'envoyer depuis votre boîte mail.`,
        en: `Your mail app just opened with the message prefilled — it has not been sent yet, you still need to send it from your inbox.`,
      })
    case 'error':
      return tr({
        fr: `L'envoi a échoué. Écrivez-nous directement à ${brand.email}.`,
        en: `Sending failed. Write to us directly at ${brand.email}.`,
      })
    default:
      return ''
  }
})
</script>

<template>
  <section id="contact" class="section">
    <div class="shell inner">
      <div v-reveal>
        <p class="kicker"><span class="kicker-num">{{ contact.index }}</span>{{ tr(contact.kicker) }}</p>
        <h2>{{ tr(contact.heading) }}</h2>
        <p class="lede">{{ tr(contact.body) }}</p>
        <p class="direct">
          <a :href="`mailto:${brand.email}`">{{ brand.email }}</a>
          <span class="note">{{ tr(cta.callNote) }}</span>
        </p>
      </div>

      <form v-reveal="120" @submit.prevent="submit">
        <label>
          <span>{{ tr(contact.fields.name) }}</span>
          <input v-model="form.name" type="text" name="name" required autocomplete="name" />
        </label>
        <label>
          <span>{{ tr(contact.fields.email) }}</span>
          <input v-model="form.email" type="email" name="email" required autocomplete="email" />
        </label>
        <label>
          <span>{{ tr(contact.fields.project) }}</span>
          <textarea v-model="form.message" name="message" rows="4" required />
        </label>

        <button type="submit" :disabled="state === 'sending'">
          {{ state === 'sending' ? tr(contact.fields.sending) : tr(contact.fields.send) }}
        </button>

        <p v-if="feedback" class="feedback" role="status" aria-live="polite">{{ feedback }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
/* L'aplat signature. Tout le texte y passe en encre : 4,97 de contraste,
   seule combinaison qui tienne le petit texte sur ce vermillon (BRAND.md). */
#contact {
  background: var(--signal);
  color: var(--ink);
}

.inner { display: grid; gap: clamp(2.5rem, 5vw, 5rem); align-items: start; }
h2 { font-size: var(--fs-2xl); white-space: pre-line; margin: 1rem 0 1.5rem; }

/* Rien n'est atténué sur cet aplat. L'encre y tient à 4,97 et le seuil AA
   est à 4,50 : à 72 % d'opacité on tombe à 3,71, et l'étiquette, la note et
   les libellés du formulaire — tous à 11 px — passaient sous le seuil. Ce
   défaut était antérieur à la refonte ; la hiérarchie est désormais portée
   par le corps et la graisse, qui ne coûtent rien au contraste. */
#contact .kicker,
#contact .lede,
#contact .note,
#contact label span { color: var(--ink); }

/* Et cette pastille s'inverse ici : --signal-deep sur l'aplat --signal ne
   se détacherait pas. Encre et papier, comme le bouton d'envoi (17,47). */
#contact .kicker-num { background: var(--ink); color: var(--paper); }

.direct { margin-top: 2rem; display: grid; gap: 0.5rem; }
.direct a {
  font-size: var(--fs-lg);
  color: var(--ink);
  border-bottom: 1px solid currentColor;
  justify-self: start;
}
.note { font-size: var(--fs-xs); letter-spacing: 0.14em; text-transform: uppercase; }

form { display: grid; gap: 1.25rem; }
label { display: grid; gap: 0.5rem; }
label span {
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
input, textarea {
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgb(11 11 11 / 0.35);
  padding: 0.75rem 0;
  resize: vertical;
  transition: border-color 0.3s var(--ease);
}
input:focus, textarea:focus { outline: none; border-bottom-color: var(--ink); }

button {
  justify-self: start;
  margin-top: 0.75rem;
  background: var(--ink);
  color: var(--paper);
  border: 1px solid var(--ink);
  padding: 0.9rem 2rem;
  font-size: var(--fs-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s var(--ease), color 0.3s var(--ease);
}
button:hover:not(:disabled) { background: transparent; color: var(--ink); }
button:disabled { opacity: 0.55; cursor: progress; }

/* Un message d'état se lit : pas d'opacité ici non plus (cf. plus haut). */
.feedback { font-size: var(--fs-sm); color: var(--ink); max-width: var(--measure); }

@media (min-width: 980px) { .inner { grid-template-columns: 1fr 1fr; } }
</style>
