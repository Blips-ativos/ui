# Popover

Import: `@blips/ui/components/popover`

Painel flutuante aberto por clique, com conteúdo interativo (mini-formulário,
filtros, seletor). Para dica curta use Tooltip; para prévia no hover, Hover Card;
para lista de ações, Dropdown Menu.

Exports (iguais nas duas versões): `Popover`, `PopoverTrigger`, `PopoverContent`,
`PopoverAnchor`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`.

## Notas comuns

- `PopoverContent` vai num Portal; largura padrão `w-72` (ajuste com `className`).
- `PopoverHeader` é um `div` (`flex flex-col gap-1`) para agrupar `PopoverTitle` + `PopoverDescription`.
- `PopoverAnchor` posiciona o conteúdo em relação a outro elemento que não o trigger.
- Não existe `PopoverSection` em nenhuma versão: divida o conteúdo com `Separator` ou com `div`s próprias.
- Combobox no padrão Popover + Command: veja `command.md`. Na v3 existe também o Combobox primitivo (`combobox.md`).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/popover`.

| Componente | Descrição |
|---|---|
| `Popover` | `Popover.Root` envolvido num contexto da lib (para o `PopoverAnchor`). `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `modal` (`boolean \| "trap-focus"`). |
| `PopoverTrigger` | `Popover.Trigger` (é um `<button>`). Troque o elemento com `render`. |
| `PopoverContent` | Portal + Positioner + Popup. `flex flex-col gap-4 rounded-lg p-2.5 text-xs ring-1 ring-foreground/10 shadow-md`. |
| `PopoverAnchor` | Reimplementado pela lib: `<div data-slot="popover-anchor">` que registra uma ref; o `PopoverContent` a usa como âncora. Precisa estar dentro do mesmo `<Popover>`. Sem `asChild`. |
| `PopoverTitle` | `Popover.Title` (`h2`, `text-sm font-medium`), liga `aria-labelledby` sozinho. |
| `PopoverDescription` | `Popover.Description` (`p`, `text-muted-foreground`), liga `aria-describedby`. |

**PopoverContent**

| Prop | Tipo | Padrão |
|---|---|---|
| `side` | `"top" \| "right" \| "bottom" \| "left" \| "inline-start" \| "inline-end"` | `"bottom"` |
| `sideOffset` | `number` | `4` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |
| `alignOffset` | `number` | `0` |
| `anchor` | `Element \| RefObject \| VirtualElement \| () => …` | trigger (ou o `PopoverAnchor`) |
| `initialFocus` / `finalFocus` | do Popup do Base UI | — |

Estado: `data-open` / `data-closed`. CSS vars: `--anchor-width`, `--available-height`, `--transform-origin`.

```tsx
import { Button } from "@blips/ui/components/button";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@blips/ui/components/popover";

export function DimensoesPopover() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Dimensões
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensões</PopoverTitle>
          <PopoverDescription>Defina o tamanho da camada.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="largura">Largura</Label>
            <Input id="largura" defaultValue="100%" className="col-span-2" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="altura">Altura</Label>
            <Input id="altura" defaultValue="25px" className="col-span-2" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

Controlado (fechar por um botão interno):

```tsx
const [aberto, setAberto] = React.useState(false);

<Popover open={aberto} onOpenChange={setAberto}>
  <PopoverTrigger render={<Button variant="outline" />}>Filtros</PopoverTrigger>
  <PopoverContent>
    {/* campos */}
    <Button size="sm" onClick={() => setAberto(false)}>
      Aplicar
    </Button>
  </PopoverContent>
</Popover>
```

Ancorado em outro elemento:

```tsx
<Popover>
  <PopoverAnchor className="w-full">
    <Input placeholder="Buscar cliente" />
  </PopoverAnchor>
  <PopoverTrigger render={<Button size="icon" variant="ghost" />}>
    <MagnifyingGlassIcon />
  </PopoverTrigger>
  <PopoverContent align="start">…</PopoverContent>
</Popover>
```

### Armadilhas

- `onOpenAutoFocus`, `onEscapeKeyDown`, `onInteractOutside`, `forceMount`, `avoidCollisions`, `collisionPadding` não existem. Foco: `initialFocus`/`finalFocus`; dismiss: `onOpenChange(open, eventDetails)` checando `eventDetails.reason`.
- `--radix-popover-trigger-width` virou `--anchor-width` (ex.: `className="w-(--anchor-width)"`).
- Não aninhe `<Button>` dentro do `PopoverTrigger`: passe-o em `render`.

## v2.x — Radix

Primitiva: `@radix-ui/react-popover`.

| Componente | Descrição |
|---|---|
| `Popover` | `PopoverPrimitive.Root`. `open`, `defaultOpen`, `onOpenChange(open)`, `modal` (boolean). |
| `PopoverTrigger` | `PopoverPrimitive.Trigger`. Use `asChild` com um `Button`. |
| `PopoverContent` | Portal + Content. `rounded-md border p-4 shadow-md`, `w-72`. `align` padrão `"center"`, `sideOffset` padrão `4`; também `side`, `alignOffset`, `avoidCollisions`, `collisionPadding`, `onOpenAutoFocus`, `onEscapeKeyDown`, `onInteractOutside`, `forceMount`. |
| `PopoverAnchor` | `PopoverPrimitive.Anchor` (aceita `asChild`). |
| `PopoverTitle` | `div` simples com `font-medium` (sem ligação ARIA automática). |
| `PopoverDescription` | `p` com `text-muted-foreground`. |

Estado: `data-state="open" | "closed"`. CSS vars: `--radix-popover-trigger-width`, `--radix-popover-content-available-height`, `--radix-popover-content-transform-origin`.

```tsx
import * as React from "react"
import { Button } from "@blips/ui/components/button"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@blips/ui/components/popover"

export function DimensoesPopover() {
  const [aberto, setAberto] = React.useState(false)

  return (
    <Popover open={aberto} onOpenChange={setAberto}>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensões</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="grid gap-4">
          <PopoverHeader>
            <PopoverTitle>Dimensões</PopoverTitle>
            <PopoverDescription>Defina o tamanho da camada.</PopoverDescription>
          </PopoverHeader>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="largura">Largura</Label>
            <Input id="largura" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <Button size="sm" onClick={() => setAberto(false)}>
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

## Exemplos na docs

`popover-demo`, `popover-basic`, `popover-alignments`, `popover-sides` (em `apps/docs/examples/`, escritos para a v3).
