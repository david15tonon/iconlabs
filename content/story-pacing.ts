/**
 * Plan de rythme du récit au scroll.
 *
 * Règle : la distance de scroll est décidée indépendamment de la durée du
 * plan. Une image peut être tenue (hold) pendant une partie du défilement
 * pour laisser le temps de lire — ce n'est pas la même chose qu'un
 * mouvement lent.
 *
 * `scrollVh`   distance de défilement active du battement, en hauteurs d'écran
 * `frames`     intervalle d'images [début, fin] dans la séquence
 * `motionEnd`  part du battement où le mouvement s'arrête ; au-delà, l'image
 *              finale est tenue (1 = mouvement sur toute la durée)
 * `copy`       index de la scène dans content/site.ts → story[], ou null
 * `fade`       [entrée début, entrée fin, sortie début, sortie fin] en
 *              progression locale du battement
 */

export type Beat = {
  id: string
  scrollVh: number
  frames: [number, number]
  motionEnd: number
  copy: number | null
  fade: [number, number, number, number]
}

export const pacing: Beat[] = [
  {
    id: 'opening',
    scrollVh: 1.4,
    frames: [0, 29],
    motionEnd: 1,
    copy: 0,
    fade: [0.08, 0.26, 0.82, 0.98],
  },
  {
    // Battement de transition : le trait se courbe, seul dans le cadre.
    // Aucun texte — on laisse le mouvement parler.
    id: 'transition-a',
    scrollVh: 1.6,
    frames: [30, 54],
    motionEnd: 1,
    copy: null,
    fade: [0, 0, 1, 1],
  },
  {
    id: 'craft',
    scrollVh: 2.2,
    frames: [55, 89],
    motionEnd: 0.62,       // la structure finie reste à l'écran pendant la lecture
    copy: 1,
    fade: [0.22, 0.42, 0.88, 1],
  },
  {
    id: 'transition-b',
    scrollVh: 1.2,
    frames: [90, 109],
    motionEnd: 1,
    copy: null,
    fade: [0, 0, 1, 1],
  },
  {
    id: 'ship',
    scrollVh: 1.8,
    frames: [110, 134],
    motionEnd: 0.65,
    copy: 2,
    fade: [0.18, 0.4, 0.94, 1],
  },
]

/** Distance de défilement épinglé totale, en hauteurs d'écran. */
export const totalScrollVh = pacing.reduce((n, b) => n + b.scrollVh, 0)
