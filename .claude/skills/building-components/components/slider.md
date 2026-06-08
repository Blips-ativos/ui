# Slider

**Categoria:** Primitive | **Deps:** `@radix-ui/react-slider` | **"use client":** Não

## Exports
Slider

## Uso

```tsx
import { Slider } from "@blips/ui"

<Slider defaultValue={[50]} max={100} step={1} />
<Slider defaultValue={[25, 75]} max={100} step={5} />  // Range
<Slider orientation="vertical" defaultValue={[50]} />
<Slider value={[volume]} onValueChange={([v]) => setVolume(v)} max={100} />
```
