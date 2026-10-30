/**
 * Símbolo "b" da Blips como laços 2D, em unidades de cena (y para cima).
 *
 * ARQUIVO GERADO por `apps/docs/scripts/gen-blips-mark.ts` a partir de
 * `@blips/brand/assets/mark/blips-mark.svg` — não edite à mão; rode
 * `pnpm exec tsx scripts/gen-blips-mark.ts` em apps/docs para regenerar.
 *
 * Cúbicas achatadas em 24 passos e simplificadas com RDP
 * (tolerância 2.5 unidades do SVG), 124 pontos no total. A caixa do
 * contorno externo está centrada na origem e tem a altura do prisma original
 * (0.49363).
 *
 * Topologia (regra even-odd do SVG): o contorno do "b" é uma faixa simples cujo
 * interior do bojo é vazio; dentro do bojo há um disco sólido com um furo
 * concêntrico (uma rosca). São dois sólidos disjuntos.
 *
 * Sentido: o sólido fica à esquerda de toda aresta orientada — contorno e disco
 * anti-horários, furo horário — então a normal externa de toda aresta
 * `e = fim - início` é `(e.y, -e.x)`, a mesma regra do triângulo.
 */

import type { Vec2 } from "../types";

/** Contorno do "b": haste + bojo, interior do bojo vazio (anti-horário). */
export const BLIPS_MARK_OUTER: readonly Vec2[] = [
  [-0.15086, 0.24682],
  [-0.15809, 0.2449],
  [-0.16881, 0.23691],
  [-0.17376, 0.22859],
  [-0.17516, 0.22052],
  [-0.17507, -0.08722],
  [-0.17047, -0.11613],
  [-0.16043, -0.14461],
  [-0.15175, -0.16095],
  [-0.14006, -0.1779],
  [-0.11937, -0.20037],
  [-0.09286, -0.22095],
  [-0.06468, -0.23533],
  [-0.04273, -0.24209],
  [-0.02504, -0.24543],
  [0.00611, -0.24682],
  [0.04043, -0.24265],
  [0.05546, -0.23852],
  [0.07313, -0.23154],
  [0.10234, -0.2141],
  [0.11673, -0.20224],
  [0.13141, -0.18747],
  [0.15101, -0.16113],
  [0.16548, -0.13102],
  [0.17268, -0.10288],
  [0.17493, -0.0829],
  [0.17516, -0.0625],
  [0.17128, -0.03176],
  [0.16556, -0.01129],
  [0.15976, 0.00242],
  [0.14666, 0.02581],
  [0.12478, 0.05225],
  [0.09846, 0.07465],
  [0.07491, 0.08832],
  [0.04499, 0.09929],
  [0.01961, 0.10391],
  [-0.0336, 0.10429],
  [-0.0442, 0.09937],
  [-0.05364, 0.08832],
  [-0.05718, 0.07369],
  [-0.05384, 0.05947],
  [-0.04438, 0.04808],
  [-0.03878, 0.04479],
  [-0.03148, 0.04305],
  [0.01325, 0.04185],
  [0.03861, 0.03611],
  [0.04963, 0.03151],
  [0.06435, 0.02261],
  [0.07512, 0.01403],
  [0.08656, 0.00231],
  [0.10025, -0.01737],
  [0.10843, -0.03776],
  [0.11236, -0.05787],
  [0.11225, -0.08502],
  [0.11063, -0.09561],
  [0.10556, -0.11248],
  [0.10068, -0.12355],
  [0.0929, -0.13617],
  [0.08453, -0.14649],
  [0.0703, -0.16021],
  [0.04601, -0.17534],
  [0.02091, -0.18294],
  [0.00219, -0.18495],
  [-0.01265, -0.18398],
  [-0.02662, -0.18194],
  [-0.04077, -0.1776],
  [-0.05556, -0.17046],
  [-0.06866, -0.16167],
  [-0.08653, -0.14462],
  [-0.09934, -0.12676],
  [-0.10955, -0.10224],
  [-0.11311, -0.08368],
  [-0.1139, 0.22382],
  [-0.11909, 0.23541],
  [-0.12733, 0.24267],
  [-0.13754, 0.24665],
];

/** Disco sólido dentro do bojo (anti-horário). */
export const BLIPS_MARK_DISC: readonly Vec2[] = [
  [-0.01448, 0.00502],
  [-0.02964, 0.00128],
  [-0.04075, -0.00381],
  [-0.0522, -0.01206],
  [-0.06309, -0.0238],
  [-0.07061, -0.03653],
  [-0.07493, -0.04869],
  [-0.077, -0.06447],
  [-0.07597, -0.07876],
  [-0.07289, -0.09062],
  [-0.06644, -0.10421],
  [-0.05672, -0.11655],
  [-0.04694, -0.12498],
  [-0.03438, -0.13231],
  [-0.02192, -0.13646],
  [-0.0131, -0.13783],
  [0.006, -0.13756],
  [0.02122, -0.13343],
  [0.03246, -0.1278],
  [0.04283, -0.12003],
  [0.05272, -0.10911],
  [0.05909, -0.09902],
  [0.06522, -0.08187],
  [0.06639, -0.07432],
  [0.06615, -0.05511],
  [0.06191, -0.03999],
  [0.0561, -0.02861],
  [0.0486, -0.01882],
  [0.03901, -0.00956],
  [0.02666, -0.0019],
  [0.01209, 0.00348],
  [0.00056, 0.00524],
];

/** Furo concêntrico do disco (horário). */
export const BLIPS_MARK_DISC_HOLE: readonly Vec2[] = [
  [0.00183, -0.03282],
  [0.01491, -0.03848],
  [0.02353, -0.04747],
  [0.02855, -0.05976],
  [0.02842, -0.0737],
  [0.02344, -0.08561],
  [0.01388, -0.09498],
  [0.00223, -0.1003],
  [-0.01254, -0.10028],
  [-0.02371, -0.09536],
  [-0.03338, -0.08611],
  [-0.03894, -0.07329],
  [-0.03876, -0.05825],
  [-0.03372, -0.0473],
  [-0.02421, -0.03771],
  [-0.01113, -0.03257],
];

/** Todos os laços, na ordem contorno, disco, furo do disco. */
export const BLIPS_MARK_LOOPS: readonly (readonly Vec2[])[] = [
  BLIPS_MARK_OUTER,
  BLIPS_MARK_DISC,
  BLIPS_MARK_DISC_HOLE,
];

/**
 * Polígonos sólidos para triangular as tampas: cada um é um contorno seguido
 * dos seus furos (o formato que o earcut espera).
 */
export const BLIPS_MARK_POLYGONS: readonly (readonly (readonly Vec2[])[])[] = [
  [BLIPS_MARK_OUTER],
  [BLIPS_MARK_DISC, BLIPS_MARK_DISC_HOLE],
];
