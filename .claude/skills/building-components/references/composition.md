# Composition — Componentes de Composição

Componentes que orquestram múltiplos componentes `@blips/ui` existentes para criar padrões de UI mais complexos.

---

## Padrão Base

```tsx
import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ExistingComponent } from "@/components/existing-component"

const compositionVariants = cva("base-classes", {
  variants: { ... },
  defaultVariants: { ... },
})

function CompositionComponent({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof compositionVariants>) {
  return (
    <div
      data-slot="composition-name"
      className={cn(compositionVariants({ variant }), className)}
      {...props}
    />
  )
}

export { CompositionComponent, compositionVariants }
```

**Regras específicas:**
- Usar `data-slot` para identificação CSS
- Pode usar `forwardRef` ou plain function (ambos são aceitos)
- Imports de componentes internos via `@/components/*`
- Variantes com `cva` quando há múltiplas variações

---

## Referência por Componente

### InputGroup

O componente de composição mais sofisticado. Compõe `Input`, `Textarea` e `Button` em um grupo visual.

```tsx
import {
  InputGroup, InputGroupAddon, InputGroupButton,
  InputGroupInput, InputGroupTextarea, InputGroupText
} from "@blips/ui"
```

**Variantes de alinhamento do Addon:** `inline-start` | `inline-end` | `block-start` | `block-end`
**Variantes de tamanho do Button:** `xs` | `sm` | `icon-xs` | `icon-sm`

```tsx
// Input com ícone à esquerda
<InputGroup>
  <InputGroupAddon align="inline-start">
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>

// Input com botão à direita
<InputGroup>
  <InputGroupInput placeholder="Enter URL..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">Go</InputGroupButton>
  </InputGroupAddon>
</InputGroup>

// Input com texto prefixo
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>

// Input com addon acima (block-start)
<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText>Title</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Enter title..." />
</InputGroup>

// Textarea com addon
<InputGroup>
  <InputGroupAddon align="block-end">
    <InputGroupButton size="xs">Send</InputGroupButton>
  </InputGroupAddon>
  <InputGroupTextarea placeholder="Type your message..." />
</InputGroup>

// Input com Kbd (atalho)
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>
```

**Anatomia:**
- `InputGroup`: `data-slot="input-group"`, `role="group"`
- Layout adaptativo via CSS `:has()` selectors:
  - `has-[>[data-align=inline-start]]` → padding no input
  - `has-[>[data-align=block-start]]` → `flex-col`
- Focus: ring no grupo quando input focado
- Error: red ring quando `aria-invalid=true`
- `InputGroupAddon`: click foca no input automaticamente
- `InputGroupInput`/`InputGroupTextarea`: sem border/bg/ring próprios (delegados ao grupo)
- `InputGroupButton`: tamanhos menores que `Button` normal (xs, icon-xs)

---

### ButtonGroup

Grupo de botões com separadores visuais.

```tsx
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants } from "@blips/ui"
```

**Variantes de orientação:** `horizontal` | `vertical`

```tsx
// Horizontal (default)
<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>

// Vertical
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>

// Com texto entre botões
<ButtonGroup>
  <Button variant="outline">Save</Button>
  <ButtonGroupText>or</ButtonGroupText>
  <Button variant="outline">Discard</Button>
</ButtonGroup>

// Com separador
<ButtonGroup>
  <Button>Primary</Button>
  <ButtonGroupSeparator />
  <Button size="icon"><ChevronDown /></Button>
</ButtonGroup>
```

**Anatomia:**
- `buttonGroupVariants` via `cva`
- Suporta `asChild` via Radix Slot
- CSS hacks para merged borders/radius:
  - `[&>*:not(:first-child):not(:last-child)]:rounded-none` — remove radius dos filhos do meio
  - `[&>*:first-child]:rounded-r-none` — ajusta primeiro filho
  - `[&>*:last-child]:rounded-l-none` — ajusta último filho
- `ButtonGroupSeparator`: usa `Separator` com orientação oposta ao grupo

---

### Drawer

Painel inferior deslizante. Baseado na lib `vaul`.

```tsx
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerClose
} from "@blips/ui"
```

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move Goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      <Slider defaultValue={[50]} max={100} />
    </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

**Anatomia:**
- `Drawer` = `Drawer.Root` do `vaul`, `shouldScaleBackground={true}`
- `DrawerContent`: inclui drag handle (`h-2 w-[100px] rounded-full bg-muted`)
- Overlay: `fixed inset-0 z-50 bg-black/80`
- Content posicionado em `inset-x-0 bottom-0` com `rounded-t-[10px]`

---

### Sonner (Toaster)

Sistema de notificações toast. Integra `sonner` + `next-themes`.

```tsx
import { Toaster } from "@blips/ui"
```

```tsx
// No layout raiz
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

// Disparar toasts (API do sonner)
import { toast } from "sonner"

toast("Event created")
toast.success("Saved successfully")
toast.error("Something went wrong")
toast.warning("Check your input")
toast.info("New update available")
toast.loading("Processing...")
```

**Anatomia:**
- `"use client"` obrigatório
- Integra `useTheme()` do `next-themes` para theme-awareness
- Ícones customizados do `lucide-react`:
  - Success: `CircleCheck`
  - Error: `OctagonX`
  - Warning: `TriangleAlert`
  - Info: `Info`
  - Loading: `LoaderCircle` com `animate-spin`
- `toastOptions.classNames` mapeia tokens semânticos para classes do toast

---

### Calendar

Seletor de datas. Baseado em `react-day-picker`.

```tsx
import { Calendar } from "@blips/ui"
```

```tsx
// Seleção única
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>

// Seleção de range
<Calendar
  mode="range"
  selected={{ from: startDate, to: endDate }}
  onSelect={setDateRange}
/>

// Com date picker (popover)
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>
```

**Anatomia:**
- `"use client"` obrigatório
- Wrapper do `DayPicker` com `classNames` customizadas
- `CalendarDayButton`: componente interno com `useRef`/`useEffect` para focus
- Ícones de navegação: `ChevronLeft`, `ChevronRight`, `ChevronDown`
- Usa `buttonVariants` para estilizar os botões de dia
- Selected: `bg-primary text-primary-foreground`
- Range: `bg-accent` para dias intermediários
