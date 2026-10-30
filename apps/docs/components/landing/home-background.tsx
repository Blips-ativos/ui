"use client";

import dynamic from "next/dynamic";

// Fundo WebGPU da home: o "b" como vidro líquido refratando feixes âmbar
// (adaptado do exemplo typegpu-liquid-glass do vgpu, MIT — ver ./liquid-glass).
// Só existe no cliente: o site é exportação estática e o WebGPU não roda no
// servidor. Fica atrás da página inteira; o enquadramento do "b" vem do
// [data-triangle-container] que a Hero posiciona onde a v2 tinha o b-mark. As cenas
// anteriores (LEDs em ./blips-led e prisma em ./prism-background) continuam
// no repositório, sem uso.
const LiquidGlass = dynamic(
  () => import("./liquid-glass").then((mod) => mod.LiquidGlass),
  { ssr: false }
);

export function HomeBackground() {
  return <LiquidGlass />;
}
