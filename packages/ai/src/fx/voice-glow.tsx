"use client";

// Envolve voice-glow (Jakubantalik/Libraries.dev, MIT). Padrões Blips: lóbulos e faixa de luz
// nos tons do amarelo da marca (#FCBA28 / --primary e os --chart-* da @blips/ui, mais escuros no
// tema claro), variação de matiz curta para não sair do amarelo, tema resolvido pela classe
// `.dark` da @blips/ui e halo mais curto para a densidade mira. O original vive copiado em
// `src/vendor/voice-glow` (não publicado no npm); ver o README de lá.

import { forwardRef, useSyncExternalStore } from "react";
import { type FxTheme, useFxTheme } from "../lib/use-fx-theme";
import { ensureVoiceGlowEnv } from "../lib/voice-glow-env";
import type {
  UseMicrophoneOptions,
  UseMicrophoneResult,
  VoiceBeamProps,
} from "../vendor/voice-glow";
import * as upstream from "../vendor/voice-glow";

// Antes de qualquer render: a cópia lê `__VOICE_SURFACE__` (ver o módulo).
ensureVoiceGlowEnv();

// A API do original sai como constantes deste módulo, não como `export { … } from`: com
// `sideEffects: false`, o webpack (e o Next) troca um reexport pelo módulo de origem e pula
// este arquivo, e quem importasse só `VoiceBeam` ou `VOICE_SURFACE_LOOKS` daqui nunca
// rodaria o `ensureVoiceGlowEnv()` acima (`ReferenceError: __VOICE_SURFACE__`).
export const getAudioContext = upstream.getAudioContext;
export const isAudioSupported = upstream.isAudioSupported;
export const LOBE_SPACING = upstream.LOBE_SPACING;
export const LOBE_SPAN = upstream.LOBE_SPAN;
export const parseRgb = upstream.parseRgb;
export const resolveVoiceDefaults = upstream.resolveVoiceDefaults;
export const resolveVoiceStyle = upstream.resolveVoiceStyle;
export const themePresets = upstream.themePresets;
export const useMicrophone = upstream.useMicrophone;
export const VOICE_SURFACE_LOOKS = upstream.VOICE_SURFACE_LOOKS;
export const VoiceBeam = upstream.VoiceBeam;
export const voiceDefaults = upstream.voiceDefaults;
export const voiceLobes = upstream.voiceLobes;
export const voicePalettes = upstream.voicePalettes;
export const voiceTypePresets = upstream.voiceTypePresets;
export const voiceTypeStyle = upstream.voiceTypeStyle;

export type {
  MicrophoneState,
  UseMicrophoneOptions,
  UseMicrophoneResult,
  VoiceBeamColorVariant,
  VoiceBeamDotShape,
  VoiceBeamLevel,
  VoiceBeamLinePattern,
  VoiceBeamLook,
  VoiceBeamMotion,
  VoiceBeamProps,
  VoiceBeamTheme,
  VoiceBeamType,
  VoiceGeometry,
  VoiceLobe,
  VoiceThemeColors,
  VoiceTypeStyle,
} from "../vendor/voice-glow";

/**
 * Cores dos 7 lóbulos (centro primeiro, depois os pares para fora), em hex: o `colors` do
 * upstream só aceita `#rgb`, `#rrggbb` ou `rgb()`, não `var()` nem `oklch()`. `--chart-*`
 * convertidos dos oklch da @blips/ui. No claro a base desce para âmbar (`--chart-3`/`--chart-4`),
 * onde o amarelo puro some contra o fundo branco.
 */
export const BLIPS_VOICE_GLOW_COLORS: Record<FxTheme, readonly string[]> = {
  // primary, chart-1, chart-2, chart-3, primary, chart-2, chart-1
  dark: [
    "#fcba28",
    "#ffdf20",
    "#f0b100",
    "#d08700",
    "#fcba28",
    "#f0b100",
    "#ffdf20",
  ],
  // chart-3, chart-2, chart-4, primary, chart-5, chart-3, chart-4
  light: [
    "#d08700",
    "#f0b100",
    "#a65f00",
    "#fcba28",
    "#894b00",
    "#d08700",
    "#a65f00",
  ],
};

/**
 * Cores da faixa de luz sobre o brilho: o núcleo e as franjas acima, no meio e abaixo dele.
 * O upstream usa franjas vermelha/verde/azul; aqui elas ficam nos tons do amarelo.
 */
export const BLIPS_VOICE_GLOW_BAND_COLORS: Record<
  FxTheme,
  { core: string; above: string; mid: string; below: string }
> = {
  dark: { core: "#ffffff", above: "#ffdf20", mid: "#fcba28", below: "#d08700" },
  light: {
    core: "#f0b100",
    above: "#d08700",
    mid: "#ffdf20",
    below: "#a65f00",
  },
};

/** Padrões Blips aplicados pelo `BlipsVoiceBeam`; qualquer prop explícita vence. */
export const BLIPS_VOICE_GLOW_DEFAULTS = {
  type: "default",
  // Base para o slot de cor que não parsear; a mais próxima da marca.
  colorVariant: "gold",
  // ±12° em torno do amarelo (upstream: 24° no escuro, 40° no claro).
  hueRange: 12,
  // A mira é compacta: halo um pouco mais curto que o upstream (1).
  glowSize: 0.85,
} as const satisfies Partial<VoiceBeamProps>;

export type BlipsVoiceBeamProps = VoiceBeamProps;

/**
 * `VoiceBeam` com os padrões Blips. Aceita todas as props do original.
 *
 * - `theme` padrão segue o tema da @blips/ui (classe `.dark` no <html>); o upstream usa `dark`.
 * - As cores Blips (`BLIPS_VOICE_GLOW_COLORS` e `BLIPS_VOICE_GLOW_BAND_COLORS`) só entram
 *   quando nem `colors` nem `colorVariant` são passados; `bandColors` explícito vence a faixa.
 */
export const BlipsVoiceBeam = forwardRef<HTMLDivElement, BlipsVoiceBeamProps>(
  function BlipsVoiceBeam(
    { theme, colors, colorVariant, bandColors, ...props },
    ref
  ) {
    const documentTheme = useFxTheme();
    const resolvedTheme: VoiceBeamProps["theme"] = theme ?? documentTheme;
    // `auto` explícito: o upstream decide no cliente; as cores seguem o documento.
    const paletteTheme: FxTheme =
      resolvedTheme === "dark" || resolvedTheme === "light"
        ? resolvedTheme
        : documentTheme;
    const brandPalette = colors === undefined && colorVariant === undefined;

    return (
      <VoiceBeam
        ref={ref}
        {...BLIPS_VOICE_GLOW_DEFAULTS}
        bandColors={
          bandColors ??
          (brandPalette
            ? BLIPS_VOICE_GLOW_BAND_COLORS[paletteTheme]
            : undefined)
        }
        colorVariant={colorVariant ?? BLIPS_VOICE_GLOW_DEFAULTS.colorVariant}
        colors={
          colors ??
          (brandPalette
            ? [...BLIPS_VOICE_GLOW_COLORS[paletteTheme]]
            : undefined)
        }
        theme={resolvedTheme}
        {...props}
      />
    );
  }
);

const subscribeNoop = () => () => {};

/**
 * `useMicrophone` seguro para SSR. O original calcula `supported`/`state` lendo `navigator` no
 * primeiro render (no servidor sai `unsupported`, no cliente `idle`), o que diverge na
 * hidratação. Este devolve `supported: false` e `state: "idle"` até montar no cliente e, daí em
 * diante, o resultado do original sem mudança.
 */
export function useBlipsMicrophone(
  options?: UseMicrophoneOptions
): UseMicrophoneResult {
  const mic = useMicrophone(options);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
  if (mounted) return mic;
  return { ...mic, supported: false, state: "idle" };
}
