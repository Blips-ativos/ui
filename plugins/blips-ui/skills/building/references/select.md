# Select

Import: `@blips/ui/components/select`

Escolha de uma opção numa lista fechada (5+ opções, ou pouco espaço). Para até ~5
opções visíveis, Radio Group; com busca/digitação, Combobox (padrão Popover +
Command em `command.md`, ou o Combobox primitivo da v3 em `combobox.md`); em
formulário simples ou mobile, NativeSelect (só v3, `native-select.md`).

Exports (iguais nas duas versões): `Select`, `SelectTrigger`, `SelectValue`,
`SelectContent`, `SelectGroup`, `SelectLabel`, `SelectItem`, `SelectSeparator`,
`SelectScrollUpButton`, `SelectScrollDownButton`.

## Notas comuns

- `SelectTrigger` tem a prop da lib `size`: `"default"` ou `"sm"`. Largura pelo `className` (`w-48`, `w-full`).
- Ícones Phosphor no trigger (caret) e no item marcado (check).
- Erro: `aria-invalid` no `SelectTrigger` (automático dentro de `FormControl`).
- Em react-hook-form: `value={field.value}` + `onValueChange={field.onChange}` no `Select`, e o `SelectTrigger` dentro de `FormControl`.
- Não existe prop `description` no `SelectItem`: para texto secundário, componha dentro do item.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/select`. `Select` é um alias direto de `Select.Root`
(sem `data-slot` no root).

**Select (Root)**

| Prop | Tipo | Notas |
|---|---|---|
| `items` | `{ label, value }[]` ou `Record<value, label>` | **Recomendado**: sem ele o `SelectValue` mostra o `value` cru até o popup abrir. Um item com `value: null` vira o placeholder. |
| `value` / `defaultValue` | qualquer tipo (string, objeto, `null`) | Com `multiple`, array. |
| `onValueChange` | `(value, eventDetails) => void` | |
| `multiple` | `boolean` | Seleção múltipla. |
| `open` / `onOpenChange(open, eventDetails)` / `modal` | | |
| `itemToStringLabel`, `itemToStringValue`, `isItemEqualToValue` | | Para valores objeto. |
| `name`, `required`, `disabled`, `readOnly`, `inputRef` | | |

**SelectValue**: não tem `placeholder`. O placeholder é o rótulo de um item com
`value: null` em `items`, ou o `children` (texto ou função `(value) => ReactNode`).
Estilo do placeholder: `data-placeholder:` no trigger.

**SelectContent**

| Prop | Padrão | Notas |
|---|---|---|
| `alignItemWithTrigger` | `true` | Popup sobrepõe o trigger alinhando o item marcado (parecido com `position="item-aligned"` do Radix). `false` = abaixo do trigger (popper). |
| `side` | `"bottom"` | Vale com `alignItemWithTrigger={false}`. |
| `sideOffset` | `4` | |
| `align` / `alignOffset` | `"center"` / `0` | |

`SelectLabel` é `Select.GroupLabel`: **precisa ficar dentro de um `SelectGroup`**.

Visual: trigger `h-7` (sm `h-6`), `text-xs/relaxed`, ícones `size-3.5`; itens `min-h-7`; popup com largura do trigger (`w-(--anchor-width)`).
Estado: `data-open`/`data-closed`, `data-disabled`, `data-highlighted` (item), `data-placeholder` (trigger).

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

const frutas = [
  { label: "Maçã", value: "maca" },
  { label: "Banana", value: "banana" },
];
const legumes = [
  { label: "Cenoura", value: "cenoura" },
  { label: "Brócolis", value: "brocolis" },
];
const items = [{ label: "Selecione um alimento", value: null }, ...frutas, ...legumes];

export function SeletorDeAlimento() {
  const [valor, setValor] = React.useState<string | null>(null);

  return (
    <Select items={items} value={valor} onValueChange={setValor}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frutas</SelectLabel>
          {frutas.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Legumes</SelectLabel>
          {legumes.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```

Múltipla escolha com resumo no trigger:

```tsx
<Select items={items} multiple defaultValue={[]}>
  <SelectTrigger className="w-64">
    <SelectValue>
      {(valor: string[]) =>
        valor.length === 0 ? "Selecione as frutas" : `${valor.length} selecionadas`
      }
    </SelectValue>
  </SelectTrigger>
  <SelectContent>…</SelectContent>
</Select>
```

### Armadilhas

- `<SelectValue placeholder="…" />` não existe: use item `value: null` em `items` ou `children`.
- `position="popper"` não existe: `alignItemWithTrigger={false}`.
- `SelectLabel` solto (fora de `SelectGroup`) quebra.
- `--radix-select-trigger-width` virou `--anchor-width`; `data-[state=open]:` virou `data-open:`.

## v2.x — Radix

Primitiva: `@radix-ui/react-select`.

**Select (Root)**: `value`/`defaultValue` (**string**; `""` não é permitido em item),
`onValueChange(value: string)`, `open`, `onOpenChange(open)`, `name`, `required`,
`disabled`, `dir`. Sem seleção múltipla.

**SelectValue**: `placeholder` (string ou nó).

**SelectContent**: `position` (`"item-aligned"` padrão da lib, ou `"popper"`),
`align` (`"center"`), `side`, `sideOffset`, `avoidCollisions`. Com `"popper"`, o
viewport usa `--radix-select-trigger-width`.

`SelectLabel` (`Select.Label`) pode ficar solto ou dentro de `SelectGroup`.

Visual: trigger `h-9` (sm `h-8`), `text-sm`, `shadow-xs`.
Estado: `data-state="open" | "closed"`, `data-placeholder`, `data-disabled`, `data-highlighted`.

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"

export function SeletorDeFruta() {
  const [valor, setValor] = React.useState("")

  return (
    <Select value={valor} onValueChange={setValor}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Selecione uma fruta" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>Frutas</SelectLabel>
          <SelectItem value="maca">Maçã</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

## Exemplos na docs

`select-demo`, `select-multiple`, `select-popper`, `select-scrollable`, `select-sizes`, `select-disabled`, `select-invalid` (em `apps/docs/examples/`, escritos para a v3).
