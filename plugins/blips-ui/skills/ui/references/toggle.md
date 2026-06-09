# Toggle

Import: `@blips/ui/components/toggle`

## Sub-components

- **`Toggle`** - A two-state button built on `@radix-ui/react-toggle` with CVA variants for styling.

### Exported Utilities

- **`toggleVariants`** - CVA variant function, also used by `ToggleGroup` component.

## Props & Variants

### Toggle Props

Extends `React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>` plus CVA variant props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outline'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg'` | `'default'` | Size of the toggle |
| `pressed` | `boolean` | `undefined` | Controlled pressed state |
| `defaultPressed` | `boolean` | `false` | Uncontrolled default pressed state |
| `onPressedChange` | `(pressed: boolean) => void` | `undefined` | Callback when pressed state changes |
| `disabled` | `boolean` | `false` | Disables the toggle |
| `aria-label` | `string` | `undefined` | Accessibility label (recommended) |
| `className` | `string` | `undefined` | Additional CSS classes |

### Variants

| Variant | Description | Styles |
|---------|-------------|--------|
| `default` | Transparent background, colored on press | `bg-transparent` |
| `outline` | Bordered, accent background on hover/press | `border border-input bg-transparent hover:bg-accent hover:text-accent-foreground` |

### Sizes

| Size | Dimensions |
|------|-----------|
| `default` | `h-8 min-w-8 px-3` |
| `sm` | `h-9 min-w-9 px-2.5` |
| `lg` | `h-11 min-w-11 px-5` |

### Visual States

| State | Effect |
|-------|--------|
| Default (off) | Transparent background |
| Pressed (on) | `bg-accent text-accent-foreground` via `data-[state=on]` |
| Hover | `bg-muted text-muted-foreground` |
| Disabled | `pointer-events-none opacity-50` |
| Focus | `ring-2 ring-ring ring-offset-2` |

### Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-state` | `'on' \| 'off'` | Current toggle state |

## Usage

### Basic Toggle

```tsx
import { Bookmark } from "@phosphor-icons/react"
import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
      <Bookmark />
      Bookmark
    </Toggle>
  )
}
```

### Outline Variant

```tsx
import { TextItalic } from "@phosphor-icons/react"
import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <TextItalic />
    </Toggle>
  )
}
```

### With Text

```tsx
import { TextItalic } from "@phosphor-icons/react"
import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <TextItalic />
      TextItalic
    </Toggle>
  )
}
```

### Disabled

```tsx
import { TextUnderline } from "@phosphor-icons/react"
import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle italic" disabled>
      <TextUnderline className="h-4 w-4" />
    </Toggle>
  )
}
```

## All Example Variants

### toggle-demo

Toggle with bookmark icon, outline variant, custom active colors.

```tsx
import { Bookmark } from "@phosphor-icons/react"

import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
      <Bookmark />
      Bookmark
    </Toggle>
  )
}
```

### toggle-disabled

Disabled toggle state.

```tsx
import { TextUnderline } from "@phosphor-icons/react"

import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle italic" disabled>
      <TextUnderline className="h-4 w-4" />
    </Toggle>
  )
}
```

### toggle-lg

Large size toggle.

```tsx
import { TextItalic } from "@phosphor-icons/react"

import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleLg() {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <TextItalic />
    </Toggle>
  )
}
```

### toggle-outline

Outline variant with icon only.

```tsx
import { TextItalic } from "@phosphor-icons/react"

import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <TextItalic />
    </Toggle>
  )
}
```

### toggle-sm

Small size toggle.

```tsx
import { TextItalic } from "@phosphor-icons/react"

import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <TextItalic />
    </Toggle>
  )
}
```

### toggle-with-text

Toggle with both icon and text label.

```tsx
import { TextItalic } from "@phosphor-icons/react"

import { Toggle } from "@blips/ui/components/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <TextItalic />
      TextItalic
    </Toggle>
  )
}
```
