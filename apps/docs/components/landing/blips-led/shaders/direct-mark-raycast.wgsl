// Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/shaders/direct-triangle-raycast.wgsl (MIT).
// Blips: o raycast analítico contra 3 arestas virou contra as N arestas do "b" (storage `segments`):
// - point_in_triangle → regra par-ímpar sobre todas as arestas (furos inclusos);
// - triangle_edge_distance → menor distância a qualquer aresta;
// - angular_interval → mira no fecho convexo do "b" (gravado no storage logo depois das arestas).
//   Pixel cercado pelo "b" (dentro do fecho: bojo, furo do disco) varre os 360°;
// - em vez de testar todo raio contra toda aresta, cada aresta calcula quais raios do leque ela
//   cobre (ângulo dos extremos) e só testa esses — uma rasterização 1D por pixel, porque o "b"
//   tem ~124 arestas contra 3 do triângulo;
// - a amostra de cor do LED é lida um pouco depois do acerto, ao longo do raio (`target_info.z`),
//   porque os quads dos LEDs ficam do lado de dentro do contorno;
// - a média é sobre os raios que acertaram geometria (com piso de metade do leque), para não
//   escurecer onde o leque passa a ser de 360° (o original dividia pelo total de raios, que
//   no triângulo convexo acertavam praticamente todos);
// - "dentro do b / colado na borda" não percorre mais as arestas: lê o SDF assado uma vez por
//   rebuild na mesma grade deste alvo (`mark_sdf_tex`, ver mark-sdf-bake.wgsl);
// - o alfa da saída marca validade: 0 no sólido (e na faixa colada à borda), 1 no chão. O chão
//   usa isso para reamostrar a luz sem puxar o preto do sólido através da borda.

struct Config {
  // xy: centro da caixa do "b" em px de simulação.
  mark: vec4f,
  // x: arestas no início de `segments`; y: vértices do fecho logo depois (xy de cada vec4f).
  counts: vec4f,
  size_steps: vec4f,
  params: vec4f,
  // x: escala do alvo; y: altura de referência / altura da simulação; z: avanço da amostra (px).
  target_info: vec4f,
};

@group(0) @binding(0) var<uniform> cfg: Config;
@group(0) @binding(1) var light_sources_tex: texture_2d<f32>;
@group(0) @binding(2) var<storage, read> segments: array<vec4f>;
@group(0) @binding(3) var mark_sdf_tex: texture_2d<f32>;

struct VSOut { @builtin(position) pos: vec4f };

const MAX_RAYS: u32 = 24u;
// Jitter como fração da largura de um estrato (ver o original).
const JITTER_AMPLITUDE: f32 = 0.7;
const PI: f32 = 3.141592653589793;
const TAU: f32 = 6.283185307179586;
const EPSILON: f32 = 1e-5;

@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var p = array<vec2f, 3>(vec2f(-1.0, -3.0), vec2f(-1.0, 1.0), vec2f(3.0, 1.0));
  var out: VSOut;
  out.pos = vec4f(p[vi], 0.0, 1.0);
  return out;
}

fn cross2(a: vec2f, b: vec2f) -> f32 {
  return a.x * b.y - a.y * b.x;
}

// Interleaved gradient noise (Jimenez) → [0,1].
fn ign(p: vec2f) -> f32 {
  return fract(52.9829189 * fract(dot(p, vec2f(0.06711056, 0.00583715))));
}

fn load_light_source(sample_pos: vec2f) -> vec4f {
  let dims = textureDimensions(light_sources_tex);
  let inside =
    sample_pos.x >= 0.0 && sample_pos.x < f32(dims.x) &&
    sample_pos.y >= 0.0 && sample_pos.y < f32(dims.y);
  if (!inside) {
    return vec4f(0.0, 0.0, 0.0, 1000.0);
  }
  let px = clamp(vec2i(floor(sample_pos)), vec2i(0), vec2i(dims) - vec2i(1));
  return textureLoad(light_sources_tex, px, 0);
}

// Raio (origin + t*dir, t > passo mínimo) × aresta; devolve t ou -1.
fn ray_segment_t(origin: vec2f, dir: vec2f, seg: vec4f) -> f32 {
  let e = seg.zw - seg.xy;
  let diff = seg.xy - origin;
  let denom = cross2(dir, e);
  if (abs(denom) < EPSILON) { return -1.0; }
  let inv = 1.0 / denom;
  let t = cross2(diff, e) * inv;
  let u = cross2(diff, dir) * inv;
  if (t < cfg.size_steps.z || u < 0.0 || u > 1.0) { return -1.0; }
  return t;
}

// Ângulo de v relativo à direção `basis`, em [0, 2π).
fn angle_from(basis: vec2f, v: vec2f) -> f32 {
  let a = atan2(cross2(basis, v), dot(basis, v));
  return select(a, a + TAU, a < 0.0);
}

// Testa a aresta contra os raios [i0, i1] do leque e guarda o acerto mais próximo de cada um.
fn scan_rays(
  origin: vec2f,
  seg: vec4f,
  i0: i32,
  i1: i32,
  dirs: ptr<function, array<vec2f, MAX_RAYS>>,
  best: ptr<function, array<f32, MAX_RAYS>>,
) {
  let lo = max(i0, 0);
  let hi = min(i1, i32(MAX_RAYS) - 1);
  for (var i = lo; i <= hi; i = i + 1) {
    let t = ray_segment_t(origin, (*dirs)[i], seg);
    if (t >= 0.0 && t < (*best)[i]) {
      (*best)[i] = t;
    }
  }
}

@fragment fn fs_main(in: VSOut) -> @location(0) vec4f {
  let target_scale = max(cfg.target_info.x, 1e-4);
  let p = in.pos.xy / target_scale;
  let total = arrayLength(&segments);
  let seg_count = min(u32(cfg.counts.x), total);
  let hull_count = min(u32(cfg.counts.y), total - seg_count);

  // 1) Dentro do "b" (ou colado na borda) é o próprio objeto: sem radiância e inválido (alfa 0).
  //    O SDF assado tem o tamanho deste alvo: o texel é o deste pixel.
  let sdf_dims = vec2i(textureDimensions(mark_sdf_tex));
  let sdf_px = clamp(vec2i(floor(in.pos.xy)), vec2i(0), sdf_dims - vec2i(1));
  if (textureLoad(mark_sdf_tex, sdf_px, 0).r <= cfg.size_steps.w) {
    return vec4f(0.0);
  }

  // 2) Leque de raios: a extensão angular do fecho convexo vista do pixel; se ela passa de
  //    meia volta, o pixel está cercado e o leque vira o círculo inteiro.
  let to_center = cfg.mark.xy - p;
  let center_len = length(to_center);
  let basis = select(vec2f(1.0, 0.0), to_center / center_len, center_len > EPSILON);
  var rel_min = 0.0;
  var rel_max = 0.0;
  for (var h = 0u; h < hull_count; h = h + 1u) {
    let v = segments[seg_count + h].xy - p;
    let rel = atan2(cross2(basis, v), dot(basis, v));
    rel_min = min(rel_min, rel);
    rel_max = max(rel_max, rel);
  }
  let center_angle = atan2(basis.y, basis.x);
  var start = center_angle + rel_min;
  var span = rel_max - rel_min;
  if (span >= PI - 1e-3 || hull_count < 3u) {
    start = center_angle - PI;
    span = TAU;
  }
  if (!(span > EPSILON)) {
    return vec4f(0.0, 0.0, 0.0, 1.0);
  }

  let jitter = (ign(in.pos.xy) - 0.5) * JITTER_AMPLITUDE;
  let inv_rays = 1.0 / f32(MAX_RAYS);
  let step_angle = span * inv_rays;
  let first_angle = start + step_angle * (0.5 + jitter);
  let step_c = cos(step_angle);
  let step_s = sin(step_angle);
  var dirs: array<vec2f, MAX_RAYS>;
  var best: array<f32, MAX_RAYS>;
  var dir = vec2f(cos(first_angle), sin(first_angle));
  for (var i = 0u; i < MAX_RAYS; i = i + 1u) {
    dirs[i] = dir;
    best[i] = 1e30;
    dir = vec2f(dir.x * step_c - dir.y * step_s, dir.x * step_s + dir.y * step_c);
  }

  // 3) Cada aresta só testa os raios do seu arco: raio i está no ângulo (i + 0.5 + jitter)·passo
  //    a partir de `start`. Uma folga de ±1 índice absorve arredondamento; o teste exato filtra.
  let start_dir = vec2f(cos(start), sin(start));
  let offset = 0.5 + jitter;
  for (var s = 0u; s < seg_count; s = s + 1u) {
    let seg = segments[s];
    let ra = angle_from(start_dir, seg.xy - p);
    let rb = angle_from(start_dir, seg.zw - p);
    let lo = min(ra, rb);
    let hi = max(ra, rb);
    if (hi - lo <= PI) {
      scan_rays(p, seg, i32(ceil(lo / step_angle - offset)) - 1, i32(floor(hi / step_angle - offset)) + 1, &dirs, &best);
    } else {
      // O arco curto atravessa o zero: [hi, 2π) ∪ [0, lo].
      scan_rays(p, seg, i32(ceil(hi / step_angle - offset)) - 1, i32(MAX_RAYS) - 1, &dirs, &best);
      scan_rays(p, seg, 0, i32(floor(lo / step_angle - offset)) + 1, &dirs, &best);
    }
  }

  // 4) Luz: o acerto mais próximo de cada raio é a primeira borda visível; a cor vem do LED.
  var sum = vec3f(0.0);
  var hits = 0.0;
  for (var i = 0u; i < MAX_RAYS; i = i + 1u) {
    let t = best[i];
    if (t > 1e29) {
      continue;
    }
    hits += 1.0;
    let source = load_light_source(p + dirs[i] * (t + cfg.target_info.z));
    if (max(max(source.r, source.g), source.b) > cfg.params.w) {
      // Espalhamento geométrico na distância normalizada pela cena + absorção (Beer-Lambert),
      // como no original.
      let falloff_dist = t * cfg.target_info.y;
      let distance_weight =
        pow(max(falloff_dist, 1.0), -cfg.params.y) * exp(-cfg.params.x * t);
      sum += source.rgb * distance_weight;
    }
  }

  let radiance = (sum / max(hits, 0.5 * f32(MAX_RAYS))) * cfg.params.z;
  return vec4f(radiance, 1.0);
}
