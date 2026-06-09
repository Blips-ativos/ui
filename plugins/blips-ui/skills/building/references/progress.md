# Progress

Import: `@blips/ui/components/progress`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `Progress` | `ProgressPrimitive.Root` | Progress bar with animated indicator. Built on `@radix-ui/react-progress`. |

The indicator (`ProgressPrimitive.Indicator`) is rendered internally and not exported separately.

## Props & Variants

### Progress

Extends `React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `0` | Current progress value (0-100). `null` renders indeterminate state. |
| `max` | `number` | `100` | Maximum value (Radix prop) |
| `className` | `string` | - | Additional CSS classes for the root/track |

**Root/Track styles:**
- `relative h-4 w-full overflow-hidden rounded-full bg-secondary`

**Indicator styles:**
- `h-full w-full flex-1 bg-primary transition-all`
- Position controlled via `translateX(-${100 - value}%)`

**Customization tips:**
- Change track height: `className="h-2"` for thinner bar
- Change indicator color: override with `[&>div]:bg-green-500` or similar
- Change track color: `className="bg-muted"` on the root

## Usage

### Basic Progress Bar

```tsx
import { Progress } from "@blips/ui/components/progress"

<Progress value={33} />
```

### Animated Progress

```tsx
"use client"

import * as React from "react"
import { Progress } from "@blips/ui/components/progress"

function AnimatedProgress() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
```

### Custom Sized

```tsx
import { Progress } from "@blips/ui/components/progress"

{/* Thin bar */}
<Progress value={50} className="h-2" />

{/* Thick bar */}
<Progress value={75} className="h-6" />

{/* Custom width */}
<Progress value={40} className="w-[200px]" />
```

### With Label

```tsx
import { Progress } from "@blips/ui/components/progress"

function LabeledProgress({ value }: { value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}
```

### Custom Colors

```tsx
import { Progress } from "@blips/ui/components/progress"

{/* Green indicator on muted track */}
<Progress
  value={80}
  className="h-2 bg-muted [&>div]:bg-green-500"
/>

{/* Destructive/red indicator */}
<Progress
  value={90}
  className="h-2 [&>div]:bg-destructive"
/>
```

## Project Notes

- The component uses `forwardRef` pattern.
- The indicator position is controlled via CSS `transform: translateX()` for smooth animation via `transition-all`.

## All Examples

- `progress-demo` - Animated progress bar that transitions from 13% to 66%
