# Label

Import: `@blips/ui/components/label`

Rótulo acessível de um controle de formulário. Associe por `htmlFor` (com o `id`
do controle) ou aninhando o controle dentro do `Label`. Em formulários com
react-hook-form, prefira `FormLabel` (veja `form.md`); em layouts com `Field`,
prefira `FieldLabel` (veja `field.md`).

Export (igual nas duas versões): `Label`.

## Notas comuns

- `flex items-center gap-2 font-medium leading-none select-none`.
- Esmaece sozinho quando o controle irmão anterior (`peer`) está desabilitado (`peer-disabled:opacity-50`) ou quando o grupo tem `data-disabled="true"`.
- Sem variantes (`size`/`variant` não existem).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

`<label>` nativo (o Base UI não tem primitivo de Label). Props:
`React.ComponentProps<"label">`. Texto `text-xs/relaxed`.

- `asChild` e `render` **não existem**: use o `<label>` como está ou envolva o controle.
- O bloqueio de seleção de texto no duplo clique (comportamento do Radix) não existe; a classe `select-none` continua.

```tsx
import { Checkbox } from "@blips/ui/components/checkbox";
import { Field } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";

export function Rotulos() {
  return (
    <div className="flex flex-col gap-4">
      <Field orientation="horizontal" className="w-fit">
        <Checkbox id="termos" />
        <Label htmlFor="termos">Aceito os termos e condições</Label>
      </Field>

      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" placeholder="voce@empresa.com" />
      </div>
    </div>
  );
}
```

## v2.x — Radix

`@radix-ui/react-label` (`LabelPrimitive.Root`). Texto `text-sm`. Aceita `asChild`
e impede seleção de texto no duplo clique.

```tsx
import { Checkbox } from "@blips/ui/components/checkbox"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export function Rotulos() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="termos" />
        <Label htmlFor="termos">Aceito os termos e condições</Label>
      </div>

      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" placeholder="voce@empresa.com" />
      </div>
    </div>
  )
}
```

## Exemplos na docs

`label-demo`, `label-input`, `label-textarea`, `label-disabled` (em `apps/docs/examples/`, escritos para a v3).
