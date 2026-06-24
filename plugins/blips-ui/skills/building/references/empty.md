# Empty

Import: `@blips/ui/components/empty`

An empty state component for displaying placeholder content when there is no data. Uses CVA for media variants.

## Sub-components

| Component | Description |
|---|---|
| `Empty` | Root container. Flex column, centered, with dashed border styling and padding. |
| `EmptyHeader` | Header section. Max-width `sm`, centered, with `gap-1` between children. |
| `EmptyMedia` | Media/icon container. Supports `variant` prop for different visual styles. |
| `EmptyTitle` | Title text — `font-medium text-sm tracking-tight`. |
| `EmptyDescription` | Description text — `text-muted-foreground text-xs/relaxed`. Supports styled `<a>` links. |
| `EmptyContent` | Content/action area below header. Max-width `sm`, centered, `text-xs/relaxed`. |

## Props & Variants

### EmptyMedia

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "icon"` | `"default"` | Visual style for the media container. |

**Variant styles (CVA):**

| Variant | Classes |
|---|---|
| `default` | `bg-transparent` — raw content, no background. |
| `icon` | `size-8 rounded-md bg-muted text-foreground` — 32px square icon container with muted background. Icons auto-sized to `size-4`. |

### Empty (Root)

Base classes: `flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 text-balance rounded-xl border-dashed p-6 text-center`

Common customizations:
- `className="border border-dashed"` — Add visible dashed border (outline variant)
- `className="bg-gradient-to-b from-muted/50 from-30% to-background"` — Background gradient variant
- `className="h-full"` — Full height

## Usage

### Basic Empty State with Icon

```tsx
import { ArrowUpRight, FolderPlus } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"

function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlus />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven't created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button variant="link" asChild className="text-muted-foreground" size="sm">
        <a href="#">
          Learn More <ArrowUpRight />
        </a>
      </Button>
    </Empty>
  )
}
```

### Outline Variant (Dashed Border)

```tsx
import { CloudArrowUp } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@blips/ui/components/empty"

function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudArrowUp />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">Upload Files</Button>
      </EmptyContent>
    </Empty>
  )
}
```

### Background Gradient Variant

```tsx
import { ArrowsClockwise, Bell } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@blips/ui/components/empty"

function EmptyBackground() {
  return (
    <Empty className="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You're all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <ArrowsClockwise />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

### Minimal (Icon Only, No Actions)

```tsx
import { Tray } from "@phosphor-icons/react"
import {
  Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@blips/ui/components/empty"

function EmptyMinimal() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Tray />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. New messages will appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
```

## All Examples

- `empty-demo` — Full empty state with icon, title, description, actions, and link
- `empty-icon` — Grid of icon-based empty states (inbox, favorites, likes, bookmarks)
- `empty-outline` — Dashed border variant
- `empty-background` — Gradient background variant
- `empty-avatar` — Empty state with avatar media
- `empty-avatar-group` — Empty state with avatar group
- `empty-input-group` — Empty state with input group

## All Example Variants

### empty-demo

```tsx
import { ArrowUpRight, FolderPlus } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlus />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRight />
        </a>
      </Button>
    </Empty>
  )
}
```

### empty-icon

```tsx
import { Bookmark, Heart, Star, Tray } from "@phosphor-icons/react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"

export default function EmptyIcon() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Tray />
          </EmptyMedia>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>
            Your inbox is empty. New messages will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Star />
          </EmptyMedia>
          <EmptyTitle>No favorites</EmptyTitle>
          <EmptyDescription>
            Items you mark as favorites will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Heart />
          </EmptyMedia>
          <EmptyTitle>No likes yet</EmptyTitle>
          <EmptyDescription>
            Content you like will be saved here for easy access.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Bookmark />
          </EmptyMedia>
          <EmptyTitle>No bookmarks</EmptyTitle>
          <EmptyDescription>
            Save interesting content by bookmarking it.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
```

### empty-avatar

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"

export default function EmptyAvatar() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them
          or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  )
}
```

### empty-avatar-group

```tsx
import { Plus } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"

export default function EmptyAvatarGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <div className="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </EmptyMedia>
        <EmptyTitle>No Team Members</EmptyTitle>
        <EmptyDescription>
          Invite your team to collaborate on this project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <Plus />
          Invite Members
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

### empty-input-group

```tsx
import { MagnifyingGlass } from "@phosphor-icons/react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@blips/ui/components/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blips/ui/components/input-group"
import { Kbd } from "@blips/ui/components/kbd"

export default function EmptyInputGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput placeholder="Try searching for pages..." />
          <InputGroupAddon>
            <MagnifyingGlass />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
```

### empty-outline

```tsx
import { CloudArrowUp } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"

export default function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudArrowUp />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

### empty-background

```tsx
import { ArrowsClockwise, Bell } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty"

export default function EmptyMuted() {
  return (
    <Empty className="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You&apos;re all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <ArrowsClockwise />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```
