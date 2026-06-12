import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { BLIPS_YELLOW } from "./colors";
import { cn } from "./lib/utils";
import {
  LOGO_CIRCLE_PATH,
  LOGO_MARK_PATH,
  LOGO_VIEWBOX,
  LOGO_WORDMARK_PATH,
  MARK_CIRCLE_GEOMETRY,
  MARK_CIRCLE_VIEWBOX,
  MARK_PATH,
  MARK_VIEWBOX,
} from "./logo-paths";

const logoVariants = cva("inline-block shrink-0 select-none", {
  variants: {
    variant: {
      // b-mark isolado e wordmark herdam a cor do texto (currentColor)
      mark: "h-6 w-auto",
      "mark-circle": "size-6",
      full: "h-6 w-auto",
    },
  },
  defaultVariants: {
    variant: "full",
  },
});

type LogoVariant = "mark" | "mark-circle" | "full";

type LogoProps = Omit<React.ComponentProps<"svg">, "children"> &
  VariantProps<typeof logoVariants> & {
    /**
     * Texto acessível do logo. Para uso decorativo (quando há texto ao lado),
     * passe `aria-hidden`.
     */
    title?: string;
  };

/**
 * Logo da Blips em SVG inline (vetorial, escalável e recolorível).
 *
 * - `mark`: apenas o b-mark, herda a cor via `currentColor` (use
 *   `className="text-primary"` para o amarelo da marca).
 * - `mark-circle`: b-mark branco dentro do círculo amarelo (app-icon).
 * - `full` (padrão): logo completo "blips" — círculo + b brancos fixos e o
 *   wordmark em `currentColor`, então o texto adapta a light/dark sozinho.
 */
function Logo({
  className,
  variant = "full",
  title = "Blips",
  ...props
}: LogoProps) {
  const v = (variant ?? "full") as LogoVariant;

  if (v === "mark") {
    return (
      <svg
        data-slot="logo"
        data-variant="mark"
        viewBox={MARK_VIEWBOX}
        fill="currentColor"
        role="img"
        aria-label={title}
        className={cn(logoVariants({ variant: "mark" }), className)}
        {...props}
      >
        <path fillRule="evenodd" d={MARK_PATH} />
      </svg>
    );
  }

  if (v === "mark-circle") {
    return (
      <svg
        data-slot="logo"
        data-variant="mark-circle"
        viewBox={MARK_CIRCLE_VIEWBOX}
        role="img"
        aria-label={title}
        className={cn(logoVariants({ variant: "mark-circle" }), className)}
        {...props}
      >
        <circle
          cx={MARK_CIRCLE_GEOMETRY.cx}
          cy={MARK_CIRCLE_GEOMETRY.cy}
          r={MARK_CIRCLE_GEOMETRY.r}
          fill={BLIPS_YELLOW}
        />
        <path
          transform={MARK_CIRCLE_GEOMETRY.transform}
          fill="#ffffff"
          fillRule="evenodd"
          d={MARK_PATH}
        />
      </svg>
    );
  }

  return (
    <svg
      data-slot="logo"
      data-variant="full"
      viewBox={LOGO_VIEWBOX}
      fill="none"
      role="img"
      aria-label={title}
      className={cn(logoVariants({ variant: "full" }), className)}
      {...props}
    >
      <path fill={BLIPS_YELLOW} fillRule="evenodd" d={LOGO_CIRCLE_PATH} />
      <path fill="#ffffff" fillRule="evenodd" d={LOGO_MARK_PATH} />
      <path fill="currentColor" fillRule="evenodd" d={LOGO_WORDMARK_PATH} />
    </svg>
  );
}

export { Logo, logoVariants };
export type { LogoProps, LogoVariant };
