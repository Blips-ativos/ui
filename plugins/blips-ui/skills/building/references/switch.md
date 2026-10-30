# Switch

Import: `@blips/ui/components/switch`

Liga/desliga com efeito imediato (preferência, recurso ativo). Para aceite que só
vale ao enviar o formulário, prefira Checkbox.

Export (igual nas duas versões): `Switch`.

## Notas comuns

- Prop da lib `size`: `"default"` (padrão) ou `"sm"`, exposta como `data-size`.
- Props de estado: `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `required`, `name`, `value`.
- Sempre com rótulo: `Label htmlFor` ou `FieldLabel` envolvendo um `Field orientation="horizontal"`.
- Em react-hook-form: `checked={field.value}` + `onCheckedChange={field.onChange}` (não espalhe `{...field}`).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/switch` (`Switch.Root` + `Switch.Thumb`).

| Prop | Tipo | Notas |
|---|---|---|
| `checked` / `defaultChecked` | `boolean` | |
| `onCheckedChange` | `(checked: boolean, eventDetails) => void` | Ganhou o 2º argumento; `field.onChange` direto continua funcionando. |
| `uncheckedValue` | `string` | Valor enviado no form quando desligado. |
| `readOnly`, `inputRef`, `render` | | Base UI. Sem `asChild`. |
| `size` | `"sm" \| "default"` | default 28×16.6px (thumb `size-3.5`); sm 24×14px. |

- A raiz é um `<span role="switch">` com um `<input>` escondido (não é mais `<button>`).
- Estado: `data-checked` / `data-unchecked`, `data-disabled`. Erro por `aria-invalid` (anel `destructive`).

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@blips/ui/components/field";
import { Switch } from "@blips/ui/components/switch";

export function ModoFoco() {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <FieldLabel htmlFor="modo-foco" className="max-w-sm">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Compartilhar entre dispositivos</FieldTitle>
          <FieldDescription>O modo foco desliga quando você sai do app.</FieldDescription>
        </FieldContent>
        <Switch id="modo-foco" checked={ativo} onCheckedChange={setAtivo} />
      </Field>
    </FieldLabel>
  );
}
```

### Armadilhas

- `data-[state=checked]:` não casa: use `data-checked:` (ou `group-has-data-checked:`).
- Testes que procuram `button[role=switch]` quebram: o elemento é `span[role=switch]`.

## v2.x — Radix

Primitiva: `@radix-ui/react-switch`. `onCheckedChange(checked: boolean)`, `asChild`.
Raiz é um `<button role="switch">`. Tamanho default `h-[1.15rem] w-8` (thumb
`size-4`), sm `h-3.5 w-6`.

Estado: `data-state="checked" | "unchecked"`, `disabled:` (atributo nativo).

```tsx
import { Label } from "@blips/ui/components/label"
import { Switch } from "@blips/ui/components/switch"

export function ModoAviao() {
  const [ativo, setAtivo] = React.useState(false)

  return (
    <div className="flex items-center gap-2">
      <Switch id="modo-aviao" checked={ativo} onCheckedChange={setAtivo} />
      <Label htmlFor="modo-aviao">Modo avião</Label>
    </div>
  )
}
```

## Exemplos na docs

`switch-demo`, `switch-description`, `switch-disabled`, `switch-invalid`, `switch-sizes` (em `apps/docs/examples/`, escritos para a v3). Formulário com Switch: veja `form.md` e `field.md`.
