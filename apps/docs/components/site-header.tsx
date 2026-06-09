"use client";

import { Button } from "@blips/ui/components/button";
import { SidebarTrigger } from "@blips/ui/components/sidebar";
import { cn } from "@blips/ui/lib/utils";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_ITEMS = [
  {
    label: "Componentes",
    href: "/docs/components/accordion",
    match: "/docs/components",
  },
  { label: "Skills", href: "/docs/skills", match: "/docs/skills" },
];

export function SiteHeader() {
  const { setOpenSearch } = useSearchContext();
  const pathname = usePathname();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 h-(--header-height) border-b backdrop-blur">
      <div className="flex h-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="lg:hidden" />
        <Link href="/" className="flex items-center" aria-label="Blips">
          <Image
            src="/blips-logo.png"
            alt="Blips"
            width={144}
            height={46}
            priority
            className="h-5 w-auto dark:hidden"
          />
          <Image
            src="/blips-logo-white.png"
            alt="Blips"
            width={144}
            height={46}
            priority
            className="hidden h-5 w-auto dark:block"
          />
        </Link>

        {/* slanted separator between the logo and the nav */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/15 hidden shrink-0 lg:block"
          aria-hidden="true"
        >
          <path d="M16.88 3.549L7.12 20.451" />
        </svg>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              asChild
              className="px-2.5"
            >
              <Link
                href={item.href}
                data-active={pathname.startsWith(item.match)}
                className={cn(
                  "text-foreground/70 transition-colors hover:text-foreground data-[active=true]:text-foreground data-[active=true]:font-medium"
                )}
              >
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenSearch(true)}
            className="text-muted-foreground w-full justify-start gap-2 sm:w-56"
          >
            <MagnifyingGlass className="size-4" />
            <span className="flex-1 text-left">Buscar...</span>
            <kbd className="bg-muted pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] sm:flex">
              ⌘K
            </kbd>
          </Button>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <a
              href="https://github.com/Blips-ativos/ui"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon className="size-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}
