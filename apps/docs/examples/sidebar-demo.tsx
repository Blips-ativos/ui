"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar";
import {
  CalendarBlankIcon,
  DotsThreeIcon,
  GearIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  TrayIcon,
} from "@phosphor-icons/react";

const items = [
  { title: "Início", url: "#inicio", icon: HouseIcon, isActive: true },
  { title: "Caixa de entrada", url: "#caixa", icon: TrayIcon, badge: "24" },
  { title: "Calendário", url: "#calendario", icon: CalendarBlankIcon },
  { title: "Buscar", url: "#buscar", icon: MagnifyingGlassIcon },
  { title: "Configurações", url: "#configuracoes", icon: GearIcon },
];

const projects = ["Residencial Aurora", "Loja Centro", "Galpão Norte"];

export default function SidebarDemo() {
  return (
    <SidebarProvider className="min-h-0 w-fit overflow-hidden rounded-xl ring-1 ring-foreground/10">
      <Sidebar collapsible="none" className="h-[420px]">
        <SidebarHeader>
          <SidebarInput placeholder="Pesquisar..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      render={
                        // biome-ignore lint/a11y/useAnchorContent: o texto do link vem dos filhos do SidebarMenuButton
                        <a href={item.url} />
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Projetos</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project}>
                    <SidebarMenuButton
                      render={
                        // biome-ignore lint/a11y/useAnchorContent: o texto do link vem dos filhos do SidebarMenuButton
                        <a href="#projeto" />
                      }
                    >
                      <span>{project}</span>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<SidebarMenuAction showOnHover />}
                      >
                        <DotsThreeIcon />
                        <span className="sr-only">Mais opções</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>Abrir</DropdownMenuItem>
                        <DropdownMenuItem>Renomear</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
