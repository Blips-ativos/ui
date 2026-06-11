# Sidebar Layouts

## Overview

The shadcn/ui sidebar system provides 16 block variants demonstrating different sidebar patterns. All use the core `Sidebar`, `SidebarProvider`, `SidebarInset`, `SidebarContent`, `SidebarHeader`, `SidebarFooter` primitives with varying compositions.

## Layout Variants

| Block | Description | Key Feature | Variant Prop |
|-------|-------------|-------------|-------------|
| sidebar-01 | Simple sidebar with grouped sections | SidebarGroupLabel per section | default |
| sidebar-02 | Collapsible sections | Collapsible + ChevronRight rotation | default |
| sidebar-03 | Submenus | SidebarMenuSub + SidebarMenuSubButton | default |
| sidebar-04 | Floating sidebar with submenus | `variant="floating"` | floating |
| sidebar-05 | Collapsible submenus | Collapsible + Plus/Minus icons | default |
| sidebar-06 | Submenus as dropdowns | DropdownMenu for sub-items | default |
| sidebar-07 | Collapses to icons | `collapsible="icon"`, tooltip, team switcher, NavUser | icon |
| sidebar-08 | Inset with secondary nav | `variant="inset"`, NavSecondary mt-auto | inset |
| sidebar-09 | Collapsible nested sidebars | Two nested Sidebar components (icon + list) | icon |
| sidebar-10 | Sidebar in a popover | Sidebar inside PopoverContent | default |
| sidebar-11 | Collapsible file tree | Recursive Tree component | default |
| sidebar-12 | Sidebar with calendar | Calendar + collapsible calendar groups | default |
| sidebar-13 | Sidebar in a dialog | Sidebar inside DialogContent | none (dialog) |
| sidebar-14 | Sidebar on the right | `side="right"`, SidebarInset before AppSidebar | default |
| sidebar-15 | Left and right sidebar | Two sidebars: SidebarLeft + SidebarRight | default + none |
| sidebar-16 | Sticky site header | Header above SidebarProvider, CSS var --header-height | default |

## Common Components

### NavUser (used in sidebar-07, 08, 09, 12, 15, 16)

```tsx
"use client"

import {
  SealCheck,
  Bell,
  CaretUpDown,
  CreditCard,
  SignOut,
  Sparkle,
} from "@phosphor-icons/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <CaretUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkle />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SealCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

### TeamSwitcher (used in sidebar-07, 10, 15)

```tsx
"use client"

import * as React from "react"
import { CaretUpDown, Plus } from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <CaretUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>{`\u2318${index + 1}`}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

### NavSecondary (used in sidebar-08, 10, 15, 16)

```tsx
import * as React from "react"
import { type Icon } from "@phosphor-icons/react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
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
  )
}
```

---

## sidebar-01: Simple Grouped Navigation

### Structure
```
SidebarProvider
  Sidebar
    SidebarHeader > VersionSwitcher + SearchForm
    SidebarContent > SidebarGroup[] (one per section, with SidebarGroupLabel)
    SidebarRail
  SidebarInset > header + content
```

### Code (page.tsx)

```tsx
import { AppSidebar } from "./components/app-sidebar"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/ui/breadcrumb"
import { Separator } from "@/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Key Pattern: SidebarGroupLabel per section

```tsx
<SidebarContent>
  {data.navMain.map((item) => (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <a href={item.url}>{item.title}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ))}
</SidebarContent>
```

---

## sidebar-02: Collapsible Sections

### Key Pattern: Collapsible group labels with ChevronRight

```tsx
<SidebarContent className="gap-0">
  {data.navMain.map((item) => (
    <Collapsible key={item.title} title={item.title} defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            {item.title}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  ))}
</SidebarContent>
```

---

## sidebar-03: Submenus

### Key Pattern: SidebarMenuSub for nested items

```tsx
<SidebarMenu>
  {data.navMain.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url} className="font-medium">{item.title}</a>
      </SidebarMenuButton>
      {item.items?.length ? (
        <SidebarMenuSub>
          {item.items.map((item) => (
            <SidebarMenuSubItem key={item.title}>
              <SidebarMenuSubButton asChild isActive={item.isActive}>
                <a href={item.url}>{item.title}</a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

---

## sidebar-04: Floating Variant

### Key Difference: `variant="floating"` + custom width

```tsx
<SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
  <Sidebar variant="floating" {...props}>
    {/* Same submenu pattern as sidebar-03 but with ml-0 border-l-0 px-1.5 on SidebarMenuSub */}
  </Sidebar>
</SidebarProvider>
```

---

## sidebar-05: Collapsible Submenus (Plus/Minus)

### Key Pattern: Collapsible with Plus/Minus toggle icons

```tsx
<Collapsible key={item.title} defaultOpen={index === 1} className="group/collapsible">
  <SidebarMenuItem>
    <CollapsibleTrigger asChild>
      <SidebarMenuButton>
        {item.title}
        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
    {item.items?.length ? (
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items.map((item) => (
            <SidebarMenuSubItem key={item.title}>
              <SidebarMenuSubButton asChild isActive={item.isActive}>
                <a href={item.url}>{item.title}</a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    ) : null}
  </SidebarMenuItem>
</Collapsible>
```

---

## sidebar-06: Dropdown Submenus

### Key Pattern: DropdownMenu for sub-items

```tsx
<SidebarMenu>
  {items.map((item) => (
    <DropdownMenu key={item.title}>
      <SidebarMenuItem>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            {item.title} <DotsThree className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        {item.items?.length ? (
          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
            className="min-w-56 rounded-lg"
          >
            {item.items.map((item) => (
              <DropdownMenuItem asChild key={item.title}>
                <a href={item.url}>{item.title}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        ) : null}
      </SidebarMenuItem>
    </DropdownMenu>
  ))}
</SidebarMenu>
```

Also includes SidebarOptInForm in footer (newsletter card).

---

## sidebar-07: Collapse to Icons

### Key Pattern: `collapsible="icon"` + tooltip + icon-based nav

```tsx
<Sidebar collapsible="icon" {...props}>
  <SidebarHeader>
    <TeamSwitcher teams={data.teams} />
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={data.navMain} />
    <NavProjects projects={data.projects} />
  </SidebarContent>
  <SidebarFooter>
    <NavUser user={data.user} />
  </SidebarFooter>
  <SidebarRail />
</Sidebar>
```

Header transition for collapsed mode:
```tsx
<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
```

NavMain with tooltip and collapsible sub-items:
```tsx
<SidebarMenuButton tooltip={item.title}>
  {item.icon && <item.icon />}
  <span>{item.title}</span>
  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
</SidebarMenuButton>
```

NavProjects hidden when collapsed:
```tsx
<SidebarGroup className="group-data-[collapsible=icon]:hidden">
```

---

## sidebar-08: Inset with Secondary Navigation

### Key Pattern: `variant="inset"` + NavSecondary with `className="mt-auto"`

```tsx
<Sidebar variant="inset" {...props}>
  <SidebarHeader>
    {/* Company logo */}
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={data.navMain} />
    <NavProjects projects={data.projects} />
    <NavSecondary items={data.navSecondary} className="mt-auto" />
  </SidebarContent>
  <SidebarFooter>
    <NavUser user={data.user} />
  </SidebarFooter>
</Sidebar>
```

NavMain uses SidebarMenuAction for collapse trigger (separate from main button):
```tsx
<SidebarMenuButton asChild tooltip={item.title}>
  <a href={item.url}>
    <item.icon />
    <span>{item.title}</span>
  </a>
</SidebarMenuButton>
{item.items?.length ? (
  <>
    <CollapsibleTrigger asChild>
      <SidebarMenuAction className="data-[state=open]:rotate-90">
        <ChevronRight />
        <span className="sr-only">Toggle</span>
      </SidebarMenuAction>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenuSub>{/* sub items */}</SidebarMenuSub>
    </CollapsibleContent>
  </>
) : null}
```

---

## sidebar-09: Collapsible Nested Sidebars (Mail Layout)

### Key Pattern: Two nested Sidebar components

```tsx
<Sidebar collapsible="icon" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row" {...props}>
  {/* First sidebar - icon strip */}
  <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
    <SidebarHeader>{/* Logo */}</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent className="px-1.5 md:px-0">
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={{ children: item.title, hidden: false }}
                  onClick={() => { setActiveItem(item); setOpen(true); }}
                  isActive={activeItem?.title === item.title}
                  className="px-2.5 md:px-2"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter><NavUser user={data.user} /></SidebarFooter>
  </Sidebar>

  {/* Second sidebar - content list */}
  <Sidebar collapsible="none" className="hidden flex-1 md:flex">
    <SidebarHeader className="gap-3.5 border-b p-4">
      <div className="flex w-full items-center justify-between">
        <div className="text-base font-medium text-foreground">{activeItem?.title}</div>
        <Label className="flex items-center gap-2 text-sm">
          <span>Unreads</span>
          <Switch className="shadow-none" />
        </Label>
      </div>
      <SidebarInput placeholder="Type to search..." />
    </SidebarHeader>
    <SidebarContent>
      {/* Mail list items */}
    </SidebarContent>
  </Sidebar>
</Sidebar>
```

---

## sidebar-10: Sidebar in Popover

### Key Pattern: Sidebar component inside PopoverContent for actions menu

```tsx
<Popover open={isOpen} onOpenChange={setIsOpen}>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon" className="h-7 w-7 data-[state=open]:bg-accent">
      <DotsThree />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-56 overflow-hidden rounded-lg p-0" align="end">
    <Sidebar collapsible="none" className="bg-transparent">
      <SidebarContent>
        {data.map((group, index) => (
          <SidebarGroup key={index} className="border-b last:border-none">
            <SidebarGroupContent className="gap-0">
              <SidebarMenu>
                {group.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton>
                      <item.icon /> <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  </PopoverContent>
</Popover>
```

Also features NavFavorites, NavWorkspaces (with collapsible workspace pages), and compact TeamSwitcher.

---

## sidebar-11: Collapsible File Tree

### Key Pattern: Recursive Tree component

```tsx
type TreeItem = string | TreeItem[]

function Tree({ item }: { item: TreeItem }) {
  const [name, ...items] = Array.isArray(item) ? item : [item]

  if (!items.length) {
    return (
      <SidebarMenuButton isActive={name === "button.tsx"} className="data-[active=true]:bg-transparent">
        <File />
        {name}
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={name === "components" || name === "ui"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
```

Also includes Changes group with SidebarMenuBadge for file states (M, U).

---

## sidebar-12: Calendar Sidebar

### Key Pattern: Calendar + collapsible calendar checkbox groups

```tsx
<Sidebar {...props}>
  <SidebarHeader className="h-16 border-b border-sidebar-border">
    <NavUser user={data.user} />
  </SidebarHeader>
  <SidebarContent>
    <DatePicker />
    <SidebarSeparator className="mx-0" />
    <Calendars calendars={data.calendars} />
  </SidebarContent>
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Plus />
          <span>New Calendar</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
  <SidebarRail />
</Sidebar>
```

DatePicker uses Calendar with custom styling:
```tsx
<Calendar className="[&_[role=gridcell]]:w-[33px] [&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground" />
```

---

## sidebar-13: Sidebar in Dialog

### Key Pattern: Sidebar inside DialogContent for settings

```tsx
<DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
  <DialogTitle className="sr-only">Gear</DialogTitle>
  <DialogDescription className="sr-only">Customize your settings here.</DialogDescription>
  <SidebarProvider className="items-start">
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.nav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.name === "Messages & media"}>
                    <a href="#">
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
      <header>{/* Breadcrumb */}</header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        {/* Content */}
      </div>
    </main>
  </SidebarProvider>
</DialogContent>
```

---

## sidebar-14: Right Sidebar

### Key Pattern: `side="right"` + SidebarInset before AppSidebar

```tsx
<SidebarProvider>
  <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Breadcrumb>{/* ... */}</Breadcrumb>
      <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
    </header>
    {/* Content */}
  </SidebarInset>
  <AppSidebar side="right" />
</SidebarProvider>
```

Uses "Table of Contents" SidebarGroupLabel pattern.

---

## sidebar-15: Left and Right Sidebars

### Key Pattern: Two separate Sidebar components (SidebarLeft + SidebarRight)

```tsx
<SidebarProvider>
  <SidebarLeft />
  <SidebarInset>
    <header>{/* SidebarTrigger + Breadcrumb */}</header>
    {/* Content */}
  </SidebarInset>
  <SidebarRight />
</SidebarProvider>
```

SidebarRight is non-collapsible, sticky:
```tsx
<Sidebar collapsible="none" className="sticky top-0 hidden h-svh border-l lg:flex" {...props}>
```

---

## sidebar-16: Sticky Site Header

### Key Pattern: Header above SidebarProvider with CSS variable coordination

```tsx
<div className="[--header-height:calc(--spacing(14))]">
  <SidebarProvider className="flex flex-col">
    <SiteHeader />
    <div className="flex flex-1">
      <AppSidebar />
      <SidebarInset>{/* Content */}</SidebarInset>
    </div>
  </SidebarProvider>
</div>
```

Sidebar offset for header:
```tsx
<Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
```

SiteHeader uses useSidebar hook:
```tsx
"use client"
import { SidebarSimple } from "@phosphor-icons/react"
import { Button } from "@/ui/button"
import { useSidebar } from "@/ui/sidebar"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarSimple />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>{/* ... */}</Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  )
}
```
