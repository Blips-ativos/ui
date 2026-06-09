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
- `open`: boolean - Estado aberto controlado
- `onOpenChange`: (open: boolean) => void - Manipulador de mudança do estado aberto
- `openDelay`: number - Atraso em milissegundos antes de abrir (padrão: 200)
- `closeDelay`: number - Atraso em milissegundos antes de fechar (padrão: 300)
- `children`: ReactNode - Conteúdo do card

### HoverCardTrigger
- `children`: ReactNode - Elemento de gatilho
- `asChild`: boolean - Mescla com as props do componente filho
- `className`: string - Classes CSS customizadas

### HoverCardContent
- `children`: ReactNode - Conteúdo
- `className`: string - Classes CSS customizadas
- `align`: 'start' | 'center' | 'end' - Alinhamento do conteúdo (padrão: center)
- `side`: 'top' | 'right' | 'bottom' | 'left' - Posição relativa ao gatilho (padrão: bottom)
- `sideOffset`: number - Distância em relação ao gatilho (padrão: 4)
- `avoidCollisions`: boolean - Impede que o conteúdo colida com as bordas da viewport (padrão: true)

## Estilização padrão

O componente `HoverCardContent` aplica estas classes padrão:
- `z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`

Isso fornece:
- Tamanho fixo (w-64)
- Cantos arredondados e borda
- Estilização de fundo de popover
- Animações de entrada/saída
- Empilhamento correto de z-index
