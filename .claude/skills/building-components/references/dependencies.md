# Dependencies — Dependências Externas

Guia de quando e como usar cada dependência externa nos componentes.

---

## Dependências Core (sempre disponíveis)

### clsx + tailwind-merge → `cn()`

```tsx
import { cn } from "@/lib/utils"

// Merge de classes com resolução de conflitos Tailwind
cn("px-4 py-2", "px-6") // → "px-6 py-2"
cn("bg-primary", condition && "bg-destructive") // condicional
cn(variants({ variant, size }), className) // com cva
```

**Quando usar:** Em TODO componente para className merging.

### class-variance-authority

```tsx
import { cva, type VariantProps } from "class-variance-authority"
```

**Quando usar:** Quando um componente tem 2+ variantes visuais discretas (variant, size, side, orientation).

**Quando NÃO usar:** Para um componente sem variantes (Card, Table, Input).

### @radix-ui/react-slot

```tsx
import { Slot } from "@radix-ui/react-slot"
```

**Quando usar:** Para implementar o padrão `asChild` (polimorfismo de elemento).

**Quando NÃO usar:** Se o componente não precisa trocar seu elemento raiz.

---

## Radix UI Primitives

Cada componente usa o primitive específico da sua categoria:

| Pacote | Usado em |
|---|---|
| `@radix-ui/react-accordion` | Accordion |
| `@radix-ui/react-alert-dialog` | AlertDialog |
| `@radix-ui/react-aspect-ratio` | AspectRatio |
| `@radix-ui/react-avatar` | Avatar |
| `@radix-ui/react-checkbox` | Checkbox |
| `@radix-ui/react-collapsible` | Collapsible |
| `@radix-ui/react-context-menu` | ContextMenu |
| `@radix-ui/react-dialog` | Dialog, Sheet |
| `@radix-ui/react-dropdown-menu` | DropdownMenu |
| `@radix-ui/react-hover-card` | HoverCard |
| `@radix-ui/react-label` | Label, Form |
| `@radix-ui/react-menubar` | Menubar |
| `@radix-ui/react-navigation-menu` | NavigationMenu |
| `@radix-ui/react-popover` | Popover |
| `@radix-ui/react-progress` | Progress |
| `@radix-ui/react-radio-group` | RadioGroup |
| `@radix-ui/react-scroll-area` | ScrollArea |
| `@radix-ui/react-select` | Select |
| `@radix-ui/react-separator` | Separator |
| `@radix-ui/react-slider` | Slider |
| `@radix-ui/react-slot` | Button, BreadcrumbLink, ButtonGroup, Sidebar, Form |
| `@radix-ui/react-switch` | Switch |
| `@radix-ui/react-tabs` | Tabs |
| `@radix-ui/react-toggle` | Toggle |
| `@radix-ui/react-toggle-group` | ToggleGroup |
| `@radix-ui/react-tooltip` | Tooltip, Sidebar |

**Quando usar Radix:** Para comportamento interativo acessível (disclosure, toggle, selection, overlay). Radix cuida de keyboard nav, focus management, aria attributes.

**Quando NÃO usar Radix:** Para componentes puramente visuais sem interação complexa (Card, Table, Badge, Skeleton).

---

## Terceiros (Non-Radix)

### @phosphor-icons/react

```tsx
import { CaretDown, X, MagnifyingGlass, Check, Circle } from "@phosphor-icons/react"
```

**Quando usar:** Para ícones em componentes. É a única biblioteca de ícones permitida.

**Ícones mais usados na lib:**
- `X` — close buttons (Dialog, Sheet)
- `CaretDown` — triggers/selects (Accordion, Select, NavigationMenu)
- `ChevronRight` — sub-menus, breadcrumbs
- `CaretLeft` / `ChevronRight` — navigation (Calendar, Pagination, Carousel)
- `Check` — checkboxes, selected items (Checkbox, Select, DropdownMenu)
- `Circle` — radio indicators
- `DotsThree` — overflow/ellipsis (Breadcrumb)
- `MagnifyingGlass` — search input (Command)
- `SidebarSimple` — sidebar trigger
- `DotsSixVertical` — resize handle
- `ArrowLeft` / `ArrowRight` — carousel
- `CircleNotch` — spinner (Spinner)

**Convenção de tamanho:** `className="h-4 w-4"` ou uso do global `[&_svg]:size-4`

### cmdk

```tsx
import { Command as CommandPrimitive } from "cmdk"
```

**Usado em:** `Command` (palette de comandos)

**Quando usar:** Para implementar command palettes, search com filtering.

### vaul

```tsx
import { Drawer as DrawerPrimitive } from "vaul"
```

**Usado em:** `Drawer`

**Quando usar:** Para drawers bottom-sheet com gesture support.

### embla-carousel-react

```tsx
import useEmblaCarousel from "embla-carousel-react"
```

**Usado em:** `Carousel`

**Quando usar:** Para carrosséis com snap, drag, e plugins extensíveis.

### react-day-picker

```tsx
import { DayPicker } from "react-day-picker"
```

**Usado em:** `Calendar`

**Quando usar:** Para seletores de data com suporte a ranges, disabled dates, etc.

### react-hook-form

```tsx
import { Controller, FormProvider, useFormContext } from "react-hook-form"
```

**Usado em:** `Form`

**Quando usar:** Para formulários com validação, estados de campo, e error handling.

### input-otp

```tsx
import { OTPInput, OTPInputContext } from "input-otp"
```

**Usado em:** `InputOTP`

**Quando usar:** Para inputs de código de verificação (OTP, PIN).

### recharts

```tsx
import * as RechartsPrimitive from "recharts"
```

**Usado em:** `Chart`

**Quando usar:** Para gráficos e visualizações de dados.

### sonner

```tsx
import { Toaster as Sonner } from "sonner"
```

**Usado em:** `Sonner (Toaster)`

**Quando usar:** Para notificações toast.

### next-themes

```tsx
import { useTheme } from "next-themes"
```

**Usado em:** `Sonner (Toaster)`

**Quando usar:** Para integrar com theme switching (dark/light mode).

### react-resizable-panels

```tsx
import * as ResizablePrimitive from "react-resizable-panels"
```

**Usado em:** `Resizable`

**Quando usar:** Para painéis redimensionáveis com drag.

---

## Externais no tsup.config.ts

Dependências marcadas como `external` no build (não são bundladas):

```ts
external: [
  "react",
  "react-dom",
  "next-themes",
  /^@radix-ui\/.*/,
  "cmdk",
  "sonner",
  "vaul",
  "embla-carousel-react",
  "react-day-picker",
  "react-resizable-panels",
  "input-otp",
  "@phosphor-icons/react",
]
```

**Regra:** Toda nova dependência de terceiros que o consumidor precisa instalar DEVE ser adicionada a esta lista de externais.

---

## Adicionando uma Nova Dependência

1. Instalar no package `@blips/ui`:
   ```bash
   cd packages/ui && pnpm add <dependency>
   ```

2. Se for peer dependency do consumidor, adicionar em `peerDependencies` do `package.json`

3. Adicionar à lista de `external` no `tsup.config.ts`

4. Documentar neste arquivo com:
   - Import pattern
   - Componente que a usa
   - Quando usar / quando NÃO usar
