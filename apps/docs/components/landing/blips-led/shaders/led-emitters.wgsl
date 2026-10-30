// Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/shaders/led-emitters.wgsl (MIT).
// Blips: os quads dos LEDs ficam do lado de dentro dos laços do "b" (contorno, disco e furo). O
// recorte, que era "fora do triângulo canônico + margem", virou "fora do b" pela regra par-ímpar
// sobre as arestas do storage `segments` — a margem de 1 px dos quads não vaza para o chão.

import { mark_segment_crosses } from "./geometry.wgsl";

struct Config {
  resolution: vec4f,
  tunables: vec4f,
  // x: número de arestas do "b" no início de `segments`.
  counts: vec4f,
};
struct Led {
  pos_brightness: vec4f,
  color: vec4f,
};
@group(0) @binding(0) var<uniform> cfg: Config;
@group(0) @binding(1) var<storage, read> leds: array<Led>;
@group(0) @binding(2) var<storage, read> segments: array<vec4f>;

struct VSIn {
  @location(0) position: vec2f,
  @location(1) led_index: f32,
};
struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) led_index: f32,
};

@vertex fn vs_main(in: VSIn) -> VSOut {
  var out: VSOut;
  let clip = (in.position / cfg.resolution.xy) * vec2f(2.0, -2.0) + vec2f(-1.0, 1.0);
  out.pos = vec4f(clip, 0.0, 1.0);
  out.led_index = in.led_index;
  return out;
}

fn inside_mark(p: vec2f) -> bool {
  let count = min(u32(cfg.counts.x), arrayLength(&segments));
  var inside = false;
  for (var i = 0u; i < count; i = i + 1u) {
    if (mark_segment_crosses(p, segments[i])) {
      inside = !inside;
    }
  }
  return inside;
}

@fragment fn fs_main(in: VSOut) -> @location(0) vec4f {
  let pixel = in.pos.xy;
  if (!inside_mark(pixel)) {
    discard;
  }

  let raw_index = u32(max(round(in.led_index), 0.0));
  let i = min(raw_index, arrayLength(&leds) - 1u);
  let n01 = clamp(leds[i].pos_brightness.z, 0.0, 1.0);
  let intensity = mix(cfg.tunables.y, cfg.tunables.z, n01);
  let emit = leds[i].color.rgb * cfg.tunables.x * intensity;
  // Alpha fica fora pelo writeMask (só RGB), como no original.
  return vec4f(emit, 0.0);
}
