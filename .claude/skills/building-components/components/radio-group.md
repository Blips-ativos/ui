# RadioGroup
**Categoria:** Compound | **Deps:** `@radix-ui/react-radio-group`, `@phosphor-icons/react` | **"use client":** Não

Exports: RadioGroup, RadioGroupItem

Uso:
```tsx
import { RadioGroup, RadioGroupItem } from "@blips/ui"

<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Opção 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Opção 2</Label>
  </div>
</RadioGroup>
```
