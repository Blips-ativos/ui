"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@blips/ui/components/sidebar";
import type * as PageTree from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MenuItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname();
  const active = pathname === item.url;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <Link href={item.url}>{item.name}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function renderNodes(nodes: PageTree.Node[]) {
  return nodes.map((node) => {
    if (node.type === "page") {
      return <MenuItem key={node.url} item={node} />;
    }
    if (node.type === "separator") {
      return (
        <SidebarGroupLabel key={`sep-${String(node.name)}`} className="mt-2">
          {node.name}
        </SidebarGroupLabel>
      );
    }
    return null;
  });
}

export function DocsSidebar({ tree }: { tree: PageTree.Root }) {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]">
      <SidebarContent className="no-scrollbar px-2 py-4">
        {/* top-level pages (e.g. Introduction) */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderNodes(tree.children.filter((n) => n.type !== "folder"))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* folders become labelled groups */}
        {tree.children
          .filter((n): n is PageTree.Folder => n.type === "folder")
          .map((folder) => (
            <SidebarGroup key={`folder-${String(folder.name)}`}>
              <SidebarGroupLabel>{folder.name}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{renderNodes(folder.children)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
      </SidebarContent>
    </Sidebar>
  );
}
