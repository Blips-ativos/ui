# Input Group

Import: `@blips/ui/components/input-group`

A compound component for building enhanced input fields with addons, buttons, icons, and text. Supports both inline (left/right) and block (top/bottom) addon positioning.

## Sub-components

| Component | Description |
|---|---|
| `InputGroup` | Root container. Flex row with border, rounds corners. Auto-adjusts to column layout for block addons. |
| `InputGroupAddon` | Positioned addon container. Holds icons, text, buttons. Clicking it focuses the input. |
| `InputGroupButton` | Styled button for use inside addons. Ghost variant, small sizes. |
| `InputGroupText` | Text label for use inside addons — `text-muted-foreground text-xs/relaxed`. |
| `InputGroupInput` | Styled `<Input>` that strips border/shadow for seamless integration. |
| `InputGroupTextarea` | Styled `<Textarea>` that strips border/shadow for seamless integration. |

## Props & Variants

### InputGroupAddon

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Position of the addon relative to the input. |

**Alignment behavior:**

| Align | Position | Use Case |
|---|---|---|
| `inline-start` | Left of input | Prefix icons, labels like "https://" |
| `inline-end` | Right of input | Suffix icons, result counts, validation indicators |
| `block-start` | Above input | Top toolbar, tags |
| `block-end` | Below input | Bottom toolbar, character counts, action buttons |

### InputGroupButton

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"xs"` | Button size within the input group. |
| `variant` | Button variants | `"ghost"` | Button visual style. |
| `type` | `string` | `"button"` | HTML button type (defaults to button, not submit). |

**Size styles (CVA):**

| Size | Classes |
|---|---|
| `xs` | `h-5 gap-1 rounded-[calc(var(--radius-sm)-2px)] px-1` with smaller icons |
| `sm` | Default button sm sizing |
| `icon-xs` | `size-6 p-0` — 24px square icon button |
| `icon-sm` | `size-8 p-0` — 32px square icon button |

### InputGroup (Root)

Base height `h-8`. Automatically switches to `flex-col` when block addons are present. Includes focus-within ring styles and `aria-invalid` destructive border styles.

Key states:
- Focus: `border-ring ring-2 ring-ring/30`
- Invalid: `border-destructive ring-2 ring-destructive/20`
- Disabled: `opacity-50`

## Usage

### MagnifyingGlass Input with Icon and Results

```tsx
import { MagnifyingGlass } from "@phosphor-icons/react"
import {
  InputGroup, InputGroupAddon, InputGroupInput,
} from "@blips/ui/components/input-group"

<InputGroup>
  <InputGroupInput placeholder="MagnifyingGlass..." />
  <InputGroupAddon>
    <MagnifyingGlass />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
</InputGroup>
```

### URL Input with Prefix and Button

```tsx
import { IconInfoCircle } from "@tabler/icons-react"
import {
  InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText,
} from "@blips/ui/components/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@blips/ui/components/tooltip"

<InputGroup>
  <InputGroupInput placeholder="example.com" className="pl-1!" />
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <Tooltip>
      <TooltipTrigger asChild>
        <InputGroupButton className="rounded-full" size="icon-xs">
          <IconInfoCircle />
        </InputGroupButton>
      </TooltipTrigger>
      <TooltipContent>This is content in a tooltip.</TooltipContent>
    </Tooltip>
  </InputGroupAddon>
</InputGroup>
```

### Textarea with Bottom Toolbar (Chat-style)

```tsx
import { IconPlus } from "@tabler/icons-react"
import { ArrowUp } from "@phosphor-icons/react"
import {
  InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea,
} from "@blips/ui/components/input-group"
import { Separator } from "@blips/ui/components/separator"

<InputGroup>
  <InputGroupTextarea placeholder="Ask, MagnifyingGlass or Chat..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton variant="outline" className="rounded-full" size="icon-xs">
      <IconPlus />
    </InputGroupButton>
    <InputGroupText className="ml-auto">52% used</InputGroupText>
    <Separator orientation="vertical" className="h-4!" />
    <InputGroupButton variant="default" className="rounded-full" size="icon-xs" disabled>
      <ArrowUp />
      <span className="sr-only">Send</span>
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### Input with Validation Indicator

```tsx
import { IconCheck } from "@tabler/icons-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@blips/ui/components/input-group"

<InputGroup>
  <InputGroupInput placeholder="@shadcn" />
  <InputGroupAddon align="inline-end">
    <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <IconCheck className="size-3" />
    </div>
  </InputGroupAddon>
</InputGroup>
```

### With React Hook Form

```tsx
<Controller
  name="description"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="description">Description</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          {...field}
          id="description"
          rows={6}
          className="min-h-24 resize-none"
          aria-invalid={fieldState.invalid}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums">
            {field.value.length}/100 characters
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Include steps to reproduce.</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

## All Examples

- `input-group-demo` — All patterns: search, URL prefix, chat textarea toolbar, validation indicator
- `input-group-label` — Input group with label addon and block-start label
- `input-group-text` — Input group with text addons (currency, URL prefix/suffix, character count)
- `input-group-tooltip` — Input group with tooltip addon
- `input-group-button` — Input group with copy, popover, favorite, and search buttons
- `input-group-button-group` — Input group with button group addon
- `input-group-dropdown` — Input group with dropdown menu addon
- `input-group-spinner` — Input group with spinner/loading states
- `input-group-textarea` — Input group with textarea, code editor style
- `input-group-icon` — Input group with icon addons
- `input-group-custom` — Input group with custom autoresize textarea

## All Example Variants

### input-group-demo

```tsx
import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react"
import { ArrowUp, MagnifyingGlass } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group"
import { Separator } from "@blips/ui/components/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export default function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="MagnifyingGlass..." />
        <InputGroupAddon>
          <MagnifyingGlass />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="example.com" className="pl-1!" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton className="rounded-full" size="icon-xs">
                <IconInfoCircle />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, MagnifyingGlass or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
          >
            <IconPlus />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <Separator orientation="vertical" className="h-4!" />
          <InputGroupButton
            variant="default"
            className="rounded-full"
            size="icon-xs"
            disabled
          >
            <ArrowUp />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="@shadcn" />
        <InputGroupAddon align="inline-end">
          <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <IconCheck className="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-label

```tsx
import { Info } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import { Label } from "@blips/ui/components/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export default function InputGroupLabel() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput id="email" placeholder="shadcn" />
        <InputGroupAddon>
          <Label htmlFor="email">@</Label>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email-2" className="text-foreground">
            Email
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="Help"
                className="ml-auto rounded-full"
                size="icon-xs"
              >
                <Info />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll use this to send you notifications</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-text

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group"

export default function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="pl-0.5!" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-xs text-muted-foreground">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-tooltip

```tsx
import { Question, Info } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export default function InputGroupTooltip() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter password" type="password" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="Info"
                size="icon-xs"
              >
                <Info />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Password must be at least 8 characters</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Your email address" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="Help"
                size="icon-xs"
              >
                <Question />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll use this to send you notifications</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter API key" />
        <Tooltip>
          <TooltipTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton
                variant="ghost"
                aria-label="Help"
                size="icon-xs"
              >
                <Question />
              </InputGroupButton>
            </InputGroupAddon>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Click for help with API keys</p>
          </TooltipContent>
        </Tooltip>
      </InputGroup>
    </div>
  )
}
```

### input-group-button

```tsx
"use client"

import * as React from "react"
import {
  IconCheck,
  IconCopy,
  IconInfoCircle,
  IconStar,
} from "@tabler/icons-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover"

export default function InputGroupButtonExample() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() => {
              copyToClipboard("https://x.com/shadcn")
            }}
          >
            {isCopied ? <IconCheck /> : <IconCopy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="[--radius:9999px]">
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton variant="secondary" size="icon-xs">
                <IconInfoCircle />
              </InputGroupButton>
            </InputGroupAddon>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex flex-col gap-1 rounded-xl text-sm"
          >
            <p className="font-medium">Your connection is not secure.</p>
            <p>You should not enter any sensitive information on this site.</p>
          </PopoverContent>
        </Popover>
        <InputGroupAddon className="pl-1.5 text-muted-foreground">
          https://
        </InputGroupAddon>
        <InputGroupInput id="input-secure-19" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => setIsFavorite(!isFavorite)}
            size="icon-xs"
          >
            <IconStar
              data-favorite={isFavorite}
              className="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">MagnifyingGlass</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-button-group

```tsx
import { LinkSimple } from "@phosphor-icons/react"

import {
  ButtonGroup,
  ButtonGroupText,
} from "@blips/ui/components/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import { Label } from "@blips/ui/components/label"

export default function InputGroupButtonGroup() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <ButtonGroup>
        <ButtonGroupText asChild>
          <Label htmlFor="url">https://</Label>
        </ButtonGroupText>
        <InputGroup>
          <InputGroupInput id="url" />
          <InputGroupAddon align="inline-end">
            <LinkSimple />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </div>
  )
}
```

### input-group-dropdown

```tsx
import { CaretDown, DotsThree } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group"

export default function InputGroupDropdown() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="More"
                size="icon-xs"
              >
                <DotsThree />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Gear</DropdownMenuItem>
              <DropdownMenuItem>Copy path</DropdownMenuItem>
              <DropdownMenuItem>Open location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="[--radius:1rem]">
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                MagnifyingGlass In... <CaretDown className="size-3" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="[--radius:0.95rem]">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Blog Posts</DropdownMenuItem>
              <DropdownMenuItem>Changelog</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-spinner

```tsx
import { CircleNotch } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@blips/ui/components/input-group"
import { Spinner } from "@blips/ui/components/spinner"

export default function InputGroupSpinner() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Searching..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Processing..." disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Saving changes..." disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Refreshing data..." disabled />
        <InputGroupAddon>
          <CircleNotch className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground">
            Please wait...
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-textarea

```tsx
import {
  IconBrandJavascript,
  IconCopy,
  IconCornerDownLeft,
  IconRefresh,
} from "@tabler/icons-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group"

export default function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          className="min-h-[200px]"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size="sm" className="ml-auto" variant="default">
            Run <IconCornerDownLeft />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <IconBrandJavascript />
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <IconRefresh />
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
            <IconCopy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-icon

```tsx
import {
  Check,
  CreditCard,
  Info,
  EnvelopeSimple,
  MagnifyingGlass,
  Star,
} from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group"

export default function InputGroupIcon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="MagnifyingGlass..." />
        <InputGroupAddon>
          <MagnifyingGlass />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <EnvelopeSimple />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCard />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Check />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <Star />
          <Info />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### input-group-custom

```tsx
"use client"

import TextareaAutosize from "react-textarea-autosize"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@blips/ui/components/input-group"

export default function InputGroupCustom() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Autoresize textarea..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton className="ml-auto" size="sm" variant="default">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```
