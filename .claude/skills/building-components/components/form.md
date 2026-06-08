# Form

**Categoria:** Behavioral | **Deps:** `@radix-ui/react-label`, `@radix-ui/react-slot`, `react-hook-form`, `@/components/label` | **"use client":** Sim

## Exports

`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`

## Usage

### Basic Form with Text Input

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Button,
  Input,
} from "@blips/ui"

const schema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
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

### Form with Select

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui"

<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="guest">Guest</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Form with Checkbox

```tsx
import { Checkbox } from "@blips/ui"

<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>Terms and Conditions</FormLabel>
        <FormDescription>
          I agree to the terms and conditions.
        </FormDescription>
      </div>
    </FormItem>
  )}
/>
```

### Form with Radio Group

```tsx
import { RadioGroup, RadioGroupItem } from "@blips/ui"

<FormField
  control={form.control}
  name="language"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Language</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col space-y-1"
        >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="en" />
            </FormControl>
            <FormLabel className="font-normal">English</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="pt" />
            </FormControl>
            <FormLabel className="font-normal">Portuguese</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Form with Textarea

```tsx
import { Textarea } from "@blips/ui"

<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea
          placeholder="Tell us about yourself..."
          className="resize-none"
          {...field}
        />
      </FormControl>
      <FormDescription>
        Brief description for your profile. Max 160 characters.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Architecture

### Context Providers

- **FormFieldContext**: Provides `name` and `control` to child components
- **FormItemContext**: Manages form item ID generation and validation state

### FormControl Component

The `FormControl` component uses `Slot` to inject `aria-describedby`, `aria-invalid`, and `disabled` attributes into child form elements. This ensures proper accessibility without requiring explicit prop passing.

## Props & Variants

### Form
- `children`: ReactNode - Form content
- Props from `react-hook-form`'s `useFormContext`

### FormField
- `control`: Control object from `useForm`
- `name`: string - Field name
- `render`: (props: FieldRenderProps) => ReactNode - Render function
- `defaultValue`: any - Default value

### FormItem
- `children`: ReactNode - Item content
- `className`: string - Custom CSS classes

### FormLabel
- `children`: ReactNode - Label text
- `className`: string - Custom CSS classes
- `htmlFor`: string - Associated input ID

### FormControl
- `children`: ReactNode - Form control element (uses Slot)
- `className`: string - Custom CSS classes

### FormDescription
- `children`: ReactNode - Description text
- `className`: string - Custom CSS classes
- `id`: string - Associated with aria-describedby

### FormMessage
- `children`: ReactNode - Custom message content
- `className`: string - Custom CSS classes

### useFormField
React hook to access form field context:
```tsx
const { id, name, formItemId, formDescriptionId, formMessageId } = useFormField()
```

Returns object with:
- `id`: string - Generated form item ID
- `name`: string - Field name
- `formItemId`: string - Form item container ID
- `formDescriptionId`: string - Description element ID
- `formMessageId`: string - Error message element ID
