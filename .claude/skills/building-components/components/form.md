# Form

**Categoria:** Behavioral | **Deps:** `@radix-ui/react-label`, `@radix-ui/react-slot`, `react-hook-form`, `@/components/label` | **"use client":** Sim

## Exports

`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`

## Uso

### Formulário básico com campo de texto

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
    message: "O nome de usuário deve ter pelo menos 2 caracteres.",
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
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                Este é o seu nome de exibição público.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
```

### Formulário com Select

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
      <FormLabel>Função</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma função" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="user">Usuário</SelectItem>
          <SelectItem value="guest">Convidado</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Formulário com Checkbox

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
        <FormLabel>Termos e condições</FormLabel>
        <FormDescription>
          Concordo com os termos e condições.
        </FormDescription>
      </div>
    </FormItem>
  )}
/>
```

### Formulário com Radio Group

```tsx
import { RadioGroup, RadioGroupItem } from "@blips/ui"

<FormField
  control={form.control}
  name="language"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Idioma</FormLabel>
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
            <FormLabel className="font-normal">Inglês</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="pt" />
            </FormControl>
            <FormLabel className="font-normal">Português</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Formulário com Textarea

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
          placeholder="Fale um pouco sobre você..."
          className="resize-none"
          {...field}
        />
      </FormControl>
      <FormDescription>
        Breve descrição para o seu perfil. Máximo de 160 caracteres.
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

O componente `FormControl` usa `Slot` para injetar os atributos `aria-describedby`, `aria-invalid` e `disabled` nos elementos de formulário filhos. Isso garante a acessibilidade correta sem exigir a passagem explícita de props.

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
