# Menubar

Import: `@blips/ui/components/menubar`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `Menubar` | `MenubarPrimitive.Root` | Root container. Horizontal bar with border and background. |
| `MenubarMenu` | `MenubarPrimitive.Menu` | Wraps a single menu (trigger + content). |
| `MenubarTrigger` | `MenubarPrimitive.Trigger` | Button that opens a menu dropdown. |
| `MenubarContent` | `MenubarPrimitive.Content` | Dropdown panel containing menu items. Rendered in a Portal. |
| `MenubarItem` | `MenubarPrimitive.Item` | Standard clickable menu item. |
| `MenubarCheckboxItem` | `MenubarPrimitive.CheckboxItem` | Menu item with checkbox toggle. |
| `MenubarRadioGroup` | `MenubarPrimitive.RadioGroup` | Groups radio items for single selection. |
| `MenubarRadioItem` | `MenubarPrimitive.RadioItem` | Radio-selectable menu item. |
| `MenubarSub` | `MenubarPrimitive.Sub` | Wrapper for a submenu. |
| `MenubarSubTrigger` | `MenubarPrimitive.SubTrigger` | Trigger that opens a submenu. Shows chevron icon. |
| `MenubarSubContent` | `MenubarPrimitive.SubContent` | Submenu dropdown panel. |
| `MenubarSeparator` | `MenubarPrimitive.Separator` | Horizontal line divider between items. |
| `MenubarLabel` | `MenubarPrimitive.Label` | Non-interactive label/header within a menu. |
| `MenubarGroup` | `MenubarPrimitive.Group` | Groups related menu items. |
| `MenubarPortal` | `MenubarPrimitive.Portal` | Portal wrapper (used internally by MenubarContent). |
| `MenubarShortcut` | `<span>` | Right-aligned keyboard shortcut text. |

## Props & Variants

### Menubar (Root)

Standard `MenubarPrimitive.Root` props. Uses `forwardRef`.

**Default styles:**
- `flex h-10 items-center space-x-1 rounded-md border bg-background p-1`

### MenubarContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment relative to trigger |
| `alignOffset` | `number` | `-4` | Offset from alignment edge |
| `sideOffset` | `number` | `8` | Offset from the trigger |

**Default styles:**
- `z-50 min-w-[12rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md`
- Animated: fade-in, zoom-in, slide-in based on side

### MenubarItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Adds left padding (`pl-8`) to align with items that have indicators |
| `disabled` | `boolean` | - | Disables the item |

### MenubarSubTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Adds left padding (`pl-8`) |

### MenubarLabel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Adds left padding (`pl-8`) |

### MenubarShortcut

No custom props. Renders a `<span>` with `ml-auto text-muted-foreground text-xs tracking-widest`.

## Usage

### Full Menubar

```tsx
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@blips/ui/components/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem disabled>New Incognito Window</MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Share</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Email link</MenubarItem>
          <MenubarItem>Messages</MenubarItem>
          <MenubarItem>Notes</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>
        Print... <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Find</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>MagnifyingGlass the web</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Find...</MenubarItem>
          <MenubarItem>Find Next</MenubarItem>
          <MenubarItem>Find Previous</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
      <MenubarCheckboxItem checked>
        Always Show Full URLs
      </MenubarCheckboxItem>
      <MenubarSeparator />
      <MenubarItem inset>
        Reload <MenubarShortcut>⌘R</MenubarShortcut>
      </MenubarItem>
      <MenubarItem disabled inset>
        Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem inset>Toggle Fullscreen</MenubarItem>
      <MenubarSeparator />
      <MenubarItem inset>Hide Sidebar</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Profiles</MenubarTrigger>
    <MenubarContent>
      <MenubarRadioGroup value="benoit">
        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
        <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
      </MenubarRadioGroup>
      <MenubarSeparator />
      <MenubarItem inset>Edit...</MenubarItem>
      <MenubarSeparator />
      <MenubarItem inset>Add Profile...</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Project Notes

- This project uses `@phosphor-icons/react` for icons (Check, CaretRight, Circle).
- The component uses `forwardRef` pattern (not the newer function component pattern from latest shadcn).

## All Examples

- `menubar-demo` - Full menubar with File, Edit, View, and Profiles menus demonstrating all sub-component types
