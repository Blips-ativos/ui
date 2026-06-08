# Button

**Categoria:** Primitive
**Dependências:** `@radix-ui/react-slot`, `class-variance-authority`
**"use client":** Não

## Source

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
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
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## Exports

| Export | Tipo |
|---|---|
| `Button` | Component (forwardRef) |
| `ButtonProps` | Interface (type) |
| `buttonVariants` | CVA function |

## Variantes

| variant | Descrição |
|---|---|
| `default` | Fundo primary |
| `destructive` | Vermelho/destructive |
| `outline` | Apenas borda |
| `secondary` | Fundo secondary |
| `ghost` | Transparente, accent no hover |
| `link` | Sublinhado no hover |

| size | Dimensões |
|---|---|
| `default` | h-10 px-4 |
| `sm` | h-9 px-3 |
| `lg` | h-11 px-8 |
| `icon` | h-10 w-10 |

## Uso

```tsx
import { Button } from "@blips/ui"

<Button>Clique aqui</Button>
<Button variant="destructive" size="lg">Excluir</Button>
<Button variant="outline" size="icon"><ChevronRight /></Button>
<Button variant="ghost">Cancelar</Button>
<Button variant="link">Saiba mais</Button>

// asChild (renderiza como link)
<Button asChild>
  <a href="/about">Sobre</a>
</Button>

// Com Next.js Link
<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>

// Estado de carregamento
<Button disabled>
  <Loader2 className="animate-spin" />
  Aguarde
</Button>
```
