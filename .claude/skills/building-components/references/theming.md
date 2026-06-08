# Theming — Tokens, CSS Variables e Dark Mode

---

## Arquitetura de Tema

A `@blips/ui` usa **Tailwind CSS v4** com configuração CSS-first via `@theme` blocks. Não existe `tailwind.config.ts` — toda configuração vive em CSS.

### Principais Diferenças do Tailwind v4

```css
/* Tailwind v4: theme via @theme blocks no CSS */
@import "tailwindcss";

@theme {
  --color-primary: hsl(240 5.9% 10%);
}

/* NÃO use tailwind.config.ts — não existe no projeto */
```

---

## Tokens de Cor Semânticos

Todos os componentes usam estes tokens. NUNCA usar cores Tailwind diretas (`bg-blue-500`).

### Light Theme (Default)

| Token | Valor | Uso |
|---|---|---|
| `background` | `hsl(0 0% 100%)` | Fundo principal da página |
| `foreground` | `hsl(240 10% 3.9%)` | Texto principal |
| `card` | `hsl(0 0% 100%)` | Fundo de cards |
| `card-foreground` | `hsl(240 10% 3.9%)` | Texto em cards |
| `popover` | `hsl(0 0% 100%)` | Fundo de popovers/dropdowns |
| `popover-foreground` | `hsl(240 10% 3.9%)` | Texto em popovers |
| `primary` | `hsl(240 5.9% 10%)` | Ações primárias, links |
| `primary-foreground` | `hsl(0 0% 98%)` | Texto sobre primary |
| `secondary` | `hsl(240 4.8% 95.9%)` | Ações secundárias |
| `secondary-foreground` | `hsl(240 5.9% 10%)` | Texto sobre secondary |
| `muted` | `hsl(240 4.8% 95.9%)` | Backgrounds sutis |
| `muted-foreground` | `hsl(240 3.8% 46.1%)` | Textos auxiliares |
| `accent` | `hsl(240 4.8% 95.9%)` | Highlights, hovers |
| `accent-foreground` | `hsl(240 5.9% 10%)` | Texto sobre accent |
| `destructive` | `hsl(0 84.2% 60.2%)` | Ações destrutivas |
| `destructive-foreground` | `hsl(0 0% 98%)` | Texto sobre destructive |
| `border` | `hsl(240 5.9% 90%)` | Bordas |
| `input` | `hsl(240 5.9% 90%)` | Bordas de inputs |
| `ring` | `hsl(240 5.9% 10%)` | Focus rings |

### Dark Theme

| Token | Valor |
|---|---|
| `background` | `hsl(240 10% 3.9%)` |
| `foreground` | `hsl(0 0% 98%)` |
| `primary` | `hsl(0 0% 98%)` |
| `primary-foreground` | `hsl(240 5.9% 10%)` |
| `secondary` | `hsl(240 3.7% 15.9%)` |
| `muted` | `hsl(240 3.7% 15.9%)` |
| `muted-foreground` | `hsl(240 5% 64.9%)` |
| `accent` | `hsl(240 3.7% 15.9%)` |
| `destructive` | `hsl(0 62.8% 30.6%)` |
| `border` | `hsl(240 3.7% 15.9%)` |
| `input` | `hsl(240 3.7% 15.9%)` |
| `ring` | `hsl(240 4.9% 83.9%)` |

### Border Radius

| Token | Valor |
|---|---|
| `--radius-sm` | `0.25rem` |
| `--radius-md` | `0.375rem` |
| `--radius-lg` | `0.5rem` |
| `--radius-xl` | `0.75rem` |

---

## Tokens de Sidebar

Tokens exclusivos do componente Sidebar, definidos via CSS custom properties:

### Light

```css
:root {
  --sidebar: hsl(0 0% 98%);
  --sidebar-foreground: hsl(240 5.3% 26.1%);
  --sidebar-primary: hsl(240 5.9% 10%);
  --sidebar-primary-foreground: hsl(0 0% 98%);
  --sidebar-accent: hsl(240 4.8% 95.9%);
  --sidebar-accent-foreground: hsl(240 5.9% 10%);
  --sidebar-border: hsl(220 13% 91%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}
```

### Dark

```css
.dark {
  --sidebar: hsl(240 5.9% 10%);
  --sidebar-foreground: hsl(240 4.8% 95.9%);
  --sidebar-primary: hsl(224.3 76.3% 48%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(240 3.7% 15.9%);
  --sidebar-accent-foreground: hsl(240 4.8% 95.9%);
  --sidebar-border: hsl(240 3.7% 15.9%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}
```

Mapeados para Tailwind via `@theme inline`:
```css
@theme inline {
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```

---

## Dark Mode

O projeto suporta dark mode via duas estratégias:

### 1. Media Query (automático)
```css
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: hsl(240 10% 3.9%);
    /* ... */
  }
}
```

### 2. Classe `.dark` (manual, via next-themes)
```css
@custom-variant dark (&:is(.dark *));
```

Ambas as estratégias coexistem. O `next-themes` gerencia a classe `.dark` no `<html>`.

---

## Como Usar Tokens em Novos Componentes

### Em Classes Tailwind

```tsx
// Background
className="bg-background"
className="bg-card"
className="bg-popover"
className="bg-primary"
className="bg-secondary"
className="bg-muted"
className="bg-accent"
className="bg-destructive"

// Texto
className="text-foreground"
className="text-muted-foreground"
className="text-primary-foreground"

// Bordas
className="border-border"
className="border-input"

// Focus
className="ring-ring"
className="focus-visible:ring-2 focus-visible:ring-ring"

// Opacidade
className="bg-primary/90"  // com hover
className="bg-black/80"    // overlays
```

### Padrões Comuns de Uso

```tsx
// Estado disabled universal
"disabled:pointer-events-none disabled:opacity-50"

// Focus ring padrão
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// Hover state
"hover:bg-accent hover:text-accent-foreground"

// Data state (Radix)
"data-[state=open]:animate-in data-[state=closed]:animate-out"
"data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
"data-[state=active]:bg-background data-[state=active]:text-foreground"

// SVG sizing global
"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
```

---

## Tailwind Config Exportado

O pacote `@blips/tailwind-config` exporta `blipsTheme` para uso em projetos consumidores:

```ts
import { blipsTheme, type BlipsTheme } from "@blips/tailwind-config"
```

Mapeia os CSS variables para tokens Tailwind:
```ts
{
  colors: {
    background: "var(--color-background)",
    foreground: "var(--color-foreground)",
    card: { DEFAULT: "var(--color-card)", foreground: "var(--color-card-foreground)" },
    // ... todos os tokens
  },
  borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  }
}
```

---

## Animações

Importadas via `tw-animate-css`:
```css
@import "tw-animate-css";
```

Animações disponíveis nos componentes:
- `animate-in` / `animate-out` — usado com Radix `data-[state=open/closed]`
- `fade-in-0` / `fade-out-0` — fade
- `zoom-in-95` / `zoom-out-95` — zoom sutil
- `slide-in-from-*` / `slide-out-to-*` — slides direcionais
- `animate-accordion-down` / `animate-accordion-up` — accordion
- `animate-pulse` — skeleton loading
- `animate-spin` — spinner
- `animate-caret-blink` — cursor do InputOTP

---

## Criando Novos Tokens

Se um componente novo precisar de tokens específicos (como o Sidebar):

1. Definir CSS variables em `:root` e `.dark` no globals.css
2. Mapear para Tailwind via `@theme inline`
3. Documentar os tokens neste arquivo

```css
/* 1. No globals.css */
:root {
  --new-component: hsl(0 0% 98%);
  --new-component-foreground: hsl(240 5.3% 26.1%);
}

.dark {
  --new-component: hsl(240 5.9% 10%);
  --new-component-foreground: hsl(240 4.8% 95.9%);
}

/* 2. Mapear */
@theme inline {
  --color-new-component: var(--new-component);
  --color-new-component-foreground: var(--new-component-foreground);
}
```

Então use no componente:
```tsx
className="bg-new-component text-new-component-foreground"
```
