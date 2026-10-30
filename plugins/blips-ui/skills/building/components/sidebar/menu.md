# Componentes de Menu da Sidebar

> Exemplos na **v3.x — Base UI**. Para repo **v2.x — Radix**, veja a seção
> [v2.x — Radix](#v2x--radix) no fim (detecção de versão: Passo 0 do `SKILL.md` do building).

## Table of Contents

- [Estrutura do Menu](#estrutura-do-menu)
- [SidebarMenu](#sidebarmenu)
- [SidebarMenuButton](#sidebarmenubutton)
- [SidebarMenuAction](#sidebarmenuaction)
- [SidebarMenuBadge](#sidebarmenubadge)
- [SidebarMenuSub](#sidebarmenusub)
- [SidebarMenuSkeleton](#sidebarmenuskeleton)
- [Padrões Comuns](#padrões-comuns)
- [v3.x — Base UI](#v3x--base-ui)
- [v2.x — Radix](#v2x--radix)

## Estrutura do Menu

```
SidebarMenu
└── SidebarMenuItem
    ├── SidebarMenuButton     # Botão principal
    ├── SidebarMenuAction     # Ação secundária (dropdown, etc)
    ├── SidebarMenuBadge      # Badge/contador
    └── SidebarMenuSub        # Submenu
        └── SidebarMenuSubItem
            └── SidebarMenuSubButton
```

---

## SidebarMenu

Container para itens de menu. Usado dentro de `SidebarGroupContent`.

```tsx
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
```

---

## SidebarMenuButton

Botão principal do item de menu.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `render` (v3.x) / `asChild` (v2.x) | `ReactElement \| (props, state) => ReactElement` / `boolean` | Troca o elemento (Link, a, etc) |
| `isActive` | `boolean` | Estado ativo |
| `size` | `"default"`, `"sm"`, `"lg"` | Tamanho do botão |
| `tooltip` | `string` | Tooltip quando colapsado |
| `disabled` | `boolean` | Estado desabilitado |

### Como Link

```tsx
import Link from "next/link";

<SidebarMenuButton render={<Link href="/dashboard" />}>
  <HouseIcon />
  <span>Dashboard</span>
</SidebarMenuButton>
```

### Com Estado Ativo

```tsx
const pathname = usePathname();

<SidebarMenuButton isActive={pathname === item.href} render={<Link href={item.href} />}>
  <item.icon className="size-4" />
  <span>{item.title}</span>
</SidebarMenuButton>
```

### Com Tooltip (icon mode)

```tsx
<SidebarMenuButton tooltip={item.title} render={<Link href={item.href} />}>
  <item.icon className="size-4" />
  <span>{item.title}</span>
</SidebarMenuButton>
```

### Estado Desabilitado

```tsx
<SidebarMenuButton
  disabled
  tooltip={`${item.title} (em breve)`}
  className="cursor-not-allowed opacity-50"
>
  <item.icon className="size-4" />
  <span>{item.title}</span>
</SidebarMenuButton>
```

---

## SidebarMenuAction

Ação secundária independente do botão principal.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton render={<a href="#" />}>
    <HouseIcon />
    <span>Home</span>
  </SidebarMenuButton>
  <SidebarMenuAction>
    <PlusIcon /> <span className="sr-only">Add</span>
  </SidebarMenuAction>
</SidebarMenuItem>
```

### Com DropdownMenu

```tsx
<SidebarMenuItem>
  <SidebarMenuButton render={<a href="#" />}>
    <FolderIcon />
    <span>Project</span>
  </SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger render={<SidebarMenuAction />}>
      <DotsThreeIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItem>Edit Project</DropdownMenuItem>
      <DropdownMenuItem>Delete Project</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SidebarMenuItem>
```

### Visível no Hover/Active

```tsx
<SidebarMenuAction
  className="peer-data-[active=true]/menu-button:opacity-100"
>
  <DotsThreeIcon />
</SidebarMenuAction>
```

---

## SidebarMenuBadge

Badge/contador ao lado do item.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton>
    <TrayIcon />
    <span>Inbox</span>
  </SidebarMenuButton>
  <SidebarMenuBadge>24</SidebarMenuBadge>
</SidebarMenuItem>
```

---

## SidebarMenuSub

Submenu aninhado.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton>Sub Item 1</SidebarMenuSubButton>
    </SidebarMenuSubItem>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton>Sub Item 2</SidebarMenuSubButton>
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>
```

### Submenu Collapsible

```tsx
<SidebarMenu>
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger render={<SidebarMenuButton />}>
        <GearIcon />
        <span>Settings</span>
        <CaretDownIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton render={<Link href="/settings/general" />}>General</SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton render={<Link href="/settings/security" />}>Security</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
</SidebarMenu>
```

---

## SidebarMenuSkeleton

Skeleton para loading state.

```tsx
function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
```

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `showIcon` | `boolean` | Mostra placeholder para ícone |

---

## Padrões Comuns

### Menu com Itens Ativos

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: HouseIcon },
  { title: "Users", href: "/users", icon: UsersIcon },
  { title: "Settings", href: "/settings", icon: GearIcon },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              isActive={isActive}
              tooltip={item.title}
              render={<Link href={item.href} />}
            >
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
```

### Menu com Itens Desabilitados

```tsx
interface NavItem {
  title: string;
  href: string;
  icon: Icon;
  disabled?: boolean;
}

const items: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: HouseIcon },
  { title: "Analytics", href: "/analytics", icon: ChartBarIcon, disabled: true },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        if (item.disabled) {
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                disabled
                tooltip={`${item.title} (em breve)`}
                className="cursor-not-allowed opacity-50"
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }

        const isActive = pathname.startsWith(item.href);

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              isActive={isActive}
              tooltip={item.title}
              render={<Link href={item.href} />}
            >
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
```

### Menu com Múltiplos Grupos

```tsx
<SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Main</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {mainItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton render={<Link href={item.href} />}>
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <SidebarSeparator />

  <SidebarGroup>
    <SidebarGroupLabel>Settings</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {settingsItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton render={<Link href={item.href} />}>
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarContent>
```

### Menu com Ações por Item

```tsx
<SidebarMenu>
  {projects.map((project) => (
    <SidebarMenuItem key={project.id}>
      <SidebarMenuButton render={<Link href={`/projects/${project.id}`} />}>
        <FolderIcon />
        <span>{project.name}</span>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>
          <DotsThreeIcon />
          <span className="sr-only">More</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <StarIcon />
            Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

---

## v3.x — Base UI

Os exemplos acima já estão na v3.x:

- `render` em `SidebarMenuButton`/`SidebarMenuSubButton`/`SidebarMenuAction` e nos triggers
  (`DropdownMenuTrigger render={<SidebarMenuAction />}`, `CollapsibleTrigger render={<SidebarMenuButton />}`).
- Seta do submenu: `group-data-open/collapsible:` (a raiz do `Collapsible` emite `data-open`).
- `SidebarMenuAction showOnHover` fica visível com o menu aberto via `aria-expanded`.
- `DropdownMenuContent` posiciona com `align` default `"start"` e já usa `w-(--anchor-width)`.
- Itens de dropdown: `onClick`; `closeOnClick={false}` mantém o menu aberto.
- `tooltip` no `SidebarMenuButton`: o delay padrão é ~600ms (o `SidebarProvider` não traz
  `TooltipProvider`); para abrir na hora, `<TooltipProvider delay={0}>` na raiz.

## v2.x — Radix

Mesmos padrões com `asChild`:

```tsx
{/* Como link */}
<SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
  <Link href={item.href}>
    <item.icon />
    <span>{item.title}</span>
  </Link>
</SidebarMenuButton>

{/* Ação com dropdown */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <SidebarMenuAction showOnHover>
      <DotsThree />
      <span className="sr-only">More</span>
    </SidebarMenuAction>
  </DropdownMenuTrigger>
  <DropdownMenuContent side="right" align="start">
    <DropdownMenuItem onSelect={() => edit(project)}>Edit</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

{/* Submenu collapsible */}
<Collapsible defaultOpen className="group/collapsible">
  <SidebarMenuItem>
    <CollapsibleTrigger asChild>
      <SidebarMenuButton>
        <Gear />
        <span>Settings</span>
        <CaretDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <Link href="/settings/general">General</Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </CollapsibleContent>
  </SidebarMenuItem>
</Collapsible>
```

- `DropdownMenuContent` com `align` default `"center"`; para casar a largura com o trigger use
  `min-w-(--radix-dropdown-menu-trigger-width)`.
- `SidebarMenuAction showOnHover` fica visível com o menu aberto via `data-[state=open]`.
- O `SidebarProvider` já fornece `TooltipProvider delayDuration={0}`.

