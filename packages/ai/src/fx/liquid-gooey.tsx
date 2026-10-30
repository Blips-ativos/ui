"use client";

// Envolve liquid-gooey (Jakubantalik/Libraries.dev, MIT). Padrões Blips: superfície do líquido nos
// tokens da @blips/ui (`--primary` #FCBA28 por padrão, ou card/muted/secondary via `tone`), cor do
// conteúdo no `-foreground` do mesmo token, sombra discreta (shadow-xs) e goo um pouco mais curto e
// nítido para os itens compactos da densidade mira. Tudo via CSS (`var()`), então o tema segue a
// classe `.dark` sem JS; nada de `window` no render (o upstream mede no cliente, em efeito).

import type { LiquidProps } from "liquid-gooey";
import { Liquid } from "liquid-gooey";
import {
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from "react";

export type {
  BendTuning,
  CornerRadii,
  DissolveOptions,
  EvolveOptions,
  ImageMeltOptions,
  LiquidEffect,
  LiquidItemProps,
  LiquidProps,
  MorphTuning,
  MoveOptions,
  MoveTuning,
  SpringConfig,
  Transition,
  TransitionPreset,
} from "liquid-gooey";
export {
  EVOLVE_DEFAULTS,
  easingFunction,
  IMAGE_MELT_DEFAULTS,
  Liquid,
  MOVE_DEFAULTS,
  presets,
} from "liquid-gooey";

/** Token da @blips/ui que pinta o líquido. */
export type BlipsLiquidTone = "primary" | "card" | "muted" | "secondary";

/**
 * Superfície (`fill`) e cor do conteúdo de cada tom. O `fill` do upstream vai
 * para `style.fill` do SVG, então `var()` funciona e o tema troca sozinho.
 * `primary` traz o hex da marca como fallback para quando o tema não carregou.
 */
export const BLIPS_LIQUID_TONES: Record<
  BlipsLiquidTone,
  { fill: string; foreground: string }
> = {
  primary: {
    fill: "var(--primary, #fcba28)",
    foreground: "var(--primary-foreground)",
  },
  card: { fill: "var(--card)", foreground: "var(--card-foreground)" },
  muted: { fill: "var(--muted)", foreground: "var(--foreground)" },
  secondary: {
    fill: "var(--secondary)",
    foreground: "var(--secondary-foreground)",
  },
};

/** Padrões Blips aplicados pelo `BlipsLiquid`; qualquer prop explícita vence. */
export const BLIPS_LIQUID_DEFAULTS = {
  // Upstream: 6. Itens da mira são menores (h-7/h-8, gap-1/gap-2): goo mais
  // curto ainda funde vizinhos a 4–6px e não arredonda demais os cantos.
  blur: 5,
  // Upstream: 18. Borda do líquido um pouco mais nítida em itens pequenos.
  contrast: 20,
  // Equivalente ao shadow-xs; desenhada na silhueta já fundida.
  shadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
} as const satisfies Partial<LiquidProps>;

export interface BlipsLiquidProps extends LiquidProps {
  /**
   * Token da @blips/ui que pinta o líquido e dá a cor do conteúdo.
   * Ignorado quando `fill` é passado. @default "primary"
   */
  tone?: BlipsLiquidTone;
}

const BlipsLiquidRoot = forwardRef<HTMLDivElement, BlipsLiquidProps>(
  function BlipsLiquid({ tone = "primary", fill, style, ...props }, ref) {
    const palette = BLIPS_LIQUID_TONES[tone];
    return (
      <Liquid
        ref={ref}
        {...BLIPS_LIQUID_DEFAULTS}
        fill={fill ?? palette.fill}
        // Com `fill` próprio, a cor do texto fica com quem chamou.
        style={
          fill === undefined ? { color: palette.foreground, ...style } : style
        }
        {...props}
      />
    );
  }
);

/**
 * `Liquid` com os padrões Blips. Aceita todas as props do original; `fill`
 * explícito vence `tone`. Use `BlipsLiquid.Item` (o mesmo `Liquid.Item` do
 * upstream) para os pedaços que se fundem.
 */
export const BlipsLiquid: ForwardRefExoticComponent<
  BlipsLiquidProps & RefAttributes<HTMLDivElement>
> & { Item: typeof Liquid.Item } = Object.assign(BlipsLiquidRoot, {
  Item: Liquid.Item,
});
