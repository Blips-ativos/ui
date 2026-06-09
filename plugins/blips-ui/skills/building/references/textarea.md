# Textarea

Import: `@blips/ui/components/textarea`

## Sub-components

- **`Textarea`** - A styled `<textarea>` element with consistent form styling.

## Props & Variants

### Textarea Props

Extends all standard `React.ComponentProps<'textarea'>` props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Disables the textarea |
| `rows` | `number` | `undefined` | Number of visible text rows |
| `className` | `string` | `undefined` | Additional CSS classes |
| `value` | `string` | `undefined` | Controlled value |
| `defaultValue` | `string` | `undefined` | Uncontrolled default value |
| `onChange` | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | `undefined` | Change handler |
| `id` | `string` | `undefined` | HTML id (use with Label's `htmlFor`) |
| `name` | `string` | `undefined` | Name for form submission |

### Default Styles

```
min-h-[80px] w-full rounded-md border border-input bg-background
px-3 py-2 text-base ring-offset-background
placeholder:text-muted-foreground
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50
md:text-sm
```

### Visual States

| State | Effect |
|-------|--------|
| Default | `border-input bg-background` |
| Focused | `ring-2 ring-ring ring-offset-2` |
| Disabled | `opacity-50 cursor-not-allowed` |
| Placeholder | `text-muted-foreground` |

## Usage

### Basic Textarea

```tsx
import { Textarea } from "@blips/ui/components/textarea"

export default function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}
```

### With Label

```tsx
import { Label } from "@blips/ui/components/label"
import { Textarea } from "@blips/ui/components/textarea"

export default function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}
```

### Disabled

```tsx
import { Textarea } from "@blips/ui/components/textarea"

export default function TextareaDisabled() {
  return <Textarea placeholder="Type your message here." disabled />
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blips/ui/components/field"
import { Textarea } from "@blips/ui/components/textarea"

const formSchema = z.object({
  about: z
    .string()
    .min(10, "Please provide at least 10 characters.")
    .max(200, "Please keep it under 200 characters."),
})

export default function FormRhfTextarea() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { about: "" },
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
        <CardTitle>Personalization</CardTitle>
        <CardDescription>
          Customize your experience by telling us more about yourself.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-textarea" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="about"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-textarea-about">
                    More about you
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-textarea-about"
                    aria-invalid={fieldState.invalid}
                    placeholder="I'm a software engineer..."
                    className="min-h-[120px]"
                  />
                  <FieldDescription>
                    Tell us more about yourself.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
          <Button type="submit" form="form-rhf-textarea">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

## All Examples

- `textarea-demo` - Basic textarea with placeholder
- `textarea-disabled` - Disabled textarea
- `textarea-with-label` - Textarea with Label component
- `form-rhf-textarea` - Textarea in React Hook Form with Zod validation
- `form-tanstack-textarea` - Textarea in TanStack Form with Zod validation
