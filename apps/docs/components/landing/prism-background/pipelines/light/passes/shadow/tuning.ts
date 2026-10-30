import type { Geometry, Gpu } from "vgpu";
import { BLIPS_MARK_OUTER } from "../../../../scene/blips-mark";
import { PRISM_SIDE } from "../../../../types";
import { createShadowGeometry } from "./mesh";

export const LIGHT_SHADOW_TUNING = Object.freeze({
  projection: [PRISM_SIDE * 0.65, -PRISM_SIDE * 0.78] as const,
  nearPenumbra: PRISM_SIDE * 0.015,
  farPenumbra: PRISM_SIDE * 0.1,
  midRing: 0.48,
  midCoverage: 0.32,
  opacity: 0.46,
  farStrength: 0.92,
  color: [0.04, 0.037, 0.033] as const,
});

export function createPrismShadowGeometry(gpu: Gpu, label: string): Geometry {
  // Sombra projetada do contorno externo do "b" (fecho convexo), não do proxy.
  return createShadowGeometry(
    gpu,
    label,
    BLIPS_MARK_OUTER,
    LIGHT_SHADOW_TUNING
  );
}

export function prismShadowUniforms(
  viewProjection: ArrayLike<number>
): Record<string, unknown> {
  return {
    viewProjection,
    color: LIGHT_SHADOW_TUNING.color,
    opacity: LIGHT_SHADOW_TUNING.opacity,
    farStrength: LIGHT_SHADOW_TUNING.farStrength,
  };
}
