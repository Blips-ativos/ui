# Command

Import: `@blips/ui/components/command`

## Sub-components

| Export | Description |
|--------|-------------|
| `Command` | Root component wrapping `cmdk`'s Command primitive. Flex column container with popover background. |
| `CommandDialog` | Command wrapped inside a `Dialog`. Used for keyboard-activated command palettes (Cmd+K pattern). |
| `CommandInput` | MagnifyingGlass input with magnifying glass icon. Renders inside a border-bottom wrapper. |
| `CommandList` | Scrollable list container. Max height 300px with overflow-y auto. |
| `CommandEmpty` | Empty state message. Shown when no results match the search. |
| `CommandGroup` | Groups related items under an optional heading. |
| `CommandItem` | Individual selectable item. Supports icons, text, shortcuts, and disabled state. |
| `CommandShortcut` | Right-aligned keyboard shortcut hint text (muted, xs, tracking-widest). |
| `CommandSeparator` | Horizontal divider between groups. |

## Props & Variants

### Command Props

All `cmdk` Command props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | -- | Additional classes on root |
| `filter` | `(value, search) => number` | -- | Custom filter function (0 = no match, 1 = match) |
| `shouldFilter` | `boolean` | `true` | Enable/disable built-in filtering |
| `loop` | `boolean` | `false` | Loop navigation at list boundaries |
| `value` | `string` | -- | Controlled selected value |
| `onValueChange` | `(value: string) => void` | -- | Controlled selection callback |

### CommandDialog Props

Accepts all `@radix-ui/react-dialog` `DialogProps`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | -- | Controlled dialog open state |
| `onOpenChange` | `(open: boolean) => void` | -- | Open state callback |

### CommandInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | -- | Input placeholder text |
| `value` | `string` | -- | Controlled input value |
| `onValueChange` | `(value: string) => void` | -- | Input change callback |

### CommandItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | -- | Item value for filtering and selection |
| `onSelect` | `(value: string) => void` | -- | Called when item is selected |
| `disabled` | `boolean` | `false` | Disable the item |
| `keywords` | `string[]` | -- | Additional keywords for search matching |

### CommandGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `ReactNode` | -- | Group heading text |

### Data Attributes

| Attribute | On | Values |
|-----------|-----|--------|
| `data-selected` | CommandItem | `"true"` when highlighted |
| `data-disabled` | CommandItem | `"true"` when disabled |

### Default Styles

| Component | Key Classes |
|-----------|-------------|
| `Command` | `flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground` |
| `CommandInput` | `h-11 bg-transparent outline-none` with search icon wrapper |
| `CommandList` | `max-h-[300px] overflow-y-auto overflow-x-hidden` |
| `CommandEmpty` | `py-6 text-center text-sm` |
| `CommandItem` | `relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm` with `data-[selected]:bg-accent` |

## Dependencies

- `cmdk` (Command Menu library)
- `@radix-ui/react-dialog` (for CommandDialog)
- `@phosphor-icons/react` (MagnifyingGlass icon)

## Usage

### Inline Command Menu

```tsx
import {
  Calculator,
  Calendar,
  CreditCard,
  Gear,
  Smiley,
  User,
} from "@phosphor-icons/react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command"

export default function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smiley />
            <span>MagnifyingGlass Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Gear">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>Cmd+P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>Cmd+B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Gear />
            <span>Gear</span>
            <CommandShortcut>Cmd+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

### Command Dialog (Keyboard Shortcut)

```tsx
"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Gear,
  Smiley,
  User,
} from "@phosphor-icons/react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command"

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none">
          <span className="text-xs">Cmd</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smiley />
              <span>MagnifyingGlass Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Gear">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>Cmd+P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>Cmd+B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Gear />
              <span>Gear</span>
              <CommandShortcut>Cmd+S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
```

## All Examples

- `command-demo` -- Inline command menu with groups, icons, and shortcuts
- `command-dialog` -- Dialog-based command palette triggered by Cmd+J
- `combobox-demo` -- Basic combobox with Popover + Command for searchable select
- `combobox-dropdown-menu` -- Command inside DropdownMenu sub-menu for label selection
- `combobox-popover` -- Status selector using Popover + Command with object state
- `combobox-responsive` -- Responsive combobox: Popover on desktop, Drawer on mobile

## All Example Variants

### combobox-demo

```tsx
"use client"

import * as React from "react"
import { Check, CaretUpDown } from "@phosphor-icons/react"

import { cn } from "@blips/ui/lib/utils"
import { Button } from "@blips/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export default function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <CaretUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="MagnifyingGlass framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

### combobox-dropdown-menu

```tsx
"use client"

import * as React from "react"
import { DotsThree } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
]

export default function ComboboxDropdownMenu() {
  const [label, setLabel] = React.useState("feature")
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm leading-none font-medium">
        <span className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">
          {label}
        </span>
        <span className="text-muted-foreground">Create a new project</span>
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsThree />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Assign to...</DropdownMenuItem>
            <DropdownMenuItem>Set due date...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Apply label</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Filter label..."
                    autoFocus={true}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No label found.</CommandEmpty>
                    <CommandGroup>
                      {labels.map((label) => (
                        <CommandItem
                          key={label}
                          value={label}
                          onSelect={(value) => {
                            setLabel(value)
                            setOpen(false)
                          }}
                        >
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
```

### combobox-popover

```tsx
"use client"

import * as React from "react"

import { Button } from "@blips/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
]

export default function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
```

### combobox-responsive

```tsx
"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@blips/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@blips/ui/components/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
]

export default function ComboBoxResponsive() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

### command-demo

```tsx
import {
  Calculator,
  Calendar,
  CreditCard,
  Gear,
  Smiley,
  User,
} from "@phosphor-icons/react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command"

export default function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smiley />
            <span>MagnifyingGlass Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Gear">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Gear />
            <span>Gear</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

### command-dialog

```tsx
"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Gear,
  Smiley,
  User,
} from "@phosphor-icons/react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command"

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smiley />
              <span>MagnifyingGlass Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Gear">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Gear />
              <span>Gear</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
```

## Project Notes

- `CommandDialog` internally uses the project's `Dialog` and `DialogContent` components.
- Uses `@phosphor-icons/react` MagnifyingGlass icon for the search input.
- Commonly used in combobox patterns: combine `Command` inside a `Popover` for searchable select dropdowns.
