# Accordion

Import: `@blips/ui/components/accordion`

## Sub-components

| Component | Description |
|---|---|
| `Accordion` | Root component. Wraps `@radix-ui/react-accordion` Root. Controls single/multiple expansion. |
| `AccordionItem` | Individual collapsible section. Requires a unique `value` prop. Renders with `border-b`. |
| `AccordionTrigger` | Clickable header that toggles the item. Renders a chevron icon (Phosphor `CaretDown`) that rotates on open. |
| `AccordionContent` | Collapsible content area with enter/exit animations (`accordion-up`/`accordion-down`). |

## Props & Variants

### Accordion (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | **required** | Whether one or multiple items can be open at once. |
| `collapsible` | `boolean` | `false` | When `type="single"`, allows closing the open item by clicking its trigger again. |
| `defaultValue` | `string \| string[]` | - | The value(s) of the item(s) open by default (uncontrolled). |
| `value` | `string \| string[]` | - | The controlled value(s) of the open item(s). |
| `onValueChange` | `(value: string \| string[]) => void` | - | Callback when the open item(s) change. |
| `className` | `string` | - | Additional CSS classes. |

### AccordionItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Unique identifier for this item. |
| `disabled` | `boolean` | `false` | Prevents the item from being opened/closed. |
| `className` | `string` | - | Additional CSS classes. Base: `border-b`. |

### AccordionTrigger

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | - | Additional CSS classes. Base: `flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline`. |
| `children` | `ReactNode` | - | Trigger label content. |

### AccordionContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | - | Applied to inner `div` wrapper. Base: `pt-0 pb-4`. |
| `children` | `ReactNode` | - | Collapsible content. |

## Usage

### Basic single collapsible accordion

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion"

export function AccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you&apos;re not completely satisfied, simply return the
            item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

### Multiple items open

```tsx
<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section One</AccordionTrigger>
    <AccordionContent>Content one</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section Two</AccordionTrigger>
    <AccordionContent>Content two</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Project Notes

- Uses Phosphor Icons (`CaretDown`) instead of Lucide for the chevron icon.
- Animations use custom Tailwind keyframes: `animate-accordion-up` and `animate-accordion-down`.

## All Examples

- `accordion-demo`
