# Context Menu

Import: `@blips/ui/components/context-menu`

## Sub-components

| Export | Description |
|--------|-------------|
| `ContextMenu` | Root component. Direct re-export of Radix ContextMenu Root. |
| `ContextMenuTrigger` | Trigger area. Right-click on this element opens the menu. Direct re-export. |
| `ContextMenuContent` | Menu content container. Rendered via Portal with animations. |
| `ContextMenuItem` | Standard menu item. Supports `inset` prop for left padding alignment. |
| `ContextMenuCheckboxItem` | Checkbox-style menu item with check indicator. |
| `ContextMenuRadioItem` | Radio-style menu item with circle indicator. |
| `ContextMenuRadioGroup` | Groups radio items. Direct re-export. |
| `ContextMenuLabel` | Non-interactive label/heading. Supports `inset`. |
| `ContextMenuSeparator` | Horizontal divider line. |
| `ContextMenuShortcut` | Right-aligned keyboard shortcut text. |
| `ContextMenuGroup` | Groups related items. Direct re-export. |
| `ContextMenuPortal` | Portal wrapper. Direct re-export. |
| `ContextMenuSub` | Sub-menu root. Direct re-export. |
| `ContextMenuSubTrigger` | Sub-menu trigger item with chevron icon. Supports `inset`. |
| `ContextMenuSubContent` | Sub-menu content container with animations. |

## Props & Variants

### ContextMenuContent Props

All Radix ContextMenu.Content props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | -- | Additional classes |
| `alignOffset` | `number` | -- | Offset from alignment edge |
| `sideOffset` | `number` | -- | Offset from trigger side |

### ContextMenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Add left padding (`pl-8`) for alignment with items that have icons/indicators |
| `disabled` | `boolean` | `false` | Disable the item |
| `onSelect` | `(event) => void` | -- | Called when item is selected |

### ContextMenuCheckboxItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | -- | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | -- | Check state change callback |
| `onSelect` | `(event) => void` | -- | Called when selected |

### ContextMenuRadioItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Radio value |

### ContextMenuSubTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Add left padding for alignment |

### ContextMenuLabel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Add left padding for alignment |

### Key Animations

Content and SubContent use these animation classes:
- `fade-in-0` / `fade-out-0` for opacity
- `zoom-in-95` / `zoom-out-95` for scale
- `slide-in-from-*` based on `data-side` attribute

## Dependencies

- `@radix-ui/react-context-menu`
- `@phosphor-icons/react` (Check, CaretRight, Circle)

## Usage

### Full Context Menu

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@blips/ui/components/context-menu"

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>Cmd+[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>Cmd+]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>Cmd+R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Save Page...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## All Example Variants

### context-menu-demo

Full-featured context menu with items, sub-menus, checkboxes, radios, separators, shortcuts, and destructive variant.

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@blips/ui/components/context-menu"

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Save Page...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## Project Notes

- Uses `@phosphor-icons/react` (Check, CaretRight, Circle).
- The file has `// @ts-nocheck` at the top due to Radix type compatibility.
- The `inset` prop is a common pattern -- use it on items that need to align with other items that have icons or check indicators.
