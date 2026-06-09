# Hover Card

Import: `@blips/ui/components/hover-card`

Built on [Radix UI Hover Card](https://www.radix-ui.com/primitives/docs/components/hover-card). Displays rich content when hovering over a trigger element.

## Sub-components

| Component | Description |
|---|---|
| `HoverCard` | Root component (`HoverCardPrimitive.Root`). |
| `HoverCardTrigger` | Element that activates the hover card on hover. Supports `asChild`. |
| `HoverCardContent` | The popover content panel with animations. |

## Props & Variants

### HoverCard (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `openDelay` | `number` | `700` | Milliseconds before the card opens on hover. |
| `closeDelay` | `number` | `300` | Milliseconds before the card closes when hover ends. |
| `open` | `boolean` | - | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes. |

### HoverCardContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment relative to trigger. |
| `sideOffset` | `number` | `4` | Gap between trigger and content. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Side of trigger to render on. |

**Base classes:** `z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none`

Includes entrance/exit animations: fade, zoom, and slide-in based on `data-side`.

## Usage

### Basic Hover Card

```tsx
import { Calendar } from "@phosphor-icons/react"
import { Avatar, AvatarFallback, AvatarImage } from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card"

function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework -- created and maintained by @vercel.
            </p>
            <div className="text-xs text-muted-foreground">
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

### Simple Text Hover Card

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <span className="underline cursor-pointer">Hover me</span>
  </HoverCardTrigger>
  <HoverCardContent>
    <p className="text-sm">Additional information appears here on hover.</p>
  </HoverCardContent>
</HoverCard>
```

## All Examples

- `hover-card-demo` -- User profile card with avatar, name, description, and join date

## All Example Variants

### hover-card-demo

```tsx
import { Calendar } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework -- created and maintained by @vercel.
            </p>
            <div className="text-xs text-muted-foreground">
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```
