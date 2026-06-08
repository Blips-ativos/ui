# ScrollArea
**Categoria:** Compound | **Deps:** `@radix-ui/react-scroll-area` | **"use client":** Não

Exports: ScrollArea, ScrollBar

ScrollArea auto-embeds ScrollBar and Corner.

Usage:
```tsx
import { ScrollArea, ScrollBar } from "@blips/ui"

// Vertical
<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">{items.map(item => <div key={item}>{item}</div>)}</div>
</ScrollArea>

// Horizontal
<ScrollArea className="w-96 whitespace-nowrap">
  <div className="flex gap-4 p-4">{items.map(item => <Card key={item}>...</Card>)}</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```
