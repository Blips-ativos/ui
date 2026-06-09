# Resizable

Import: `@blips/ui/components/resizable`

## Sub-components

| Component | Description |
|---|---|
| `ResizablePanelGroup` | Root container that wraps `react-resizable-panels` `PanelGroup`. Manages layout direction and flex behavior. |
| `ResizablePanel` | Direct re-export of `react-resizable-panels` `Panel`. Represents a resizable panel within the group. |
| `ResizableHandle` | Drag handle between panels. Wraps `react-resizable-panels` `PanelResizeHandle` with optional visible grip icon. |

## Props & Variants

### ResizablePanelGroup

Extends `React.ComponentProps<typeof PanelGroup>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | **(required)** | Direction of the panel layout. |
| `autoSaveId` | `string` | -- | Persist panel sizes to localStorage under this key. |
| `onLayout` | `(sizes: number[]) => void` | -- | Callback when layout changes. |
| `className` | `string` | -- | Additional CSS classes. Base: `flex h-full w-full data-[panel-group-direction=vertical]:flex-col`. |

### ResizablePanel

Extends `React.ComponentProps<typeof Panel>` from `react-resizable-panels`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultSize` | `string \| number` | -- | Initial size (e.g., `"50%"` or `50`). |
| `minSize` | `number` | -- | Minimum size as percentage. |
| `maxSize` | `number` | -- | Maximum size as percentage. |
| `collapsible` | `boolean` | `false` | Whether the panel can be collapsed. |
| `collapsedSize` | `number` | -- | Size when collapsed (percentage). |
| `onCollapse` | `() => void` | -- | Callback when panel collapses. |
| `onExpand` | `() => void` | -- | Callback when panel expands. |
| `onResize` | `(size: number) => void` | -- | Callback when panel resizes. |
| `order` | `number` | -- | Order of the panel in the group. |

### ResizableHandle

Extends `React.ComponentProps<typeof PanelResizeHandle>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `withHandle` | `boolean` | `false` | Show a visible grip icon (uses Phosphor `DotsSixVertical` icon). |
| `disabled` | `boolean` | `false` | Disable resizing. |
| `className` | `string` | -- | Additional CSS classes. |

**Base styles:** 1px border line with focus-visible ring. Automatically rotates for vertical orientation via `data-[panel-group-direction=vertical]` selectors.

## Usage

### Horizontal Layout

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize="50%">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="25%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="75%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### With Visible Handle

```tsx
<ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-lg border">
  <ResizablePanel defaultSize="50%">
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="50%">
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```

### Vertical Layout

```tsx
<ResizablePanelGroup
  orientation="vertical"
  className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
>
  <ResizablePanel defaultSize="25%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Header</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize="75%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```

## All Examples

- `resizable-demo` -- Horizontal layout with nested vertical panels
- `resizable-demo-with-handle` -- Same layout with visible grip handles
- `resizable-vertical` -- Simple vertical two-panel layout
- `resizable-handle` -- Horizontal sidebar/content layout with visible grip handle

## All Example Variants

### resizable-demo

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize="50%">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="25%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="75%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### resizable-demo-with-handle

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize="50%">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="25%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### resizable-vertical

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### resizable-handle

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable"

export default function ResizableHandleDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## Project Notes

- Uses `@phosphor-icons/react` `DotsSixVertical` icon (aliased as `GripVertical`) for the handle grip.
- Depends on `react-resizable-panels@^4`.
- Panels support nested `ResizablePanelGroup` for complex layouts.
