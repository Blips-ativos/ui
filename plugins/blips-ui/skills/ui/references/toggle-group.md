# Toggle Group

Import: `@blips/ui/components/toggle-group`

## Sub-components

- **`ToggleGroup`** - Container for a set of toggle items, built on `@radix-ui/react-toggle-group`. Supports single or multiple selection. Provides variant/size context to child items.
- **`ToggleGroupItem`** - Individual toggle item within the group. Inherits variant/size from `ToggleGroup` context or accepts its own overrides. Uses `toggleVariants` from the `toggle` component.

## Props & Variants

### ToggleGroup Props

Extends `React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>` plus CVA variant props from `toggleVariants`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | **required** | Whether one or multiple items can be active |
| `value` | `string \| string[]` | `undefined` | Controlled value(s). String for `single`, array for `multiple` |
| `defaultValue` | `string \| string[]` | `undefined` | Default value(s) |
| `onValueChange` | `(value: string \| string[]) => void` | `undefined` | Callback when value changes |
| `variant` | `'default' \| 'outline'` | `'default'` | Visual variant applied to all items |
| `size` | `'default' \| 'sm' \| 'lg'` | `'default'` | Size applied to all items |
| `disabled` | `boolean` | `false` | Disables all items in the group |
| `className` | `string` | `undefined` | Additional CSS classes |

### ToggleGroupItem Props

Extends `React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>` plus CVA variant props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique value for this item |
| `variant` | `'default' \| 'outline'` | Inherited from `ToggleGroup` | Override variant for this item |
| `size` | `'default' \| 'sm' \| 'lg'` | Inherited from `ToggleGroup` | Override size for this item |
| `disabled` | `boolean` | `false` | Disables this specific item |
| `aria-label` | `string` | `undefined` | Accessibility label (recommended) |
| `className` | `string` | `undefined` | Additional CSS classes |

### Variants (inherited from toggleVariants)

| Variant | Description |
|---------|-------------|
| `default` | Transparent background, accent on active |
| `outline` | Bordered, accent on hover/active |

### Sizes (inherited from toggleVariants)

| Size | Dimensions |
|------|-----------|
| `default` | `h-8 min-w-8 px-3` |
| `sm` | `h-9 min-w-9 px-2.5` |
| `lg` | `h-11 min-w-11 px-5` |

### Container Styles

The `ToggleGroup` root applies: `flex items-center justify-center gap-1`

## Usage

### Multiple Selection (Default)

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline" type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### Single Selection

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupSingle() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### Outline Variant

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### Disabled

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

## All Example Variants

### toggle-group-demo

Multiple selection with outline variant.

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline" type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### toggle-group-disabled

Disabled state for entire group.

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### toggle-group-lg

Large size toggle group.

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupLg() {
  return (
    <ToggleGroup type="multiple" size="lg">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### toggle-group-outline

Outline variant.

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### toggle-group-sm

Small size toggle group (single selection).

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupSm() {
  return (
    <ToggleGroup type="single" size="sm">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### toggle-group-single

Single selection mode.

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupSingle() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### toggle-group-spacing

Custom spacing with text labels and custom active colors.

```tsx
import { Bookmark, Heart, Star } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export default function ToggleGroupSpacing() {
  return (
    <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
      <ToggleGroupItem
        value="star"
        aria-label="Toggle star"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
      >
        <Star />
        Star
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heart"
        aria-label="Toggle heart"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
      >
        <Heart />
        Heart
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bookmark"
        aria-label="Toggle bookmark"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
      >
        <Bookmark />
        Bookmark
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```
