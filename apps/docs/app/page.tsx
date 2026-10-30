import { Logo } from "@blips/brand";
import Link from "next/link";

import { HomeBlocks } from "@/components/landing/blocks";
import { Hero } from "@/components/landing/hero";
import { HomeBackground } from "@/components/landing/home-background";
import { SiteHeader } from "@/components/site-header";

const FOOTER_LINKS = [
  { label: "Documentação", href: "/docs" },
  { label: "Componentes", href: "/docs/components/accordion" },
  { label: "Marca", href: "/docs/brand" },
  { label: "GitHub", href: "https://github.com/Blips-ativos/ui" },
];

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Transparente sobre a hero; ganha fundo ao rolar para o conteúdo. */}
      <SiteHeader hasSidebar={false} transparent />

      <main>
        {/* Primeira tela: a cena do "b" (vidro líquido + canelado) cobre a tela
          inteira, atrás do header transparente. A hero ocupa os primeiros 80%;
          nos 20% de baixo a seção de componentes já sobe por cima da cena. */}
        <div
          data-hero-theme
          className="relative -mt-(--header-height) flex min-h-[100dvh] flex-col overflow-hidden pt-(--header-height)"
        >
          <HomeBackground />
          {/* scanlines analógicas — decorativas, só sobre a cena */}
          <div
            className="landing-scanlines pointer-events-none absolute inset-0 z-0"
            aria-hidden
          />
          <div className="relative z-10 flex min-h-[calc(80dvh-var(--header-height))] flex-col">
            <Hero />
          </div>
          {/* Faixa da cena por baixo do começo da seção de componentes. */}
          <div aria-hidden className="h-[20dvh] shrink-0" />
        </div>

        {/* Sobe 20dvh por cima da cena: fade para o fundo sólido. */}
        <HomeBlocks />
      </main>

      <footer className="border-t">
        <div className="flex w-full flex-col items-start justify-between gap-6 px-6 py-6 sm:flex-row sm:items-center sm:px-10">
          <Logo variant="full" title="Blips UI" className="h-5" />
          <nav>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span className="text-xs text-muted-foreground/70">© Blips</span>
        </div>
      </footer>
    </div>
  );
}
