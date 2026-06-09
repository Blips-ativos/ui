# Dialog

**Categoria:** Compound | **Deps:** `@radix-ui/react-dialog`, `@phosphor-icons/react` | **"use client":** Sim

## Exports

`Dialog`, `DialogPortal`, `DialogOverlay`, `DialogClose`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`

## Código-fonte

```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

## Uso

### Dialog básico

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@blips/ui"
import { Button } from "@blips/ui"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Abrir dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>
        Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input id="name" placeholder="Nome" />
      <Input id="email" placeholder="E-mail" />
    </div>
    <DialogFooter>
      <Button type="submit">Salvar alterações</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dialog controlado

```tsx
const [open, setOpen] = React.useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Tem certeza?</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={() => setOpen(false)}>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Props e Variantes

### Dialog
- `open`: boolean - Estado de abertura do dialog
- `onOpenChange`: (open: boolean) => void - Handler de mudança do estado de abertura
- `children`: ReactNode - Conteúdo do dialog

### DialogTrigger
- `children`: ReactNode - Elemento que dispara o dialog
- `asChild`: boolean - Mesclar com as props do componente filho
- `className`: string - Classes CSS customizadas

### DialogContent
- `children`: ReactNode - Conteúdo do dialog
- `className`: string - Classes CSS customizadas
- `side`: 'top' | 'right' | 'bottom' | 'left' - Posição do dialog

### DialogHeader
- `children`: ReactNode - Conteúdo do cabeçalho
- `className`: string - Classes CSS customizadas

### DialogFooter
- `children`: ReactNode - Conteúdo do rodapé
- `className`: string - Classes CSS customizadas

### DialogTitle
- `children`: ReactNode - Texto do título
- `className`: string - Classes CSS customizadas

### DialogDescription
- `children`: ReactNode - Texto da descrição
- `className`: string - Classes CSS customizadas

### DialogClose
- `children`: ReactNode - Conteúdo do botão de fechar
- `asChild`: boolean - Mesclar com as props do componente filho
- `className`: string - Classes CSS customizadas
