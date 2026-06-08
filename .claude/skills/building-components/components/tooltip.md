# Tooltip

**Categoria:** Compound | **Deps:** `@radix-ui/react-tooltip` | **"use client":** Sim

## Exports
Tooltip, TooltipTrigger, TooltipContent, TooltipProvider

## Features
TooltipProvider should wrap the app. TooltipContent: `z-50 rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md`, sideOffset=4

## Usage

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@blips/ui"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline" size="icon"><PlusIcon /></Button></TooltipTrigger>
    <TooltipContent><p>Add new item</p></TooltipContent>
  </Tooltip>
</TooltipProvider>

// Custom side
<TooltipContent side="right">Right tooltip</TooltipContent>
```
