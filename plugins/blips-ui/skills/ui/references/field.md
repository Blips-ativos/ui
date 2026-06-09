# Field

Import: `@blips/ui/components/field`

A layout primitive for building accessible form fields without coupling to any specific form library. Works with native HTML forms, React Hook Form, TanStack Form, or Next.js form actions.

## Sub-components

| Component | Description |
|---|---|
| `Field` | Field wrapper with orientation support. Renders as `div[role="group"]`. |
| `FieldLabel` | Label element built on `<Label>`. Supports nested field patterns. |
| `FieldTitle` | Lightweight title element (not a `<label>`) for display-only headings. |
| `FieldDescription` | Helper text below or beside a field — `text-muted-foreground text-xs/relaxed`. |
| `FieldError` | Error display with `role="alert"`. Accepts `errors` array or `children`. |
| `FieldGroup` | Vertical group of fields with consistent `gap-4`. Container-query enabled (`@container`). |
| `FieldSet` | Semantic `<fieldset>` wrapper for grouping related fields. |
| `FieldLegend` | Semantic `<legend>` for a FieldSet. Supports `variant` prop. |
| `FieldSeparator` | Horizontal separator between field groups with optional text content. |
| `FieldContent` | Flex content wrapper for horizontal field layouts. |

## Props & Variants

### Field

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` | Layout direction of label + input. |
| `data-invalid` | `boolean` | - | Set to `true` to apply destructive text color to the entire field. |
| `data-disabled` | `boolean` | - | Set to `true` to reduce opacity on label/description. |

**Orientation styles (CVA):**

| Orientation | Behavior |
|---|---|
| `vertical` | Label above input, full width children. |
| `horizontal` | Label beside input, items centered. Label auto-width. |
| `responsive` | Vertical on small screens, horizontal at `@md` container breakpoint. |

### FieldLegend

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"legend" \| "label"` | `"legend"` | `legend` = `text-sm`, `label` = `text-xs/relaxed`. |

### FieldError

| Prop | Type | Default | Description |
|---|---|---|---|
| `errors` | `Array<{ message?: string } \| undefined>` | - | Array of error objects (e.g., from react-hook-form). Auto-deduplicates. |
| `children` | `React.ReactNode` | - | Direct error content (takes precedence if provided). |

When a single error is provided, it renders as plain text. Multiple errors render as a bulleted `<ul>` list.

### FieldSeparator

Accepts optional `children` for text content displayed over the separator line.

## Usage

### Complete Form Layout

```tsx
import { Button } from "@blips/ui/components/button"
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet,
} from "@blips/ui/components/field"
import { Input } from "@blips/ui/components/input"
import { Textarea } from "@blips/ui/components/textarea"

function CheckoutForm() {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Payment Method</FieldLegend>
          <FieldDescription>
            All transactions are secure and encrypted
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
              <Input id="card-name" placeholder="Evil Rabbit" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
              <Input id="card-number" placeholder="1234 5678 9012 3456" required />
              <FieldDescription>Enter your 16-digit card number</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Billing Address</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="same-as-shipping" defaultChecked />
              <FieldLabel htmlFor="same-as-shipping" className="font-normal">
                Same as shipping address
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">Cancel</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
```

### With React Hook Form (Controller)

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@blips/ui/components/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@blips/ui/components/field"
import { Input } from "@blips/ui/components/input"

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
})

function FormWithField() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: "" },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Enter title"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  )
}
```

### Horizontal Field (Checkbox Pattern)

```tsx
<Field orientation="horizontal">
  <Checkbox id="terms" />
  <FieldLabel htmlFor="terms" className="font-normal">
    Accept terms and conditions
  </FieldLabel>
</Field>
```

## All Examples

- `field-demo` — Complete payment form with fieldsets, legends, separators, grid layout
- `field-input` — Field with input, label, and description
- `field-textarea` — Field with textarea
- `field-fieldset` — Fieldset with legend and address fields
- `field-radio` — Field with radio group (subscription plans)
- `field-checkbox` — Field with checkbox group and content wrapper
- `field-switch` — Field with switch and horizontal layout
- `field-slider` — Field with slider and dynamic description
- `field-select` — Field with select dropdown
- `field-choice-card` — Field with radio choice cards
- `field-group` — Field groups with separators and checkbox groups
- `field-responsive` — Responsive orientation fields (vertical on mobile, horizontal on desktop)
- `form-rhf-demo` — React Hook Form integration using Field + FieldError
- `form-next-demo` — Next.js form actions integration using Field + FieldError
- `form-tanstack-demo` — TanStack Form integration using Field + FieldError

## All Example Variants

### field-demo

```tsx
import { Button } from "@blips/ui/components/button"
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@blips/ui/components/field"
import { Input } from "@blips/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"
import { Textarea } from "@blips/ui/components/textarea"

export default function FieldDemo() {
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Name on Card
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Card Number
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Month
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="03">03</SelectItem>
                      <SelectItem value="04">04</SelectItem>
                      <SelectItem value="05">05</SelectItem>
                      <SelectItem value="06">06</SelectItem>
                      <SelectItem value="07">07</SelectItem>
                      <SelectItem value="08">08</SelectItem>
                      <SelectItem value="09">09</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Year
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-normal"
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Comments
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
```

### field-input

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@blips/ui/components/field"
import { Input } from "@blips/ui/components/input"

export default function FieldInput() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" type="text" placeholder="Max Leiter" />
            <FieldDescription>
              Choose a unique username for your account.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
```

### field-textarea

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@blips/ui/components/field"
import { Textarea } from "@blips/ui/components/textarea"

export default function FieldTextarea() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
            <Textarea
              id="feedback"
              placeholder="Your feedback helps us improve..."
              rows={4}
            />
            <FieldDescription>
              Share your thoughts about our service.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
```

### field-fieldset

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@blips/ui/components/field"
import { Input } from "@blips/ui/components/input"

export default function FieldFieldset() {
  return (
    <div className="w-full max-w-md space-y-6">
      <FieldSet>
        <FieldLegend>Address Information</FieldLegend>
        <FieldDescription>
          We need your address to deliver your order.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Street Address</FieldLabel>
            <Input id="street" type="text" placeholder="123 Main St" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" type="text" placeholder="New York" />
            </Field>
            <Field>
              <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
              <Input id="zip" type="text" placeholder="90502" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
```

### field-radio

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@blips/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@blips/ui/components/radio-group"

export default function FieldRadio() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldLabel>Subscription Plan</FieldLabel>
        <FieldDescription>
          Yearly and lifetime plans offer significant savings.
        </FieldDescription>
        <RadioGroup defaultValue="monthly">
          <Field orientation="horizontal">
            <RadioGroupItem value="monthly" id="plan-monthly" />
            <FieldLabel htmlFor="plan-monthly" className="font-normal">
              Monthly ($9.99/month)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="yearly" id="plan-yearly" />
            <FieldLabel htmlFor="plan-yearly" className="font-normal">
              Yearly ($99.99/year)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="lifetime" id="plan-lifetime" />
            <FieldLabel htmlFor="plan-lifetime" className="font-normal">
              Lifetime ($299.99)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  )
}
```

### field-checkbox

```tsx
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@blips/ui/components/field"

export default function FieldCheckbox() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">
            Show these items on the desktop
          </FieldLegend>
          <FieldDescription>
            Select the items you want to show on the desktop.
          </FieldDescription>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                className="font-normal"
                defaultChecked
              >
                Hard disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-external-disks-1yg" />
              <FieldLabel
                htmlFor="finder-pref-9k2-external-disks-1yg"
                className="font-normal"
              >
                External disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
              <FieldLabel
                htmlFor="finder-pref-9k2-cds-dvds-fzt"
                className="font-normal"
              >
                CDs, DVDs, and iPods
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
              <FieldLabel
                htmlFor="finder-pref-9k2-connected-servers-6l2"
                className="font-normal"
              >
                Connected servers
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-sync-folders-nep" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">
              Sync Desktop & Documents folders
            </FieldLabel>
            <FieldDescription>
              Your Desktop & Documents folders are being synced with iCloud
              Drive. You can access them from other devices.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  )
}
```

### field-switch

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field"
import { Switch } from "@blips/ui/components/switch"

export default function FieldSwitch() {
  return (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
          <FieldDescription>
            Enable multi-factor authentication. If you do not have a two-factor
            device, you can use a one-time code sent to your email.
          </FieldDescription>
        </FieldContent>
        <Switch id="2fa" />
      </Field>
    </div>
  )
}
```

### field-slider

```tsx
"use client"

import { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldTitle,
} from "@blips/ui/components/field"
import { Slider } from "@blips/ui/components/slider"

export default function FieldSlider() {
  const [value, setValue] = useState([200, 800])
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldTitle>Price Range</FieldTitle>
        <FieldDescription>
          Set your budget range ($
          <span className="font-medium tabular-nums">{value[0]}</span> -{" "}
          <span className="font-medium tabular-nums">{value[1]}</span>).
        </FieldDescription>
        <Slider
          value={value}
          onValueChange={setValue}
          max={1000}
          min={0}
          step={10}
          className="mt-2 w-full"
          aria-label="Price Range"
        />
      </Field>
    </div>
  )
}
```

### field-select

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"

export default function FieldSelect() {
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>Department</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="support">Customer Support</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>
          Select your department or area of work.
        </FieldDescription>
      </Field>
    </div>
  )
}
```

### field-choice-card

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@blips/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@blips/ui/components/radio-group"

export default function FieldChoiceCard() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel htmlFor="compute-environment-p8w">
            Compute Environment
          </FieldLabel>
          <FieldDescription>
            Select the compute environment for your cluster.
          </FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    Run GPU workloads on a K8s configured cluster.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Virtual Machine</FieldTitle>
                  <FieldDescription>
                    Access a VM configured cluster to run GPU workloads.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="vm" id="vm-z4k" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
```

### field-group

```tsx
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@blips/ui/components/field"

export default function FieldGroupExample() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel>Responses</FieldLabel>
          <FieldDescription>
            Get notified when ChatGPT responds to requests that take time, like
            research or image generation.
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="push" defaultChecked disabled />
              <FieldLabel htmlFor="push" className="font-normal">
                Push notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLabel>Tasks</FieldLabel>
          <FieldDescription>
            Get notified when tasks you&apos;ve created have updates.{" "}
            <a href="#">Manage tasks</a>
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="push-tasks" />
              <FieldLabel htmlFor="push-tasks" className="font-normal">
                Push notifications
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="email-tasks" />
              <FieldLabel htmlFor="email-tasks" className="font-normal">
                Email notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
```

### field-responsive

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@blips/ui/components/field"
import { Input } from "@blips/ui/components/input"
import { Textarea } from "@blips/ui/components/textarea"

export default function FieldResponsive() {
  return (
    <div className="w-full max-w-4xl">
      <form>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldSeparator />
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>
                  Provide your full name for identification
                </FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="lastName">Message</FieldLabel>
                <FieldDescription>
                  You can write your message here. Keep it short, preferably
                  under 100 characters.
                </FieldDescription>
              </FieldContent>
              <Textarea
                id="message"
                placeholder="Hello, world!"
                required
                className="min-h-[100px] resize-none sm:min-w-[300px]"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
```
