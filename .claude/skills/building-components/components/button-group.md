# ButtonGroup

**Categoria:** Composition
**Dependências:** `@radix-ui/react-slot`, `class-variance-authority`, `@/components/separator`
**"use client":** Não

## Source

```tsx
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/separator"

const buttonGroupVariants = cva(
  "inline-flex items-center [&>*:not(:first-child):not(:last-child)]:rounded-none",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none",
        vertical: "flex-col [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

function ButtonGroup({
  className, orientation = "horizontal", asChild = false, ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return <Comp role="group" className={cn(buttonGroupVariants({ orientation }), className)} {...props} />
}

function ButtonGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("px-2 text-sm text-muted-foreground", className)} {...props} />
}

function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator orientation={orientation} className={cn("h-auto", className)} {...props} />
}

export { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants }
```

## Uso

```tsx
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "@blips/ui"

// Horizontal
<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>

// Vertical
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>

// Com separador (split button)
<ButtonGroup>
  <Button>Primary</Button>
  <ButtonGroupSeparator />
  <Button size="icon"><ChevronDown /></Button>
</ButtonGroup>
```
