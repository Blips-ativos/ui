# Native Select

Import: `@blips/ui/components/native-select`

## Sub-components

| Component | Element | Description |
|-----------|---------|-------------|
| `NativeSelect` | `<div>` + `<select>` | Styled native HTML select with a custom chevron icon overlay. Wraps a `<select>` inside a positioned `<div>`. |
| `NativeSelectOption` | `<option>` | Standard HTML option element with `data-slot` attribute. |
| `NativeSelectOptGroup` | `<optgroup>` | Standard HTML optgroup for grouping options. |

## Props & Variants

### NativeSelect

Extends `Omit<React.ComponentProps<'select'>, 'size'>` with custom size prop.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default"` | `"default"` | Controls height and text size |
| `disabled` | `boolean` | - | Disables the select (native HTML prop) |
| `aria-invalid` | `"true" \| "false"` | - | Marks as invalid with destructive border/ring styling |
| `className` | `string` | - | Applied to the wrapper `<div>`, not the `<select>` |

**Size styles:**

| Size | Height | Text Size |
|------|--------|-----------|
| `default` | `h-7` | `text-xs/relaxed` |
| `sm` | `h-6` | `text-[0.625rem]` |

**Default styles:**
- Wrapper: `relative w-fit has-[select:disabled]:opacity-50`
- Select: `appearance-none rounded-md border border-input bg-input/20 py-0.5 pr-6 pl-2`
- Focus: `focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30`
- Invalid: `aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20`
- Dark: `dark:bg-input/30 dark:hover:bg-input/50`
- Chevron icon positioned absolutely at right

### NativeSelectOption

Standard `React.ComponentProps<'option'>` -- no custom props.

### NativeSelectOptGroup

Standard `React.ComponentProps<'optgroup'>` with `className` support.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Group heading text (native HTML prop) |

## Usage

### Basic Select

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

<NativeSelect>
  <NativeSelectOption value="">Select status</NativeSelectOption>
  <NativeSelectOption value="todo">Todo</NativeSelectOption>
  <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
  <NativeSelectOption value="done">Done</NativeSelectOption>
  <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
</NativeSelect>
```

### With Option Groups

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

<NativeSelect>
  <NativeSelectOption value="">Select department</NativeSelectOption>
  <NativeSelectOptGroup label="Engineering">
    <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
    <NativeSelectOption value="backend">Backend</NativeSelectOption>
    <NativeSelectOption value="devops">DevOps</NativeSelectOption>
  </NativeSelectOptGroup>
  <NativeSelectOptGroup label="Sales">
    <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
    <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
    <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
  </NativeSelectOptGroup>
  <NativeSelectOptGroup label="Operations">
    <NativeSelectOption value="support">Customer Support</NativeSelectOption>
    <NativeSelectOption value="product-manager">Product Manager</NativeSelectOption>
    <NativeSelectOption value="ops-manager">Operations Manager</NativeSelectOption>
  </NativeSelectOptGroup>
</NativeSelect>
```

### Invalid State

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

<NativeSelect aria-invalid="true">
  <NativeSelectOption value="">Select role</NativeSelectOption>
  <NativeSelectOption value="admin">Admin</NativeSelectOption>
  <NativeSelectOption value="editor">Editor</NativeSelectOption>
  <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
</NativeSelect>
```

### Disabled State

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

<NativeSelect disabled>
  <NativeSelectOption value="">Select priority</NativeSelectOption>
  <NativeSelectOption value="low">Low</NativeSelectOption>
  <NativeSelectOption value="medium">Medium</NativeSelectOption>
  <NativeSelectOption value="high">High</NativeSelectOption>
  <NativeSelectOption value="critical">Critical</NativeSelectOption>
</NativeSelect>
```

## Project Notes

- Uses `@phosphor-icons/react` (`CaretDown`) for the chevron icon.
- This is a `'use client'` component.
- For rich select with search/filtering, use the `Select` or `Combobox` components instead.

## All Example Variants

### native-select-demo

Basic select with status options.

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

export default function NativeSelectDemo() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select status</NativeSelectOption>
      <NativeSelectOption value="todo">Todo</NativeSelectOption>
      <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
      <NativeSelectOption value="done">Done</NativeSelectOption>
      <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
    </NativeSelect>
  )
}
```

### native-select-groups

Select with optgroup grouping.

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

export default function NativeSelectGroups() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select department</NativeSelectOption>
      <NativeSelectOptGroup label="Engineering">
        <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        <NativeSelectOption value="backend">Backend</NativeSelectOption>
        <NativeSelectOption value="devops">DevOps</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Sales">
        <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
        <NativeSelectOption value="account-manager">
          Account Manager
        </NativeSelectOption>
        <NativeSelectOption value="sales-director">
          Sales Director
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Operations">
        <NativeSelectOption value="support">
          Customer Support
        </NativeSelectOption>
        <NativeSelectOption value="product-manager">
          Product Manager
        </NativeSelectOption>
        <NativeSelectOption value="ops-manager">
          Operations Manager
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
```

### native-select-disabled

Disabled state.

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

export default function NativeSelectDisabled() {
  return (
    <NativeSelect disabled>
      <NativeSelectOption value="">Select priority</NativeSelectOption>
      <NativeSelectOption value="low">Low</NativeSelectOption>
      <NativeSelectOption value="medium">Medium</NativeSelectOption>
      <NativeSelectOption value="high">High</NativeSelectOption>
      <NativeSelectOption value="critical">Critical</NativeSelectOption>
    </NativeSelect>
  )
}
```

### native-select-invalid

Invalid/error state.

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select"

export default function NativeSelectInvalid() {
  return (
    <NativeSelect aria-invalid="true">
      <NativeSelectOption value="">Select role</NativeSelectOption>
      <NativeSelectOption value="admin">Admin</NativeSelectOption>
      <NativeSelectOption value="editor">Editor</NativeSelectOption>
      <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
      <NativeSelectOption value="guest">Guest</NativeSelectOption>
    </NativeSelect>
  )
}
```
