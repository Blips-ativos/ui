# Sheet

**Categoria:** Compound | **Deps:** `@radix-ui/react-dialog`, `class-variance-authority`, `lucide-react` | **"use client":** Sim

## Exports
Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription

sheetVariants via cva: side = `top` | `bottom` | `left` | `right` (default: `right`)

## Uso

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose } from "@blips/ui"

<Sheet>
  <SheetTrigger asChild><Button variant="outline">Abrir</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Configurações</SheetTitle>
      <SheetDescription>Gerencie suas preferências.</SheetDescription>
    </SheetHeader>
    <div className="py-4">Conteúdo</div>
    <SheetFooter>
      <SheetClose asChild><Button>Concluir</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>

// Lado esquerdo
<SheetContent side="left">...</SheetContent>
```
