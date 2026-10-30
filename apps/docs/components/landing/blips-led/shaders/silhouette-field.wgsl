// Blips (sem origem no vgpu): campo da silhueta do "b" em resolução cheia, assado uma vez por
// rebuild (resize/enquadramento) — nunca por quadro.
//
// Um só draw com dois tipos de primitiva, num alvo rg16float com blend MIN nos dois canais:
// - malha (earcut do nível denso, `kind` 0): G = 0 marca "dentro" no centro do pixel — regra de
//   rasterização da GPU, estanque entre triângulos vizinhos;
// - uma cápsula por aresta densa (`kind` 1): um quad que cobre a aresta mais `band` px em volta;
//   cada pixel coberto escreve a distância exata até aquela aresta, e o MIN do blend fica com a
//   menor — a distância ao contorno, sem laço sobre arestas.
// Resultado: R = distância sem sinal (px de tela, saturada em `band`), G = 0 dentro / 1 fora.
// O chão lê isto para a cobertura analítica da borda (AA) e para o brilho rente ao contorno.

struct Config {
  // xy: tamanho do alvo (px); z: largura da faixa (px).
  size_band: vec4f,
};
@group(0) @binding(0) var<uniform> cfg: Config;

struct VSIn {
  @location(0) position: vec2f,
  @location(1) seg: vec4f,
  @location(2) kind: f32,
};
struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) @interpolate(flat) seg: vec4f,
  @location(1) @interpolate(flat) kind: f32,
};

@vertex fn vs_main(in: VSIn) -> VSOut {
  var out: VSOut;
  let clip = (in.position / cfg.size_band.xy) * vec2f(2.0, -2.0) + vec2f(-1.0, 1.0);
  out.pos = vec4f(clip, 0.0, 1.0);
  out.seg = in.seg;
  out.kind = in.kind;
  return out;
}

@fragment fn fs_main(in: VSOut) -> @location(0) vec4f {
  let band = cfg.size_band.z;
  if (in.kind < 0.5) {
    // Malha: R neutro (o clear já é `band`), G = 0 (dentro).
    return vec4f(band, 0.0, 0.0, 0.0);
  }
  let p = in.pos.xy;
  let a = in.seg.xy;
  let e = in.seg.zw - in.seg.xy;
  let h = clamp(dot(p - a, e) / max(dot(e, e), 1e-8), 0.0, 1.0);
  let d = length(p - a - e * h);
  return vec4f(min(d, band), 1.0, 0.0, 0.0);
}
