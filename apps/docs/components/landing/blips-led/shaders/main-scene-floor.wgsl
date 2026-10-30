// Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/shaders/themes/dark/main-scene-floor.wgsl (MIT).
// Blips:
// - o SDF do triângulo virou o SDF do "b", sem laço sobre arestas por pixel: perto da borda
//   (faixa `field.z`) vem do campo denso em resolução cheia (`silhouette_field_tex`, assado por
//   rebuild a partir de ~545 arestas — distância exata + dentro/fora no centro do pixel); longe,
//   do SDF assado na grade do raycast (`mark_sdf_tex`, bilinear); fora dele, do círculo envolvente;
// - a borda da silhueta é cobertura analítica: 1 px de rampa sobre a distância exata, em DPR cheio;
// - a luz em resolução reduzida é reamostrada sabendo da máscara: o B-spline só pondera texels do
//   chão (alfa 1 do raycast), então o preto do sólido não vaza pela borda em degraus;
// - sem grão: saíram a textura de ruído do chão e o jitter aleatório da luz fraca; no fim entra um
//   dither IGN triangular de no máximo 1/255, só para quebrar o banding dos degradês;
// - um só shader para os dois temas (`theme.x`): o escuro é o original; o claro usa o mesmo
//   brilho calculado, mas como TINTA sobre um chão quase branco — a luminância da luz escurece
//   o chão num halo macio (sombra) e a crominância (deploy RGB) tinge de leve; a silhueta do
//   "b" fica clara, um tom acima do chão, e o fade de borda vai para o chão, não para o preto.

import { col3v, oklab_to_rgb, tonemap } from "./color-utils.wgsl";
import { near_falloff, far_falloff } from "./floor-falloff.wgsl";

struct Config {
  screen: vec4f,
  light_sources: vec4f,
  // xy: centro do "b" (px de simulação); z: raio envolvente (simulação); w: raio de referência
  // (2/3 da altura do "b", em px de tela — o "circunraio" que o original usava).
  mark: vec4f,
  radiance_fit: vec4f,
  sim_transform: vec4f,
  // x: 1 = tema claro.
  theme: vec4f,
  // xy: canto do campo denso em px de tela; z: largura da faixa (px de tela) em que ele vale.
  field: vec4f,
};
@group(0) @binding(0) var<uniform> cfg: Config;
@group(0) @binding(1) var radiance_tex: texture_2d<f32>;
@group(0) @binding(2) var light_sources_tex: texture_2d<f32>;
@group(0) @binding(3) var silhouette_field_tex: texture_2d<f32>;
@group(0) @binding(4) var mark_sdf_tex: texture_2d<f32>;

struct VSOut { @builtin(position) pos: vec4f };

// Tema claro (sRGB, já no espaço de saída): chão quente quase branco e a silhueta um tom acima.
const LIGHT_FLOOR: vec3f = vec3f(0.945, 0.939, 0.925);
const LIGHT_SILHOUETTE: vec3f = vec3f(0.988, 0.986, 0.980);
// Quanto a luminância da luz escurece o chão claro, e quanto da crominância tinge.
const LIGHT_SHADE_STRENGTH: f32 = 0.5;
const LIGHT_TINT_STRENGTH: f32 = 0.55;
// O grão do chão (textura de ruído 500², até 50% de variação no escuro) saiu; o chão fica no
// brilho MÉDIO que o grão dava, para manter o tom: E[ruído] = 0.45 (soma de 3 hashes × 0.3).
const FLOOR_NOISE_MEAN: f32 = 0.45;
const LIGHT_GRAIN: f32 = 0.035;
const DARK_FLOOR_GRAIN_DPR1_SCALE: f32 = 0.5;

@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var p = array<vec2f, 3>(vec2f(-1.0, -3.0), vec2f(-1.0, 1.0), vec2f(3.0, 1.0));
  var out: VSOut;
  out.pos = vec4f(p[vi], 0.0, 1.0);
  return out;
}

fn grain_intensity() -> f32 {
  return select(1.0, DARK_FLOOR_GRAIN_DPR1_SCALE, cfg.screen.w < 1.5);
}

fn bg() -> vec3f {
  return vec3f(1.0 - 0.5 * FLOOR_NOISE_MEAN * grain_intensity());
}

// Interleaved gradient noise (Jimenez) → [0,1): ruído de alta frequência, sem padrão visível.
fn ign(p: vec2f) -> f32 {
  return fract(52.9829189 * fract(dot(p, vec2f(0.06711056, 0.00583715))));
}

// Dither triangular (duas IGN descorrelacionadas) em (-1, 1)/255, aplicado na saída de 8 bits.
fn dither(p: vec2f) -> vec3f {
  let t = ign(p) + ign(p + vec2f(47.0, 17.0)) - 1.0;
  return vec3f(t / 255.0);
}

const LUMA = vec3f(0.2126, 0.7152, 0.0722);

// SDF distante: bilinear sobre o SDF assado na grade do raycast (px de simulação → tela).
fn coarse_sdf(pixel_screen: vec2f) -> f32 {
  let scale = max(cfg.sim_transform.z, 1e-4);
  let sim = (pixel_screen - cfg.sim_transform.xy) / scale;
  let uv = (pixel_screen - cfg.radiance_fit.xy) / cfg.radiance_fit.zw;
  if (any(uv < vec2f(0.0)) || any(uv > vec2f(1.0))) {
    // Fora da simulação: a distância ao círculo envolvente (limite inferior).
    return (length(sim - cfg.mark.xy) - cfg.mark.z) * scale;
  }
  let dims_u = textureDimensions(mark_sdf_tex);
  let hi = vec2i(dims_u) - vec2i(1);
  let texel = uv * vec2f(dims_u) - vec2f(0.5);
  let base = floor(texel);
  let f = texel - base;
  let b = vec2i(base);
  let d00 = textureLoad(mark_sdf_tex, clamp(b, vec2i(0), hi), 0).r;
  let d10 = textureLoad(mark_sdf_tex, clamp(b + vec2i(1, 0), vec2i(0), hi), 0).r;
  let d01 = textureLoad(mark_sdf_tex, clamp(b + vec2i(0, 1), vec2i(0), hi), 0).r;
  let d11 = textureLoad(mark_sdf_tex, clamp(b + vec2i(1, 1), vec2i(0), hi), 0).r;
  return mix(mix(d00, d10, f.x), mix(d01, d11, f.x), f.y) * scale;
}

// SDF do "b" em px de tela (negativo dentro). Na faixa da borda, o campo denso (exato no centro
// do pixel); fora dela, o distante, com módulo de no mínimo a faixa (sem degrau na emenda).
fn mark_sdf(pixel_screen: vec2f) -> f32 {
  let band = cfg.field.z;
  let dims = vec2i(textureDimensions(silhouette_field_tex));
  let fp = vec2i(floor(pixel_screen - cfg.field.xy));
  if (all(fp >= vec2i(0)) && all(fp < dims)) {
    let field = textureLoad(silhouette_field_tex, fp, 0).rg;
    if (field.r < band - 1e-2) {
      return select(field.r, -field.r, field.g < 0.5);
    }
  }
  let coarse = coarse_sdf(pixel_screen);
  return select(max(coarse, band), min(coarse, -band), coarse < 0.0);
}

fn sample_light_sources(pixel_screen: vec2f) -> vec4f {
  let sim_px = (pixel_screen - cfg.sim_transform.xy) / cfg.sim_transform.z;
  let px = clamp(vec2i(floor(sim_px)), vec2i(0), vec2i(cfg.light_sources.xy) - vec2i(1));
  let inside_sim =
    sim_px.x >= 0.0 && sim_px.x < cfg.light_sources.x &&
    sim_px.y >= 0.0 && sim_px.y < cfg.light_sources.y;
  var light_sources = textureLoad(light_sources_tex, px, 0);
  if (!inside_sim) {
    light_sources = vec4f(0.0, 0.0, 0.0, 1.0);
  }
  return light_sources;
}

// Filtro cúbico BC (ver o original): B=1, C=0 → B-spline, o mais suave. Ponderado pela
// validade de cada texel (máscara), ver `sample_radiance_cubic`.
const UPSAMPLE_B: f32 = 1;
const UPSAMPLE_C: f32 = 0.;

fn bc_spline_weight(x: f32) -> f32 {
  let ax = abs(x);
  let b = UPSAMPLE_B;
  let c = UPSAMPLE_C;
  if (ax < 1.0) {
    return ((12.0 - 9.0 * b - 6.0 * c) * ax * ax * ax
      + (-18.0 + 12.0 * b + 6.0 * c) * ax * ax
      + (6.0 - 2.0 * b)) / 6.0;
  }
  if (ax < 2.0) {
    return ((-b - 6.0 * c) * ax * ax * ax
      + (6.0 * b + 30.0 * c) * ax * ax
      + (-12.0 * b - 48.0 * c) * ax
      + (8.0 * b + 24.0 * c)) / 6.0;
  }
  return 0.0;
}

fn sample_radiance_cubic(uv: vec2f) -> vec3f {
  let dims_u = textureDimensions(radiance_tex);
  let dims = vec2f(dims_u);
  let texel = clamp(uv, vec2f(0.0), vec2f(1.0)) * dims - vec2f(0.5);
  let base = floor(texel);
  let f = texel - base;
  var sum = vec3f(0.0);
  var weight_sum = 0.0;
  for (var y: i32 = -1; y <= 2; y = y + 1) {
    let wy = bc_spline_weight(f.y - f32(y));
    for (var x: i32 = -1; x <= 2; x = x + 1) {
      let wx = bc_spline_weight(f.x - f32(x));
      let w = wx * wy;
      let tap = clamp(vec2i(base) + vec2i(x, y), vec2i(0), vec2i(dims_u) - vec2i(1));
      // Alfa = validade (0 no sólido): convolução normalizada só sobre texels do chão.
      let texel_value = textureLoad(radiance_tex, tap, 0);
      let wv = w * texel_value.a;
      sum += texel_value.rgb * wv;
      weight_sum += wv;
    }
  }
  return max(sum / max(weight_sum, 1e-5), vec3f(0.0));
}

fn sample_radiance_at(pixel_screen: vec2f) -> vec3f {
  let fitted_uv = (pixel_screen - cfg.radiance_fit.xy) / cfg.radiance_fit.zw;
  let inside_fit =
    fitted_uv.x >= 0.0 && fitted_uv.x <= 1.0 &&
    fitted_uv.y >= 0.0 && fitted_uv.y <= 1.0;
  var radiance = sample_radiance_cubic(fitted_uv);
  if (!inside_fit) {
    radiance = vec3f(0.0);
  }
  return radiance;
}

fn compose_floor(
  base_colour: vec3f,
  radiance: vec3f,
  light_sources: vec4f,
  surface: f32,
  brightness_factor: f32,
) -> vec3f {
  var colour = max(base_colour, vec3f(0.0));
  colour *= radiance;
  colour = mix(colour, light_sources.rgb, surface);
  let sat = 1.0 + (2.0 - 1.0) * brightness_factor;
  let luma = dot(colour, LUMA);
  colour = max(mix(vec3f(luma), colour, sat), vec3f(0.0));
  colour *= brightness_factor;
  return colour;
}

const DARK_EDGE_FADE_MOBILE_BOOST: f32 = 2.0;

// Envelope vertical (só topo e base), como no original.
fn edge_fade(pixel_screen: vec2f) -> f32 {
  let mobile_boost =
    select(1.0, DARK_EDGE_FADE_MOBILE_BOOST, cfg.screen.x < cfg.screen.y * 1.25);
  let w = max(0.2 * mobile_boost * cfg.screen.y, 1.0);
  let d = min(pixel_screen.y, cfg.screen.y - pixel_screen.y);
  let t = clamp(d / w, 0.0, 1.0);
  return sqrt(t);
}

fn light_floor() -> vec3f {
  return LIGHT_FLOOR * (1.0 - LIGHT_GRAIN * FLOOR_NOISE_MEAN * grain_intensity());
}

const OCCLUDER_INTERIOR_MARGIN: f32 = 4.0;

@fragment fn fs_main(in: VSOut) -> @location(0) vec4f {
  let pixel_screen = in.pos.xy;
  let light_theme = cfg.theme.x > 0.5;
  let sdf = mark_sdf(pixel_screen);
  // O original media a largura da borda com dpdx/dpdy do SDF. Aqui, na borda, o SDF é a
  // distância exata em px de tela (gradiente de módulo 1): cobertura analítica com rampa de 1 px.
  let occluder_edge = 1.0;
  if (sdf < -OCCLUDER_INTERIOR_MARGIN) {
    if (light_theme) {
      return vec4f(LIGHT_SILHOUETTE, 1.0);
    }
    return vec4f(0.0, 0.0, 0.0, 1.0);
  }
  let light_sources = sample_light_sources(pixel_screen);
  let radiance = sample_radiance_at(pixel_screen);

  let surface = smoothstep(
    4.0,
    4.02,
    max(max(light_sources.r, light_sources.g), light_sources.b),
  );
  let floor_rgb = bg();
  var base_rgb = floor_rgb;
  if (surface > 0.0) {
    base_rgb = oklab_to_rgb(mix(col3v(floor_rgb), col3v(light_sources.rgb), surface));
  }

  let fade_inner = 0.0;
  let near_light = dot(radiance, LUMA);
  let near = near_falloff(
    sdf,
    near_light,
    fade_inner,
    cfg.mark.w,
    vec4f(0.046, 1.2, 2.74, 5.0),
    4.0,
    1.0,
  );
  let far = far_falloff(
    near_light,
    vec4f(0.65, 2.0, 0.0, 8.85),
    0.05,
    1.0,
  );
  let screen_blend =
    1.0 - (1.0 - min(near, 1.0)) * (1.0 - min(far, 1.0));
  let overflow =
    max(near - 1.0, 0.0) + max(far - 1.0, 0.0);
  let brightness_factor = screen_blend + overflow;

  let colour = compose_floor(
    base_rgb,
    radiance,
    light_sources,
    surface,
    brightness_factor,
  );

  var final_colour = tonemap(colour * 0.25);
  final_colour = (final_colour - vec3f(0.5)) * 1.05 + vec3f(0.5);
  let occluder = clamp(0.5 - sdf / occluder_edge, 0.0, 1.0);
  let fade = edge_fade(pixel_screen);

  if (light_theme) {
    // A luz do escuro vira tinta: luminância escurece, crominância tinge.
    let glow = clamp(final_colour, vec3f(0.0), vec3f(1.0)) * fade;
    let luma = dot(glow, LUMA);
    let chroma = glow - vec3f(luma);
    var ink = light_floor() * (1.0 - LIGHT_SHADE_STRENGTH * luma);
    ink = clamp(ink + chroma * LIGHT_TINT_STRENGTH, vec3f(0.0), vec3f(1.0));
    return vec4f(mix(ink, LIGHT_SILHOUETTE, occluder) + dither(pixel_screen), 1.0);
  }

  final_colour = mix(final_colour, vec3f(0.0), occluder);
  final_colour = final_colour * fade;
  return vec4f(max(final_colour + dither(pixel_screen), vec3f(0.0)), 1.0);
}
