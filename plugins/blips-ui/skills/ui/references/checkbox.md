# Checkbox

Import: `@blips/ui/components/checkbox`

## Sub-components

| Export | Description |
|--------|-------------|
| `Checkbox` | A styled checkbox built on `@radix-ui/react-checkbox`. Renders a 16x16 square with border, check indicator, and focus ring. |

## Props & Variants

`Checkbox` accepts all `@radix-ui/react-checkbox` Root props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` \| `"indeterminate"` | -- | Controlled checked state |
| `defaultChecked` | `boolean` | -- | Uncontrolled initial checked state |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | -- | Called when checked state changes |
| `disabled` | `boolean` | `false` | Disable the checkbox |
| `required` | `boolean` | `false` | Mark as required for forms |
| `name` | `string` | -- | Form field name |
| `value` | `string` | `"on"` | Form field value |
| `id` | `string` | -- | Element ID (pair with `<Label htmlFor>`) |
| `className` | `string` | -- | Additional CSS classes |

### Default Styles

```
h-4 w-4 shrink-0 rounded-sm border border-primary
ring-offset-background
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50
data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
```

### Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-state` | `"checked"` \| `"unchecked"` \| `"indeterminate"` | Current state |
| `data-disabled` | present when disabled | Disabled state |

## Dependencies

- `@radix-ui/react-checkbox`
- `@phosphor-icons/react` (Check icon)

## Usage

### Basic Checkbox with Label

```tsx
"use client"

import { Checkbox } from "@blips/ui/components/checkbox"
import { Label } from "@blips/ui/components/label"

export default function CheckboxDemo() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
```

### Checkbox with Description

```tsx
"use client"

import { Checkbox } from "@blips/ui/components/checkbox"
import { Label } from "@blips/ui/components/label"

export function CheckboxWithDescription() {
  return (
    <div className="flex items-start gap-3">
      <Checkbox id="terms-2" defaultChecked />
      <div className="grid gap-2">
        <Label htmlFor="terms-2">Accept terms and conditions</Label>
        <p className="text-sm text-muted-foreground">
          By clicking this checkbox, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  )
}
```

### Disabled Checkbox

```tsx
<div className="flex items-start gap-3">
  <Checkbox id="toggle" disabled />
  <Label htmlFor="toggle">Enable notifications</Label>
</div>
```

### Styled Card Checkbox (Custom Colors)

```tsx
"use client"

import { Checkbox } from "@blips/ui/components/checkbox"
import { Label } from "@blips/ui/components/label"

export function CheckboxCard() {
  return (
    <Label className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
      <Checkbox
        id="toggle-2"
        defaultChecked
        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">
          Enable notifications
        </p>
        <p className="text-sm text-muted-foreground">
          You can enable or disable notifications at any time.
        </p>
      </div>
    </Label>
  )
}
```

## All Examples

- `checkbox-demo` -- Multiple checkbox variants (basic, with description, disabled, card-style)

## Project Notes

- Uses `@phosphor-icons/react` Check icon.
- The checkbox is a `peer` element, enabling Tailwind peer selectors on sibling elements.
- For form integration, use with `react-hook-form`'s `Controller` or the project's `FormField` component.
