# Input OTP

Import: `@blips/ui/components/input-otp`

Built on [input-otp](https://github.com/guilhermerodz/input-otp) by @guilhermerodz. One-time password input with support for groups, separators, and pattern validation.

## Sub-components

| Component | Description |
|---|---|
| `InputOTP` | Root component. Wraps `OTPInput` with flex container and disabled styling. |
| `InputOTPGroup` | Groups slots together visually (`flex items-center`). |
| `InputOTPSlot` | Individual character slot. Shows character, active ring, and fake caret animation. |
| `InputOTPSeparator` | Visual separator between groups (renders a dot icon by default). |

## Props & Variants

### InputOTP

| Prop | Type | Default | Description |
|---|---|---|---|
| `maxLength` | `number` | **required** | Total number of OTP characters. |
| `value` | `string` | - | Controlled value. |
| `onChange` | `(value: string) => void` | - | Callback when value changes. |
| `pattern` | `string` | - | Regex pattern for allowed characters. Use `REGEXP_ONLY_DIGITS_AND_CHARS` from `input-otp`. |
| `containerClassName` | `string` | - | Class for the outer flex container. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `render` | `(props) => ReactElement` | - | Custom render function for full control. |

### InputOTPSlot

| Prop | Type | Default | Description |
|---|---|---|---|
| `index` | `number` | **required** | The slot index (0-based). Must match position in the OTP input. |

**Slot styling:**
- Base: `h-10 w-10 border-input border-y border-r text-sm` (first slot gets `border-l` and `rounded-l-md`, last gets `rounded-r-md`)
- Active: `z-10 ring-2 ring-ring ring-offset-background`
- Fake caret: Animated blinking cursor (`animate-caret-blink duration-1000`)

### InputOTPSeparator

Renders a `Dot` icon from `@phosphor-icons/react` by default. Uses `role="separator"`.

## Usage

### Basic 6-digit OTP with Separator

```tsx
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@blips/ui/components/input-otp"

function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### Custom Pattern (Digits and Characters)

```tsx
"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP, InputOTPGroup, InputOTPSlot,
} from "@blips/ui/components/input-otp"

function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### Controlled Value

```tsx
"use client"

import * as React from "react"
import {
  InputOTP, InputOTPGroup, InputOTPSlot,
} from "@blips/ui/components/input-otp"

function InputOTPControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div className="space-y-2">
      <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}
```

### Multiple Separators (2-2-2 Layout)

```tsx
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@blips/ui/components/input-otp"

function InputOTPWithSeparator() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

## All Examples

- `input-otp-demo` — Basic 3+3 with separator
- `input-otp-pattern` — Custom pattern allowing digits and characters
- `input-otp-controlled` — Controlled value with display text
- `input-otp-separator` — 2+2+2 layout with two separators

## All Example Variants

### input-otp-demo

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@blips/ui/components/input-otp"

export default function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### input-otp-pattern

```tsx
"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@blips/ui/components/input-otp"

export default function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### input-otp-separator

```tsx
import React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@blips/ui/components/input-otp"

export default function InputOTPWithSeparator() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### input-otp-controlled

```tsx
"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@blips/ui/components/input-otp"

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}
```
