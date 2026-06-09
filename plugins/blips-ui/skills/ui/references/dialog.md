# Dialog

Import: `@blips/ui/components/dialog`

## Sub-components

| Export | Description |
|--------|-------------|
| `Dialog` | Root component. Direct re-export of Radix Dialog Root. Controls open/close state. |
| `DialogTrigger` | Trigger element. Direct re-export. Clicking opens the dialog. |
| `DialogPortal` | Portal wrapper. Direct re-export. Renders content outside the DOM hierarchy. |
| `DialogOverlay` | Backdrop overlay. Fixed full-screen black/80 with fade animation. |
| `DialogClose` | Close trigger. Direct re-export. Closes the dialog when clicked. |
| `DialogContent` | Main content container. Centered modal with overlay, close button (X), and slide/zoom animations. |
| `DialogHeader` | Header layout. Flex column with vertical spacing, centered on mobile, left-aligned on sm+. |
| `DialogFooter` | Footer layout. Column-reverse on mobile, flex-row with right justification on sm+. |
| `DialogTitle` | Title text. Semibold, lg size, tight tracking. Wraps Radix Dialog.Title. |
| `DialogDescription` | Description text. Muted foreground, sm size. Wraps Radix Dialog.Description. |

## Props & Variants

### Dialog (Root) Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | -- | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | -- | Called when open state changes |
| `modal` | `boolean` | `true` | Whether dialog is modal (traps focus, blocks interaction outside) |

### DialogContent Props

All Radix Dialog.Content props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | -- | Additional classes (e.g., `sm:max-w-[425px]`, `sm:max-w-md`) |
| `onPointerDownOutside` | `(event) => void` | -- | Handle clicks outside |
| `onEscapeKeyDown` | `(event) => void` | -- | Handle Escape key |
| `onInteractOutside` | `(event) => void` | -- | Handle any interaction outside |

### DialogTrigger / DialogClose Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto child element instead of rendering a button |

### Default Styles

| Component | Key Classes |
|-----------|-------------|
| `DialogOverlay` | `fixed inset-0 z-50 bg-black/80` with fade animations |
| `DialogContent` | `fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg` with slide/zoom animations |
| `DialogHeader` | `flex flex-col space-y-1.5 text-center sm:text-left` |
| `DialogFooter` | `flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2` |
| `DialogTitle` | `font-semibold text-lg leading-none tracking-tight` |
| `DialogDescription` | `text-muted-foreground text-sm` |

### Built-in Close Button

`DialogContent` includes an automatic close button (X icon) positioned at `absolute top-4 right-4` with opacity transitions and focus ring.

### Animations

| State | Animations |
|-------|------------|
| Open | `fade-in-0`, `zoom-in-95`, `slide-in-from-left-1/2`, `slide-in-from-top-[48%]` |
| Closed | `fade-out-0`, `zoom-out-95`, `slide-out-to-left-1/2`, `slide-out-to-top-[48%]` |
| Duration | `200ms` |

## Dependencies

- `@radix-ui/react-dialog`
- `@phosphor-icons/react` (X icon for close button)

## Usage

### Basic Dialog with Form

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
```

### Share Link Dialog (Close Button Pattern)

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Controlled Dialog

```tsx
"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@blips/ui/components/dialog"

export function ControlledDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        <p>This dialog is controlled programmatically.</p>
      </DialogContent>
    </Dialog>
  )
}
```

## All Examples

- `dialog-demo` -- Edit profile form dialog with cancel/save
- `dialog-close-button` -- Share link dialog with explicit close button
- `dropdown-menu-dialog` -- Dialog triggered from DropdownMenu items (modal=false pattern)
- `alert-dialog-demo` -- AlertDialog (separate component, not Dialog)

## All Example Variants

### dialog-demo

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
```

### dialog-close-button

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### dropdown-menu-dialog

```tsx
"use client"

import { useState } from "react"
import { DotsThree } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@blips/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import { Textarea } from "@blips/ui/components/textarea"

export default function DropdownMenuDialog() {
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <DotsThree />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>File Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
              New File...
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
              Share...
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Download</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Provide a name for your new file. Click create when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pb-3">
            <div className="grid gap-3">
              <Label htmlFor="filename">File Name</Label>
              <Input id="filename" name="filename" placeholder="document.txt" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Anyone with the link will be able to view this file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-3">
            <div className="grid gap-3">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="shadcn@vercel.com"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Check out this file"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

## Project Notes

- Uses `@phosphor-icons/react` X icon for the built-in close button.
- `DialogContent` always renders an overlay and a built-in close button -- no need to add them manually.
- For destructive confirmation dialogs, use `AlertDialog` (separate component) instead.
- The `CommandDialog` component in the Command module wraps this Dialog internally.
- Common width classes: `sm:max-w-[425px]` (forms), `sm:max-w-md` (share/info), `sm:max-w-lg` (default).
