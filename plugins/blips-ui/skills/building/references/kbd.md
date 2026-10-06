# Kbd

Import: `@blips/ui/components/kbd`

Indicador de tecla ou atalho de teclado. Componente só de CSS (sem primitiva).

Exports (iguais nas duas versões): `Kbd`, `KbdGroup`.

| Componente | Elemento | Descrição |
|---|---|---|
| `Kbd` | `<kbd>` | Uma tecla: `h-5 min-w-5 px-1 bg-muted text-muted-foreground font-sans font-medium`, `pointer-events-none select-none`. Ícone interno vira `size-3`. |
| `KbdGroup` | `<kbd>` | Agrupa várias `Kbd` com `gap-1`. |

- Dentro de `TooltipContent`, a `Kbd` muda sozinha para `bg-background/20 text-background`.
- Dentro de `InputGroupAddon`, ganha estilo próprio na v3 (veja `input-group.md`).
- Em botão, coloque a `Kbd` depois do texto.

API igual na v2.x e na v3.x.

Detecção de versão: `SKILL.md`, Passo 0. Diferenças transversais entre as versões: `v2-vs-v3.md`.

Diferença só visual: na v3 `rounded-xs` e `text-[0.625rem]` (v2: `rounded-sm`, `text-xs`); o seletor de tooltip é `in-data-[slot=tooltip-content]` na v3.

```tsx
import { Button } from "@blips/ui/components/button";
import { Kbd, KbdGroup } from "@blips/ui/components/kbd";

export function Atalhos() {
  return (
    <div className="flex flex-col items-start gap-4 text-xs">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>

      <p className="text-muted-foreground">
        Use <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup> para
        recolher a barra lateral.
      </p>

      <Button variant="outline">
        Aceitar <Kbd>⏎</Kbd>
      </Button>
    </div>
  );
}
```

Para o tooltip com atalho, veja `tooltip.md`; para busca com `⌘K`, `input-group.md`.

## Exemplos na docs

`kbd-demo`, `kbd-group`, `kbd-button`, `kbd-tooltip`, `kbd-input-group`, `kbd-icon` (em `apps/docs/examples/`, escritos para a v3).
