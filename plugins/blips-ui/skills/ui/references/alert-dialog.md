# Alert Dialog

Import: `@blips/ui/components/alert-dialog`

## Sub-components

| Component | Description |
|---|---|
| `AlertDialog` | Root component. Wraps `@radix-ui/react-alert-dialog` Root. Manages open/close state. |
| `AlertDialogTrigger` | Button that opens the dialog. Wraps Radix `Trigger`. Use `asChild` to render a custom trigger element. |
| `AlertDialogPortal` | Portals the dialog content to `document.body`. |
| `AlertDialogOverlay` | Semi-transparent backdrop (`bg-black/80`). Includes fade-in/fade-out animations. |
| `AlertDialogContent` | The dialog panel itself. Centered, max-width `lg`, with slide/zoom animations. Automatically renders overlay. |
| `AlertDialogHeader` | Flex container for title and description. Centered on mobile, left-aligned on `sm:`. |
| `AlertDialogFooter` | Flex container for action buttons. Column on mobile, row on `sm:` with `justify-end`. |
| `AlertDialogTitle` | Dialog heading. Styled `font-semibold text-lg`. |
| `AlertDialogDescription` | Dialog body text. Styled `text-muted-foreground text-sm`. |
| `AlertDialogAction` | Confirm/primary action button. Accepts `variant` prop from `buttonVariants`. |
| `AlertDialogCancel` | Cancel/dismiss button. Renders with `variant="outline"` styling. |

## Props & Variants

### AlertDialog (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | - | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes. |
| `defaultOpen` | `boolean` | `false` | Default open state (uncontrolled). |

### AlertDialogTrigger

| Prop | Type | Default | Description |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Merge props onto child element instead of rendering a button. |

### AlertDialogContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | - | Additional CSS classes. Base: centered fixed positioning, `max-w-lg`, `p-6`, `gap-4`, `border`, `bg-background`, `shadow-lg`, `sm:rounded-lg`. |

### AlertDialogAction

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | Button variant type | `"default"` | Accepts any `buttonVariants` variant: `"default"`, `"destructive"`, `"outline"`, `"secondary"`, `"ghost"`, `"link"`. |
| `className` | `string` | - | Additional CSS classes. |

### AlertDialogCancel

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | - | Additional CSS classes. Base: `buttonVariants({ variant: 'outline' })` + `mt-2 sm:mt-0`. |

## Usage

### Basic confirmation dialog

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@blips/ui/components/alert-dialog"
import { Button } from "@blips/ui/components/button"

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

### Destructive action dialog

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete account?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your account and all associated data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Controlled dialog

```tsx
const [open, setOpen] = useState(false)

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm action</AlertDialogTitle>
      <AlertDialogDescription>Are you sure?</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>No</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirm}>Yes</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Project Notes

- `AlertDialogAction` accepts `variant` prop from `buttonVariants` (imported from `@blips/ui/components/button`), allowing destructive-styled confirm buttons.
- The overlay uses `bg-black/80` for the backdrop.
- Animations: fade-in/out, zoom-in/out (95%), and slide from center.

## All Examples

- `alert-dialog-demo`
