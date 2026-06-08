# Input

**Categoria:** Primitive | **Deps:** Nenhuma externa | **"use client":** Não

## Source Code

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
```

## Exports

`Input`

## Usage

### Text Input

```tsx
import { Input } from "@blips/ui"

<Input placeholder="Enter text..." />
```

### Email Input

```tsx
<Input type="email" placeholder="name@example.com" />
```

### Password Input

```tsx
<Input type="password" placeholder="Enter password..." />
```

### File Input

```tsx
<Input type="file" />
```

### Number Input

```tsx
<Input type="number" placeholder="0" />
```

### Date Input

```tsx
<Input type="date" />
```

### Search Input

```tsx
<Input type="search" placeholder="Search..." />
```

### Disabled Input

```tsx
<Input disabled placeholder="Disabled input" />
```

### Input with Default Value

```tsx
<Input defaultValue="Default value" />
```

### Controlled Input

```tsx
const [value, setValue] = React.useState("")

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type something..."
/>
```

### Input with Icon

```tsx
import { Search } from "lucide-react"

<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-9" placeholder="Search..." />
</div>
```

### Input in a Form

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl } from "@blips/ui"

<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="Enter your email..." {...field} />
      </FormControl>
    </FormItem>
  )}
/>
```

## Props & Variants

### Input

The `Input` component accepts all standard HTML input element props:

- `type`: string - Input type (default: 'text')
  - Common values: 'text', 'email', 'password', 'number', 'date', 'file', 'search', 'tel', 'url'
- `placeholder`: string - Placeholder text
- `value`: string - Input value (controlled)
- `defaultValue`: string - Default value (uncontrolled)
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void - Change handler
- `onFocus`: (event: FocusEvent<HTMLInputElement>) => void - Focus handler
- `onBlur`: (event: FocusEvent<HTMLInputElement>) => void - Blur handler
- `disabled`: boolean - Disable input
- `readOnly`: boolean - Make input read-only
- `required`: boolean - Mark as required
- `min`: string | number - Minimum value (for number/date inputs)
- `max`: string | number - Maximum value (for number/date inputs)
- `step`: string | number - Step increment (for number/range inputs)
- `pattern`: string - Validation pattern (for text-like inputs)
- `maxLength`: number - Maximum character length
- `minLength`: number - Minimum character length
- `autoComplete`: string - Autocomplete behavior
- `autoFocus`: boolean - Auto focus on mount
- `className`: string - Custom CSS classes
- `ref`: React.Ref<HTMLInputElement> - Forward ref

## Styling

The Input component applies these default classes:

- **Layout**: `flex h-10 w-full` - Full width with fixed height
- **Borders**: `rounded-md border border-input` - Rounded corners and input border color
- **Background**: `bg-background` - Uses CSS variable for background
- **Padding**: `px-3 py-2` - Horizontal and vertical padding
- **Text**: `text-base md:text-sm` - Responsive font sizes
- **Focus**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` - Outline ring on focus
- **Disabled**: `disabled:cursor-not-allowed disabled:opacity-50` - Visual feedback when disabled
- **Placeholder**: `placeholder:text-muted-foreground` - Muted placeholder color
- **File Input**: `file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground` - Styled file button

## Accessibility

- Semantic HTML input element
- Focus ring for keyboard navigation
- Disabled state properly marked
- Works with form labels and form field context
- Supports all ARIA attributes via pass-through
