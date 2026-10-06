# Radio Group

Import: `@blips/ui/components/radio-group`

Escolha única entre poucas opções visíveis (até ~5). Para muitas opções, use
Select; para alternar visualização, Toggle Group ou Tabs.

Exports (iguais nas duas versões): `RadioGroup`, `RadioGroupItem`.

## Notas comuns

- `RadioGroup`: `value`, `defaultValue`, `onValueChange`, `disabled`, `required`, `name`, `orientation` (v2) / layout por classe.
- `RadioGroupItem`: `value` (obrigatório), `id`, `disabled`.
- Sempre pareie cada item com `Label htmlFor`/`FieldLabel` usando o mesmo `id`.
- Layout horizontal: `className="flex gap-4"` no `RadioGroup`.
- Em react-hook-form: `value={field.value}` + `onValueChange={field.onChange}`.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitivas: `@base-ui/react/radio-group` (raiz) e `@base-ui/react/radio` (`Radio.Root` como item).

| Prop | Tipo | Notas |
|---|---|---|
| `value` / `defaultValue` (raiz) | `unknown` | Pode ser qualquer tipo, não só string. |
| `onValueChange` | `(value: unknown, eventDetails) => void` | `value` não é tipado como string: pode precisar de cast (`(v) => setPlano(v as string)`). |
| `readOnly`, `inputRef`, `render` | | Base UI. Sem `asChild`. |

- Raiz com `grid w-full gap-3`.
- Item marcado fica **preenchido** (`bg-primary` com ponto `bg-primary-foreground` desenhado por `<span>`), sem ícone Phosphor.
- Estado: `data-checked` / `data-unchecked`. Erro por `aria-invalid`.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

const planos = [
  { value: "plus", titulo: "Plus", descricao: "Para autônomos e times pequenos" },
  { value: "pro", titulo: "Pro", descricao: "Para empresas em crescimento" },
];

export function EscolhaDePlano() {
  const [plano, setPlano] = React.useState("plus");

  return (
    <RadioGroup
      value={plano}
      onValueChange={(v) => setPlano(v as string)}
      className="max-w-sm"
    >
      {planos.map((p) => (
        <FieldLabel key={p.value} htmlFor={`plano-${p.value}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{p.titulo}</FieldTitle>
              <FieldDescription>{p.descricao}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={p.value} id={`plano-${p.value}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
```

### Armadilhas

- `data-[state=checked]:` não casa: use `data-checked:`.
- `onValueChange={setPlano}` com `useState<string>` não compila sem cast.

## v2.x — Radix

Primitiva: `@radix-ui/react-radio-group`. Raiz `grid gap-3`. `value`/`defaultValue`
são `string`; `onValueChange(value: string)`; `orientation`, `loop`, `asChild`.
Item com borda e bolinha `Circle` (Phosphor) `fill-primary` no centro.

Estado: `data-state="checked" | "unchecked"`.

```tsx
import { Label } from "@blips/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group"

export function Densidade() {
  return (
    <RadioGroup defaultValue="confortavel">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="padrao" id="r1" />
        <Label htmlFor="r1">Padrão</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="confortavel" id="r2" />
        <Label htmlFor="r2">Confortável</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compacto" id="r3" />
        <Label htmlFor="r3">Compacto</Label>
      </div>
    </RadioGroup>
  )
}
```

## Exemplos na docs

`radio-group-demo`, `radio-group-description`, `radio-group-fieldset`, `radio-group-disabled`, `radio-group-invalid` (em `apps/docs/examples/`, escritos para a v3). Radio dentro de menu: `DropdownMenuRadioGroup` (veja `dropdown-menu.md`).
