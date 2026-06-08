# Drawer

**Categoria:** Composition | **Deps:** `vaul` | **"use client":** Não

## Exports

`Drawer`, `DrawerPortal`, `DrawerOverlay`, `DrawerTrigger`, `DrawerClose`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`

## Usage

### Basic Drawer

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@blips/ui"
import { Button } from "@blips/ui"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move Goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      <p>Your daily activity goal content here</p>
    </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Drawer with Controlled State

```tsx
const [open, setOpen] = React.useState(false)

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit Goal</DrawerTitle>
    </DrawerHeader>
    <div className="p-4 space-y-4">
      <Input placeholder="Enter your goal..." />
      <Slider defaultValue={[33]} className="w-full" />
    </div>
    <DrawerFooter>
      <Button onClick={() => setOpen(false)}>Save</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Drawer with Custom Behavior

```tsx
<Drawer shouldScaleBackground>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>Drawer description goes here</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">Content area with padding</div>
    <DrawerFooter>
      <Button>Action</Button>
      <DrawerClose>Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Features

- **Drag Handle**: Content includes an automatic drag handle bar for mobile-friendly interaction
- **Scale Background**: `shouldScaleBackground` prop defaults to `true`, providing visual feedback when drawer is open
- **Responsive**: Optimized for mobile and desktop devices
- **Accessible**: Built on accessible primitives with keyboard support

## Props & Variants

### Drawer
- `open`: boolean - Drawer open state
- `onOpenChange`: (open: boolean) => void - Open state change handler
- `shouldScaleBackground`: boolean - Scale background when open (default: true)
- `children`: ReactNode - Drawer content

### DrawerTrigger
- `children`: ReactNode - Trigger element
- `asChild`: boolean - Merge with child component props
- `className`: string - Custom CSS classes

### DrawerContent
- `children`: ReactNode - Drawer content
- `className`: string - Custom CSS classes
- `side`: 'top' | 'right' | 'bottom' | 'left' - Drawer position (typically bottom on mobile)

### DrawerHeader
- `children`: ReactNode - Header content
- `className`: string - Custom CSS classes

### DrawerFooter
- `children`: ReactNode - Footer content
- `className`: string - Custom CSS classes

### DrawerTitle
- `children`: ReactNode - Title text
- `className`: string - Custom CSS classes

### DrawerDescription
- `children`: ReactNode - Description text
- `className`: string - Custom CSS classes

### DrawerClose
- `children`: ReactNode - Close button content
- `asChild`: boolean - Merge with child component props
- `className`: string - Custom CSS classes

### DrawerPortal
- `children`: ReactNode - Portal content
- `className`: string - Custom CSS classes

### DrawerOverlay
- `className`: string - Custom CSS classes for overlay backdrop
