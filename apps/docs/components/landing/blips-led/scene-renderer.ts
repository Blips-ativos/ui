/**
 * Monta e encadeia as passadas da cena: LEDs → textura de fontes de luz →
 * raycast analítico (resolução reduzida) → chão (tela cheia, direto no canvas).
 * Por rebuild (resize/enquadramento/qualidade), assa uma vez: o campo denso da
 * silhueta (resolução cheia, `mark-field.ts`) e o SDF na grade do raycast.
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/scene-renderer.ts
 * (MIT). Blips:
 * - o triângulo deu lugar ao "b": a geometria (arestas + fecho convexo) vai num
 *   storage buffer compartilhado pelas três passadas, e o enquadramento vem da
 *   Hero (`HeroRendererCss.framing`) em vez de centralizar no canvas;
 * - tema claro/escuro (`setTheme`) no mesmo shader de chão;
 * - `isNearMark`/ponteiro dentro do "b" calculados aqui (a cena conhece a
 *   geometria); saíram os modos de herói do lil-gui;
 * - alvo do raycast numa fração da simulação que a qualidade automática
 *   escolhe (`quality.ts`: 0.5 → 0.4 → 0.3); o "b" do raycast tem ~270 arestas
 *   e a silhueta, ~545 (só no campo assado);
 * - sem textura de ruído do chão (o grão virou dither no fim do shader).
 */

import type {
  Bundle,
  Frame,
  FramePass,
  Gpu,
  StorageBuffer,
  Target,
} from "vgpu";
import { bundle, draw, frame, geometry, storage, target } from "vgpu";
import { createHeroFrameState } from "./hero-frame-state";
import {
  buildLedGeometry,
  computeLeds,
  LED_BUFFER_BYTES,
  type LedGeometryState,
} from "./led-buffer";
import {
  createLightSourcesRaw,
  type LightSourcesRaw,
} from "./light-sources-raw";
import {
  MARK_FIELD_VERTEX_FLOATS,
  type MarkFieldLayout,
  markFieldLayout,
  markFieldVertices,
  type SimToScreen,
} from "./mark-field";
import { RAYCAST_SCALE_TIERS } from "./quality";
import {
  type BrushState,
  HERO_CANVAS_MAX_CSS,
  isPointInMark,
  MARK_ASPECT,
  type MarkGeometry,
  markGeometry,
  markLedLayout,
  type RenderSize,
  simulationFloorFactor,
  simulationFraming,
} from "./settings";
import raycastWgsl from "./shaders/direct-mark-raycast.wgsl";
import floorWgsl from "./shaders/main-scene-floor.wgsl";
import sdfBakeWgsl from "./shaders/mark-sdf-bake.wgsl";
import fieldWgsl from "./shaders/silhouette-field.wgsl";
import { canvasRenderSizing } from "./sim-sizing";
import type { BlipsLedTheme, MarkFraming } from "./types";

const DIRECT_MARK_MIN_STEP_PX = 1.5;
const DIRECT_MARK_HIT_THRESHOLD_PX = 0.75;
const DIRECT_MARK_ABSORPTION = 2;
const DIRECT_MARK_FALLOFF_POWER = 1;
const DIRECT_MARK_INTENSITY_SCALE = 50;
const DIRECT_MARK_MIN_SOURCE_LUMA = 0.001;
/** Raio de referência (o "circunraio" do original) em alturas do "b". */
const MARK_REFERENCE_RADIUS = 2 / 3;

export interface HeroRendererCss {
  width: number;
  height: number;
  dpr: number;
  /** Onde o "b" fica (px CSS relativos ao canvas); sem ele, centralizado. */
  framing?: MarkFraming;
}

export interface HeroRenderFrameArgs {
  time: number;
  dt?: number;
}

export interface HeroRenderer {
  renderFrame(currentFrame: Frame, args: HeroRenderFrameArgs): void;
  setOutputTarget(colorTarget: Target): void;
  rebuild(css: HeroRendererCss): void;
  /** Pincel em px CSS do canvas; `inside` é resolvido aqui contra o "b". */
  setBrush(b: Partial<BrushState>): void;
  setRgbDeployActive(v: boolean): void;
  setTheme(theme: BlipsLedTheme): void;
  /** O ponto (px CSS do canvas) está sobre o "b" ou logo em volta dele? */
  isNearMark(x: number, y: number): boolean;
  /** Fração da simulação em que o raycast roda (qualidade automática). */
  setRaycastScale(scale: number): void;
  prewarm(): Promise<void>;
  destroy(): void;
}

type DestroyableStorage = StorageBuffer & {
  readonly buffer?: { destroy(): void };
  destroy?: () => void;
};

interface RendererParts {
  css: HeroRendererCss;
  raycastScale: number;
  simulationSize: RenderSize;
  presentationSize: RenderSize;
  pixelRatio: number;
  simFactor: number;
  mark: MarkGeometry;
  ledDepth: number;
  leds: LedGeometryState;
  ledStorage: DestroyableStorage;
  segmentStorage: DestroyableStorage;
  lightSources: LightSourcesRaw;
  raycastTarget: Target;
  raycastBundle: Bundle;
  /** SDF do "b" (px de simulação, r16float) na grade do raycast, assado no build. */
  sdfTarget: Target;
  /** Campo denso da silhueta (rg16float, px de tela), assado no build. */
  fieldTarget: Target;
  fieldLayout: MarkFieldLayout;
  fieldGeometry: { destroy(): void };
  floorBundle?: Bundle;
}

export function createHeroRenderer(
  gpu: Gpu,
  opts: {
    theme?: BlipsLedTheme;
    css: HeroRendererCss;
    target?: Target;
  }
): HeroRenderer {
  const frameState = createHeroFrameState();
  const brush: Partial<BrushState> = {};
  let rgbDeployActive = false;
  let theme: BlipsLedTheme = opts.theme ?? "dark";
  let outputTarget = opts.target;
  let destroyed = false;
  let raycastScale: number = RAYCAST_SCALE_TIERS[0];

  const floorDraw = draw(gpu, { shader: floorWgsl, vertices: 3 });
  const raycastDraw = draw(gpu, { shader: raycastWgsl, vertices: 3 });
  const sdfBakeDraw = draw(gpu, {
    shader: sdfBakeWgsl,
    vertices: 3,
    label: "blips-led-sdf-bake",
  });

  let parts = buildParts(opts.css);
  if (outputTarget) recordFloorBundle(parts, outputTarget);

  return {
    renderFrame(currentFrame, { time }) {
      if (destroyed || !outputTarget) return;
      const current = parts;
      const { tunables } = frameState.resolveFrame({
        patch: brush,
        hoverRgbDeployActive: rgbDeployActive,
        time,
        updateLedsFor(ctx) {
          computeLeds(current.leds, ctx.time, ctx.hoverDeploy, ctx.brush);
          current.ledStorage.write(current.leds.data.buffer as ArrayBuffer);
        },
      });
      current.lightSources.encode({ frame: currentFrame, tunables });
      currentFrame.pass(
        { target: current.raycastTarget, clear: [0, 0, 0, 1] },
        (pass: FramePass) => pass.bundles(current.raycastBundle)
      );
      const floorBundle =
        current.floorBundle ?? recordFloorBundle(current, outputTarget);
      currentFrame.pass(
        { target: outputTarget, clear: [0, 0, 0, 1] },
        (pass: FramePass) => pass.bundles(floorBundle)
      );
    },
    setOutputTarget(colorTarget) {
      outputTarget = colorTarget;
      recordFloorBundle(parts, colorTarget);
    },
    rebuild,
    setRaycastScale(scale) {
      if (destroyed || scale === raycastScale) return;
      raycastScale = scale;
      rebuild(parts.css);
    },
    setBrush(next) {
      const f = parts.simFactor;
      const x = (next.x ?? -1000) * f;
      const y = (next.y ?? -1000) * f;
      Object.assign(brush, next, {
        x,
        y,
        inside: next.active === true && isPointInMark(x, y, parts.mark),
      });
    },
    setRgbDeployActive(active) {
      rgbDeployActive = active;
    },
    setTheme(next) {
      if (next === theme) return;
      theme = next;
      if (outputTarget && !destroyed) recordFloorBundle(parts, outputTarget);
    },
    isNearMark(x, y) {
      const f = parts.simFactor;
      const { center, boundRadius } = parts.mark;
      return (
        Math.hypot(x * f - center.x, y * f - center.y) <= boundRadius * 1.05
      );
    },
    async prewarm() {
      if (!outputTarget) return;
      await Promise.all([
        floorDraw.compile({ colors: [outputTarget.format] }),
        raycastDraw.compile(parts.raycastTarget),
        parts.lightSources.ready,
      ]);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      destroyParts(parts);
    },
  };

  function rebuild(css: HeroRendererCss) {
    if (destroyed) return;
    const next = buildParts(css, parts.leds);
    destroyParts(parts);
    parts = next;
    if (outputTarget) recordFloorBundle(parts, outputTarget);
  }

  function recordFloorBundle(current: RendererParts, colorTarget: Target) {
    floorDraw.set({
      cfg: floorUniformData(current, theme),
      radiance_tex: current.raycastTarget,
      light_sources_tex: current.lightSources.texture,
      silhouette_field_tex: current.fieldTarget,
      mark_sdf_tex: current.sdfTarget,
    });
    const result = bundle(
      gpu,
      {
        target: { colors: [colorTarget.format] },
        label: "blips-led-floor",
      },
      (recorded) => recorded.draw(floorDraw)
    );
    current.floorBundle = result;
    return result;
  }

  function buildParts(
    css: HeroRendererCss,
    previous?: LedGeometryState
  ): RendererParts {
    const sizing = canvasRenderSizing(css.width, css.height, css.dpr);
    const simFactor = simulationFloorFactor(css.height);
    const simulationSize = normalizedSize(
      sizing.simulationWidth,
      sizing.simulationHeight
    );
    const presentationSize = normalizedSize(
      css.width * css.dpr,
      css.height * css.dpr
    );
    const pixelRatio = normalizedPixelRatio(sizing.pixelRatio);
    const mark = markGeometry(
      simulationFraming(css.framing ?? defaultFraming(css), simFactor)
    );
    const ledDepth = markLedLayout(mark).depth;
    const leds = buildLedGeometry(mark, previous);
    const ledStorage = storage(gpu, LED_BUFFER_BYTES) as DestroyableStorage;
    ledStorage.write(leds.data.buffer as ArrayBuffer);
    const segmentStorage = storage(
      gpu,
      (mark.segmentCount + mark.hullCount) * 16
    ) as DestroyableStorage;
    segmentStorage.write(segmentBufferData(mark).buffer as ArrayBuffer);
    const scale = raycastScale;
    const raycastSize = directMarkTargetSize(simulationSize, scale);
    const raycastTarget = target(gpu, {
      size: [raycastSize.width, raycastSize.height],
      format: "rgba16float",
      label: "blips-led-direct-mark-raycast",
    });
    const sdfTarget = target(gpu, {
      size: [raycastSize.width, raycastSize.height],
      format: "r16float",
      label: "blips-led-mark-sdf",
    });
    sdfBakeDraw.set({
      cfg: { counts_scale: [mark.segmentCount, scale, 0, 0] },
      segments: segmentStorage,
    });

    // Campo denso da silhueta, em px de tela, só na caixa do "b" + faixa.
    const transform = presentationSimulationTransform(
      simulationSize,
      presentationSize
    );
    const simToScreen: SimToScreen = {
      originX: transform.originX,
      originY: transform.originY,
      scale: transform.scale,
    };
    const fieldLayout = markFieldLayout(
      mark,
      simToScreen,
      presentationSize,
      mark.height * MARK_REFERENCE_RADIUS * transform.scale
    );
    const fieldTarget = target(gpu, {
      size: [fieldLayout.width, fieldLayout.height],
      format: "rg16float",
      label: "blips-led-silhouette-field",
    });
    const fieldVertices = markFieldVertices(mark, simToScreen, fieldLayout);
    const fieldGeometry = geometry(gpu, {
      label: "blips-led-silhouette-field",
      buffers: [
        {
          data: fieldVertices.buffer as ArrayBuffer,
          stride: MARK_FIELD_VERTEX_FLOATS * 4,
          attributes: {
            position: "float32x2",
            seg: "float32x4",
            kind: "float32",
          },
        },
      ],
    });
    const fieldDraw = draw(gpu, {
      shader: fieldWgsl,
      label: "blips-led-silhouette-field-pass",
      geometry: fieldGeometry,
      // MIN nos dois canais: menor distância (R) e "dentro" (G = 0) vencem.
      blend: { color: { src: "one", dst: "one", op: "min" } },
      set: {
        cfg: {
          size_band: [
            fieldLayout.width,
            fieldLayout.height,
            fieldLayout.band,
            0,
          ],
        },
      },
    });
    // Assado único (estático até o próximo rebuild).
    frame(gpu, (currentFrame: Frame) => {
      currentFrame.pass(
        { target: fieldTarget, clear: [fieldLayout.band, 1, 0, 0] },
        (pass: FramePass) => pass.draw(fieldDraw)
      );
      currentFrame.pass(
        { target: sdfTarget, clear: [0, 0, 0, 1] },
        (pass: FramePass) => pass.draw(sdfBakeDraw)
      );
    });
    const lightSources = createLightSourcesRaw(gpu, {
      size: [simulationSize.width, simulationSize.height],
      ledStorage,
      segmentStorage,
      mark,
    });
    raycastDraw.set({
      cfg: directMarkRaycastUniformData(simulationSize, mark, ledDepth, scale),
      light_sources_tex: lightSources.texture,
      segments: segmentStorage,
      mark_sdf_tex: sdfTarget,
    });
    const raycastBundle = bundle(
      gpu,
      { target: raycastTarget, label: "blips-led-raycast" },
      (recorded) => recorded.draw(raycastDraw)
    );
    return {
      css,
      raycastScale: scale,
      simulationSize,
      presentationSize,
      pixelRatio,
      simFactor,
      mark,
      ledDepth,
      leds,
      ledStorage,
      segmentStorage,
      lightSources,
      raycastTarget,
      raycastBundle,
      sdfTarget,
      fieldTarget,
      fieldLayout,
      fieldGeometry,
    };
  }

  function destroyParts(current: RendererParts) {
    current.lightSources.destroy();
    for (const buffer of [current.ledStorage, current.segmentStorage]) {
      buffer.destroy?.();
      buffer.buffer?.destroy();
    }
    destroyTargetTexture(current.raycastTarget);
    destroyTargetTexture(current.sdfTarget);
    destroyTargetTexture(current.fieldTarget);
    current.fieldGeometry.destroy();
  }
}

/** Libera a textura de um alvo offscreen (o Target não expõe destroy). */
export function destroyTargetTexture(t: Target) {
  const texture = (t.color as unknown as { gpu?: { destroy?: () => void } })
    ?.gpu;
  texture?.destroy?.();
}

/** Sem área de enquadramento (telas pequenas): o "b" no centro do canvas. */
function defaultFraming(css: HeroRendererCss): MarkFraming {
  return {
    centerX: css.width / 2,
    centerY: css.height / 2,
    height: Math.min(css.height * 0.42, (css.width * 0.6) / MARK_ASPECT),
  };
}

/** Arestas (a.xy, b.xy) seguidas dos vértices do fecho (xy, 0, 0), em vec4f. */
function segmentBufferData(mark: MarkGeometry) {
  const data = new Float32Array((mark.segmentCount + mark.hullCount) * 4);
  data.set(mark.segments);
  for (let i = 0; i < mark.hullCount; i++) {
    const base = (mark.segmentCount + i) * 4;
    data[base] = mark.hull[i * 2] ?? 0;
    data[base + 1] = mark.hull[i * 2 + 1] ?? 0;
  }
  return data;
}

function directMarkRaycastUniformData(
  simulationSize: RenderSize,
  mark: MarkGeometry,
  ledDepth: number,
  scale: number
) {
  const size = directMarkTargetSize(simulationSize, scale);
  const pxStepScale =
    Math.min(simulationSize.height, HERO_CANVAS_MAX_CSS) / HERO_CANVAS_MAX_CSS;
  return {
    mark: [mark.center.x, mark.center.y, size.width, size.height],
    counts: [mark.segmentCount, mark.hullCount, 0, 0],
    size_steps: [
      simulationSize.width,
      simulationSize.height,
      DIRECT_MARK_MIN_STEP_PX * pxStepScale,
      DIRECT_MARK_HIT_THRESHOLD_PX * pxStepScale,
    ],
    params: [
      DIRECT_MARK_ABSORPTION / simulationSize.height,
      DIRECT_MARK_FALLOFF_POWER,
      DIRECT_MARK_INTENSITY_SCALE,
      DIRECT_MARK_MIN_SOURCE_LUMA,
    ],
    target_info: [
      scale,
      HERO_CANVAS_MAX_CSS / Math.max(simulationSize.height, 1),
      ledDepth * 0.5,
      0,
    ],
  };
}

function directMarkTargetSize(size: RenderSize, scale: number) {
  return {
    width: Math.max(1, Math.ceil(size.width * scale)),
    height: Math.max(1, Math.ceil(size.height * scale)),
  };
}

function floorUniformData(parts: RendererParts, theme: BlipsLedTheme) {
  const { simulationSize, presentationSize, pixelRatio, mark, fieldLayout } =
    parts;
  const transform = presentationSimulationTransform(
    simulationSize,
    presentationSize
  );
  const referencePresentationHeight =
    HERO_CANVAS_MAX_CSS * Math.max(pixelRatio, 1e-4);
  const radianceJitterNorm =
    Math.min(presentationSize.height, referencePresentationHeight) /
    referencePresentationHeight;
  return {
    screen: [presentationSize.width, presentationSize.height, 0, pixelRatio],
    light_sources: [simulationSize.width, simulationSize.height, 0, 0],
    mark: [
      mark.center.x,
      mark.center.y,
      mark.boundRadius,
      mark.height * MARK_REFERENCE_RADIUS * transform.scale,
    ],
    radiance_fit: [
      transform.originX,
      transform.originY,
      simulationSize.width * transform.scale,
      simulationSize.height * transform.scale,
    ],
    sim_transform: [
      transform.originX,
      transform.originY,
      transform.scale,
      radianceJitterNorm,
    ],
    theme: [theme === "light" ? 1 : 0, 0, 0, 0],
    field: [fieldLayout.originX, fieldLayout.originY, fieldLayout.band, 0],
  };
}

function presentationSimulationTransform(
  simulationSize: RenderSize,
  presentationSize: RenderSize
) {
  const scale = Math.max(
    0.001,
    presentationSize.height / Math.max(1, simulationSize.height)
  );
  return {
    originX: (presentationSize.width - simulationSize.width * scale) * 0.5,
    originY: (presentationSize.height - simulationSize.height * scale) * 0.5,
    scale,
  };
}

function normalizedSize(width: number, height: number): RenderSize {
  return {
    width: Math.max(1, Math.floor(width)),
    height: Math.max(1, Math.floor(height)),
  };
}

function normalizedPixelRatio(value: number | undefined) {
  return Math.max(
    0.001,
    typeof value === "number" && Number.isFinite(value) ? value : 1
  );
}
