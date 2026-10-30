/**
 * Tipos compartilhados da cena de LEDs do "b".
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/types.ts
 * (MIT). Blips: o original só tinha os modos do lil-gui (destacar uma aresta);
 * a UI de debug saiu, então aqui ficam o tema e os tipos de geometria 2D.
 */

/** Tema da cena — segue a classe `light`/`dark` que o next-themes põe no <html>. */
export type BlipsLedTheme = "dark" | "light";

export interface Point {
  x: number;
  y: number;
}

/**
 * Onde o "b" fica, em px CSS relativos ao canvas: centro e altura da caixa do
 * símbolo. Vem do [data-triangle-container] da Hero.
 */
export interface MarkFraming {
  centerX: number;
  centerY: number;
  height: number;
}
