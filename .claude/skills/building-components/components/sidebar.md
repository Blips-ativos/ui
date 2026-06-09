# Sidebar

**Categoria:** Behavioral | **Deps:** `@radix-ui/react-slot`, `class-variance-authority`, `@phosphor-icons/react`, `@/hooks/use-mobile`, `@/components/button`, `@/components/input`, `@/components/separator`, `@/components/sheet`, `@/components/skeleton`, `@/components/tooltip` | **"use client":** Sim

## Exports (24 components + 1 hook)
SidebarProvider, Sidebar, SidebarTrigger, SidebarRail, SidebarInset, SidebarInput, SidebarHeader, SidebarFooter, SidebarSeparator, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, useSidebar

## Context
SidebarContext com state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar

## Props & Variants
**Sidebar props:** side (left/right), variant (sidebar/floating/inset), collapsible (offcanvas/icon/none)

**SidebarMenuButton:** sidebarMenuButtonVariants via cva (variant: default/outline, size: default/sm/lg). Suporta a prop tooltip.

## Uso

```tsx
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarRail, SidebarInset, useSidebar } from "@blips/ui"

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu><SidebarMenuItem>
        <SidebarMenuButton size="lg"><Logo /><span>Meu App</span></SidebarMenuButton>
      </SidebarMenuItem></SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Dashboard"><SquaresFour /><span>Dashboard</span></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>...</SidebarFooter>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <header className="flex h-16 items-center gap-2 px-4"><SidebarTrigger /></header>
    <main className="flex-1 p-4">Conteúdo</main>
  </SidebarInset>
</SidebarProvider>
```

## Recursos
- Atalho de teclado: Cmd/Ctrl+B
- Persistência em cookie: sidebar_state
- Variáveis CSS: --sidebar-width (16rem), --sidebar-width-icon (3rem)
