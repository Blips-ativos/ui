// Uniform layout and optical helpers shared by the two glass interfaces.

import { env_lod, sample_env } from "../../../environment/environment-map-common.wgsl";
import { rotateEnvironmentDirection } from "../../../environment/environment.wgsl";

export struct Glass {
  viewProjection: mat4x4f,
  environmentRotation: mat4x4f,
  cameraPosition: vec3f,
  /** Beer-Lambert absorption per scene unit, in linear RGB. */
  absorption: vec3f,
  environmentSize: vec2f,
  frontZ: f32,
  backZ: f32,
  ior: f32,
  reflectionStrength: f32,
  environmentExposure: f32,
  environmentDebug: f32,
  environmentTexelAngle: f32,
  /** Schlick reflectance at normal incidence, derived from `ior` on the CPU. */
  fresnelF0: f32,
  /** Quantos itens de `segments` são válidos (o resto é zero). */
  segmentCount: u32,
  /**
   * Contorno do "b" extrudado (`prismSegments()` em `prism-mesh.ts`): cada item
   * é `(início.xy, fim.xy)` de uma aresta com o sólido à esquerda, então a
   * normal externa é `(e.y, -e.x)`. As paredes laterais são essas arestas entre
   * `backZ` e `frontZ`; as tampas são os planos z. Tamanho fixo =
   * `PRISM_MAX_SEGMENTS` (literal porque a reflexão da vgpu lê o tamanho).
   */
  segments: array<vec4f, 192>,
}

/**
 * O que a amostragem do ambiente lê do `Glass`. Passado por valor no lugar do
 * uniform inteiro, que agora carrega 192 segmentos (copiá-lo a cada chamada
 * seria caro e arriscado em alguns compiladores de shader).
 */
export struct GlassEnvironment {
  rotation: mat4x4f,
  size: vec2f,
  exposure: f32,
  debug: f32,
}

export fn glassEnvironment(
  direction: vec3f,
  environment: GlassEnvironment,
  studioEnvironment: texture_2d<f32>,
  debugEnvironment: texture_2d<f32>,
  environmentSampler: sampler,
  lod: f32,
) -> vec3f {
  let rotatedDirection = rotateEnvironmentDirection(
    direction,
    environment.rotation,
  );
  let maxLod = f32(textureNumLevels(studioEnvironment) - 1u);
  let safeLod = clamp(lod, 0.0, maxLod);
  if (environment.debug > 0.5) {
    return sample_env(
      debugEnvironment,
      environmentSampler,
      rotatedDirection,
      safeLod,
      environment.size,
    ) * environment.exposure;
  }
  return sample_env(
    studioEnvironment,
    environmentSampler,
    rotatedDirection,
    safeLod,
    environment.size,
  ) * environment.exposure;
}

export fn glassEnvironmentLod(direction: vec3f, texelAngle: f32) -> f32 {
  return env_lod(
    0.0,
    dpdx(direction),
    dpdy(direction),
    texelAngle,
  );
}

export fn dielectricFresnel(f0: f32, facing: f32) -> f32 {
  let oneMinusFacing = 1.0 - clamp(facing, 0.0, 1.0);
  let squared = oneMinusFacing * oneMinusFacing;
  let fifth = squared * squared * oneMinusFacing;
  return f0 + (1.0 - f0) * fifth;
}
