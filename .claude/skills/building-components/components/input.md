# Input

**Categoria:** Primitive | **Deps:** Nenhuma externa | **"use client":** Não

## Source Code

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
```

## Exports

`Input`

## Uso

### Campo de texto

```tsx
import { Input } from "@blips/ui"

<Input placeholder="Digite o texto..." />
```

### Campo de e-mail

```tsx
<Input type="email" placeholder="nome@exemplo.com" />
```

### Campo de senha

```tsx
<Input type="password" placeholder="Digite a senha..." />
```

### Campo de arquivo

```tsx
<Input type="file" />
```

### Campo numérico

```tsx
<Input type="number" placeholder="0" />
```

### Campo de data

```tsx
<Input type="date" />
```

### Campo de busca

```tsx
<Input type="search" placeholder="Buscar..." />
```

### Campo desabilitado

```tsx
<Input disabled placeholder="Campo desabilitado" />
```

### Campo com valor padrão

```tsx
<Input defaultValue="Valor padrão" />
```

### Campo controlado

```tsx
const [value, setValue] = React.useState("")

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Digite algo..."
/>
```

### Campo com ícone

```tsx
import { Search } from "lucide-react"

<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-9" placeholder="Buscar..." />
</div>
```

### Campo em um formulário

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl } from "@blips/ui"

<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>E-mail</FormLabel>
      <FormControl>
        <Input placeholder="Digite o seu e-mail..." {...field} />
      </FormControl>
    </FormItem>
  )}
/>
```

## Props & Variants

### Input

O componente `Input` aceita todas as props padrão do elemento input HTML:

- `type`: string - Input type (default: 'text')
  - Common values: 'text', 'email', 'password', 'number', 'date', 'file', 'search', 'tel', 'url'
- `placeholder`: string - Placeholder text
- `value`: string - Input value (controlled)
- `defaultValue`: string - Default value (uncontrolled)
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void - Change handler
- `onFocus`: (event: FocusEvent<HTMLInputElement>) => void - Focus handler
- `onBlur`: (event: FocusEvent<HTMLInputElement>) => void - Blur handler
- `disabled`: boolean - Disable input
- `readOnly`: boolean - Make input read-only
- `required`: boolean - Mark as required
- `min`: string | number - Minimum value (for number/date inputs)
- `max`: string | number - Maximum value (for number/date inputs)
- `step`: string | number - Step increment (for number/range inputs)
- `pattern`: string - Validation pattern (for text-like inputs)
- `maxLength`: number - Maximum character length
- `minLength`: number - Minimum character length
- `autoComplete`: string - Autocomplete behavior
- `autoFocus`: boolean - Auto focus on mount
- `className`: string - Custom CSS classes
- `ref`: React.Ref<HTMLInputElement> - Forward ref

## Styling

O componente Input aplica estas classes padrão:

- **Layout**: `flex h-10 w-full` - Largura total com altura fixa
- **Bordas**: `rounded-md border border-input` - Cantos arredondados e cor de borda do input
- **Fundo**: `bg-background` - Usa variável CSS para o fundo
- **Padding**: `px-3 py-2` - Padding horizontal e vertical
- **Texto**: `text-base md:text-sm` - Tamanhos de fonte responsivos
- **Foco**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` - Anel de contorno no foco
- **Desabilitado**: `disabled:cursor-not-allowed disabled:opacity-50` - Feedback visual quando desabilitado
- **Placeholder**: `placeholder:text-muted-foreground` - Cor de placeholder atenuada
- **Campo de arquivo**: `file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground` - Botão de arquivo estilizado

## Accessibility

- Elemento input HTML semântico
- Anel de foco para navegação por teclado
- Estado desabilitado corretamente sinalizado
- Funciona com labels de formulário e o contexto de campo de formulário
- Suporta todos os atributos ARIA via pass-through
