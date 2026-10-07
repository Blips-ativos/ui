"use client";

// Envolve metal-fx (Jakubantalik/Libraries.dev, MIT). Padrões Blips: preset `gold` com a tinta do
// shader trocada pelo amarelo da marca (#FCBA28 / --primary), tema resolvido pela classe `.dark` da
// @blips/ui e intensidade um pouco contida para a densidade mira. O metal-fx embute o `liquidMetal`
// da Paper Shaders (Apache-2.0, ver o NOTICE do pacote). O preset do metal-fx é global (um único
// contexto WebGL para a página toda), por isso a tinta da marca é aplicada em efeito, com contagem
// de instâncias, e só quando há WebGL2; nada de `window` no render.

import type {
  MetalFxPreset,
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
  setSharedPreset,
  setSharedPresetMode,
} from "metal-fx";
import {
  type ComponentProps,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { usePrefersReducedMotion } from "../lib/use-fx-env";
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
// para a página; a última a desmontar devolve o controle ao `preset`/`theme`
// dos componentes crus. O upstream não repinta na hora os crus que seguem
// montados: eles voltam ao próprio preset quando o `preset`/`theme` deles muda
// (ou ao remontar); os montados depois já nascem com o preset do upstream.
let brandTintUsers = 0;

/**
 * Aplica (e mantém atualizado) o preset Blips no renderizador compartilhado.
 * Roda depois dos efeitos do `MetalFx` filho, então vence o `preset` dele.
 * `fallback` é o `preset` que o `MetalFx` filho passa ao upstream: é o que volta
 * quando `brandTint` vira `false` com o componente montado.
 */
function useBrandTint(
  enabled: boolean,
  theme: MetalFxTheme,
  fallback: MetalFxPreset
) {
  const documentTheme = useFxTheme();
  const effective: PresetTheme = theme === "auto" ? documentTheme : theme;
  const restore = useRef({ fallback, effective, unmounting: false });
  restore.current.fallback = fallback;
  restore.current.effective = effective;

  // Declarado antes do efeito da contagem: na desmontagem as limpezas rodam na
  // ordem de declaração, então a de baixo já sabe que não é só um toggle.
  useLayoutEffect(() => {
    const state = restore.current;
    state.unmounting = false;
    return () => {
      state.unmounting = true;
    };
  }, []);

  // Layout effect de propósito: na desmontagem o React roda a limpeza de layout
  // do pai antes da dos filhos, e é na limpeza de layout do `MetalFx` filho que
  // o renderizador compartilhado é destruído. Com `useEffect`, a limpeza abaixo
  // rodaria com o contexto já liberado, o `setSharedPresetMode(null)` seria
  // pulado e o override da marca ficaria preso no módulo do metal-fx: todo
  // `MetalFx` montado depois (cru ou com `brandTint={false}`) sairia amarelo.
  useLayoutEffect(() => {
    if (!enabled) return;
    if (!isMetalFxSupported()) return;
    brandTintUsers += 1;
    return () => {
      brandTintUsers -= 1;
      // `getSharedPreset()` é null quando o contexto WebGL já foi liberado;
      // chamar `setSharedPresetMode` aí criaria outro contexto à toa.
      if (brandTintUsers === 0 && getSharedPreset() !== null) {
        setSharedPresetMode(null);
        // `setSharedPresetMode(null)` só solta o override; o renderizador segue
        // desenhando com a tinta até alguém chamar `setSharedPreset`. Num toggle
        // `brandTint` → `false` o efeito do `MetalFx` filho não roda de novo
        // (o `preset`/`theme` dele não mudou), então o preset dele volta aqui.
        const { fallback: name, effective: mode, unmounting } = restore.current;
        if (!unmounting) setSharedPreset(name, mode);
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
    const documentTheme = useBrandTint(
      brandTint,
      theme ?? "auto",
      props.preset ?? BLIPS_METAL_FX_DEFAULTS.preset
    );
    // Com prefers-reduced-motion o shader nasce pausado; `paused` explícito vence.
    const reducedMotion = usePrefersReducedMotion();
    return (
      <MetalFx
        ref={ref}
        {...BLIPS_METAL_FX_DEFAULTS}
        theme={theme ?? documentTheme}
        {...props}
        paused={props.paused ?? reducedMotion}
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
  // O `MetalText` do upstream fixa `preset: "chromatic"` no `MetalFx` interno.
  const documentTheme = useBrandTint(brandTint, theme ?? "auto", "chromatic");
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
  // O `MetalBadge` do upstream fixa `preset: "chromatic"` no `MetalFx` interno.
  const documentTheme = useBrandTint(brandTint, theme ?? "auto", "chromatic");
  return (
    <MetalBadge theme={theme ?? documentTheme} {...props}>
      {children}
    </MetalBadge>
  );
}
