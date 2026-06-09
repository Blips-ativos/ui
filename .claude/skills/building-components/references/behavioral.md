# Behavioral — Componentes Comportamentais

Componentes que gerenciam estado complexo via React Context e compartilham dados entre sub-componentes.

---

## Padrão Base

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// 1. Tipo do contexto
type ComponentContextProps = {
  state: string
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

// 2. Contexto com null default
const ComponentContext = React.createContext<ComponentContextProps | null>(null)

// 3. Hook com guard
function useComponent() {
  const context = React.useContext(ComponentContext)
  if (!context) {
    throw new Error("useComponent must be used within a <ComponentProvider>.")
  }
  return context
}

// 4. Provider com forwardRef, useMemo/useCallback
const ComponentProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, children, ...props }, ref) => {
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
    },
    [setOpenProp, open]
  )

  const toggle = React.useCallback(() => setOpen((o) => !o), [setOpen])

  const contextValue = React.useMemo<ComponentContextProps>(
    () => ({ state: open ? "expanded" : "collapsed", open, setOpen, toggle }),
    [open, setOpen, toggle]
  )

  return (
    <ComponentContext.Provider value={contextValue}>
      <div ref={ref} className={cn("base-classes", className)} {...props}>
        {children}
      </div>
    </ComponentContext.Provider>
  )
})
ComponentProvider.displayName = "ComponentProvider"

// 5. Sub-componentes que consomem o contexto
const ComponentToggle = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ onClick, ...props }, ref) => {
    const { toggle } = useComponent()
    return (
      <button
        ref={ref}
        onClick={(e) => { onClick?.(e); toggle() }}
        {...props}
      />
    )
  }
)
ComponentToggle.displayName = "ComponentToggle"

export { ComponentProvider, ComponentToggle, useComponent }
```

**Regras específicas:**
- `"use client"` é **obrigatório**
- Context com tipo `| null` e hook com `throw Error`
- Provider deve suportar controlled (`open`/`onOpenChange`) e uncontrolled (`defaultOpen`)
- `useMemo` no valor do contexto
- `useCallback` em setters e handlers

---

## Referência por Componente

### Sidebar

O componente comportamental mais complexo da lib. 24 sub-componentes + 1 hook.

```tsx
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarGroupAction,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction,
  SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub,
  SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarTrigger, SidebarRail, SidebarInset, SidebarInput, SidebarSeparator,
  useSidebar
} from "@blips/ui"
```

#### Layout completo

```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Logo />
            <span>My App</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>5</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus /> <span className="sr-only">Add Project</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span>Project Alpha</span>
              </SidebarMenuButton>
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
              </SidebarMenuAction>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Avatar className="h-6 w-6">
              <AvatarImage src="..." />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>

  <SidebarInset>
    <header className="flex h-16 items-center gap-2 px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />
      <Breadcrumb>...</Breadcrumb>
    </header>
    <main className="flex-1 p-4">
      {/* Page content */}
    </main>
  </SidebarInset>
</SidebarProvider>
```

#### Sub-menus

```tsx
<SidebarMenu>
  <SidebarMenuItem>
    <Collapsible>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton>
          <Settings />
          <span>Settings</span>
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton isActive>General</SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton>Billing</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  </SidebarMenuItem>
</SidebarMenu>
```

#### Hook useSidebar

```tsx
function MyComponent() {
  const { state, open, setOpen, isMobile, toggleSidebar } = useSidebar()

  return (
    <div>
      <p>Sidebar is {state}</p>
      <Button onClick={toggleSidebar}>Toggle</Button>
    </div>
  )
}
```

**Anatomia do Context:**
```tsx
type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}
```

**Características:**
- **Variantes do Sidebar:** `side` (left/right), `variant` (sidebar/floating/inset), `collapsible` (offcanvas/icon/none)
- **Mobile:** Usa `Sheet` no mobile, panel fixo no desktop
- **Keyboard:** `Cmd/Ctrl+B` para toggle
- **Cookie persistence:** `sidebar_state` cookie (7 dias)
- **CSS Variables:** `--sidebar-width` (16rem), `--sidebar-width-icon` (3rem)
- **Data attributes:** `data-state`, `data-collapsible`, `data-variant`, `data-side`, `data-sidebar`
- **sidebarMenuButtonVariants:** cva com `variant` (default/outline) e `size` (default/sm/lg)
- **Tooltip automático:** `SidebarMenuButton` com prop `tooltip` exibe tooltip quando collapsed + desktop
- **SidebarMenuSkeleton:** largura aleatória (50-90%) para loading states realísticos
- **SidebarInset:** `<main>` com padding responsivo baseado no estado do sidebar via `peer-data-*`

---

### Form

Sistema de formulários integrado com `react-hook-form`.

```tsx
import {
  Form, FormField, FormItem, FormLabel, FormControl,
  FormDescription, FormMessage, useFormField
} from "@blips/ui"
```

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
})

function ProfileForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "" },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

#### Com Select

```tsx
<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

#### Com Checkbox

```tsx
<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>Accept terms and conditions</FormLabel>
        <FormDescription>You agree to our Terms of Service.</FormDescription>
      </div>
    </FormItem>
  )}
/>
```

**Anatomia:**
- `Form = FormProvider` — alias direto do react-hook-form
- **Dois contextos:**
  - `FormFieldContext`: fornece `name` do campo
  - `FormItemContext`: fornece `id` para linkagem aria
- `FormField`: wrapa `Controller` com context
- `FormItem`: gera `id` via `useId()`, layout `space-y-2`
- `FormLabel`: aplica `text-destructive` quando há erro
- `FormControl`: usa Radix `Slot` para injetar `id`, `aria-describedby`, `aria-invalid`
- `FormMessage`: renderiza `error.message` ou `children`, retorna null se ambos ausentes
- `useFormField()`: hook público que retorna `id`, `name`, `formItemId`, `formDescriptionId`, `formMessageId` + field state

---

### Chart

Sistema de gráficos baseado em `recharts`.

```tsx
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, ChartStyle,
  type ChartConfig
} from "@blips/ui"
```

```tsx
const chartConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
}

<ChartContainer config={chartConfig} className="h-[300px]">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

**Anatomia:**
- `ChartConfig` type: `Record<string, { label: string; color?: string; theme?: { light: string; dark: string } }>`
- `ChartContainer`: injeta CSS variables `--color-[key]` via `<style>` + responsiveContainer
- `ChartStyle`: `dangerouslySetInnerHTML` para CSS variable injection
- `ChartTooltip` = `recharts.Tooltip`
- `ChartLegend` = `recharts.Legend`
- `ChartTooltipContent`: renderiza label + value com color indicators
- `ChartLegendContent`: renderiza items com color dots

**Context:**
```tsx
type ChartContextProps = {
  config: ChartConfig
}
```
- Criado por `ChartContainer`, consumido por `ChartTooltipContent` e `ChartLegendContent`
- `useChart()` hook com guard
