# Sidebar - Reference

Composable, themable, and customizable sidebar component using shadcn/ui.

## Stack

- **shadcn/ui Sidebar**: Composable sidebar components
- **Lucide React**: Icons
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
import { House, Tray, Calendar } from "@phosphor-icons/react";

const items = [
  { title: "House", url: "/", icon: House },
  { title: "Tray", url: "/inbox", icon: Tray },
  { title: "Calendar", url: "/calendar", icon: Calendar },
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
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
| Components | [components-reference.md](components-reference.md) | Provider, Sidebar, Header, Footer, Content |
| Menu | [menu-reference.md](menu-reference.md) | Menu, MenuButton, MenuAction, Submenus, Badges |
| Theming | [theming-reference.md](theming-reference.md) | CSS variables, colors, dark mode |
| Project Patterns | [patterns-reference.md](patterns-reference.md) | Admin app patterns, NavItem interface |
| Data Fetching | [data-reference.md](data-reference.md) | RSC, Suspense, SWR, React Query |

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
