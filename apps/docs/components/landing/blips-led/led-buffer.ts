/**
 * Buffer dos LEDs (posição, brilho, cor) e a animação que o preenche a cada quadro.
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/led-buffer.ts
 * (MIT). Blips:
 * - os LEDs vêm de `markLedLayout` (todos os laços do "b", por comprimento de
 *   arco) em vez de 24 por aresta do triângulo; as normais são as externas do
 *   contorno (num furo, apontam para dentro do furo);
 * - as linhas coloridas correm num parâmetro normalizado de cada laço (`u`, de
 *   0 a 1): as três faixas percorrem contorno, disco e furo ao mesmo tempo, no
 *   mesmo sentido angular — tamanhos e velocidades convertidos do original
 *   (que media em índices de LED, de 72) para frações do laço;
 * - o SDF do triângulo (hover) virou o SDF do "b"; as três âncoras do "deploy"
 *   RGB (eram os meios das arestas) ficam em volta do círculo envolvente;
 * - saiu o modo de aresta destacada e a transição entre modos (lil-gui).
 */

import {
  type BrushState,
  type HoverRgbTintSettings,
  LED_COUNT,
  LEDS_PER_EDGE,
  type MarkGeometry,
  markLedLayout,
  markSdf,
  NOISE_ROTATION_START_SECONDS,
} from "./settings";
import type { Point } from "./types";

const LED_FLOATS = 8;
const COLOR_OFFSET = 4;
const MAX_FRAME_DELTA = 0.1;
const CLICK_SPEED_BOOST_PEAK = 10;
const EDGE_RED = { r: 0.896269, g: 0.027321, b: 0.051269 };
const EDGE_GREEN = { r: 0, g: 0.40724, b: 0.048172 };
const EDGE_BLUE = { r: 0, g: 0.278894, b: 1 };
const LUMA_R = 0.2126;
const LUMA_G = 0.7152;
const LUMA_B = 0.0722;

// O original media tudo em índices de LED num anel de 72 (3 × 24); aqui as
// mesmas grandezas viram frações do laço.
const ORIGINAL_RING = LEDS_PER_EDGE * 3;
const LINE_CENTERS_START = [6, 6, 6].map((v) => v / ORIGINAL_RING);
const LINE_VELOCITIES = [-3.302, -2.355, -1.636].map((v) => v / ORIGINAL_RING);
const LINE_SIZE_MIN = LEDS_PER_EDGE / ORIGINAL_RING;
const LINE_SIZE_MAX = (LEDS_PER_EDGE * 1.7) / ORIGINAL_RING;
const LINE_SIZE_MID = (LINE_SIZE_MIN + LINE_SIZE_MAX) / 2;
const LINE_SIZE_AMP = (LINE_SIZE_MAX - LINE_SIZE_MIN) / 2;
const LINE_SIZE_FREQ = [0.41, 0.31, 0.23] as const;
const LINE_SIZE_PHASE = [0, 2.1, 4.2] as const;
const LINE_FADE_FREQ = [0.52, 0.38, 0.28] as const;
const LINE_FADE_PHASE = [Math.PI / 2, 0.4, -0.6] as const;
const HOVER_FADE_SECONDS = 0.3;
const HOVER_HYSTERESIS = 1.2;
/** Âncoras do deploy RGB: fração do raio envolvente, em volta do centro. */
const DEPLOY_ANCHOR_RADIUS = 0.7;

export interface LedGeometryState {
  data: Float32Array;
  targetState: Float32Array;
  deployingState: Float32Array;
  normals: Float32Array;
  /** Posição `u` (0..1) de cada LED no seu laço. */
  fractions: Float32Array;
  geometry: MarkGeometry;
  markHeight: number;
  deployCenters: readonly [Point, Point, Point];
  animationClock: number;
  lastFrameTime: number | undefined;
  lineCenters: Float32Array;
  lineVelocities: Float32Array;
  glowState: Float32Array;
  glowDecaying: boolean;
  hoverTransition: number;
  hoverActive: boolean;
}

export interface HoverDeployAnimationState {
  factor: number;
  tint: Pick<
    HoverRgbTintSettings,
    | "amount"
    | "radius"
    | "power"
    | "edgeRedLinear"
    | "edgeGreenLinear"
    | "edgeBlueLinear"
    | "edgeOverlap"
  >;
}

/** Bytes do buffer de LEDs na GPU (struct Led = 2 × vec4f). */
export const LED_BUFFER_BYTES = LED_COUNT * LED_FLOATS * 4;

export function buildLedGeometry(
  geometry: MarkGeometry,
  previous?: LedGeometryState
): LedGeometryState {
  const layout = markLedLayout(geometry);
  const data = new Float32Array(LED_COUNT * LED_FLOATS);
  const targetState = new Float32Array(data.length);
  const deployingState = new Float32Array(data.length);
  const normals = new Float32Array(LED_COUNT * 2);
  const fractions = new Float32Array(LED_COUNT);
  for (const [i, p] of layout.positions.entries()) {
    if (i >= LED_COUNT) break;
    const base = i * LED_FLOATS;
    data[base] = p.x;
    data[base + 1] = p.y;
    data[base + 2] = 0;
    data[base + 3] = p.angle;
    data[base + COLOR_OFFSET] = 1;
    data[base + COLOR_OFFSET + 1] = 1;
    data[base + COLOR_OFFSET + 2] = 1;
    data[base + COLOR_OFFSET + 3] = 0;
    normals[i * 2] = p.nx;
    normals[i * 2 + 1] = p.ny;
    fractions[i] = p.u;
  }
  targetState.set(data);
  deployingState.set(data);
  const anchor = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    const r = geometry.boundRadius * DEPLOY_ANCHOR_RADIUS;
    return {
      x: geometry.center.x + Math.cos(rad) * r,
      y: geometry.center.y + Math.sin(rad) * r,
    };
  };
  return {
    data,
    targetState,
    deployingState,
    normals,
    fractions,
    geometry,
    markHeight: geometry.height,
    // Topo da haste (vermelho), bojo à direita (verde), base à esquerda (azul).
    deployCenters: [anchor(-100), anchor(25), anchor(155)],
    animationClock: previous?.animationClock ?? 0,
    lastFrameTime: previous?.lastFrameTime,
    lineCenters: previous?.lineCenters ?? Float32Array.from(LINE_CENTERS_START),
    lineVelocities:
      previous?.lineVelocities ?? Float32Array.from(LINE_VELOCITIES),
    glowState: previous?.glowState ?? new Float32Array(LED_COUNT),
    glowDecaying: previous?.glowDecaying ?? false,
    hoverTransition: previous?.hoverTransition ?? 0,
    hoverActive: previous?.hoverActive ?? false,
  };
}

export function computeLeds(
  leds: LedGeometryState,
  time: number,
  hoverDeploy?: HoverDeployAnimationState,
  brush?: BrushState
) {
  const firstFrame = leds.lastFrameTime === undefined;
  const frameDelta =
    leds.lastFrameTime === undefined
      ? 0
      : Math.max(0, Math.min(time - leds.lastFrameTime, MAX_FRAME_DELTA));
  leds.lastFrameTime = time;
  const clickBoost =
    1 +
    (CLICK_SPEED_BOOST_PEAK - 1) *
      Math.sin(clamp01(hoverDeploy?.factor ?? 0) * Math.PI);
  const boostedDelta = frameDelta * clickBoost;
  if (firstFrame && leds.animationClock < NOISE_ROTATION_START_SECONDS)
    leds.animationClock = NOISE_ROTATION_START_SECONDS;
  leds.animationClock += boostedDelta;
  const animTime = leds.animationClock;

  updateLines(leds, leds.targetState, animTime, boostedDelta);

  const linesHoverEnabled = (brush?.linesFadeDistance ?? 0) > 0;
  let hoverTransition = 0;
  if (linesHoverEnabled) {
    let hoverTarget = 0;
    if (
      brush?.active === true &&
      brush.isMouse === true &&
      brush.inside !== true
    ) {
      const enter = (brush.linesFadeDistance ?? 0) * leds.markHeight;
      // Fora do círculo envolvente + `enter` não há o que medir: poupa o SDF.
      const far =
        Math.hypot(
          brush.x - leds.geometry.center.x,
          brush.y - leds.geometry.center.y
        ) >
        leds.geometry.boundRadius + enter * HOVER_HYSTERESIS;
      const distance = far
        ? Number.POSITIVE_INFINITY
        : markSdf(brush.x, brush.y, leds.geometry);
      if (!leds.hoverActive && distance < enter) leds.hoverActive = true;
      else if (leds.hoverActive && distance > enter * HOVER_HYSTERESIS)
        leds.hoverActive = false;
      hoverTarget = leds.hoverActive ? 1 : 0;
    } else {
      leds.hoverActive = false;
    }
    if (leds.hoverTransition > 0.0001 || hoverTarget > 0) {
      const alpha =
        HOVER_FADE_SECONDS > 0
          ? 1 - Math.exp(-frameDelta / HOVER_FADE_SECONDS)
          : 1;
      leds.hoverTransition += (hoverTarget - leds.hoverTransition) * alpha;
    }
    hoverTransition = clamp01(leds.hoverTransition);
    if (hoverTransition > 0.0001) {
      const linesFade = 1 - hoverTransition;
      for (let i = 0; i < LED_COUNT; i++) {
        leds.targetState[i * LED_FLOATS + 2] =
          (leds.targetState[i * LED_FLOATS + 2] ?? 0) * linesFade;
      }
    }
  }

  leds.data.set(leds.targetState);

  const deployFactor = clamp01(hoverDeploy?.factor ?? 0);
  if (deployFactor > 0) {
    updateDeployingRgb(leds, leds.deployingState, hoverDeploy?.tint);
    lerpLedState(leds.data, leds.data, leds.deployingState, deployFactor);
  }

  const hoverGate = linesHoverEnabled ? hoverTransition : 1;
  const glowStrength = brush?.glowStrength ?? 0;
  const glowRadius = (brush?.glowRadius ?? 0) * leds.markHeight;
  const glowOn =
    brush?.active === true &&
    brush.isMouse === true &&
    brush.glowEnabled === true &&
    glowStrength > 0 &&
    glowRadius > 0;
  if (glowOn || leds.glowDecaying) {
    const smoothing = brush?.glowSmoothing ?? 0;
    const alpha = smoothing > 0 ? 1 - Math.exp(-frameDelta / smoothing) : 1;
    const px = brush?.x ?? 0;
    const py = brush?.y ?? 0;
    const facingOn = brush?.glowFacingEnabled === true;
    const facingCosFull = Math.cos(
      ((brush?.glowFacingFullDeg ?? 90) * Math.PI) / 180
    );
    const facingCosZero = Math.cos(
      ((brush?.glowFacingZeroDeg ?? 100) * Math.PI) / 180
    );
    const facingDenom = facingCosFull - facingCosZero;
    let anyActive = false;
    for (let i = 0; i < LED_COUNT; i++) {
      const base = i * LED_FLOATS;
      let target = 0;
      if (glowOn) {
        const dx = (leds.data[base] ?? 0) - px;
        const dy = (leds.data[base + 1] ?? 0) - py;
        const distance = Math.hypot(dx, dy);
        target = glowStrength * (1 - smoothstep(0, glowRadius, distance));
        if (facingOn && target > 0 && distance > 1e-4) {
          const cos =
            (leds.normals[i * 2] ?? 0) * (-dx / distance) +
            (leds.normals[i * 2 + 1] ?? 0) * (-dy / distance);
          const facing =
            facingDenom > 1e-6
              ? clamp01((cos - facingCosZero) / facingDenom)
              : cos >= facingCosFull
                ? 1
                : 0;
          target *= facing;
        }
      }
      const eased =
        (leds.glowState[i] ?? 0) + (target - (leds.glowState[i] ?? 0)) * alpha;
      leds.glowState[i] = eased;
      if (eased > 0.0001) {
        anyActive = true;
        const lift = eased * hoverGate;
        if (lift > 0.0001)
          leds.data[base + 2] = mix(leds.data[base + 2] ?? 0, 1, lift);
      }
    }
    leds.glowDecaying = glowOn || anyActive;
  }
}

function updateLines(
  leds: LedGeometryState,
  target: Float32Array,
  animTime: number,
  boostedDelta: number
) {
  for (let k = 0; k < 3; k++) {
    leds.lineCenters[k] = wrap01(
      (leds.lineCenters[k] ?? 0) + (leds.lineVelocities[k] ?? 0) * boostedDelta
    );
  }
  const fadeTime = animTime - NOISE_ROTATION_START_SECONDS;
  const halfByBand: number[] = [];
  const plateauByBand: number[] = [];
  const fadeByBand: number[] = [];
  for (let k = 0; k < 3; k++) {
    const size =
      LINE_SIZE_MID +
      LINE_SIZE_AMP *
        Math.sin(
          fadeTime * (LINE_SIZE_FREQ[k] ?? 0) + (LINE_SIZE_PHASE[k] ?? 0)
        );
    const half = Math.max(1 / ORIGINAL_RING, size * 0.5);
    halfByBand[k] = half;
    plateauByBand[k] = half * 0.5;
    fadeByBand[k] =
      0.5 +
      0.5 *
        Math.sin(
          fadeTime * (LINE_FADE_FREQ[k] ?? 0) + (LINE_FADE_PHASE[k] ?? 0)
        );
  }
  for (let i = 0; i < LED_COUNT; i++) {
    const u = leds.fractions[i] ?? 0;
    let coverage = 0;
    for (let k = 0; k < 3; k++) {
      const distance = Math.abs(
        signedWrappedDistance(u, leds.lineCenters[k] ?? 0, 1)
      );
      const half = halfByBand[k] ?? 1;
      const plateau = plateauByBand[k] ?? 0;
      const profile =
        distance <= plateau
          ? 1
          : clamp01(1 - (distance - plateau) / (half - plateau));
      coverage = Math.max(coverage, profile * (fadeByBand[k] ?? 0));
    }
    writeLed(target, i, clamp01(coverage), 1, 1, 1);
  }
}

function updateDeployingRgb(
  leds: LedGeometryState,
  target: Float32Array,
  tint: HoverDeployAnimationState["tint"] | undefined
) {
  target.set(leds.data);
  for (let i = 0; i < LED_COUNT; i++) {
    const color = edgeTintColor(leds, i, tint);
    writeLedColor(target, i, color.r, color.g, color.b);
  }
}

function edgeTintColor(
  leds: LedGeometryState,
  i: number,
  tint: HoverDeployAnimationState["tint"] | undefined
) {
  const amount = clamp01(tint?.amount ?? 1);
  const radius = Math.max((tint?.radius ?? 1) * leds.markHeight, 1);
  const power = Math.max(tint?.power ?? 1, 0.001);
  const red = tint?.edgeRedLinear ?? EDGE_RED;
  const green = tint?.edgeGreenLinear ?? EDGE_GREEN;
  const blue = tint?.edgeBlueLinear ?? EDGE_BLUE;
  const base = i * LED_FLOATS;
  const x = leds.data[base] ?? 0;
  const y = leds.data[base + 1] ?? 0;
  const [redCenter, greenCenter, blueCenter] = leds.deployCenters;
  const invOverlap = 1 / Math.max(tint?.edgeOverlap ?? 1, 0.01);
  const wr =
    edgeWeight(x, y, redCenter.x, redCenter.y, radius, power) ** invOverlap;
  const wg =
    edgeWeight(x, y, greenCenter.x, greenCenter.y, radius, power) ** invOverlap;
  const wb =
    edgeWeight(x, y, blueCenter.x, blueCenter.y, radius, power) ** invOverlap;
  const sum = Math.max(wr + wg + wb, 0.0001);
  const r = (red.r * wr + green.r * wg + blue.r * wb) / sum;
  const g = (red.g * wr + green.g * wg + blue.g * wb) / sum;
  const b = (red.b * wr + green.b * wg + blue.b * wb) / sum;
  const luminance = LUMA_R * r + LUMA_G * g + LUMA_B * b;
  const scale = luminance <= 1e-4 ? 1 : 1 / luminance;
  return {
    r: mix(1, r * scale, amount),
    g: mix(1, g * scale, amount),
    b: mix(1, b * scale, amount),
  };
}

function edgeWeight(
  x: number,
  y: number,
  cx: number,
  cy: number,
  radius: number,
  power: number
) {
  return (1 / (1 + Math.hypot(x - cx, y - cy) / radius)) ** power;
}

function lerpLedState(
  target: Float32Array,
  from: Float32Array,
  to: Float32Array,
  t: number
) {
  for (let i = 0; i < target.length; i++) {
    const a = from[i] ?? 0;
    target[i] = a + ((to[i] ?? 0) - a) * t;
  }
}

function writeLed(
  target: Float32Array,
  i: number,
  brightness: number,
  r: number,
  g: number,
  b: number
) {
  const base = i * LED_FLOATS;
  target[base + 2] = brightness;
  target[base + COLOR_OFFSET] = r;
  target[base + COLOR_OFFSET + 1] = g;
  target[base + COLOR_OFFSET + 2] = b;
}

function writeLedColor(
  target: Float32Array,
  i: number,
  r: number,
  g: number,
  b: number
) {
  const base = i * LED_FLOATS;
  target[base + COLOR_OFFSET] = r;
  target[base + COLOR_OFFSET + 1] = g;
  target[base + COLOR_OFFSET + 2] = b;
}

function signedWrappedDistance(a: number, b: number, period: number) {
  return ((((a - b) % period) + period + period / 2) % period) - period / 2;
}

function wrap01(value: number) {
  return ((value % 1) + 1) % 1;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}
