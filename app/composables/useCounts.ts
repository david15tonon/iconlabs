import { work } from '~~/content/site'

/**
 * Les quantités du bandeau de preuves, CALCULÉES depuis `work`.
 *
 * Elles étaient écrites à la main jusqu'au 2026-10-21, et elles mentaient :
 * « 7 systèmes livrés » était faux deux fois — trois des sept fiches ne sont
 * pas des systèmes (un audit de pile, un accompagnement, et Adjani Privé qui
 * n'est pas livré), et le compte des livraisons est six. Un chiffre recopié
 * à la main finit toujours par survivre à la donnée qu'il décrivait.
 *
 * La définition que ces comptes appliquent, et que la note du bandeau
 * reprend mot pour mot :
 *   · un SYSTÈME EN PRODUCTION est un système qu'un client utilise tous les
 *     jours — `kind: 'system'` ET `status: 'live'` ;
 *   · un audit (`audit`) et un accompagnement (`advisory`) sont des
 *     livrables, pas des systèmes : ils comptent dans les projets livrés,
 *     jamais dans les systèmes ;
 *   · un projet en cours ne compte nulle part.
 *
 * Le pays se lit APRÈS la virgule de `place` (« Cotonou, Bénin » → Bénin) :
 * trois villes de trois pays différents, et compter les villes donnerait le
 * même nombre aujourd'hui tout en devenant faux au premier second client
 * d'un même pays.
 *
 * Un huitième client ajouté dans `content/site.ts` met la bande à jour sans
 * qu'une ligne soit touchée ici.
 */

/** La part du code transférée au client à la livraison. */
const OWNERSHIP = 100

const country = (place: string) => place.split(',').pop()!.trim()

export function useCounts() {
  const shipped = work.filter((w) => w.status === 'live')

  return {
    /** Systèmes qu'un client utilise tous les jours. */
    systems: shipped.filter((w) => w.kind === 'system').length,
    /** Tout ce qui est livré, systèmes et livrables confondus. */
    shipped: shipped.length,
    /** Pays distincts, lus dans `place`. */
    countries: new Set(shipped.map((w) => country(w.place.fr))).size,
    /** Un engagement, pas un relevé : il ne se déduit d'aucune fiche. */
    ownership: OWNERSHIP,
  } as const
}

export type CountKey = keyof ReturnType<typeof useCounts>
