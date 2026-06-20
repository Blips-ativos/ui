"use client";

import {
  MARK_INNER_STROKE_PATH,
  MARK_INNER_STROKE_WIDTH,
  MARK_PATH,
  MARK_STROKE_PATH,
  MARK_STROKE_WIDTH,
  MARK_VIEWBOX,
} from "@blips/brand";

// Os traços (linhas-guia abertas) são a MÁSCARA: animados com trim-path
// (stroke-dashoffset, com pathLength={1}) sobre a marca real preenchida. O b e o
// círculo interno traçam JUNTOS (mesma janela 0→30%); na saída o círculo interno
// some primeiro (ordem inversa). No fim, 100% idêntico.
const css = `
  .blips-drawon-b,
  .blips-drawon-inner { stroke-dasharray: 1; stroke-dashoffset: 1; }
  .blips-drawon-b { animation: blips-draw-b 4.5s cubic-bezier(0.33, 1, 0.68, 1) infinite; }
  .blips-drawon-inner { animation: blips-draw-inner 4.5s cubic-bezier(0.33, 1, 0.68, 1) infinite; }

  /* entra desenhando do começo (dashoffset 1→0) → segura → SAI apagando também
     a partir do começo (dashoffset 0→-1: a borda inicial avança e "come" o
     traço). O círculo interno sai primeiro (ordem inversa). */

  @keyframes blips-draw-b {
    0% { stroke-dashoffset: 1; }
    30%, 50% { stroke-dashoffset: 0; }
    96%, 100% { stroke-dashoffset: -1; }
  }
    
  @keyframes blips-draw-inner {
    0%, 7% { stroke-dashoffset: 1; }
    30%, 57% { stroke-dashoffset: 0; }
    96%, 100% { stroke-dashoffset: -1; }
  }
    
  @media (prefers-reduced-motion: reduce) {
    .blips-drawon-b, .blips-drawon-inner { animation: none; stroke-dashoffset: 0; }
  }
`;

export default function LogoDrawOn() {
  return (
    <div className="text-primary">
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: keyframes estáticos do exemplo */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg
        viewBox={MARK_VIEWBOX}
        fill="currentColor"
        role="img"
        aria-label="b-mark da Blips se desenhando"
        className="size-40"
      >
        <mask id="blips-draw-on" maskUnits="userSpaceOnUse">
          <path
            className="blips-drawon-b"
            d={MARK_STROKE_PATH}
            fill="none"
            stroke="#fff"
            strokeWidth={MARK_STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
          <path
            className="blips-drawon-inner"
            d={MARK_INNER_STROKE_PATH}
            fill="none"
            stroke="#fff"
            strokeWidth={MARK_INNER_STROKE_WIDTH}
            strokeLinecap="round"
            pathLength={1}
          />
        </mask>
        <path d={MARK_PATH} fillRule="evenodd" mask="url(#blips-draw-on)" />
      </svg>
    </div>
  );
}
