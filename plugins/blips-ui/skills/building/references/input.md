# Input

Import: `@blips/ui/components/input`

A styled `<input>` element with CVA-based size and variant support.

## Sub-components

| Export | Description |
|---|---|
| `Input` | The input component (`React.forwardRef`). |
| `inputVariants` | CVA variant function — can be used to apply input styles to custom elements. |
| `InputProps` | TypeScript interface extending `React.ComponentProps<'input'>` with CVA variants. Note: HTML `size` attribute is omitted in favor of the CVA `size` variant. |

## Props & Variants

### Size Variants

| Size | Classes | Description |
|---|---|---|
| `default` | `h-8 px-3 py-2` | Standard input height (32px). |
| `sm` | `h-6 px-2 py-1 text-xs` | Small input (24px). |
| `lg` | `h-12 px-4 py-3` | Large input (48px). |

### Style Variants

| Variant | Classes | Description |
|---|---|---|
| `default` | (none additional) | Standard bordered input with ring focus. |
| `ghost` | `border-transparent bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0` | No border, no background, no focus ring. |

### Base Classes

```
flex w-full rounded-md border border-input bg-background text-base
ring-offset-background file:border-0 file:bg-transparent file:font-medium
file:text-foreground file:text-sm placeholder:text-muted-foreground
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
md:text-sm
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Input size variant. |
| `variant` | `"default" \| "ghost"` | `"default"` | Visual style variant. |
| `type` | `string` | - | HTML input type (`text`, `email`, `password`, `file`, etc.). |
| `disabled` | `boolean` | `false` | Disables the input. |
| `placeholder` | `string` | - | Placeholder text. |

Plus all standard HTML `<input>` attributes (except `size`).

## Usage

### Basic Input

```tsx
import { Input } from "@blips/ui/components/input"

<Input type="email" placeholder="Email" />
```

### With Label

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

<div className="grid w-full max-w-sm items-center gap-3">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>
```

### With Helper Text

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

<div className="grid w-full max-w-sm items-center gap-3">
  <Label htmlFor="email-2">Email</Label>
  <Input type="email" id="email-2" placeholder="Email" />
  <p className="text-sm text-muted-foreground">Enter your email address.</p>
</div>
```

### With Button

```tsx
import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"

<div className="flex w-full max-w-sm items-center gap-2">
  <Input type="email" placeholder="Email" />
  <Button type="submit" variant="outline">Subscribe</Button>
</div>
```

### File Input

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

<div className="grid w-full max-w-sm items-center gap-3">
  <Label htmlFor="picture">Picture</Label>
  <Input id="picture" type="file" />
</div>
```

### Disabled

```tsx
<Input disabled type="email" placeholder="Email" />
```

### Size Variants

```tsx
<Input size="sm" placeholder="Small" />
<Input size="default" placeholder="Default" />
<Input size="lg" placeholder="Large" />
```

## All Examples

- `input-demo` — Basic email input
- `input-with-label` — Input with label
- `input-with-text` — Input with label and helper text
- `input-with-button` — Input with subscribe button
- `input-file` — File input with label
- `input-disabled` — Disabled input

## All Example Variants

### input-demo

```tsx
import { Input } from "@blips/ui/components/input"

export default function InputDemo() {
  return <Input type="email" placeholder="Email" />
}
```

### input-disabled

```tsx
import { Input } from "@blips/ui/components/input"

export default function InputDisabled() {
  return <Input disabled type="email" placeholder="Email" />
}
```

### input-file

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
```

### input-with-button

```tsx
import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" variant="outline">
        Subscribe
      </Button>
    </div>
  )
}
```

### input-with-label

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### input-with-text

```tsx
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function InputWithText() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email-2">Email</Label>
      <Input type="email" id="email-2" placeholder="Email" />
      <p className="text-sm text-muted-foreground">Enter your email address.</p>
    </div>
  )
}
```
