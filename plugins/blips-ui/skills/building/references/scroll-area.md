# Scroll Area

Import: `@blips/ui/components/scroll-area`

## Sub-components

| Component | Description |
|---|---|
| `ScrollArea` | Root container wrapping `@radix-ui/react-scroll-area` Root. Provides custom scrollbar styling with a Viewport, ScrollBar, and Corner. |
| `ScrollBar` | Custom scrollbar wrapping `@radix-ui/react-scroll-area` ScrollAreaScrollbar. Supports vertical and horizontal orientations. |

## Props & Variants

### ScrollArea

Extends `React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"auto" \| "always" \| "scroll" \| "hover"` | `"hover"` | Scrollbar visibility behavior. |
| `scrollHideDelay` | `number` | `600` | Delay in ms before scrollbars hide (when type is `"scroll"` or `"hover"`). |
| `dir` | `"ltr" \| "rtl"` | -- | Reading direction. |
| `className` | `string` | -- | Additional CSS classes. Base: `relative overflow-hidden`. |

**Internal structure:** Automatically includes a vertical `ScrollBar` and a `Corner`. For horizontal scrolling, add a `<ScrollBar orientation="horizontal" />` explicitly.

### ScrollBar

Extends `React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Scrollbar direction. |
| `forceMount` | `boolean` | -- | Force the scrollbar to always render. |
| `className` | `string` | -- | Additional CSS classes. |

**Styles by orientation:**
- **Vertical:** `h-full w-2.5 border-l border-l-transparent p-[1px]`
- **Horizontal:** `h-2.5 flex-col border-t border-t-transparent p-[1px]`

The thumb is styled with: `relative flex-1 rounded-full bg-border`.

## Usage

### Vertical Scroll Area

```tsx
import * as React from "react"
import { ScrollArea } from "@blips/ui/components/scroll-area"
import { Separator } from "@blips/ui/components/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
```

### Horizontal Scroll Area

```tsx
import { ScrollArea, ScrollBar } from "@blips/ui/components/scroll-area"

export default function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

### Both Directions

```tsx
<ScrollArea className="h-[300px] w-[400px] rounded-md border">
  <div className="w-[600px] p-4">
    {/* Content wider and taller than container */}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

## All Examples

- `scroll-area-demo` -- Vertical scroll area with a list of tags
- `scroll-area-horizontal-demo` -- Horizontal scroll area with artwork images

## All Example Variants

### scroll-area-demo

```tsx
import * as React from "react"

import { ScrollArea } from "@blips/ui/components/scroll-area"
import { Separator } from "@blips/ui/components/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
```

### scroll-area-horizontal-demo

```tsx
import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@blips/ui/components/scroll-area"

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export default function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

## Project Notes

- The `ScrollArea` automatically includes a vertical `ScrollBar`. For horizontal scrolling, you must explicitly add `<ScrollBar orientation="horizontal" />` as a child.
- Set explicit `h-*` and `w-*` on `ScrollArea` to constrain the scrollable viewport.
- Use `whitespace-nowrap` on the `ScrollArea` for horizontal layouts.
