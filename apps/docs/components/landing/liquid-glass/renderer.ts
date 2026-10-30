/**
 * Cena e ciclo de vida do fundo "vidro líquido" da home.
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/typegpu-liquid-glass/renderer.ts
 * (MIT), revisão af8ab2106af8d33b5f10e60b588a0ae5fb0b02de761800e82b85bf82726a3bc4.
 * O pipeline é o mesmo: campo de distância 1024² rgba16float assado uma vez,
 * gradiente extraído, 16 passadas de blur (normais) e o efeito de tela cheia
 * por quadro. Blips:
 * - shaders TypeGPU em `./shaders.ts` e bake do "b" em WGSL puro (`./mark-sdf.ts`,
 *   arestas num storage buffer), no lugar do `logoSdf` do exemplo;
 * - centro/escala do "b" medidos do [data-triangle-container] — o SVG do
 *   símbolo da marca, invisível, onde a hero da v2 o desenhava: o "b" hexagonal
 *   ocupa o lugar que o símbolo original ocupa na caixa do traço desse SVG.
 *   Refeito a cada resize do canvas ou da caixa; sem caixa (mobile), centro
 *   do canvas;
 * - tema claro/escuro por uniforme, sem recriar pipeline;
 * - pausa fora da tela/aba oculta; `prefers-reduced-motion` desenha um quadro
 *   parado (refeito em resize/tema); relógio próprio com delta limitado (no
 *   lugar do `clock` do vgpu), para não pular ao retomar;
 * - sem WebGPU ou falha ao iniciar: tudo é liberado e `onError` avisa, sem lançar;
 * - o `dispose` da cena (alvos + storage) agora roda no descarte, junto do
 *   cancelamento do resize, do loop e do `gpu.dispose()` do exemplo.
 */

import { prepareShader } from "@vgpu/wgsl/prepare";
import {
  effect,
  frame,
  frameLoop,
  type Gpu,
  init,
  type StorageBuffer,
  type Surface,
  sampler,
  storage,
  surface,
  type Target,
  target,
} from "vgpu";
import {
  BLIPS_MARK_SOURCE_BOX,
  DISTANCE_GAIN,
  FIELD_EXTENT,
  MARK_ASPECT,
  MARK_GLASS_HEIGHT,
  MARK_HEX_BOX,
  MARK_SDF_BAKE_WGSL,
  markSegmentData,
} from "./mark-sdf";
import { shaderSources } from "./shaders";

const FIELD_SIZE = 1024;
/** Abaixo disto a caixa é ignorada (escondida no mobile). */
const FRAMING_MIN_PX = 40;
const MAX_FRAME_DELTA = 0.1;
/** Instante fixo do quadro parado (prefers-reduced-motion). */
const REDUCED_MOTION_TIME = 2.5;

export type LiquidGlassTheme = "light" | "dark";

/** Enquadramento do "b" e da calmaria, em frações do canvas. */
interface Framing {
  centerX: number;
  centerY: number;
  /** Altura do "b" / altura do canvas. */
  height: number;
  /** `uv.x` da borda esquerda da caixa (0 quando não há caixa). */
  calmEdge: number;
  calmAmount: number;
}

type Output = Surface | Target;

function createLiquidGlassScene(gpu: Gpu, output: Output) {
  const sources = shaderSources();
  let sdfField: Target | undefined;
  let rawGradient: Target | undefined;
  let blurA: Target | undefined;
  let blurB: Target | undefined;
  let segmentStorage: StorageBuffer | undefined;
  const release = () => {
    [blurB, blurA, rawGradient, sdfField].forEach(destroyTarget);
    destroyStorage(segmentStorage);
  };
  try {
    sdfField = target(gpu, {
      size: [FIELD_SIZE, FIELD_SIZE],
      format: "rgba16float",
      label: "blips-liquid-glass-sdf-field",
    });
    rawGradient = target(gpu, {
      size: [FIELD_SIZE, FIELD_SIZE],
      format: "rgba16float",
      label: "blips-liquid-glass-sdf-gradient",
    });
    blurA = target(gpu, {
      size: [FIELD_SIZE, FIELD_SIZE],
      format: "rgba16float",
      label: "blips-liquid-glass-sdf-blur-a",
    });
    blurB = target(gpu, {
      size: [FIELD_SIZE, FIELD_SIZE],
      format: "rgba16float",
      label: "blips-liquid-glass-sdf-blur-b",
    });

    const linearSampler = sampler(gpu, {
      minFilter: "linear",
      magFilter: "linear",
      addressModeU: "clamp-to-edge",
      addressModeV: "clamp-to-edge",
    });

    // Blips: arestas do "b" num storage buffer, lidas só pelo bake.
    const segments = markSegmentData();
    segmentStorage = storage(gpu, segments.data.byteLength, "read");
    segmentStorage.write(segments.data);
    const sdfBake = effect(
      gpu,
      prepareShader(MARK_SDF_BAKE_WGSL, "blips-liquid-glass/sdf-bake.wgsl"),
      {
        label: "blips-liquid-glass-sdf-bake",
        set: {
          bake: {
            count: segments.count,
            gain: DISTANCE_GAIN,
            extent: FIELD_EXTENT,
            pad: 0,
          },
          segments: segmentStorage,
        },
      }
    );
    const extractGradient = effect(gpu, sources.gradient, {
      label: "blips-liquid-glass-sdf-gradient",
      set: { sourceTexture: sdfField, fieldSampler: linearSampler },
    });
    const blurPasses = 16;
    const blurEffects = Array.from({ length: blurPasses }, (_, i) => {
      return {
        horizontal: effect(gpu, sources.horizontalBlur, {
          label: `blips-liquid-glass-sdf-blur-horizontal-${i}`,
          set: {
            sourceTexture: i === 0 ? rawGradient : blurB,
            fieldSampler: linearSampler,
          },
        }),
        vertical: effect(gpu, sources.verticalBlur, {
          label: `blips-liquid-glass-sdf-blur-vertical-${i}`,
          set: { sourceTexture: blurA, fieldSampler: linearSampler },
        }),
      };
    });

    sdfBake.draw(sdfField);
    extractGradient.draw(rawGradient);
    for (const pass of blurEffects) {
      pass.horizontal.draw(blurA);
      pass.vertical.draw(blurB);
    }

    const shader = effect(gpu, sources.main, {
      label: "blips-liquid-glass",
      set: {
        params: paramsFor(0, output, defaultFraming(output), 0),
        sdfTexture: sdfField,
        gradientTexture: blurB,
        fieldSampler: linearSampler,
      },
    });
    const setParams = (seconds: number, framing: Framing, theme: number) =>
      shader.set({ params: paramsFor(seconds, output, framing, theme) });

    return { shader, setParams, dispose: release };
  } catch (error) {
    release();
    throw error;
  }
}

/** Uniformes do fragmento principal (`Params` em `./shaders.ts`). */
function paramsFor(
  seconds: number,
  output: Output,
  framing: Framing,
  theme: number
) {
  const aspect = output.size[0] / Math.max(1, output.size[1]);
  return {
    time: seconds,
    aspect,
    // Frações do canvas → espaço `p` do shader (y para baixo, meia altura = 1).
    center: [(framing.centerX - 0.5) * 2 * aspect, (framing.centerY - 0.5) * 2],
    glassScale: (framing.height * 2) / MARK_GLASS_HEIGHT,
    theme,
    calmEdge: framing.calmEdge,
    calmAmount: framing.calmAmount,
  };
}

/** Sem caixa de enquadramento: "b" no centro, sem calmaria. */
function defaultFraming(output: Output): Framing {
  const aspect = output.size[0] / Math.max(1, output.size[1]);
  return {
    centerX: 0.5,
    centerY: 0.5,
    height: Math.min(0.42, (0.6 * aspect) / MARK_ASPECT),
    calmEdge: 0,
    calmAmount: 0,
  };
}

function destroyTarget(value: Target | undefined): void {
  (value as { destroy?: () => void } | undefined)?.destroy?.();
}

function destroyStorage(value: StorageBuffer | undefined): void {
  (value as { destroy?: () => void } | undefined)?.destroy?.();
}

export interface LiquidGlassRendererOptions {
  readonly canvas: HTMLCanvasElement;
  readonly framingElement?: HTMLElement;
  readonly theme: LiquidGlassTheme;
  readonly reducedMotion: boolean;
  readonly onError?: (error: unknown) => void;
}

export interface LiquidGlassRenderer {
  readonly ready: Promise<void>;
  setTheme(theme: LiquidGlassTheme): void;
  setReducedMotion(reduced: boolean): void;
  /** Visível na tela e aba ativa; falso pausa o loop. */
  setActive(active: boolean): void;
  dispose(): void;
}

export function createRenderer(
  options: LiquidGlassRendererOptions
): LiquidGlassRenderer {
  const { canvas } = options;
  let disposed = false;
  let gpu: Gpu | undefined;
  let output: Surface | undefined;
  let scene: ReturnType<typeof createLiquidGlassScene> | undefined;
  let time = 0;
  let loop: { stop(): void } | undefined;
  let unsubscribeResize: (() => void) | undefined;
  let observer: ResizeObserver | undefined;
  let stillFrame = 0;
  let theme = options.theme;
  let reducedMotion = options.reducedMotion;
  let active = true;
  let lastNow: number | undefined;
  let framing: Framing | undefined;

  const themeValue = () => (theme === "light" ? 1 : 0);

  const fail = (error: unknown) => {
    if (disposed) return;
    dispose();
    options.onError?.(error);
  };

  const measure = () => {
    if (!output) return;
    framing = measureFraming(canvas, options.framingElement, output);
  };

  /** Loop contínuo só quando há animação a mostrar. */
  const syncLoop = () => {
    const shouldRun = !disposed && active && !reducedMotion && !!scene;
    if (shouldRun && !loop && gpu && output) {
      const currentOutput = output;
      lastNow = undefined;
      loop = frameLoop(gpu, (currentFrame) => {
        if (disposed || !scene) return;
        // Relógio próprio (o exemplo usava `clock`): delta limitado, sem salto
        // na retomada depois de uma pausa.
        const now = performance.now() / 1000;
        const dt =
          lastNow === undefined
            ? 0
            : Math.min(MAX_FRAME_DELTA, Math.max(0, now - lastNow));
        lastNow = now;
        time += dt;
        try {
          scene.setParams(
            time,
            framing ?? defaultFraming(currentOutput),
            themeValue()
          );
          currentFrame.pass(currentOutput, scene.shader);
        } catch (error) {
          // Fora do callback: não descartar o gpu no meio do quadro.
          setTimeout(() => fail(error), 0);
          throw error;
        }
      });
    } else if (!shouldRun && loop) {
      loop.stop();
      loop = undefined;
    }
    if (!shouldRun && reducedMotion) requestStillFrame();
  };

  /** Quadro único com a animação congelada (reduced motion). */
  const requestStillFrame = () => {
    if (disposed || stillFrame || !scene) return;
    stillFrame = requestAnimationFrame(() => {
      stillFrame = 0;
      if (disposed || !gpu || !scene || !output || !reducedMotion) return;
      const currentScene = scene;
      const currentOutput = output;
      try {
        frame(gpu, (currentFrame) => {
          currentScene.setParams(
            REDUCED_MOTION_TIME,
            framing ?? defaultFraming(currentOutput),
            themeValue()
          );
          currentFrame.pass(currentOutput, currentScene.shader);
        });
      } catch (error) {
        fail(error);
      }
    });
  };

  const onLayoutChange = () => {
    measure();
    requestStillFrame();
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    loop?.stop();
    loop = undefined;
    if (stillFrame) cancelAnimationFrame(stillFrame);
    stillFrame = 0;
    observer?.disconnect();
    observer = undefined;
    if (typeof window !== "undefined")
      window.removeEventListener("resize", onLayoutChange);
    unsubscribeResize?.();
    unsubscribeResize = undefined;
    scene?.dispose();
    scene = undefined;
    output?.dispose();
    output = undefined;
    gpu?.dispose();
    gpu = undefined;
  };

  const initialize = async () => {
    if (typeof navigator === "undefined" || !("gpu" in navigator)) {
      throw new Error("WebGPU indisponível neste navegador.");
    }
    const nextGpu = await init();
    if (disposed) {
      nextGpu.dispose();
      return;
    }
    gpu = nextGpu;
    output = surface(gpu, canvas, { dpr: [1, 2] });
    measure();
    scene = createLiquidGlassScene(gpu, output);
    unsubscribeResize = output.onResize(onLayoutChange);
    observer =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(onLayoutChange);
    if (options.framingElement) observer?.observe(options.framingElement);
    window.addEventListener("resize", onLayoutChange);
    syncLoop();
  };
  const ready = initialize().catch((error: unknown) => {
    fail(error);
  });

  return {
    ready,
    setTheme(next) {
      if (next === theme) return;
      theme = next;
      requestStillFrame();
    },
    setReducedMotion(reduced) {
      if (reduced === reducedMotion) return;
      reducedMotion = reduced;
      syncLoop();
    },
    setActive(next) {
      if (next === active) return;
      active = next;
      syncLoop();
    },
    dispose,
  };
}

/**
 * Centro e altura do "b" (frações do canvas) a partir do
 * [data-triangle-container]. A caixa do traço do símbolo original (o `<path>`
 * do SVG) dá a escala — px por unidade de cena — e a origem; o "b" hexagonal,
 * construído no mesmo espaço, é posto onde o original estaria.
 */
function measureFraming(
  canvas: HTMLCanvasElement,
  element: HTMLElement | undefined,
  output: Output
): Framing | undefined {
  const canvasRect = canvas.getBoundingClientRect();
  if (canvasRect.width <= 0 || canvasRect.height <= 0) return undefined;
  if (!element) return undefined;
  const rect = element.getBoundingClientRect();
  if (rect.width < FRAMING_MIN_PX || rect.height < FRAMING_MIN_PX)
    return defaultFraming(output);
  const ink = element.querySelector("path")?.getBoundingClientRect() ?? rect;
  const unit = ink.height / BLIPS_MARK_SOURCE_BOX.height;
  const centerX =
    ink.left +
    ink.width / 2 +
    (MARK_HEX_BOX.centerX - BLIPS_MARK_SOURCE_BOX.centerX) * unit;
  // Cena com y para cima, tela com y para baixo.
  const centerY =
    ink.top +
    ink.height / 2 -
    (MARK_HEX_BOX.centerY - BLIPS_MARK_SOURCE_BOX.centerY) * unit;
  return {
    centerX: (centerX - canvasRect.left) / canvasRect.width,
    centerY: (centerY - canvasRect.top) / canvasRect.height,
    height: (MARK_HEX_BOX.height * unit) / canvasRect.height,
    calmEdge: (rect.left - canvasRect.left) / canvasRect.width,
    calmAmount: 1,
  };
}
