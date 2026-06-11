# Aspect Ratio

Import: `@blips/ui/components/aspect-ratio`

## Sub-components

| Component | Description |
|---|---|
| `AspectRatio` | Wraps `@radix-ui/react-aspect-ratio` Root. Maintains a specified width-to-height ratio for its child content. |

## Props & Variants

### AspectRatio

| Prop | Type | Default | Description |
|---|---|---|---|
| `ratio` | `number` | `1` | The desired width-to-height ratio (e.g., `16/9`, `4/3`, `1/1`). |
| `className` | `string` | - | Additional CSS classes. |
| `children` | `ReactNode` | - | Content to display within the aspect ratio container. |

This is a thin wrapper around `@radix-ui/react-aspect-ratio` with no additional styling.

## Usage

### 16:9 image with Next.js Image

```tsx
import Image from "next/image"
import { AspectRatio } from "@blips/ui/components/aspect-ratio"

export function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </AspectRatio>
  )
}
```

### Square aspect ratio

```tsx
<AspectRatio ratio={1} className="rounded-md bg-muted">
  <img src="/avatar.jpg" alt="Avatar" className="h-full w-full object-cover rounded-md" />
</AspectRatio>
```

### 4:3 video container

```tsx
<AspectRatio ratio={4 / 3} className="bg-black rounded-lg overflow-hidden">
  <iframe src="..." className="h-full w-full" />
</AspectRatio>
```

## Project Notes

- The component file includes `@ts-nocheck` and `'use client'` directives.
- No CVA variants -- this is a pure Radix primitive re-export.
- Commonly used with `fill` prop on Next.js `Image` components to maintain responsive aspect ratios.

## All Examples

- `aspect-ratio-demo`
