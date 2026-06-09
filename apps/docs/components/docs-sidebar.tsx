"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@blips/ui/components/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@blips/ui/components/sidebar";
import type * as PageTree from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const ITEM_CLASS =
  "relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent";

const LABEL_CLASS = "text-muted-foreground font-medium";

function NavItem({
  name,
  url,
  pathname,
}: {
  name: ReactNode;
  url: string;
  pathname: string;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={url === pathname}
        className={ITEM_CLASS}
      >
        <Link href={url}>
          <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function DocsNav({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname();
  const pages = tree.children.filter(
    (n): n is PageTree.Item => n.type === "page"
  );
  const folders = tree.children.filter(
    (n): n is PageTree.Folder => n.type === "folder"
  );

  return (
    <>
      {pages.length > 0 && (
        <SidebarGroup className="pt-6">
          <SidebarGroupLabel className={LABEL_CLASS}>Começar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {pages.map((p) => (
                <NavItem
                  key={p.url}
                  name={p.name}
                  url={p.url}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {folders.map((folder) => (
        <SidebarGroup key={String(folder.name)}>
          <SidebarGroupLabel className={LABEL_CLASS}>
            {folder.name}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {folder.children
                .filter((n): n is PageTree.Item => n.type === "page")
                .map((p) => (
                  <NavItem
                    key={p.url}
                    name={p.name}
                    url={p.url}
                    pathname={pathname}
                  />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

export function DocsSidebar({ tree }: { tree: PageTree.Root }) {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <>
      {/* Desktop: sticky static sidebar with top/bottom gradient fades */}
      <Sidebar
        collapsible="none"
        className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-var(--header-height)-1.5rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      >
        <div className="h-9" />
        <div className="from-background via-background/80 to-background/50 absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b blur-xs" />
        <SidebarContent className="no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2.5">
          <DocsNav tree={tree} />
          <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
        </SidebarContent>
      </Sidebar>

      {/* Mobile: the same nav inside a sheet, driven by the header trigger */}
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className="w-72 p-0 [--sidebar-menu-width:100%]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navegação</SheetTitle>
            <SheetDescription>Menu da documentação</SheetDescription>
          </SheetHeader>
          <div className="no-scrollbar overflow-y-auto px-2.5 pb-8">
            <DocsNav tree={tree} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
