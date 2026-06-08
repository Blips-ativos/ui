# ContextMenu

**Categoria:** Compound | **Deps:** `@radix-ui/react-context-menu`, `lucide-react` | **"use client":** Não

## Exports

`ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuRadioGroup`

## Usage

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
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>Show Bookmarks</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>
```

### Context Menu with Submenu

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Save Page As...</ContextMenuItem>
        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>
```

### Context Menu with Radio Items

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Appearance</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
      <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
      <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
      <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>
```

## Props & Variants

### ContextMenuTrigger
- `children`: ReactNode - Trigger element
- `className`: string - Custom CSS classes
- `asChild`: boolean - Use as child component

### ContextMenuContent
- `children`: ReactNode - Menu content
- `className`: string - Custom CSS classes
- `align`: 'start' | 'center' | 'end' - Content alignment
- `side`: 'top' | 'right' | 'bottom' | 'left' - Menu side

### ContextMenuItem
- `children`: ReactNode - Item content
- `onSelect`: () => void - Selection callback
- `className`: string - Custom CSS classes
- `disabled`: boolean - Disable item

### ContextMenuCheckboxItem
- `checked`: boolean - Checkbox state
- `onCheckedChange`: (checked: boolean) => void - State change handler
- `children`: ReactNode - Item content
- `className`: string - Custom CSS classes

### ContextMenuRadioItem
- `value`: string - Radio value
- `children`: ReactNode - Item content
- `className`: string - Custom CSS classes

### ContextMenuLabel
- `children`: ReactNode - Label text
- `className`: string - Custom CSS classes
- `inset`: boolean - Add inset padding

### ContextMenuSeparator
- `className`: string - Custom CSS classes

### ContextMenuShortcut
- `children`: ReactNode - Shortcut text
- `className`: string - Custom CSS classes

### ContextMenuRadioGroup
- `value`: string - Selected value
- `onValueChange`: (value: string) => void - Change handler
- `children`: ReactNode - Radio items

### ContextMenuSub
- `children`: ReactNode - Submenu content
- `open`: boolean - Open state
- `onOpenChange`: (open: boolean) => void - State change handler

### ContextMenuSubTrigger
- `children`: ReactNode - Trigger content
- `className`: string - Custom CSS classes
- `inset`: boolean - Add inset padding

### ContextMenuSubContent
- `children`: ReactNode - Submenu content
- `className`: string - Custom CSS classes
