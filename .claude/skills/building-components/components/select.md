# Select

**Categoria:** Compound | **Deps:** `@radix-ui/react-select`, `@phosphor-icons/react` | **"use client":** Sim

## Exports
Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton

O SelectContent usa `position="popper"` por padrão.

## Uso

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator } from "@blips/ui"

<Select>
  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Selecione uma fruta" /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Frutas</SelectLabel>
      <SelectItem value="apple">Maçã</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetais</SelectLabel>
      <SelectItem value="carrot">Cenoura</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```
