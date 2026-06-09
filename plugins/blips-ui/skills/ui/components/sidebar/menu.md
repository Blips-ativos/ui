# Componentes de Menu da Sidebar

## Table of Contents

- [Estrutura do Menu](#estrutura-do-menu)
- [SidebarMenu](#sidebarmenu)
- [SidebarMenuButton](#sidebarmenubutton)
- [SidebarMenuAction](#sidebarmenuaction)
- [SidebarMenuBadge](#sidebarmenubadge)
- [SidebarMenuSub](#sidebarmenusub)
- [SidebarMenuSkeleton](#sidebarmenuskeleton)
- [Padrões Comuns](#padrões-comuns)

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
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
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
| `asChild` | `boolean` | Renderiza como child (Link, a, etc) |
| `isActive` | `boolean` | Estado ativo |
| `size` | `"default"`, `"sm"`, `"lg"` | Tamanho do botão |
| `tooltip` | `string` | Tooltip quando colapsado |
| `disabled` | `boolean` | Estado desabilitado |

### Como Link

```tsx
import Link from "next/link";

<SidebarMenuButton asChild>
  <Link href="/dashboard">
    <Home />
    <span>Dashboard</span>
  </Link>
</SidebarMenuButton>
```

### Com Estado Ativo

```tsx
const pathname = usePathname();

<SidebarMenuButton asChild isActive={pathname === item.href}>
  <Link href={item.href}>
    <item.icon className="size-4" />
    <span>{item.title}</span>
  </Link>
</SidebarMenuButton>
```

### Com Tooltip (icon mode)

```tsx
<SidebarMenuButton asChild tooltip={item.title}>
  <Link href={item.href}>
    <item.icon className="size-4" />
    <span>{item.title}</span>
  </Link>
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
  <SidebarMenuButton asChild>
    <a href="#">
      <Home />
      <span>Home</span>
    </a>
  </SidebarMenuButton>
  <SidebarMenuAction>
    <Plus /> <span className="sr-only">Add</span>
  </SidebarMenuAction>
</SidebarMenuItem>
```

### Com DropdownMenu

```tsx
<SidebarMenuItem>
  <SidebarMenuButton asChild>
    <a href="#">
      <Folder />
      <span>Project</span>
    </a>
  </SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction>
        <MoreHorizontal />
      </SidebarMenuAction>
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
  <MoreHorizontal />
</SidebarMenuAction>
```

---

## SidebarMenuBadge

Badge/contador ao lado do item.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton>
    <Inbox />
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
      <CollapsibleTrigger asChild>
        <SidebarMenuButton>
          <Settings />
          <span>Settings</span>
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/settings/general">General</Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <Link href="/settings/security">Security</Link>
            </SidebarMenuSubButton>
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
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Users", href: "/users", icon: Users },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <Link href={item.href}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </Link>
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
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Analytics", href: "/analytics", icon: BarChart, disabled: true },
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
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <Link href={item.href}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </Link>
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
            <SidebarMenuButton asChild>
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
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
            <SidebarMenuButton asChild>
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
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
      <SidebarMenuButton asChild>
        <Link href={`/projects/${project.id}`}>
          <Folder />
          <span>{project.name}</span>
        </Link>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem>
            <Pencil className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Star className="mr-2 size-4" />
            Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```
