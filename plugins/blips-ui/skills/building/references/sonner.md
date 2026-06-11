# Sonner

Import: `@blips/ui/components/sonner`

## Sub-components

- **`Toaster`** - The toast container component that renders notifications. Place once in your root layout. Automatically integrates with `next-themes` for dark/light mode support.

> **Note**: The `toast()` function is imported directly from the `sonner` package, not from the UI library. Only the `<Toaster />` provider comes from `@blips/ui/components/sonner`.

## Props & Variants

### Toaster Props

The `Toaster` component accepts all props from the `sonner` `Toaster` component (`React.ComponentProps<typeof Sonner>`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | Auto from `useTheme()` | Theme for toast styling |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Position of toasts on screen |
| `richColors` | `boolean` | `false` | Enable rich colors for different toast types |
| `expand` | `boolean` | `false` | Expand toasts by default |
| `duration` | `number` | `4000` | Duration in ms before toast auto-dismisses |
| `closeButton` | `boolean` | `false` | Show close button on toasts |

### toast() Function API

| Method | Description |
|--------|-------------|
| `toast(message)` | Default toast |
| `toast.success(message)` | Success toast with check icon |
| `toast.error(message)` | Error toast with error icon |
| `toast.info(message)` | Info toast with info icon |
| `toast.warning(message)` | Warning toast with warning icon |
| `toast.promise(promise, opts)` | Promise-based toast with loading/success/error states |
| `toast.loading(message)` | Loading toast with spinner |
| `toast.dismiss(id?)` | Dismiss a specific toast or all toasts |

### toast() Options

| Option | Type | Description |
|--------|------|-------------|
| `description` | `ReactNode` | Secondary text below the main message |
| `action` | `{ label: string, onClick: () => void }` | Action button on the toast |
| `cancel` | `{ label: string, onClick: () => void }` | Cancel button on the toast |
| `duration` | `number` | Override default duration |
| `position` | `string` | Override default position |
| `id` | `string \| number` | Custom toast ID for deduplication |
| `classNames` | `object` | Custom class names for toast parts |

### Project Customizations

The project's Toaster uses custom icons from `@phosphor-icons/react` and the `Spinner` component for loading state:

- **success**: `CircleCheck`
- **info**: `Info`
- **warning**: `TriangleAlert`
- **error**: `OctagonX`
- **loading**: `Spinner` (size-4)

## Usage

### Setup (Root Layout)

```tsx
import { Toaster } from "@blips/ui/components/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

### Basic Toast

```tsx
"use client"

import { toast } from "sonner"
import { Button } from "@blips/ui/components/button"

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
```

### Toast Types

```tsx
"use client"

import { toast } from "sonner"
import { Button } from "@blips/ui/components/button"

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          )
        }}
      >
        Promise
      </Button>
    </div>
  )
}
```

## All Examples

- `sonner-demo` - Basic toast with description and action button
- `sonner-types` - All toast types (default, success, info, warning, error, promise)

## All Example Variants

### sonner-demo

```tsx
"use client"

import { toast } from "sonner"

import { Button } from "@blips/ui/components/button"

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
```

### sonner-types

```tsx
"use client"

import { toast } from "sonner"

import { Button } from "@blips/ui/components/button"

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          )
        }}
      >
        Promise
      </Button>
    </div>
  )
}
```
