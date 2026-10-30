# Padrões do Projeto - Admin Sidebar

Padrões específicos implementados no `apps/admin` para a sidebar administrativa.

## Table of Contents

- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [NavItem Interface](#navitem-interface)
- [Configuração de Navegação](#configuração-de-navegação)
- [AdminShell Component](#adminshell-component)
- [Uso no Layout](#uso-no-layout)
- [Adicionando Novas Rotas](#adicionando-novas-rotas)
- [Padrões de Ícones](#padrões-de-ícones)
- [Convenções](#convenções)

## Estrutura de Arquivos

```
apps/admin/
├── app/
│   └── (admin)/
│       └── layout.tsx              # Usa AdminShell
└── components/
    └── admin-shell/
        ├── admin-shell.tsx         # Componente principal
        └── nav-config.ts           # Configuração de navegação
```

## NavItem Interface

```tsx
// nav-config.ts
import { type Icon } from "@phosphor-icons/react";

export interface NavItem {
  title: string;          // Título exibido
  href: string;           // Rota de navegação
  icon: Icon;       // Ícone do @phosphor-icons/react
  exact?: boolean;        // Match exato de rota (padrão: false)
  disabled?: boolean;     // Item desabilitado (em breve)
}
```

## Configuração de Navegação

```tsx
// nav-config.ts
import {
  UsersIcon,
  ShoppingCartIcon,
  BookOpenIcon,
  FileTextIcon,
  SquaresFourIcon,
  type Icon,
} from "@phosphor-icons/react";

export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: SquaresFourIcon,
    disabled: true,  // Em breve
  },
  {
    title: "Usuários",
    href: "/users",
    icon: UsersIcon,
  },
  {
    title: "Compras",
    href: "/purchases",
    icon: ShoppingCartIcon,
  },
  {
    title: "Concursos",
    href: "/exams",
    icon: FileTextIcon,
  },
  {
    title: "Disciplinas",
    href: "/disciplines",
    icon: BookOpenIcon,
  },
];

export const secondaryNavItems: NavItem[] = [];
```

## AdminShell Component

```tsx
// admin-shell.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarSimpleIcon, SignOutIcon, DotsThreeVerticalIcon } from "@phosphor-icons/react";

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
  SidebarSeparator,
  SidebarTrigger,
} from "@blips/ui/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import { authClient } from "@/lib/auth/client";

import { mainNavItems, secondaryNavItems } from "./nav-config";

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
}

interface AdminShellProps {
  children: React.ReactNode;
  user: AdminUser;
}

export function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();

  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/sign-in";
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ??
    user.email[0]?.toUpperCase() ??
    "U";

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        {/* Header */}
        <SidebarHeader className="border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<Link href="/users" />}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <SidebarSimpleIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Concursa AI</span>
                  <span className="truncate text-xs text-muted-foreground">Admin</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarMenu className="px-2 py-2">
            {mainNavItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              // Itens desabilitados
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

              // Itens ativos
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

          {/* Secondary Nav (se houver) */}
          {secondaryNavItems.length > 0 && (
            <>
              <SidebarSeparator />
              <SidebarMenu className="px-2 py-2">
                {secondaryNavItems.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

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
            </>
          )}
        </SidebarContent>

        {/* Footer com usuário */}
        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                    />
                  }
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name ?? "Avatar"}
                        className="size-8 rounded-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.name ?? "Usuário"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <DotsThreeVerticalIcon className="ml-auto size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  side="top"
                  align="end"
                  sideOffset={8}
                >
                  {/* v3.x: DropdownMenuLabel precisa estar dentro de DropdownMenuGroup */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <SignOutIcon className="size-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="min-w-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

## Uso no Layout

```tsx
// app/(admin)/layout.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/server";
import { AdminShell } from "@/components/admin-shell/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || !session.user.isAdmin) {
    redirect("/sign-in");
  }

  return (
    <AdminShell
      user={{
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    >
      {children}
    </AdminShell>
  );
}
```

## Adicionando Novas Rotas

### 1. Adicionar ao nav-config.ts

```tsx
// nav-config.ts
import { StarIcon } from "@phosphor-icons/react";

export const mainNavItems: NavItem[] = [
  // ... itens existentes
  {
    title: "Nova Rota",
    href: "/nova-rota",
    icon: StarIcon,
    disabled: true,  // Comece desabilitado se não implementado
  },
];
```

### 2. Criar a Rota

```
app/(admin)/nova-rota/
├── page.tsx
└── _components/
    └── ...
```

### 3. Habilitar Quando Pronto

```tsx
{
  title: "Nova Rota",
  href: "/nova-rota",
  icon: StarIcon,
  // disabled: true,  // Remover para habilitar
}
```

## Padrões de Ícones

Use ícones do `@phosphor-icons/react` que representem visualmente a funcionalidade:

| Funcionalidade | Ícone Sugerido |
|----------------|----------------|
| Dashboard | `SquaresFourIcon` |
| Usuários | `UsersIcon` |
| Compras/Pagamentos | `ShoppingCartIcon`, `CreditCardIcon` |
| Configurações | `GearIcon`, `GearSixIcon` |
| Relatórios | `ChartBarIcon`, `ChartPieIcon` |
| Documentos | `FileTextIcon`, `FilesIcon` |
| Educação | `BookOpenIcon`, `GraduationCapIcon` |
| Mensagens | `ChatCircleIcon`, `EnvelopeIcon` |
| Calendário | `CalendarIcon` |
| Notificações | `BellIcon` |

Nomes com sufixo `Icon` são o padrão na v3.x e também existem no Phosphor da v2.x; os nomes
sem sufixo (`Users`, `Gear`) estão `@deprecated` no Phosphor 2.1.10.

## Convenções

1. **Ordenação**: Itens mais usados primeiro
2. **Agrupamento**: Use `secondaryNavItems` para itens menos frequentes
3. **Desabilitados**: Features futuras com `disabled: true`
4. **Tooltips**: Automáticos em icon mode via prop `tooltip`
5. **Estado Ativo**: Match por `startsWith` (não exato por padrão)
6. **Ícones**: Sempre `size-4` para consistência

## v3.x — Base UI

O `AdminShell` acima já está na v3.x: `render` nos `SidebarMenuButton` e no
`DropdownMenuTrigger`, `data-popup-open:` para o trigger aberto, `onClick` no item de sair e
`DropdownMenuLabel` dentro de `DropdownMenuGroup`. Como o `SidebarProvider` não traz mais
`TooltipProvider`, envolva o shell em `<TooltipProvider delay={0}>` (de
`@blips/ui/components/tooltip`) se quiser os tooltips do modo ícone abrindo na hora.

## v2.x — Radix

Trocas no `AdminShell` para um repo v2.x:

```tsx
{/* Header */}
<SidebarMenuButton size="lg" asChild>
  <Link href="/users">{/* logo + nome */}</Link>
</SidebarMenuButton>

{/* Itens */}
<SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
  <Link href={item.href}>
    <item.icon className="size-4" />
    <span>{item.title}</span>
  </Link>
</SidebarMenuButton>

{/* Footer com usuário */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      {/* avatar + nome + DotsThreeVertical */}
    </SidebarMenuButton>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" side="top" align="end" sideOffset={8}>
    <DropdownMenuLabel className="font-normal">{/* nome + email */}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={handleSignOut} variant="destructive">
      <SignOut className="size-4" />
      Sair
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

- `DropdownMenuLabel` pode ficar solto (sem `DropdownMenuGroup`).
- `onClick` no `DropdownMenuItem` também funciona na v2.x, mas `onSelect` é o evento do Radix
  (dispara por teclado e mouse).
- O `SidebarProvider` já fornece `TooltipProvider delayDuration={0}`.

