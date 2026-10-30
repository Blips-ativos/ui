// Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/shaders/geometry.wgsl (MIT).
// Blips: o original tinha o SDF de um triângulo (3 vértices). O "b" tem N arestas num storage
// buffer, e WGSL não passa storage por ponteiro para funções; então aqui ficam só as operações
// por aresta (seg = a.xy, b.xy) e cada shader faz o laço sobre o seu binding `segments`.

// Distância de p até a aresta seg.
export fn mark_segment_distance(p: vec2f, seg: vec4f) -> f32 {
  let a = seg.xy;
  let e = seg.zw - seg.xy;
  let v = p - a;
  let h = clamp(dot(v, e) / max(dot(e, e), 1e-8), 0.0, 1.0);
  return length(v - e * h);
}

// Regra par-ímpar: true se o raio horizontal (+x) a partir de p cruza a aresta.
// Alternar um booleano a cada cruzamento dá "dentro do b" (furos inclusos).
export fn mark_segment_crosses(p: vec2f, seg: vec4f) -> bool {
  let a = seg.xy;
  let b = seg.zw;
  if ((a.y > p.y) == (b.y > p.y)) {
    return false;
  }
  let x = a.x + (p.y - a.y) * (b.x - a.x) / (b.y - a.y);
  return p.x < x;
}
