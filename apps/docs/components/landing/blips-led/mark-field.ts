/**
 * Silhueta do "b" em resolução cheia, assada uma vez por rebuild.
 *
 * Blips (sem origem no vgpu). O chão precisa de duas coisas da silhueta, em
 * px de tela (DPR cheio): cobertura da borda (AA) e a distância ao contorno
 * perto dela (o brilho rente ao "b"). Em vez de percorrer as arestas por
 * pixel a cada quadro, um alvo rg16float do tamanho da caixa do "b" (mais a
 * faixa) recebe, num único draw com blend MIN:
 * - a malha do nível denso triangulada pelo earcut (sólidos com furos; o disco
 *   do bojo é sólido) → G = 0 dentro, no centro de cada pixel;
 * - uma cápsula por aresta densa → R = distância exata à aresta mais próxima,
 *   saturada em `band`.
 * Ver `shaders/silhouette-field.wgsl`.
 */

import earcut from "earcut";
import type { MarkGeometry, RenderSize } from "./settings";
import type { Point } from "./types";

/** Floats por vértice: posição (2), aresta a.xy b.xy (4), tipo (1). */
export const MARK_FIELD_VERTEX_FLOATS = 7;

/** Faixa mínima/máxima em que o campo denso vale, em px de tela. */
const FIELD_BAND_MIN_PX = 8;
const FIELD_BAND_MAX_PX = 64;
/** Folga além do raio do brilho rente (`near_outer` do chão) e na caixa. */
const FIELD_BAND_PAD_PX = 4;

/** Simulação → tela: `tela = origem + sim · escala`. */
export interface SimToScreen {
  originX: number;
  originY: number;
  scale: number;
}

/** Retângulo do campo em px de tela (inteiros) e a largura da faixa. */
export interface MarkFieldLayout {
  originX: number;
  originY: number;
  width: number;
  height: number;
  band: number;
}

/**
 * A faixa cobre o brilho rente ao contorno (`near_outer` = 0.046 do raio de
 * referência no chão) com folga; além dela o chão usa o SDF distante.
 */
export function markFieldLayout(
  mark: MarkGeometry,
  transform: SimToScreen,
  presentation: RenderSize,
  referenceRadiusPx: number
): MarkFieldLayout {
  const band = Math.min(
    FIELD_BAND_MAX_PX,
    Math.max(
      FIELD_BAND_MIN_PX,
      Math.ceil(referenceRadiusPx * 0.046 + FIELD_BAND_PAD_PX)
    )
  );
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (const loop of mark.silhouetteLoops) {
    for (const p of loop) {
      const s = toScreen(p, transform);
      minX = Math.min(minX, s.x);
      minY = Math.min(minY, s.y);
      maxX = Math.max(maxX, s.x);
      maxY = Math.max(maxY, s.y);
    }
  }
  const pad = band + FIELD_BAND_PAD_PX;
  const x0 = Math.max(0, Math.floor(minX - pad));
  const y0 = Math.max(0, Math.floor(minY - pad));
  const x1 = Math.min(presentation.width, Math.ceil(maxX + pad));
  const y1 = Math.min(presentation.height, Math.ceil(maxY + pad));
  return {
    originX: x0,
    originY: y0,
    width: Math.max(1, x1 - x0),
    height: Math.max(1, y1 - y0),
    band,
  };
}

/**
 * Vértices (lista de triângulos) em px do campo: primeiro a malha (tipo 0),
 * depois as cápsulas das arestas (tipo 1).
 */
export function markFieldVertices(
  mark: MarkGeometry,
  transform: SimToScreen,
  layout: MarkFieldLayout
): Float32Array {
  const loops = mark.silhouetteLoops.map((loop) =>
    loop.map((p) => {
      const s = toScreen(p, transform);
      return { x: s.x - layout.originX, y: s.y - layout.originY };
    })
  );
  const values: number[] = [];
  const push = (p: Point, kind: number, seg?: readonly number[]) => {
    values.push(
      p.x,
      p.y,
      seg?.[0] ?? 0,
      seg?.[1] ?? 0,
      seg?.[2] ?? 0,
      seg?.[3] ?? 0,
      kind
    );
  };

  for (const solid of mark.solids) {
    const flat: number[] = [];
    const holes: number[] = [];
    for (const [k, loopIndex] of solid.entries()) {
      const loop = loops[loopIndex] ?? [];
      if (k > 0) holes.push(flat.length / 2);
      for (const p of loop) flat.push(p.x, p.y);
    }
    const indices = earcut(flat, holes.length ? holes : undefined);
    for (const index of indices) {
      push({ x: flat[index * 2] ?? 0, y: flat[index * 2 + 1] ?? 0 }, 0);
    }
  }

  const w = layout.band;
  for (const loop of loops) {
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i]!;
      const b = loop[(i + 1) % loop.length]!;
      const length = Math.hypot(b.x - a.x, b.y - a.y);
      if (length <= 0) continue;
      const tx = (b.x - a.x) / length;
      const ty = (b.y - a.y) / length;
      const nx = -ty;
      const ny = tx;
      const seg = [a.x, a.y, b.x, b.y] as const;
      const corner = (base: Point, t: number, n: number): Point => ({
        x: base.x + tx * t + nx * n,
        y: base.y + ty * t + ny * n,
      });
      const c0 = corner(a, -w, -w);
      const c1 = corner(b, w, -w);
      const c2 = corner(b, w, w);
      const c3 = corner(a, -w, w);
      for (const c of [c0, c1, c2, c0, c2, c3]) push(c, 1, seg);
    }
  }
  return new Float32Array(values);
}

function toScreen(p: Point, transform: SimToScreen): Point {
  return {
    x: transform.originX + p.x * transform.scale,
    y: transform.originY + p.y * transform.scale,
  };
}
