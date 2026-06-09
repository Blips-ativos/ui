# Alert

**Categoria:** Primitive
**Dependências:** `class-variance-authority`
**"use client":** Não

## Source

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

## Exports

| Export | Tipo |
|---|---|
| `Alert` | Component (forwardRef) |
| `AlertTitle` | Component (forwardRef) |
| `AlertDescription` | Component (forwardRef) |

## Variantes

| Variant | Classes |
|---|---|
| `default` | `bg-background text-foreground` |
| `destructive` | `border-destructive/50 text-destructive` |

## Uso

```tsx
import { Alert, AlertTitle, AlertDescription } from "@blips/ui"
import { Terminal, WarningCircle } from "@phosphor-icons/react"

// Default
<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Atenção!</AlertTitle>
  <AlertDescription>Você pode adicionar componentes usando a CLI.</AlertDescription>
</Alert>

// Destructive
<Alert variant="destructive">
  <WarningCircle className="h-4 w-4" />
  <AlertTitle>Erro</AlertTitle>
  <AlertDescription>Sua sessão expirou.</AlertDescription>
</Alert>
```
