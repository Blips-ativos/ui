# Sidebar - Reference

Composable, themable, and customizable sidebar component using shadcn/ui.

> **Versão da lib:** confira a versão da `@blips/ui` do repo (ver o "Passo 0" do
> `SKILL.md` do building e `references/v2-vs-v3.md`). Os exemplos dos guias de sidebar
> seguem a **v3.x — Base UI** (`render`, ícones `*Icon`). Em repo **v2.x — Radix**, aplique as
> trocas da seção [v2.x — Radix](#v2x--radix) de cada arquivo.

## Stack

- **shadcn/ui Sidebar**: Composable sidebar components (Base UI na v3.x, Radix na v2.x)
- **Phosphor (`@phosphor-icons/react`)**: Icons (nunca `lucide-react`)
- **Tailwind CSS v4**: Styling
- **Next.js App Router**: Navigation

## Estrutura de Componentes

```
SidebarProvider              # Contexto e estado collapsible
└── Sidebar                  # Container principal
    ├── SidebarHeader        # Sticky no topo
    ├── SidebarContent       # Conteúdo scrollável
    │   └── SidebarGroup     # Seção de navegação
    │       ├── SidebarGroupLabel
    │       ├── SidebarGroupAction
    │       └── SidebarGroupContent
    │           └── SidebarMenu
    │               └── SidebarMenuItem
    │                   ├── SidebarMenuButton
    │                   ├── SidebarMenuAction
    │                   ├── SidebarMenuBadge
    │                   └── SidebarMenuSub
    ├── SidebarFooter        # Sticky no bottom
    ├── SidebarSeparator     # Divisor
    └── SidebarRail          # Rail para toggle
```

## Quick Start

### 1. Layout com Provider

```tsx
// app/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@blips/ui/components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
```

### 2. Sidebar Básica

```tsx
// components/app-sidebar.tsx
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
import { HouseIcon, TrayIcon, CalendarIcon } from "@phosphor-icons/react";

const items = [
  { title: "Início", url: "/", icon: HouseIcon },
  { title: "Entrada", url: "/inbox", icon: TrayIcon },
  { title: "Agenda", url: "/calendar", icon: CalendarIcon },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
```

## Sub-References

| Resource | File | When to use |
|----------|------|-------------|
| Components | [sidebar-components.md](sidebar-components.md) | Provider, Sidebar, Header, Footer, Content |
| Menu | [menu.md](menu.md) | Menu, MenuButton, MenuAction, Submenus, Badges |
| Theming | [theming.md](theming.md) | CSS variables, colors, dark mode |
| Project Patterns | [patterns.md](patterns.md) | Admin app patterns, NavItem interface |
| Data Fetching | [data.md](data.md) | RSC, Suspense, SWR, React Query |

## Imports Padrão

```tsx
// Componentes de Sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@blips/ui/components/sidebar";

// Componentes auxiliares
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
```

## Variantes da Sidebar

| Prop | Valores | Descrição |
|------|---------|-----------|
| `side` | `left`, `right` | Lado da sidebar |
| `variant` | `sidebar`, `floating`, `inset` | Estilo visual |
| `collapsible` | `offcanvas`, `icon`, `none` | Comportamento de collapse |

## Quando Usar

- Criar nova sidebar para aplicação
- Adicionar navegação com ícones e labels
- Implementar sidebar collapsible (icon mode)
- Criar menus com submenus e dropdowns
- Adicionar header/footer com ações de usuário
- Tematizar sidebar independente do app

## v3.x — Base UI

- `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuButton`, `SidebarMenuAction` e
  `SidebarMenuSubButton` trocam o elemento com `render` (`useRender` + `mergeProps`):
  `<SidebarMenuButton render={<Link href="/x" />}>…</SidebarMenuButton>`.
- Triggers de outras primitivas que envolvem peças da sidebar recebem a peça em `render`:
  `<DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>…`,
  `<CollapsibleTrigger render={<SidebarMenuButton />}>…`.
- `SidebarProvider` **não** envolve mais os filhos em `TooltipProvider`: os tooltips do
  `SidebarMenuButton` usam o delay padrão do Base UI (~600ms). Para abrir na hora, envolva o
  app em `<TooltipProvider delay={0}>`.
- Estados: `data-active` (item ativo), `data-open`/`data-popup-open` (trigger de menu aberto),
  `group-data-open/collapsible:` (Collapsible aberto). `data-[state=open]:` não casa.
- `SidebarTrigger` é `size="icon-sm"` com o ícone Phosphor `SidebarIcon`; `Sidebar` aceita `dir`.
- Densidade base-mira: menu/grupo em `text-xs`, `SidebarMenu` com `gap-px`, `SidebarGroup`
  com `px-2 py-1`.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton isActive={isActive} tooltip={item.title} render={<Link href={item.href} />}>
    <item.icon />
    <span>{item.title}</span>
  </SidebarMenuButton>
</SidebarMenuItem>
```

## v2.x — Radix

- As mesmas peças usam `asChild` + filho único (`Slot` do Radix).
- `SidebarProvider` já envolve tudo em `TooltipProvider delayDuration={0}`.
- Estados: `data-active`, `data-[state=open]:` (trigger/collapsible abertos),
  `group-data-[state=open]/collapsible:`.
- `SidebarTrigger` é `size="icon"` (`size-7`) com `SidebarSimple`.
- Ícones sem sufixo (`House`, `Tray`) também funcionam; os nomes `*Icon` existem no Phosphor
  2.1.10 das duas versões.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
    <Link href={item.href}>
      <item.icon />
      <span>{item.title}</span>
    </Link>
  </SidebarMenuButton>
</SidebarMenuItem>
```

| Padrão | v3.x — Base UI | v2.x — Radix |
|---|---|---|
| Item como link | `<SidebarMenuButton render={<Link href="/x" />}>…` | `<SidebarMenuButton asChild><Link href="/x">…</Link></SidebarMenuButton>` |
| Sub-item como link | `<SidebarMenuSubButton render={<Link href="/x" />}>…` | `<SidebarMenuSubButton asChild><Link href="/x">…</Link></SidebarMenuSubButton>` |
| Label que abre collapsible | `<SidebarGroupLabel render={<CollapsibleTrigger />}>…` | `<SidebarGroupLabel asChild><CollapsibleTrigger>…</CollapsibleTrigger></SidebarGroupLabel>` |
| Botão que abre dropdown | `<DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>…` | `<DropdownMenuTrigger asChild><SidebarMenuButton size="lg">…</SidebarMenuButton></DropdownMenuTrigger>` |
| Ação que abre dropdown | `<DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>…` | `<DropdownMenuTrigger asChild><SidebarMenuAction showOnHover>…</SidebarMenuAction></DropdownMenuTrigger>` |
| Seta do collapsible | `group-data-open/collapsible:rotate-90` | `group-data-[state=open]/collapsible:rotate-90` |
| Trigger aberto | `data-popup-open:bg-sidebar-accent` | `data-[state=open]:bg-sidebar-accent` |
| Item de dropdown | `onClick` | `onSelect` |
| Label de dropdown | dentro de `DropdownMenuGroup` | solto |
| Tooltip instantâneo | `<TooltipProvider delay={0}>` na raiz | já vem do `SidebarProvider` |

