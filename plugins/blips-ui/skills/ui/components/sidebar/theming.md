# Theming da Sidebar

A sidebar usa variáveis CSS separadas do resto da aplicação, permitindo estilos independentes.

## Variáveis CSS

### Light Mode

```css
@layer base {
  :root {
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
  }
}
```

### Dark Mode

```css
@layer base {
  .dark {
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.439 0 0);
  }
}
```

## Descrição das Variáveis

| Variável | Descrição |
|----------|-----------|
| `--sidebar` | Cor de fundo da sidebar |
| `--sidebar-foreground` | Cor do texto padrão |
| `--sidebar-primary` | Cor primária (itens ativos, destaques) |
| `--sidebar-primary-foreground` | Texto sobre primary |
| `--sidebar-accent` | Cor de hover/accent |
| `--sidebar-accent-foreground` | Texto sobre accent |
| `--sidebar-border` | Cor das bordas |
| `--sidebar-ring` | Cor do focus ring |

## Uso nas Classes

As variáveis são aplicadas automaticamente nos componentes:

```tsx
// Exemplos de classes Tailwind que usam as variáveis
<div className="bg-sidebar" />              // --sidebar
<span className="text-sidebar-foreground" /> // --sidebar-foreground
<div className="bg-sidebar-accent" />        // --sidebar-accent
<div className="border-sidebar-border" />    // --sidebar-border
```

## Customização

### Sidebar Escura (mesmo em light mode)

```css
@layer base {
  :root {
    --sidebar: oklch(0.15 0 0);
    --sidebar-foreground: oklch(0.95 0 0);
    --sidebar-primary: oklch(0.6 0.2 250);
    --sidebar-primary-foreground: oklch(1 0 0);
    --sidebar-accent: oklch(0.2 0 0);
    --sidebar-accent-foreground: oklch(0.95 0 0);
    --sidebar-border: oklch(0.25 0 0);
    --sidebar-ring: oklch(0.5 0 0);
  }
}
```

### Sidebar com Cor de Marca

```css
@layer base {
  :root {
    /* Azul corporativo */
    --sidebar: oklch(0.25 0.05 250);
    --sidebar-foreground: oklch(0.95 0 0);
    --sidebar-primary: oklch(0.7 0.15 250);
    --sidebar-primary-foreground: oklch(0.1 0 0);
    --sidebar-accent: oklch(0.3 0.05 250);
    --sidebar-accent-foreground: oklch(0.95 0 0);
    --sidebar-border: oklch(0.35 0.05 250);
    --sidebar-ring: oklch(0.6 0.1 250);
  }
}
```

## Estilização Condicional

### Baseado no Estado Collapsible

```tsx
<Sidebar collapsible="icon">
  <SidebarContent>
    {/* Esconde grupo quando em icon mode */}
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Hidden when collapsed</SidebarGroupLabel>
    </SidebarGroup>

    {/* Sempre visível */}
    <SidebarGroup>
      <SidebarGroupLabel>Always visible</SidebarGroupLabel>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

### Baseado no Estado do Menu

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  {/* Visível apenas quando menu button está ativo */}
  <SidebarMenuAction
    className="peer-data-[active=true]/menu-button:opacity-100"
  />
</SidebarMenuItem>
```

### Baseado no Estado Open

```tsx
<SidebarMenuButton
  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
>
  Menu Item
</SidebarMenuButton>
```

## Largura da Sidebar

### Via Provider Style

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

### Via Constantes (sidebar.tsx)

```tsx
// Editar no componente sidebar.tsx
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
```

## Classes Utilitárias da Sidebar

```tsx
// Background
className="bg-sidebar"

// Texto
className="text-sidebar-foreground"
className="text-sidebar-primary"
className="text-sidebar-accent-foreground"

// Bordas
className="border-sidebar-border"

// Hover/Active
className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

// Focus
className="focus-visible:ring-sidebar-ring"
```

## Transições

A sidebar já inclui transições suaves para:
- Abertura/fechamento (offcanvas)
- Collapse para ícones
- Hover em itens de menu

Para customizar:

```css
/* Transição mais lenta */
[data-sidebar="sidebar"] {
  transition-duration: 300ms;
}

/* Sem transição */
[data-sidebar="sidebar"] {
  transition-duration: 0ms;
}
```

## Responsividade

A sidebar automaticamente:
- Usa sheet/offcanvas em mobile
- Fecha ao navegar em mobile
- Mantém estado em desktop

Classes para responsividade:

```tsx
// Esconder em mobile
<div className="hidden md:block">Desktop only</div>

// Mostrar apenas em mobile
<div className="md:hidden">Mobile only</div>

// Dentro da sidebar, usar isMobile do hook
const { isMobile } = useSidebar();
```

## Acessibilidade

Os componentes já incluem:
- `aria-label` em botões
- `role="navigation"` na sidebar
- Suporte a teclado (Tab, Enter, Escape)
- Focus trapping em mobile
- Atalho de teclado (`cmd+b`)

Para tooltips em icon mode:

```tsx
<SidebarMenuButton tooltip="Dashboard">
  <Home />
  <span>Dashboard</span>
</SidebarMenuButton>
```
