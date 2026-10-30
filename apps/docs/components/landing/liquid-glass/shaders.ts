/**
 * Shaders TypeGPU do fundo "vidro líquido" da home.
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/typegpu-liquid-glass/renderer.ts
 * (MIT), revisão af8ab2106af8d33b5f10e60b588a0ae5fb0b02de761800e82b85bf82726a3bc4.
 * As funções "use gpu" precisam do transform Babel `unplugin-typegpu/babel`
 * (regra em apps/docs/next.config.ts para esta pasta).
 *
 * Blips:
 * - o bake do logo TypeGPU (`logoSdf`/`sdfBakeFragment`) saiu: o campo do "b"
 *   é assado em WGSL puro (`mark-sdf.ts`); gradiente e blur seguem iguais;
 * - `Params` ganhou centro/escala do "b" (enquadrado no [data-triangle-container]),
 *   tema e a "calmaria" do lado esquerdo; o fragmento principal calcula o vidro
 *   e os feixes no espaço do "b", enquanto vinheta e calmaria usam o canvas;
 * - feixes RGB → âmbar profundo / amarelo Blips (#FCBA28) / amarelo claro, núcleo
 *   branco quente, halo/brilho/aro dourados, fundo quase preto neutro; o feixe
 *   ficou mais vertical (60°) para cruzar o "b" sem invadir o título;
 * - vidro lapidado: a luz só desvia no chanfro junto à borda (`BEVEL_WIDTH`) e o
 *   miolo do traço é face plana — sem o vinco na linha do meio do traço que o
 *   exemplo tinha (a normal normalizada vira de lado ali);
 * - vidro canelado na frente da cena inteira: faixas verticais de largura fixa
 *   em px de CSS (`fluteWidth`), cada uma uma lente que comprime o que está
 *   atrás, com salto e filete claro/sombra nas emendas (`FLUTE_STRENGTH`); o
 *   que está atrás fica levemente desfocado (`frost`: feixes mais largos e
 *   bordas do "b" amaciadas, sem passada extra), e as emendas seguem nítidas;
 * - tema claro (uniforme `theme`): fundo neutro quente (#f4f2ee) tingido pela
 *   luz dos feixes, "b" levemente mais escuro com aro dourado e brilho especular.
 *
 * As cores estão em valores de saída: a superfície do vgpu usa o formato
 * preferido do canvas (bgra8unorm, sem sRGB), então o amarelo Blips entra como
 * os bytes sRGB de #FCBA28 (0.988, 0.729, 0.157) e não como o linear.
 */

import { prepareShader } from "@vgpu/wgsl/prepare";
import { d, std, tgpu } from "typegpu";
import { DISTANCE_GAIN, FIELD_EXTENT } from "./mark-sdf";

const FIELD_SIZE = 1024;
const FIELD_TEXEL = 1 / FIELD_SIZE;
/**
 * Largura do chanfro do vidro, no valor do campo (distância · ganho). A haste e
 * o bojo têm meia-espessura ≈ 0.086 e o anel do ponto ≈ 0.046: o chanfro cobre
 * ~35% da haste (o resto é face plana) e quase todo o anel.
 */
const BEVEL_WIDTH = 0.032;
/**
 * Vidro canelado: quanto cada faixa comprime o que está atrás (0 = vidro liso;
 * 0.3 deixa o "b" legível com o salto visível nas emendas). A largura da faixa
 * vem do renderer (`FLUTE_PX`, em px de CSS).
 */
const FLUTE_STRENGTH = 0.15;

const Params = d.struct({
  time: d.f32,
  aspect: d.f32,
  /** Centro do "b" no espaço de tela `p` (y para baixo, meia altura = 1). */
  center: d.vec2f,
  /** Unidades de `p` por unidade do espaço do vidro. */
  glassScale: d.f32,
  /** 0 = escuro, 1 = claro. */
  theme: d.f32,
  /** `uv.x` a partir do qual os feixes ganham força (coluna do "b"). */
  calmEdge: d.f32,
  /** 0 = sem calmaria (mobile, "b" centralizado), 1 = esquerda contida. */
  calmAmount: d.f32,
  /** Largura de cada faixa do vidro canelado, em `uv.x`. */
  fluteWidth: d.f32,
  /** Raio do desfoque atrás do vidro canelado, no espaço `p` (meia altura = 1). */
  frost: d.f32,
});

const layout = tgpu.bindGroupLayout({
  params: { uniform: Params },
  sourceTexture: { texture: d.texture2d(d.f32) },
  sdfTexture: { texture: d.texture2d(d.f32) },
  gradientTexture: { texture: d.texture2d(d.f32) },
  fieldSampler: { sampler: "filtering" },
});

function hash(point: d.v2f): number {
  "use gpu";
  return std.fract(std.sin(std.dot(point, d.vec2f(127.1, 311.7))) * 43758.5453);
}

const gradientFragment = tgpu.fragmentFn({
  in: { uv: d.vec2f },
  out: d.vec4f,
})((input) => {
  "use gpu";
  const sample = std.textureSampleLevel(
    layout.$.sourceTexture,
    layout.$.fieldSampler,
    input.uv,
    0
  ).x;
  const derivative = d.vec2f(std.dpdx(sample), std.dpdy(sample));
  const magnitude = std.length(derivative);
  const normal = derivative.div(std.max(magnitude, 0.000001));
  return d.vec4f(normal.mul(0.5).add(0.5), magnitude, 1);
});

const createBlurFragment = (direction: d.v2f) =>
  tgpu.fragmentFn({
    in: { uv: d.vec2f },
    out: d.vec4f,
  })((input) => {
    "use gpu";
    const offset = direction.mul(FIELD_TEXEL);
    let value = std
      .textureSampleLevel(
        layout.$.sourceTexture,
        layout.$.fieldSampler,
        input.uv,
        0
      )
      .mul(0.227027);
    value = value.add(
      std
        .textureSampleLevel(
          layout.$.sourceTexture,
          layout.$.fieldSampler,
          input.uv.add(offset.mul(1.384615)),
          0
        )
        .mul(0.316216)
    );
    value = value.add(
      std
        .textureSampleLevel(
          layout.$.sourceTexture,
          layout.$.fieldSampler,
          input.uv.sub(offset.mul(1.384615)),
          0
        )
        .mul(0.316216)
    );
    value = value.add(
      std
        .textureSampleLevel(
          layout.$.sourceTexture,
          layout.$.fieldSampler,
          input.uv.add(offset.mul(3.230769)),
          0
        )
        .mul(0.07027)
    );
    value = value.add(
      std
        .textureSampleLevel(
          layout.$.sourceTexture,
          layout.$.fieldSampler,
          input.uv.sub(offset.mul(3.230769)),
          0
        )
        .mul(0.07027)
    );
    return value;
  });

const horizontalBlurFragment = createBlurFragment(d.vec2f(1, 0));
const verticalBlurFragment = createBlurFragment(d.vec2f(0, 1));

const lightStreams = tgpu.fn(
  [d.vec2f, d.f32, d.f32],
  d.vec3f
)((point, seconds, soften) => {
  "use gpu";
  const direction = std.normalize(
    // biome-ignore lint/suspicious/noApproximativeNumericConstant: literal do exemplo, dentro de "use gpu"
    d.vec2f(0.7071 + std.sin(seconds) * 5, -0.7071)
  );
  // Blips: feixe a 60° (era 45°) — atravessa o "b" e fica na coluna direita.
  const normal = d.vec2f(0.866, 0.5);
  const along = std.dot(point, direction);
  const across = std.dot(point, normal);
  const convergence = std.smoothstep(-0.55, 0.38, along);
  const pulse = 0.76 + 0.24 * std.sin(seconds * 2.2 - along * 7.5);
  const shimmer =
    0.82 + 0.18 * std.sin(seconds * 4.1 + along * 14 + across * 5);
  let color = d.vec3f(0);

  const split = 0.15;

  const deepCenter =
    -split * (1 - convergence) + 0.01 * std.sin(along * 8 - seconds * 1.7);
  const primaryCenter = 0.01 * std.sin(along * 9 + seconds * 1.3);
  const paleCenter =
    split * (1 - convergence) + 0.01 * std.sin(along * 7 + seconds * 1.9);
  // Blips: `soften` alarga os feixes — o desfoque do vidro canelado.
  const width = std.mix(0.045, 0.075, convergence) + soften;
  const deep = std.exp(-std.pow(std.abs(across - deepCenter) / width, 1.65));
  const primary = std.exp(
    -std.pow(std.abs(across - primaryCenter) / width, 1.65)
  );
  const pale = std.exp(-std.pow(std.abs(across - paleCenter) / width, 1.65));

  // Blips: âmbar profundo / amarelo Blips (#FCBA28) / amarelo claro quente.
  const deepc = d.vec3f(0.95, 0.3, 0.02).mul(deep);
  const primaryc = d.vec3f(0.988, 0.729, 0.157).mul(0.5).mul(primary);
  const palec = d.vec3f(1, 0.88, 0.55).mul(0.7).mul(pale);

  color = color.add(deepc.add(primaryc).add(palec).mul(pulse).mul(shimmer));

  const mergedWidth = 0.06 + 0.035 * convergence + soften;
  const merged =
    std.exp(-std.pow(std.abs(across) / mergedWidth, 1.45)) * convergence;
  color = color.add(
    d
      .vec3f(1, 0.94, 0.82)
      .mul(merged)
      .mul(1.15 + 0.35 * std.sin(seconds * 2.7 - along * 9))
  );
  const halo = std.exp(-std.abs(across) * 7.5) * (0.16 + 0.22 * convergence);
  return color.add(d.vec3f(0.44, 0.25, 0.04).mul(halo));
});

const fragmentFn = tgpu.fragmentFn({
  in: { uv: d.vec2f },
  out: d.vec4f,
})((input) => {
  "use gpu";
  const seconds = layout.$.params.time;
  // Blips: vidro canelado na frente da cena inteira (feixes e "b"). Cada faixa
  // vertical é uma lente estreita: comprime o que está atrás (mais nas bordas,
  // pelo termo cúbico) e a imagem salta na emenda entre faixas. Grão e vinheta
  // são da "câmera" e ficam fora da distorção.
  const fluteWidth = layout.$.params.fluteWidth;
  const fluteS = std.fract(input.uv.x / fluteWidth);
  const fluteC = fluteS - 0.5;
  const fluteShift =
    -(
      FLUTE_STRENGTH * fluteC +
      0.6 * FLUTE_STRENGTH * fluteC * fluteC * fluteC
    ) * fluteWidth;
  const uv = d.vec2f(input.uv.x + fluteShift, input.uv.y);
  const screen = input.uv
    .sub(0.5)
    .mul(2)
    .mul(d.vec2f(layout.$.params.aspect, 1));
  const p = uv.sub(0.5).mul(2).mul(d.vec2f(layout.$.params.aspect, 1));
  // Blips: espaço do vidro centrado no "b" (o exemplo usava `p` direto).
  const g = p.sub(layout.$.params.center).div(layout.$.params.glassScale);
  const fieldUv = g.div(FIELD_EXTENT).mul(0.5).add(0.5);
  const distance = std.textureSampleLevel(
    layout.$.sdfTexture,
    layout.$.fieldSampler,
    fieldUv,
    0
  ).x;
  const smoothedDerivative = std.textureSampleLevel(
    layout.$.gradientTexture,
    layout.$.fieldSampler,
    fieldUv,
    0
  );
  const pixelWidth = std.fwidth(distance);
  // Blips: desfoque leve atrás do vidro canelado — o raio (`frost`, espaço `p`)
  // vira unidades do vidro (feixes) e do campo (bordas do "b"), que amaciam.
  const frostGlass = layout.$.params.frost / layout.$.params.glassScale;
  const frostField = frostGlass * DISTANCE_GAIN;
  const edgeSoftness = std.max(pixelWidth, frostField);
  const logoMask = std.smoothstep(edgeSoftness, -edgeSoftness, distance);

  const decodedGradient = smoothedDerivative.rg.mul(2).sub(1);
  const glassNormal = decodedGradient.div(
    std.max(std.length(decodedGradient), 0.0001)
  );
  // Blips: vidro lapidado. O exemplo desviava a luz no traço inteiro, e como a
  // normal (normalizada) vira de lado na linha do meio do traço, sobrava um
  // vinco nítido ali — a "rachadura". Aqui só o chanfro junto à borda desvia; o
  // miolo é face plana e a luz passa reta. A aresta entre os dois fica nítida.
  const facetEdge = std.max(pixelWidth * 1.5, frostField);
  const bevel = std.smoothstep(
    -BEVEL_WIDTH - facetEdge,
    -BEVEL_WIDTH + facetEdge,
    distance
  );
  // Linhas finas desfocadas: mais largas e mais fracas, com a mesma energia.
  const facetWidth = 1 / 140 + frostField;
  const facet =
    std.exp(-std.abs(distance + BEVEL_WIDTH) / facetWidth) *
    (1 / 140 / facetWidth) *
    logoMask;
  const ripple =
    std.sin(g.y * 16 - seconds * 2.5) * std.sin(g.x * 11 + seconds * 1.8);
  const warpedPoint = g.add(
    glassNormal
      .mul(0.055 + ripple * 0.014)
      .mul(logoMask)
      .mul(bevel)
  );

  // Blips: lado esquerdo (título) contido; os feixes crescem na coluna do "b".
  const calm = std.mix(
    1,
    0.12 +
      0.88 *
        std.smoothstep(
          layout.$.params.calmEdge - 0.06,
          layout.$.params.calmEdge + 0.2,
          uv.x
        ),
    layout.$.params.calmAmount
  );
  const streams = lightStreams(g, seconds, frostGlass).mul(calm);
  const refracted = lightStreams(
    warpedPoint.mul(1.06).sub(d.vec2f(0.025, -0.015)),
    seconds + 0.18,
    frostGlass
  );
  const grain =
    hash(std.floor(input.uv.mul(520)).add(std.floor(seconds * 3))) - 0.5;
  const vignette = 1 - 0.38 * std.smoothstep(0.35, 1.45, std.length(screen));

  // Luz pura (sem o fundo): base dos dois temas.
  let emission = streams.mul(0.2);
  emission = std.mix(
    emission,
    refracted.mul(1.08).add(emission.mul(0.25)),
    logoMask
  );

  const innerGlow = std.exp(-std.abs(distance) * 24) * logoMask;
  const rimWidth = 1 / 95 + frostField;
  const rim = std.exp(-std.abs(distance) / rimWidth) * (1 / 95 / rimWidth);
  const specular =
    std.pow(std.max(std.dot(glassNormal, d.vec2f(-0.62, -0.78)), 0), 9) * rim;
  const shadow = std.smoothstep(0.09, 0, distance) * (1 - logoMask);
  const highlights = d
    .vec3f(0.55, 0.36, 0.08)
    .mul(innerGlow)
    .mul(0.22)
    .add(d.vec3f(1, 0.86, 0.55).mul(rim).mul(0.32))
    .add(d.vec3f(1, 0.86, 0.55).mul(facet).mul(0.1))
    .add(d.vec3f(1, 0.97, 0.9).mul(specular).mul(1.2));

  // Tema escuro: o pipeline de cor do exemplo, com fundo quase preto neutro.
  const background = d.vec3f(0.03, 0.029, 0.027);
  let color = std.mix(background, background.mul(0.25), logoMask).add(emission);
  color = color.mul(1 - shadow * 0.42);
  color = color.add(highlights);
  color = color.add(grain * 0.018);
  color = color.mul(vignette);
  color = d.vec3f(1).sub(std.exp(color.mul(-1.35))); // tonemapping

  // Tema claro: a luz (tonemapeada) tinge o fundo claro como um filtro de cor.
  const light = d
    .vec3f(1)
    .sub(std.exp(emission.mul(1 - shadow * 0.42).mul(-1.35)));
  const peak = std.max(std.max(light.x, light.y), light.z);
  const hue = light.div(std.max(peak, 0.0001));
  const tint = std.saturate(peak * 1.3) * 0.78;
  let paper = d.vec3f(0.957, 0.949, 0.933).mul(std.mix(d.vec3f(1), hue, tint));
  paper = paper.mul(1 - logoMask * 0.08 - shadow * 0.16);
  paper = std.mix(
    paper,
    d.vec3f(0.62, 0.42, 0.1),
    std.saturate(rim * 0.42 + innerGlow * 0.12 + facet * 0.14)
  );
  paper = paper.add(d.vec3f(1, 0.97, 0.9).mul(specular).mul(0.35));
  paper = paper.add(grain * 0.012);
  paper = paper.mul(std.mix(1, vignette, 0.3));

  // Emendas do vidro canelado: filete claro na borda esquerda de cada faixa e
  // sombra na direita, nos dois temas.
  const fluteLight = std.exp(-fluteS * 38) * 0.05;
  const fluteShade = 1 - std.exp(-(1 - fluteS) * 22) * 0.12;
  const result = std
    .mix(color, paper, layout.$.params.theme)
    .mul(fluteShade)
    .add(fluteLight);
  return d.vec4f(std.saturate(result), 1);
});

let cachedShaderSources: ReturnType<typeof prepareShaderSources> | undefined;

function prepareShaderSources() {
  return {
    gradient: prepareShader(
      tgpu.resolve([gradientFragment]),
      "blips-liquid-glass/gradient.wgsl"
    ),
    horizontalBlur: prepareShader(
      tgpu.resolve([horizontalBlurFragment]),
      "blips-liquid-glass/horizontal-blur.wgsl"
    ),
    verticalBlur: prepareShader(
      tgpu.resolve([verticalBlurFragment]),
      "blips-liquid-glass/vertical-blur.wgsl"
    ),
    main: prepareShader(
      tgpu.resolve([fragmentFn]),
      "blips-liquid-glass/main.wgsl"
    ),
  };
}

export function shaderSources() {
  cachedShaderSources ??= prepareShaderSources();
  return cachedShaderSources;
}
