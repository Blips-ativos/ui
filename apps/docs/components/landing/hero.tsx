"use client";

import { Logo } from "@blips/brand";
import { Button } from "@blips/ui/components/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden">
      <div className="pointer-events-none relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 px-4 py-12 sm:px-6 md:grid-cols-2">
        {/* shadcn/typeset: o texto da hero é estilizado pelo container, sem
            classes de tipografia; nos elementos só ficam as animações. */}
        <div className="typeset typeset-docs pointer-events-auto max-w-[37em]">
          {/* strike amarelo: o único acento do hero, além do CTA */}
          <span
            className="landing-reveal block h-1 w-12 bg-primary"
            style={{ animationDelay: "0ms" }}
            aria-hidden
          />
          <p className="landing-reveal" style={{ animationDelay: "40ms" }}>
            Design System
          </p>
          <h1 className="landing-stamp" style={{ animationDelay: "80ms" }}>
            Blips UI
          </h1>
          <p className="landing-reveal" style={{ animationDelay: "260ms" }}>
            Base UI · Tailwind v4 · Acessível
          </p>
          {/* Botões são da lib (data-slot) e ficam fora do typeset; a linha
              só herda o ritmo vertical do container (--typeset-flow). */}
          <div
            className="landing-reveal mt-[var(--typeset-flow)] flex flex-wrap gap-2"
            style={{ animationDelay: "360ms" }}
          >
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/docs" />}
            >
              Explorar componentes
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/docs/skills" />}
            >
              Ver skills
            </Button>
          </div>
        </div>
      </div>

      {/* Símbolo invisível no lugar e no tamanho do b-mark da hero da v2: a cena
          o lê via [data-triangle-container] e desenha o "b" de vidro sobre o
          traço dele. Em telas pequenas a cena centraliza o "b" no canvas. */}
      <Logo
        variant="mark"
        data-triangle-container
        aria-hidden
        className="pointer-events-none invisible absolute top-1/2 -right-[8%] hidden h-[150%] w-auto -translate-y-1/2 md:block"
      />
    </section>
  );
}
