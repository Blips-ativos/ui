# Tooltip

Import: `@blips/ui/components/tooltip`

Dica curta (uma linha) que aparece no hover ou foco de um elemento. Obrigatória em
botões só com ícone. Não coloque conteúdo interativo dentro: para isso use
Popover; para prévia rica, Hover Card.

Exports (iguais nas duas versões): `TooltipProvider`, `Tooltip`, `TooltipTrigger`,
`TooltipContent`.

## Notas comuns

- Coloque um `<TooltipProvider>` na raiz do app (layout). O Provider da lib abre sem atraso (`0`) por padrão, nas duas versões.
- `TooltipContent`: `bg-foreground text-background text-xs`, com seta, num Portal. `side` padrão `"top"`.
- Botão só com ícone: tooltip + `<span className="sr-only">` (ou `aria-label`) no botão.
- `Kbd` dentro do `TooltipContent` ganha cores adaptadas automaticamente.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/tooltip`.

| Componente | Props principais |
|---|---|
| `TooltipProvider` | `delay` (padrão da lib `0`), `closeDelay`, `timeout` (janela em que o próximo tooltip abre sem atraso). |
| `Tooltip` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `disableHoverablePopup`, `disabled`. |
| `TooltipTrigger` | `render` (renderiza `<button>` por padrão), `delay`, `closeDelay` por tooltip. |
| `TooltipContent` | `side` (`"top"`), `sideOffset` (`4`), `align` (`"center"`), `alignOffset` (`0`). `max-w-xs`, `inline-flex gap-1.5`. Seta sempre renderizada. |

Sem `<TooltipProvider>` ancestral o Base UI usa o atraso padrão dele (cerca de
600 ms). O `SidebarProvider` da v3 **não** fornece mais um Provider.

Estado: `data-open`, `data-closed`, `data-[state=delayed-open]`. CSS vars: `--transform-origin`, `--anchor-width`, `--available-height`.

```tsx
import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@blips/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";

export function AdicionarComDica() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon" />}>
        <PlusIcon />
        <span className="sr-only">Adicionar item</span>
      </TooltipTrigger>
      <TooltipContent side="right">Adicionar item</TooltipContent>
    </Tooltip>
  );
}
```

Provider na raiz:

```tsx
import { TooltipProvider } from "@blips/ui/components/tooltip";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
```

Com atalho:

```tsx
<TooltipContent>
  Salvar <Kbd>⌘S</Kbd>
</TooltipContent>
```

### Armadilhas

- `delayDuration` não existe: `TooltipProvider delay={…}` ou `TooltipTrigger delay={…}`. `skipDelayDuration` virou `timeout`; `disableHoverableContent` virou `disableHoverablePopup`.
- `asChild` não existe. Não aninhe `<Button>` dentro do trigger: passe-o em `render`.
- Botão desabilitado não dispara hover: envolva num `<span>` e use `render={<span />}` no trigger.

## v2.x — Radix

Primitiva: `@radix-ui/react-tooltip`.

| Componente | Props principais |
|---|---|
| `TooltipProvider` | `delayDuration` (padrão da lib `0`), `skipDelayDuration` (padrão Radix 300), `disableHoverableContent`. |
| `Tooltip` | `open`, `defaultOpen`, `onOpenChange(open)`, `delayDuration` (sobrescreve o Provider). |
| `TooltipTrigger` | `asChild`. |
| `TooltipContent` | `sideOffset` (padrão da lib **`0`**), `side` (`"top"`), `align` (`"center"`), `avoidCollisions`, `collisionPadding`. Seta sempre renderizada. |

`Tooltip` não cria um Provider sozinho: sem `TooltipProvider` ancestral o Radix
lança erro. O `SidebarProvider` da v2 já envolve os filhos num
`TooltipProvider delayDuration={0}`.

Estado: `data-state="closed" | "delayed-open" | "instant-open"`. CSS var de origem: `--radix-tooltip-content-transform-origin`.

```tsx
import { Plus } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip"

export function AdicionarComDica() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus />
          <span className="sr-only">Adicionar item</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Adicionar item</TooltipContent>
    </Tooltip>
  )
}
```

Provider na raiz:

```tsx
import { TooltipProvider } from "@blips/ui/components/tooltip"

export default function RootLayout({ children }) {
  return <TooltipProvider>{children}</TooltipProvider>
}
```

## Exemplos na docs

`tooltip-demo`, `tooltip-icon`, `tooltip-sides`, `tooltip-keyboard`, `tooltip-disabled` (em `apps/docs/examples/`, escritos para a v3). O tooltip de gráfico (`ChartTooltip`) é outro componente: veja `chart.md`.
