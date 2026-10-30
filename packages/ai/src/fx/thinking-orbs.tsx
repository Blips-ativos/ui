"use client";

// Envolve thinking-orbs (Jakubantalik/Libraries.dev, MIT). Padrões Blips: tinta no amarelo da
// marca (#FCBA28 / --primary) no escuro e em âmbar dos tokens --chart-* no claro, para manter
// contraste; tamanho 20 (escala de texto, densidade mira); prop `tone` para os tokens.

import type { OrbTheme, ThinkingOrbProps } from "thinking-orbs";
import { ThinkingOrb } from "thinking-orbs";
import { useFxTheme } from "../lib/use-fx-theme";

export type {
  OrbSize,
  OrbState,
  OrbTheme,
  ThinkingOrbProps,
} from "thinking-orbs";
export { ThinkingOrb };

/** Tom da tinta, a partir dos tokens da @blips/ui. `neutral` é a tinta cinza do upstream. */
export type BlipsOrbTone =
  | "primary"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "neutral";

/**
 * Hex dos tokens (o `color` do upstream só aceita `#rgb`, `#rrggbb` ou `rgb()`,
 * não `var()` nem `oklch()`). `--chart-*` convertidos dos oklch da @blips/ui.
 * `primary` usa #FCBA28 no escuro e cai para `--chart-4` no claro, onde o
 * amarelo puro some contra o fundo branco.
 */
export const BLIPS_ORB_TONES: Record<
  Exclude<BlipsOrbTone, "neutral">,
  { dark: string; light: string }
> = {
  primary: { dark: "#fcba28", light: "#a65f00" },
  "chart-1": { dark: "#ffdf20", light: "#ffdf20" },
  "chart-2": { dark: "#f0b100", light: "#f0b100" },
  "chart-3": { dark: "#d08700", light: "#d08700" },
  "chart-4": { dark: "#a65f00", light: "#a65f00" },
  "chart-5": { dark: "#894b00", light: "#894b00" },
};

/** Padrões Blips aplicados pelo `BlipsThinkingOrb`; qualquer prop explícita vence. */
export const BLIPS_THINKING_ORB_DEFAULTS = {
  state: "working",
  size: 20,
  theme: "auto",
} as const satisfies Partial<ThinkingOrbProps>;

export interface BlipsThinkingOrbProps extends ThinkingOrbProps {
  /** Tom da tinta. Ignorado quando `color` é passado. @default "primary" */
  tone?: BlipsOrbTone;
}

function resolveTone(
  tone: BlipsOrbTone,
  theme: OrbTheme,
  documentTheme: "dark" | "light"
): string | undefined {
  if (tone === "neutral") return undefined;
  const effective = theme === "auto" ? documentTheme : theme;
  return BLIPS_ORB_TONES[tone][effective];
}

/**
 * `ThinkingOrb` com os padrões Blips. Aceita todas as props do original;
 * `color` explícito vence `tone`.
 */
export function BlipsThinkingOrb({
  tone = "primary",
  color,
  theme = BLIPS_THINKING_ORB_DEFAULTS.theme,
  ...props
}: BlipsThinkingOrbProps) {
  const documentTheme = useFxTheme();
  return (
    <ThinkingOrb
      state={BLIPS_THINKING_ORB_DEFAULTS.state}
      size={BLIPS_THINKING_ORB_DEFAULTS.size}
      theme={theme}
      color={color ?? resolveTone(tone, theme, documentTheme)}
      {...props}
    />
  );
}
