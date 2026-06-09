# Avatar

Import: `@blips/ui/components/avatar`

## Sub-components

| Component | Description |
|---|---|
| `Avatar` | Root container. Renders a fixed-size circle (`h-10 w-10 rounded-full`) with overflow hidden. Wraps `@radix-ui/react-avatar` Root. |
| `AvatarImage` | The avatar image. Renders as `aspect-square h-full w-full`. Wraps Radix `Image` with automatic loading state handling. |
| `AvatarFallback` | Fallback content shown when the image fails to load or while loading. Centered flex container with `bg-muted rounded-full`. |

## Props & Variants

### Avatar

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | - | Additional CSS classes. Base: `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full`. |

### AvatarImage

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | - | Image source URL. |
| `alt` | `string` | - | Alt text for the image. |
| `className` | `string` | - | Additional CSS classes. Base: `aspect-square h-full w-full`. |

### AvatarFallback

| Prop | Type | Default | Description |
|---|---|---|---|
| `delayMs` | `number` | - | Optional delay before showing fallback (prevents flicker for fast-loading images). |
| `className` | `string` | - | Additional CSS classes. Base: `flex h-full w-full items-center justify-center rounded-full bg-muted`. |
| `children` | `ReactNode` | - | Fallback content, typically initials (e.g., `"CN"`). |

## Usage

### Basic avatar with fallback

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@blips/ui/components/avatar"

export function AvatarExample() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
```

### Rounded square avatar

```tsx
<Avatar className="rounded-lg">
  <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
  <AvatarFallback>ER</AvatarFallback>
</Avatar>
```

### Avatar group (stacked)

```tsx
<div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
    <AvatarFallback>LR</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
    <AvatarFallback>ER</AvatarFallback>
  </Avatar>
</div>
```

### Custom size

```tsx
<Avatar className="h-16 w-16">
  <AvatarImage src="/large-avatar.jpg" alt="Large avatar" />
  <AvatarFallback className="text-lg">AB</AvatarFallback>
</Avatar>
```

## Project Notes

- Default size is `h-10 w-10` (40px). Override with className.
- For avatar groups, use `-space-x-2` with ring styling on the `data-[slot=avatar]` selector.
- Shape can be changed from circle to rounded square via `className="rounded-lg"` on the `Avatar` root.

## All Examples

- `avatar-demo`
