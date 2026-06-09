# Input

**Categoria:** Primitive | **Deps:** Nenhuma externa | **"use client":** Não

## Código-fonte

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
import { MagnifyingGlass } from "@phosphor-icons/react"

<div className="relative">
  <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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

## Props e variantes

### Input

O componente `Input` aceita todas as props padrão do elemento input HTML:

- `type`: string - Tipo do input (padrão: 'text')
  - Valores comuns: 'text', 'email', 'password', 'number', 'date', 'file', 'search', 'tel', 'url'
- `placeholder`: string - Texto de placeholder
- `value`: string - Valor do input (controlado)
- `defaultValue`: string - Valor padrão (não controlado)
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void - Manipulador de mudança
- `onFocus`: (event: FocusEvent<HTMLInputElement>) => void - Manipulador de foco
- `onBlur`: (event: FocusEvent<HTMLInputElement>) => void - Manipulador de blur
- `disabled`: boolean - Desabilita o input
- `readOnly`: boolean - Torna o input somente leitura
- `required`: boolean - Marca como obrigatório
- `min`: string | number - Valor mínimo (para inputs de número/data)
- `max`: string | number - Valor máximo (para inputs de número/data)
- `step`: string | number - Incremento do passo (para inputs de número/range)
- `pattern`: string - Padrão de validação (para inputs do tipo texto)
- `maxLength`: number - Comprimento máximo de caracteres
- `minLength`: number - Comprimento mínimo de caracteres
- `autoComplete`: string - Comportamento de autocompletar
- `autoFocus`: boolean - Foco automático ao montar
- `className`: string - Classes CSS customizadas
- `ref`: React.Ref<HTMLInputElement> - Forward ref

## Estilização

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

## Acessibilidade

- Elemento input HTML semântico
- Anel de foco para navegação por teclado
- Estado desabilitado corretamente sinalizado
- Funciona com labels de formulário e o contexto de campo de formulário
- Suporta todos os atributos ARIA via pass-through
