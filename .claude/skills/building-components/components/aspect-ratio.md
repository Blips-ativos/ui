# AspectRatio

**Categoria:** Primitive
**Dependências:** `@radix-ui/react-aspect-ratio`
**"use client":** Não

## Source

```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
```

## Uso

```tsx
import { AspectRatio } from "@blips/ui"

<AspectRatio ratio={16 / 9}>
  <img src="..." alt="..." className="rounded-md object-cover w-full h-full" />
</AspectRatio>

<AspectRatio ratio={1}>
  <img src="..." alt="..." className="rounded-full object-cover w-full h-full" />
</AspectRatio>
```

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `ratio` | `number` | `1` | Proporção largura/altura |
