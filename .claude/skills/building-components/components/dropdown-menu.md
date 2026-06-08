# DropdownMenu

**Categoria:** Compound | **Deps:** `@radix-ui/react-dropdown-menu`, `lucide-react` | **"use client":** Sim

## Exports

`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`

## Usage

### Basic Dropdown Menu

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
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Settings
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dropdown Menu with Checkbox Items

```tsx
const [checked, setChecked] = React.useState(false)

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
      Show Panel
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Show Details</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dropdown Menu with Radio Items

```tsx
const [theme, setTheme] = React.useState("light")

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Theme</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dropdown Menu with Submenu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>Cut</DropdownMenuItem>
    <DropdownMenuItem>Copy</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-48">
        <DropdownMenuItem>Save Page As...</DropdownMenuItem>
        <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Developer Tools</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dropdown Menu with Groups

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">More</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Group 1</DropdownMenuLabel>
      <DropdownMenuItem>Item 1</DropdownMenuItem>
      <DropdownMenuItem>Item 2</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuLabel>Group 2</DropdownMenuLabel>
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
