# ContextMenu

**Categoria:** Compound | **Deps:** `@radix-ui/react-context-menu`, `@phosphor-icons/react` | **"use client":** Não

## Exports

`ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuRadioGroup`

## Uso

### Basic Context Menu

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuShortcut,
} from "@blips/ui"

<ContextMenu>
  <ContextMenuTrigger className="w-64 h-32 border border-dashed rounded-md flex items-center justify-center">
    Clique com o botão direito aqui
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem>
      Voltar
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Avançar
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>Mostrar favoritos</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Mostrar URLs completas</ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>
```

### Context Menu with Submenu

```tsx
<ContextMenu>
  <ContextMenuTrigger>Clique com o botão direito</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Recortar</ContextMenuItem>
    <ContextMenuItem>Copiar</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Mais ferramentas</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Salvar página como...</ContextMenuItem>
        <ContextMenuItem>Criar atalho...</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>
```

### Context Menu with Radio Items

```tsx
<ContextMenu>
  <ContextMenuTrigger>Clique com o botão direito</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Aparência</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
      <ContextMenuRadioItem value="light">Claro</ContextMenuRadioItem>
      <ContextMenuRadioItem value="dark">Escuro</ContextMenuRadioItem>
      <ContextMenuRadioItem value="system">Sistema</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>
```

## Props e Variantes

### ContextMenuTrigger
- `children`: ReactNode - Elemento que dispara o menu
- `className`: string - Classes CSS customizadas
- `asChild`: boolean - Usar como componente filho

### ContextMenuContent
- `children`: ReactNode - Conteúdo do menu
- `className`: string - Classes CSS customizadas
- `align`: 'start' | 'center' | 'end' - Alinhamento do conteúdo
- `side`: 'top' | 'right' | 'bottom' | 'left' - Lado do menu

### ContextMenuItem
- `children`: ReactNode - Conteúdo do item
- `onSelect`: () => void - Callback de seleção
- `className`: string - Classes CSS customizadas
- `disabled`: boolean - Desabilitar item

### ContextMenuCheckboxItem
- `checked`: boolean - Estado do checkbox
- `onCheckedChange`: (checked: boolean) => void - Handler de mudança de estado
- `children`: ReactNode - Conteúdo do item
- `className`: string - Classes CSS customizadas

### ContextMenuRadioItem
- `value`: string - Valor do radio
- `children`: ReactNode - Conteúdo do item
- `className`: string - Classes CSS customizadas

### ContextMenuLabel
- `children`: ReactNode - Texto do label
- `className`: string - Classes CSS customizadas
- `inset`: boolean - Adicionar padding interno

### ContextMenuSeparator
- `className`: string - Classes CSS customizadas

### ContextMenuShortcut
- `children`: ReactNode - Texto do atalho
- `className`: string - Classes CSS customizadas

### ContextMenuRadioGroup
- `value`: string - Valor selecionado
- `onValueChange`: (value: string) => void - Handler de mudança
- `children`: ReactNode - Itens de radio

### ContextMenuSub
- `children`: ReactNode - Conteúdo do submenu
- `open`: boolean - Estado de abertura
- `onOpenChange`: (open: boolean) => void - Handler de mudança de estado

### ContextMenuSubTrigger
- `children`: ReactNode - Conteúdo do trigger
- `className`: string - Classes CSS customizadas
- `inset`: boolean - Adicionar padding interno

### ContextMenuSubContent
- `children`: ReactNode - Conteúdo do submenu
- `className`: string - Classes CSS customizadas
