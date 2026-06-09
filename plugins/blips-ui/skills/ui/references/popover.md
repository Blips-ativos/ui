# Popover

Import: `@blips/ui/components/popover`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `Popover` | `PopoverPrimitive.Root` | Root state container (open/close). Direct re-export. |
| `PopoverTrigger` | `PopoverPrimitive.Trigger` | Element that toggles the popover. Direct re-export. Supports `asChild`. |
| `PopoverContent` | `PopoverPrimitive.Content` | Floating panel rendered in a Portal. Animated with fade/zoom/slide. |
| `PopoverSection` | `<div>` | Optional section divider within popover content. Adds padding and bottom border. |

## Props & Variants

### Popover (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default open state |
| `modal` | `boolean` | `false` | Whether interaction outside closes the popover |

### PopoverTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merges props onto the child element instead of rendering a button |

### PopoverContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment relative to trigger |
| `sideOffset` | `number` | `4` | Distance from trigger in pixels |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side (Radix prop) |
| `className` | `string` | - | Additional CSS classes |

**Default styles:**
- `z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none`
- Transform origin: `origin-[--radix-popover-content-transform-origin]`
- When contains `PopoverSection`: `has-data-[slot=popover-section]:p-0` (removes default padding)
- Animated:
  - Open: `fade-in-0 zoom-in-95`
  - Close: `fade-out-0 zoom-out-95`
  - Slide based on side: `slide-in-from-top-2`, `slide-in-from-bottom-2`, etc.

### PopoverSection

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

**Default styles:**
- `border-b p-4 last:border-b-0`
- When used, parent `PopoverContent` padding is automatically removed (`has-data-[slot=popover-section]:p-0`)

## Usage

### Basic Popover with Form

```tsx
import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            defaultValue="100%"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Max. width</Label>
          <Input
            id="maxWidth"
            defaultValue="300px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            defaultValue="25px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxHeight">Max. height</Label>
          <Input
            id="maxHeight"
            defaultValue="none"
            className="col-span-2 h-8"
          />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### With Sections

```tsx
import {
  Popover,
  PopoverContent,
  PopoverSection,
  PopoverTrigger,
} from "@blips/ui/components/popover"
import { Button } from "@blips/ui/components/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Settings</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <PopoverSection>
      <h4 className="font-medium leading-none">General</h4>
      <p className="text-sm text-muted-foreground mt-1">
        Configure general settings.
      </p>
    </PopoverSection>
    <PopoverSection>
      <h4 className="font-medium leading-none">Advanced</h4>
      <p className="text-sm text-muted-foreground mt-1">
        Advanced configuration options.
      </p>
    </PopoverSection>
  </PopoverContent>
</Popover>
```

### Controlled Popover

```tsx
"use client"

import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"
import { Button } from "@blips/ui/components/button"

function ControlledPopover() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {open ? "Close" : "Open"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Controlled content</p>
        <Button size="sm" onClick={() => setOpen(false)}>
          Done
        </Button>
      </PopoverContent>
    </Popover>
  )
}
```

### Alignment Options

```tsx
{/* Aligned to start */}
<PopoverContent align="start">...</PopoverContent>

{/* Aligned to center (default) */}
<PopoverContent align="center">...</PopoverContent>

{/* Aligned to end */}
<PopoverContent align="end">...</PopoverContent>

{/* Custom side offset */}
<PopoverContent sideOffset={8}>...</PopoverContent>

{/* Open on a different side */}
<PopoverContent side="right">...</PopoverContent>
```

## Project Notes

- This project's Popover includes `PopoverSection` which is not in all shadcn versions -- useful for multi-section popover content with automatic border dividers and padding management.
- The component uses `forwardRef` pattern.

## All Examples

- `popover-demo` - Popover with form inputs for dimensions configuration

## All Example Variants

### popover-demo

```tsx
import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```
