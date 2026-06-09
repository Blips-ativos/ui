import { SidebarInset, SidebarProvider } from "@blips/ui/components/sidebar";
import type { CSSProperties, ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteHeader } from "@/components/site-header";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--header-height": "3.5rem",
          "--sidebar-width": "16rem",
        } as CSSProperties
      }
    >
      <DocsSidebar tree={source.pageTree} />
      <SidebarInset>
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
