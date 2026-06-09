# Select

Import: `@blips/ui/components/select`

## Sub-components

| Component | Description |
|---|---|
| `Select` | Root component. Direct re-export of `@radix-ui/react-select` Root. Manages open state and value. |
| `SelectGroup` | Groups related items. Direct re-export of `@radix-ui/react-select` Group. |
| `SelectValue` | Displays the selected value inside the trigger. Direct re-export of `@radix-ui/react-select` Value. |
| `SelectTrigger` | Button that opens the select dropdown. Styled with border, height `h-8`, and a chevron icon. |
| `SelectContent` | Popover dropdown container. Rendered in a Portal with scroll buttons and animations. |
| `SelectLabel` | Non-selectable label within a group. Styled with `font-semibold`. |
| `SelectItem` | Selectable option. Shows a check icon when selected. Supports an optional `description` prop. |
| `SelectSeparator` | Visual divider between items/groups. Renders a 1px line. |
| `SelectScrollUpButton` | Scroll indicator at the top of the content when items overflow. |
| `SelectScrollDownButton` | Scroll indicator at the bottom of the content when items overflow. |

## Props & Variants

### Select (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultValue` | `string` | -- | Default selected value (uncontrolled). |
| `value` | `string` | -- | Controlled selected value. |
| `onValueChange` | `(value: string) => void` | -- | Callback when value changes. |
| `defaultOpen` | `boolean` | `false` | Whether dropdown is open by default. |
| `open` | `boolean` | -- | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | -- | Callback when open state changes. |
| `disabled` | `boolean` | `false` | Disable the entire select. |
| `required` | `boolean` | `false` | Mark as required for form validation. |
| `name` | `string` | -- | Name for form submission. |
| `dir` | `"ltr" \| "rtl"` | -- | Reading direction. |

### SelectTrigger

Extends `React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Additional CSS classes. Base: `flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm`. |
| `aria-invalid` | `boolean` | -- | Mark trigger as invalid (for form validation). |

### SelectContent

Extends `React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `"popper" \| "item-aligned"` | `"popper"` | Positioning strategy. `"popper"` uses floating positioning, `"item-aligned"` aligns with trigger. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side (popper mode only). |
| `sideOffset` | `number` | -- | Offset from the trigger. |
| `align` | `"start" \| "center" \| "end"` | -- | Alignment relative to trigger. |
| `className` | `string` | -- | Additional CSS classes. |

### SelectItem

Extends `React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **(required)** | The value of the item. |
| `disabled` | `boolean` | `false` | Disable this item. |
| `description` | `string` | -- | **Project-specific.** Secondary text shown below the item label in `text-muted-foreground text-xs`. |
| `className` | `string` | -- | Additional CSS classes. |

### SelectLabel

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Additional CSS classes. Base: `py-1.5 pr-2 pl-8 font-semibold text-sm`. |

### SelectSeparator

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Additional CSS classes. Base: `-mx-1 my-1 h-px bg-muted`. |

## Usage

### Basic Select

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

### With Item Descriptions (Project-Specific)

```tsx
<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="manager" description="Full access to all features">
      Manager
    </SelectItem>
    <SelectItem value="professor" description="Limited to assigned students">
      Professor
    </SelectItem>
  </SelectContent>
</Select>
```

### Scrollable with Multiple Groups

```tsx
<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe & Africa</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### With React Hook Form

```tsx
import { Controller } from "react-hook-form"

<Controller
  name="language"
  control={form.control}
  render={({ field, fieldState }) => (
    <Select
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger aria-invalid={fieldState.invalid}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
        <SelectItem value="fr">French</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
```

### With Separator

```tsx
<SelectContent>
  <SelectItem value="auto">Auto</SelectItem>
  <SelectSeparator />
  <SelectItem value="en">English</SelectItem>
  <SelectItem value="es">Spanish</SelectItem>
</SelectContent>
```

## All Example Variants

### select-demo

Basic select with grouped fruits.

```tsx
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

### select-scrollable

Scrollable select with multiple timezone groups.

```tsx
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"

export default function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time (ART)</SelectItem>
          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

## Project Notes

- Uses `@phosphor-icons/react` icons (`Check`, `CaretDown`, `CaretUp`) instead of Lucide.
- The `SelectItem` has a project-specific `description` prop for secondary text, not present in vanilla shadcn/ui.
- Default trigger height is `h-8` (compact), matching the project design system.
- `SelectContent` defaults to `position="popper"` with translate animations per side. Use `position="item-aligned"` for form selects to align with the trigger value.
