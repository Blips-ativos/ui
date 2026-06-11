# Alert

Import: `@blips/ui/components/alert`

## Sub-components

| Component | Description |
|---|---|
| `Alert` | Root container with variant-based styling. Renders a `div` with `role="alert"`. Supports icon positioning via CSS selectors. |
| `AlertTitle` | Heading (`h5`) for the alert. Styled with `font-medium leading-none tracking-tight`. |
| `AlertDescription` | Body text container (`div`). Styled with `text-sm`. |

## Props & Variants

### Alert

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "destructive" \| "info"` | `"default"` | Visual style variant. |
| `className` | `string` | - | Additional CSS classes. |

#### Variant Styles

| Variant | Classes |
|---|---|
| `default` | `bg-background text-foreground` |
| `destructive` | `border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive` |
| `info` | `border-info [&>svg]:text-info` |

**Base classes:** `relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg~*]:pl-7`

Icons placed as direct children of `Alert` are automatically positioned absolutely at `top-4 left-4`, and subsequent siblings get `pl-7` padding.

### AlertTitle

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | - | Additional CSS classes. Base: `mb-1 font-medium leading-none tracking-tight`. |

### AlertDescription

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | - | Additional CSS classes. Base: `text-sm [&_p]:leading-relaxed`. |

## Usage

### Default alert with icon

```tsx
import { CheckCircle } from "@phosphor-icons/react"
import { Alert, AlertDescription, AlertTitle } from "@blips/ui/components/alert"

export function AlertSuccess() {
  return (
    <Alert>
      <CheckCircle />
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  )
}
```

### Destructive alert

```tsx
import { WarningCircle } from "@phosphor-icons/react"
import { Alert, AlertDescription, AlertTitle } from "@blips/ui/components/alert"

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <WarningCircle />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        <p>Please verify your billing information and try again.</p>
        <ul className="list-inside list-disc text-sm">
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}
```

### Title-only alert (no description)

```tsx
import { Popcorn } from "@phosphor-icons/react"
import { Alert, AlertTitle } from "@blips/ui/components/alert"

export function AlertTitleOnly() {
  return (
    <Alert>
      <Popcorn />
      <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
    </Alert>
  )
}
```

## Project Notes

- The project version includes an `info` variant (`border-info [&>svg]:text-info`) not present in upstream shadcn.
- Default variant for Badge in this project is `"outline"`, but for Alert it is `"default"`.
- Uses CVA (`class-variance-authority`) for variant management.

## All Examples

- `alert-demo`
