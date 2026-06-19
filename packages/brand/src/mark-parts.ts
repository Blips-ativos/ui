// Partes nomeadas do b-mark, derivadas do MARK_PATH em tempo de carga.
//
// O MARK_PATH tem 3 subpaths (comandos "M "): [0] haste + silhueta externa do
// "b", [1] anel do bojo (o counter vazado) e [2] o miolo (ponto central).
// Separar o corpo do miolo permite animar o core (fade, scale-pop) por cima do
// corpo. Renderize body e core com `fill-rule="evenodd"`, igual ao MARK_PATH
// inteiro. Se o b-mark for um dia regerado com outra contagem de subpaths, esta
// suposição precisa ser revista.

import { MARK_PATH } from "./logo-paths";

const MARK_SUBPATHS = MARK_PATH.split(/(?=M )/).filter(Boolean);

/**
 * Corpo do b-mark sem o miolo — haste + anel do bojo (subpaths [0] e [1]).
 * Renderizar com `fill-rule="evenodd"`: o bojo fica vazado (sem o ponto central).
 */
export const MARK_BODY_PATH = MARK_SUBPATHS.slice(0, 2).join("");

/** Miolo do b-mark — só o ponto central (subpath [2]). */
export const MARK_CORE_PATH = MARK_SUBPATHS[2] ?? "";

/** Centro da bounding box de um subpath, no espaço do viewBox de origem. */
function bboxCenter(path: string): { x: number; y: number } {
  const nums = (path.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const round = (n: number) => Math.round(n * 10) / 10;
  return { x: round((minX + maxX) / 2), y: round((minY + maxY) / 2) };
}

/**
 * Centro do miolo no espaço do `MARK_VIEWBOX` (≈ `{ x: 515, y: 910.1 }`).
 * Útil como `transform-origin` para um scale-pop do core. Derivado da bounding
 * box do subpath [2] (inclui os pontos de controle de bézier — aproximação
 * suficiente, já que o miolo é praticamente circular).
 */
export const MARK_CORE_CENTER = bboxCenter(MARK_CORE_PATH);
