# Spinner

Import: `@blips/ui/components/spinner`

## Sub-components

- **`Spinner`** - A custom CSS-animated loading spinner using 8 tick marks that fade in sequence. Renders as a `<div>` with `role="status"` and `aria-label="Carregando"`.

## Props & Variants

### Spinner Props

The `Spinner` component accepts all standard `React.ComponentProps<'div'>` props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes. Controls size via Tailwind `size-*` classes |

### Sizing

The default size is `size-4` (16px). Size is controlled via Tailwind utility classes on `className`:

| Class | Size |
|-------|------|
| `size-3` | 12px |
| `size-4` | 16px (default) |
| `size-6` | 24px |
| `size-8` | 32px |

The spinner uses CSS container queries (`@container`, `cqw` units) so it scales proportionally with any size.

### Implementation Details

- Uses 8 tick marks arranged in a circle
- Each tick is a rounded rectangle that fades via CSS animation
- Animation duration: 1000ms per full cycle
- Uses `@container` for responsive tick sizing
- Inherits text color via `bg-current`

## Usage

### Basic Spinner

```tsx
import { Spinner } from "@blips/ui/components/spinner"

export default function Loading() {
  return <Spinner />
}
```

### Different Sizes

```tsx
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerSize() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}
```

### Inside a Button (Loading State)

```tsx
import { Button } from "@blips/ui/components/button"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </div>
  )
}
```

### With Item Component

```tsx
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  )
}
```

## All Examples

- `spinner-demo` - Spinner inside an Item component
- `spinner-basic` - Minimal single spinner
- `spinner-button` - Spinner inside disabled buttons with various variants
- `spinner-badge` - Spinner inside Badge components
- `spinner-input-group` - Spinner inside InputGroup (input and textarea)
- `spinner-empty` - Spinner inside Empty state component
- `spinner-color` - Colored spinners using text color utilities
- `spinner-custom` - Custom spinner using Phosphor `CircleNotch` with animate-spin
- `spinner-size` - Different spinner sizes (size-3 through size-8)
- `spinner-item` - Spinner inside Item with progress bar and footer

## All Example Variants

### spinner-demo

```tsx
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  )
}
```

### spinner-basic

```tsx
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerBasic() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Spinner />
    </div>
  )
}
```

### spinner-button

```tsx
import { Button } from "@blips/ui/components/button"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </div>
  )
}
```

### spinner-badge

```tsx
import { Badge } from "@blips/ui/components/badge"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Processing
      </Badge>
    </div>
  )
}
```

### spinner-input-group

```tsx
import { ArrowUp } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@blips/ui/components/input-group"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerInputGroup() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUp />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### spinner-empty

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerEmpty() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

### spinner-color

```tsx
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerColor() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-6 text-red-500" />
      <Spinner className="size-6 text-green-500" />
      <Spinner className="size-6 text-blue-500" />
      <Spinner className="size-6 text-yellow-500" />
      <Spinner className="size-6 text-purple-500" />
    </div>
  )
}
```

### spinner-custom

```tsx
import { CircleNotch } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <CircleNotch
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export default function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}
```

### spinner-size

```tsx
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerSize() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}
```

### spinner-item

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"
import { Progress } from "@blips/ui/components/progress"
import { Spinner } from "@blips/ui/components/spinner"

export default function SpinnerItem() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Downloading...</ItemTitle>
          <ItemDescription>129 MB / 1000 MB</ItemDescription>
        </ItemContent>
        <ItemActions className="hidden sm:flex">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </ItemActions>
        <ItemFooter>
          <Progress value={75} />
        </ItemFooter>
      </Item>
    </div>
  )
}
```
