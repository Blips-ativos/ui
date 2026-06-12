import { Logo } from "@blips/brand";
import Link from "next/link";

import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { SiteHeader } from "@/components/site-header";

const FOOTER_LINKS = [
  { label: "Documentação", href: "/docs" },
  { label: "Componentes", href: "/docs/components/accordion" },
  { label: "Marca", href: "/docs/brand" },
  { label: "GitHub", href: "https://github.com/Blips-ativos/ui" },
];

export default function HomePage() {
  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-background text-foreground">
      {/* scanlines analógicas — camada fixa sobre os tokens, decorativa */}
      <div
        className="landing-scanlines pointer-events-none fixed inset-0 z-0"
        aria-hidden
      />
      <SiteHeader hasSidebar={false} />
      <main className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Hero />
        <Marquee />
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl shrink-0 flex-col items-start justify-between gap-6 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
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
        <span className="font-mono text-[11px] text-muted-foreground/70 uppercase tracking-[0.18em]">
          © Blips
        </span>
      </footer>
    </div>
  );
}
