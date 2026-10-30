/**
 * Gera a versão hexagonal do "b" da Blips usada pela cena de vidro líquido da
 * home (`components/landing/liquid-glass/mark-hex-data.ts`).
 *
 * A forma é construída geometricamente, não vetorizada: do símbolo original
 * (`components/landing/blips-led/mark-data.ts`, nível denso) só se medem as
 * proporções — espessura e topo da haste, centro e raio externo do bojo, ponta
 * do bojo, raios do disco e do furo — e o desenho segue uma grade de 60°:
 * - haste vertical com a ponta de cima em 3 arestas iguais (meio hexágono
 *   regular de lado t/2, t = espessura);
 * - bojo como um hexágono de lados retos em cima e embaixo; a faixa tem
 *   espessura t constante (lado interno paralelo ao externo) e termina, perto
 *   da haste, com outra ponta de 3 arestas iguais;
 * - ponto do meio como um anel hexagonal concêntrico ao bojo.
 * Sentido: o sólido fica à esquerda de toda aresta orientada (contorno e
 * hexágono externo do anel anti-horários, furo horário), como os demais dados.
 *
 * Uso (em apps/docs): pnpm exec tsx scripts/gen-blips-mark-hex.ts
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BLIPS_MARK_SILHOUETTE_LOOPS as L } from "../components/landing/blips-led/mark-data";

type P = [number, number];

/** Circunraio dos hexágonos = K · raio do círculo correspondente no original. */
const K = 1.02;
/** Chanfro da ponta como fração da espessura: 0.5 deixa as 3 arestas iguais. */
const CAP_FRACTION = 0.5;

const deg = Math.PI / 180;
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const dir = (ang: number): P => [Math.cos(ang * deg), Math.sin(ang * deg)];
const centroid = (loop: readonly P[]): P => {
  let x = 0;
  let y = 0;
  for (const p of loop) {
    x += p[0];
    y += p[1];
  }
  return [x / loop.length, y / loop.length];
};

// ---- medidas do símbolo original
const outer = L[0] as readonly P[];
const C = centroid(L[1] as readonly P[]);
const dist = (p: P) => Math.hypot(p[0] - C[0], p[1] - C[1]);
const yTop = Math.max(...outer.map((p) => p[1]));
const xL = Math.min(...outer.map((p) => p[0]));
const Ro = Math.max(...outer.filter((p) => p[0] > C[0]).map(dist));
// lado direito da haste = aresta vertical longa à direita do lado esquerdo
const verticals: number[] = [];
for (let i = 0; i < outer.length; i++) {
  const a = outer[i];
  const b = outer[(i + 1) % outer.length];
  if (
    Math.abs(b[0] - a[0]) < 1e-3 &&
    Math.abs(b[1] - a[1]) > 0.04 &&
    a[0] > xL + 0.01
  ) {
    verticals.push((a[0] + b[0]) / 2);
  }
}
const xR = Math.min(...verticals);
const t = xR - xL;
const termTipX = Math.min(
  ...outer
    .filter((p) => p[0] > xR + 0.004 && p[1] > C[1] + (Ro - t) * 0.4)
    .map((p) => p[0])
);
const rDisc =
  (L[1] as readonly P[]).reduce((s, p) => s + dist(p), 0) / L[1].length;
const rHole =
  (L[2] as readonly P[]).reduce((s, p) => s + dist(p), 0) / L[2].length;

// ---- construção
/** Vértice k (0..5, a partir de 0°) do hexágono de lados retos em cima/embaixo. */
const hexV = (r: number, k: number): P => add(C, mul(dir(k * 60), r * K));
// interno paralelo ao externo, a `t` de distância entre lados (apótema)
const Ri = Ro - t / Math.cos(30 * deg) / K;
const O = (k: number) => hexV(Ro, k);
const I = (k: number) => hexV(Ri, k);

/** Ponta de 3 arestas: de `from` (lado externo), indo em `d` graus, vira à
 *  esquerda 30-60-60-30 até o lado interno. Chanfros a 30° somam `a` na
 *  transversal, então o topo mede t − a. */
function cap(from: P, d: number): P[] {
  const a = t * CAP_FRACTION;
  const b = t - a;
  const p1 = add(from, mul(dir(d + 30), a));
  const p2 = add(p1, mul(dir(d + 90), b));
  const p3 = add(p2, mul(dir(d + 150), a));
  return [p1, p2, p3];
}
const atX = (a: P, b: P, x: number): P => {
  const s = (x - a[0]) / (b[0] - a[0]);
  return [x, a[1] + (b[1] - a[1]) * s];
};

const capRise = t * CAP_FRACTION * Math.cos(30 * deg);
const outline: P[] = [];
const stemTopLeft: P = [xL, yTop - capRise];
outline.push(stemTopLeft); // desce pelo lado esquerdo da haste
outline.push(atX(O(3), O(4), xL));
outline.push(O(4), O(5), O(0), O(1));
// A ponta do bojo fica no lado de cima, entre O(1) e O(2): o contorno vai de
// O(1) direto à ponta. Passar por O(2) e voltar deixava uma aresta de largura
// zero, que o campo de distância desenhava como um filete solto.
const termEnd: P = [termTipX + capRise, O(2)[1]];
if (termEnd[0] <= O(2)[0] || termEnd[0] >= O(1)[0]) {
  throw new Error("ponta do bojo fora do lado de cima do hexágono externo");
}
outline.push(termEnd, ...cap(termEnd, 180));
outline.push(I(1), I(0), I(5), I(4));
outline.push(atX(I(4), I(3), xR));
const stemTopRight: P = [xR, yTop - capRise];
outline.push(stemTopRight, ...cap(stemTopRight, 90).slice(0, 2));

const ring = (r: number, ccw: boolean): P[] =>
  Array.from({ length: 6 }, (_, k) =>
    add(C, mul(dir((ccw ? 1 : -1) * k * 60), r * K))
  );
const loops = [outline, ring(rDisc, true), ring(rHole, false)];

// Caixa do contorno do símbolo original no mesmo espaço: é o que liga o "b"
// hexagonal à caixa do traço do SVG da marca, para a cena o enquadrar onde o
// símbolo original estaria.
const ys = outer.map((p) => p[1]);
const xs = outer.map((p) => p[0]);
const sourceBox = {
  centerX: (Math.min(...xs) + Math.max(...xs)) / 2,
  centerY: (Math.min(...ys) + Math.max(...ys)) / 2,
  height: Math.max(...ys) - Math.min(...ys),
};

// ---- saída
const fmt = (loop: P[]) =>
  `  [\n${loop.map(([x, y]) => `    [${x.toFixed(6)}, ${y.toFixed(6)}],`).join("\n")}\n  ],`;
const here = dirname(fileURLToPath(import.meta.url));
const destination = resolve(
  here,
  "../components/landing/liquid-glass/mark-hex-data.ts"
);
writeFileSync(
  destination,
  `/**
 * "b" hexagonal da Blips em unidades de cena (y para cima), para a cena de
 * vidro líquido da home.
 *
 * ARQUIVO GERADO por \`apps/docs/scripts/gen-blips-mark-hex.ts\` — não edite à
 * mão. Construção geométrica numa grade de 60° a partir das proporções do
 * símbolo original: contorno (${outline.length} vértices), anel hexagonal (6) e furo (6).
 * O sólido fica à esquerda de toda aresta orientada.
 */

import type { MarkLoops } from "../blips-led/mark-data";

export const BLIPS_MARK_HEX_LOOPS: MarkLoops = [
${loops.map(fmt).join("\n")}
];


/**
 * Caixa do contorno do símbolo original (o \`<path>\` de \`blips-mark.svg\`) no
 * mesmo espaço dos laços acima.
 */
export const BLIPS_MARK_SOURCE_BOX = {
  centerX: ${Number(sourceBox.centerX.toFixed(6))},
  centerY: ${Number(sourceBox.centerY.toFixed(6))},
  height: ${Number(sourceBox.height.toFixed(6))},
};
`
);
console.log(
  `gerado ${destination}: ${loops.map((l) => l.length).join(" + ")} vértices`
);
