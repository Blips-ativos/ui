import { Logo } from "@blips/brand";
import { Button } from "@blips/ui/components/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden border-b border-border">
      {/* b-mark estrutural sangrando a borda — motivo neutro, baixa presença */}
      <Logo
        variant="mark"
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-[8%] hidden h-[150%] w-auto -translate-y-1/2 text-foreground/[0.05] md:block"
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div
          className="landing-reveal flex items-center gap-3"
          style={{ animationDelay: "0ms" }}
        >
          {/* strike amarelo: o único acento do hero, além do CTA */}
          <span className="h-1 w-12 bg-primary" aria-hidden />
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.28em]">
            Design System
          </p>
        </div>

        <h1
          className="landing-stamp mt-6 font-display font-bold text-foreground text-[clamp(3.5rem,11vw,11rem)] uppercase leading-[0.9] tracking-tighter"
          style={{ animationDelay: "80ms" }}
        >
          Blips UI
        </h1>

        <p
          className="landing-reveal mt-6 max-w-xl font-mono text-muted-foreground text-xs uppercase tracking-[0.18em] sm:text-sm"
          style={{ animationDelay: "260ms" }}
        >
          Radix · Tailwind v4 · Acessível · 54 componentes
        </p>

        <div
          className="landing-reveal mt-10"
          style={{ animationDelay: "360ms" }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-none font-mono text-xs uppercase tracking-[0.18em]"
          >
            <Link href="/docs">Explorar componentes →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
