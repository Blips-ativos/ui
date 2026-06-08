# Toggle

**Categoria:** Primitive | **Deps:** `@radix-ui/react-toggle`, `class-variance-authority` | **"use client":** Não

## Exports
Toggle, toggleVariants

## Props & Variants
**Variants:** variant (default, outline), size (default h-10, sm h-9, lg h-11)

## Uso

```tsx
import { Toggle } from "@blips/ui"

<Toggle aria-label="Toggle bold"><Bold /></Toggle>
<Toggle variant="outline"><Italic /></Toggle>
<Toggle pressed={isBold} onPressedChange={setIsBold}>B</Toggle>
```

toggleVariants é exportado para reuso no ToggleGroup.
