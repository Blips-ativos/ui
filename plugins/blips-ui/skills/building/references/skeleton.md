# Skeleton

Import: `@blips/ui/components/skeleton`

## Sub-components

| Component | Description |
|---|---|
| `Skeleton` | A simple animated placeholder div. Renders with `animate-pulse` and `bg-muted` background. |

## Props & Variants

### Skeleton

Extends `React.HTMLAttributes<HTMLDivElement>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | CSS classes to control size, shape, and additional styles. Base: `animate-pulse rounded-md bg-muted`. |

The Skeleton component has no built-in variants. Control its appearance entirely through `className`:

| Shape | Class Example |
|---|---|
| Rectangle | `className="h-4 w-[250px]"` |
| Circle | `className="h-12 w-12 rounded-full"` |
| Card | `className="h-[125px] w-[250px] rounded-xl"` |
| Line | `className="h-4 w-full"` |

## Usage

### Basic Skeleton (Avatar + Text)

```tsx
import { Skeleton } from "@blips/ui/components/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

### Card Skeleton

```tsx
import { Skeleton } from "@blips/ui/components/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

### Table Skeleton

```tsx
<div className="space-y-2">
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex items-center gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[60px]" />
    </div>
  ))}
</div>
```

### Form Skeleton

```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Skeleton className="h-4 w-[80px]" /> {/* Label */}
    <Skeleton className="h-8 w-full" />   {/* Input */}
  </div>
  <div className="space-y-2">
    <Skeleton className="h-4 w-[120px]" /> {/* Label */}
    <Skeleton className="h-8 w-full" />     {/* Input */}
  </div>
  <Skeleton className="h-9 w-[100px]" />   {/* Button */}
</div>
```

### Inline with Content (Conditional)

```tsx
{isLoading ? (
  <Skeleton className="h-4 w-[100px]" />
) : (
  <span>{data.name}</span>
)}
```

## All Examples

- `skeleton-demo` -- Avatar + text lines skeleton
- `skeleton-card` -- Card skeleton with image placeholder and text lines

## All Example Variants

### skeleton-demo

```tsx
import { Skeleton } from "@blips/ui/components/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

### skeleton-card

```tsx
import { Skeleton } from "@blips/ui/components/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

## Project Notes

- This is a pure CSS component (no Radix dependency). It does not use `'use client'`.
- Uses `animate-pulse` from Tailwind for the animation and `bg-muted` for the background color.
- See also `SidebarMenuSkeleton` in the sidebar component for sidebar-specific loading states.
- The component is intentionally minimal -- all sizing and shaping is done via `className`.
