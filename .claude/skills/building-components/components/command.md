# Command

**Categoria:** Compound | **Deps:** `cmdk`, `@/components/dialog` | **"use client":** Não

## Exports

`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`

## Uso

### Command inline

```tsx
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@blips/ui"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Digite um comando..." />
  <CommandList>
    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
    <CommandGroup heading="Sugestões">
      <CommandItem>Calendário</CommandItem>
      <CommandItem>Buscar</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Command como Dialog (⌘K)

```tsx
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@blips/ui"

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Digite um comando..." />
  <CommandList>
    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
    <CommandGroup heading="Ações">
      <CommandItem>
        Novo arquivo
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Abrir arquivo
        <CommandShortcut>⌘O</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

## Props e Variantes

### Command
- `className`: string - Classes CSS customizadas
- `children`: ReactNode - Conteúdo do command

### CommandDialog
- `open`: boolean - Estado de abertura do dialog
- `onOpenChange`: (open: boolean) => void - Handler de mudança de estado do dialog

### CommandInput
- `placeholder`: string - Texto de placeholder do input
- `className`: string - Classes CSS customizadas

### CommandList
- `children`: ReactNode - Conteúdo da lista
- `className`: string - Classes CSS customizadas

### CommandEmpty
- `children`: ReactNode - Conteúdo do estado vazio
- `className`: string - Classes CSS customizadas

### CommandGroup
- `heading`: string - Texto do cabeçalho do grupo
- `children`: ReactNode - Itens do grupo
- `className`: string - Classes CSS customizadas

### CommandItem
- `children`: ReactNode - Conteúdo do item
- `onSelect`: () => void - Callback de seleção
- `className`: string - Classes CSS customizadas
- `value`: string - Valor do item para filtragem

### CommandShortcut
- `children`: ReactNode - Texto/ícone do atalho
- `className`: string - Classes CSS customizadas

### CommandSeparator
- `className`: string - Classes CSS customizadas
