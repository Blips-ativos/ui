# Primitives — Componentes Atômicos

Componentes com um único elemento raiz. São os blocos de construção mais básicos da UI.

---

## Padrão Base

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Component = React.forwardRef<HTMLElement, React.ComponentProps<"element">>(
  ({ className, ...props }, ref) => (
    <element ref={ref} className={cn("tailwind-classes", className)} {...props} />
  )
)
Component.displayName = "Component"

export { Component }
```

### Com Variantes (cva)

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", secondary: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})

export interface ComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean
}

const Component = React.forwardRef<HTMLButtonElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### Com Radix Primitive

```tsx
import * as React from "react"
import * as PrimitiveName from "@radix-ui/react-primitive-name"
import { cn } from "@/lib/utils"

const Component = React.forwardRef<
  React.ElementRef<typeof PrimitiveName.Root>,
  React.ComponentPropsWithoutRef<typeof PrimitiveName.Root>
>(({ className, ...props }, ref) => (
  <PrimitiveName.Root
    ref={ref}
    className={cn("tailwind-classes", className)}
    {...props}
  />
))
Component.displayName = PrimitiveName.Root.displayName

export { Component }
```

---

## Referência por Componente

### Button

O componente mais referenciado da lib. Usado como base em `AlertDialogAction`, `PaginationLink`, `Carousel`, `Sidebar`.

```tsx
import { Button } from "@blips/ui"
```

**Variantes:** `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
**Tamanhos:** `default` (h-10) | `sm` (h-9) | `lg` (h-11) | `icon` (h-10 w-10)

```tsx
// Básico
<Button>Click me</Button>

// Com variante e tamanho
<Button variant="destructive" size="lg">Delete</Button>

// Como link (asChild)
<Button asChild>
  <a href="/about">About</a>
</Button>

// Com ícone
<Button variant="outline" size="icon">
  <ChevronRight className="h-4 w-4" />
</Button>

// Ghost para ações sutis
<Button variant="ghost">Cancel</Button>

// Link style
<Button variant="link">Learn more</Button>
```

**Anatomia interna:**
- `buttonVariants` via `cva` — exportado para reuso
- `asChild` via `@radix-ui/react-slot`
- `forwardRef` para `HTMLButtonElement`
- Base: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium`
- SVG sizing automático: `[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`

---

### Input

Campo de entrada de texto. Sem variantes — estilização única.

```tsx
import { Input } from "@blips/ui"
```

```tsx
// Básico
<Input placeholder="Email" />

// Com tipo
<Input type="email" placeholder="name@example.com" />
<Input type="password" />
<Input type="file" />

// Disabled
<Input disabled placeholder="Disabled" />
```

**Anatomia interna:**
- `forwardRef` para `HTMLInputElement`
- Props: `React.ComponentProps<"input">`
- Base: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2`
- File input: `file:border-0 file:bg-transparent file:text-sm file:font-medium`
- Focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`
- Responsive text: `text-base md:text-sm`

---

### Textarea

Área de texto multi-linha. Mesma filosofia do Input.

```tsx
import { Textarea } from "@blips/ui"
```

```tsx
<Textarea placeholder="Your message..." />
<Textarea rows={6} className="resize-none" />
```

**Anatomia interna:**
- `forwardRef` para `HTMLTextAreaElement`
- Base: `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2`

---

### Label

Label acessível baseado em Radix.

```tsx
import { Label } from "@blips/ui"
```

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" />
```

**Anatomia interna:**
- Radix `@radix-ui/react-label`
- `cva` com base: `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`
- `"use client"` obrigatório

---

### Badge

Indicador visual de status ou categoria. Sem `forwardRef` (exceção).

```tsx
import { Badge } from "@blips/ui"
```

**Variantes:** `default` | `secondary` | `destructive` | `outline`

```tsx
<Badge>New</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">v1.0</Badge>
```

**Anatomia interna:**
- `cva` sem `forwardRef` — renderiza `<div>`
- Base: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold`
- `badgeVariants` exportado

---

### Separator

Linha divisória horizontal ou vertical.

```tsx
import { Separator } from "@blips/ui"
```

```tsx
// Horizontal (default)
<Separator />

// Vertical
<Separator orientation="vertical" className="h-4" />

// Em layout
<div className="flex items-center gap-4">
  <span>Item 1</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Item 2</span>
</div>
```

**Anatomia interna:**
- Radix `@radix-ui/react-separator`
- Defaults: `orientation="horizontal"`, `decorative={true}`
- Base horizontal: `h-[1px] w-full`
- Base vertical: `h-full w-[1px]`
- Cor: `shrink-0 bg-border`

---

### Skeleton

Placeholder de carregamento com animação pulse.

```tsx
import { Skeleton } from "@blips/ui"
```

```tsx
// Texto
<Skeleton className="h-4 w-[250px]" />

// Avatar circular
<Skeleton className="h-12 w-12 rounded-full" />

// Card skeleton
<div className="space-y-3">
  <Skeleton className="h-[125px] w-full rounded-xl" />
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

**Anatomia interna:**
- Sem `forwardRef` — plain function component
- Base: `animate-pulse rounded-md bg-muted`

---

### Spinner

Indicador de carregamento rotativo.

```tsx
import { Spinner } from "@blips/ui"
```

```tsx
<Spinner />
<Spinner className="size-8" />
```

**Anatomia interna:**
- Sem `forwardRef`
- Usa `Loader2Icon` do `@phosphor-icons/react`
- Base: `animate-spin`
- Acessibilidade: `role="status"`, `aria-label="Loading"`

---

### Kbd

Indicador de atalho de teclado.

```tsx
import { Kbd, KbdGroup } from "@blips/ui"
```

```tsx
// Individual
<Kbd>⌘</Kbd>

// Grupo (combinação)
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```

**Anatomia interna:**
- Sem `forwardRef`
- `data-slot="kbd"` / `data-slot="kbd-group"`
- Styling context-aware dentro de tooltips

---

### Checkbox

Toggle de seleção binária.

```tsx
import { Checkbox } from "@blips/ui"
```

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Checked por default
<Checkbox defaultChecked />

// Controlled
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

**Anatomia interna:**
- Radix `@radix-ui/react-checkbox`
- Ícone: `Check` do @phosphor-icons/react
- Layout: `grid place-content-center`
- Base: `h-4 w-4 shrink-0 rounded-sm border border-primary`
- Checked: `data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground`

---

### Switch

Toggle on/off.

```tsx
import { Switch } from "@blips/ui"
```

```tsx
<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Notifications</Label>
</div>

// Controlled
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

**Anatomia interna:**
- Radix `@radix-ui/react-switch`
- Track + Thumb pattern
- Track: `h-6 w-11 rounded-full` com `data-[state=checked]:bg-primary`
- Thumb: `size-5 rounded-full bg-background transition-transform`

---

### Slider

Controle de range/valor.

```tsx
import { Slider } from "@blips/ui"
```

```tsx
<Slider defaultValue={[50]} max={100} step={1} />

// Range
<Slider defaultValue={[25, 75]} max={100} step={5} />
```

**Anatomia interna:**
- Radix `@radix-ui/react-slider`
- Partes: Root > Track > Range + Thumb
- Track: `h-2 w-full rounded-full bg-secondary`
- Range: `absolute h-full bg-primary`
- Thumb: `block h-5 w-5 rounded-full border-2 border-primary bg-background`

---

### Progress

Barra de progresso.

```tsx
import { Progress } from "@blips/ui"
```

```tsx
<Progress value={60} />
<Progress value={100} />
```

**Anatomia interna:**
- Radix `@radix-ui/react-progress`
- `"use client"` obrigatório
- Container: `h-4 w-full overflow-hidden rounded-full bg-secondary`
- Indicator: `h-full bg-primary transition-all` com `translateX` baseado em `value`

---

### Toggle

Botão toggle de estado.

```tsx
import { Toggle } from "@blips/ui"
```

**Variantes:** `default` | `outline`
**Tamanhos:** `default` (h-10) | `sm` (h-9) | `lg` (h-11)

```tsx
<Toggle aria-label="Toggle bold">
  <TextB className="h-4 w-4" />
</Toggle>

<Toggle variant="outline">
  <TextItalic className="h-4 w-4" />
</Toggle>

// Controlled
<Toggle pressed={isBold} onPressedChange={setIsBold}>B</Toggle>
```

**Anatomia interna:**
- Radix `@radix-ui/react-toggle`
- `toggleVariants` via `cva` — exportado e reutilizado em `ToggleGroup`
- Base: `inline-flex items-center justify-center rounded-md text-sm font-medium`
- Pressed: `data-[state=on]:bg-accent data-[state=on]:text-accent-foreground`

---

### AspectRatio

Container com proporção fixa.

```tsx
import { AspectRatio } from "@blips/ui"
```

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="..." alt="..." className="rounded-md object-cover w-full h-full" />
</AspectRatio>
```

**Anatomia interna:**
- Re-export direto de `@radix-ui/react-aspect-ratio`
- Sem wrapper adicional
