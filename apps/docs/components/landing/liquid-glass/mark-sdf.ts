/**
 * Campo de distância com sinal do "b" da Blips, assado uma única vez na GPU.
 *
 * Blips (sem origem direta no vgpu). Substitui o `sdfBakeFragment`/`logoSdf` do
 * exemplo typegpu-liquid-glass (vercel-labs/vgpu, MIT, revisão
 * af8ab2106af8d33b5f10e60b588a0ae5fb0b02de761800e82b85bf82726a3bc4), que
 * desenhava o logo do TypeGPU com polígonos + círculos. Aqui o contorno vem de
 * `./mark-hex-data.ts` (o "b" hexagonal, gerado por
 * `scripts/gen-blips-mark-hex.ts`, ~30 arestas) e o campo é exato:
 * menor distância a todas as arestas + sinal par-ímpar. O laço sobre as
 * arestas roda só nesta passada (1024² texels, uma vez) — nunca por quadro.
 *
 * Convenções mantidas do exemplo, para máscara/aro/normais funcionarem igual:
 * - o campo cobre o quadrado `uv ∈ [0,1]²` ↔ `ponto = (uv·2 − 1)·FIELD_EXTENT`
 *   no "espaço do vidro" (y para baixo, como o `uv` do vgpu);
 * - nesse espaço o "b" tem altura `MARK_GLASS_HEIGHT` (≈ a do logo original na
 *   tela do exemplo), com folga até a borda do campo para o blur;
 * - o valor gravado é `distância · DISTANCE_GAIN`, negativo dentro — o mesmo
 *   ganho efetivo (≈1.2) que o exemplo aplicava ao ler o campo.
 */

import type { MarkLoops } from "../blips-led/mark-data";
import { BLIPS_MARK_HEX_LOOPS } from "./mark-hex-data";

export { BLIPS_MARK_SOURCE_BOX } from "./mark-hex-data";

/** Altura do "b" no espaço do vidro (o logo do exemplo media ≈1.09). */
export const MARK_GLASS_HEIGHT = 1.1;
/** Meia-largura do campo no espaço do vidro (o "b" vai até ±0.55 em y). */
export const FIELD_EXTENT = 0.75;
/** Ganho da distância gravada (o exemplo lia `campo · 0.72` sobre `q = 1.2·ponto`). */
export const DISTANCE_GAIN = 1.2;

/** Caixa do contorno externo do "b" hexagonal (unidades de cena, y para cima). */
export const MARK_HEX_BOX = markBounds(BLIPS_MARK_HEX_LOOPS);

/** Largura / altura do contorno externo do "b". */
export const MARK_ASPECT = MARK_HEX_BOX.aspect;

/**
 * Passada de bake (efeito de tela cheia do vgpu: o vértice é gerado e entrega
 * `uv` em @location(0)). R = distância com sinal · ganho.
 */
export const MARK_SDF_BAKE_WGSL = /* wgsl */ `
struct BakeParams {
  count: u32,
  gain: f32,
  extent: f32,
  pad: f32,
};
@group(0) @binding(0) var<uniform> bake: BakeParams;
// Arestas (a.xy, b.xy) já no espaço do vidro.
@group(0) @binding(1) var<storage, read> segments: array<vec4f>;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let p = (uv * 2.0 - 1.0) * bake.extent;
  let count = min(bake.count, arrayLength(&segments));
  var inside = false;
  var distanceSq = 1e30;
  for (var i = 0u; i < count; i = i + 1u) {
    let seg = segments[i];
    let a = seg.xy;
    let b = seg.zw;
    let edge = b - a;
    let toPoint = p - a;
    let t = clamp(dot(toPoint, edge) / max(dot(edge, edge), 1e-12), 0.0, 1.0);
    let delta = toPoint - edge * t;
    distanceSq = min(distanceSq, dot(delta, delta));
    // Par-ímpar: raio horizontal para +x.
    if ((a.y > p.y) != (b.y > p.y)) {
      let crossX = a.x + (p.y - a.y) * edge.x / edge.y;
      if (p.x < crossX) {
        inside = !inside;
      }
    }
  }
  let distance = sqrt(distanceSq);
  return vec4f(select(distance, -distance, inside) * bake.gain, 0.0, 0.0, 1.0);
}
`;

/**
 * Arestas do nível denso no espaço do vidro: centradas na caixa do contorno,
 * escaladas para `MARK_GLASS_HEIGHT` e com y invertido (os dados têm y para
 * cima; o `uv` do vgpu, y para baixo). A inversão troca o sentido dos laços,
 * o que o sinal par-ímpar ignora.
 */
export function markSegmentData(loops: MarkLoops = BLIPS_MARK_HEX_LOOPS) {
  const bounds = markBounds(loops);
  const scale = MARK_GLASS_HEIGHT / bounds.height;
  const count = loops.reduce((sum, loop) => sum + loop.length, 0);
  const data = new Float32Array(count * 4);
  let offset = 0;
  for (const loop of loops) {
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i];
      const b = loop[(i + 1) % loop.length];
      if (!a || !b) continue;
      data[offset++] = (a[0] - bounds.centerX) * scale;
      data[offset++] = -(a[1] - bounds.centerY) * scale;
      data[offset++] = (b[0] - bounds.centerX) * scale;
      data[offset++] = -(b[1] - bounds.centerY) * scale;
    }
  }
  return { data, count: offset / 4 };
}

/** Caixa do contorno externo (primeiro laço), que contém os demais. */
function markBounds(loops: MarkLoops) {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (const [x, y] of loops[0] ?? []) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  const width = maxX - minX;
  const height = maxY - minY;
  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    height,
    aspect: width / height,
  };
}
