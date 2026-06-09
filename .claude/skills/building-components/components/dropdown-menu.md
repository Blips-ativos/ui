# DropdownMenu

**Categoria:** Compound | **Deps:** `@radix-ui/react-dropdown-menu`, `@phosphor-icons/react` | **"use client":** Sim

## Exports

`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`

## Uso

### Menu dropdown básico

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@blips/ui"
import { Button } from "@blips/ui"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Perfil
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Configurações
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Menu dropdown com itens de checkbox

```tsx
const [checked, setChecked] = React.useState(false)

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Exibir</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
      Mostrar painel
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Mostrar detalhes</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Menu dropdown com itens de rádio

```tsx
const [theme, setTheme] = React.useState("light")

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Tema</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Aparência</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">Claro</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Escuro</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">Sistema</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

### Menu dropdown com submenu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Ações</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>Recortar</DropdownMenuItem>
    <DropdownMenuItem>Copiar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Mais ferramentas</DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-48">
        <DropdownMenuItem>Salvar página como...</DropdownMenuItem>
        <DropdownMenuItem>Criar atalho...</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Ferramentas de desenvolvedor</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

### Menu dropdown com grupos

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Mais</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Grupo 1</DropdownMenuLabel>
      <DropdownMenuItem>Item 1</DropdownMenuItem>
      <DropdownMenuItem>Item 2</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuLabel>Grupo 2</DropdownMenuLabel>
      <DropdownMenuItem>Item 3</DropdownMenuItem>
      <DropdownMenuItem>Item 4</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

## Props & Variantes

### DropdownMenuTrigger
- `children`: ReactNode - Elemento gatilho
- `asChild`: boolean - Mescla com as props do componente filho
- `className`: string - Classes CSS customizadas

### DropdownMenuContent
- `children`: ReactNode - Conteúdo do menu
- `className`: string - Classes CSS customizadas
- `align`: 'start' | 'center' | 'end' - Alinhamento do conteúdo
- `side`: 'top' | 'right' | 'bottom' | 'left' - Lado do menu
- `sideOffset`: number - Distância do gatilho

### DropdownMenuItem
- `children`: ReactNode - Conteúdo do item
- `onSelect`: () => void - Callback de seleção
- `className`: string - Classes CSS customizadas
- `disabled`: boolean - Desabilita o item
- `inset`: boolean - Adiciona recuo interno (alinha com os indicadores de checkbox)

### DropdownMenuCheckboxItem
- `checked`: boolean - Estado do checkbox
- `onCheckedChange`: (checked: boolean) => void - Manipulador de mudança de estado
- `children`: ReactNode - Conteúdo do item
- `className`: string - Classes CSS customizadas
- `disabled`: boolean - Desabilita o item

### DropdownMenuRadioItem
- `value`: string - Valor do rádio
- `children`: ReactNode - Conteúdo do item
- `className`: string - Classes CSS customizadas
- `disabled`: boolean - Desabilita o item

### DropdownMenuLabel
- `children`: ReactNode - Texto do rótulo
- `className`: string - Classes CSS customizadas
- `inset`: boolean - Adiciona recuo interno

### DropdownMenuSeparator
- `className`: string - Classes CSS customizadas

### DropdownMenuShortcut
- `children`: ReactNode - Texto do atalho
- `className`: string - Classes CSS customizadas

### DropdownMenuRadioGroup
- `value`: string - Valor selecionado
- `onValueChange`: (value: string) => void - Manipulador de mudança
- `children`: ReactNode - Itens de rádio

### DropdownMenuSub
- `children`: ReactNode - Conteúdo do submenu
- `open`: boolean - Estado de aberto
- `onOpenChange`: (open: boolean) => void - Manipulador de mudança de estado

### DropdownMenuSubTrigger
- `children`: ReactNode - Conteúdo do gatilho
- `className`: string - Classes CSS customizadas
- `inset`: boolean - Adiciona recuo interno

### DropdownMenuSubContent
- `children`: ReactNode - Conteúdo do submenu
- `className`: string - Classes CSS customizadas

### DropdownMenuGroup
- `children`: ReactNode - Itens do grupo
- `className`: string - Classes CSS customizadas

### DropdownMenuPortal
- `children`: ReactNode - Conteúdo do portal
- `forceMount`: boolean - Força a montagem no DOM
