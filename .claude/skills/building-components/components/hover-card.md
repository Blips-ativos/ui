# HoverCard

**Categoria:** Compound | **Deps:** `@radix-ui/react-hover-card` | **"use client":** Não

## Exports

`HoverCard`, `HoverCardTrigger`, `HoverCardContent`

## Uso

### Hover card básico

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@blips/ui"
import { Button } from "@blips/ui"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@username</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm text-muted-foreground">
          A biblioteca de componentes React para construir aplicações web.
        </p>
        <div className="flex items-center pt-2">
          <span className="text-xs text-muted-foreground">Entrou em março de 2020</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Hover card com avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@blips/ui"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@user</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="space-y-2 flex-1">
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm text-muted-foreground">
          Desenvolvedor frontend e entusiasta de UI.
        </p>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-muted-foreground">Entrou em março de 2020</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Hover card com conteúdo personalizado

```tsx
<HoverCard openDelay={200} closeDelay={100}>
  <HoverCardTrigger>Passe o mouse aqui</HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-4">
      <h3 className="font-semibold">Título do card</h3>
      <p className="text-sm text-muted-foreground">
        Esta é uma informação útil que aparece quando você passa o mouse.
      </p>
      <Button size="sm">Ação</Button>
    </div>
  </HoverCardContent>
</HoverCard>
```

## Props & Variants

### HoverCard
- `open`: boolean - Controlled open state
- `onOpenChange`: (open: boolean) => void - Open state change handler
- `openDelay`: number - Delay in milliseconds before opening (default: 200)
- `closeDelay`: number - Delay in milliseconds before closing (default: 300)
- `children`: ReactNode - Card content

### HoverCardTrigger
- `children`: ReactNode - Trigger element
- `asChild`: boolean - Merge with child component props
- `className`: string - Custom CSS classes

### HoverCardContent
- `children`: ReactNode - Content
- `className`: string - Custom CSS classes
- `align`: 'start' | 'center' | 'end' - Content alignment (default: center)
- `side`: 'top' | 'right' | 'bottom' | 'left' - Position relative to trigger (default: bottom)
- `sideOffset`: number - Distance from trigger (default: 4)
- `avoidCollisions`: boolean - Prevent content from colliding with viewport edges (default: true)

## Default Styling

O componente `HoverCardContent` aplica estas classes padrão:
- `z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`

Isso fornece:
- Tamanho fixo (w-64)
- Cantos arredondados e borda
- Estilização de fundo de popover
- Animações de entrada/saída
- Empilhamento correto de z-index
