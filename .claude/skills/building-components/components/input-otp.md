# InputOTP

**Categoria:** Compound | **Deps:** `input-otp`, `lucide-react` | **"use client":** Não

## Exports

`InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`

## Usage

### Basic OTP Input (6 digits)

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@blips/ui"

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
```

### Controlled OTP Input

```tsx
const [otp, setOtp] = React.useState("")

<InputOTP maxLength={6} value={otp} onChange={setOtp}>
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
```

### OTP with Pattern Restriction (Digits Only)

```tsx
import { REGEXP_ONLY_DIGITS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
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
```

### OTP with Pattern Restriction (Alphanumeric)

```tsx
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
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
```

### OTP in a Form

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@blips/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const schema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

function OTPForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Verify</Button>
      </form>
    </Form>
  )
}
```

### OTP with Custom Styling

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup className="gap-3">
    <InputOTPSlot index={0} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={1} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={2} className="border-2 border-primary rounded-lg" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup className="gap-3">
    <InputOTPSlot index={3} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={4} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={5} className="border-2 border-primary rounded-lg" />
  </InputOTPGroup>
</InputOTP>
```

## Available Patterns

The `input-otp` package provides several regex patterns for validation:

- `REGEXP_ONLY_DIGITS`: Digits only (0-9)
- `REGEXP_ONLY_CHARS`: Letters only (a-z, A-Z)
- `REGEXP_ONLY_DIGITS_AND_CHARS`: Alphanumeric (0-9, a-z, A-Z)

## Props & Variants

### InputOTP
- `maxLength`: number - Maximum OTP length (required)
- `value`: string - OTP value (controlled)
- `onChange`: (value: string) => void - Change handler
- `disabled`: boolean - Disable input
- `pattern`: RegExp - Regex pattern to validate input
- `pushPasswordManagerStrategy`: 'increase' | 'append' | undefined - Password manager handling strategy
- `render`: (props: any) => ReactNode - Custom render function
- `container`: ElementType - Custom container component
- `children`: ReactNode - OTP slots and groups

### InputOTPGroup
- `children`: ReactNode - OTP slots
- `className`: string - Custom CSS classes

Typically rendered as a flex container with gap between slots.

### InputOTPSlot
- `index`: number - Slot index (0-based, required)
- `className`: string - Custom CSS classes
- `disabled`: boolean - Disable slot
- `hasCaret`: boolean - Show input caret (default: true)

Special styling:
- Shows placeholder dot when empty: `•`
- Shows the character when filled
- Displays caret on focus by default
- Accessible focus ring on keyboard navigation

### InputOTPSeparator
- `children`: ReactNode - Separator content (typically unused)
- `className`: string - Custom CSS classes

Typically renders as a visual separator (dash or space) between groups.

## Behavior

- **Auto-advance**: Automatically moves to next slot when digit is entered
- **Auto-backspace**: Pressing backspace moves to previous slot
- **Paste support**: Can paste full OTP value at once
- **Keyboard navigation**: Arrow keys move between slots
- **Focus management**: Tab key navigates through slots in sequence
- **Mobile friendly**: Touch-friendly slot size and spacing
- **Accessibility**: Full keyboard and screen reader support

## Common Use Cases

### Verify Email

```tsx
<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
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
```

### Two-Factor Authentication (2FA)

```tsx
<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### Multi-character Code

```tsx
<InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOTPGroup className="gap-2">
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>
```
