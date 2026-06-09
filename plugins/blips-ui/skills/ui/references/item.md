# Item

Import: `@blips/ui/components/item`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `Item` | `<div>` | Root container. Supports `asChild` for polymorphic rendering (e.g., as `<a>`). Uses CVA variants. |
| `ItemMedia` | `<div>` | Leading media slot (icon, avatar, image). Has its own variant system. |
| `ItemContent` | `<div>` | Flexible content area with title/description. Auto flex-1. |
| `ItemTitle` | `<div>` | Title text. Single line clamp, font-medium. |
| `ItemDescription` | `<p>` | Description text. Two line clamp, muted foreground color. |
| `ItemActions` | `<div>` | Trailing actions slot (buttons, icons). Flex with gap-2. |
| `ItemHeader` | `<div>` | Full-width header spanning the top of the item (e.g., for images). |
| `ItemFooter` | `<div>` | Full-width footer spanning the bottom of the item. |
| `ItemGroup` | `<div>` | List container with `role="list"`. Auto-adjusts gap based on child item sizes. |
| `ItemSeparator` | `<Separator>` | Horizontal separator between items within a group. |

## Props & Variants

### Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` | Visual style variant |
| `size` | `"default" \| "sm" \| "xs"` | `"default"` | Size of the item (affects padding and gap) |
| `asChild` | `boolean` | `false` | Renders as child element (via Radix Slot) for polymorphic usage |

**Variant styles:**

| Variant | Description |
|---------|-------------|
| `default` | Transparent border |
| `outline` | Visible border (`border-border`) |
| `muted` | Transparent border with `bg-muted/50` background |

**Size styles:**

| Size | Padding | Gap |
|------|---------|-----|
| `default` | `px-3 py-2.5` | `gap-2.5` |
| `sm` | `px-3 py-2.5` | `gap-2.5` |
| `xs` | `px-2.5 py-2` | `gap-2.5` |

### ItemMedia

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "icon" \| "image"` | `"default"` | Media type variant |

**Media variant styles:**

| Variant | Description |
|---------|-------------|
| `default` | Transparent background, no sizing constraints |
| `icon` | SVGs auto-sized to `size-4` |
| `image` | Fixed `size-8` container with overflow hidden, rounded. Responsive to parent item size. |

## Usage

### Basic Item with Actions

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@blips/ui/components/item"
import { Button } from "@blips/ui/components/button"

<Item variant="outline">
  <ItemContent>
    <ItemTitle>Basic Item</ItemTitle>
    <ItemDescription>
      A simple item with title and description.
    </ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">
      Action
    </Button>
  </ItemActions>
</Item>
```

### Item as Link (asChild)

```tsx
import { CaretRight, ArrowSquareOut } from "@phosphor-icons/react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@blips/ui/components/item"

<Item asChild>
  <a href="#">
    <ItemContent>
      <ItemTitle>Visit our documentation</ItemTitle>
      <ItemDescription>
        Learn how to get started with our components.
      </ItemDescription>
    </ItemContent>
    <ItemActions>
      <CaretRight className="size-4" />
    </ItemActions>
  </a>
</Item>
```

### Item with Icon Media

```tsx
import { ShieldWarning } from "@phosphor-icons/react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"
import { Button } from "@blips/ui/components/button"

<Item variant="outline">
  <ItemMedia variant="icon">
    <ShieldWarning />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Security Alert</ItemTitle>
    <ItemDescription>
      New login detected from unknown device.
    </ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm" variant="outline">
      Review
    </Button>
  </ItemActions>
</Item>
```

### Item Variants

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@blips/ui/components/item"
import { Button } from "@blips/ui/components/button"

{/* Default - transparent border */}
<Item>
  <ItemContent>
    <ItemTitle>Default Variant</ItemTitle>
    <ItemDescription>Standard styling with subtle background and borders.</ItemDescription>
  </ItemContent>
</Item>

{/* Outline - visible border */}
<Item variant="outline">
  <ItemContent>
    <ItemTitle>Outline Variant</ItemTitle>
    <ItemDescription>Outlined style with clear borders.</ItemDescription>
  </ItemContent>
</Item>

{/* Muted - muted background */}
<Item variant="muted">
  <ItemContent>
    <ItemTitle>Muted Variant</ItemTitle>
    <ItemDescription>Subdued appearance with muted colors.</ItemDescription>
  </ItemContent>
</Item>
```

### ItemGroup with Separators

```tsx
import * as React from "react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@blips/ui/components/item"

<ItemGroup>
  {people.map((person, index) => (
    <React.Fragment key={person.username}>
      <Item>
        <ItemMedia>
          <Avatar>
            <AvatarImage src={person.avatar} />
            <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{person.username}</ItemTitle>
          <ItemDescription>{person.email}</ItemDescription>
        </ItemContent>
      </Item>
      {index !== people.length - 1 && <ItemSeparator />}
    </React.Fragment>
  ))}
</ItemGroup>
```

### Item with Image Media

```tsx
import Image from "next/image"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

<ItemGroup className="gap-4">
  {music.map((song) => (
    <Item key={song.title} variant="outline" asChild role="listitem">
      <a href="#">
        <ItemMedia variant="image">
          <Image
            src={`https://avatar.vercel.sh/${song.title}`}
            alt={song.title}
            width={32}
            height={32}
            className="object-cover grayscale"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{song.title}</ItemTitle>
          <ItemDescription>{song.artist}</ItemDescription>
        </ItemContent>
      </a>
    </Item>
  ))}
</ItemGroup>
```

### Item with Header (Card-like)

```tsx
import Image from "next/image"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@blips/ui/components/item"

<ItemGroup className="grid grid-cols-3 gap-4">
  {models.map((model) => (
    <Item key={model.name} variant="outline">
      <ItemHeader>
        <Image
          src={model.image}
          alt={model.name}
          width={128}
          height={128}
          className="aspect-square w-full rounded-sm object-cover"
        />
      </ItemHeader>
      <ItemContent>
        <ItemTitle>{model.name}</ItemTitle>
        <ItemDescription>{model.description}</ItemDescription>
      </ItemContent>
    </Item>
  ))}
</ItemGroup>
```

### Item inside DropdownMenu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

<DropdownMenuContent className="w-72">
  {people.map((person) => (
    <DropdownMenuItem key={person.username} className="p-0">
      <Item size="sm" className="w-full p-2">
        <ItemMedia>
          <Avatar className="size-8">
            <AvatarImage src={person.avatar} />
            <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent className="gap-0.5">
          <ItemTitle>{person.username}</ItemTitle>
          <ItemDescription>{person.email}</ItemDescription>
        </ItemContent>
      </Item>
    </DropdownMenuItem>
  ))}
</DropdownMenuContent>
```

## All Examples

- `item-demo` - Basic item with actions and small linked item
- `item-icon` - Item with icon media variant
- `item-size` - Item sizes (default and sm)
- `item-link` - Item rendered as anchor links (asChild)
- `item-image` - Item with image media variant in a group
- `item-group` - ItemGroup with avatars and separators
- `item-header` - Card-like items with full-width header images
- `item-avatar` - Items with avatar media and stacked avatars
- `item-variant` - All three variants side by side
- `item-dropdown` - Items inside a DropdownMenu

## All Example Variants

### item-demo

```tsx
import { SealCheck, CaretRight } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

export default function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" asChild>
        <a href="#">
          <ItemMedia>
            <SealCheck className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <CaretRight className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
```

### item-size

```tsx
import { SealCheck, CaretRight } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

export default function ItemSizeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" asChild>
        <a href="#">
          <ItemMedia>
            <SealCheck className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <CaretRight className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
```

### item-variant

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@blips/ui/components/item"

export default function ItemVariant() {
  return (
    <div className="flex flex-col gap-6">
      <Item>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>
            Standard styling with subtle background and borders.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>
            Outlined style with clear borders and transparent background.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>
            Subdued appearance with muted colors for secondary content.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
```

### item-icon

```tsx
import { ShieldWarning } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

export default function ItemIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldWarning />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
```

### item-image

```tsx
import Image from "next/image"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
]

export default function ItemImage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup className="gap-4">
        {music.map((song) => (
          <Item key={song.title} variant="outline" asChild role="listitem">
            <a href="#">
              <ItemMedia variant="image">
                <Image
                  src={`https://avatar.vercel.sh/${song.title}`}
                  alt={song.title}
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {song.title} -{" "}
                  <span className="text-muted-foreground">{song.album}</span>
                </ItemTitle>
                <ItemDescription>{song.artist}</ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>{song.duration}</ItemDescription>
              </ItemContent>
            </a>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
```

### item-avatar

```tsx
import { Plus } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

export default function ItemAvatar() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
            <Avatar className="hidden sm:flex">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="hidden sm:flex">
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
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>
            Invite your team to collaborate on this project.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Invite
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
```

### item-group

```tsx
import * as React from "react"
import { Plus } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@blips/ui/components/item"

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]

export default function ItemGroupExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup>
        {people.map((person, index) => (
          <React.Fragment key={person.username}>
            <Item>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={person.avatar} className="grayscale" />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Plus />
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  )
}
```

### item-header

```tsx
import Image from "next/image"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@blips/ui/components/item"

const models = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image:
      "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
    credit: "Valeria Reverdo on Unsplash",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
    credit: "Michael Oeser on Unsplash",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
    credit: "Cherry Laithang on Unsplash",
  },
]

export default function ItemHeaderDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <ItemGroup className="grid grid-cols-3 gap-4">
        {models.map((model) => (
          <Item key={model.name} variant="outline">
            <ItemHeader>
              <Image
                src={model.image}
                alt={model.name}
                width={128}
                height={128}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{model.name}</ItemTitle>
              <ItemDescription>{model.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
```

### item-dropdown

```tsx
"use client"

import { CaretDown } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item"

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]

export default function ItemDropdown() {
  return (
    <div className="flex min-h-64 w-full max-w-md flex-col items-center gap-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-fit">
            Select <CaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 [--radius:0.65rem]" align="end">
          {people.map((person) => (
            <DropdownMenuItem key={person.username} className="p-0">
              <Item size="sm" className="w-full p-2">
                <ItemMedia>
                  <Avatar className="size-8">
                    <AvatarImage src={person.avatar} className="grayscale" />
                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-0.5">
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription>{person.email}</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
```

### item-link

```tsx
import { CaretRight, ArrowSquareOut } from "@phosphor-icons/react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@blips/ui/components/item"

export default function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item asChild>
        <a href="#">
          <ItemContent>
            <ItemTitle>Visit our documentation</ItemTitle>
            <ItemDescription>
              Learn how to get started with our components.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <CaretRight className="size-4" />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ItemContent>
            <ItemTitle>External resource</ItemTitle>
            <ItemDescription>
              Opens in a new tab with security attributes.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ArrowSquareOut className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
```
