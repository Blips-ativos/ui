import { SidebarProvider } from "@blips/ui/components/sidebar";
import type { CSSProperties, ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteHeader } from "@/components/site-header";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      className="flex-col"
      style={
        {
          "--header-height": "3.5rem",
          "--sidebar-width": "18rem",
        } as CSSProperties
      }
    >
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 px-4 lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:px-8">
        <DocsSidebar tree={source.pageTree} />
        <div className="min-w-0">{children}</div>
      </div>
    </SidebarProvider>
  );
}
