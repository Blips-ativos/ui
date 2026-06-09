# Badge

Import: `@blips/ui/components/badge`

## Sub-components

| Component | Description |
|---|---|
| `Badge` | Inline badge element. Renders a styled `div` with CVA variants. |

Also exports `badgeVariants` for use with other elements.

## Props & Variants

### Badge

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "success" \| "warning"` | `"outline"` | Visual style variant. |
| `className` | `string` | - | Additional CSS classes. |
| `children` | `ReactNode` | - | Badge content (text, icons, etc.). |

**Base classes:** `inline-flex items-center whitespace-nowrap rounded-sm border px-2.5 py-0.5 font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`

#### Variant Styles

| Variant | Classes |
|---|---|
| `default` | `border-transparent bg-primary text-primary-foreground hover:bg-primary/80` |
| `secondary` | `border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80` |
| `destructive` | `border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80` |
| `outline` | `text-foreground` |
| `success` | `border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400` |
| `warning` | `border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400` |

## Usage

### All variants

```tsx
import { Badge } from "@blips/ui/components/badge"

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  )
}
```

### Badge with icon

```tsx
import { SealCheck } from "@phosphor-icons/react"
import { Badge } from "@blips/ui/components/badge"

<Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
  <SealCheck />
  Verified
</Badge>
```

### Numeric/counter badge

```tsx
<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">99</Badge>
<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">20+</Badge>
```

### Using badgeVariants with other elements

```tsx
import { badgeVariants } from "@blips/ui/components/badge"

<a href="/status" className={badgeVariants({ variant: "outline" })}>
  View Status
</a>
```

## Project Notes

- The project default variant is `"outline"` (differs from upstream shadcn which defaults to `"default"`).
- Includes custom `success` and `warning` variants not present in upstream shadcn, with light/dark mode support using green and yellow color palettes.
- Shape is `rounded-sm` (slightly rounded). For pill/circular badges, add `rounded-full`.

## All Example Variants

### badge-demo

```tsx
import { WarningCircle, SealCheck, Check } from "@phosphor-icons/react"

import { Badge } from "@/registry/new-york-v4/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <SealCheck />
          Verified
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          8
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="destructive"
        >
          99
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="outline"
        >
          20+
        </Badge>
      </div>
    </div>
  )
}
```

### badge-destructive

```tsx
import { Badge } from "@/registry/new-york-v4/ui/badge"

export default function BadgeDestructive() {
  return <Badge variant="destructive">Destructive</Badge>
}
```

### badge-outline

```tsx
import { Badge } from "@/registry/new-york-v4/ui/badge"

export default function BadgeOutline() {
  return <Badge variant="outline">Outline</Badge>
}
```

### badge-secondary

```tsx
import { Badge } from "@/registry/new-york-v4/ui/badge"

export default function BadgeSecondary() {
  return <Badge variant="secondary">Secondary</Badge>
}
```
