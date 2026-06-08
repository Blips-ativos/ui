# Patterns — Padrões Cross-Cutting

Padrões reutilizáveis que aparecem em múltiplas categorias de componentes.

---

## 1. forwardRef Pattern

Usado em ~40 dos 52 componentes. É o padrão dominante.

### Para elementos HTML nativos

```tsx
const Component = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("classes", className)} {...props} />
))
Component.displayName = "Component"
```

### Para Radix primitives

```tsx
const Component = React.forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  React.ComponentPropsWithoutRef<typeof Primitive.Root>
>(({ className, ...props }, ref) => (
  <Primitive.Root ref={ref} className={cn("classes", className)} {...props} />
))
Component.displayName = Primitive.Root.displayName
```

### Para componentes internos (wrapping)

```tsx
const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => (
  <Input ref={ref} className={cn("override-classes", className)} {...props} />
))
SidebarInput.displayName = "SidebarInput"
```

### Exceções que NÃO usam forwardRef

- `Badge` — plain function, renderiza `<div>`
- `Skeleton` — plain function, renderiza `<div>`
- `Spinner` — plain function, renderiza `Loader2Icon`
- `Kbd` / `KbdGroup` — plain functions
- `InputGroup*` — plain functions
- Dialog/Sheet Header/Footer — plain functions (layout-only)
- Resizable components — delegam ao `react-resizable-panels`

---

## 2. CVA (Class Variance Authority) Pattern

Usado quando um componente tem variações visuais discretas.

### Setup básico

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const componentVariants = cva(
  // Base classes — aplicadas sempre
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      // Cada variant key = uma prop do componente
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Valores padrão quando as props não são passadas
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Na interface de Props

```tsx
export interface ComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof componentVariants> {
  // Props adicionais custom
  asChild?: boolean
}
```

### No JSX

```tsx
<Comp className={cn(componentVariants({ variant, size, className }))} />
```

### Reuso entre componentes

Variantes exportadas podem ser usadas em outros componentes:

```tsx
// Em alert-dialog.tsx
import { buttonVariants } from "@/components/button"

// AlertDialogAction usa buttonVariants() para parecer um button
className={cn(buttonVariants(), className)}

// AlertDialogCancel usa variant outline
className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
```

```tsx
// Em pagination.tsx
import { buttonVariants } from "@/components/button"

// PaginationLink usa buttonVariants baseado em isActive
className={cn(
  buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
  className
)}
```

### Componentes que usam CVA

| Componente | Nome das Variantes | Variants |
|---|---|---|
| Button | `buttonVariants` | variant (6), size (4) |
| Badge | `badgeVariants` | variant (4) |
| Alert | `alertVariants` | variant (2) |
| Toggle | `toggleVariants` | variant (2), size (3) |
| Sheet | `sheetVariants` | side (4) |
| ButtonGroup | `buttonGroupVariants` | orientation (2) |
| InputGroupAddon | `inputGroupAddonVariants` | align (4) |
| InputGroupButton | `inputGroupButtonVariants` | size (4) |
| Sidebar MenuButton | `sidebarMenuButtonVariants` | variant (2), size (3) |
| NavigationMenu | `navigationMenuTriggerStyle` | (no variants, base only) |
| Label | `labelVariants` | (no variants, base only) |

---

## 3. asChild / Radix Slot Pattern

Permite que o consumidor substitua o elemento renderizado.

```tsx
import { Slot } from "@radix-ui/react-slot"

interface Props {
  asChild?: boolean
}

const Component = React.forwardRef<HTMLButtonElement, Props & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref} {...props} />
  }
)
```

**Uso pelo consumidor:**

```tsx
// Renderiza <button>
<Button>Click</Button>

// Renderiza <a> com estilos do Button
<Button asChild>
  <a href="/about">About</a>
</Button>

// Com Next.js Link
<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

**Componentes que suportam asChild:**
- `Button`
- `ButtonGroup`
- `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuSubButton`
- `BreadcrumbLink`

---

## 4. React Context Pattern

Para componentes que precisam compartilhar estado entre sub-componentes.

### Setup

```tsx
"use client"

// 1. Tipo
type ContextProps = { value: string; onChange: (v: string) => void }

// 2. Contexto com null
const MyContext = React.createContext<ContextProps | null>(null)

// 3. Hook com guard
function useMyContext() {
  const ctx = React.useContext(MyContext)
  if (!ctx) throw new Error("useMyContext must be used within <MyProvider>")
  return ctx
}

// 4. Provider
const Provider = ({ children, ...props }) => {
  const contextValue = React.useMemo(() => ({ ... }), [deps])
  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
}
```

**Componentes que usam Context:**
| Componente | Context | Hook |
|---|---|---|
| Sidebar | `SidebarContext` | `useSidebar()` |
| Form | `FormFieldContext` + `FormItemContext` | `useFormField()` |
| Chart | `ChartContext` | `useChart()` |
| Carousel | `CarouselContext` | `useCarousel()` |
| ToggleGroup | `ToggleGroupContext` | (internal) |

---

## 5. Radix Primitives Pattern

Wrapping de Radix UI primitives com estilos Tailwind.

### Alias direto (sem styling)

```tsx
const Component = PrimitiveName.Root
const ComponentTrigger = PrimitiveName.Trigger
```

Usado para: `Dialog`, `Tooltip`, `Collapsible`, `Tabs` (Root)

### Styled wrapper

```tsx
const ComponentContent = React.forwardRef<
  React.ElementRef<typeof PrimitiveName.Content>,
  React.ComponentPropsWithoutRef<typeof PrimitiveName.Content>
>(({ className, ...props }, ref) => (
  <PrimitiveName.Content
    ref={ref}
    className={cn("tailwind-classes", className)}
    {...props}
  />
))
```

### Com Portal embutido

```tsx
const ComponentContent = React.forwardRef<...>(
  ({ className, ...props }, ref) => (
    <PrimitiveName.Portal>
      <PrimitiveName.Overlay className="overlay-classes" />
      <PrimitiveName.Content ref={ref} className={cn("classes", className)} {...props}>
        {children}
        <PrimitiveName.Close className="close-button-classes">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </PrimitiveName.Close>
      </PrimitiveName.Content>
    </PrimitiveName.Portal>
  )
)
```

Usado em: `Dialog`, `Sheet`, `AlertDialog`

### inset pattern (menus)

Prop `inset` para alinhar items com checkbox/radio indicators:

```tsx
const MenuItem = React.forwardRef<...>(
  ({ className, inset, ...props }, ref) => (
    <Primitive.Item
      ref={ref}
      className={cn("base-classes", inset && "pl-8", className)}
      {...props}
    />
  )
)
```

Usado em: `DropdownMenu`, `ContextMenu`, `Menubar`

---

## 6. Data Attributes Pattern

Componentes usam `data-*` attributes para styling condicional e identificação.

### data-slot (identificação)

```tsx
<div data-slot="input-group" />
<div data-slot="input-group-addon" />
<div data-slot="input-group-control" />
<div data-sidebar="header" />
<div data-sidebar="menu-button" />
```

### data-state (Radix states)

```tsx
// Styling baseado em estado
"data-[state=open]:animate-in"
"data-[state=closed]:animate-out"
"data-[state=checked]:bg-primary"
"data-[state=active]:bg-background"
"data-[state=on]:bg-accent"
```

### data-* custom

```tsx
// Sidebar
data-state={state}       // "expanded" | "collapsed"
data-collapsible={...}   // "offcanvas" | "icon" | ""
data-variant={variant}   // "sidebar" | "floating" | "inset"
data-side={side}         // "left" | "right"
data-active={isActive}   // true | false
data-size={size}         // "default" | "sm" | "lg"
data-mobile="true"       // mobile sidebar
```

### CSS targeting via data attributes

```tsx
// Tailwind arbitrary selectors com data attributes
"group-data-[collapsible=icon]:hidden"
"group-data-[collapsible=icon]:!size-8"
"peer-data-[active=true]/menu-button:text-sidebar-accent-foreground"
"group-data-[side=left]:-right-4"
"group-data-[variant=floating]:rounded-lg"
```

---

## 7. CSS :has() Pattern

Usado no InputGroup para styling reativo baseado nos filhos.

```tsx
// O grupo reage à presença de addons
"has-[>[data-align=inline-start]]:[&>input]:pl-2"
"has-[>[data-align=block-start]]:flex-col"

// O grupo reage ao foco do input
"has-[[data-slot=input-group-control]:focus-visible]:ring-ring"

// O grupo reage a erro do input
"has-[[data-slot][aria-invalid=true]]:border-destructive"
```

---

## 8. Animation Pattern

### Radix open/close animations

```tsx
// Overlay
"data-[state=open]:animate-in data-[state=closed]:animate-out"
"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"

// Content
"data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
"data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
"data-[state=open]:slide-in-from-left-1/2"
"data-[state=closed]:slide-out-to-left-1/2"
```

### Sheet side animations

```tsx
// right (default)
"data-[state=open]:slide-in-from-right"
"data-[state=closed]:slide-out-to-right"

// left
"data-[state=open]:slide-in-from-left"
"data-[state=closed]:slide-out-to-left"

// top
"data-[state=open]:slide-in-from-top"
"data-[state=closed]:slide-out-to-top"

// bottom
"data-[state=open]:slide-in-from-bottom"
"data-[state=closed]:slide-out-to-bottom"
```

### Transition (non-animated)

```tsx
// Sidebar width transition
"transition-[width] duration-200 ease-linear"
"transition-[left,right,width] duration-200 ease-linear"

// Accordion chevron
"transition-transform duration-200"

// General
"transition-colors"
"transition-opacity"
"transition-transform"
```

---

## 9. Responsive Pattern

### Text size

```tsx
// Input: text-base no mobile, text-sm no desktop
"text-base md:text-sm"
```

### Visibility

```tsx
// Sidebar: hidden no mobile
"hidden md:flex"
"hidden md:block"
```

### Layout

```tsx
// Dialog footer: coluna no mobile, row no desktop
"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"

// Dialog header: center no mobile, left no desktop
"text-center sm:text-left"
```

### Hit area

```tsx
// Sidebar actions: larger hit area no mobile
"after:absolute after:-inset-2 after:md:hidden"
```
