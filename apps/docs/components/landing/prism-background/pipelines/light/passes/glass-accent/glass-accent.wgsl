// Light-theme-only reflected layer. The shared physical glass stays untouched;
// this pass restores the broad neutral bands and bevel highlights that disappear
// when that transparent material is viewed against an almost-white wall.

import {
  Glass,
  GlassEnvironment,
  dielectricFresnel,
  glassEnvironment,
  glassEnvironmentLod,
} from "../../../shared/glass/glass-common.wgsl";

struct GlassAccent {
  bandCenter: f32,
  bandWidth: f32,
  bandStrength: f32,
  baseReflection: f32,
  rimStrength: f32,
  baseRimStrength: f32,
  environmentLodBias: f32,
  highlightStrength: f32,
}

@group(0) @binding(0) var<uniform> params: Glass;
@group(0) @binding(1) var<uniform> accent: GlassAccent;
@group(0) @binding(2) var studioEnvironment: texture_2d<f32>;
@group(0) @binding(3) var debugEnvironment: texture_2d<f32>;
@group(0) @binding(4) var environmentSampler: sampler;

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) worldPosition: vec3f,
  @location(1) worldNormal: vec3f,
}

@vertex
fn vs_main(@location(0) position: vec3f, @location(1) normal: vec3f) -> VertexOut {
  var out: VertexOut;
  out.position = params.viewProjection * vec4f(position, 1.0);
  out.worldPosition = position;
  out.worldNormal = normal;
  return out;
}

/** Mesmo valor de `PRISM_MAX_SEGMENTS` / tamanho de `Glass.segments`. */
const MAX_SEGMENTS: u32 = 192u;

fn segmentDistance(point: vec2f, start: vec2f, end: vec2f) -> f32 {
  let edge = end - start;
  let t = clamp(dot(point - start, edge) / max(dot(edge, edge), 1e-8), 0.0, 1.0);
  return distance(point, start + edge * t);
}

/**
 * Distâncias até o contorno do "b": `x` = qualquer aresta, `y` = só arestas
 * voltadas para baixo (normal externa com y < -0.7), o "pé" que recebe o rim
 * quente. Substitui as três linhas do triângulo original.
 */
fn outlineDistances(point: vec2f) -> vec2f {
  var nearest = 1000.0;
  var lower = 1000.0;
  let count = min(params.segmentCount, MAX_SEGMENTS);
  for (var index = 0u; index < count; index = index + 1u) {
    let segment = params.segments[index];
    let distanceToEdge = segmentDistance(point, segment.xy, segment.zw);
    nearest = min(nearest, distanceToEdge);
    let edge = segment.zw - segment.xy;
    let outwardY = -edge.x / max(length(edge), 0.0001);
    if (outwardY < -0.7) { lower = min(lower, distanceToEdge); }
  }
  return vec2f(nearest, lower);
}

fn band(distance: f32, center: f32, width: f32) -> f32 {
  let coordinate = (distance - center) / max(width, 0.0001);
  return exp(-coordinate * coordinate);
}

fn rim(distance: f32, width: f32) -> f32 {
  return 1.0 - smoothstep(width * 0.35, width, distance);
}

@fragment
fn fs_main(in: VertexOut) -> @location(0) vec4f {
  let normal = normalize(in.worldNormal);
  let view = normalize(params.cameraPosition - in.worldPosition);
  let incident = -view;
  let reflectedDirection = reflect(incident, normal);
  let reflected = glassEnvironment(
    reflectedDirection,
    GlassEnvironment(
      params.environmentRotation,
      params.environmentSize,
      params.environmentExposure,
      params.environmentDebug,
    ),
    studioEnvironment,
    debugEnvironment,
    environmentSampler,
    glassEnvironmentLod(reflectedDirection, params.environmentTexelAngle)
      + accent.environmentLodBias,
  );

  // Versão Blips: as faixas seguem a distância ao contorno do "b" inteiro em
  // vez das três arestas do triângulo; o rim quente fica nas arestas de baixo.
  let distances = outlineDistances(in.worldPosition.xy);
  let edgeDistance = distances.x;
  let baseDistance = distances.y;
  let edgeBand = band(edgeDistance, accent.bandCenter, accent.bandWidth);
  let lowerBand = band(baseDistance, accent.bandCenter, accent.bandWidth);
  let innerBand = max(edgeBand * 0.84, lowerBand * 0.38);
  let frontRim = rim(edgeDistance, accent.bandWidth * 0.55);
  let baseRim = band(baseDistance, 0.0, accent.bandWidth * 0.7);

  let facing = clamp(dot(view, normal), 0.0, 1.0);
  let fresnel = dielectricFresnel(params.fresnelF0, facing);
  let bevel = pow(clamp(1.0 - abs(normal.z), 0.0, 1.0), 2.2);
  let coverage = clamp(
    accent.baseReflection
      + innerBand * accent.bandStrength
      + bevel * (0.18 + fresnel * 0.48),
    0.0,
    0.56,
  );

  let reflectedLuminance = dot(reflected, vec3f(0.2126, 0.7152, 0.0722));
  let panel = smoothstep(0.08, 0.72, reflectedLuminance);
  let neutralBand = vec3f(0.052, 0.057, 0.066);
  let reflectedTone = max(reflected * accent.highlightStrength, vec3f(0.0));
  let tone = mix(neutralBand, reflectedTone, panel);
  let neutralRim = vec3f(0.92, 0.95, 1.0)
    * (bevel + frontRim * 0.72)
    * accent.rimStrength;
  let warmBaseRim = vec3f(1.0, 0.91, 0.78) * baseRim * accent.baseRimStrength;

  return vec4f(tone * coverage + neutralRim + warmBaseRim, coverage);
}
