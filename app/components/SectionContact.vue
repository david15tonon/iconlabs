<script setup lang="ts">
import { contact, brand, cta } from '~~/content/site'
import { useLocale } from '~/composables/useSite'

const { locale, tr } = useLocale()

/* Le composant sert la passe 9 de la home ET la page /contact. Sur la page,
 * le titre est déjà porté par `PageHero` : le répéter donnerait deux `<h1>`
 * de même texte à la suite. */
withDefaults(defineProps<{ heading?: boolean }>(), { heading: true })

/* L'HEURE LOCALE N'EST PAS ÉCRITE EN DUR, et ce n'est pas un raffinement :
 * les deux fuseaux ne coïncident pas toute l'année. Cotonou est à UTC+1 en
 * permanence ; Paris passe à UTC+2 d'avril à octobre. « GMT+1 · Paris &
 * Cotonou » serait donc faux la moitié de l'année. Le navigateur calcule, et
 * les deux villes sont nommées séparément.
 *
 * Le calcul est fait au CLIENT seulement : un rendu serveur daterait l'heure
 * de la génération de la page, qui peut avoir des heures — et sur une page
 * statique, des jours. Le repli ne montre donc que le nom des villes. */
const now = ref<Date | null>(null)
let tick: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  now.value = new Date()
  tick = setInterval(() => { now.value = new Date() }, 30_000)
})
onBeforeUnmount(() => clearInterval(tick))

const clock = (tz: string) =>
  now.value
    ? new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-GB', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
      }).format(now.value)
    : ''

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
        <h2 v-if="heading" class="breaks">{{ tr(contact.heading) }}</h2>
        <p class="lede">{{ tr(contact.body) }}</p>
        <p class="direct">
          <a :href="`mailto:${brand.email}`">{{ brand.email }}</a>
          <span class="note label">{{ tr(cta.callNote) }}</span>
        </p>

        <!-- L'AGENDA. `cal.enabled` est à `false` et RIEN n'est rendu tant
             qu'il l'est : pas de case grise, pas de faux créneau, pas de
             « agenda bientôt disponible ». Le jour où Cal.com est branché,
             poser l'URL et passer le drapeau. -->
        <a
          v-if="contact.cal.enabled && contact.cal.url"
          class="cal"
          :href="contact.cal.url"
          target="_blank"
          rel="noopener"
        >{{ tr(cta.call) }}</a>

        <!-- Les deux villes, et leur heure. Deux lignes qui disent qu'on est
             joignable, et quand — pas une décoration de fuseau. -->
        <dl class="zones">
          <span class="zones-label label">{{ tr(contact.zonesLabel) }}</span>
          <div v-for="zone in contact.zones" :key="zone.tz">
            <dt>{{ tr(zone.label) }}</dt>
            <dd>{{ clock(zone.tz) }}</dd>
          </div>
        </dl>
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
/* La dernière passe : l'encre bleue prend toute la feuille. Tout le texte y
   passe en blanc — 5,17 de contraste, quand le noir n'y tient que 3,81 et ne
   passerait donc que du grand titre (DESIGN.md § Colors). */
#contact {
  background: var(--signal);
  color: var(--on-signal);
}

.inner { display: grid; gap: clamp(2.5rem, 5vw, 5rem); align-items: start; }
/* Moitié gauche d'une grille 1 / 1 : à 72 px le titre s'y repliait sur
   quatre lignes. */
h2 { font-size: var(--fs-xl); margin: 0 0 1.5rem; }

/* Le secondaire sur cet aplat est `--on-signal-soft` (#EAF1FF, 4,56) et non
   le #D7E3FD qu'on écrit d'instinct : celui-ci tombe à 4,01, de l'autre côté
   du seuil. Et rien n'est atténué par l'opacité — à 72 % le blanc tomberait
   à 3,52, et la note comme les libellés, tous au plancher de 13 px,
   passeraient dessous. La hiérarchie est portée par le ton et la graisse,
   qui ne coûtent rien au contraste. */
#contact .lede,
#contact .zones-label,
#contact .note { color: var(--on-signal-soft); }
#contact label span { color: var(--on-signal); }

.direct { margin-top: 2rem; display: grid; gap: 0.5rem; }
.direct a {
  font-size: var(--fs-lg);
  color: var(--on-signal);
  border-bottom: 1px solid currentColor;
  justify-self: start;
}
.note { font-size: var(--fs-xs); }

/* L'horloge. Sur l'aplat bleu comme ailleurs, le secondaire passe par
   `--on-signal-soft` (4,56) — jamais par l'opacité, qui ferait tomber ces
   13 px sous le seuil. L'heure reste à l'encre pleine : c'est elle qu'on
   vient lire. */
.zones { margin-top: 2rem; display: grid; gap: 0.5rem; }
.zones-label { font-size: var(--fs-xs); }
.zones > div {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  justify-content: space-between;
  max-width: 18rem;
}
.zones dt { font-size: var(--fs-sm); color: var(--on-signal-soft); }
/* Les chiffres d'une horloge se comparent de ligne à ligne : la chasse fixe
   les aligne, et DM Mono l'est déjà — on ne demande que les tabulaires. */
.zones dd { font-size: var(--fs-sm); color: var(--on-signal); font-variant-numeric: tabular-nums; }
/* Tant que le navigateur n'a pas calculé, la ligne ne saute pas : la place
   de l'heure est réservée. */
.zones dd:empty::before { content: '\2007\2007:\2007\2007'; color: var(--on-signal-soft); }

.cal {
  display: inline-block;
  margin-top: 1.5rem;
  background: var(--on-signal);
  color: var(--signal);
  padding: var(--sp-md) var(--sp-lg);
  font-size: var(--fs-sm);
  font-weight: 500;
}

form { display: grid; gap: 1.25rem; }
label { display: grid; gap: 0.5rem; }
label span { font-size: var(--fs-xs); font-weight: 500; }

/* Le champ de saisie est la seule exception nommée par la charte à la règle
   « pas de filet » : un champ doit se voir. Sur l'aplat bleu il reste donc
   vide et se signale par son contour, à `--on-signal-line` (#C2D6FD, 3,53
   sur le bleu — le seuil d'un élément d'interface est 3,0). Un remplissage
   sombre y poserait une boîte noire flottante sur l'encre, c'est-à-dire un
   second niveau de surélévation que le système n'a pas. Le focus épaissit le
   ton de la bordure, jamais par un halo flou. */
input, textarea {
  background: transparent;
  color: var(--on-signal);
  border: 1px solid var(--on-signal-line);
  padding: var(--sp-md);
  resize: vertical;
  transition: border-color var(--duration-press) var(--ease-out);
}
input:focus, textarea:focus { outline: none; border-color: var(--on-signal); }

button {
  justify-self: start;
  margin-top: 0.75rem;
  background: var(--on-signal);
  color: var(--signal);
  border: 0;
  padding: var(--sp-md) var(--sp-lg);
  font-size: var(--fs-sm);
  font-weight: 500;
  cursor: pointer;
  transition:
    background var(--duration-press) var(--ease-out),
    color var(--duration-press) var(--ease-out);
}
button:hover:not(:disabled) { background: var(--ground); color: var(--on-ground); }
/* L'état en attente se distingue par le ton, pas par l'opacité : le sol noir
   porte le blanc à 19,68 — l'opacité, elle, aurait fait passer le libellé
   sous le seuil. */
button:disabled { background: var(--ground); color: var(--on-ground-soft); cursor: progress; }

/* Un message d'état se lit : pas d'opacité ici non plus (cf. plus haut). */
.feedback { font-size: var(--fs-sm); color: var(--on-signal); max-width: var(--measure); }

@media (min-width: 980px) { .inner { grid-template-columns: 1fr 1fr; } }
</style>
