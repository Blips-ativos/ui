# Button

Import: `@blips/ui/components/button`

## Sub-components

| Component | Description |
|---|---|
| `Button` | Primary button component with CVA variants, loading state, and `asChild` support. |

Also exports `buttonVariants` for use with other elements (e.g., `AlertDialogAction`).

## Props & Variants

### Button

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "outline" \| "secondary" \| "ghost" \| "destructive" \| "link"` | `"default"` | Visual style variant. |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` | Size variant. |
| `asChild` | `boolean` | `false` | When `true`, merges props onto child element via Radix `Slot`. |
| `loading` | `boolean` | `false` | Shows a `Spinner` and disables the button. |
| `type` | `string` | `"button"` | HTML button type. Defaults to `"button"` (not `"submit"`). |
| `disabled` | `boolean` | `false` | Disables the button. Also set when `loading` is `true`. |

#### Variant Styles

| Variant | Classes |
|---|---|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/80` |
| `outline` | `border-border backdrop-blur-sm hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted dark:bg-input/30` |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary` |
| `ghost` | `hover:bg-muted hover:text-foreground aria-expanded:bg-muted dark:hover:bg-muted/50` |
| `destructive` | `bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30` |
| `link` | `text-primary underline-offset-4 hover:underline` |

#### Size Styles

| Size | Height | Description |
|---|---|---|
| `default` | `h-8` | Standard button, `px-2`, `text-xs/relaxed` |
| `xs` | `h-5` | Extra small, `px-2`, `text-[0.625rem]`, `rounded-sm` |
| `sm` | `h-6` | Small, `px-2`, `text-xs/relaxed` |
| `lg` | `h-8` | Large, `px-2.5`, `text-xs/relaxed` |
| `icon` | `size-8` | Square icon button, `32px` |
| `icon-xs` | `size-5` | Extra small icon, `20px`, `rounded-sm` |
| `icon-sm` | `size-6` | Small icon, `24px` |
| `icon-lg` | `size-8` | Large icon, `32px` |

**Base classes:** `group/button inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-clip-padding font-medium text-xs/relaxed outline-hidden transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50`

Data attributes set on the element: `data-slot="button"`, `data-variant`, `data-size`.

## Usage

### Basic variants

```tsx
import { Button } from "@blips/ui/components/button"

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Icon button

```tsx
import { ArrowUp } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"

<Button variant="outline" size="icon" aria-label="Submit">
  <ArrowUp />
</Button>
```

### Loading state

```tsx
import { Button } from "@blips/ui/components/button"

<Button loading={isPending}>Submit</Button>
```

### As child (with Next.js Link)

```tsx
import Link from "next/link"
import { Button } from "@blips/ui/components/button"

<Button asChild variant="link">
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Size variants

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Using buttonVariants

```tsx
import { buttonVariants } from "@blips/ui/components/button"

<a href="/link" className={buttonVariants({ variant: "outline", size: "sm" })}>
  Styled Link
</a>
```

## Project Notes

- Default `type` is `"button"` (not `"submit"`) to prevent accidental form submissions.
- The `loading` prop automatically disables the button and prepends a `Spinner` component.
- Uses `radix-ui` `Slot.Root` for the `asChild` pattern (not `@radix-ui/react-slot` directly).
- The `destructive` variant uses a subtle background (`bg-destructive/10`) rather than a solid destructive color.
- SVG icons inside buttons are automatically sized via `[&_svg:not([class*='size-'])]:size-*` selectors based on the `size` variant.
- `data-[icon=inline-start]` and `data-[icon=inline-end]` selectors adjust padding when icons have these data attributes.

## All Example Variants

### button-demo

```tsx
import { ArrowUp } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUp />
      </Button>
    </div>
  )
}
```

### button-secondary

```tsx
import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}
```

### button-destructive

```tsx
import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>
}
```

### button-outline

```tsx
import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}
```

### button-ghost

```tsx
import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}
```

### button-link

```tsx
import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonLink() {
  return <Button variant="link">Link</Button>
}
```

### button-with-icon

```tsx
import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  )
}
```

### button-loading

```tsx
import { Button } from "@/registry/new-york-v4/ui/button"
import { Spinner } from "@/registry/new-york-v4/ui/spinner"

export default function ButtonLoading() {
  return (
    <Button size="sm" variant="outline" disabled>
      <Spinner />
      Submit
    </Button>
  )
}
```

### button-icon

```tsx
import { ArrowCircleUp } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <ArrowCircleUp />
    </Button>
  )
}
```

### button-as-child

```tsx
import Link from "next/link"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
```

### button-rounded

```tsx
import { ArrowUp } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonRounded() {
  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full">
        <ArrowUp />
      </Button>
    </div>
  )
}
```

### button-size

```tsx
import { ArrowUpRight } from "@phosphor-icons/react"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonSize() {
  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="icon-sm" aria-label="Submit" variant="outline">
          <ArrowUpRight />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button size="icon" aria-label="Submit" variant="outline">
          <ArrowUpRight />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button size="icon-lg" aria-label="Submit" variant="outline">
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  )
}
```
