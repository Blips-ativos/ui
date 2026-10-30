/**
 * Procedural glass geometry.
 *
 * O sólido visível é a extrusão do símbolo "b" da Blips (`blips-mark.ts`): cada
 * laço vira uma parede lateral e as tampas frontal/traseira são trianguladas com
 * earcut (o disco do bojo tem um furo). As paredes usam normais planas por
 * aresta nos trechos retos e normais suavizadas onde arestas curtas vizinhas são
 * quase colineares, para o bojo ler como curva. Sem chanfro, por ora.
 *
 * A luz espectral continua sendo resolvida pelo triângulo de `types.ts`, agora
 * um "proxy óptico" posicionado dentro da haste do "b"; os shaders de vidro
 * (`glass.wgsl`, `glass-back.wgsl`) percorrem os segmentos do "b" enviados por
 * `prismSegments()`, então refração e TIR seguem a silhueta real.
 *
 * `triangularPrismMeshData` mantém o prisma triangular arredondado original
 * (port do vgpu), sem uso na cena, para referência ou para reverter.
 */

import earcut from "earcut";
import type { Geometry, Gpu } from "vgpu";
import { geometry } from "vgpu";

import {
  PRISM_BACK_Z,
  PRISM_FRONT_Z,
  PRISM_TRIANGLE,
  type Triangle,
} from "../types";
import { BLIPS_MARK_LOOPS, BLIPS_MARK_POLYGONS } from "./blips-mark";

type Vec2 = readonly [number, number];
type Vec3 = readonly [number, number, number];

interface ContourPoint {
  readonly position: Vec2;
  readonly normal: Vec2;
}

export interface PrismMeshData {
  /** Interleaved position (xyz) then normal (xyz), 6 floats per vertex. */
  readonly vertices: Float32Array<ArrayBuffer>;
  /** Uint16 enquanto couber; Uint32 se a malha passar de 65535 vértices. */
  readonly indices: Uint16Array<ArrayBuffer> | Uint32Array<ArrayBuffer>;
}

/** Bytes between two vertices of `PrismMeshData.vertices`. */
export const PRISM_VERTEX_STRIDE = 24;
/** 0.8 mm fillet on the 57 mm text-to-cad reference scale. */
export const PRISM_BEVEL_RADIUS = 0.008;
/** Arc subdivisions around each triangular corner. */
export const PRISM_CORNER_SEGMENTS = 4;
/** Quarter-round subdivisions between each broad side and cap. */
export const PRISM_BEVEL_SEGMENTS = 4;
/** Longitudinal subdivisions along each straight run of the rounded contour. */
export const PRISM_EDGE_SEGMENTS = 16;

/** Máximo de segmentos do contorno que o uniform `Glass.segments` comporta. */
export const PRISM_MAX_SEGMENTS = 192;
/** Arestas mais curtas que isto (unidades de cena) contam como trecho de curva. */
const SMOOTH_EDGE_MAX_LENGTH = 0.03;
/** Ângulo máximo entre normais vizinhas para suavizar o vértice. */
const SMOOTH_MAX_TURN_COS = Math.cos((40 * Math.PI) / 180);

/**
 * O sólido de vidro da cena: o "b" da Blips extrudado entre `backZ` e `frontZ`,
 * com faces anti-horárias vistas de fora (`cull: 'back'` mantém as frontais).
 */
export function prismMeshData(
  backZ = PRISM_BACK_Z,
  frontZ = PRISM_FRONT_Z
): PrismMeshData {
  return extrudedLoopsMeshData(BLIPS_MARK_POLYGONS, backZ, frontZ);
}

/**
 * Extrusão genérica de polígonos com furos (cada polígono = contorno seguido
 * dos furos, sólido à esquerda de toda aresta orientada).
 */
export function extrudedLoopsMeshData(
  polygons: readonly (readonly (readonly Vec2[])[])[],
  backZ: number,
  frontZ: number
): PrismMeshData {
  const vertices: number[] = [];
  const indices: number[] = [];
  const push = (position: Vec3, normal: Vec3): number => {
    const index = vertices.length / 6;
    vertices.push(...position, ...normal);
    return index;
  };

  for (const polygon of polygons) {
    for (const loop of polygon) addWalls(loop);
    addCaps(polygon);
  }

  const vertexCount = vertices.length / 6;
  return {
    vertices: new Float32Array(vertices),
    indices:
      vertexCount > 65_535
        ? new Uint32Array(indices)
        : new Uint16Array(indices),
  };

  function addWalls(loop: readonly Vec2[]): void {
    const count = loop.length;
    const edgeNormals = loop.map((start, index) =>
      outwardNormal(start, loop[(index + 1) % count]!)
    );
    const edgeLengths = loop.map((start, index) => {
      const end = loop[(index + 1) % count]!;
      return Math.hypot(end[0] - start[0], end[1] - start[1]);
    });
    // Normal que a aresta `edge` usa no vértice `vertex` (início ou fim dela).
    const normalAt = (edge: number, vertex: number): Vec2 => {
      const previous = (vertex + count - 1) % count;
      const next = vertex;
      const own = edgeNormals[edge]!;
      const a = edgeNormals[previous]!;
      const b = edgeNormals[next]!;
      if (dot2(a, b) < SMOOTH_MAX_TURN_COS) return own;
      const aShort = edgeLengths[previous]! < SMOOTH_EDGE_MAX_LENGTH;
      const bShort = edgeLengths[next]! < SMOOTH_EDGE_MAX_LENGTH;
      if (aShort && bShort) return normalize2([a[0] + b[0], a[1] + b[1]]);
      // Curva encontrando reta: a curva herda a normal da reta (tangente
      // contínua) e a reta continua plana.
      if (aShort && !bShort) return b;
      if (bShort && !aShort) return a;
      return own;
    };
    for (let edge = 0; edge < count; edge++) {
      const following = (edge + 1) % count;
      const start = loop[edge]!;
      const end = loop[following]!;
      const startNormal = normalAt(edge, edge);
      const endNormal = normalAt(edge, following);
      const startBack = push(
        [start[0], start[1], backZ],
        [startNormal[0], startNormal[1], 0]
      );
      const endBack = push(
        [end[0], end[1], backZ],
        [endNormal[0], endNormal[1], 0]
      );
      const endFront = push(
        [end[0], end[1], frontZ],
        [endNormal[0], endNormal[1], 0]
      );
      const startFront = push(
        [start[0], start[1], frontZ],
        [startNormal[0], startNormal[1], 0]
      );
      indices.push(
        startBack,
        endBack,
        endFront,
        startBack,
        endFront,
        startFront
      );
    }
  }

  function addCaps(polygon: readonly (readonly Vec2[])[]): void {
    const flat: number[] = [];
    const holes: number[] = [];
    polygon.forEach((loop, index) => {
      if (index > 0) holes.push(flat.length / 2);
      for (const point of loop) flat.push(point[0], point[1]);
    });
    const triangles = earcut(flat, holes.length ? holes : undefined, 2);
    const pointCount = flat.length / 2;
    const front: number[] = [];
    const back: number[] = [];
    for (let point = 0; point < pointCount; point++) {
      const x = flat[point * 2]!;
      const y = flat[point * 2 + 1]!;
      front.push(push([x, y, frontZ], [0, 0, 1]));
      back.push(push([x, y, backZ], [0, 0, -1]));
    }
    for (let triangle = 0; triangle < triangles.length; triangle += 3) {
      let a = triangles[triangle]!;
      let b = triangles[triangle + 1]!;
      const c = triangles[triangle + 2]!;
      // O earcut não garante sentido: força anti-horário visto de +z.
      const area =
        (flat[b * 2]! - flat[a * 2]!) * (flat[c * 2 + 1]! - flat[a * 2 + 1]!) -
        (flat[b * 2 + 1]! - flat[a * 2 + 1]!) * (flat[c * 2]! - flat[a * 2]!);
      if (area < 0) [a, b] = [b, a];
      indices.push(front[a]!, front[b]!, front[c]!);
      // A tampa traseira olha para -z: sentido invertido.
      indices.push(back[a]!, back[c]!, back[b]!);
    }
  }
}

/**
 * Segmentos do contorno do "b" para `Glass.segments`: `(início.xy, fim.xy)` por
 * `vec4f`, completados com zeros até `PRISM_MAX_SEGMENTS` (o empacotador da vgpu
 * exige o tamanho exato do array). Sólido à esquerda de cada segmento, então a
 * normal externa é `(e.y, -e.x)`.
 */
export function prismSegments(
  loops: readonly (readonly Vec2[])[] = BLIPS_MARK_LOOPS
): {
  readonly count: number;
  readonly segments: readonly (readonly [number, number, number, number])[];
} {
  const segments: (readonly [number, number, number, number])[] = [];
  for (const loop of loops) {
    loop.forEach((start, index) => {
      const end = loop[(index + 1) % loop.length]!;
      segments.push([start[0], start[1], end[0], end[1]]);
    });
  }
  const count = segments.length;
  if (count > PRISM_MAX_SEGMENTS) {
    throw new Error(
      `O contorno tem ${count} segmentos; o shader comporta ${PRISM_MAX_SEGMENTS}.`
    );
  }
  while (segments.length < PRISM_MAX_SEGMENTS) segments.push([0, 0, 0, 0]);
  return { count, segments };
}

/**
 * Vertices and indices for the rounded triangular prism (the original vgpu
 * solid), wound counter-clockwise from outside. Sem uso na cena atual.
 */
export function triangularPrismMeshData(
  triangle: Triangle = PRISM_TRIANGLE,
  backZ = PRISM_BACK_Z,
  frontZ = PRISM_FRONT_Z
): PrismMeshData {
  const depth = Math.max(0, frontZ - backZ);
  const radius = Math.min(PRISM_BEVEL_RADIUS, depth * 0.45);
  const contour = roundedTriangleContour(triangle, radius);
  const vertices: number[] = [];
  const indices: number[] = [];
  const rings: number[][] = [];

  const push = (position: Vec3, normal: Vec3): number => {
    const index = vertices.length / 6;
    vertices.push(...position, ...normal);
    return index;
  };
  const addRing = (theta: number, z: number, zNormal: number): number[] => {
    const inset = radius * (1 - Math.cos(theta));
    const xyWeight = Math.cos(theta);
    const ring = contour.map(({ position, normal }) =>
      push(
        [position[0] - normal[0] * inset, position[1] - normal[1] * inset, z],
        [normal[0] * xyWeight, normal[1] * xyWeight, zNormal]
      )
    );
    rings.push(ring);
    return ring;
  };

  // Stop a fraction short of pi/2 so the tiny cap corner arcs retain positive
  // area instead of collapsing every sample at a corner onto the same point.
  const maxTheta = Math.PI / 2 - 0.06;
  const maxSine = Math.sin(maxTheta);
  for (let step = PRISM_BEVEL_SEGMENTS; step >= 0; step--) {
    const theta = (maxTheta * step) / PRISM_BEVEL_SEGMENTS;
    addRing(
      theta,
      backZ + radius - (radius * Math.sin(theta)) / maxSine,
      -Math.sin(theta)
    );
  }
  for (let step = 0; step <= PRISM_BEVEL_SEGMENTS; step++) {
    const theta = (maxTheta * step) / PRISM_BEVEL_SEGMENTS;
    addRing(
      theta,
      frontZ - radius + (radius * Math.sin(theta)) / maxSine,
      Math.sin(theta)
    );
  }

  for (let band = 0; band < rings.length - 1; band++) {
    const current = rings[band]!;
    const next = rings[band + 1]!;
    for (let point = 0; point < contour.length; point++) {
      const following = (point + 1) % contour.length;
      indices.push(
        current[point]!,
        current[following]!,
        next[following]!,
        current[point]!,
        next[following]!,
        next[point]!
      );
    }
  }

  addCap(rings[0]!, [0, 0, -1], true);
  addCap(rings[rings.length - 1]!, [0, 0, 1], false);

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  };

  function addCap(
    sourceRing: readonly number[],
    normal: Vec3,
    reverse: boolean
  ): void {
    const cap = sourceRing.map((source) => {
      const base = source * 6;
      return push(
        [vertices[base]!, vertices[base + 1]!, vertices[base + 2]!],
        normal
      );
    });
    const center: Vec3 = [
      cap.reduce((sum, index) => sum + vertices[index * 6]!, 0) / cap.length,
      cap.reduce((sum, index) => sum + vertices[index * 6 + 1]!, 0) /
        cap.length,
      cap.reduce((sum, index) => sum + vertices[index * 6 + 2]!, 0) /
        cap.length,
    ];
    const centerIndex = push(center, normal);
    for (let point = 0; point < cap.length; point++) {
      const following = (point + 1) % cap.length;
      if (reverse) indices.push(centerIndex, cap[following]!, cap[point]!);
      else indices.push(centerIndex, cap[point]!, cap[following]!);
    }
  }
}

/** Unique line-list edges for visualising the generated topology. */
export function prismWireframeIndices(
  triangleIndices: Uint16Array<ArrayBuffer> | Uint32Array<ArrayBuffer>
): Uint16Array<ArrayBuffer> | Uint32Array<ArrayBuffer> {
  const seen = new Set<number>();
  const edges: number[] = [];
  for (let triangle = 0; triangle < triangleIndices.length; triangle += 3) {
    append(triangleIndices[triangle]!, triangleIndices[triangle + 1]!);
    append(triangleIndices[triangle + 1]!, triangleIndices[triangle + 2]!);
    append(triangleIndices[triangle + 2]!, triangleIndices[triangle]!);
  }
  return triangleIndices instanceof Uint32Array
    ? new Uint32Array(edges)
    : new Uint16Array(edges);

  function append(a: number, b: number): void {
    const start = Math.min(a, b);
    const end = Math.max(a, b);
    // 2^21 vértices bastam com folga e mantêm a chave um inteiro seguro.
    const key = start * 2_097_152 + end;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push(start, end);
  }
}

/** Uploads the solid glass mesh. The caller owns it and must `destroy()` it. */
export function prismGeometry(gpu: Gpu, label: string): Geometry {
  const { vertices, indices } = prismMeshData();
  return upload(gpu, label, vertices, indices);
}

/** Uploads the same mesh as unique triangle edges for a line-list overlay. */
export function prismWireframeGeometry(gpu: Gpu, label: string): Geometry {
  const { vertices, indices } = prismMeshData();
  return upload(gpu, label, vertices, prismWireframeIndices(indices), true);
}

function upload(
  gpu: Gpu,
  label: string,
  vertices: Float32Array<ArrayBuffer>,
  indices: Uint16Array<ArrayBuffer> | Uint32Array<ArrayBuffer>,
  wireframe = false
): Geometry {
  return geometry(gpu, {
    label,
    ...(wireframe ? { topology: "line-list" as const } : {}),
    buffers: [
      {
        data: vertices,
        stride: PRISM_VERTEX_STRIDE,
        attributes: { position: "float32x3", normal: "float32x3" },
      },
    ],
    indices,
  });
}

function roundedTriangleContour(
  triangle: Triangle,
  radius: number
): ContourPoint[] {
  const corners = [triangle.a, triangle.b, triangle.c];
  const arcs = corners.map((corner, index) => {
    const previous = corners[(index + corners.length - 1) % corners.length]!;
    const next = corners[(index + 1) % corners.length]!;
    const towardPrevious = normalize2([
      previous[0] - corner[0],
      previous[1] - corner[1],
    ]);
    const towardNext = normalize2([next[0] - corner[0], next[1] - corner[1]]);
    const halfAngle =
      Math.acos(clamp(dot2(towardPrevious, towardNext), -1, 1)) / 2;
    const tangentDistance = radius / Math.max(Math.tan(halfAngle), 1e-6);
    const centerDistance = radius / Math.max(Math.sin(halfAngle), 1e-6);
    const bisector = normalize2([
      towardPrevious[0] + towardNext[0],
      towardPrevious[1] + towardNext[1],
    ]);
    const center: Vec2 = [
      corner[0] + bisector[0] * centerDistance,
      corner[1] + bisector[1] * centerDistance,
    ];
    const start: Vec2 = [
      corner[0] + towardPrevious[0] * tangentDistance,
      corner[1] + towardPrevious[1] * tangentDistance,
    ];
    const end: Vec2 = [
      corner[0] + towardNext[0] * tangentDistance,
      corner[1] + towardNext[1] * tangentDistance,
    ];
    const startAngle = Math.atan2(start[1] - center[1], start[0] - center[0]);
    let endAngle = Math.atan2(end[1] - center[1], end[0] - center[0]);
    while (endAngle <= startAngle) endAngle += Math.PI * 2;
    return Array.from(
      { length: PRISM_CORNER_SEGMENTS + 1 },
      (_, step): ContourPoint => {
        const angle =
          startAngle + ((endAngle - startAngle) * step) / PRISM_CORNER_SEGMENTS;
        const normal: Vec2 = [Math.cos(angle), Math.sin(angle)];
        return {
          position: [
            center[0] + normal[0] * radius,
            center[1] + normal[1] * radius,
          ],
          normal,
        };
      }
    );
  });

  return arcs.flatMap((arc, index) => {
    const end = arc[arc.length - 1]!;
    const nextArc = arcs[(index + 1) % arcs.length]!;
    const nextStart = nextArc[0]!;
    const edgeNormal = outwardNormal(
      corners[index]!,
      corners[(index + 1) % corners.length]!
    );
    const straight = Array.from(
      { length: PRISM_EDGE_SEGMENTS - 1 },
      (_, step): ContourPoint => {
        const amount = (step + 1) / PRISM_EDGE_SEGMENTS;
        return {
          position: [
            end.position[0] +
              (nextStart.position[0] - end.position[0]) * amount,
            end.position[1] +
              (nextStart.position[1] - end.position[1]) * amount,
          ],
          normal: edgeNormal,
        };
      }
    );
    return [...arc, ...straight];
  });
}

function normalize2(value: Vec2): Vec2 {
  const length = Math.hypot(...value) || 1;
  return [value[0] / length, value[1] / length];
}

function dot2(a: Vec2, b: Vec2): number {
  return a[0] * b[0] + a[1] * b[1];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Outward normal of one edge with the solid on its left (CCW outline). */
function outwardNormal(start: Vec2, end: Vec2): Vec2 {
  const edge: Vec2 = [end[0] - start[0], end[1] - start[1]];
  const length = Math.hypot(...edge) || 1;
  return [edge[1] / length, -edge[0] / length];
}
