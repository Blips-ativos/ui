import { Logo } from "@blips/brand";
import { Button } from "@blips/ui/components/button";
import Link from "next/link";

import { Hero } from "@/components/landing/hero";
import { LandingNav } from "@/components/landing/landing-nav";
import { Marquee } from "@/components/landing/marquee";
import { ShowcaseGrid } from "@/components/landing/showcase-grid";

const FOOTER_LINKS = [
  { label: "Documentação", href: "/docs" },
  { label: "Componentes", href: "/docs/components/accordion" },
  { label: "Marca", href: "/docs/brand" },
  { label: "GitHub", href: "https://github.com/Blips-ativos/ui" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* scanlines analógicas — camada fixa sobre os tokens, decorativa */}
      <div
        className="landing-scanlines pointer-events-none fixed inset-0 z-0"
        aria-hidden
      />
      <div className="relative z-10">
        <LandingNav />
        <main>
          <Hero />
          <ShowcaseGrid />
          <Marquee />

          {/* fecho */}
          <section className="border-b border-border">
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
              <p className="max-w-2xl font-display font-semibold text-2xl text-foreground tracking-tight sm:text-3xl">
                Comece a construir com a Blips UI.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-none font-mono text-xs uppercase tracking-[0.18em]"
              >
                <Link href="/docs">Ler a documentação →</Link>
              </Button>
            </div>
          </section>
        </main>

        <footer className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <Logo variant="full" title="Blips UI" className="h-5" />
          <nav>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span className="font-mono text-[11px] text-muted-foreground/70 uppercase tracking-[0.18em] tabular-nums">
            v2.0.1 · © Blips
          </span>
        </footer>
      </div>
    </div>
  );
}
