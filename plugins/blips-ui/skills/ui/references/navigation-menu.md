# Navigation Menu

Import: `@blips/ui/components/navigation-menu`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `NavigationMenu` | `NavigationMenuPrimitive.Root` | Root container. Includes `NavigationMenuViewport` automatically. |
| `NavigationMenuList` | `NavigationMenuPrimitive.List` | Horizontal list of navigation items. |
| `NavigationMenuItem` | `NavigationMenuPrimitive.Item` | Individual navigation item wrapper (direct re-export). |
| `NavigationMenuTrigger` | `NavigationMenuPrimitive.Trigger` | Button that opens a dropdown content panel. Includes animated chevron. |
| `NavigationMenuContent` | `NavigationMenuPrimitive.Content` | Dropdown panel with animated slide transitions. |
| `NavigationMenuLink` | `NavigationMenuPrimitive.Link` | Navigation link (direct re-export). Supports `asChild`. |
| `NavigationMenuViewport` | `NavigationMenuPrimitive.Viewport` | Animated viewport that renders content panels. Auto-included in `NavigationMenu`. |
| `NavigationMenuIndicator` | `NavigationMenuPrimitive.Indicator` | Arrow indicator that follows the active trigger. |
| `navigationMenuTriggerStyle` | CVA function | Exported style function for applying trigger styles to links (non-dropdown items). |

## Props & Variants

### NavigationMenu (Root)

Standard `NavigationMenuPrimitive.Root` props.

**Default styles:**
- `relative z-10 flex max-w-max flex-1 items-center justify-center`
- Automatically renders `NavigationMenuViewport` as child

### NavigationMenuTrigger

Standard `NavigationMenuPrimitive.Trigger` props.

**Default styles (via `navigationMenuTriggerStyle()`):**
- `group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm`
- Hover/focus: `hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`
- Open state: `data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground`
- Disabled: `disabled:pointer-events-none disabled:opacity-50`
- Includes animated `CaretDown` icon that rotates 180deg on open

### NavigationMenuContent

Standard `NavigationMenuPrimitive.Content` props.

**Default styles:**
- Absolute positioned on md+, full width on mobile
- Animated slide transitions based on motion direction:
  - `data-[motion=from-start]:slide-in-from-left-52`
  - `data-[motion=from-end]:slide-in-from-right-52`
  - `data-[motion=to-start]:slide-out-to-left-52`
  - `data-[motion=to-end]:slide-out-to-right-52`

### NavigationMenuViewport

**Default styles:**
- `relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full`
- `origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg`
- Animated: `data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-95`
- Responsive width: `md:w-[var(--radix-navigation-menu-viewport-width)]`

### navigationMenuTriggerStyle

Exported CVA function. Use on `NavigationMenuLink` for items without dropdown content.

## Usage

### Full Navigation Menu with Dropdown Panels

```tsx
"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@blips/ui/components/navigation-menu"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content displayed one at a time.",
  },
]

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Menu with featured item + grid */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>House</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium">App Name</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Description of the app.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Menu with component grid */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Simple link (no dropdown) */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
```

### Simple Link List

```tsx
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@blips/ui/components/navigation-menu"

<NavigationMenuItem>
  <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid w-[200px] gap-4">
      <li>
        <NavigationMenuLink asChild>
          <Link href="#">Components</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="#">Documentation</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="#">Blocks</Link>
        </NavigationMenuLink>
      </li>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>
```

### With Icons

```tsx
import Link from "next/link"
import { Question, Circle, CheckCircle } from "@phosphor-icons/react"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@blips/ui/components/navigation-menu"

<NavigationMenuItem>
  <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid w-[200px] gap-4">
      <li>
        <NavigationMenuLink asChild>
          <Link href="#" className="flex-row items-center gap-2">
            <Question />
            Backlog
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="#" className="flex-row items-center gap-2">
            <Circle />
            To Do
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link href="#" className="flex-row items-center gap-2">
            <CheckCircle />
            Done
          </Link>
        </NavigationMenuLink>
      </li>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>
```

## Project Notes

- This project uses `@phosphor-icons/react` (`CaretDown`) for the chevron icon.
- The component uses `forwardRef` pattern.
- `NavigationMenuViewport` is automatically included inside `NavigationMenu` -- do not add it manually.

## All Examples

- `navigation-menu-demo` - Comprehensive example with featured panel, component grid, simple links, icon links, and description lists
