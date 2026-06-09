# Button Group

Import: `@blips/ui/components/button-group`

## Sub-components

| Component | Description |
|---|---|
| `ButtonGroup` | Container that visually groups buttons by merging borders and rounding only outer corners. Renders a `div` with `role="group"`. |
| `ButtonGroupText` | Static text element styled to match button group aesthetics. Supports `asChild`. |
| `ButtonGroupSeparator` | Visual separator between button group items. Wraps `Separator` component. |

Also exports `buttonGroupVariants` for use with other elements.

## Props & Variants

### ButtonGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction. Controls border and rounding adjustments. |
| `className` | `string` | - | Additional CSS classes. |

Data attributes: `data-slot="button-group"`, `data-orientation`.

#### Orientation Styles

| Orientation | Behavior |
|---|---|
| `horizontal` | Children lose left border and left rounding (except first). Last child keeps right rounding. |
| `vertical` | Children lose top border and top rounding (except first). Last child keeps bottom rounding. |

**Base classes:** `flex w-fit items-stretch` with focus-visible z-index handling. Nested `ButtonGroup` children get `gap-2` spacing.

### ButtonGroupText

| Prop | Type | Default | Description |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Merge props onto child element via Radix `Slot`. |
| `className` | `string` | - | Additional CSS classes. Base: `flex items-center gap-2 rounded-md border bg-muted px-2.5 font-medium text-xs/relaxed dark:bg-input/30`. |

### ButtonGroupSeparator

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Separator direction. |
| `className` | `string` | - | Additional CSS classes. Base: `relative self-stretch bg-input`. |

## Usage

### Basic button group

```tsx
import { Button } from "@blips/ui/components/button"
import { ButtonGroup } from "@blips/ui/components/button-group"

export function ButtonGroupBasic() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}
```

### Nested button groups (toolbar pattern)

```tsx
"use client"

import {
  ArrowLeft,
  DotsThree,
} from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import { ButtonGroup } from "@blips/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"

export function ButtonGroupToolbar() {
  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeft />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More Options">
              <DotsThree />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>Mark as Read</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem>Snooze</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
```

### Vertical button group

```tsx
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>
```

### With text element

```tsx
import { Button } from "@blips/ui/components/button"
import { ButtonGroup, ButtonGroupText } from "@blips/ui/components/button-group"

<ButtonGroup>
  <ButtonGroupText>Label</ButtonGroupText>
  <Button variant="outline">Action</Button>
</ButtonGroup>
```

### With separator

```tsx
import { Button } from "@blips/ui/components/button"
import { ButtonGroup, ButtonGroupSeparator } from "@blips/ui/components/button-group"

<ButtonGroup>
  <Button variant="outline">Save</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Cancel</Button>
</ButtonGroup>
```

## Project Notes

- Nesting `ButtonGroup` inside another `ButtonGroup` creates visual separation with `gap-2` between groups while keeping merged borders within each group.
- The component handles `select-trigger` elements and `input` elements as children, with special CSS selectors for proper sizing.
- Uses the `Separator` component from `@blips/ui/components/separator` internally for `ButtonGroupSeparator`.
- `ButtonGroupText` uses `radix-ui` `Slot.Root` for the `asChild` pattern.

## All Example Variants

### button-group-demo

```tsx
"use client"

import * as React from "react"
import {
  Archive,
  ArrowLeft,
  CalendarPlus,
  Clock,
  Funnel,
  EnvelopeSimple,
  DotsThree,
  Tag,
  Trash,
} from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"

export default function ButtonGroupDemo() {
  const [label, setLabel] = React.useState("personal")

  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeft />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More Options">
              <DotsThree />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <EnvelopeSimple />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Clock />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlus />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Funnel />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tag />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={label}
                    onValueChange={setLabel}
                  >
                    <DropdownMenuRadioItem value="personal">
                      Personal
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">
                      Work
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">
                      Other
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
```

### button-group-nested

```tsx
"use client"

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous">
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next">
          <ArrowRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
```

### button-group-size

```tsx
import { Plus } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"

export default function ButtonGroupSize() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="sm">
          Button
        </Button>
        <Button variant="outline" size="sm">
          Group
        </Button>
        <Button variant="outline" size="icon-sm">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
        <Button variant="outline" size="lg">
          Group
        </Button>
        <Button variant="outline" size="icon-lg">
          <Plus />
        </Button>
      </ButtonGroup>
    </div>
  )
}
```

### button-group-separator

```tsx
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/new-york-v4/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}
```

### button-group-split

```tsx
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/new-york-v4/ui/button-group"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <IconPlus />
      </Button>
    </ButtonGroup>
  )
}
```

### button-group-input

```tsx
import { MagnifyingGlass } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"
import { Input } from "@/registry/new-york-v4/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="MagnifyingGlass..." />
      <Button variant="outline" aria-label="MagnifyingGlass">
        <MagnifyingGlass />
      </Button>
    </ButtonGroup>
  )
}
```

### button-group-dropdown

```tsx
"use client"

import {
  Warning,
  Check,
  CaretDown,
  Copy,
  ShareNetwork,
  Trash,
  UserMinus,
  SpeakerSimpleX,
} from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <CaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SpeakerSimpleX />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Warning />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserMinus />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareNetwork />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <Trash />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
```

### button-group-select

```tsx
"use client"

import * as React from "react"
import { ArrowRight } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"
import { Input } from "@/registry/new-york-v4/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/registry/new-york-v4/ui/select"

const CURRENCIES = [
  {
    value: "$",
    label: "US Dollar",
  },
  {
    value: "€",
    label: "Euro",
  },
  {
    value: "£",
    label: "British Pound",
  },
]

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$")

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="font-mono">{currency}</SelectTrigger>
          <SelectContent className="min-w-24">
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.value}{" "}
                <span className="text-muted-foreground">{currency.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
```

### button-group-popover

```tsx
import { Robot, CaretDown } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york-v4/ui/popover"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export default function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <Robot /> Copilot
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open Popover">
            <CaretDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="rounded-xl p-0 text-sm">
          <div className="px-4 py-3">
            <div className="text-sm font-medium">Agent Tasks</div>
          </div>
          <Separator />
          <div className="p-4 text-sm *:[p:not(:last-child)]:mb-2">
            <Textarea
              placeholder="Describe your task in natural language."
              className="mb-4 resize-none"
            />
            <p className="font-medium">Start a new task with Copilot</p>
            <p className="text-muted-foreground">
              Describe your task in natural language. Copilot will work in the
              background and open a pull request for your review.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
```

### button-group-input-group

```tsx
"use client"

import * as React from "react"
import { Waveform, Plus } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/new-york-v4/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip"

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false)

  return (
    <ButtonGroup className="[--radius:9999rem]">
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            placeholder={
              voiceEnabled ? "Record and send audio..." : "Send a message..."
            }
            disabled={voiceEnabled}
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  size="icon-xs"
                  data-active={voiceEnabled}
                  className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                  aria-pressed={voiceEnabled}
                >
                  <Waveform />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
```

### button-group-orientation

```tsx
import { Minus, Plus } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { ButtonGroup } from "@/registry/new-york-v4/ui/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <Plus />
      </Button>
      <Button variant="outline" size="icon">
        <Minus />
      </Button>
    </ButtonGroup>
  )
}
```
