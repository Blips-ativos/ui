# Collapsible

**Categoria:** Compound
**Dependências:** `@radix-ui/react-collapsible`
**"use client":** Sim

## Source

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

## Uso

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@blips/ui"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Hidden content here</p>
  </CollapsibleContent>
</Collapsible>

// Controlled
<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  ...
</Collapsible>
```
