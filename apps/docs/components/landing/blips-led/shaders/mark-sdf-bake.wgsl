// Blips (sem origem no vgpu): SDF do "b" na grade do raycast, assado uma vez por rebuild.
//
// Antes, o raycast e o chão refaziam a cada quadro "par-ímpar + menor distância" sobre todas as
// arestas, por pixel (o chão em resolução cheia, dentro do círculo envolvente). Agora isso roda
// uma vez, no tamanho do alvo do raycast, com as arestas do nível moderado:
// - o raycast lê o próprio texel para descartar o que é sólido (ou colado na borda);
// - o chão interpola (bilinear) para o campo distante — o perto da borda vem do campo denso.
// Saída: R = distância com sinal em px de simulação (negativa dentro).

import { mark_segment_crosses, mark_segment_distance } from "./geometry.wgsl";

struct Config {
  // x: arestas no início de `segments`; y: escala do alvo (alvo / simulação).
  counts_scale: vec4f,
};
@group(0) @binding(0) var<uniform> cfg: Config;
@group(0) @binding(1) var<storage, read> segments: array<vec4f>;

struct VSOut { @builtin(position) pos: vec4f };

@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> VSOut {
  var p = array<vec2f, 3>(vec2f(-1.0, -3.0), vec2f(-1.0, 1.0), vec2f(3.0, 1.0));
  var out: VSOut;
  out.pos = vec4f(p[vi], 0.0, 1.0);
  return out;
}

@fragment fn fs_main(in: VSOut) -> @location(0) vec4f {
  let p = in.pos.xy / max(cfg.counts_scale.y, 1e-4);
  let count = min(u32(cfg.counts_scale.x), arrayLength(&segments));
  var inside = false;
  var d = 1e30;
  for (var i = 0u; i < count; i = i + 1u) {
    let seg = segments[i];
    d = min(d, mark_segment_distance(p, seg));
    if (mark_segment_crosses(p, seg)) {
      inside = !inside;
    }
  }
  return vec4f(select(d, -d, inside), 0.0, 0.0, 1.0);
}
