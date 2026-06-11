# Kbd

Import: `@blips/ui/components/kbd`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `Kbd` | `<kbd>` | Single keyboard key indicator. Inline-flex box with muted background. Auto-adapts styling when inside tooltip content. |
| `KbdGroup` | `<kbd>` | Groups multiple `Kbd` elements together with `gap-1` spacing. |

## Props & Variants

### Kbd

Standard `React.ComponentProps<'kbd'>` -- no custom props beyond `className`.

**Default styles:**
- Height: `h-5`, min-width: `min-w-5`
- Font: `font-medium font-sans text-[0.625rem]`
- Background: `bg-muted`, text: `text-muted-foreground`
- Rounded: `rounded-xs`
- Padding: `px-1`
- Non-interactive: `pointer-events-none select-none`
- SVG icons inside: auto-sized to `size-3`

**Context-aware styles (inside tooltip):**
- When inside `[data-slot=tooltip-content]`: uses `bg-background/20` and `text-background`
- Dark mode tooltip: `bg-background/10`

### KbdGroup

Standard `React.ComponentProps<'div'>` -- no custom props beyond `className`.

**Default styles:**
- `inline-flex items-center gap-1`

## Usage

### Basic Key Indicators

```tsx
import { Kbd, KbdGroup } from "@blips/ui/components/kbd"

<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>⌥</Kbd>
  <Kbd>⌃</Kbd>
</KbdGroup>
```

### Key Combination with Separator

```tsx
import { Kbd, KbdGroup } from "@blips/ui/components/kbd"

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>B</Kbd>
</KbdGroup>
```

### Inline with Text

```tsx
import { Kbd, KbdGroup } from "@blips/ui/components/kbd"

<p className="text-sm text-muted-foreground">
  Use{" "}
  <KbdGroup>
    <Kbd>Ctrl + B</Kbd>
    <Kbd>Ctrl + K</Kbd>
  </KbdGroup>{" "}
  to open the command palette
</p>
```

### Inside Buttons

```tsx
import { Button } from "@blips/ui/components/button"
import { Kbd } from "@blips/ui/components/kbd"

<Button variant="outline" size="sm" className="pr-2">
  Accept <Kbd>⏎</Kbd>
</Button>
<Button variant="outline" size="sm" className="pr-2">
  Cancel <Kbd>Esc</Kbd>
</Button>
```

### Inside Tooltips

```tsx
import { Kbd, KbdGroup } from "@blips/ui/components/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"
import { Button } from "@blips/ui/components/button"

<Tooltip>
  <TooltipTrigger asChild>
    <Button size="sm" variant="outline">Print</Button>
  </TooltipTrigger>
  <TooltipContent>
    Print Document{" "}
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  </TooltipContent>
</Tooltip>
```

### Inside InputGroup

```tsx
import { MagnifyingGlass } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import { Kbd } from "@blips/ui/components/kbd"

<InputGroup>
  <InputGroupInput placeholder="MagnifyingGlass..." />
  <InputGroupAddon>
    <MagnifyingGlass />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </InputGroupAddon>
</InputGroup>
```

## All Examples

- `kbd-demo` - Basic key indicators and combinations
- `kbd-group` - KbdGroup inline with text
- `kbd-button` - Kbd inside buttons (Accept/Cancel)
- `kbd-tooltip` - Kbd inside tooltip content (auto-adapts colors)
- `kbd-input-group` - Kbd inside InputGroup as search shortcut hint

## All Example Variants

### kbd-demo

```tsx
import { Kbd, KbdGroup } from "@blips/ui/components/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
```

### kbd-tooltip

```tsx
import { Button } from "@blips/ui/components/button"
import { ButtonGroup } from "@blips/ui/components/button-group"
import { Kbd, KbdGroup } from "@blips/ui/components/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export default function KbdTooltip() {
  return (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Print Document{" "}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
```

### kbd-input-group

```tsx
import { MagnifyingGlass } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import { Kbd } from "@blips/ui/components/kbd"

export default function KbdInputGroup() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="MagnifyingGlass..." />
        <InputGroupAddon>
          <MagnifyingGlass />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### kbd-button

```tsx
import { Button } from "@blips/ui/components/button"
import { Kbd } from "@blips/ui/components/kbd"

export default function KbdButton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  )
}
```

### kbd-group

```tsx
import { Kbd, KbdGroup } from "@blips/ui/components/kbd"

export default function KbdGroupExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Use{" "}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  )
}
```
