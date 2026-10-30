# Sidebar

Import: `@blips/ui/components/sidebar`

Barra lateral de navegação do app: painel fixo no desktop (expandido, recolhido
em ícones ou fora da tela) e Sheet no mobile. É a navegação padrão de apps
internos Blips.

Exports (iguais nas duas versões, 24 nomes): `SidebarProvider`, `Sidebar`,
`SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInput`,
`SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`,
`SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`,
`SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`,
`SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`,
`SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `useSidebar`.

## Notas comuns

**Estrutura**: `SidebarProvider` > (`Sidebar` > `SidebarHeader` / `SidebarContent` > `SidebarGroup` > `SidebarGroupLabel` + `SidebarGroupContent` > `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton` / `SidebarFooter` / `SidebarRail`) + `SidebarInset` (o `<main>` ao lado, com o header e o `SidebarTrigger`).

**SidebarProvider**: `defaultOpen` (`true`), `open` + `onOpenChange(open)` (controlado), `style` para as CSS vars `--sidebar-width` (`16rem`) e `--sidebar-width-icon` (`3rem`). Persiste o estado no cookie `sidebar_state` (7 dias). Atalho `Ctrl/Cmd + B`.

**Sidebar**

| Prop | Tipo | Padrão |
|---|---|---|
| `side` | `"left" \| "right"` | `"left"` |
| `variant` | `"sidebar" \| "floating" \| "inset"` | `"sidebar"` |
| `collapsible` | `"offcanvas" \| "icon" \| "none"` | `"offcanvas"` |

No mobile vira Sheet com `--sidebar-width: 18rem`.

**SidebarMenuButton**: `isActive` (destaque `bg-sidebar-accent font-medium`, `data-active`), `tooltip` (string ou props de `TooltipContent`; aparece só recolhida em ícones), `variant` (`"default"` \| `"outline"`), `size` (`"default"` `h-8`, `"sm"` `h-7`, `"lg"` `h-12`).

**SidebarMenuSubButton**: `size` (`"sm"` \| `"md"`, padrão `"md"`), `isActive`.
**SidebarMenuAction**: `showOnHover` (só aparece no hover/foco do item).
**SidebarMenuSkeleton**: `showIcon`.

**useSidebar()**: `{ state: "expanded" | "collapsed", open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }`.

- Tokens de cor próprios: `bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`, `text-sidebar-accent-foreground`, `bg-sidebar-primary`, `border-sidebar-border`, `ring-sidebar-ring`.
- Atributos para estilizar: `data-state` (`expanded`/`collapsed`, no wrapper), `data-collapsible`, `data-variant`, `data-side`, `data-sidebar`, `data-active`, `data-size`, `data-mobile`.
- Recolhida em ícones: botões viram `size-8 p-2`, rótulos e submenus somem, `SidebarGroupLabel` fica `opacity-0`.
- Internamente usa `Sheet`, `Button`, `Input`, `Separator`, `Skeleton` e `Tooltip` da própria lib, e o hook `useIsMobile`.
- Header do `SidebarInset`: `SidebarTrigger` + `Separator` vertical + `Breadcrumb` (veja `separator.md` para o seletor de altura de cada versão).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

- **`render` no lugar de `asChild`** (feito com `useRender` + `mergeProps`) em `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuButton`, `SidebarMenuAction` e `SidebarMenuSubButton`: `<SidebarMenuButton render={<a href="/x" />}>…</SidebarMenuButton>`.
- Com `tooltip`, o trigger é `<TooltipTrigger render={render} />`: `render` + `tooltip` juntos funcionam (o elemento do `render` vira o trigger).
- **O `SidebarProvider` não envolve mais os filhos num `TooltipProvider`.** Os tooltips do menu usam o atraso padrão do Base UI (~600 ms). Para abrir na hora, coloque `<TooltipProvider>` na raiz do app (o da lib já tem `delay={0}`).
- `Sidebar` aceita `dir` (repassado à Sheet no mobile, RTL).
- `SidebarTrigger`: `Button size="icon-sm"` com o ícone `SidebarIcon`.
- `SidebarMenuAction showOnHover` fica visível com `aria-expanded` (ex.: com um `DropdownMenuTrigger` aberto dentro), não com `data-[state=open]`.
- Estado ativo: `isActive` vira `data-active` **sem valor** (`data-active=""`, ausente quando `false`), porque o estado passa pelo `useRender`. Use `data-active:` (ou `peer-data-active/menu-button:`); `data-[active=true]:` vindo da v2 **não casa** mais.
- Visual mira: textos `text-xs`; `SidebarMenu gap-px`; `SidebarGroup px-2 py-1`; `SidebarInput border-input bg-muted/20`; `floating` com `ring-1`; `outline` com sombra de 1px funcionando com tokens oklch.
- Grupo/submenu recolhível: `Collapsible` do Base UI. O trigger ganha `data-panel-open` quando aberto e o `Collapsible` raiz, `data-open`.

```tsx
"use client";

import {
  CaretRightIcon,
  GearIcon,
  HouseIcon,
  TrayIcon,
} from "@phosphor-icons/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { Separator } from "@blips/ui/components/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@blips/ui/components/sidebar";
import { TooltipProvider } from "@blips/ui/components/tooltip";

const itens = [
  { titulo: "Início", url: "/", icone: HouseIcon },
  { titulo: "Caixa de entrada", url: "/inbox", icone: TrayIcon },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {itens.map((item) => (
                    <SidebarMenuItem key={item.titulo}>
                      <SidebarMenuButton
                        tooltip={item.titulo}
                        render={<a href={item.url} />}
                      >
                        <item.icone />
                        <span>{item.titulo}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                  <Collapsible className="group/collapsible" render={<SidebarMenuItem />}>
                    <CollapsibleTrigger render={<SidebarMenuButton tooltip="Configurações" />}>
                      <GearIcon />
                      <span>Configurações</span>
                      <CaretRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton isActive render={<a href="/conta" />}>
                            Conta
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />
            {/* Breadcrumb */}
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
```

Grupo inteiro recolhível pelo rótulo:

```tsx
<Collapsible defaultOpen className="group/collapsible">
  <SidebarGroup>
    <SidebarGroupLabel render={<CollapsibleTrigger />}>
      Projetos
      <CaretRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent>…</SidebarGroupContent>
    </CollapsibleContent>
  </SidebarGroup>
</Collapsible>
```

Ação com menu no item:

```tsx
<SidebarMenuItem>
  <SidebarMenuButton render={<a href="/projetos/1" />}>Projeto 1</SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>
      <DotsThreeIcon />
      <span className="sr-only">Mais</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">…</DropdownMenuContent>
  </DropdownMenu>
</SidebarMenuItem>
```

### Armadilhas

- `asChild` não existe em nenhuma peça: use `render`.
- Tooltips do menu "demorando" a abrir: falta `<TooltipProvider>` na raiz.
- `group-data-[state=open]/collapsible:` não casa com o `Collapsible` v3: use `group-data-open/collapsible:`.
- `data-[active=true]:` (e `peer-data-[active=true]/menu-button:`) em `className` de consumidor não casa: use `data-active:`.

## v2.x — Radix

- **`asChild`** (com `Slot` do Radix) em `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuButton`, `SidebarMenuAction` e `SidebarMenuSubButton`.
- O `SidebarProvider` já envolve os filhos num `TooltipProvider delayDuration={0}`: tooltips do menu abrem na hora sem configurar nada.
- `SidebarTrigger`: `Button size="icon"` + `size-7`, ícone `SidebarSimple`.
- `SidebarMenuAction showOnHover` fica visível com `data-[state=open]` (menu aberto dentro).
- Visual new-york: textos `text-sm` (sm `text-xs`); `SidebarMenu gap-1`; `SidebarGroup p-2`.
- Grupo/submenu recolhível: `Collapsible` Radix (`data-state="open"`).

```tsx
"use client"

import { CaretRight, Gear, House, Tray } from "@phosphor-icons/react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"

const itens = [
  { titulo: "Início", url: "/", icone: House },
  { titulo: "Caixa de entrada", url: "/inbox", icone: Tray },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {itens.map((item) => (
                  <SidebarMenuItem key={item.titulo}>
                    <SidebarMenuButton asChild tooltip={item.titulo}>
                      <a href={item.url}>
                        <item.icone />
                        <span>{item.titulo}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <Collapsible asChild className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Configurações">
                        <Gear />
                        <span>Configurações</span>
                        <CaretRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive>
                            <a href="/conta">Conta</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Exemplos completos (escritos para a v2)

Exemplos longos de sidebar com `asChild`, ícones Phosphor sem sufixo e `Collapsible` Radix. Em repo v3, troque `asChild` por `render`, os ícones pelos nomes com sufixo `Icon` e os seletores `data-[state=open]` por `data-open`/`data-panel-open` (veja a seção v3.x acima).

#### sidebar-demo

```tsx
"use client"

import {
  Calendar,
  House,
  Tray,
  MagnifyingGlass,
  Gear,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"

const items = [
  { title: "House", url: "#", icon: House },
  { title: "Tray", url: "#", icon: Tray },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "MagnifyingGlass", url: "#", icon: MagnifyingGlass },
  { title: "Gear", url: "#", icon: Gear },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
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
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

#### sidebar-header

```tsx
"use client"

import { CaretDown } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    Select Workspace
                    <CaretDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-popper-anchor-width)">
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

#### sidebar-footer

```tsx
"use client"

import { CaretUp } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    Username
                    <CaretUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-(--radix-popper-anchor-width)"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

#### sidebar-group

```tsx
"use client"

import { Lifebuoy, PaperPlaneTilt } from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Help</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Lifebuoy />
                    Support
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <PaperPlaneTilt />
                    Feedback
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

#### sidebar-group-collapsible

```tsx
"use client"

import { CaretDown, Lifebuoy, PaperPlaneTilt } from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  Help
                  <CaretDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Lifebuoy />
                        Support
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <PaperPlaneTilt />
                        Feedback
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

#### sidebar-group-action

```tsx
"use client"

import { FrameCorners, MapTrifold, ChartPie, Plus } from "@phosphor-icons/react"
import { toast, Toaster } from "sonner"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction
              title="Add Project"
              onClick={() => toast("You clicked the group action!")}
            >
              <Plus /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <FrameCorners />
                      <span>Design Engineering</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <ChartPie />
                      <span>Sales & Marketing</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <MapTrifold />
                      <span>Travel</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

#### sidebar-menu

```tsx
"use client"

import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners },
  { name: "Sales & Marketing", url: "#", icon: ChartPie },
  { name: "Travel", url: "#", icon: MapTrifold },
  { name: "Support", url: "#", icon: Lifebuoy },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

#### sidebar-menu-action

```tsx
"use client"

import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  DotsThree,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners },
  { name: "Sales & Marketing", url: "#", icon: ChartPie },
  { name: "Travel", url: "#", icon: MapTrifold },
  { name: "Support", url: "#", icon: Lifebuoy },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton
                      asChild
                      className="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                    >
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <DotsThree />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>
                          <span>Edit Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>Delete Project</span>
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
  )
}
```

#### sidebar-menu-sub

```tsx
"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const items = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      { title: "Installation", url: "#" },
      { title: "Project Structure", url: "#" },
    ],
  },
  {
    title: "Build Your Application",
    url: "#",
    items: [
      { title: "Routing", url: "#" },
      { title: "Data Fetching", url: "#", isActive: true },
      { title: "Rendering", url: "#" },
      { title: "Caching", url: "#" },
      { title: "Styling", url: "#" },
      { title: "Optimizing", url: "#" },
      { title: "Configuring", url: "#" },
      { title: "Testing", url: "#" },
      { title: "Authentication", url: "#" },
      { title: "Deploying", url: "#" },
      { title: "Upgrading", url: "#" },
      { title: "Examples", url: "#" },
    ],
  },
  {
    title: "API Reference",
    url: "#",
    items: [
      { title: "Components", url: "#" },
      { title: "File Conventions", url: "#" },
      { title: "Functions", url: "#" },
      { title: "next.config.js Options", url: "#" },
      { title: "CLI", url: "#" },
      { title: "Edge Runtime", url: "#" },
    ],
  },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.items.map((subItem, subIndex) => (
                        <SidebarMenuSubItem key={subIndex}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

#### sidebar-menu-collapsible

```tsx
"use client"

import { CaretRight } from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const items = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      { title: "Installation", url: "#" },
      { title: "Project Structure", url: "#" },
    ],
  },
  {
    title: "Build Your Application",
    url: "#",
    items: [
      { title: "Routing", url: "#" },
      { title: "Data Fetching", url: "#", isActive: true },
      { title: "Rendering", url: "#" },
      { title: "Caching", url: "#" },
      { title: "Styling", url: "#" },
      { title: "Optimizing", url: "#" },
      { title: "Configuring", url: "#" },
      { title: "Testing", url: "#" },
      { title: "Authentication", url: "#" },
      { title: "Deploying", url: "#" },
      { title: "Upgrading", url: "#" },
      { title: "Examples", url: "#" },
    ],
  },
  {
    title: "API Reference",
    url: "#",
    items: [
      { title: "Components", url: "#" },
      { title: "File Conventions", url: "#" },
      { title: "Functions", url: "#" },
      { title: "next.config.js Options", url: "#" },
      { title: "CLI", url: "#" },
      { title: "Edge Runtime", url: "#" },
    ],
  },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <Collapsible
                    key={index}
                    className="group/collapsible"
                    defaultOpen={index === 0}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <span>{item.title}</span>
                          <CaretRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

#### sidebar-menu-badge

```tsx
"use client"

import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners, badge: "24" },
  { name: "Sales & Marketing", url: "#", icon: ChartPie, badge: "12" },
  { name: "Travel", url: "#", icon: MapTrifold, badge: "3" },
  { name: "Support", url: "#", icon: Lifebuoy, badge: "21" },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt, badge: "8" },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton
                      asChild
                      className="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                    >
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{project.badge}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

#### sidebar-rsc

```tsx
import * as React from "react"
import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners, badge: "24" },
  { name: "Sales & Marketing", url: "#", icon: ChartPie, badge: "12" },
  { name: "Travel", url: "#", icon: MapTrifold, badge: "3" },
  { name: "Support", url: "#", icon: Lifebuoy, badge: "21" },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt, badge: "8" },
]

async function fetchProjects() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return projects
}

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <React.Suspense fallback={<NavProjectsSkeleton />}>
                <NavProjects />
              </React.Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

async function NavProjects() {
  const projects = await fetchProjects()

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <project.icon />
              <span>{project.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
```

#### sidebar-controlled

```tsx
"use client"

import * as React from "react"
import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  SidebarSimple,
  SidebarSimple,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners },
  { name: "Sales & Marketing", url: "#", icon: ChartPie },
  { name: "Travel", url: "#", icon: MapTrifold },
  { name: "Support", url: "#", icon: Lifebuoy },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt },
]

export default function AppSidebar() {
  const [open, setOpen] = React.useState(true)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <Button
            onClick={() => setOpen((open) => !open)}
            size="sm"
            variant="ghost"
          >
            {open ? <SidebarSimple /> : <SidebarSimple />}
            <span>{open ? "Close" : "Open"} Sidebar</span>
          </Button>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```


## Exemplos na docs

`sidebar-demo` (em `apps/docs/examples/`, escrito para a v3).
