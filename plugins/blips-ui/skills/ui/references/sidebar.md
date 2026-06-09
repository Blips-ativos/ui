# Sidebar

Import: `@blips/ui/components/sidebar`

## Sub-components

| Component | Description |
|---|---|
| `SidebarProvider` | Root context provider. Manages open/collapsed state, mobile detection, keyboard shortcut (Ctrl+B). Wraps children in `TooltipProvider`. |
| `Sidebar` | Main sidebar container. Handles desktop (fixed panel) and mobile (Sheet) rendering. |
| `SidebarTrigger` | Toggle button for sidebar open/close. Renders as a ghost icon Button. |
| `SidebarRail` | Thin vertical strip at the sidebar edge for drag-to-toggle. Hidden on mobile. |
| `SidebarInset` | Main content area (`<main>`) that sits beside the sidebar with proper margins. |
| `SidebarInput` | Styled Input component for search fields inside the sidebar. |
| `SidebarHeader` | Top section of the sidebar. Flex column with `gap-2 p-2`. |
| `SidebarFooter` | Bottom section of the sidebar. Flex column with `gap-2 p-2`. |
| `SidebarSeparator` | Separator styled for sidebar context with `bg-sidebar-border`. |
| `SidebarContent` | Scrollable middle section. Flex column with overflow handling. |
| `SidebarGroup` | Groups navigation items. Flex column with `p-2`. |
| `SidebarGroupLabel` | Label for a group. Supports `asChild` for custom elements (e.g., CollapsibleTrigger). |
| `SidebarGroupAction` | Action button positioned at top-right of a group. |
| `SidebarGroupContent` | Content container within a group. |
| `SidebarMenu` | Unsorted list (`<ul>`) for menu items. Flex column with `gap-1`. |
| `SidebarMenuItem` | List item (`<li>`) wrapper for a menu button. |
| `SidebarMenuButton` | Interactive menu button with CVA variants. Supports `asChild`, `isActive`, `tooltip`, `variant`, and `size`. |
| `SidebarMenuAction` | Action button within a menu item (e.g., delete, settings). Supports `showOnHover`. |
| `SidebarMenuBadge` | Badge displayed on a menu item (e.g., notification count). |
| `SidebarMenuSkeleton` | Loading skeleton for menu items. Supports `showIcon`. |
| `SidebarMenuSub` | Nested sub-menu list with left border indentation. |
| `SidebarMenuSubItem` | Sub-menu list item. |
| `SidebarMenuSubButton` | Interactive button for sub-menu items. Supports `size` and `isActive`. |
| `useSidebar` | Hook to access sidebar context (state, open, toggleSidebar, isMobile, etc.). |

## Props & Variants

### SidebarProvider

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultOpen` | `boolean` | `true` | Initial open state (uncontrolled). |
| `open` | `boolean` | -- | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | -- | Callback when open state changes. |
| `className` | `string` | -- | Additional CSS classes. |
| `style` | `CSSProperties` | -- | CSS custom properties. Sets `--sidebar-width` and `--sidebar-width-icon`. |

**CSS custom properties:**
- `--sidebar-width`: `16rem` (default desktop width)
- `--sidebar-width-icon`: `3rem` (collapsed icon-only width)

**Cookie persistence:** Saves state to `sidebar_state` cookie (7-day max-age).

**Keyboard shortcut:** `Ctrl+B` / `Cmd+B` toggles the sidebar.

### Sidebar

| Prop | Type | Default | Description |
|---|---|---|---|
| `side` | `"left" \| "right"` | `"left"` | Which side the sidebar is on. |
| `variant` | `"sidebar" \| "floating" \| "inset"` | `"sidebar"` | Visual variant. `floating` adds rounded corners and shadow. `inset` adds margin and rounding. |
| `collapsible` | `"offcanvas" \| "icon" \| "none"` | `"offcanvas"` | Collapse behavior. `offcanvas` slides out, `icon` shrinks to icon-only, `none` is always visible. |
| `className` | `string` | -- | Additional CSS classes. |

**Mobile behavior:** On mobile, the sidebar renders inside a `Sheet` component with `--sidebar-width: 18rem`.

### SidebarMenuButton (CVA Variants)

| Variant | Values | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "outline"` | `"default"` | Visual style. `outline` adds a border shadow. |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Size. `default`=`h-8`, `sm`=`h-7 text-xs`, `lg`=`h-12`. |

| Prop | Type | Default | Description |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Render as child element (e.g., `<a>`). |
| `isActive` | `boolean` | `false` | Highlight as active. Applies `bg-sidebar-accent font-medium`. |
| `tooltip` | `string \| TooltipContentProps` | -- | Tooltip shown when sidebar is collapsed (icon mode). |

### SidebarMenuSubButton

| Prop | Type | Default | Description |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Render as child element. |
| `size` | `"sm" \| "md"` | `"md"` | Text size. `sm`=`text-xs`, `md`=`text-sm`. |
| `isActive` | `boolean` | -- | Highlight as active. |

### SidebarMenuAction

| Prop | Type | Default | Description |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Render as child element. |
| `showOnHover` | `boolean` | `false` | Only show on hover/focus (opacity transition). |

### SidebarMenuSkeleton

| Prop | Type | Default | Description |
|---|---|---|---|
| `showIcon` | `boolean` | `false` | Show an icon-sized skeleton circle. |

### SidebarGroupLabel

| Prop | Type | Default | Description |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Render as child element (e.g., `CollapsibleTrigger`). |

### useSidebar Hook

Returns `SidebarContextProps`:

| Property | Type | Description |
|---|---|---|
| `state` | `"expanded" \| "collapsed"` | Current sidebar state. |
| `open` | `boolean` | Whether sidebar is open. |
| `setOpen` | `(open: boolean) => void` | Set open state. |
| `openMobile` | `boolean` | Whether mobile sheet is open. |
| `setOpenMobile` | `(open: boolean) => void` | Set mobile open state. |
| `isMobile` | `boolean` | Whether on mobile viewport. |
| `toggleSidebar` | `() => void` | Toggle sidebar (desktop or mobile). |

## Usage

### Basic Sidebar

```tsx
"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"
import { House, Tray, Gear } from "@phosphor-icons/react"

const items = [
  { title: "House", url: "#", icon: House },
  { title: "Tray", url: "#", icon: Tray },
  { title: "Gear", url: "#", icon: Gear },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### With Collapsible Groups

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@blips/ui/components/collapsible"
import { ChevronRight } from "@phosphor-icons/react"

<Collapsible defaultOpen className="group/collapsible">
  <SidebarGroup>
    <SidebarGroupLabel asChild>
      <CollapsibleTrigger>
        {item.title}
        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
      </CollapsibleTrigger>
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.items.map((subItem) => (
            <SidebarMenuItem key={subItem.title}>
              <SidebarMenuButton asChild isActive={subItem.isActive}>
                <a href={subItem.url}>{subItem.title}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </CollapsibleContent>
  </SidebarGroup>
</Collapsible>
```

### With Nested Sub-menus

```tsx
<SidebarMenuItem>
  <Collapsible>
    <CollapsibleTrigger asChild>
      <SidebarMenuButton>
        <ChevronRight className="transition-transform" />
        <FolderIcon />
        {name}
      </SidebarMenuButton>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenuSub>
        {items.map((subItem) => (
          <SidebarMenuSubItem key={subItem.title}>
            <SidebarMenuSubButton asChild isActive={subItem.isActive}>
              <a href={subItem.url}>{subItem.title}</a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  </Collapsible>
</SidebarMenuItem>
```

### With Menu Badges

```tsx
<SidebarMenuItem>
  <SidebarMenuButton>
    <FileIcon />
    {item.file}
  </SidebarMenuButton>
  <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
</SidebarMenuItem>
```

### With MagnifyingGlass Input

```tsx
<SidebarHeader>
  <SidebarGroup className="py-0">
    <SidebarGroupContent className="relative">
      <Label htmlFor="search" className="sr-only">MagnifyingGlass</Label>
      <SidebarInput id="search" placeholder="MagnifyingGlass..." className="pl-8" />
      <MagnifyingGlass className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50" />
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarHeader>
```

### Loading State

```tsx
<SidebarMenu>
  {Array.from({ length: 5 }).map((_, i) => (
    <SidebarMenuItem key={i}>
      <SidebarMenuSkeleton showIcon />
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

## All Examples

- `sidebar-demo` -- Basic sidebar with menu items and trigger
- `sidebar-01` -- Simple sidebar with grouped navigation
- `sidebar-02` -- Collapsible sidebar sections
- `sidebar-11` -- Collapsible file tree sidebar
- `sidebar-header` -- Header with dropdown workspace selector
- `sidebar-footer` -- Footer with dropdown user menu
- `sidebar-group` -- Simple group with label and menu items
- `sidebar-group-collapsible` -- Collapsible group using Collapsible component
- `sidebar-group-action` -- Group with action button (e.g., add project)
- `sidebar-menu` -- Basic menu with icons and links
- `sidebar-menu-action` -- Menu items with dropdown action menus
- `sidebar-menu-sub` -- Nested sub-menus with sub-items
- `sidebar-menu-collapsible` -- Collapsible menu items with sub-menus
- `sidebar-menu-badge` -- Menu items with notification badges
- `sidebar-rsc` -- React Server Component with Suspense and skeleton fallback
- `sidebar-controlled` -- Controlled open/close state with custom toggle button

## All Example Variants

### sidebar-demo

```tsx
"use client"

import {
  Calendar,
  House,
  Tray,
  MagnifyingGlass,
  Gear,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"

const items = [
  { title: "House", url: "#", icon: House },
  { title: "Tray", url: "#", icon: Tray },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "MagnifyingGlass", url: "#", icon: MagnifyingGlass },
  { title: "Gear", url: "#", icon: Gear },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### sidebar-header

```tsx
"use client"

import { CaretDown } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    Select Workspace
                    <CaretDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-popper-anchor-width)">
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### sidebar-footer

```tsx
"use client"

import { CaretUp } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    Username
                    <CaretUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-(--radix-popper-anchor-width)"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### sidebar-group

```tsx
"use client"

import { Lifebuoy, PaperPlaneTilt } from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Help</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Lifebuoy />
                    Support
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <PaperPlaneTilt />
                    Feedback
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-group-collapsible

```tsx
"use client"

import { CaretDown, Lifebuoy, PaperPlaneTilt } from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  Help
                  <CaretDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Lifebuoy />
                        Support
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <PaperPlaneTilt />
                        Feedback
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-group-action

```tsx
"use client"

import { FrameCorners, MapTrifold, ChartPie, Plus } from "@phosphor-icons/react"
import { toast, Toaster } from "sonner"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction
              title="Add Project"
              onClick={() => toast("You clicked the group action!")}
            >
              <Plus /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <FrameCorners />
                      <span>Design Engineering</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <ChartPie />
                      <span>Sales & Marketing</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <MapTrifold />
                      <span>Travel</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-menu

```tsx
"use client"

import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners },
  { name: "Sales & Marketing", url: "#", icon: ChartPie },
  { name: "Travel", url: "#", icon: MapTrifold },
  { name: "Support", url: "#", icon: Lifebuoy },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-menu-action

```tsx
"use client"

import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  DotsThree,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners },
  { name: "Sales & Marketing", url: "#", icon: ChartPie },
  { name: "Travel", url: "#", icon: MapTrifold },
  { name: "Support", url: "#", icon: Lifebuoy },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton
                      asChild
                      className="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                    >
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <DotsThree />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>
                          <span>Edit Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-menu-sub

```tsx
"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const items = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      { title: "Installation", url: "#" },
      { title: "Project Structure", url: "#" },
    ],
  },
  {
    title: "Build Your Application",
    url: "#",
    items: [
      { title: "Routing", url: "#" },
      { title: "Data Fetching", url: "#", isActive: true },
      { title: "Rendering", url: "#" },
      { title: "Caching", url: "#" },
      { title: "Styling", url: "#" },
      { title: "Optimizing", url: "#" },
      { title: "Configuring", url: "#" },
      { title: "Testing", url: "#" },
      { title: "Authentication", url: "#" },
      { title: "Deploying", url: "#" },
      { title: "Upgrading", url: "#" },
      { title: "Examples", url: "#" },
    ],
  },
  {
    title: "API Reference",
    url: "#",
    items: [
      { title: "Components", url: "#" },
      { title: "File Conventions", url: "#" },
      { title: "Functions", url: "#" },
      { title: "next.config.js Options", url: "#" },
      { title: "CLI", url: "#" },
      { title: "Edge Runtime", url: "#" },
    ],
  },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.items.map((subItem, subIndex) => (
                        <SidebarMenuSubItem key={subIndex}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-menu-collapsible

```tsx
"use client"

import { CaretRight } from "@phosphor-icons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const items = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      { title: "Installation", url: "#" },
      { title: "Project Structure", url: "#" },
    ],
  },
  {
    title: "Build Your Application",
    url: "#",
    items: [
      { title: "Routing", url: "#" },
      { title: "Data Fetching", url: "#", isActive: true },
      { title: "Rendering", url: "#" },
      { title: "Caching", url: "#" },
      { title: "Styling", url: "#" },
      { title: "Optimizing", url: "#" },
      { title: "Configuring", url: "#" },
      { title: "Testing", url: "#" },
      { title: "Authentication", url: "#" },
      { title: "Deploying", url: "#" },
      { title: "Upgrading", url: "#" },
      { title: "Examples", url: "#" },
    ],
  },
  {
    title: "API Reference",
    url: "#",
    items: [
      { title: "Components", url: "#" },
      { title: "File Conventions", url: "#" },
      { title: "Functions", url: "#" },
      { title: "next.config.js Options", url: "#" },
      { title: "CLI", url: "#" },
      { title: "Edge Runtime", url: "#" },
    ],
  },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <Collapsible
                    key={index}
                    className="group/collapsible"
                    defaultOpen={index === 0}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <span>{item.title}</span>
                          <CaretRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-menu-badge

```tsx
"use client"

import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners, badge: "24" },
  { name: "Sales & Marketing", url: "#", icon: ChartPie, badge: "12" },
  { name: "Travel", url: "#", icon: MapTrifold, badge: "3" },
  { name: "Support", url: "#", icon: Lifebuoy, badge: "21" },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt, badge: "8" },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton
                      asChild
                      className="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                    >
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{project.badge}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### sidebar-rsc

```tsx
import * as React from "react"
import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners, badge: "24" },
  { name: "Sales & Marketing", url: "#", icon: ChartPie, badge: "12" },
  { name: "Travel", url: "#", icon: MapTrifold, badge: "3" },
  { name: "Support", url: "#", icon: Lifebuoy, badge: "21" },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt, badge: "8" },
]

async function fetchProjects() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return projects
}

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <React.Suspense fallback={<NavProjectsSkeleton />}>
                <NavProjects />
              </React.Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

async function NavProjects() {
  const projects = await fetchProjects()

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <project.icon />
              <span>{project.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
```

### sidebar-controlled

```tsx
"use client"

import * as React from "react"
import {
  FrameCorners,
  Lifebuoy,
  MapTrifold,
  SidebarSimple,
  SidebarSimple,
  ChartPie,
  PaperPlaneTilt,
} from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameCorners },
  { name: "Sales & Marketing", url: "#", icon: ChartPie },
  { name: "Travel", url: "#", icon: MapTrifold },
  { name: "Support", url: "#", icon: Lifebuoy },
  { name: "Feedback", url: "#", icon: PaperPlaneTilt },
]

export default function AppSidebar() {
  const [open, setOpen] = React.useState(true)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <Button
            onClick={() => setOpen((open) => !open)}
            size="sm"
            variant="ghost"
          >
            {open ? <SidebarSimple /> : <SidebarSimple />}
            <span>{open ? "Close" : "Open"} Sidebar</span>
          </Button>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

## Project Notes

- Uses `@phosphor-icons/react` `SidebarSimple` icon (aliased as `SidebarSimple`) for the trigger button.
- The sidebar uses the project's own `Sheet`, `Button`, `Input`, `Separator`, `Skeleton`, and `Tooltip` components internally.
- Uses `useIsMobile` hook from `@selfie/ui/hooks/use-mobile` for responsive behavior.
- **CSS custom properties** define widths: `--sidebar-width: 16rem`, `--sidebar-width-icon: 3rem`, `--sidebar-width` (mobile): `18rem`.
- **Sidebar color tokens:** `bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`, `text-sidebar-accent-foreground`, `bg-sidebar-primary`, `text-sidebar-primary-foreground`, `bg-sidebar-border`, `ring-sidebar-ring`.
- **Data attributes** used for styling: `data-sidebar`, `data-state`, `data-collapsible`, `data-variant`, `data-side`, `data-active`, `data-size`, `data-mobile`.
- Collapsed icon mode: Menu buttons shrink to `size-8 p-2`, labels and sub-menus are hidden, group labels get `opacity-0`.
