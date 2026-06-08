# DropdownMenu

**Categoria:** Compound | **Deps:** `@radix-ui/react-dropdown-menu`, `lucide-react` | **"use client":** Sim

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

## Props & Variants

### DropdownMenuTrigger
- `children`: ReactNode - Trigger element
- `asChild`: boolean - Merge with child component props
- `className`: string - Custom CSS classes

### DropdownMenuContent
- `children`: ReactNode - Menu content
- `className`: string - Custom CSS classes
- `align`: 'start' | 'center' | 'end' - Content alignment
- `side`: 'top' | 'right' | 'bottom' | 'left' - Menu side
- `sideOffset`: number - Distance from trigger

### DropdownMenuItem
- `children`: ReactNode - Item content
- `onSelect`: () => void - Selection callback
- `className`: string - Custom CSS classes
- `disabled`: boolean - Disable item
- `inset`: boolean - Add inset padding (aligns with checkbox indicators)

### DropdownMenuCheckboxItem
- `checked`: boolean - Checkbox state
- `onCheckedChange`: (checked: boolean) => void - State change handler
- `children`: ReactNode - Item content
- `className`: string - Custom CSS classes
- `disabled`: boolean - Disable item

### DropdownMenuRadioItem
- `value`: string - Radio value
- `children`: ReactNode - Item content
- `className`: string - Custom CSS classes
- `disabled`: boolean - Disable item

### DropdownMenuLabel
- `children`: ReactNode - Label text
- `className`: string - Custom CSS classes
- `inset`: boolean - Add inset padding

### DropdownMenuSeparator
- `className`: string - Custom CSS classes

### DropdownMenuShortcut
- `children`: ReactNode - Shortcut text
- `className`: string - Custom CSS classes

### DropdownMenuRadioGroup
- `value`: string - Selected value
- `onValueChange`: (value: string) => void - Change handler
- `children`: ReactNode - Radio items

### DropdownMenuSub
- `children`: ReactNode - Submenu content
- `open`: boolean - Open state
- `onOpenChange`: (open: boolean) => void - State change handler

### DropdownMenuSubTrigger
- `children`: ReactNode - Trigger content
- `className`: string - Custom CSS classes
- `inset`: boolean - Add inset padding

### DropdownMenuSubContent
- `children`: ReactNode - Submenu content
- `className`: string - Custom CSS classes

### DropdownMenuGroup
- `children`: ReactNode - Group items
- `className`: string - Custom CSS classes

### DropdownMenuPortal
- `children`: ReactNode - Portal content
- `forceMount`: boolean - Force mount to DOM
