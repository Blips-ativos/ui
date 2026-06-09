# Separator

Import: `@blips/ui/components/separator`

## Sub-components

| Component | Description |
|---|---|
| `Separator` | Visual divider wrapping `@radix-ui/react-separator` Root. Renders as a thin line, horizontal or vertical. |

## Props & Variants

### Separator

Extends `React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the separator line. |
| `decorative` | `boolean` | `true` | When `true`, renders as `role="none"` (not a semantic separator). When `false`, renders as `role="separator"`. |
| `className` | `string` | -- | Additional CSS classes. |

**Styles by orientation:**
- **Horizontal:** `shrink-0 bg-border h-[1px] w-full`
- **Vertical:** `shrink-0 bg-border h-full w-[1px]`

## Usage

### Horizontal Separator

```tsx
import { Separator } from "@blips/ui/components/separator"

export default function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
```

### Vertical Separator (e.g., in a header)

```tsx
<header className="flex h-16 items-center gap-2">
  <SidebarTrigger className="-ml-1" />
  <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
  <Breadcrumb>...</Breadcrumb>
</header>
```

### In a List

```tsx
{items.map((item, index) => (
  <React.Fragment key={item.id}>
    <div className="text-sm">{item.name}</div>
    {index < items.length - 1 && <Separator className="my-2" />}
  </React.Fragment>
))}
```

## All Examples

- `separator-demo` -- Horizontal and vertical separators with text content

## Project Notes

- Commonly used in sidebar headers alongside `SidebarTrigger` with `orientation="vertical"`.
- Use `data-[orientation=vertical]:h-4` to constrain vertical separator height in flex layouts.
- The separator uses `bg-border` color token from the project theme.
