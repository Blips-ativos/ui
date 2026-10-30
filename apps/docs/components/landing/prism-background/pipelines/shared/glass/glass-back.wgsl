// Inner/back interface of the prism.
//
// This is an environment-only background layer: it never reads the scene target.
// Premultiplied Fresnel blending supplies its reflection while the previously
// drawn wall and external light remain the transmitted component. Internal light
// is drawn afterwards. The front interface refracts this resolved composition.

import {
  Glass,
  GlassEnvironment,
  dielectricFresnel,
  glassEnvironment,
} from "./glass-common.wgsl";
import { env_lod } from "../../../environment/environment-map-common.wgsl";
import { RayDirection, reflectRay, refractRay } from "./ray-footprint.wgsl";

@group(0) @binding(0) var<uniform> params: Glass;
@group(0) @binding(1) var studioEnvironment: texture_2d<f32>;
@group(0) @binding(2) var debugEnvironment: texture_2d<f32>;
@group(0) @binding(3) var environmentSampler: sampler;

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) worldPosition: vec3f,
  @location(1) worldNormal: vec3f,
};

struct SurfaceHit {
  distance: f32,
  outwardNormal: vec3f,
  planeIndex: u32,
};

struct ExitPath {
  position: vec3f,
  direction: RayDirection,
  incidentDirection: RayDirection,
  inwardNormal: RayDirection,
  escaped: u32,
  planeIndex: u32,
};

const NO_HIT: f32 = 100000.0;
/** Mesmo valor de `PRISM_MAX_SEGMENTS` / tamanho de `Glass.segments`. */
const MAX_SEGMENTS: u32 = 192u;
// Identidade das superfícies: 0..segmentCount-1 são as paredes (um segmento do
// contorno cada); as tampas e o "nenhuma" ficam fora dessa faixa.
const FRONT_CAP: u32 = 200u;
const BACK_CAP: u32 = 201u;
// A face rasterizada (com normais suavizadas no bojo) não é identificada com
// nenhuma superfície ideal.
const NO_PLANE: u32 = 255u;
const MAX_INTERNAL_BOUNCES: u32 = 3u;
/** Folga no parâmetro do segmento, para um raio que passa num vértice não vazar. */
const SEGMENT_SLACK: f32 = 0.0001;

fn sampleEnvironment(direction: RayDirection) -> vec3f {
  return glassEnvironment(
    direction.value,
    GlassEnvironment(
      params.environmentRotation,
      params.environmentSize,
      params.environmentExposure,
      params.environmentDebug,
    ),
    studioEnvironment,
    debugEnvironment,
    environmentSampler,
    env_lod(0.0, direction.dx, direction.dy, params.environmentTexelAngle),
  );
}

@vertex
fn vs_main(@location(0) position: vec3f, @location(1) normal: vec3f) -> VertexOut {
  var out: VertexOut;
  out.position = params.viewProjection * vec4f(position, 1.0);
  out.worldPosition = position;
  out.worldNormal = normal;
  return out;
}

/**
 * Superfície ideal mais próxima alcançada por um raio já dentro do vidro.
 *
 * O "b" extrudado não é convexo, então a saída é o cruzamento de saída mais
 * próximo entre a tampa para onde o raio anda e as paredes (segmentos do
 * contorno entre `backZ` e `frontZ`) que ele cruza de dentro para fora — o
 * denominador `cross(d, e)` é `dot(normal externa, d)`, positivo só nesse caso.
 * Partindo de dentro, uma tampa alcançada antes de toda parede está dentro do
 * "b", então as tampas não precisam de teste ponto-no-polígono.
 *
 * A interface que acabamos de deixar é excluída pela identidade: empurrar a
 * origem ou rejeitar distâncias curtas pode pular outra face perto de um canto.
 */
fn nextSurface(origin: vec3f, direction: vec3f, departedPlane: u32) -> SurfaceHit {
  var nearest = NO_HIT;
  var planeIndex = NO_PLANE;
  var normal = vec3f(0.0, 0.0, 1.0);
  if (direction.z > 0.00001 && departedPlane != FRONT_CAP) {
    let distance = (params.frontZ - origin.z) / direction.z;
    if (distance >= 0.0) {
      nearest = distance;
      planeIndex = FRONT_CAP;
      normal = vec3f(0.0, 0.0, 1.0);
    }
  } else if (direction.z < -0.00001 && departedPlane != BACK_CAP) {
    let distance = (params.backZ - origin.z) / direction.z;
    if (distance >= 0.0) {
      nearest = distance;
      planeIndex = BACK_CAP;
      normal = vec3f(0.0, 0.0, -1.0);
    }
  }

  let count = min(params.segmentCount, MAX_SEGMENTS);
  for (var index = 0u; index < count; index = index + 1u) {
    if (index == departedPlane) { continue; }
    let segment = params.segments[index];
    let edge = segment.zw - segment.xy;
    let edgeLength = length(edge);
    let denominator = direction.x * edge.y - direction.y * edge.x;
    if (denominator <= 0.00001 * edgeLength) { continue; }
    let toStart = segment.xy - origin.xy;
    let distance = (toStart.x * edge.y - toStart.y * edge.x) / denominator;
    let along = (toStart.x * direction.y - toStart.y * direction.x) / denominator;
    if (
      distance >= 0.0
      && distance < nearest
      && along >= -SEGMENT_SLACK
      && along <= 1.0 + SEGMENT_SLACK
    ) {
      nearest = distance;
      planeIndex = index;
      normal = vec3f(edge.y / edgeLength, -edge.x / edgeLength, 0.0);
    }
  }
  return SurfaceHit(nearest, normal, planeIndex);
}

/**
 * Follow glass -> air transmission, continuing through real TIR bounces.
 *
 * The rasterized back face supplies the first interface normal. Subsequent hits
 * use the same ideal surfaces as the outer shader (segmentos do "b" + tampas).
 * O limite de três reflexões vem de `PRISM_MAX_INTERNAL_BOUNCES`; num sólido
 * não convexo raios presos além disso são tratados como não escapados.
 */
fn traceExit(
  firstPosition: vec3f,
  firstDirection: RayDirection,
  firstInwardNormal: RayDirection,
  firstPlane: u32,
) -> ExitPath {
  var position = firstPosition;
  var direction = firstDirection;
  var inwardNormal = firstInwardNormal;
  var planeIndex = firstPlane;

  for (var bounce = 0u; bounce <= MAX_INTERNAL_BOUNCES; bounce = bounce + 1u) {
    let transmitted = refractRay(direction, inwardNormal, params.ior);
    if (length(transmitted.value) > 0.00001) {
      return ExitPath(position, transmitted, direction, inwardNormal, 1u, planeIndex);
    }

    direction = reflectRay(direction, inwardNormal);
    let hit = nextSurface(position, direction.value, planeIndex);
    if (hit.distance >= 10.0) { break; }
    position = position + direction.value * hit.distance;
    planeIndex = hit.planeIndex;
    // Subsequent interfaces are ideal planes with constant local normals.
    inwardNormal = RayDirection(-hit.outwardNormal, vec3f(0.0), vec3f(0.0));
  }

  return ExitPath(position, direction, direction, inwardNormal, 0u, planeIndex);
}

/**
 * An inner-face reflection remains inside the solid. Follow it to the next
 * interface (and through any subsequent TIR bounces) before using its direction
 * to sample the exterior studio environment.
 */
fn traceReflectedEnvironmentExit(
  surfacePosition: vec3f,
  incidentDirection: RayDirection,
  inwardNormal: RayDirection,
  departedPlane: u32,
) -> ExitPath {
  let direction = reflectRay(incidentDirection, inwardNormal);
  let hit = nextSurface(surfacePosition, direction.value, departedPlane);
  if (hit.distance >= 10.0) {
    return ExitPath(surfacePosition, direction, direction, inwardNormal, 0u, departedPlane);
  }
  let position = surfacePosition + direction.value * hit.distance;
  return traceExit(
    position,
    direction,
    RayDirection(-hit.outwardNormal, vec3f(0.0), vec3f(0.0)),
    hit.planeIndex,
  );
}

@fragment
fn fs_main(in: VertexOut) -> @location(0) vec4f {
  let view = normalize(params.cameraPosition - in.worldPosition);
  let incident = -view;
  // Back-facing triangles expose their inward normal to the camera ray.
  let inwardNormal = -normalize(in.worldNormal);
  // Capture derivatives before tracing. Adjacent pixels can hit different faces
  // or take different TIR paths; differentiating their final directions would
  // mistake that jump for a broad footprint and paint blurred mip seams.
  let exit = traceExit(
    in.worldPosition,
    RayDirection(incident, dpdx(incident), dpdy(incident)),
    RayDirection(inwardNormal, dpdx(inwardNormal), dpdy(inwardNormal)),
    NO_PLANE,
  );

  let reflectedExit = traceReflectedEnvironmentExit(
    exit.position,
    exit.incidentDirection,
    exit.inwardNormal,
    exit.planeIndex,
  );
  let reflectedFacing = clamp(
    -dot(reflectedExit.incidentDirection.value, reflectedExit.inwardNormal.value),
    0.0,
    1.0,
  );
  let reflectedExitTransmission = select(
    0.0,
    1.0 - dielectricFresnel(params.fresnelF0, reflectedFacing),
    reflectedExit.escaped != 0u,
  );
  let reflectedEnvironment = sampleEnvironment(reflectedExit.direction)
    * params.reflectionStrength
    * reflectedExitTransmission;
  let facing = clamp(-dot(exit.incidentDirection.value, exit.inwardNormal.value), 0.0, 1.0);
  let fresnel = dielectricFresnel(params.fresnelF0, facing);
  let reflectionWeight = select(
    1.0,
    fresnel,
    exit.escaped != 0u,
  );
  return vec4f(reflectedEnvironment * reflectionWeight, reflectionWeight);
}
