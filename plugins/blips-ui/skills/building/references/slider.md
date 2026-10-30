# Slider

Import: `@blips/ui/components/slider`

Seleção de um valor ou de uma faixa numa escala contínua (volume, faixa de
preço). Quando o valor exato importa, acompanhe de um `Input` numérico ou mostre
o valor ao lado.

Export (igual nas duas versões): `Slider`.

## Notas comuns

- `min` (padrão `0`), `max` (padrão `100`), `step`, `disabled`, `orientation`, `name`.
- Um thumb por posição do array de valor: `[25, 75]` desenha dois (faixa).
- Sem `value` nem `defaultValue`, renderiza dois thumbs (`[min, max]`).
- Dê nome acessível: `aria-label` ou `aria-labelledby` apontando para o rótulo.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/slider`. Estrutura: Root > Control > Track > Indicator
(`data-slot="slider-range"`) + Thumbs. `thumbAlignment="edge"` (pode sobrescrever).

| Prop | Tipo | Notas |
|---|---|---|
| `value` / `defaultValue` | `number \| number[]` | **Escalar desenha um único thumb** (desvio Blips do base-mira). |
| `onValueChange` | `(value: number \| number[], eventDetails) => void` | Recebe `number` se o valor for escalar, `number[]` se for array. |
| `onValueCommitted` | `(value, eventDetails) => void` | Substitui `onValueCommit` do Radix (fim do arraste). |
| `largeStep`, `minStepsBetweenValues`, `format`, `locale`, `thumbCollisionBehavior` | | Base UI. |

Visual: track `h-1 rounded-md bg-muted`; thumb `size-3 rounded-md border-ring`.
Estado: `data-horizontal`/`data-vertical`, `data-disabled` (no Control), `data-dragging`.
Vertical: `orientation="vertical"` + altura no pai (o Control tem `min-h-40`).

```tsx
import * as React from "react";
import { Slider } from "@blips/ui/components/slider";

export function Sliders() {
  const [volume, setVolume] = React.useState(50);
  const [faixa, setFaixa] = React.useState([200, 800]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Slider
        aria-label="Volume"
        value={volume}
        onValueChange={(v) => setVolume(v as number)}
      />
      <Slider
        aria-label="Faixa de preço"
        min={0}
        max={1000}
        step={50}
        value={faixa}
        onValueChange={(v) => setFaixa(v as number[])}
      />
    </div>
  );
}
```

### Armadilhas

- `onValueCommit` não existe: `onValueCommitted`.
- Prefira `data-vertical:` / `data-disabled:` (convenção da v3). `data-[orientation=vertical]:` e `data-[disabled]:` vindos da v2 ainda casam, porque o Base UI também emite `data-orientation` e `data-disabled` (este sem valor).

## v2.x — Radix

Primitiva: `@radix-ui/react-slider` (Root > Track > Range + Thumbs).

| Prop | Tipo | Notas |
|---|---|---|
| `value` / `defaultValue` | `number[]` | **Sempre array**, mesmo com um thumb (`[50]`). |
| `onValueChange` | `(value: number[]) => void` | |
| `onValueCommit` | `(value: number[]) => void` | Fim do arraste. |
| `minStepsBetweenThumbs`, `inverted`, `asChild` | | Radix. |

Visual: track `h-1.5 rounded-full`; thumb `size-4 rounded-full border-primary shadow-sm`.
Estado: `data-orientation`, `data-disabled`.

```tsx
import * as React from "react"
import { Slider } from "@blips/ui/components/slider"

export function Sliders() {
  const [volume, setVolume] = React.useState([50])

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Slider aria-label="Volume" value={volume} onValueChange={setVolume} />
      <Slider aria-label="Faixa de preço" defaultValue={[200, 800]} max={1000} step={50} />
    </div>
  )
}
```

## Exemplos na docs

`slider-demo`, `slider-range`, `slider-controlled`, `slider-vertical`, `slider-disabled` (em `apps/docs/examples/`, escritos para a v3).
