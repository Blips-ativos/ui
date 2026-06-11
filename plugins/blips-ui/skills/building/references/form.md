# Form

Import: `@blips/ui/components/form`

React Hook Form integration components. Provides form context, field state tracking, and accessible form controls. Built on `react-hook-form` `FormProvider` and `Controller`.

**Note:** For new forms, consider using the lighter `Field` component (`@blips/ui/components/field`) which is form-library agnostic. The `Form` component is specific to React Hook Form.

## Sub-components

| Component | Description |
|---|---|
| `Form` | Wrapper around `FormProvider` that also provides a safe internal context. Accepts a `UseFormReturn` spread + `children`. |
| `FormField` | Wraps react-hook-form's `Controller`. Provides field name context to children. |
| `FormItem` | Container for a single form field (`space-y-2`). Generates unique IDs for accessibility. |
| `FormLabel` | Label that auto-connects to `FormControl` via `htmlFor`. Shows destructive color on error. |
| `FormControl` | Slot component that passes `id`, `aria-describedby`, and `aria-invalid` to its child. |
| `FormDescription` | Helper text — `text-muted-foreground text-xs`. Connected via `aria-describedby`. |
| `FormMessage` | Error message — `text-destructive text-sm font-medium`. Auto-reads from field error state. |

### Hook

| Hook | Description |
|---|---|
| `useFormField()` | Returns `{ id, name, formItemId, formDescriptionId, formMessageId, invalid, isDirty, isTouched, isValidating, error }`. Works safely outside FormField context (returns defaults). |

## Props & Variants

### Form

Accepts all props from `UseFormReturn<TFieldValues>` (spread), plus `children: React.ReactNode`.

```tsx
const form = useForm({ resolver: zodResolver(schema) })
<Form {...form}>
  {/* fields */}
</Form>
```

### FormField

Same props as react-hook-form's `Controller`:

| Prop | Type | Description |
|---|---|---|
| `control` | `Control<TFieldValues>` | Form control from `useForm()`. |
| `name` | `string` | Field path (e.g., `"email"`, `"address.city"`). |
| `render` | `({ field, fieldState, formState }) => ReactElement` | Render function. |
| `rules` | `RegisterOptions` | Validation rules (when not using a resolver). |
| `defaultValue` | `TFieldValue` | Default value for the field. |

### FormLabel

Extends `Label` props. Auto-applies `text-destructive` class when the field has an error.

### FormControl

Extends `Slot` props. Automatically injects:
- `id` from FormItem context
- `aria-describedby` linking to description and message
- `aria-invalid` from field error state

### FormMessage

Extends `<p>` props. If no `children` provided, auto-reads `error.message` from field state. Returns `null` when no error and no children.

## Usage

### Standard React Hook Form Pattern

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@blips/ui/components/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@blips/ui/components/form"
import { Input } from "@blips/ui/components/input"

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
})

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Bug Report Form (RHF + Field Components)

This example shows the recommended pattern combining `Form` context with the newer `Field` layout components:

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@blips/ui/components/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@blips/ui/components/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@blips/ui/components/field"
import { Input } from "@blips/ui/components/input"
import {
  InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea,
} from "@blips/ui/components/input-group"

const formSchema = z.object({
  title: z.string().min(5).max(32),
  description: z.string().min(20).max(100),
})

function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "" },
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>Help us improve by reporting bugs.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="bug-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Bug Title</FieldLabel>
                  <Input {...field} id="title" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea {...field} id="description" rows={6} className="min-h-24 resize-none" />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>Include steps to reproduce.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
          <Button type="submit" form="bug-form">Submit</Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

## All Examples

- `form-rhf-demo` — React Hook Form with Field components, zod validation, InputGroup textarea
- `form-rhf-input` — Simple input field with username validation
- `form-rhf-select` — Select dropdown with responsive orientation
- `form-rhf-checkbox` — Checkbox groups with boolean and array patterns
- `form-rhf-switch` — Switch toggle with horizontal layout
- `form-rhf-textarea` — Textarea with character validation
- `form-rhf-radiogroup` — Radio group with card-style options
- `form-rhf-array` — Dynamic field arrays with useFieldArray
- `form-rhf-complex` — Multi-field form combining radio, select, checkbox, and switch
- `form-rhf-password` — Password input with strength meter and requirements checklist
- `form-next-demo` — Next.js server actions with `useActionState`, Field components
- `form-next-complex` — Next.js server actions with radio, select, checkbox, and switch
- `form-tanstack-demo` — TanStack Form with Field components, zod validation

## React Hook Form Examples

### form-rhf-demo

Bug report form demonstrating RHF with Field components, Zod validation, and InputGroup textarea with character counter.

```tsx
"use client"

import * as React from "react"
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
import { Input } from "@blips/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export default function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
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
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
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
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-rhf-input

Simple input field with username validation (regex, min/max length).

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
import { Input } from "@blips/ui/components/input"

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),
})

export default function FormRhfInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
        <CardTitle>Profile Gear</CardTitle>
        <CardDescription>
          Update your profile information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="shadcn"
                    autoComplete="username"
                  />
                  <FieldDescription>
                    This is your public display name. Must be between 3 and 10
                    characters. Must only contain letters, numbers, and
                    underscores.
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
          <Button type="submit" form="form-rhf-input">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-rhf-select

Select dropdown with responsive orientation layout and language selection.

```tsx
"use client"

import * as React from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"

const spokenLanguages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const

const formSchema = z.object({
  language: z
    .string()
    .min(1, "Please select your spoken language.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
})

export default function FormRhfSelect() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
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
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Language Preferences</CardTitle>
        <CardDescription>
          Select your preferred spoken language.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-select" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="language"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Spoken Language
                    </FieldLabel>
                    <FieldDescription>
                      For best results, select the language you speak.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {spokenLanguages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          <Button type="submit" form="form-rhf-select">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-rhf-checkbox

Checkbox patterns: single boolean checkbox (disabled) and multi-select checkbox array with FieldSet/FieldLegend.

```tsx
"use client"

import * as React from "react"
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
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@blips/ui/components/field"

const tasks = [
  { id: "push", label: "Push notifications" },
  { id: "email", label: "Email notifications" },
] as const

const formSchema = z.object({
  responses: z.boolean(),
  tasks: z
    .array(z.string())
    .min(1, "Please select at least one notification type.")
    .refine(
      (value) => value.every((task) => tasks.some((t) => t.id === task)),
      { message: "Invalid notification type selected." }
    ),
})

export default function FormRhfCheckbox() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: true,
      tasks: [],
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
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-checkbox" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="responses"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend variant="label">Responses</FieldLegend>
                    <FieldDescription>
                      Get notified for requests that take time, like research or
                      image generation.
                    </FieldDescription>
                    <FieldGroup data-slot="checkbox-group">
                      <Field orientation="horizontal">
                        <Checkbox
                          id="form-rhf-checkbox-responses"
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                        <FieldLabel
                          htmlFor="form-rhf-checkbox-responses"
                          className="font-normal"
                        >
                          Push notifications
                        </FieldLabel>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
            <FieldSeparator />
            <Controller
              name="tasks"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldGroup>
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend variant="label">Tasks</FieldLegend>
                    <FieldDescription>
                      Get notified when tasks you've created have updates.
                    </FieldDescription>
                    <FieldGroup data-slot="checkbox-group">
                      {tasks.map((task) => (
                        <Field
                          key={task.id}
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <Checkbox
                            id={`form-rhf-checkbox-${task.id}`}
                            name={field.name}
                            aria-invalid={fieldState.invalid}
                            checked={field.value.includes(task.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, task.id]
                                : field.value.filter(
                                    (value) => value !== task.id
                                  )
                              field.onChange(newValue)
                            }}
                          />
                          <FieldLabel
                            htmlFor={`form-rhf-checkbox-${task.id}`}
                            className="font-normal"
                          >
                            {task.label}
                          </FieldLabel>
                        </Field>
                      ))}
                    </FieldGroup>
                  </FieldSet>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldGroup>
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
          <Button type="submit" form="form-rhf-checkbox">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-rhf-switch

Switch toggle with horizontal Field layout for boolean settings.

```tsx
"use client"

import * as React from "react"
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
        <CardTitle>Security Gear</CardTitle>
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

### form-rhf-textarea

Textarea field with min/max character validation.

```tsx
"use client"

import * as React from "react"
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
    defaultValues: {
      about: "",
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
                    Tell us more about yourself. This will be used to help us
                    personalize your experience.
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

### form-rhf-radiogroup

Radio group with card-style plan selection using FieldSet, FieldLegend, FieldTitle, and FieldContent.

```tsx
"use client"

import * as React from "react"
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
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@blips/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@blips/ui/components/radio-group"

const plans = [
  {
    id: "starter",
    title: "Starter (100K tokens/month)",
    description: "For everyday use with basic features.",
  },
  {
    id: "pro",
    title: "Pro (1M tokens/month)",
    description: "For advanced AI usage with more features.",
  },
  {
    id: "enterprise",
    title: "Enterprise (Unlimited tokens)",
    description: "For large teams and heavy usage.",
  },
] as const

const formSchema = z.object({
  plan: z.string().min(1, "You must select a subscription plan to continue."),
})

export default function FormRhfRadioGroup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "",
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
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          See pricing and features for each plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-radiogroup" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="plan"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend>Plan</FieldLegend>
                  <FieldDescription>
                    You can upgrade or downgrade your plan at any time.
                  </FieldDescription>
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  >
                    {plans.map((plan) => (
                      <FieldLabel
                        key={plan.id}
                        htmlFor={`form-rhf-radiogroup-${plan.id}`}
                      >
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <FieldTitle>{plan.title}</FieldTitle>
                            <FieldDescription>
                              {plan.description}
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value={plan.id}
                            id={`form-rhf-radiogroup-${plan.id}`}
                            aria-invalid={fieldState.invalid}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
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
          <Button type="submit" form="form-rhf-radiogroup">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-rhf-array

Dynamic field array using `useFieldArray` for managing multiple email addresses with add/remove capabilities.

```tsx
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "@phosphor-icons/react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
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
  FieldLegend,
  FieldSet,
} from "@blips/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group"

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})

export default function FormRhfArray() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [{ address: "" }, { address: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
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
      <CardHeader className="border-b">
        <CardTitle>Contact Emails</CardTitle>
        <CardDescription>Manage your contact email addresses.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="gap-4">
            <FieldLegend variant="label">Email Addresses</FieldLegend>
            <FieldDescription>
              Add up to 5 email addresses where we can contact you.
            </FieldDescription>
            <FieldGroup className="gap-4">
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`emails.${index}.address`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-email-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                          />
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remove email ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ address: "" })}
                disabled={fields.length >= 5}
              >
                Add Email Address
              </Button>
            </FieldGroup>
            {form.formState.errors.emails?.root && (
              <FieldError errors={[form.formState.errors.emails.root]} />
            )}
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-array">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-rhf-complex

Complex multi-field form combining RadioGroup (plan), Select (billing), Checkbox array (add-ons), and Switch (notifications) with FieldSeparator sections.

```tsx
"use client"

import * as React from "react"
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
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@blips/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@blips/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"
import { Switch } from "@blips/ui/components/switch"

const addons = [
  {
    id: "analytics",
    title: "Analytics",
    description: "Advanced analytics and reporting",
  },
  {
    id: "backup",
    title: "Backup",
    description: "Automated daily backups",
  },
  {
    id: "support",
    title: "Priority Support",
    description: "24/7 premium customer support",
  },
] as const

const formSchema = z.object({
  plan: z
    .string({
      required_error: "Please select a subscription plan",
    })
    .min(1, "Please select a subscription plan")
    .refine((value) => value === "basic" || value === "pro", {
      message: "Invalid plan selection. Please choose Basic or Pro",
    }),
  billingPeriod: z
    .string({
      required_error: "Please select a billing period",
    })
    .min(1, "Please select a billing period"),
  addons: z
    .array(z.string())
    .min(1, "Please select at least one add-on")
    .max(3, "You can select up to 3 add-ons")
    .refine(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      { message: "You selected an invalid add-on" }
    ),
  emailNotifications: z.boolean(),
})

export default function FormRhfComplex() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "basic",
      billingPeriod: "",
      addons: [],
      emailNotifications: false,
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
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>You're almost there!</CardTitle>
        <CardDescription>
          Choose your subscription plan and billing period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-complex" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="plan"
              control={form.control}
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid
                return (
                  <FieldSet data-invalid={isInvalid}>
                    <FieldLegend variant="label">Subscription Plan</FieldLegend>
                    <FieldDescription>
                      Choose your subscription plan.
                    </FieldDescription>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={isInvalid}
                    >
                      <FieldLabel htmlFor="form-rhf-complex-basic">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Basic</FieldTitle>
                            <FieldDescription>
                              For individuals and small teams
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value="basic"
                            id="form-rhf-complex-basic"
                          />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="form-rhf-complex-pro">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Pro</FieldTitle>
                            <FieldDescription>
                              For businesses with higher demands
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value="pro"
                            id="form-rhf-complex-pro"
                          />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {isInvalid && <FieldError errors={[fieldState.error]} />}
                  </FieldSet>
                )
              }}
            />
            <FieldSeparator />
            <Controller
              name="billingPeriod"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                    Billing Period
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-complex-billingPeriod"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Choose how often you want to be billed.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldSeparator />
            <Controller
              name="addons"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend>Add-ons</FieldLegend>
                  <FieldDescription>
                    Select additional features you'd like to include.
                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    {addons.map((addon) => (
                      <Field
                        key={addon.id}
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <Checkbox
                          id={`form-rhf-complex-${addon.id}`}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          checked={field.value.includes(addon.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, addon.id]
                              : field.value.filter(
                                  (value) => value !== addon.id
                                )
                            field.onChange(newValue)
                            field.onBlur()
                          }}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor={`form-rhf-complex-${addon.id}`}>
                            {addon.title}
                          </FieldLabel>
                          <FieldDescription>
                            {addon.description}
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    ))}
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <FieldSeparator />
            <Controller
              name="emailNotifications"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-complex-emailNotifications">
                      Email Notifications
                    </FieldLabel>
                    <FieldDescription>
                      Receive email updates about your subscription
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="form-rhf-complex-emailNotifications"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field>
          <Button type="submit" form="form-rhf-complex">
            Save Preferences
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-rhf-password

Password input with real-time strength meter, requirements checklist, and Progress bar visualization.

```tsx
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "@phosphor-icons/react"
import { Controller, useForm, useWatch } from "react-hook-form"
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blips/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import { Progress } from "@blips/ui/components/progress"

const passwordRequirements = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (val: string) => val.length >= 8,
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    test: (val: string) => /[a-z]/.test(val),
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    test: (val: string) => /[A-Z]/.test(val),
  },
  { id: "number", label: "One number", test: (val: string) => /\d/.test(val) },
  {
    id: "special",
    label: "One special character",
    test: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
  },
]

const formSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (val) => /\d/.test(val),
      "Password must contain at least one number"
    )
    .refine(
      (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
      "Password must contain at least one special character"
    ),
})

export default function FormRhfPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })

  const password = useWatch({
    control: form.control,
    name: "password",
  })

  const metRequirements = passwordRequirements.filter((req) =>
    req.test(password || "")
  )
  const strengthPercentage =
    (metRequirements.length / passwordRequirements.length) * 100

  const getStrengthColor = () => {
    if (strengthPercentage === 0) return "bg-neutral-200"
    if (strengthPercentage <= 40) return "bg-red-500"
    if (strengthPercentage <= 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const allRequirementsMet =
    metRequirements.length === passwordRequirements.length

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
      <CardHeader className="border-b">
        <CardTitle>Create Password</CardTitle>
        <CardDescription>
          Choose a strong password to secure your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-password" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-password-input">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="form-rhf-password-input"
                      type="password"
                      placeholder="Enter your password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                    <InputGroupAddon align="inline-end">
                      <Check
                        className={
                          allRequirementsMet
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      />
                    </InputGroupAddon>
                  </InputGroup>

                  {/* Password strength meter */}
                  <div className="space-y-2">
                    <Progress
                      value={strengthPercentage}
                      className={getStrengthColor()}
                    />
                    <div className="space-y-1.5">
                      {passwordRequirements.map((requirement) => {
                        const isMet = requirement.test(password || "")
                        return (
                          <div
                            key={requirement.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check
                              className={
                                isMet
                                  ? "size-4 text-green-500"
                                  : "size-4 text-muted-foreground"
                              }
                            />
                            <span
                              className={
                                isMet
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              {requirement.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="border-t">
        <Field>
          <Button type="submit" form="form-rhf-password">
            Create Password
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

## Form Next Examples

### form-next-demo

Bug report form using Next.js `<Form>` component with `useActionState` for server action integration. Uses Field components with server-side validation error display.

**Note:** This example requires companion server action and schema files (`form-next-demo-action.ts` and `form-next-demo-schema.ts`).

```tsx
"use client"

import * as React from "react"
import Form from "next/form"
import { toast } from "sonner"

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
import { Input } from "@blips/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group"
import { Spinner } from "@blips/ui/components/spinner"

// Server action and schema types (define in separate files)
// type FormState = {
//   values: { title: string; description: string }
//   errors: Record<string, string[]> | null
//   success: boolean
// }

import { demoFormAction } from "./form-next-demo-action"
import { type FormState } from "./form-next-demo-schema"

export default function FormNextDemo() {
  const [formState, formAction, pending] = React.useActionState<
    FormState,
    FormData
  >(demoFormAction, {
    values: {
      title: "",
      description: "",
    },
    errors: null,
    success: false,
  })
  const [descriptionLength, setDescriptionLength] = React.useState(0)

  React.useEffect(() => {
    if (formState.success) {
      toast("Thank you for your feedback", {
        description: "We'll review your report and get back to you soon.",
      })
    }
  }, [formState.success])

  React.useEffect(() => {
    setDescriptionLength(formState.values.description.length)
  }, [formState.values.description])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form action={formAction} id="bug-report-form">
          <FieldGroup>
            <Field data-invalid={!!formState.errors?.title?.length}>
              <FieldLabel htmlFor="title">Bug Title</FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={formState.values.title}
                disabled={pending}
                aria-invalid={!!formState.errors?.title?.length}
                placeholder="Login button not working on mobile"
                autoComplete="off"
              />
              {formState.errors?.title && (
                <FieldError>{formState.errors.title[0]}</FieldError>
              )}
            </Field>
            <Field data-invalid={!!formState.errors?.description?.length}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="description"
                  name="description"
                  defaultValue={formState.values.description}
                  placeholder="I'm having an issue with the login button on mobile."
                  rows={6}
                  className="min-h-24 resize-none"
                  disabled={pending}
                  aria-invalid={!!formState.errors?.description?.length}
                  onChange={(e) => setDescriptionLength(e.target.value.length)}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {descriptionLength}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Include steps to reproduce, expected behavior, and what actually
                happened.
              </FieldDescription>
              {formState.errors?.description && (
                <FieldError>{formState.errors.description[0]}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" disabled={pending} form="bug-report-form">
            {pending && <Spinner />}
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

### form-next-complex

Complex subscription form using Next.js server actions with RadioGroup, Select, Checkbox array, and Switch. Demonstrates `useActionState` with multiple field types.

**Note:** This example requires companion server action and schema files (`form-next-complex-action.ts` and `form-next-complex-schema.ts`).

```tsx
"use client"

import * as React from "react"
import Form from "next/form"
import { toast } from "sonner"

import { Button } from "@blips/ui/components/button"
import { Card, CardContent, CardFooter } from "@blips/ui/components/card"
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@blips/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@blips/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"
import { Spinner } from "@blips/ui/components/spinner"
import { Switch } from "@blips/ui/components/switch"

import { complexFormAction } from "./form-next-complex-action"
import { addons, type FormState } from "./form-next-complex-schema"

export default function FormNextComplex() {
  const [formState, formAction, pending] = React.useActionState<
    FormState,
    FormData
  >(complexFormAction, {
    values: {
      plan: "basic",
      billingPeriod: "monthly",
      addons: [],
      emailNotifications: false,
    },
    errors: null,
    success: false,
  })

  React.useEffect(() => {
    if (formState.success) {
      toast.success("Preferences saved", {
        description: "Your subscription plan has been updated.",
      })
    }
  }, [formState.success])

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <Form action={formAction} id="subscription-form">
          <FieldGroup>
            <FieldSet data-invalid={!!formState.errors?.plan?.length}>
              <FieldLegend>Subscription Plan</FieldLegend>
              <FieldDescription>
                Choose your subscription plan.
              </FieldDescription>
              <RadioGroup
                name="plan"
                defaultValue={formState.values.plan}
                disabled={pending}
                aria-invalid={!!formState.errors?.plan?.length}
              >
                <FieldLabel htmlFor="basic">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Basic</FieldTitle>
                      <FieldDescription>
                        For individuals and small teams
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="basic" id="basic" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="pro">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Pro</FieldTitle>
                      <FieldDescription>
                        For businesses with higher demands
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="pro" id="pro" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
              {formState.errors?.plan && (
                <FieldError>{formState.errors.plan[0]}</FieldError>
              )}
            </FieldSet>
            <FieldSeparator />
            <Field data-invalid={!!formState.errors?.billingPeriod?.length}>
              <FieldLabel htmlFor="billingPeriod">Billing Period</FieldLabel>
              <Select
                name="billingPeriod"
                defaultValue={formState.values.billingPeriod}
                disabled={pending}
                aria-invalid={!!formState.errors?.billingPeriod?.length}
              >
                <SelectTrigger id="billingPeriod">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose how often you want to be billed.
              </FieldDescription>
              {formState.errors?.billingPeriod && (
                <FieldError>{formState.errors.billingPeriod[0]}</FieldError>
              )}
            </Field>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Add-ons</FieldLegend>
              <FieldDescription>
                Select additional features you'd like to include.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                {addons.map((addon) => (
                  <Field
                    key={addon.id}
                    orientation="horizontal"
                    data-invalid={!!formState.errors?.addons?.length}
                  >
                    <Checkbox
                      id={addon.id}
                      name="addons"
                      value={addon.id}
                      defaultChecked={formState.values.addons.includes(
                        addon.id
                      )}
                      disabled={pending}
                      aria-invalid={!!formState.errors?.addons?.length}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={addon.id}>{addon.title}</FieldLabel>
                      <FieldDescription>{addon.description}</FieldDescription>
                    </FieldContent>
                  </Field>
                ))}
              </FieldGroup>
              {formState.errors?.addons && (
                <FieldError>{formState.errors.addons[0]}</FieldError>
              )}
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="emailNotifications">
                  Email Notifications
                </FieldLabel>
                <FieldDescription>
                  Receive email updates about your subscription
                </FieldDescription>
              </FieldContent>
              <Switch
                id="emailNotifications"
                name="emailNotifications"
                defaultChecked={formState.values.emailNotifications}
                disabled={pending}
                aria-invalid={!!formState.errors?.emailNotifications?.length}
              />
            </Field>
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="justify-end">
          <Button type="submit" disabled={pending} form="subscription-form">
            {pending && <Spinner />}
            Save Preferences
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```
