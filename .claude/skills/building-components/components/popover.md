# Popover
**Categoria:** Compound | **Deps:** `@radix-ui/react-popover` | **"use client":** Não

Exports: Popover, PopoverTrigger, PopoverContent

PopoverContent: `z-50 w-72 rounded-md border bg-popover p-4 shadow-md`, align="center", sideOffset=4

Usage:
```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@blips/ui"

<Popover>
  <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium">Dimensions</h4>
      <Input placeholder="Width" />
    </div>
  </PopoverContent>
</Popover>
```
