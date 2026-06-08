# HoverCard

**Categoria:** Compound | **Deps:** `@radix-ui/react-hover-card` | **"use client":** Não

## Exports

`HoverCard`, `HoverCardTrigger`, `HoverCardContent`

## Usage

### Basic Hover Card

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@blips/ui"
import { Button } from "@blips/ui"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@username</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm text-muted-foreground">
          The React component library for building web applications.
        </p>
        <div className="flex items-center pt-2">
          <span className="text-xs text-muted-foreground">Joined March 2020</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Hover Card with Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@blips/ui"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@user</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="space-y-2 flex-1">
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm text-muted-foreground">
          Frontend developer and UI enthusiast.
        </p>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-muted-foreground">Joined March 2020</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Hover Card with Custom Content

```tsx
<HoverCard openDelay={200} closeDelay={100}>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-4">
      <h3 className="font-semibold">Card Title</h3>
      <p className="text-sm text-muted-foreground">
        This is some helpful information that appears when you hover.
      </p>
      <Button size="sm">Action</Button>
    </div>
  </HoverCardContent>
</HoverCard>
```

## Props & Variants

### HoverCard
- `open`: boolean - Controlled open state
- `onOpenChange`: (open: boolean) => void - Open state change handler
- `openDelay`: number - Delay in milliseconds before opening (default: 200)
- `closeDelay`: number - Delay in milliseconds before closing (default: 300)
- `children`: ReactNode - Card content

### HoverCardTrigger
- `children`: ReactNode - Trigger element
- `asChild`: boolean - Merge with child component props
- `className`: string - Custom CSS classes

### HoverCardContent
- `children`: ReactNode - Content
- `className`: string - Custom CSS classes
- `align`: 'start' | 'center' | 'end' - Content alignment (default: center)
- `side`: 'top' | 'right' | 'bottom' | 'left' - Position relative to trigger (default: bottom)
- `sideOffset`: number - Distance from trigger (default: 4)
- `avoidCollisions`: boolean - Prevent content from colliding with viewport edges (default: true)

## Default Styling

The `HoverCardContent` component applies these default classes:
- `z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`

This provides:
- Fixed sizing (w-64)
- Rounded corners and border
- Popover background styling
- Entrance/exit animations
- Proper z-index stacking
