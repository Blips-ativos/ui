/**
 * Constantes e geometria da cena de LEDs do "b".
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/settings.ts
 * (MIT). Blips: o triângulo canônico (centrado no canvas, altura proporcional à
 * tela) foi trocado pelo símbolo "b" (`./mark-data.ts`, gerado do SVG em dois
 * níveis: o moderado para arestas/LEDs/raycast e o denso só para a silhueta),
 * posicionado pelo enquadramento da Hero. Os LEDs deixam de ser 24 por aresta e
 * passam a ser distribuídos por comprimento de arco ao longo de todos os laços
 * do "b" (contorno, disco e furo), mantendo a densidade do original. Saíram os
 * modos de destaque de aresta (lil-gui) e a escala global mutável da cena.
 */

import {
  BLIPS_MARK_LOOPS,
  BLIPS_MARK_SILHOUETTE_LOOPS,
  BLIPS_MARK_SOLIDS,
} from "./mark-data";
import type { MarkFraming, Point } from "./types";

export interface RenderSize {
  width: number;
  height: number;
}

/** Densidade de referência do original: 24 LEDs por aresta do triângulo. */
export const LEDS_PER_EDGE = 24;
export const HERO_CANVAS_MAX_CSS = 720;
const MIN_SIM_HEIGHT = 360;
/** Profundidade da faixa de LEDs (para dentro do sólido), relativa à altura do "b". */
const LED_DEPTH_TO_MARK_HEIGHT = 0.022;
const LED_DEPTH_MIN_PX = 2;
const LED_DEPTH_MAX_PX = 9;
const LED_TANGENT_GAP_PX = 1;

export const LED_EMITTER_MESH_EXPANSION_PX = 1;
export const NOISE_ROTATION_START_SECONDS = 10;
export const BRIGHTNESS_MIN_HOVER_MULTIPLIER = 4;
export const BRIGHTNESS_MIN_HOVER_SMOOTHING = 0.2;

export interface BrushSettings {
  glowEnabled?: boolean;
  /** Raio do brilho do ponteiro, em alturas do "b" (o original usava px fixos). */
  glowRadius?: number;
  glowStrength?: number;
  glowSmoothing?: number;
  glowFacingEnabled?: boolean;
  glowFacingFullDeg?: number;
  glowFacingZeroDeg?: number;
  /** Distância (em alturas do "b") em que as linhas somem ao aproximar o mouse. */
  linesFadeDistance?: number;
}

export interface BrushState extends BrushSettings {
  x: number;
  y: number;
  active: boolean;
  inside?: boolean;
  isMouse?: boolean;
}

export interface SceneTunables {
  ledIntensity: number;
  brightnessMin: number;
  brightnessMinDark: number;
  brightnessMax: number;
}

export const DEFAULT_BRUSH: BrushSettings = {
  glowEnabled: true,
  glowRadius: 1,
  glowStrength: 1,
  glowSmoothing: 0.23,
  glowFacingEnabled: true,
  glowFacingFullDeg: 90,
  glowFacingZeroDeg: 100,
  linesFadeDistance: 0.6,
};

export const TUNABLE_DEFAULTS = {
  ledIntensity: 1,
  brightnessMin: 0.09,
  brightnessMinDark: 0.05,
  brightnessMax: 1,
} as const;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface HoverRgbTintSettings {
  enabled: boolean;
  amount: number;
  /** Raio de influência de cada âncora de cor, em alturas do "b". */
  radius: number;
  power: number;
  responseSmoothing: number;
  edgeRedLinear: Rgb;
  edgeGreenLinear: Rgb;
  edgeBlueLinear: Rgb;
  edgeOverlap: number;
}

export const HOVER_RGB_TINT_DEFAULTS: HoverRgbTintSettings = {
  enabled: true,
  amount: 1,
  radius: 1.35,
  power: 3,
  responseSmoothing: 0.2,
  edgeRedLinear: { r: 0.896269, g: 0.027321, b: 0.051269 },
  edgeGreenLinear: { r: 0, g: 0.40724, b: 0.048172 },
  edgeBlueLinear: { r: 0, g: 0.278894, b: 1 },
  edgeOverlap: 1,
};

export function simulationFloorFactor(cssHeight: number) {
  return Math.max(1, MIN_SIM_HEIGHT / Math.max(1, cssHeight));
}

// ---------------------------------------------------------------------------
// Geometria do "b" em unidades do símbolo (y para cima).
// ---------------------------------------------------------------------------

const MARK_BOX = (() => {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  // A caixa do nível denso (a silhueta que se vê); o moderado cabe nela.
  for (const loop of BLIPS_MARK_SILHOUETTE_LOOPS) {
    for (const [x, y] of loop) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    width: maxX - minX,
    height: maxY - minY,
  };
})();

/** Largura / altura da caixa do "b" — usada pelo enquadramento. */
export const MARK_ASPECT = MARK_BOX.width / MARK_BOX.height;

const MARK_PERIMETER_UNITS = BLIPS_MARK_LOOPS.reduce(
  (total, loop) => total + loopLength(loop.map(([x, y]) => ({ x, y }))),
  0
);

/**
 * Total de LEDs: o original tinha LEDS_PER_EDGE * 3 num perímetro de 2·√3·h
 * (triângulo equilátero de altura h). Mantém o mesmo espaçamento relativo à
 * altura, agora no perímetro somado dos laços do "b" (~120 LEDs).
 */
export const LED_COUNT = Math.max(
  12,
  Math.round(
    (LEDS_PER_EDGE * 3 * MARK_PERIMETER_UNITS) /
      (2 * Math.sqrt(3) * MARK_BOX.height)
  )
);

/** O "b" em px de simulação (y para baixo), pronto para LEDs e shaders. */
export interface MarkGeometry {
  center: Point;
  /** Altura da caixa do "b" em px de simulação (faz o papel da altura do triângulo). */
  height: number;
  /** Raio do círculo envolvente, a partir de `center`. */
  boundRadius: number;
  loops: readonly (readonly Point[])[];
  /** Laços que são furos (sentido horário no SVG). */
  holes: readonly boolean[];
  /** Arestas (a.x, a.y, b.x, b.y) de todos os laços, em sequência. */
  segments: Float32Array;
  segmentCount: number;
  /** Fecho convexo (para mirar os raios), como pares x, y. */
  hull: Float32Array;
  hullCount: number;
  /**
   * Laços do nível denso (silhueta), na mesma ordem e transformação de `loops`.
   * Só para a malha e o campo de distância, assados uma vez por rebuild.
   */
  silhouetteLoops: readonly (readonly Point[])[];
  /** Sólidos para o earcut: índices de laços (contorno seguido dos furos). */
  solids: readonly (readonly number[])[];
}

/** Enquadramento em px de simulação (o de CSS vezes o fator da simulação). */
export function simulationFraming(
  framing: MarkFraming,
  factor: number
): MarkFraming {
  return {
    centerX: framing.centerX * factor,
    centerY: framing.centerY * factor,
    height: framing.height * factor,
  };
}

export function markGeometry(framing: MarkFraming): MarkGeometry {
  const scale = framing.height / MARK_BOX.height;
  const toSim = (loop: readonly (readonly [number, number])[]) =>
    loop.map(([x, y]) => ({
      x: framing.centerX + (x - MARK_BOX.centerX) * scale,
      y: framing.centerY - (y - MARK_BOX.centerY) * scale,
    }));
  const loops = BLIPS_MARK_LOOPS.map(toSim);
  const silhouetteLoops = BLIPS_MARK_SILHOUETTE_LOOPS.map(toSim);
  const holes = BLIPS_MARK_LOOPS.map((loop) => signedAreaYUp(loop) < 0);
  const center = { x: framing.centerX, y: framing.centerY };
  let boundRadius = 0;
  let segmentCount = 0;
  for (const loop of loops) {
    segmentCount += loop.length;
    for (const p of loop)
      boundRadius = Math.max(
        boundRadius,
        Math.hypot(p.x - center.x, p.y - center.y)
      );
  }
  const segments = new Float32Array(segmentCount * 4);
  let s = 0;
  for (const loop of loops) {
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i]!;
      const b = loop[(i + 1) % loop.length]!;
      segments[s++] = a.x;
      segments[s++] = a.y;
      segments[s++] = b.x;
      segments[s++] = b.y;
    }
  }
  const hullPoints = convexHull(loops.flat());
  const hull = new Float32Array(hullPoints.length * 2);
  for (const [i, p] of hullPoints.entries()) {
    hull[i * 2] = p.x;
    hull[i * 2 + 1] = p.y;
  }
  return {
    center,
    height: framing.height,
    boundRadius,
    loops,
    holes,
    segments,
    segmentCount,
    hull,
    hullCount: hullPoints.length,
    silhouetteLoops,
    solids: BLIPS_MARK_SOLIDS,
  };
}

export interface LedPosition {
  x: number;
  y: number;
  /** Ângulo da tangente (direção do laço) no ponto. */
  angle: number;
  /** Normal externa do contorno (num furo, aponta para dentro do furo). */
  nx: number;
  ny: number;
  /** Posição no laço, de 0 a 1 (furos invertidos para girar no mesmo sentido). */
  u: number;
  /** Meio comprimento tangencial do quad deste LED. */
  halfLength: number;
}

export interface MarkLedLayout {
  positions: LedPosition[];
  /** Profundidade da faixa de LEDs, do contorno para dentro do sólido. */
  depth: number;
}

/**
 * Distribui LED_COUNT LEDs ao longo dos laços, proporcional ao comprimento de
 * cada um (maiores restos) e uniformes por comprimento de arco dentro do laço.
 */
export function markLedLayout(geometry: MarkGeometry): MarkLedLayout {
  const lengths = geometry.loops.map(loopLength);
  const total = lengths.reduce((a, b) => a + b, 0) || 1;
  const counts = largestRemainder(
    lengths.map((length) => (LED_COUNT * length) / total),
    LED_COUNT
  );
  const positions: LedPosition[] = [];
  for (const [loopIndex, loop] of geometry.loops.entries()) {
    const length = lengths[loopIndex] ?? 0;
    const count = counts[loopIndex] ?? 0;
    if (count <= 0 || length <= 0) continue;
    const spacing = length / count;
    const halfLength = Math.max(0.5, spacing * 0.5 - LED_TANGENT_GAP_PX * 0.5);
    const hole = geometry.holes[loopIndex] === true;
    let segment = 0;
    let segmentStart = 0;
    for (let i = 0; i < count; i++) {
      const s = (i + 0.5) * spacing;
      let a = loop[segment]!;
      let b = loop[(segment + 1) % loop.length]!;
      let segLength = Math.hypot(b.x - a.x, b.y - a.y);
      while (s > segmentStart + segLength && segment < loop.length - 1) {
        segmentStart += segLength;
        segment++;
        a = loop[segment]!;
        b = loop[(segment + 1) % loop.length]!;
        segLength = Math.hypot(b.x - a.x, b.y - a.y);
      }
      const t = segLength > 0 ? (s - segmentStart) / segLength : 0;
      const ex = b.x - a.x;
      const ey = b.y - a.y;
      const inv = segLength > 0 ? 1 / segLength : 0;
      // Sólido à esquerda no SVG (y para cima) ⇒ em px (y para baixo) a normal
      // externa da aresta e é (-e.y, e.x).
      const u = s / length;
      positions.push({
        x: a.x + ex * t,
        y: a.y + ey * t,
        angle: Math.atan2(ey, ex),
        nx: -ey * inv,
        ny: ex * inv,
        u: hole ? 1 - u : u,
        halfLength,
      });
    }
  }
  const depth = Math.min(
    LED_DEPTH_MAX_PX,
    Math.max(LED_DEPTH_MIN_PX, geometry.height * LED_DEPTH_TO_MARK_HEIGHT)
  );
  return { positions, depth };
}

/** Regra par-ímpar sobre todas as arestas (mesma regra do SVG). */
export function isPointInMark(x: number, y: number, geometry: MarkGeometry) {
  const seg = geometry.segments;
  let inside = false;
  for (let i = 0; i < geometry.segmentCount; i++) {
    const ax = seg[i * 4]!;
    const ay = seg[i * 4 + 1]!;
    const bx = seg[i * 4 + 2]!;
    const by = seg[i * 4 + 3]!;
    if (ay > y !== by > y) {
      const cx = ax + ((y - ay) * (bx - ax)) / (by - ay);
      if (x < cx) inside = !inside;
    }
  }
  return inside;
}

/** Distância com sinal até o "b" (negativa dentro), em px de simulação. */
export function markSdf(x: number, y: number, geometry: MarkGeometry) {
  const seg = geometry.segments;
  let best = Number.POSITIVE_INFINITY;
  for (let i = 0; i < geometry.segmentCount; i++) {
    const ax = seg[i * 4]!;
    const ay = seg[i * 4 + 1]!;
    const ex = seg[i * 4 + 2]! - ax;
    const ey = seg[i * 4 + 3]! - ay;
    const vx = x - ax;
    const vy = y - ay;
    const h = Math.max(
      0,
      Math.min(1, (vx * ex + vy * ey) / (ex * ex + ey * ey || 1))
    );
    best = Math.min(best, Math.hypot(vx - ex * h, vy - ey * h));
  }
  return isPointInMark(x, y, geometry) ? -best : best;
}

function loopLength(loop: readonly Point[]) {
  let length = 0;
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i]!;
    const b = loop[(i + 1) % loop.length]!;
    length += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return length;
}

function signedAreaYUp(loop: readonly (readonly [number, number])[]) {
  let area = 0;
  for (let i = 0; i < loop.length; i++) {
    const [ax, ay] = loop[i]!;
    const [bx, by] = loop[(i + 1) % loop.length]!;
    area += ax * by - bx * ay;
  }
  return area / 2;
}

function largestRemainder(shares: number[], total: number) {
  const counts = shares.map((share) => Math.floor(share));
  let missing = total - counts.reduce((a, b) => a + b, 0);
  const order = shares
    .map((share, i) => ({ i, rest: share - Math.floor(share) }))
    .sort((a, b) => b.rest - a.rest);
  for (let k = 0; missing > 0 && order.length > 0; k++, missing--) {
    const slot = order[k % order.length]!.i;
    counts[slot] = (counts[slot] ?? 0) + 1;
  }
  return counts;
}

/** Cadeia monótona de Andrew. */
function convexHull(points: readonly Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  if (sorted.length < 3) return sorted;
  const cross = (o: Point, a: Point, b: Point) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: Point[] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2]!, lower[lower.length - 1]!, p) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  const upper: Point[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i]!;
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2]!, upper[upper.length - 1]!, p) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}
