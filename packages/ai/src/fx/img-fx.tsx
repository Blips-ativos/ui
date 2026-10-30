"use client";

// Envolve img-fx (Jakubantalik/Libraries.dev, MIT). Padrões Blips: paleta dos presets
// re-tingida para o amarelo da marca (#FCBA28 / --primary) no escuro e para o âmbar de
// --chart-4 no claro, fundo no token --card da @blips/ui, tema resolvido pela classe `.dark`
// sem divergir na hidratação, e células um pouco menores para a densidade mira.

import type {
  ImageGenerationHandle,
  ImageGenerationPreset,
  ImageGenerationProps,
} from "img-fx";
import { ImageGeneration, PRESETS } from "img-fx";
import { forwardRef } from "react";
import { usePrefersReducedMotion, useWebGLSupport } from "../lib/use-fx-env";
import { type FxTheme, useFxTheme } from "../lib/use-fx-theme";

export type {
  CyclePhase,
  ImageGenerationCycleEvent,
  ImageGenerationHandle,
  ImageGenerationPreset,
  ImageGenerationProps,
  ImageGenerationTheme,
} from "img-fx";
export { ImageGeneration, setFrameRate, setMaxDpr } from "img-fx";

/** Tom da paleta. `primary` tinge para o amarelo da marca; `neutral` mantém o cinza do upstream. */
export type BlipsImgFxTone = "primary" | "neutral";

/** Hex do token `--card` da @blips/ui (`oklch(1 0 0)` / `oklch(0.205 0 0)`). */
export const BLIPS_IMG_FX_CARD_BG: Record<FxTheme, string> = {
  light: "#ffffff",
  dark: "#171717",
};

/**
 * Cor de destaque por tema. No escuro, #FCBA28; no claro, `--chart-4` (o amarelo
 * puro some contra o fundo branco), como no `BlipsThinkingOrb`.
 */
const ACCENT: Record<FxTheme, string> = {
  dark: "#fcba28",
  light: "#a65f00",
};

type Rgb = [number, number, number];

function toRgb(hex: string): Rgb {
  const h = hex.slice(1);
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16),
  ];
}

function toHex([r, g, b]: Rgb): string {
  return `#${[r, g, b]
    .map((c) =>
      Math.round(Math.min(255, Math.max(0, c)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/**
 * Re-tinge a paleta cinza de um preset mantendo a estrutura: cada slot vira uma
 * mistura entre o `--card` e o destaque, na mesma proporção em que o cinza
 * original se afastava do fundo do preset em direção ao contraste (claro no
 * escuro, escuro no claro). Slots que iam para o lado oposto seguem para preto
 * (escuro) ou branco (claro), sem cor.
 */
function tintPalette(preset: ImageGenerationPreset, theme: FxTheme): string[] {
  const mode = PRESETS[preset].modes[theme];
  const presetBg = toRgb(mode.cardBg)[0];
  const bg = toRgb(BLIPS_IMG_FX_CARD_BG[theme]);
  const accent = toRgb(ACCENT[theme]);
  const contrastEnd = theme === "dark" ? 255 : 0;
  const oppositeEnd: Rgb = theme === "dark" ? [0, 0, 0] : [255, 255, 255];

  return mode.colors.map((color) => {
    const gray = toRgb(color)[0];
    const towardContrast =
      theme === "dark" ? gray >= presetBg : gray <= presetBg;
    if (towardContrast) {
      const span = Math.abs(contrastEnd - presetBg) || 1;
      return toHex(mix(bg, accent, Math.abs(gray - presetBg) / span));
    }
    const span = Math.abs(255 - contrastEnd - presetBg) || 1;
    return toHex(mix(bg, oppositeEnd, Math.abs(gray - presetBg) / span));
  });
}

const PRESET_NAMES = Object.keys(PRESETS) as ImageGenerationPreset[];

/**
 * Paletas Blips (tom `primary`) por preset e tema, prontas para a prop `colors`
 * do `ImageGeneration` cru. Calculadas uma vez, a partir dos presets do upstream.
 */
export const BLIPS_IMG_FX_PALETTES = Object.fromEntries(
  PRESET_NAMES.map((name) => [
    name,
    { dark: tintPalette(name, "dark"), light: tintPalette(name, "light") },
  ])
) as Record<ImageGenerationPreset, Record<FxTheme, string[]>>;

/** Padrões Blips aplicados pelo `BlipsImageGeneration`; qualquer prop explícita vence. */
export const BLIPS_IMG_FX_DEFAULTS = {
  preset: "pixels-organic",
  // A mira é compacta: células 25% menores leem melhor em cartões pequenos.
  pixelScale: 0.75,
  // Um pouco abaixo do upstream (1) para não competir com o conteúdo ao redor.
  strength: 0.9,
} as const satisfies Partial<ImageGenerationProps>;

export interface BlipsImageGenerationProps extends ImageGenerationProps {
  /** Tom da paleta. Ignorado quando `colors` é passado. @default "primary" */
  tone?: BlipsImgFxTone;
}

/**
 * `ImageGeneration` com os padrões Blips. Aceita todas as props do original e
 * encaminha o `ref` (`ImageGenerationHandle`: `triggerReveal`, `triggerHide`,
 * `triggerRegenerate`, `isImageActive`, `element`).
 *
 * Sem `theme` (ou com `"auto"`), o tema segue a @blips/ui (`data-theme` ou
 * classe `.dark` no <html>) e é passado fixo ao original: no servidor e na
 * hidratação vale `light`, e o tema real entra logo depois, sem divergência.
 * `colors` e `cardBg` explícitos vencem `tone` e o `--card`.
 *
 * O efeito só monta no cliente e com WebGL disponível: o `ImageGeneration` do
 * upstream cria o renderer sem tratar a falta de contexto, e o erro derrubaria
 * a árvore inteira. Sem WebGL (e no servidor), fica um contêiner estático com a
 * primeira imagem. Com `prefers-reduced-motion`, nasce pausado (`paused` vence).
 */
export const BlipsImageGeneration = forwardRef<
  ImageGenerationHandle,
  BlipsImageGenerationProps
>(function BlipsImageGeneration(
  {
    tone = "primary",
    theme,
    preset = BLIPS_IMG_FX_DEFAULTS.preset,
    colors,
    cardBg,
    ...props
  },
  ref
) {
  const documentTheme = useFxTheme();
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const effective: FxTheme =
    theme === "dark" || theme === "light" ? theme : documentTheme;
  if (webgl !== true) {
    const first = Array.isArray(props.images) ? props.images[0] : props.images;
    return (
      <div
        className={props.className}
        data-slot="img-fx-fallback"
        style={{
          backgroundColor: cardBg ?? BLIPS_IMG_FX_CARD_BG[effective],
          overflow: "hidden",
          ...props.style,
        }}
      >
        {first ? (
          <img
            alt=""
            src={first}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
      </div>
    );
  }
  return (
    <ImageGeneration
      ref={ref}
      pixelScale={BLIPS_IMG_FX_DEFAULTS.pixelScale}
      strength={BLIPS_IMG_FX_DEFAULTS.strength}
      {...props}
      paused={props.paused ?? reducedMotion}
      preset={preset}
      theme={effective}
      cardBg={cardBg ?? BLIPS_IMG_FX_CARD_BG[effective]}
      colors={
        colors ??
        (tone === "primary"
          ? BLIPS_IMG_FX_PALETTES[preset][effective]
          : undefined)
      }
    />
  );
});
