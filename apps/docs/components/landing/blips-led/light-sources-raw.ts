/**
 * Textura das fontes de luz: cada LED rasterizado como um quad colorido, em px
 * de simulação. O raycast lê a cor do LED daqui no ponto em que o raio acerta o
 * contorno.
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/light-sources-raw.ts
 * (MIT). Blips: os quads saem de `markLedLayout` (todos os laços do "b") e ficam
 * do lado de dentro do contorno, orientados pela normal externa de cada LED; o
 * recorte do shader usa as arestas do "b" (storage `segments`) em vez do
 * triângulo. Os triângulos de esquadria nos cantos do triângulo saíram — o
 * contorno do "b" é suave e os LEDs são distribuídos por comprimento de arco.
 */

import type { Frame, FramePass, Gpu, StorageBuffer, Target } from "vgpu";
import { bundle, draw, geometry, target } from "vgpu";

import {
  LED_EMITTER_MESH_EXPANSION_PX,
  type SceneTunables as LightTunables,
  type MarkGeometry,
  markLedLayout,
  type RenderSize,
} from "./settings";
import ledEmittersWgsl from "./shaders/led-emitters.wgsl";

const LIGHT_SOURCES_FORMAT: GPUTextureFormat = "rgba16float";

export interface LightSourcesRaw {
  readonly texture: Target;
  readonly ready: Promise<unknown>;
  encode(args: { frame: Frame; tunables: LightTunables }): void;
  destroy(): void;
}

interface CreateLightSourcesRawOptions {
  size: readonly [number, number];
  ledStorage: StorageBuffer;
  segmentStorage: StorageBuffer;
  mark: MarkGeometry;
}

export function createLightSourcesRaw(
  gpu: Gpu,
  opts: CreateLightSourcesRawOptions
): LightSourcesRaw {
  const simSize: RenderSize = { width: opts.size[0], height: opts.size[1] };

  const colorTarget = target(gpu, {
    size: [simSize.width, simSize.height],
    format: LIGHT_SOURCES_FORMAT,
    label: "blips-led-light-sources",
  });

  const ledVertices = ledEmitterVertexData(
    opts.mark,
    LED_EMITTER_MESH_EXPANSION_PX
  );
  const ledGeometry = geometry(gpu, {
    label: "blips-led-emitters",
    buffers: [
      {
        data: ledVertices.buffer as ArrayBuffer,
        stride: 12,
        attributes: {
          position: "float32x2",
          led_index: "float32",
        },
      },
    ],
  });

  const ledEmittersDraw = draw(gpu, {
    shader: ledEmittersWgsl,
    label: "blips-led-emitters-pass",
    geometry: ledGeometry,
    writeMask: ["r", "g", "b"],
    set: {
      cfg: initialLightSourcesUniform(),
      leds: opts.ledStorage,
      segments: opts.segmentStorage,
    },
  });

  const ready = ledEmittersDraw.compile(colorTarget);
  const emittersBundle = bundle(
    gpu,
    { target: colorTarget, label: "blips-led-emitters" },
    (recorded) => recorded.draw(ledEmittersDraw)
  );

  return {
    texture: colorTarget,
    ready,
    encode({ frame, tunables }) {
      ledEmittersDraw.set({
        cfg: lightSourcesUniform(simSize, tunables, opts.mark),
      });
      frame.pass(
        { target: colorTarget, clear: [0, 0, 0, 1000] },
        (pass: FramePass) => pass.bundles(emittersBundle)
      );
    },
    destroy() {
      const texture = (
        colorTarget.color as unknown as { gpu?: { destroy?: () => void } }
      )?.gpu;
      texture?.destroy?.();
      ledGeometry.destroy();
    },
  };
}

function lightSourcesUniform(
  size: RenderSize,
  tunables: LightTunables,
  mark: MarkGeometry
) {
  return {
    resolution: [size.width, size.height, 0, 0],
    tunables: [
      tunables.ledIntensity,
      tunables.brightnessMin,
      tunables.brightnessMax,
      0,
    ],
    counts: [mark.segmentCount, mark.hullCount, 0, 0],
  };
}

function initialLightSourcesUniform() {
  return {
    resolution: [0, 0, 0, 0],
    tunables: [0, 0, 0, 0],
    counts: [0, 0, 0, 0],
  };
}

/**
 * Um quad por LED: ao longo da tangente (meio comprimento + folga) e, na
 * normal, do contorno até `depth` para dentro do sólido (mais a folga dos dois
 * lados — o shader recorta o que sai do "b").
 */
function ledEmitterVertexData(mark: MarkGeometry, pad: number): Float32Array {
  const layout = markLedLayout(mark);
  const values: number[] = [];
  const inner = -(layout.depth + pad);
  const outer = pad;
  for (const [ledIndex, led] of layout.positions.entries()) {
    const dir = { x: Math.cos(led.angle), y: Math.sin(led.angle) };
    const normal = { x: led.nx, y: led.ny };
    const half = led.halfLength + pad;
    const corners = [
      { t: -half, n: inner },
      { t: half, n: inner },
      { t: half, n: outer },
      { t: -half, n: outer },
    ] as const;
    for (const cornerIndex of [0, 1, 2, 0, 2, 3] as const) {
      const corner = corners[cornerIndex];
      values.push(
        led.x + dir.x * corner.t + normal.x * corner.n,
        led.y + dir.y * corner.t + normal.y * corner.n,
        ledIndex
      );
    }
  }
  return new Float32Array(values);
}
