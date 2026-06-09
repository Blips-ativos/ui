# Slider

Import: `@blips/ui/components/slider`

## Sub-components

| Component | Description |
|---|---|
| `Slider` | Range input wrapping `@radix-ui/react-slider` Root. Renders a track, filled range, and draggable thumb. |

## Props & Variants

### Slider

Extends `React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultValue` | `number[]` | -- | Default value (uncontrolled). Array for range support. |
| `value` | `number[]` | -- | Controlled value. |
| `onValueChange` | `(value: number[]) => void` | -- | Callback when value changes during drag. |
| `onValueCommit` | `(value: number[]) => void` | -- | Callback when drag ends (committed value). |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Step increment. |
| `minStepsBetweenThumbs` | `number` | `0` | Minimum steps between thumbs (range mode). |
| `disabled` | `boolean` | `false` | Disable the slider. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Slider orientation. |
| `inverted` | `boolean` | `false` | Invert the slider direction. |
| `dir` | `"ltr" \| "rtl"` | -- | Reading direction. |
| `name` | `string` | -- | Name for form submission. |
| `className` | `string` | -- | Additional CSS classes. Base: `relative flex w-full touch-none select-none items-center`. |

**Internal structure:**
- **Track:** `relative h-2 w-full grow overflow-hidden rounded-full bg-secondary`
- **Range:** `absolute h-full bg-primary`
- **Thumb:** `block h-5 w-5 rounded-full border-2 border-primary bg-background` with focus ring

## Usage

### Basic Slider

```tsx
import { Slider } from "@blips/ui/components/slider"

export default function SliderDemo() {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className="w-[60%]"
    />
  )
}
```

### Controlled Slider

```tsx
import { useState } from "react"
import { Slider } from "@blips/ui/components/slider"

export default function SliderControlled() {
  const [value, setValue] = useState([33])

  return (
    <div className="space-y-2">
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
      />
      <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
    </div>
  )
}
```

### Range Slider (Two Thumbs)

```tsx
<Slider
  defaultValue={[25, 75]}
  max={100}
  step={1}
  minStepsBetweenThumbs={5}
/>
```

### With Labels

```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm text-muted-foreground">
    <span>0%</span>
    <span>100%</span>
  </div>
  <Slider defaultValue={[50]} max={100} step={1} />
</div>
```

### Custom Step and Range

```tsx
<Slider
  defaultValue={[5]}
  min={0}
  max={10}
  step={0.5}
  className="w-full"
/>
```

### With Form Integration

```tsx
import { Controller } from "react-hook-form"
import { Slider } from "@blips/ui/components/slider"

<Controller
  name="volume"
  control={form.control}
  render={({ field }) => (
    <Slider
      value={[field.value]}
      onValueChange={([val]) => field.onChange(val)}
      min={0}
      max={100}
      step={1}
    />
  )}
/>
```

## All Examples

- `slider-demo` -- Basic slider at 50% with step=1

## Project Notes

- The slider renders a single thumb by default. Pass an array with two values (e.g., `[25, 75]`) to create a range slider with two thumbs.
- The `value` and `defaultValue` props must always be arrays, even for single-value sliders: `[50]` not `50`.
- Track uses `bg-secondary`, range fill uses `bg-primary`, thumb uses `border-primary bg-background`.
- For form integration, destructure the array in `onValueChange`: `onValueChange={([val]) => field.onChange(val)}`.
