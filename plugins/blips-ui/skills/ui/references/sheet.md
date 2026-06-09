# Sheet

Import: `@blips/ui/components/sheet`

## Sub-components

| Component | Description |
|---|---|
| `Sheet` | Root component. Wraps Radix `Dialog.Root`. Manages open/close state. |
| `SheetTrigger` | Button or element that opens the sheet. Wraps Radix `Dialog.Trigger`. |
| `SheetClose` | Button or element that closes the sheet. Wraps Radix `Dialog.Close`. |
| `SheetContent` | The sliding panel. Renders in a Portal with an overlay. Supports `side` and `showCloseButton` props. |
| `SheetHeader` | Header section inside the sheet. Flex column with padding. |
| `SheetBody` | Scrollable body section. Uses `flex-1 overflow-auto` with special handling for `SheetSection` children. |
| `SheetSection` | Bordered section within `SheetBody`. Renders with bottom border and padding. |
| `SheetSectionTitle` | Title for a `SheetSection`. Styled as muted foreground text. |
| `SheetFooter` | Footer section with `mt-auto` to pin to bottom. Renders with top border. |
| `SheetTitle` | Accessible title. Wraps Radix `Dialog.Title`. |
| `SheetDescription` | Accessible description. Wraps Radix `Dialog.Description`. |
| `sheetVariants` | CVA variants export for the legacy side-based animation classes. |

## Props & Variants

### Sheet (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultOpen` | `boolean` | `false` | Uncontrolled open state. |
| `open` | `boolean` | -- | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | -- | Callback when open state changes. |
| `modal` | `boolean` | `true` | Whether the sheet is modal. |

### SheetContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Which edge the sheet slides in from. |
| `showCloseButton` | `boolean` | `true` | **Project-specific.** Whether to show the X close button in the top-right corner. |
| `className` | `string` | -- | Additional CSS classes. |
| `children` | `ReactNode` | -- | Sheet content. |

**Overlay:** Fixed overlay with `bg-black/80`, backdrop blur, and fade animation.

**Content styles per side:**
- **Right/Left:** Full height, `w-full sm:max-w-sm`, with slide animation from the respective edge.
- **Top/Bottom:** Full width, auto height, with slide animation from the respective edge.

### SheetHeader

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Base: `flex flex-col gap-1.5 p-6`. |

### SheetBody

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Base: `flex-1 overflow-auto p-6`. Removes padding when containing `SheetSection` children (`has-data-[slot=sheet-section]:p-0`). |

### SheetSection

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Base: `gap-4 border-b p-6 last:border-b-0`. |

### SheetSectionTitle

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Base: `mb-4 font-medium text-muted-foreground text-sm`. |

### SheetFooter

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Base: `mt-auto flex flex-col gap-2 border-t p-6`. |

### SheetTitle

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Base: `font-medium text-foreground text-sm`. |

### SheetDescription

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | -- | Base: `text-muted-foreground text-xs/relaxed`. |

## Usage

### Basic Sheet

```tsx
import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

### Different Sides

```tsx
const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

{SHEET_SIDES.map((side) => (
  <Sheet key={side}>
    <SheetTrigger asChild>
      <Button variant="outline">{side}</Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here.
        </SheetDescription>
      </SheetHeader>
      {/* ... content ... */}
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
))}
```

### With Body Sections (Project-Specific)

```tsx
<SheetContent>
  <SheetHeader>
    <SheetTitle>Details</SheetTitle>
  </SheetHeader>
  <SheetBody>
    <SheetSection>
      <SheetSectionTitle>General Info</SheetSectionTitle>
      {/* Section content */}
    </SheetSection>
    <SheetSection>
      <SheetSectionTitle>Additional Details</SheetSectionTitle>
      {/* Section content */}
    </SheetSection>
  </SheetBody>
  <SheetFooter>
    <Button>Save</Button>
  </SheetFooter>
</SheetContent>
```

### Controlled Sheet (No Trigger)

```tsx
const [open, setOpen] = useState(false)

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Controlled Sheet</SheetTitle>
    </SheetHeader>
    {/* ... */}
  </SheetContent>
</Sheet>
```

### Without Close Button

```tsx
<SheetContent showCloseButton={false}>
  {/* ... */}
</SheetContent>
```

## All Examples

- `sheet-demo` -- Basic sheet with form inputs
- `sheet-side` -- Sheets from all four sides

## All Example Variants

### sheet-demo

```tsx
import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

### sheet-side

```tsx
"use client"

import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export default function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
```

## Project Notes

- Uses `@phosphor-icons/react` `X` icon for the close button (rendered as a ghost `Button` with `size="icon-sm"`).
- **Project additions not in vanilla shadcn/ui:**
  - `SheetBody` -- scrollable body container
  - `SheetSection` / `SheetSectionTitle` -- bordered sections for organizing content
  - `showCloseButton` prop on `SheetContent`
- The close button is rendered inside `SheetContent` using the project's `Button` component, not a plain HTML button.
- `SheetBody` automatically removes its padding when it contains `SheetSection` children (via `has-data-[slot=sheet-section]:p-0`).
- The sheet uses `data-slot` attributes on all sub-components for CSS targeting.
