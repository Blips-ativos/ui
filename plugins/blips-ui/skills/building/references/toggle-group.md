# Toggle Group

Import: `@blips/ui/components/toggle-group`

Conjunto de toggles relacionados: escolha única (alinhamento, visualização) ou
múltipla (negrito/itálico/sublinhado). Para navegação entre painéis, use Tabs.

Exports (iguais nas duas versões): `ToggleGroup`, `ToggleGroupItem`.

## Notas comuns

- `variant` e `size` no `ToggleGroup` valem para todos os itens (vêm de `toggleVariants`, veja `toggle.md`).
- `spacing` (número, escala do Tailwind) controla o espaço entre itens; com `spacing={0}` os itens ficam grudados, com cantos arredondados só nas pontas.
- Todo `ToggleGroupItem` precisa de `value`; item só com ícone precisa de `aria-label`.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitivas: `@base-ui/react/toggle-group` (raiz) e `@base-ui/react/toggle` (item).

| Prop (ToggleGroup) | Tipo | Padrão | Notas |
|---|---|---|---|
| `multiple` | `boolean` | `false` | Sem ele, seleção única. **Não existe `type`.** |
| `value` / `defaultValue` | `string[]` | — | **Sempre array**, também no modo único (`["bold"]`). |
| `onValueChange` | `(value: string[], eventDetails) => void` | — | Array também no modo único; vazio = desmarcou. |
| `spacing` | `number` | **`2`** | Itens separados por padrão; `spacing={0}` gruda. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Prop da lib: vira `data-orientation` e empilha os itens (`flex-col`). |
| `loopFocus` | `boolean` | `true` | Substitui `loop`/`rovingFocus` do Radix. |
| `variant`, `size`, `disabled` | | | |

Item ligado: `aria-pressed` / `data-pressed`.

```tsx
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";

export function Formatacao() {
  const [alinhamento, setAlinhamento] = React.useState("left");

  return (
    <div className="flex flex-col gap-4">
      {/* Múltipla */}
      <ToggleGroup multiple variant="outline" spacing={0} defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Negrito">
          <TextBIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Itálico">
          <TextItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Sublinhado">
          <TextUnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Única, controlada com estado string */}
      <ToggleGroup
        value={[alinhamento]}
        onValueChange={(v) => {
          if (v[0]) setAlinhamento(v[0]);
        }}
      >
        <ToggleGroupItem value="left" aria-label="Alinhar à esquerda">
          <TextAlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Centralizar">
          <TextAlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Alinhar à direita">
          <TextAlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
```

### Armadilhas

- `type="single"`/`type="multiple"` não existe: use (ou omita) `multiple`.
- `value="bold"` (string) não marca nada: use `["bold"]`.
- Quem vinha da v2 com itens grudados precisa passar `spacing={0}` (o padrão mudou de 0 para 2).
- `orientation` é tratada pela lib (layout e `data-orientation`) e não é repassada à primitiva: a navegação por setas continua a do padrão horizontal.

## v2.x — Radix

Primitiva: `@radix-ui/react-toggle-group`.

| Prop (ToggleGroup) | Tipo | Padrão | Notas |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | **obrigatório** | |
| `value` / `defaultValue` | `string` (single) \| `string[]` (multiple) | — | |
| `onValueChange` | `(value: string \| string[]) => void` | — | No single, `""` quando desmarca. |
| `spacing` | `number` | **`0`** | Itens grudados por padrão. |
| `rovingFocus`, `loop`, `orientation`, `variant`, `size`, `disabled` | | | |

Item ligado: `data-state="on" | "off"`.

```tsx
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export function Formatacao() {
  const [alinhamento, setAlinhamento] = React.useState("left")

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="multiple" variant="outline">
        <ToggleGroupItem value="bold" aria-label="Negrito">
          <TextB />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Itálico">
          <TextItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Sublinhado">
          <TextUnderline />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="single"
        value={alinhamento}
        onValueChange={(v) => v && setAlinhamento(v)}
        spacing={2}
      >
        <ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
        <ToggleGroupItem value="center">Centro</ToggleGroupItem>
        <ToggleGroupItem value="right">Direita</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
```

## Exemplos na docs

`toggle-group-demo`, `toggle-group-single`, `toggle-group-controlled`, `toggle-group-outline`, `toggle-group-spacing`, `toggle-group-size`, `toggle-group-icons`, `toggle-group-vertical`, `toggle-group-disabled` (em `apps/docs/examples/`, escritos para a v3).
