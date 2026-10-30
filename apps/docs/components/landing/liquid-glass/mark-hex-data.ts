/**
 * "b" hexagonal da Blips em unidades de cena (y para cima), para a cena de
 * vidro líquido da home.
 *
 * ARQUIVO GERADO por `apps/docs/scripts/gen-blips-mark-hex.ts` — não edite à
 * mão. Construção geométrica numa grade de 60° a partir das proporções do
 * símbolo original: contorno (18 vértices), anel hexagonal (6) e furo (6).
 * O sólido fica à esquerda de toda aresta orientada.
 */

import type { MarkLoops } from "../blips-led/mark-data";

export const BLIPS_MARK_HEX_LOOPS: MarkLoops = [
  [
    [-0.175172, 0.220156],
    [-0.175172, -0.086188],
    [-0.094246, -0.226356],
    [0.09132, -0.226356],
    [0.184104, -0.065651],
    [0.09132, 0.095055],
    [-0.030383, 0.095055],
    [-0.057044, 0.079662],
    [-0.057044, 0.048876],
    [-0.030383, 0.033483],
    [0.055772, 0.033483],
    [0.113007, -0.065651],
    [0.055772, -0.164784],
    [-0.058698, -0.164784],
    [-0.1136, -0.06969],
    [-0.1136, 0.220156],
    [-0.128993, 0.246817],
    [-0.159779, 0.246817],
  ],
  [
    [0.071692, -0.065651],
    [0.035114, -0.002297],
    [-0.03804, -0.002297],
    [-0.074617, -0.065651],
    [-0.03804, -0.129004],
    [0.035114, -0.129004],
  ],
  [
    [0.033829, -0.065651],
    [0.016183, -0.096214],
    [-0.019109, -0.096214],
    [-0.036754, -0.065651],
    [-0.019109, -0.035087],
    [0.016183, -0.035087],
  ],
];

/**
 * Caixa do contorno do símbolo original (o `<path>` de `blips-mark.svg`) no
 * mesmo espaço dos laços acima.
 */
export const BLIPS_MARK_SOURCE_BOX = {
  centerX: 0,
  centerY: 0,
  height: 0.493634,
};
