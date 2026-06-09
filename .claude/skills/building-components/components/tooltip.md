# Tooltip

**Categoria:** Compound | **Deps:** `@radix-ui/react-tooltip` | **"use client":** Sim

## Exports
Tooltip, TooltipTrigger, TooltipContent, TooltipProvider

## Recursos
TooltipProvider deve envolver a aplicação. TooltipContent: `z-50 rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md`, sideOffset=4

## Uso

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@blips/ui"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline" size="icon"><PlusIcon /></Button></TooltipTrigger>
    <TooltipContent><p>Adicionar novo item</p></TooltipContent>
  </Tooltip>
</TooltipProvider>

// Lado customizado
<TooltipContent side="right">Tooltip à direita</TooltipContent>
```
