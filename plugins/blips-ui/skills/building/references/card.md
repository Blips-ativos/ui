# Card

Import: `@blips/ui/components/card`

## Sub-components

| Export | Description |
|--------|-------------|
| `Card` | Root container. Renders a `<div>` with `data-role="card"`, rounded border, background, and shadow. |
| `CardHeader` | Header section with `data-role="card-header"`. Flex column layout with vertical spacing and padding. |
| `CardTitle` | Title element with `data-role="card-title"`. Semibold, xl text, tight tracking. |
| `CardDescription` | Description text with `data-role="card-description"`. Muted foreground, sm text. |
| `CardContent` | Main content area with `data-role="card-content"`. Padding with no top padding (assumes header above). |
| `CardFooter` | Footer section with `data-role="card-footer"`. Flex row with center alignment and padding. |

> **Note**: The upstream shadcn v4 also exports `CardAction` (for header actions). This project's local version does NOT export `CardAction` -- use a flex layout inside `CardHeader` instead.

## Props & Variants

All sub-components accept standard `React.HTMLAttributes<HTMLDivElement>` plus `className` for customization. They are all `forwardRef` components accepting a `ref`.

### Default Styles

| Component | Default Classes |
|-----------|----------------|
| `Card` | `rounded-xl border bg-card text-card-foreground shadow-sm` |
| `CardHeader` | `flex flex-col space-y-1.5 p-6` |
| `CardTitle` | `font-semibold text-xl leading-none tracking-tight` |
| `CardDescription` | `text-muted-foreground text-sm` |
| `CardContent` | `p-6 pt-0` |
| `CardFooter` | `flex items-center p-6 pt-0` |

## Usage

### Login Card

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### Simple Info Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card"

export function InfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  )
}
```

## All Examples

- `card-demo` -- Login card with form inputs and footer buttons
- `hover-card-demo` -- HoverCard component (separate component, not Card)

## Project Notes

- This project's Card uses `forwardRef` pattern (older style). Upstream shadcn v4 uses function components with `data-slot`.
- The local Card uses `data-role` attributes instead of `data-slot` for semantic identification.
