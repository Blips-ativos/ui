/**
 * Ciclo de vida da cena: inicializa o WebGPU, mede canvas e enquadramento,
 * roda o loop de quadros e traduz o ponteiro em "pincel".
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/renderer.ts
 * (MIT). Blips:
 * - sem lil-gui/modos de aresta;
 * - o ponteiro é ouvido na janela (o canvas fica atrás do texto da página) e
 *   o clique só liga/desliga o deploy RGB quando cai sobre o "b";
 * - enquadramento lido do [data-triangle-container] a cada medida;
 * - tema claro/escuro, pausa fora da tela/aba oculta e `prefers-reduced-motion`
 *   (animação congelada: um quadro só, redesenhado em resize/tema);
 * - relógio próprio, que não pula ao retomar depois de uma pausa;
 * - qualidade automática (`quality.ts`): quadros lentos sustentados reduzem a
 *   resolução do raycast; a medida recomeça a cada retomada e resize;
 * - sem WebGPU (ou falha ao iniciar) a cena se desmonta em silêncio e avisa
 *   por `onError`, sem lançar.
 */

import type { Gpu, Surface } from "vgpu";
import { createQualityGovernor } from "./quality";
import { createHeroRenderer, type HeroRenderer } from "./scene-renderer";
import { DEFAULT_BRUSH, MARK_ASPECT, type RenderSize } from "./settings";
import { brushState } from "./sim-sizing";
import type { BlipsLedTheme, MarkFraming } from "./types";

/** Fração da área de enquadramento que a altura (ou a largura) do "b" ocupa. */
const FRAMING_FILL = 0.62;
/** Abaixo disto a área de enquadramento é ignorada (ex.: escondida no mobile). */
const FRAMING_MIN_PX = 40;
const MAX_FRAME_DELTA = 0.1;
/** Instante fixo da animação congelada (prefers-reduced-motion). */
const REDUCED_MOTION_TIME = 2.5;

export interface BlipsLedRendererOptions {
  readonly canvas: HTMLCanvasElement;
  readonly framingElement?: HTMLElement;
  readonly theme: BlipsLedTheme;
  readonly reducedMotion: boolean;
  readonly onError?: (error: unknown) => void;
}

export interface BlipsLedRenderer {
  readonly ready: Promise<void>;
  setTheme(theme: BlipsLedTheme): void;
  setReducedMotion(reduced: boolean): void;
  /** Visível na tela e aba ativa; falso pausa o loop. */
  setActive(active: boolean): void;
  dispose(): void;
}

interface PendingSize extends RenderSize {
  framing?: MarkFraming;
}

export function createRenderer(
  options: BlipsLedRendererOptions
): BlipsLedRenderer {
  let disposed = false;
  let api: typeof import("vgpu") | undefined;
  let gpu: Gpu | undefined;
  let canvasSurface: Surface | undefined;
  let scene: HeroRenderer | undefined;
  let loop: { stop(): void } | undefined;
  let observer: ResizeObserver | undefined;
  let input: ReturnType<typeof installWindowInput> | undefined;
  let resizeFrame = 0;
  let stillFrame = 0;
  let resizeGeneration = 0;
  let pendingSize: PendingSize | undefined;
  let lastDpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;
  let theme = options.theme;
  let reducedMotion = options.reducedMotion;
  let active = true;
  let time = 0;
  let lastNow: number | undefined;
  let compiled = false;
  let qualityTimer: ReturnType<typeof setTimeout> | undefined;
  // A troca de escala reconstrói alvos e assa o campo: fora do callback do quadro.
  const quality = createQualityGovernor((scale) => {
    if (qualityTimer !== undefined) clearTimeout(qualityTimer);
    qualityTimer = setTimeout(() => {
      qualityTimer = undefined;
      if (disposed || !scene) return;
      try {
        scene.setRaycastScale(scale);
      } catch (error) {
        fail(error);
      }
    }, 0);
  });

  const fail = (error: unknown) => {
    if (disposed) return;
    dispose();
    options.onError?.(error);
  };

  /** Liga o loop contínuo só quando há animação a mostrar. */
  const syncLoop = () => {
    const shouldRun =
      !disposed && compiled && active && !reducedMotion && !!gpu && !!scene;
    if (shouldRun && !loop && gpu && api) {
      lastNow = undefined;
      quality.reset();
      loop = api.frameLoop(gpu, (currentFrame) => {
        if (disposed || !scene || !input) return;
        const now = performance.now() / 1000;
        if (lastNow !== undefined) quality.sample((now - lastNow) * 1000);
        const dt =
          lastNow === undefined
            ? 0
            : Math.min(MAX_FRAME_DELTA, Math.max(0, now - lastNow));
        lastNow = now;
        time += dt;
        scene.setBrush(input.brush());
        scene.setRgbDeployActive(input.rgbDeployActive());
        scene.renderFrame(currentFrame, { time });
      });
    } else if (!shouldRun && loop) {
      loop.stop();
      loop = undefined;
    }
    if (!shouldRun && reducedMotion) requestStillFrame();
  };

  /** Quadro único com a animação congelada (reduced motion). */
  const requestStillFrame = () => {
    if (disposed || stillFrame || !compiled) return;
    stillFrame = requestAnimationFrame(() => {
      stillFrame = 0;
      if (disposed || !gpu || !scene || !api || !reducedMotion) return;
      const currentScene = scene;
      try {
        api.frame(gpu, (currentFrame) => {
          currentScene.setBrush(brushState(DEFAULT_BRUSH));
          currentScene.renderFrame(currentFrame, {
            time: REDUCED_MOTION_TIME,
          });
        });
      } catch (error) {
        fail(error);
      }
    });
  };

  const applyResize = () => {
    resizeFrame = 0;
    const size = pendingSize;
    pendingSize = undefined;
    if (disposed || !size || !scene || !canvasSurface) return;
    const generation = ++resizeGeneration;
    try {
      scene.rebuild({
        width: size.width,
        height: size.height,
        dpr: canvasSurface.dpr,
        framing: size.framing,
      });
      scene.setOutputTarget(canvasSurface);
      quality.reset();
      requestStillFrame();
      void scene.prewarm().catch((error: unknown) => {
        if (disposed || generation !== resizeGeneration) return;
        fail(error);
      });
    } catch (error) {
      if (disposed || generation !== resizeGeneration) return;
      fail(error);
    }
  };
  const resize = (size: PendingSize) => {
    if (disposed || size.width <= 0 || size.height <= 0) return;
    pendingSize = size;
    if (!resizeFrame) resizeFrame = requestAnimationFrame(applyResize);
  };
  const measure = () => {
    const rect = options.canvas.getBoundingClientRect();
    resize({
      width: rect.width,
      height: rect.height,
      framing: framingWithin(rect, options.framingElement),
    });
  };
  const onWindowResize = () => {
    if (window.devicePixelRatio === lastDpr) return;
    lastDpr = window.devicePixelRatio;
    measure();
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    resizeGeneration++;
    loop?.stop();
    loop = undefined;
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    if (stillFrame) cancelAnimationFrame(stillFrame);
    if (qualityTimer !== undefined) clearTimeout(qualityTimer);
    qualityTimer = undefined;
    resizeFrame = 0;
    stillFrame = 0;
    pendingSize = undefined;
    observer?.disconnect();
    observer = undefined;
    if (typeof window !== "undefined")
      window.removeEventListener("resize", onWindowResize);
    input?.dispose();
    input = undefined;
    scene?.destroy();
    scene = undefined;
    canvasSurface?.dispose();
    canvasSurface = undefined;
    gpu?.dispose();
    gpu = undefined;
    api = undefined;
  };
  const initialize = async () => {
    if (typeof navigator === "undefined" || !("gpu" in navigator)) {
      throw new Error("WebGPU indisponível neste navegador.");
    }
    const vgpu = await import("vgpu");
    if (disposed) return;
    const nextGpu = await vgpu.init();
    if (disposed) {
      nextGpu.dispose();
      return;
    }
    gpu = nextGpu;
    api = vgpu;
    canvasSurface = vgpu.surface(gpu, options.canvas, { dpr: [1, 2] });
    const rect = options.canvas.getBoundingClientRect();
    const nextScene = createHeroRenderer(gpu, {
      theme,
      css: {
        ...cssSizeOf(options.canvas, canvasSurface.dpr),
        framing: framingWithin(rect, options.framingElement),
      },
    });
    scene = nextScene;
    nextScene.setOutputTarget(canvasSurface);
    await nextScene.prewarm();
    if (disposed) return;
    compiled = true;
    input = installWindowInput(options.canvas, nextScene);
    observer =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(measure);
    observer?.observe(options.canvas);
    if (options.framingElement) observer?.observe(options.framingElement);
    window.addEventListener("resize", onWindowResize);
    measure();
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
      scene?.setTheme(next);
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
 * Centro e altura do "b" dentro da área de enquadramento, em px CSS relativos
 * ao canvas. Sem área visível (mobile), a cena centraliza sozinha.
 */
function framingWithin(
  canvasRect: DOMRect,
  element: HTMLElement | undefined
): MarkFraming | undefined {
  if (!element) return undefined;
  const rect = element.getBoundingClientRect();
  if (rect.width < FRAMING_MIN_PX || rect.height < FRAMING_MIN_PX)
    return undefined;
  return {
    centerX: rect.left - canvasRect.left + rect.width / 2,
    centerY: rect.top - canvasRect.top + rect.height / 2,
    height: Math.min(
      rect.height * FRAMING_FILL,
      (rect.width * FRAMING_FILL) / MARK_ASPECT
    ),
  };
}

function cssSizeOf(canvas: HTMLCanvasElement, dpr: Surface["dpr"]) {
  const rect = canvas.getBoundingClientRect();
  return {
    width: Math.max(1, rect.width || canvas.clientWidth || canvas.width / dpr),
    height: Math.max(
      1,
      rect.height || canvas.clientHeight || canvas.height / dpr
    ),
    dpr,
  };
}

/**
 * Ponteiro na janela inteira: o canvas fica atrás do texto (e sem eventos), então
 * as coordenadas são convertidas para o retângulo dele à mão.
 */
function installWindowInput(canvas: HTMLCanvasElement, scene: HeroRenderer) {
  let current: Parameters<HeroRenderer["setBrush"]>[0] =
    brushState(DEFAULT_BRUSH);
  let deployActive = false;

  const leave = () => {
    current = brushState(DEFAULT_BRUSH);
  };
  const local = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
    return inside ? { x, y } : undefined;
  };
  const move = (event: PointerEvent) => {
    if (!event.isPrimary) return;
    const point = local(event);
    if (!point) {
      leave();
      return;
    }
    current = brushState(DEFAULT_BRUSH, {
      x: point.x,
      y: point.y,
      active: true,
      isMouse: event.pointerType === "mouse",
    });
  };
  const up = (event: PointerEvent) => {
    if (!event.isPrimary || event.button !== 0) return;
    const point = local(event);
    if (point && scene.isNearMark(point.x, point.y))
      deployActive = !deployActive;
  };
  const out = (event: PointerEvent) => {
    if (!event.relatedTarget) leave();
  };
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("pointerup", up, { passive: true });
  window.addEventListener("pointerout", out, { passive: true });
  window.addEventListener("blur", leave);
  return {
    brush: () => current,
    rgbDeployActive: () => deployActive,
    dispose() {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerout", out);
      window.removeEventListener("blur", leave);
    },
  };
}
