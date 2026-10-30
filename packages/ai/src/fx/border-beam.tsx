"use client";

// Envolve border-beam (Jakubantalik/Libraries.dev, MIT). Padrões Blips: paleta `gold` (a mais
// próxima do amarelo da marca #FCBA28 / --primary) com variação de matiz curta para não sair do
// amarelo, tema resolvido pela classe `.dark` da @blips/ui e brilho contido para a densidade mira.

import type { BorderBeamProps } from "border-beam";
import { BorderBeam } from "border-beam";
import { forwardRef } from "react";
import { useFxTheme } from "../lib/use-fx-theme";

export type {
  BorderBeamColorVariant,
  BorderBeamProps,
  BorderBeamSize,
  BorderBeamTheme,
} from "border-beam";
export { BorderBeam };

/** Padrões Blips aplicados pelo `BlipsBorderBeam`; qualquer prop explícita vence. */
export const BLIPS_BORDER_BEAM_DEFAULTS = {
  size: "md",
  colorVariant: "gold",
  // ±12° em torno do dourado: anima sem derivar para laranja ou verde.
  hueRange: 12,
  // A mira é compacta; halo mais curto e um pouco menos intenso que o upstream (1 / 1).
  glowSize: 0.85,
  strength: 0.85,
} as const satisfies Partial<BorderBeamProps>;

export type BlipsBorderBeamProps = BorderBeamProps;

/**
 * `BorderBeam` com os padrões Blips. Aceita todas as props do original.
 * `theme` padrão segue o tema da @blips/ui (classe `.dark` no <html>), e não só
 * `prefers-color-scheme` como o `theme="auto"` do upstream.
 */
export const BlipsBorderBeam = forwardRef<HTMLDivElement, BlipsBorderBeamProps>(
  function BlipsBorderBeam({ theme, ...props }, ref) {
    const documentTheme = useFxTheme();
    return (
      <BorderBeam
        ref={ref}
        {...BLIPS_BORDER_BEAM_DEFAULTS}
        theme={theme ?? documentTheme}
        {...props}
      />
    );
  }
);
