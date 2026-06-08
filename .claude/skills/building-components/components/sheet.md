# Sheet

**Categoria:** Compound | **Deps:** `@radix-ui/react-dialog`, `class-variance-authority`, `lucide-react` | **"use client":** Sim

## Exports
Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription

sheetVariants via cva: side = `top` | `bottom` | `left` | `right` (default: `right`)

## Usage

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose } from "@blips/ui"

<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Manage your preferences.</SheetDescription>
    </SheetHeader>
    <div className="py-4">Content</div>
    <SheetFooter>
      <SheetClose asChild><Button>Done</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>

// Left side
<SheetContent side="left">...</SheetContent>
```
