# Data Fetching na Sidebar

Padrões para carregar dados dinâmicos na sidebar usando RSC, Suspense, SWR ou React Query.

> Exemplos na **v3.x — Base UI**. A lógica de dados é igual nas duas versões; só o item como
> link muda — ver [v2.x — Radix](#v2x--radix) no fim (detecção de versão: Passo 0 do `SKILL.md` do building).

## Table of Contents

- [React Server Components (RSC)](#react-server-components-rsc)
- [SWR](#swr)
- [React Query (TanStack Query)](#react-query-tanstack-query)
- [API (Padrão do Projeto)](#api-padrão-do-projeto)
- [Padrões Combinados](#padrões-combinados)
- [Estados de Erro](#estados-de-erro)
- [Estado Vazio](#estado-vazio)
- [v3.x — Base UI](#v3x--base-ui)
- [v2.x — Radix](#v2x--radix)

## React Server Components (RSC)

### Skeleton para Loading

```tsx
// nav-projects-skeleton.tsx
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@blips/ui/components/sidebar";

export function NavProjectsSkeleton() {
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

### Server Component com Fetch

```tsx
// nav-projects.tsx
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@blips/ui/components/sidebar";
import { FolderIcon } from "@phosphor-icons/react";

async function fetchProjects() {
  // Fetch do banco de dados ou API
  const response = await fetch("/api/projects");
  return response.json();
}

export async function NavProjects() {
  const projects = await fetchProjects();

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.id}>
          <SidebarMenuButton render={<a href={`/projects/${project.id}`} />}>
            <FolderIcon />
            <span>{project.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
```

### Uso com Suspense

```tsx
// app-sidebar.tsx
import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@blips/ui/components/sidebar";

import { NavProjects } from "./nav-projects";
import { NavProjectsSkeleton } from "./nav-projects-skeleton";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <Suspense fallback={<NavProjectsSkeleton />}>
              <NavProjects />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
```

---

## SWR

```tsx
// nav-projects.tsx
"use client";

import useSWR from "swr";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@blips/ui/components/sidebar";
import { FolderIcon } from "@phosphor-icons/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function NavProjects() {
  const { data, isLoading, error } = useSWR("/api/projects", fetcher);

  if (isLoading) {
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

  if (error || !data) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton disabled>
            <span className="text-muted-foreground">Erro ao carregar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {data.map((project) => (
        <SidebarMenuItem key={project.id}>
          <SidebarMenuButton render={<a href={`/projects/${project.id}`} />}>
            <FolderIcon />
            <span>{project.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
```

---

## React Query (TanStack Query)

```tsx
// nav-projects.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@blips/ui/components/sidebar";
import { FolderIcon } from "@phosphor-icons/react";

async function fetchProjects() {
  const response = await fetch("/api/projects");
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

export function NavProjects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) {
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

  if (error || !data) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton disabled>
            <span className="text-muted-foreground">Erro ao carregar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {data.map((project) => (
        <SidebarMenuItem key={project.id}>
          <SidebarMenuButton render={<a href={`/projects/${project.id}`} />}>
            <FolderIcon />
            <span>{project.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
```

---

## API (Padrão do Projeto)

```tsx
// nav-projects.tsx
"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@blips/ui/components/sidebar";
import { FolderIcon } from "@phosphor-icons/react";
import { api } from "@/lib/api";

export function NavProjects() {
  const { data, isLoading, error } = api.projects.list.useQuery();

  if (isLoading) {
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

  if (error || !data) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton disabled>
            <span className="text-muted-foreground">Erro ao carregar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {data.map((project) => (
        <SidebarMenuItem key={project.id}>
          <SidebarMenuButton render={<a href={`/projects/${project.id}`} />}>
            <FolderIcon />
            <span>{project.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
```

---

## Padrões Combinados

### Menu Estático + Dinâmico

```tsx
// app-sidebar.tsx
import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@blips/ui/components/sidebar";
import { HouseIcon, GearIcon, FolderIcon } from "@phosphor-icons/react";

import { NavProjects } from "./nav-projects";
import { NavProjectsSkeleton } from "./nav-projects-skeleton";

// Menu estático
const staticItems = [
  { title: "Início", href: "/", icon: HouseIcon },
  { title: "Configurações", href: "/settings", icon: GearIcon },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Menu Estático */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {staticItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton render={<a href={item.href} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Menu Dinâmico */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <Suspense fallback={<NavProjectsSkeleton />}>
              <NavProjects />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
```

### Com Badge de Contagem

```tsx
// nav-inbox.tsx
"use client";

import { api } from "@/lib/api";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@blips/ui/components/sidebar";
import { TrayIcon } from "@phosphor-icons/react";

export function NavInbox() {
  const { data: count } = api.inbox.unreadCount.useQuery();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton render={<a href="/inbox" />}>
          <TrayIcon />
          <span>Tray</span>
        </SidebarMenuButton>
        {count && count > 0 && (
          <SidebarMenuBadge>{count > 99 ? "99+" : count}</SidebarMenuBadge>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
```

---

## Estados de Erro

### Componente de Erro Reutilizável

```tsx
// nav-error.tsx
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@blips/ui/components/sidebar";
import { WarningCircleIcon, ArrowsClockwiseIcon } from "@phosphor-icons/react";

interface NavErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function NavError({ message = "Erro ao carregar", onRetry }: NavErrorProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton disabled className="text-destructive">
          <WarningCircleIcon className="size-4" />
          <span>{message}</span>
        </SidebarMenuButton>
        {onRetry && (
          <SidebarMenuButton onClick={onRetry} className="ml-auto">
            <ArrowsClockwiseIcon className="size-4" />
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
```

### Uso

```tsx
const { data, isLoading, error, refetch } = api.projects.list.useQuery();

if (error) {
  return <NavError message="Falha ao carregar projetos" onRetry={refetch} />;
}
```

---

## Estado Vazio

```tsx
// nav-empty.tsx
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@blips/ui/components/sidebar";
import { FolderOpenIcon, PlusIcon } from "@phosphor-icons/react";

interface NavEmptyProps {
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function NavEmpty({
  message = "Nenhum item",
  actionLabel,
  onAction,
}: NavEmptyProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton disabled className="text-muted-foreground">
          <FolderOpenIcon className="size-4" />
          <span>{message}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {actionLabel && onAction && (
        <SidebarMenuItem>
          <SidebarMenuButton onClick={onAction}>
            <PlusIcon className="size-4" />
            <span>{actionLabel}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
```

### Uso

```tsx
if (!data || data.length === 0) {
  return (
    <NavEmpty
      message="Nenhum projeto"
      actionLabel="Criar projeto"
      onAction={() => setCreateDialogOpen(true)}
    />
  );
}
```

## v3.x — Base UI

Os exemplos acima usam `render` para o item virar link:

```tsx
<SidebarMenuButton render={<a href={`/projects/${project.id}`} />}>
  <FolderIcon />
  <span>{project.name}</span>
</SidebarMenuButton>
```

## v2.x — Radix

Troque `render` por `asChild` com o link como filho único; o resto (Suspense, SWR, React
Query, skeleton, erro, vazio) não muda:

```tsx
<SidebarMenuButton asChild>
  <a href={`/projects/${project.id}`}>
    <Folder />
    <span>{project.name}</span>
  </a>
</SidebarMenuButton>
```

