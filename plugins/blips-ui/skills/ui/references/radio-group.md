# Radio Group

Import: `@blips/ui/components/radio-group`

## Sub-components

| Component | Description |
|---|---|
| `RadioGroup` | Root container wrapping `@radix-ui/react-radio-group` Root. Renders a grid with `gap-2` by default. |
| `RadioGroupItem` | Individual radio button. Renders a circular indicator with a filled `Circle` icon (Phosphor Icons) when selected. |

## Props & Variants

### RadioGroup

Extends `React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultValue` | `string` | -- | The default selected value (uncontrolled). |
| `value` | `string` | -- | The controlled selected value. |
| `onValueChange` | `(value: string) => void` | -- | Callback when value changes. |
| `disabled` | `boolean` | `false` | Disable all radio items. |
| `required` | `boolean` | `false` | Mark group as required for form validation. |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Orientation of the radio group. |
| `dir` | `"ltr" \| "rtl"` | -- | Reading direction. |
| `loop` | `boolean` | `true` | Whether keyboard navigation should loop. |
| `className` | `string` | -- | Additional CSS classes. Base: `grid gap-2`. |

### RadioGroupItem

Extends `React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **(required)** | The value of the radio item. |
| `disabled` | `boolean` | `false` | Disable this radio item. |
| `required` | `boolean` | -- | Override group required for this item. |
| `id` | `string` | -- | HTML id, pair with `Label htmlFor`. |
| `className` | `string` | -- | Additional CSS classes. |

**Base styles:** `aspect-square h-4 w-4 rounded-full border border-primary text-primary` with focus-visible ring and disabled states.

## Usage

### Basic Radio Group

```tsx
import { Label } from "@blips/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
```

### With React Hook Form

```tsx
import { Controller, useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group"
import { Label } from "@blips/ui/components/label"
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@blips/ui/components/form"

<FormField
  control={form.control}
  name="type"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Notification type</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="mentions" id="mentions" />
            <Label htmlFor="mentions">Mentions only</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">None</Label>
          </div>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Horizontal Layout

```tsx
<RadioGroup defaultValue="option-1" className="flex gap-4" orientation="horizontal">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="h1" />
    <Label htmlFor="h1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="h2" />
    <Label htmlFor="h2">Option 2</Label>
  </div>
</RadioGroup>
```

## All Examples

- `radio-group-demo` -- Basic radio group with three options
- `dropdown-menu-radio-group` -- Radio group inside a dropdown menu

## Project Notes

- Uses `@phosphor-icons/react` `Circle` icon instead of the default Lucide `Circle` for the indicator.
- Always pair `RadioGroupItem` with a `Label` using matching `id`/`htmlFor` for accessibility.
