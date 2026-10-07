"use client";

// Envolve bot-avatars (Jakubantalik/Libraries.dev, MIT). Padrões Blips: corpo no amarelo da marca
// (#FCBA28 / --primary) ou num tom dos tokens --chart-* da @blips/ui, cor exata (sem o realce de
// saturação do upstream), tamanho 32 e sombreamento `smooth` para a densidade mira, sem pulos ociosos.
// A cópia do upstream mora em src/vendor/bot-avatars e não é editada.

import { forwardRef } from "react";
import type { BotAvatarProps } from "../vendor/bot-avatars";
import { BotAvatar } from "../vendor/bot-avatars";

export type {
  BotAvatarFace,
  BotAvatarGlasses,
  BotAvatarHat,
  BotAvatarPreset,
  BotAvatarProps,
  BotAvatarShading,
  BotAvatarSquashEase,
  BotAvatarState,
  BotAvatarType,
} from "../vendor/bot-avatars";
export {
  BotAvatar,
  botAvatarFaces,
  botAvatarPalette,
  botAvatarPresets,
  botAvatarStates,
  botAvatarTypes,
} from "../vendor/bot-avatars";

/** Tom do corpo, a partir dos tokens da @blips/ui. `neutral` é a cor própria de cada tipo no upstream. */
export type BlipsBotTone =
  | "primary"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "neutral";

/**
 * Hex dos tokens (o canvas do upstream lê `#rgb`, `#rrggbb` ou `rgb()`, não
 * `var()` nem `oklch()`). `--chart-*` convertidos dos oklch da @blips/ui. O
 * corpo é um preenchimento, não tinta sobre o fundo: o mesmo hex serve nos dois
 * temas, e a cor do rosto se ajusta sozinha (clara em `chart-4` e `chart-5`).
 */
export const BLIPS_BOT_TONES: Record<
  Exclude<BlipsBotTone, "neutral">,
  string
> = {
  primary: "#fcba28",
  "chart-1": "#ffdf20",
  "chart-2": "#f0b100",
  "chart-3": "#d08700",
  "chart-4": "#a65f00",
  "chart-5": "#894b00",
};

/** Padrões Blips aplicados pelo `BlipsBotAvatar`; qualquer prop explícita vence. */
export const BLIPS_BOT_AVATAR_DEFAULTS = {
  // Ao lado de mensagem ou no cabeçalho do chat (upstream: 64).
  size: 32,
  // Vetorial e instantâneo: `fabric` e `plastic` assam o material antes de aparecer
  // e pouco acrescentam em 32px (upstream: `fabric`).
  shading: "smooth",
  // Sem pulos ociosos a cada ~8s: numa lista de mensagens o salto distrai.
  // O estado `working` continua pulando.
  jumpEvery: 0,
} as const satisfies Partial<BotAvatarProps>;

export interface BlipsBotAvatarProps extends BotAvatarProps {
  /** Tom do corpo. Ignorado quando `color` é passado. @default "primary" */
  tone?: BlipsBotTone;
}

/**
 * `BotAvatar` com os padrões Blips. Aceita todas as props do original mais
 * `tone`; `color` explícito vence `tone`. Encaminha `ref` para o `<canvas>`.
 *
 * Quando a cor vem do `tone`, `brightness` e `saturation` ficam em `1` para o
 * corpo sair no hex exato do token (o upstream satura a `1.5` por padrão).
 */
export const BlipsBotAvatar = forwardRef<
  HTMLCanvasElement,
  BlipsBotAvatarProps
>(function BlipsBotAvatar(
  { tone = "primary", color, brightness, saturation, ...props },
  ref
) {
  const toneColor = tone === "neutral" ? undefined : BLIPS_BOT_TONES[tone];
  const fromTone = color === undefined && toneColor !== undefined;
  return (
    <BotAvatar
      ref={ref}
      {...BLIPS_BOT_AVATAR_DEFAULTS}
      brightness={brightness ?? (fromTone ? 1 : undefined)}
      color={color ?? toneColor}
      saturation={saturation ?? (fromTone ? 1 : undefined)}
      {...props}
    />
  );
});
