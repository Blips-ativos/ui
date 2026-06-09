# Compound — Componentes Multi-Parte

Componentes compostos por múltiplas sub-partes. Cada parte é exportada separadamente e composta pelo consumidor.

---

## Padrão Base (Radix)

```tsx
"use client"

import * as React from "react"
import * as ComponentPrimitive from "@radix-ui/react-component"
import { cn } from "@/lib/utils"

// Root — alias direto
const Component = ComponentPrimitive.Root

// Trigger — alias direto (sem styling custom)
const ComponentTrigger = ComponentPrimitive.Trigger

// Content — styled wrapper
const ComponentContent = React.forwardRef<
  React.ElementRef<typeof ComponentPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ComponentPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ComponentPrimitive.Portal>
    <ComponentPrimitive.Content
      ref={ref}
      className={cn("tailwind-classes", className)}
      {...props}
    />
  </ComponentPrimitive.Portal>
))
ComponentContent.displayName = ComponentPrimitive.Content.displayName

export { Component, ComponentTrigger, ComponentContent }
```

## Padrão Base (HTML Puro)

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Component = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("base-classes", className)} {...props} />
  )
)
Component.displayName = "Component"

// Sub-componentes seguem o mesmo padrão
const ComponentHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("header-classes", className)} {...props} />
  )
)
ComponentHeader.displayName = "ComponentHeader"

export { Component, ComponentHeader }
```

---

## Referência por Componente

### Card

Container simples baseado em HTML puro. 6 sub-componentes.

```tsx
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@blips/ui"
```

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Anatomia:**
- Todos `forwardRef<HTMLDivElement>`
- Card: `rounded-lg border bg-card text-card-foreground shadow-sm`
- CardHeader: `flex flex-col space-y-1.5 p-6`
- CardTitle: `text-2xl font-semibold leading-none tracking-tight`
- CardDescription: `text-sm text-muted-foreground`
- CardContent: `p-6 pt-0`
- CardFooter: `flex items-center p-6 pt-0`

---

### Dialog

Modal com overlay, Radix-based. Componente mais reusado como base (Sheet, Command, AlertDialog).

```tsx
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose
} from "@blips/ui"
```

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Name" />
    </div>
    <DialogFooter>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Anatomia:**
- `"use client"` obrigatório
- `DialogContent` compõe `DialogPortal` + `DialogOverlay` automaticamente
- Close button (X) embutido no canto superior direito
- Overlay: `fixed inset-0 z-50 bg-black/80` com animações fade
- Content: `fixed left-[50%] top-[50%] z-50` com translate centering + zoom animations
- Header/Footer: plain functions (sem `forwardRef`)

---

### AlertDialog

Dialog de confirmação. Usa Radix AlertDialog + `buttonVariants`.

```tsx
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogFooter, AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel
} from "@blips/ui"
```

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

**Anatomia:**
- `AlertDialogAction` aplica `buttonVariants()` (default style)
- `AlertDialogCancel` aplica `buttonVariants({ variant: "outline" })`
- Cancel tem `mt-2 sm:mt-0` para mobile stacking

---

### Sheet

Painel lateral deslizante. Reusa `@radix-ui/react-dialog` como base.

```tsx
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter,
  SheetTitle, SheetDescription, SheetClose
} from "@blips/ui"
```

**Variantes (side):** `top` | `bottom` | `left` | `right` (default)

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Gear</SheetTitle>
      <SheetDescription>Manage your preferences.</SheetDescription>
    </SheetHeader>
    <div className="py-4">Content</div>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Done</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Anatomia:**
- `sheetVariants` via `cva` com variante `side`
- `"use client"` obrigatório
- Close button embutido como Dialog
- Cada side tem animação slide-in/out específica

---

### Accordion

Seções colapsáveis. Radix-based.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@blips/ui"
```

```tsx
// Único item aberto
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>

// Múltiplos abertos
<Accordion type="multiple">
  ...
</Accordion>
```

**Anatomia:**
- `Accordion = AccordionPrimitive.Root`
- `AccordionItem`: `border-b`
- `AccordionTrigger`: `CaretDown` com `transition-transform` rotate-180
- `AccordionContent`: `animate-accordion-down` / `animate-accordion-up`

---

### Tabs

Navegação por abas. Radix-based.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@blips/ui"
```

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

**Anatomia:**
- `Tabs = TabsPrimitive.Root`
- `TabsList`: `inline-flex h-10 items-center justify-center rounded-md bg-muted p-1`
- `TabsTrigger`: `data-[state=active]:bg-background data-[state=active]:text-foreground`
- `TabsContent`: `mt-2 ring-offset-background focus-visible:ring-*`

---

### Table

Tabela HTML estilizada. Sem Radix.

```tsx
import {
  Table, TableHeader, TableBody, TableFooter, TableRow,
  TableHead, TableCell, TableCaption
} from "@blips/ui"
```

```tsx
<Table>
  <TableCaption>List of users</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">John</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell className="text-right">$100.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$100.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

**Anatomia:**
- Wrapper: `<div className="relative w-full overflow-auto">` + `<table>`
- Todos `forwardRef` para elementos HTML nativos (`table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`)
- `TableRow`: `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`

---

### DropdownMenu

Menu dropdown com suporte a checkboxes, radios e sub-menus.

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuShortcut
} from "@blips/ui"
```

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub item</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
      Show Panel
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Anatomia:**
- Radix `@radix-ui/react-dropdown-menu`
- `"use client"` obrigatório
- Content: `z-50 min-w-[8rem] rounded-md border bg-popover p-1 shadow-md`
- Item: `relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm`
- `inset` prop nos items/labels: `pl-8` para alinhamento com checkbox/radio indicators
- Ícones: `Check`, `ChevronRight`, `Circle` do @phosphor-icons/react

---

### ContextMenu

Menu de contexto (botão direito). Mesma estrutura que DropdownMenu.

```tsx
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuRadioGroup,
  ContextMenuRadioItem, ContextMenuSub, ContextMenuSubTrigger,
  ContextMenuSubContent, ContextMenuShortcut
} from "@blips/ui"
```

```tsx
<ContextMenu>
  <ContextMenuTrigger className="w-64 h-32 border border-dashed rounded-md flex items-center justify-center">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem>Back <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>Show Bookmarks</ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>
```

---

### Menubar

Barra de menu tipo desktop app.

```tsx
import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem,
  MenubarSeparator, MenubarShortcut, MenubarCheckboxItem,
  MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger,
  MenubarSubContent
} from "@blips/ui"
```

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Share</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Email</MenubarItem>
          <MenubarItem>Message</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

---

### NavigationMenu

Menu de navegação com viewport e indicador.

```tsx
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@blips/ui"
```

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[400px]">
          <li><NavigationMenuLink href="/docs">Documentation</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

**Anatomia:**
- `navigationMenuTriggerStyle` via `cva` — exportado para uso em links simples
- `NavigationMenu` auto-renderiza `NavigationMenuViewport`

---

### Select

Dropdown de seleção. Radix-based.

```tsx
import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectGroup, SelectLabel, SelectItem, SelectSeparator
} from "@blips/ui"
```

```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

**Anatomia:**
- `SelectContent` default: `position="popper"`
- Scroll buttons (up/down) com `ChevronUp`/`CaretDown`
- `SelectItem` com `Check` indicator no lado esquerdo

---

### RadioGroup

Grupo de radio buttons. Radix-based.

```tsx
import { RadioGroup, RadioGroupItem } from "@blips/ui"
```

```tsx
<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>
```

---

### Popover

Container flutuante posicionado. Radix-based.

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@blips/ui"
```

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium">Dimensions</h4>
      <Input placeholder="Width" />
    </div>
  </PopoverContent>
</Popover>
```

**Anatomia:**
- `PopoverContent`: `z-50 w-72 rounded-md border bg-popover p-4 shadow-md`
- Default: `align="center"`, `sideOffset={4}`

---

### HoverCard

Card flutuante ao hover.

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@blips/ui"
```

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@username</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar>...</Avatar>
      <div>
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm text-muted-foreground">Bio text</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

---

### Tooltip

Tooltip de informação. Radix-based.

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@blips/ui"
```

```tsx
// TooltipProvider deve envolver a aplicação ou seção
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add new item</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Anatomia:**
- `TooltipContent`: `z-50 rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md`
- Default: `sideOffset={4}`

---

### Avatar

Imagem de perfil com fallback.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@blips/ui"
```

```tsx
<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="@user" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**Anatomia:**
- `"use client"` obrigatório
- Avatar: `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full`
- Fallback: `flex h-full w-full items-center justify-center rounded-full bg-muted`

---

### Breadcrumb

Navegação hierárquica.

```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
} from "@blips/ui"
```

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">House</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Anatomia:**
- `Breadcrumb`: `<nav aria-label="breadcrumb">`
- `BreadcrumbLink`: suporta `asChild` via Radix Slot
- `BreadcrumbSeparator`: `ChevronRight` por default
- `BreadcrumbEllipsis`: `DotsThree` para itens colapsados

---

### Pagination

Navegação de páginas.

```tsx
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis
} from "@blips/ui"
```

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

**Anatomia:**
- `Pagination`: `<nav role="navigation" aria-label="pagination">`
- `PaginationLink`: aplica `buttonVariants` — `isActive` controla variant (default vs outline)

---

### Command

Palette de comandos (⌘K). Baseado em `cmdk`.

```tsx
import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
  CommandDialog
} from "@blips/ui"
```

```tsx
// Inline
<Command>
  <CommandInput placeholder="MagnifyingGlass..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>MagnifyingGlass</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

// Como dialog
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandGroup heading="Actions">
      <CommandItem>New File <CommandShortcut>⌘N</CommandShortcut></CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

**Anatomia:**
- `CommandDialog` compõe `Dialog` + `DialogContent` + `Command`
- `CommandInput`: `MagnifyingGlass` icon do @phosphor-icons/react embutido

---

### ScrollArea

Área de scroll customizada.

```tsx
import { ScrollArea, ScrollBar } from "@blips/ui"
```

```tsx
<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {items.map((item) => (
      <div key={item} className="text-sm">{item}</div>
    ))}
  </div>
</ScrollArea>

// Horizontal
<ScrollArea className="w-96 whitespace-nowrap">
  <div className="flex gap-4 p-4">
    {items.map((item) => <Card key={item}>...</Card>)}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

---

### InputOTP

Input de código OTP.

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@blips/ui"
```

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

**Anatomia:**
- Baseado na lib `input-otp`
- `InputOTPSlot` lê do `OTPInputContext` por índice
- Caret falso animado: `animate-caret-blink`

---

### ToggleGroup

Grupo de toggles mutuamente exclusivos ou multi-seleção.

```tsx
import { ToggleGroup, ToggleGroupItem } from "@blips/ui"
```

```tsx
// Single
<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left"><TextAlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center"><TextAlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right"><TextAlignRight /></ToggleGroupItem>
</ToggleGroup>

// Multiple
<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic">I</ToggleGroupItem>
  <ToggleGroupItem value="underline">U</ToggleGroupItem>
</ToggleGroup>
```

**Anatomia:**
- `"use client"` obrigatório
- Context para propagar `variant`/`size` aos items
- Reutiliza `toggleVariants` do componente `Toggle`

---

### Collapsible

Container colapsável simples.

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@blips/ui"
```

```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Hidden content</p>
  </CollapsibleContent>
</Collapsible>
```

**Anatomia:**
- Re-export direto de `@radix-ui/react-collapsible`
- `"use client"` obrigatório
- Sem styling adicional

---

### Resizable

Painéis redimensionáveis.

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@blips/ui"
```

```tsx
<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">Panel 1</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">Panel 2</div>
  </ResizablePanel>
</ResizablePanelGroup>
```

**Anatomia:**
- Baseado em `react-resizable-panels`
- `"use client"` obrigatório
- `ResizableHandle`: opcional `withHandle` prop para grip visual (`DotsSixVertical` icon)

---

### Carousel

Carrossel com navegação. Baseado em Embla Carousel.

```tsx
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselPrevious, CarouselNext
} from "@blips/ui"
```

```tsx
<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {items.map((item, index) => (
      <CarouselItem key={index}>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semibold">{index + 1}</span>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// Com opções
<Carousel opts={{ align: "start", loop: true }}>
  ...
</Carousel>
```

**Anatomia:**
- Context: `CarouselContext` com estado do Embla
- Hook interno: `useCarousel()` com guard
- Navegação por teclado: `ArrowLeft`/`ArrowRight`
- `CarouselPrevious`/`CarouselNext` usam `Button` com `variant="outline" size="icon"`
