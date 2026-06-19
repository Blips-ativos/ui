"use client";

import {
  MARK_INNER_STROKE_PATH,
  MARK_PATH,
  MARK_STROKE_PATH,
  MARK_VIEWBOX,
} from "@blips/brand";

// As linhas-guia (espinhas) que dirigem o draw-on, visíveis sobre a marca
// esmaecida: amarelo = traço do "b" (MARK_STROKE_PATH), escuro = círculo
// interno (MARK_INNER_STROKE_PATH). Em produção elas são a máscara, não pixels.
export default function LogoStrokeGuides() {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      role="img"
      aria-label="Linhas-guia do b-mark"
      className="size-40"
    >
      <path
        d={MARK_PATH}
        fillRule="evenodd"
        className="fill-muted-foreground/15"
      />
      <path
        d={MARK_STROKE_PATH}
        fill="none"
        className="stroke-primary"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={MARK_INNER_STROKE_PATH}
        fill="none"
        className="stroke-foreground"
        strokeWidth={9}
        strokeLinecap="round"
      />
    </svg>
  );
}
