# Popover
**Categoria:** Compound | **Deps:** `@radix-ui/react-popover` | **"use client":** Não

Exports: Popover, PopoverTrigger, PopoverContent

PopoverContent: `z-50 w-72 rounded-md border bg-popover p-4 shadow-md`, align="center", sideOffset=4

Uso:
```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@blips/ui"

<Popover>
  <PopoverTrigger asChild><Button variant="outline">Abrir</Button></PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium">Dimensões</h4>
      <Input placeholder="Largura" />
    </div>
  </PopoverContent>
</Popover>
```
