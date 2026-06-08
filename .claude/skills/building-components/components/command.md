# Command

**Categoria:** Compound | **Deps:** `cmdk`, `@/components/dialog` | **"use client":** Não

## Exports

`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`

## Usage

### Inline Command

```tsx
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@blips/ui"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Command as Dialog (⌘K)

```tsx
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@blips/ui"

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>
        New File
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Open File
        <CommandShortcut>⌘O</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

## Props & Variants

### Command
- `className`: string - Custom CSS classes
- `children`: ReactNode - Command content

### CommandDialog
- `open`: boolean - Dialog open state
- `onOpenChange`: (open: boolean) => void - Dialog state change handler

### CommandInput
- `placeholder`: string - Input placeholder text
- `className`: string - Custom CSS classes

### CommandList
- `children`: ReactNode - List content
- `className`: string - Custom CSS classes

### CommandEmpty
- `children`: ReactNode - Empty state content
- `className`: string - Custom CSS classes

### CommandGroup
- `heading`: string - Group heading text
- `children`: ReactNode - Group items
- `className`: string - Custom CSS classes

### CommandItem
- `children`: ReactNode - Item content
- `onSelect`: () => void - Selection callback
- `className`: string - Custom CSS classes
- `value`: string - Item value for filtering

### CommandShortcut
- `children`: ReactNode - Shortcut text/icon
- `className`: string - Custom CSS classes

### CommandSeparator
- `className`: string - Custom CSS classes
