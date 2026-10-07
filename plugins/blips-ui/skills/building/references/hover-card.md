# Hover Card

Import: `@blips/ui/components/hover-card`

Cartão com conteúdo rico que aparece ao passar o mouse (ou focar) num gatilho.
Use para prévia de perfil, de link ou de registro. Não use para ação essencial:
no toque (mobile) ele não abre de forma confiável. Para conteúdo clicável, use
Popover; para uma dica curta, Tooltip.

Exports (iguais nas duas versões): `HoverCard`, `HoverCardTrigger`, `HoverCardContent`.

## Notas comuns

- Conteúdo vai num Portal, com animação de fade/zoom e slide conforme `data-side`.
- `HoverCardContent` aceita `side`, `sideOffset` e `align`. Largura padrão fixa (`w-64` na v2, `w-72` na v3); ajuste com `className`.
- Ícones Phosphor (nunca lucide).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/preview-card` (`PreviewCard`).

| Componente | Descrição |
|---|---|
| `HoverCard` | `PreviewCard.Root`. `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`. |
| `HoverCardTrigger` | `PreviewCard.Trigger`. Renderiza um `<a>` por padrão; troque com `render`. Os atrasos ficam **aqui**: `delay` e `closeDelay` (ms). |
| `HoverCardContent` | Portal + Positioner + Popup. `rounded-lg p-2.5 text-xs/relaxed ring-1 ring-foreground/10 shadow-md`, `w-72`. |

**HoverCardContent**

| Prop | Tipo | Padrão |
|---|---|---|
| `side` | `"top" \| "right" \| "bottom" \| "left" \| "inline-start" \| "inline-end"` | `"bottom"` |
| `sideOffset` | `number` | `4` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |
| `alignOffset` | `number` | `4` |

Estado: `data-open` / `data-closed`. CSS vars: `--transform-origin`, `--anchor-width`, `--available-height`.

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { Button } from "@blips/ui/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card";

export function PerfilHoverCard() {
  return (
    <HoverCard>
      <HoverCardTrigger delay={300} render={<Button variant="link" />}>
        @blips
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="/logo.png" />
            <AvatarFallback>BL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium">@blips</h4>
            <p>Gestão de ativos para quem empreende.</p>
            <span className="text-muted-foreground">Desde dezembro de 2021</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

### Armadilhas

- `openDelay`/`closeDelay` no `HoverCard` não existem: os atrasos vão no `HoverCardTrigger` (`delay`, `closeDelay`).
- `asChild` não existe: use `render={<Button variant="link" />}`. O trigger é um `<a>` por padrão; com `render={<Button />}` ele vira o `<button>` do Button. Não passe `nativeButton={false}` a esse Button: ele continua renderizando `<button>` e o Base UI avisa no console.
- `data-[state=open]:` não casa: use `data-open:`.

## v2.x — Radix

Primitiva: `@radix-ui/react-hover-card`.

| Componente | Descrição |
|---|---|
| `HoverCard` | `HoverCardPrimitive.Root`. `openDelay` (padrão Radix 700), `closeDelay` (300), `open`, `defaultOpen`, `onOpenChange(open)`. |
| `HoverCardTrigger` | `HoverCardPrimitive.Trigger`. Use `asChild` para não aninhar `<a>`. |
| `HoverCardContent` | Portal + Content. `rounded-md border p-4 shadow-md`, `w-64`. `align` padrão `"center"`, `sideOffset` padrão `4`; também `side`, `avoidCollisions`, `collisionPadding`. |

Estado: `data-state="open" | "closed"`. CSS var de origem: `--radix-hover-card-content-transform-origin`.

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Button } from "@blips/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card"

export function PerfilHoverCard() {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <Button variant="link">@blips</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/logo.png" />
            <AvatarFallback>BL</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@blips</h4>
            <p className="text-sm">Gestão de ativos para quem empreende.</p>
            <div className="text-xs text-muted-foreground">Desde dezembro de 2021</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

## Exemplos na docs

`hover-card-demo`, `hover-card-sides` (em `apps/docs/examples/`, escritos para a v3).
