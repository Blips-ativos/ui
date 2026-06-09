# Switch

Import: `@blips/ui/components/switch`

## Sub-components

- **`Switch`** - A toggle switch built on `@radix-ui/react-switch`. Renders as a pill-shaped track with a sliding thumb circle.

## Props & Variants

### Switch Props

Extends `React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default checked state |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Callback when checked state changes |
| `disabled` | `boolean` | `false` | Disables the switch |
| `required` | `boolean` | `false` | Marks as required in forms |
| `name` | `string` | `undefined` | Name for form submission |
| `value` | `string` | `'on'` | Value for form submission |
| `id` | `string` | `undefined` | HTML id (use with Label's `htmlFor`) |
| `className` | `string` | `undefined` | Additional CSS classes |

### Visual States

| State | Track Color | Thumb Position |
|-------|-------------|----------------|
| Unchecked | `bg-input` | `translate-x-0` (left) |
| Checked | `bg-primary` | `translate-x-5` (right) |
| Disabled | `opacity-50`, `cursor-not-allowed` | - |
| Focused | `ring-2 ring-ring ring-offset-2` | - |

### Dimensions

- Track: `h-6 w-11` (24px x 44px)
- Thumb: `h-5 w-5` (20px x 20px)

## Usage

### Basic Switch with Label

```tsx
import { Label } from "@blips/ui/components/label"
import { Switch } from "@blips/ui/components/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

### With React Hook Form

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@blips/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blips/ui/components/field"
import { Switch } from "@blips/ui/components/switch"

const formSchema = z.object({
  twoFactor: z.boolean().refine((val) => val === true, {
    message: "It is highly recommended to enable two-factor authentication.",
  }),
})

export default function FormRhfSwitch() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactor: false,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-switch" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="twoFactor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-switch-twoFactor">
                      Multi-factor authentication
                    </FieldLabel>
                    <FieldDescription>
                      Enable multi-factor authentication to secure your account.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Switch
                    id="form-rhf-switch-twoFactor"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-switch">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

## All Examples

- `switch-demo` - Basic switch with label
- `form-rhf-switch` - Switch in a React Hook Form with Zod validation
- `form-tanstack-switch` - Switch in a TanStack Form with Zod validation
