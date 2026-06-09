# ToggleGroup

**Categoria:** Compound | **Deps:** `@radix-ui/react-toggle-group`, `@/components/toggle` | **"use client":** Sim

## Exports
ToggleGroup, ToggleGroupItem

## Recursos
O contexto propaga variant/size para os itens.

## Uso

```tsx
import { ToggleGroup, ToggleGroupItem } from "@blips/ui"

// Single
<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>

// Múltiplo com outline
<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic">I</ToggleGroupItem>
</ToggleGroup>
```
