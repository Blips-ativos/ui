/**
 * Gera os laços do símbolo "b" da Blips a partir do SVG
 * (`@blips/brand/assets/mark/blips-mark.svg`), em dois destinos:
 *
 * - `components/landing/blips-led/mark-data.ts` — a cena de LEDs da home.
 *   Achatamento ADAPTATIVO das cúbicas (subdivisão de De Casteljau até a
 *   planicidade caber na tolerância) em dois níveis:
 *   · denso (tolerância `SILHOUETTE_TOLERANCE`): a silhueta — malha
 *     triangulada e campo de distância em resolução cheia;
 *   · moderado (`RAYCAST_TOLERANCE`, ~300 arestas): raycast, LEDs e hit-test,
 *     que pagam por aresta a cada quadro.
 * - `components/landing/prism-background/scene/blips-mark.ts` — a cena antiga
 *   do prisma (sem uso, mas mantida no repositório). Saída idêntica à de antes:
 *   cúbicas em passos uniformes + Ramer-Douglas-Peucker.
 *
 * O SVG tem um único path (fill-rule evenodd, só comandos absolutos M/C/L/Z)
 * com três subpaths. Pela regra even-odd (conferida ponto a ponto):
 * [0] é o contorno do "b" — uma faixa simples, cujo interior do bojo fica VAZIO
 * (aberto para fora pela fenda entre a haste e o terminal); [1] é um disco
 * SÓLIDO dentro do bojo; [2] é um furo nesse disco. Ou seja: dois sólidos
 * disjuntos — a faixa do "b" e uma rosca no centro do bojo.
 *
 * Normalização (igual nos dois destinos): unidades de cena (y para cima), caixa
 * do contorno externo centrada na origem e com a altura do prisma original;
 * sentido de cada laço com o sólido à esquerda de toda aresta orientada
 * (contorno e disco anti-horários, furo horário) — a normal externa de toda
 * aresta `e` é `(e.y, -e.x)`.
 *
 * Uso (de apps/docs): `pnpm exec tsx scripts/gen-blips-mark.ts`
 * Os dados saem literais, para o navegador não precisar interpretar SVG.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

type Point = [number, number];

/** Um subpath como sequência de comandos (o ponto inicial é o `start`). */
interface SubPath {
  start: Point;
  commands: (
    | { kind: "L"; to: Point }
    | { kind: "C"; c1: Point; c2: Point; to: Point }
  )[];
}

/** Tolerância do achatamento da silhueta, em unidades do viewBox (1055 x 1453). */
const SILHOUETTE_TOLERANCE = 0.25;
/** Tolerância do nível do raycast/LEDs — mira ~300 arestas no total. */
const RAYCAST_TOLERANCE = 1.6;
/** Cena antiga do prisma: tolerância do RDP e passos uniformes por cúbica. */
const LEGACY_RDP_TOLERANCE = 2.5;
const LEGACY_CUBIC_STEPS = 24;
/** Altura do prisma equilátero original (lado 0.57): 0.57 * sqrt(3) / 2. */
const TARGET_HEIGHT = (0.57 * Math.sqrt(3)) / 2;
/** Limite de recursão do achatamento adaptativo (2^16 trechos por cúbica). */
const MAX_FLATTEN_DEPTH = 16;

const require = createRequire(import.meta.url);
const brandRoot = dirname(require.resolve("@blips/brand/package.json"));
const svg = readFileSync(
  join(brandRoot, "assets", "mark", "blips-mark.svg"),
  "utf8"
);
const pathData = /\sd="([^"]+)"/.exec(svg)?.[1];
if (!pathData) throw new Error("Path do símbolo não encontrado no SVG.");

const subPaths = parsePath(pathData);
if (subPaths.length !== 3) {
  throw new Error(`Esperava 3 subpaths, encontrei ${subPaths.length}.`);
}

writeBlipsLed();
writeLegacyPrism();

// ---------------------------------------------------------------------------
// blips-led: dois níveis adaptativos.
// ---------------------------------------------------------------------------

function writeBlipsLed() {
  const dense = subPaths.map((sub) =>
    dedupe(flattenAdaptive(sub, SILHOUETTE_TOLERANCE))
  );
  const moderate = subPaths.map((sub) =>
    dedupe(flattenAdaptive(sub, RAYCAST_TOLERANCE))
  );
  // A mesma normalização nos dois níveis: a caixa do contorno denso.
  const normalize = normalizer(dense[0]!);
  const silhouette = dense.map((loop, i) => orient(loop.map(normalize), i));
  const raycast = moderate.map((loop, i) => orient(loop.map(normalize), i));
  const count = (loops: Point[][]) =>
    loops.reduce((sum, loop) => sum + loop.length, 0);

  const output = `/**
 * Símbolo "b" da Blips como laços 2D, em unidades de cena (y para cima), em
 * dois níveis de detalhe.
 *
 * ARQUIVO GERADO por \`apps/docs/scripts/gen-blips-mark.ts\` a partir de
 * \`@blips/brand/assets/mark/blips-mark.svg\` — não edite à mão; rode
 * \`pnpm exec tsx scripts/gen-blips-mark.ts\` em apps/docs para regenerar.
 *
 * Cúbicas achatadas de forma adaptativa (subdivisão até a planicidade caber na
 * tolerância, em unidades do viewBox 1055 x 1453):
 * - silhueta: tolerância ${SILHOUETTE_TOLERANCE}, ${count(silhouette)} arestas (${silhouette.map((l) => l.length).join(" + ")});
 * - raycast/LEDs: tolerância ${RAYCAST_TOLERANCE}, ${count(raycast)} arestas (${raycast.map((l) => l.length).join(" + ")}).
 * Os dois níveis usam a mesma normalização: caixa do contorno externo centrada
 * na origem, com a altura do prisma original (${round(TARGET_HEIGHT, 1e5)}).
 *
 * Topologia (regra even-odd do SVG): o contorno do "b" é uma faixa simples cujo
 * interior do bojo é vazio; dentro do bojo há um disco sólido com um furo
 * concêntrico (uma rosca). São dois sólidos disjuntos.
 *
 * Sentido: o sólido fica à esquerda de toda aresta orientada — contorno e disco
 * anti-horários, furo horário — então a normal externa de toda aresta
 * \`e = fim - início\` é \`(e.y, -e.x)\`.
 */

export type MarkPoint = readonly [number, number];
export type MarkLoops = readonly (readonly MarkPoint[])[];

/**
 * Nível denso (silhueta): contorno, disco e furo do disco. Vai para a malha
 * triangulada e para o campo de distância em resolução cheia — nunca para um
 * laço por pixel por quadro.
 */
export const BLIPS_MARK_SILHOUETTE_LOOPS: MarkLoops = [
${silhouette.map(formatLoop).join("\n")}
];

/** Nível moderado (raycast, LEDs, hit-test): mesma ordem de laços. */
export const BLIPS_MARK_LOOPS: MarkLoops = [
${raycast.map(formatLoop).join("\n")}
];

/**
 * Sólidos para triangular (índices dos laços): cada um é um contorno seguido
 * dos seus furos, o formato que o earcut espera.
 */
export const BLIPS_MARK_SOLIDS: readonly (readonly number[])[] = [[0], [1, 2]];
`;

  const destination = join(
    process.cwd(),
    "components/landing/blips-led/mark-data.ts"
  );
  writeFileSync(destination, output);
  console.log(
    `[blips-mark] silhueta ${count(silhouette)} + raycast ${count(raycast)} arestas → ${destination}`
  );
}

/** Achatamento adaptativo de um subpath fechado (sem repetir o ponto inicial). */
function flattenAdaptive(sub: SubPath, tolerance: number): Point[] {
  const points: Point[] = [sub.start];
  let cursor = sub.start;
  for (const command of sub.commands) {
    if (command.kind === "L") {
      points.push(command.to);
    } else {
      subdivide(
        cursor,
        command.c1,
        command.c2,
        command.to,
        tolerance,
        0,
        points
      );
    }
    cursor = command.to;
  }
  return points;
}

/**
 * Subdivisão de De Casteljau em t = 0.5 até os pontos de controle ficarem a
 * no máximo `tolerance` da corda — o desvio da curva para a corda é no máximo
 * 3/4 disso. Empurra os pontos finais de cada trecho (o inicial já está lá).
 */
function subdivide(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  tolerance: number,
  depth: number,
  out: Point[]
) {
  const flat = Math.max(
    segmentDistance(p1, p0, p3),
    segmentDistance(p2, p0, p3)
  );
  if (flat <= tolerance || depth >= MAX_FLATTEN_DEPTH) {
    out.push(p3);
    return;
  }
  const p01 = mid(p0, p1);
  const p12 = mid(p1, p2);
  const p23 = mid(p2, p3);
  const p012 = mid(p01, p12);
  const p123 = mid(p12, p23);
  const m = mid(p012, p123);
  subdivide(p0, p01, p012, m, tolerance, depth + 1, out);
  subdivide(m, p123, p23, p3, tolerance, depth + 1, out);
}

/** Um ponto por linha — o formato que o biome espera do literal. */
function formatLoop(loop: Point[]): string {
  const lines = loop.map(([x, y]) => `    [${x}, ${y}],`);
  return `  [\n${lines.join("\n")}\n  ],`;
}

// ---------------------------------------------------------------------------
// prism-background: a saída antiga, inalterada.
// ---------------------------------------------------------------------------

function writeLegacyPrism() {
  const loops = subPaths.map((sub) =>
    simplifyClosed(dedupe(flattenUniform(sub)))
  );
  const normalize = normalizer(loops[0]!, 1e5);
  const scene = loops.map((loop, i) => orient(loop.map(normalize), i));
  const total = scene.reduce((sum, loop) => sum + loop.length, 0);
  const format = (loop: Point[]): string =>
    loop.map(([x, y]) => `    [${x}, ${y}],`).join("\n");

  const output = `/**
 * Símbolo "b" da Blips como laços 2D, em unidades de cena (y para cima).
 *
 * ARQUIVO GERADO por \`apps/docs/scripts/gen-blips-mark.ts\` a partir de
 * \`@blips/brand/assets/mark/blips-mark.svg\` — não edite à mão; rode
 * \`pnpm exec tsx scripts/gen-blips-mark.ts\` em apps/docs para regenerar.
 *
 * Cúbicas achatadas em ${LEGACY_CUBIC_STEPS} passos e simplificadas com RDP
 * (tolerância ${LEGACY_RDP_TOLERANCE} unidades do SVG), ${total} pontos no total. A caixa do
 * contorno externo está centrada na origem e tem a altura do prisma original
 * (${round(TARGET_HEIGHT, 1e5)}).
 *
 * Topologia (regra even-odd do SVG): o contorno do "b" é uma faixa simples cujo
 * interior do bojo é vazio; dentro do bojo há um disco sólido com um furo
 * concêntrico (uma rosca). São dois sólidos disjuntos.
 *
 * Sentido: o sólido fica à esquerda de toda aresta orientada — contorno e disco
 * anti-horários, furo horário — então a normal externa de toda aresta
 * \`e = fim - início\` é \`(e.y, -e.x)\`, a mesma regra do triângulo.
 */

import type { Vec2 } from "../types";

/** Contorno do "b": haste + bojo, interior do bojo vazio (anti-horário). */
export const BLIPS_MARK_OUTER: readonly Vec2[] = [
${format(scene[0]!)}
];

/** Disco sólido dentro do bojo (anti-horário). */
export const BLIPS_MARK_DISC: readonly Vec2[] = [
${format(scene[1]!)}
];

/** Furo concêntrico do disco (horário). */
export const BLIPS_MARK_DISC_HOLE: readonly Vec2[] = [
${format(scene[2]!)}
];

/** Todos os laços, na ordem contorno, disco, furo do disco. */
export const BLIPS_MARK_LOOPS: readonly (readonly Vec2[])[] = [
  BLIPS_MARK_OUTER,
  BLIPS_MARK_DISC,
  BLIPS_MARK_DISC_HOLE,
];

/**
 * Polígonos sólidos para triangular as tampas: cada um é um contorno seguido
 * dos seus furos (o formato que o earcut espera).
 */
export const BLIPS_MARK_POLYGONS: readonly (readonly (readonly Vec2[])[])[] = [
  [BLIPS_MARK_OUTER],
  [BLIPS_MARK_DISC, BLIPS_MARK_DISC_HOLE],
];
`;

  const destination = join(
    process.cwd(),
    "components/landing/prism-background/scene/blips-mark.ts"
  );
  writeFileSync(destination, output);
  console.log(`[blips-mark] prisma ${total} pontos → ${destination}`);
}

function flattenUniform(sub: SubPath): Point[] {
  const points: Point[] = [sub.start];
  let cursor = sub.start;
  for (const command of sub.commands) {
    if (command.kind === "L") {
      points.push(command.to);
    } else {
      for (let step = 1; step <= LEGACY_CUBIC_STEPS; step++) {
        points.push(
          cubic(
            cursor,
            command.c1,
            command.c2,
            command.to,
            step / LEGACY_CUBIC_STEPS
          )
        );
      }
    }
    cursor = command.to;
  }
  return points;
}

/** RDP num laço fechado: divide no par de pontos mais distantes entre si. */
function simplifyClosed(loop: Point[]): Point[] {
  const first = 0;
  let far = 0;
  let farDistance = -1;
  for (let i = 1; i < loop.length; i++) {
    const distance = Math.hypot(
      loop[i]![0] - loop[first]![0],
      loop[i]![1] - loop[first]![1]
    );
    if (distance > farDistance) {
      farDistance = distance;
      far = i;
    }
  }
  const forward = rdp(loop.slice(first, far + 1));
  const backward = rdp([...loop.slice(far), loop[first]!]);
  return [...forward.slice(0, -1), ...backward.slice(0, -1)];
}

function rdp(points: Point[]): Point[] {
  if (points.length < 3) return points;
  const start = points[0]!;
  const end = points[points.length - 1]!;
  let index = 0;
  let maxDistance = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const distance = segmentDistance(points[i]!, start, end);
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }
  if (maxDistance <= LEGACY_RDP_TOLERANCE) return [start, end];
  const left = rdp(points.slice(0, index + 1));
  const right = rdp(points.slice(index));
  return [...left.slice(0, -1), ...right];
}

// ---------------------------------------------------------------------------
// Comuns.
// ---------------------------------------------------------------------------

function parsePath(data: string): SubPath[] {
  const tokens = data.match(/[MCLZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) ?? [];
  const result: SubPath[] = [];
  let current: SubPath | undefined;
  let cursor: Point = [0, 0];
  let index = 0;
  let command = "";
  const number = (): number => Number(tokens[index++]);
  const close = () => {
    if (current?.commands.length) result.push(current);
    current = undefined;
  };
  while (index < tokens.length) {
    // Números sem letra repetem o comando anterior (M repetido vira L).
    if (/^[MCLZ]$/i.test(tokens[index]!)) command = tokens[index++]!;
    else if (command === "M") command = "L";
    switch (command) {
      case "M":
        close();
        cursor = [number(), number()];
        current = { start: cursor, commands: [] };
        break;
      case "L":
        cursor = [number(), number()];
        current?.commands.push({ kind: "L", to: cursor });
        break;
      case "C": {
        const c1: Point = [number(), number()];
        const c2: Point = [number(), number()];
        cursor = [number(), number()];
        current?.commands.push({ kind: "C", c1, c2, to: cursor });
        break;
      }
      case "Z":
      case "z":
        if (current) cursor = current.start;
        close();
        break;
      default:
        throw new Error(`Comando de path inesperado: ${command}`);
    }
  }
  close();
  return result;
}

/** Remove o ponto final duplicado do fechamento e pontos coincidentes. */
function dedupe(loop: Point[]): Point[] {
  return loop.filter((point, i) => {
    const previous = loop[(i + loop.length - 1) % loop.length]!;
    return Math.hypot(point[0] - previous[0], point[1] - previous[1]) > 1e-6;
  });
}

/** SVG → cena: caixa de `outer` centrada na origem, altura TARGET_HEIGHT, y para cima. */
function normalizer(outer: Point[], precision = 1e6) {
  const minX = Math.min(...outer.map((p) => p[0]));
  const maxX = Math.max(...outer.map((p) => p[0]));
  const minY = Math.min(...outer.map((p) => p[1]));
  const maxY = Math.max(...outer.map((p) => p[1]));
  const scale = TARGET_HEIGHT / (maxY - minY);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  return ([x, y]: Point): Point => [
    round((x - centerX) * scale, precision),
    round(-(y - centerY) * scale, precision),
  ];
}

/** Contorno (0) e disco (1) anti-horários; furo do disco (2) horário. */
function orient(loop: Point[], index: number): Point[] {
  const wantCcw = index !== 2;
  const ccw = signedArea(loop) > 0;
  return ccw === wantCcw ? loop : loop.reverse();
}

function cubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  ];
}

function mid(a: Point, b: Point): Point {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function segmentDistance(point: Point, start: Point, end: Point): number {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const lengthSquared = dx * dx + dy * dy;
  const t =
    lengthSquared > 0
      ? Math.max(
          0,
          Math.min(
            1,
            ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) /
              lengthSquared
          )
        )
      : 0;
  return Math.hypot(
    point[0] - (start[0] + dx * t),
    point[1] - (start[1] + dy * t)
  );
}

function signedArea(loop: Point[]): number {
  let area = 0;
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i]!;
    const b = loop[(i + 1) % loop.length]!;
    area += a[0] * b[1] - b[0] * a[1];
  }
  return area / 2;
}

function round(value: number, precision: number): number {
  return Math.round(value * precision) / precision;
}
