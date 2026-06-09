# Collapsible

Import: `@blips/ui/components/collapsible`

## Sub-components

| Export | Description |
|--------|-------------|
| `Collapsible` | Root component. Direct re-export of `@radix-ui/react-collapsible` Root. Controls open/close state. |
| `CollapsibleTrigger` | Trigger button. Direct re-export of Radix CollapsibleTrigger. Toggles the collapsible open/closed. |
| `CollapsibleContent` | Animated content area. Direct re-export of Radix CollapsibleContent. Hidden when collapsed, shown when open. |

## Props & Variants

### Collapsible (Root) Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | -- | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial open state |
| `onOpenChange` | `(open: boolean) => void` | -- | Called when open state changes |
| `disabled` | `boolean` | `false` | Prevent interaction |
| `asChild` | `boolean` | `false` | Merge props onto child element |

### CollapsibleTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto child element (commonly used with Button) |

### CollapsibleContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `forceMount` | `boolean` | -- | Force mount content even when closed (for animation control) |
| `asChild` | `boolean` | `false` | Merge props onto child element |

### Data Attributes

| Attribute | On | Values |
|-----------|-----|--------|
| `data-state` | Trigger, Content | `"open"` \| `"closed"` |
| `data-disabled` | Trigger | present when disabled |

### CSS Variables (on CollapsibleContent)

| Variable | Description |
|----------|-------------|
| `--radix-collapsible-content-height` | Height of content for animation |
| `--radix-collapsible-content-width` | Width of content for animation |

## Dependencies

- `@radix-ui/react-collapsible`

## Usage

### Basic Collapsible

```tsx
"use client"

import * as React from "react"
import { CaretUpDown } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible"

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <CaretUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

### Animated Collapsible (with Tailwind)

```tsx
<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
  {/* content */}
</CollapsibleContent>
```

Use the CSS variables `--radix-collapsible-content-height` and `--radix-collapsible-content-width` in custom keyframe animations for smooth height/width transitions.

## All Examples

- `collapsible-demo` -- Repository list with toggle button

## Project Notes

- This is a thin re-export of Radix primitives with no custom styling. All styling is applied at the usage site.
- Commonly used in the sidebar component for collapsible navigation sections.
