import { Logo } from "@blips/brand";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { label: "Componentes", href: "/docs/components/accordion" },
  { label: "Skills", href: "/docs/skills" },
  { label: "Marca", href: "/docs/brand" },
];

export function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Blips UI" className="flex items-center">
          <Logo variant="full" title="Blips UI" className="h-6" />
        </Link>
        <nav className="flex items-center gap-4">
          <ul className="hidden items-center gap-6 sm:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em] transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
