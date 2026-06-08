# InputGroup

**Categoria:** Composition | **Deps:** `class-variance-authority`, `@/components/button`, `@/components/input`, `@/components/textarea` | **"use client":** Não

## Exports

`InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupTextarea`, `InputGroupText`

## Uso

### Input group com ícone (à esquerda)

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui"
import { Search } from "lucide-react"

<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Buscar..." />
</InputGroup>
```

### Input group com botão (à direita)

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui"

<InputGroup>
  <InputGroupInput placeholder="Digite a URL..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">Ir</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### Input group com prefixo de texto

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@blips/ui"

<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>
```

### Input group com atalho de teclado (Kbd)

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui"
import { Kbd } from "@blips/ui"

<InputGroup>
  <InputGroupInput placeholder="Buscar..." />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>
```

### Input group com múltiplos addons

```tsx
<InputGroup>
  <InputGroupAddon align="block-start">
    <label className="text-sm font-medium">E-mail</label>
  </InputGroupAddon>
  <InputGroupAddon align="inline-start">
    <Mail className="h-4 w-4" />
  </InputGroupAddon>
  <InputGroupInput type="email" placeholder="nome@exemplo.com" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs">
      <Check className="h-4 w-4" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### Grupo de textarea

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
  InputGroupText,
} from "@blips/ui"

<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText className="text-sm font-medium">Descrição</InputGroupText>
  </InputGroupAddon>
  <InputGroupTextarea placeholder="Digite a descrição..." />
</InputGroup>
```

### Input group com layout em bloco

```tsx
<InputGroup>
  <InputGroupAddon align="block-start">
    <label className="text-sm font-semibold">Senha</label>
  </InputGroupAddon>
  <InputGroupInput type="password" placeholder="Digite a senha..." />
  <InputGroupAddon align="block-end">
    <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres</p>
  </InputGroupAddon>
</InputGroup>
```

## Props & Variants

### InputGroup
- `children`: ReactNode - Group content (addons and inputs)
- `className`: string - Custom CSS classes
- `data-slot`: string - Automatically set to 'input-group' for CSS selectors

Features:
- Uses CSS `:has()` selectors for reactive styling
- Responsive layout with flexbox
- Supports inline and block addon alignment

### InputGroupAddon
- `children`: ReactNode - Addon content (icon, text, button, etc.)
- `className`: string - Custom CSS classes
- `align`: 'inline-start' | 'inline-end' | 'block-start' | 'block-end' - Addon position (default: 'inline-start')

Alignment variants:
- `inline-start`: Left side (leading)
- `inline-end`: Right side (trailing)
- `block-start`: Top (for vertical layout)
- `block-end`: Bottom (for vertical layout)

### InputGroupButton
- `children`: ReactNode - Button content
- `className`: string - Custom CSS classes
- `size`: 'xs' | 'sm' | 'icon-xs' | 'icon-sm' - Button size
  - `xs`: Extra small text button
  - `sm`: Small text button
  - `icon-xs`: Extra small icon-only button
  - `icon-sm`: Small icon-only button
- `variant`: 'default' | 'outline' | 'ghost' | 'secondary' - Button variant
- `disabled`: boolean - Disable button
- `onClick`: () => void - Click handler

### InputGroupInput
- `children`: ReactNode - Input content
- `className`: string - Custom CSS classes
- `placeholder`: string - Placeholder text
- `disabled`: boolean - Disable input
- `type`: string - Input type
- All standard HTML input props

### InputGroupTextarea
- `children`: ReactNode - Textarea content
- `className`: string - Custom CSS classes
- `placeholder`: string - Placeholder text
- `disabled`: boolean - Disable textarea
- All standard HTML textarea props

### InputGroupText
- `children`: ReactNode - Text content
- `className`: string - Custom CSS classes

## CSS Custom Properties

The InputGroup component uses CSS `:has()` selectors to apply reactive styling:

```css
[data-slot="input-group"]:has([data-group-addon-align="inline-start"]) {
  /* styles for leading addon */
}

[data-slot="input-group"]:has([data-group-addon-align="inline-end"]) {
  /* styles for trailing addon */
}

[data-slot="input-group"]:has([data-group-addon-align="block-start"]) {
  /* styles for top addon */
}
```

Isso permite que o componente adapte seu layout com base na presença e posição dos addons, sem elementos de wrapper adicionais.
