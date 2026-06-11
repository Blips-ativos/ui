# Componentes Base da Sidebar

## Table of Contents

- [SidebarProvider](#sidebarprovider)
- [Sidebar](#sidebar)
- [SidebarHeader](#sidebarheader)
- [SidebarFooter](#sidebarfooter)
- [SidebarContent](#sidebarcontent)
- [SidebarGroup](#sidebargroup)
- [SidebarSeparator](#sidebarseparator)
- [SidebarTrigger](#sidebartrigger)
- [SidebarRail](#sidebarrail)
- [SidebarInset](#sidebarinset)
- [useSidebar Hook](#usesidebar-hook)

## SidebarProvider

O `SidebarProvider` gerencia o estado collapsible da sidebar. Deve envolver toda a aplicação.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `defaultOpen` | `boolean` | Estado inicial (padrão: `true`) |
| `open` | `boolean` | Estado controlado |
| `onOpenChange` | `(open: boolean) => void` | Callback de mudança |

### Uso Básico

```tsx
import { SidebarProvider, SidebarTrigger } from "@blips/ui/components/sidebar";

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

### Estado Persistido (Next.js)

O provider persiste o estado via cookies automaticamente.

```tsx
// app/layout.tsx
import { cookies } from "next/headers";

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
```

### Customização de Largura

```tsx
<SidebarProvider
  style={{
    "--sidebar-width": "20rem",
    "--sidebar-width-mobile": "20rem",
  }}
>
  <Sidebar />
</SidebarProvider>
```

Variáveis padrão em `sidebar.tsx`:
```tsx
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
```

### Atalho de Teclado

Padrão: `cmd+b` (Mac) / `ctrl+b` (Windows)

```tsx
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
```

---

## Sidebar

Container principal da sidebar.

### Props

| Prop | Valores | Descrição |
|------|---------|-----------|
| `side` | `left`, `right` | Lado da sidebar |
| `variant` | `sidebar`, `floating`, `inset` | Estilo visual |
| `collapsible` | `offcanvas`, `icon`, `none` | Comportamento de collapse |

### Variantes

```tsx
// Sidebar padrão (à esquerda)
<Sidebar side="left" />

// Sidebar à direita
<Sidebar side="right" />

// Sidebar flutuante
<Sidebar variant="floating" />

// Sidebar inset (com SidebarInset obrigatório)
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

### Modos Collapsible

| Modo | Descrição |
|------|-----------|
| `offcanvas` | Desliza para fora da tela |
| `icon` | Colapsa para mostrar apenas ícones |
| `none` | Não é collapsible |

```tsx
// Colapsa para ícones
<Sidebar collapsible="icon">
  <SidebarContent>
    <SidebarGroup className="group-data-[collapsible=icon]:hidden" />
  </SidebarContent>
</Sidebar>
```

---

## SidebarHeader

Header sticky no topo da sidebar.

```tsx
<Sidebar>
  <SidebarHeader className="border-b border-sidebar-border">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PanelLeft className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">App Name</span>
              <span className="truncate text-xs text-muted-foreground">Admin</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
```

### Header com Dropdown

```tsx
<SidebarHeader>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            Select Workspace
            <ChevronDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
          <DropdownMenuItem>Workspace 1</DropdownMenuItem>
          <DropdownMenuItem>Workspace 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarHeader>
```

---

## SidebarFooter

Footer sticky no bottom da sidebar.

```tsx
<SidebarFooter className="border-t border-sidebar-border">
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size="lg">
            <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent">
              <span>JD</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">John Doe</span>
              <span className="truncate text-xs text-muted-foreground">john@example.com</span>
            </div>
            <MoreVertical className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end" sideOffset={8}>
          <DropdownMenuItem>Account</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>
```

---

## SidebarContent

Container scrollável para o conteúdo principal.

```tsx
<Sidebar>
  <SidebarContent>
    <SidebarGroup />
    <SidebarGroup />
  </SidebarContent>
</Sidebar>
```

---

## SidebarGroup

Seção dentro do SidebarContent.

```tsx
<SidebarGroup>
  <SidebarGroupLabel>Application</SidebarGroupLabel>
  <SidebarGroupAction title="Add Project">
    <Plus /> <span className="sr-only">Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent>
    <SidebarMenu>
      {/* Menu items */}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
```

### Group Collapsible

```tsx
<Collapsible defaultOpen className="group/collapsible">
  <SidebarGroup>
    <SidebarGroupLabel asChild>
      <CollapsibleTrigger>
        Help
        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </CollapsibleTrigger>
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent>
        {/* Content */}
      </SidebarGroupContent>
    </CollapsibleContent>
  </SidebarGroup>
</Collapsible>
```

---

## SidebarSeparator

Divisor visual entre seções.

```tsx
<Sidebar>
  <SidebarHeader />
  <SidebarSeparator />
  <SidebarContent>
    <SidebarGroup />
    <SidebarSeparator />
    <SidebarGroup />
  </SidebarContent>
</Sidebar>
```

---

## SidebarTrigger

Botão para toggle da sidebar. Deve estar dentro do SidebarProvider.

```tsx
<SidebarProvider>
  <Sidebar />
  <main>
    <SidebarTrigger />
    {children}
  </main>
</SidebarProvider>
```

### Trigger Customizado

```tsx
import { useSidebar } from "@blips/ui/components/sidebar";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();
  return <button onClick={toggleSidebar}>Toggle Sidebar</button>;
}
```

---

## SidebarRail

Rail clicável para toggle da sidebar.

```tsx
<Sidebar>
  <SidebarHeader />
  <SidebarContent />
  <SidebarFooter />
  <SidebarRail />
</Sidebar>
```

---

## SidebarInset

Container para o conteúdo principal quando usando `variant="inset"`.

```tsx
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset className="min-w-0 overflow-hidden">
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
    </header>
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </SidebarInset>
</SidebarProvider>
```

---

## useSidebar Hook

Hook para controle programático da sidebar.

```tsx
import { useSidebar } from "@blips/ui/components/sidebar";

export function Component() {
  const {
    state,          // "expanded" | "collapsed"
    open,           // boolean
    setOpen,        // (open: boolean) => void
    openMobile,     // boolean
    setOpenMobile,  // (open: boolean) => void
    isMobile,       // boolean
    toggleSidebar,  // () => void
  } = useSidebar();

  return (
    <div>
      <p>Estado: {state}</p>
      <button onClick={toggleSidebar}>Toggle</button>
    </div>
  );
}
```

### Sidebar Controlada

```tsx
export function AppSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar />
    </SidebarProvider>
  );
}
```
