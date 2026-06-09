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
import { MagnifyingGlass } from "@phosphor-icons/react"

<InputGroup>
  <InputGroupAddon align="inline-start">
    <MagnifyingGlass className="h-4 w-4" />
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
- `children`: ReactNode - Conteúdo do grupo (addons e inputs)
- `className`: string - Classes CSS customizadas
- `data-slot`: string - Definido automaticamente como 'input-group' para seletores CSS

Recursos:
- Usa seletores CSS `:has()` para estilização reativa
- Layout responsivo com flexbox
- Suporta alinhamento de addon inline e em bloco

### InputGroupAddon
- `children`: ReactNode - Conteúdo do addon (ícone, texto, botão, etc.)
- `className`: string - Classes CSS customizadas
- `align`: 'inline-start' | 'inline-end' | 'block-start' | 'block-end' - Posição do addon (padrão: 'inline-start')

Variantes de alinhamento:
- `inline-start`: Lado esquerdo (à frente)
- `inline-end`: Lado direito (ao final)
- `block-start`: Topo (para layout vertical)
- `block-end`: Base (para layout vertical)

### InputGroupButton
- `children`: ReactNode - Conteúdo do botão
- `className`: string - Classes CSS customizadas
- `size`: 'xs' | 'sm' | 'icon-xs' | 'icon-sm' - Tamanho do botão
  - `xs`: Botão de texto extra pequeno
  - `sm`: Botão de texto pequeno
  - `icon-xs`: Botão somente ícone extra pequeno
  - `icon-sm`: Botão somente ícone pequeno
- `variant`: 'default' | 'outline' | 'ghost' | 'secondary' - Variante do botão
- `disabled`: boolean - Desabilita o botão
- `onClick`: () => void - Handler de clique

### InputGroupInput
- `children`: ReactNode - Conteúdo do input
- `className`: string - Classes CSS customizadas
- `placeholder`: string - Texto de placeholder
- `disabled`: boolean - Desabilita o input
- `type`: string - Tipo do input
- Todas as props padrão de input HTML

### InputGroupTextarea
- `children`: ReactNode - Conteúdo do textarea
- `className`: string - Classes CSS customizadas
- `placeholder`: string - Texto de placeholder
- `disabled`: boolean - Desabilita o textarea
- Todas as props padrão de textarea HTML

### InputGroupText
- `children`: ReactNode - Conteúdo de texto
- `className`: string - Classes CSS customizadas

## Propriedades CSS customizadas

O componente InputGroup usa seletores CSS `:has()` para aplicar estilização reativa:

```css
[data-slot="input-group"]:has([data-group-addon-align="inline-start"]) {
  /* estilos para addon à frente */
}

[data-slot="input-group"]:has([data-group-addon-align="inline-end"]) {
  /* estilos para addon ao final */
}

[data-slot="input-group"]:has([data-group-addon-align="block-start"]) {
  /* estilos para addon no topo */
}
```

Isso permite que o componente adapte seu layout com base na presença e posição dos addons, sem elementos de wrapper adicionais.
