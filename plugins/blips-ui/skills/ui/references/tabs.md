# Tabs

Import: `@blips/ui/components/tabs`

## Sub-components

- **`Tabs`** - Root container built on `@radix-ui/react-tabs`. Applies `flex flex-col gap-2`.
- **`TabsList`** - Container for tab triggers. Supports `variant` prop. Provides variant context to child triggers.
- **`TabsTrigger`** - Individual tab button. Inherits variant from `TabsList` context or accepts its own `variant` prop.
- **`TabsContent`** - Content panel for each tab. Applies `flex-1 outline-none`.

### Exported Utilities

- **`tabsListVariants`** - CVA variant function for TabsList styling.
- **`tabsTriggerVariants`** - CVA variant function for TabsTrigger styling.

## Props & Variants

### Tabs (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | `undefined` | Default active tab value (uncontrolled) |
| `value` | `string` | `undefined` | Controlled active tab value |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback when active tab changes |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab orientation |
| `className` | `string` | `undefined` | Additional CSS classes |

### TabsList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'underline'` | `'default'` | Visual style variant |
| `className` | `string` | `undefined` | Additional CSS classes |

#### TabsList Variants

| Variant | Description | Styles |
|---------|-------------|--------|
| `default` | Pill-shaped container with muted background | `h-9 rounded-lg bg-muted p-[3px]` |
| `underline` | Transparent background with bottom border | `h-auto gap-0 border-b bg-transparent p-0` |

### TabsTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique value matching a `TabsContent` |
| `variant` | `'default' \| 'underline'` | Inherited from `TabsList` | Override variant from context |
| `disabled` | `boolean` | `false` | Disables the trigger |
| `className` | `string` | `undefined` | Additional CSS classes |

#### TabsTrigger Variants

| Variant | Active State | Inactive State |
|---------|-------------|----------------|
| `default` | `bg-background shadow-sm` (light), `bg-input/30 border-input` (dark) | `text-muted-foreground` (dark), `text-foreground` (light) |
| `underline` | `border-primary text-foreground` (bottom border) | `text-muted-foreground border-transparent` |

### TabsContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Must match a `TabsTrigger` value |
| `className` | `string` | `undefined` | Additional CSS classes |

## Usage

### Basic Tabs (Default Variant)

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs"

export default function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

### Underline Variant

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs"

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="underline">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content here.</TabsContent>
      <TabsContent value="analytics">Analytics content here.</TabsContent>
      <TabsContent value="reports">Reports content here.</TabsContent>
    </Tabs>
  )
}
```

## All Example Variants

### tabs-demo

Tabs with Card content panels, default pill variant.

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs"

export default function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```
