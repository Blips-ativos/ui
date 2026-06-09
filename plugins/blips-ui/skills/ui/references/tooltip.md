# Tooltip

Import: `@blips/ui/components/tooltip`

## Sub-components

- **`TooltipProvider`** - Context provider that configures tooltip behavior for all tooltips within it. Wraps `@radix-ui/react-tooltip` Provider with customized defaults (`delayDuration=0`, `skipDelayDuration=0`).
- **`Tooltip`** - Root tooltip component (alias for `TooltipPrimitive.Root`). Manages open/close state for a single tooltip.
- **`TooltipTrigger`** - The element that triggers the tooltip on hover/focus (alias for `TooltipPrimitive.Trigger`).
- **`TooltipContent`** - The popup content that appears. Styled with border, background, shadow, and entry/exit animations.

## Props & Variants

### TooltipProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delayDuration` | `number` | `0` | Delay in ms before tooltip opens (project override, Radix default is 700) |
| `skipDelayDuration` | `number` | `0` | Delay before opening another tooltip after one was just open |
| `children` | `ReactNode` | **required** | Child elements |

### Tooltip (Root) Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `undefined` | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default open state |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback when open state changes |
| `delayDuration` | `number` | Inherited from Provider | Override delay for this tooltip |

### TooltipTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto child element instead of rendering a button |
| `children` | `ReactNode` | **required** | Trigger element |

### TooltipContent Props

Extends `React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sideOffset` | `number` | `4` | Distance from trigger in px |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Preferred side to render |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment relative to trigger |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | **required** | Tooltip content |

### TooltipContent Styles

```
z-50 origin-[--radix-tooltip-content-transform-origin]
overflow-hidden rounded-md border bg-popover px-3 py-1.5
text-popover-foreground text-sm shadow-md
```

### Animations

| Direction | Entry Animation |
|-----------|----------------|
| From top | `slide-in-from-bottom-2` |
| From bottom | `slide-in-from-top-2` |
| From left | `slide-in-from-right-2` |
| From right | `slide-in-from-left-2` |

All entries include `fade-in-0 zoom-in-95`. Exit: `fade-out-0 zoom-out-95`.

## Usage

### Basic Tooltip

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
```

### With Provider (Root Layout Setup)

The `TooltipProvider` should be placed in your root layout to configure all tooltips:

```tsx
import { TooltipProvider } from "@blips/ui/components/tooltip"

export default function RootLayout({ children }) {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  )
}
```

### Custom Side and Alignment

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export default function TooltipPositions() {
  return (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Top tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Right tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Bottom tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Left tooltip</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
```

### On Icon Button

```tsx
import { Plus } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export default function TooltipIconButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus />
          <span className="sr-only">Add item</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add item</p>
      </TooltipContent>
    </Tooltip>
  )
}
```

## All Examples

- `tooltip-demo` - Basic tooltip on an outline button
- `chart-tooltip-demo` - Chart-specific tooltip component (custom implementation, not using Radix Tooltip)
