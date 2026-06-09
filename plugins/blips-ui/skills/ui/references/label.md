# Label

Import: `@blips/ui/components/label`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `Label` | `<label>` | Accessible label component built on `@radix-ui/react-label`. Automatically handles `htmlFor` association and disabled peer styling. |

## Props & Variants

### Label

Extends `React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>` plus CVA `VariantProps`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | Associates the label with a form control by ID |
| `className` | `string` | - | Additional CSS classes |

**Default styles (via CVA):**
- `font-medium text-sm leading-none`
- `peer-disabled:cursor-not-allowed peer-disabled:opacity-70` (auto-dims when sibling input is disabled)

**Note:** This project's Label uses `forwardRef` and wraps `@radix-ui/react-label` Root primitive.

## Usage

### With Checkbox

```tsx
import { Checkbox } from "@blips/ui/components/checkbox"
import { Label } from "@blips/ui/components/label"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

### With Input

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>
```

### Inside Form (react-hook-form)

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@blips/ui/components/form"
import { Input } from "@blips/ui/components/input"

{/* Note: When using react-hook-form, prefer FormLabel over Label */}
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Disabled State (via peer)

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

{/* Label auto-dims when the peer input is disabled */}
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled-input">Disabled Field</Label>
  <Input id="disabled-input" disabled placeholder="Cannot edit" />
</div>
```

## All Examples

- `label-demo` - Label with checkbox
