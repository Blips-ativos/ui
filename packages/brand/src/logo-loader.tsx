"use client";

import { type CSSProperties, useId } from "react";

import { cn } from "./lib/utils";
import { MARK_PATH, MARK_VIEWBOX } from "./logo-paths";
import {
  MARK_INNER_STROKE_PATH,
  MARK_INNER_STROKE_WIDTH,
  MARK_STROKE_PATH,
  MARK_STROKE_WIDTH,
} from "./mark-stroke";

// Linha-guia do "b" estendida nas pontas (topo da haste e fim do espiral) pra o
// cap reto (butt) cobrir as terminações arredondadas no 100%. Excesso recortado
// pelo MARK_PATH.
const B_STROKE = `${MARK_STROKE_PATH.replace(/^M /, "M 126 35 L ")} L 320 560`;

type LogoLoaderProps = Omit<React.ComponentProps<"svg">, "children"> & {
  /**
   * Progresso de 0 a 100. **Omitido** → indeterminado (loop "draw in/out").
   * **Definido** → determinado: o "b" e o anel preenchem proporcional ao valor,
   * sem loop (transição suave quando o valor muda).
   */
  progress?: number;
  /** Marca cheia e estática em `muted` — estado inativo. */
  disabled?: boolean;
  /**
   * Classe do "sulco"/track (a marca recessada de fundo). Por padrão o track usa
   * `fill: var(--muted, …)` com fallback neutro (token cru — resolve mesmo sem o
   * consumidor varrer `@blips/brand` no `@source`; o fallback evita o preto se o
   * tema não definir `--muted`). Passe, ex., `fill-foreground/10` para customizar
   * — a classe vem do código do consumidor, então é escaneada.
   */
  trackClassName?: string;
};

/**
 * Loader do b-mark: a marca se preenche (e drena) como uma _progress bar_ dentro
 * de um sulco recessado (_inner shadow_ que segue o contorno).
 *
 * - **Indeterminado** (sem `progress`): preenche e drena em loop.
 * - **Determinado** (`progress` 0–100): preenche proporcional ao valor.
 * - **`disabled`**: marca cheia e estática em `muted`.
 *
 * Preenchimento via `text-*` (padrão `text-primary`), tamanho via `className`
 * (padrão `size-12`). O track usa `var(--muted)` por padrão — customize com
 * `trackClassName`. Respeita `prefers-reduced-motion`.
 */
function LogoLoader({
  progress,
  disabled,
  className,
  trackClassName,
  "aria-label": ariaLabel,
  ...props
}: LogoLoaderProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const grooveId = `blips-groove-${uid}`;
  const maskId = `blips-mask-${uid}`;
  const bId = `${maskId}-b`;
  const iId = `${maskId}-i`;

  const determinate = progress != null;
  const value = determinate ? Math.max(0, Math.min(100, progress)) : 0;
  const offset = 1 - value / 100;
  const animated = !disabled && !determinate;

  const label = ariaLabel ?? (disabled ? "Blips" : "Carregando");
  const state = disabled ? "disabled" : determinate ? "determinate" : "loading";
  const ariaProps = disabled
    ? { role: "img" as const }
    : determinate
      ? {
          role: "progressbar" as const,
          "aria-valuenow": value,
          "aria-valuemin": 0,
          "aria-valuemax": 100,
        }
      : { role: "status" as const };

  // keyframes (só no modo indeterminado) — nomes/ids únicos por instância
  const css = animated
    ? `
@keyframes ${bId}{0%{stroke-dashoffset:1;animation-timing-function:cubic-bezier(.25,1,.5,1)}26%{stroke-dashoffset:0}62%{stroke-dashoffset:0;animation-timing-function:cubic-bezier(.4,0,1,1)}80%,100%{stroke-dashoffset:-1}}
@keyframes ${iId}{0%{stroke-dashoffset:1}14%{stroke-dashoffset:1;animation-timing-function:cubic-bezier(.25,1,.5,1)}36%{stroke-dashoffset:0}52%{stroke-dashoffset:0;animation-timing-function:cubic-bezier(.4,0,1,1)}66%,100%{stroke-dashoffset:-1}}
#${bId}{animation:${bId} 3.2s linear infinite}
#${iId}{animation:${iId} 3.2s linear infinite}
@media (prefers-reduced-motion:reduce){#${bId},#${iId}{animation:none;stroke-dashoffset:0}}`
    : null;

  // no determinado, o offset vem inline (com transição suave)
  const strokeStyle: CSSProperties | undefined = determinate
    ? {
        strokeDashoffset: offset,
        transition: "stroke-dashoffset .4s cubic-bezier(.25,1,.5,1)",
      }
    : undefined;

  return (
    <svg
      data-slot="logo-loader"
      data-state={state}
      viewBox={MARK_VIEWBOX}
      aria-label={label}
      className={cn(
        "inline-block size-12 shrink-0 select-none text-primary",
        className
      )}
      {...ariaProps}
      {...props}
    >
      <title>{label}</title>
      {css ? <style>{css}</style> : null}
      <defs>
        <filter id={grooveId} x="-20%" y="-20%" width="140%" height="140%">
          <feComponentTransfer in="SourceAlpha" result="inv">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur in="inv" stdDeviation={14} />
          <feOffset dx={0} dy={9} result="ofs" />
          <feFlood floodColor="#5b6470" floodOpacity={0.15} />
          <feComposite in2="ofs" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" result="sh" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="sh" />
          </feMerge>
        </filter>
        {!disabled ? (
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <path
              id={bId}
              d={B_STROKE}
              fill="none"
              stroke="#fff"
              strokeWidth={MARK_STROKE_WIDTH}
              strokeLinecap="butt"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={determinate ? undefined : 1}
              style={strokeStyle}
            />
            <path
              id={iId}
              d={MARK_INNER_STROKE_PATH}
              fill="none"
              stroke="#fff"
              strokeWidth={MARK_INNER_STROKE_WIDTH}
              strokeLinecap="butt"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={determinate ? undefined : 1}
              style={strokeStyle}
            />
          </mask>
        ) : null}
      </defs>
      {/* sulco recessado (no disabled, é a marca cheia estática). O fill vem do
          token cru var(--muted) com fallback neutro — robusto sem o consumidor
          varrer @blips/brand (a classe fill-muted não seria gerada lá → preto),
          e o fallback cobre consumidores sem o tema (sem --muted). */}
      <path
        d={MARK_PATH}
        fillRule="evenodd"
        className={trackClassName}
        style={
          trackClassName ? undefined : { fill: "var(--muted, oklch(0.92 0 0))" }
        }
        filter={`url(#${grooveId})`}
      />
      {/* preenchimento revelado pela máscara (oculto no disabled) */}
      {!disabled ? (
        <path
          d={MARK_PATH}
          fillRule="evenodd"
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
      ) : null}
    </svg>
  );
}

export { LogoLoader };
export type { LogoLoaderProps };
