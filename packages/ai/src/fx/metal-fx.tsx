"use client";

// Envolve metal-fx (Jakubantalik/Libraries.dev, MIT). Padrões Blips: preset `gold` com a tinta do
// shader trocada pelo amarelo da marca (#FCBA28 / --primary), tema resolvido pela classe `.dark` da
// @blips/ui e intensidade um pouco contida para a densidade mira. O metal-fx embute o `liquidMetal`
// da Paper Shaders (Apache-2.0, ver o NOTICE do pacote). O preset do metal-fx é global (um único
// contexto WebGL para a página toda), por isso a tinta da marca é aplicada em efeito, com contagem
// de instâncias, e só quando há WebGL2; nada de `window` no render.

import type {
  MetalFxProps,
  MetalFxTheme,
  PresetMode,
  PresetTheme,
} from "metal-fx";
import {
  getSharedPreset,
  isMetalFxSupported,
  MetalBadge,
  MetalFx,
  MetalText,
  PRESETS,
  setSharedPresetMode,
} from "metal-fx";
import { type ComponentProps, forwardRef, useEffect } from "react";
import { useFxTheme } from "../lib/use-fx-theme";

export type {
  MetalBadgeCore,
  MetalFxPreset,
  MetalFxProps,
  MetalFxReflectionTarget,
  MetalFxTheme,
  MetalFxVariant,
  PresetMode,
  PresetName,
  PresetTheme,
  TextInnerShadow,
} from "metal-fx";
export {
  isMetalFxSupported,
  METAL_BADGE_DEFAULTS,
  METAL_TEXT_DEFAULTS,
  MetalBadge,
  MetalFx,
  MetalText,
  PRESETS,
  useMetalBend,
  useMetalTextReflection,
} from "metal-fx";

/**
 * Modos do preset Blips: o `gold` do upstream com a tinta (color-burn) no
 * #FCBA28. O alfa da tinta é a força da mistura, não opacidade; no claro fica
 * mais fraca para o metal não escurecer contra o fundo branco.
 */
export const BLIPS_METAL_PRESET: Record<PresetTheme, PresetMode> = {
  dark: { ...PRESETS.gold.modes.dark, colorTint: "#fcba28cc" },
  light: { ...PRESETS.gold.modes.light, colorTint: "#fcba2899" },
};

/** Padrões Blips aplicados pelo `BlipsMetalFx`; qualquer prop explícita vence. */
export const BLIPS_METAL_FX_DEFAULTS = {
  variant: "button",
  // Fallback quando `brandTint={false}`: o preset do upstream mais perto da marca.
  preset: "gold",
  // A mira é compacta; anel um pouco menos intenso que o upstream (1).
  strength: 0.9,
} as const satisfies Partial<MetalFxProps>;

// Instâncias com a tinta da marca montadas agora. O preset do metal-fx é um só
// para a página; a última a desmontar devolve o preset aos componentes crus.
let brandTintUsers = 0;

/**
 * Aplica (e mantém atualizado) o preset Blips no renderizador compartilhado.
 * Roda depois dos efeitos do `MetalFx` filho, então vence o `preset` dele.
 */
function useBrandTint(enabled: boolean, theme: MetalFxTheme) {
  const documentTheme = useFxTheme();
  const effective: PresetTheme = theme === "auto" ? documentTheme : theme;

  useEffect(() => {
    if (!enabled) return;
    if (!isMetalFxSupported()) return;
    brandTintUsers += 1;
    return () => {
      brandTintUsers -= 1;
      // `getSharedPreset()` é null quando o contexto WebGL já foi liberado;
      // chamar `setSharedPresetMode` aí criaria outro contexto à toa.
      if (brandTintUsers === 0 && getSharedPreset() !== null) {
        setSharedPresetMode(null);
      }
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    if (!isMetalFxSupported()) return;
    setSharedPresetMode(BLIPS_METAL_PRESET[effective]);
  }, [enabled, effective]);

  return documentTheme;
}

interface BlipsMetalTintProps {
  /**
   * Pinta o metal com o amarelo da marca (#FCBA28). O preset do metal-fx é
   * global: com uma instância Blips montada, todo `MetalFx` da página usa a
   * tinta da marca. `false` volta ao `preset` do upstream.
   * @default true
   */
  brandTint?: boolean;
}

export interface BlipsMetalFxProps extends MetalFxProps, BlipsMetalTintProps {}

/**
 * `MetalFx` com os padrões Blips. Aceita todas as props do original.
 * `theme` padrão segue o tema da @blips/ui (classe `.dark` no <html>), e não só
 * `prefers-color-scheme` como o `theme="auto"` do upstream.
 */
export const BlipsMetalFx = forwardRef<HTMLDivElement, BlipsMetalFxProps>(
  function BlipsMetalFx({ brandTint = true, theme, ...props }, ref) {
    const documentTheme = useBrandTint(brandTint, theme ?? "auto");
    return (
      <MetalFx
        ref={ref}
        {...BLIPS_METAL_FX_DEFAULTS}
        theme={theme ?? documentTheme}
        {...props}
      />
    );
  }
);

type MetalTextProps = ComponentProps<typeof MetalText>;

export interface BlipsMetalTextProps
  extends Omit<MetalTextProps, "font" | "color">,
    BlipsMetalTintProps {
  /**
   * Shorthand CSS `font` do texto.
   * @default "600 24px/1.2 var(--font-sans, Inter), sans-serif"
   */
  font?: string;
  /**
   * Cor base das letras; o metal compõe por cima.
   * @default "var(--foreground)"
   */
  color?: string;
}

/** Padrões Blips aplicados pelo `BlipsMetalText`; qualquer prop explícita vence. */
export const BLIPS_METAL_TEXT_DEFAULTS = {
  font: "600 24px/1.2 var(--font-sans, Inter), sans-serif",
  color: "var(--foreground)",
} as const satisfies Partial<MetalTextProps>;

/**
 * `MetalText` com os padrões Blips: fonte e cor dos tokens da @blips/ui
 * (opcionais aqui, obrigatórias no original), tema do documento e tinta da marca.
 */
export function BlipsMetalText({
  brandTint = true,
  theme,
  font = BLIPS_METAL_TEXT_DEFAULTS.font,
  color = BLIPS_METAL_TEXT_DEFAULTS.color,
  ...props
}: BlipsMetalTextProps) {
  const documentTheme = useBrandTint(brandTint, theme ?? "auto");
  return (
    <MetalText
      color={color}
      font={font}
      theme={theme ?? documentTheme}
      {...props}
    />
  );
}

export interface BlipsMetalBadgeProps
  extends ComponentProps<typeof MetalBadge>,
    BlipsMetalTintProps {}

/**
 * `MetalBadge` (a pílula "Novo") com tema do documento e tinta da marca.
 * O rótulo padrão do upstream é "New"; aqui é "Novo".
 */
export function BlipsMetalBadge({
  brandTint = true,
  theme,
  children = "Novo",
  ...props
}: BlipsMetalBadgeProps) {
  const documentTheme = useBrandTint(brandTint, theme ?? "auto");
  return (
    <MetalBadge theme={theme ?? documentTheme} {...props}>
      {children}
    </MetalBadge>
  );
}
