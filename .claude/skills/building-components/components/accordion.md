# Accordion

**Categoria:** Compound
**Dependências:** `@radix-ui/react-accordion`, `@phosphor-icons/react`
**"use client":** Não

## Source

```tsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { CaretDown } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <CaretDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

## Exports

| Export | Tipo |
|---|---|
| `Accordion` | Component (AccordionPrimitive.Root) |
| `AccordionItem` | Component (forwardRef) |
| `AccordionTrigger` | Component (forwardRef) |
| `AccordionContent` | Component (forwardRef) |

## Uso

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@blips/ui"

// Único item aberto por vez
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>É acessível?</AccordionTrigger>
    <AccordionContent>Sim. Segue o padrão de design WAI-ARIA.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Tem estilo?</AccordionTrigger>
    <AccordionContent>Sim. Vem com estilos padrão.</AccordionContent>
  </AccordionItem>
</Accordion>

// Múltiplos abertos simultaneamente
<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Seção 1</AccordionTrigger>
    <AccordionContent>Conteúdo 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Seção 2</AccordionTrigger>
    <AccordionContent>Conteúdo 2</AccordionContent>
  </AccordionItem>
</Accordion>

// Controlled
const [value, setValue] = React.useState("item-1")
<Accordion type="single" value={value} onValueChange={setValue}>
  ...
</Accordion>
```

## Props

### Accordion (Root)
| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | — | Modo de seleção |
| `collapsible` | `boolean` | `false` | Permite fechar todos (apenas `type="single"`) |
| `value` | `string \| string[]` | — | Item(s) aberto(s) (controlled) |
| `onValueChange` | `(value) => void` | — | Callback de mudança |
| `defaultValue` | `string \| string[]` | — | Item(s) inicial(is) |
