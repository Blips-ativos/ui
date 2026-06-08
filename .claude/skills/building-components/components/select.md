# Select

**Categoria:** Compound | **Deps:** `@radix-ui/react-select`, `lucide-react` | **"use client":** Sim

## Exports
Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton

SelectContent defaults to `position="popper"`.

## Usage

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectSeparator } from "@blips/ui"

<Select>
  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```
