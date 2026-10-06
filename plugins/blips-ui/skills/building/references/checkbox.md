# Checkbox

Import: `@blips/ui/components/checkbox`

Caixa de seleção `size-4`, com indicador de check Phosphor. Export único: `Checkbox`.

## Notas comuns

- É um elemento `peer`: irmãos podem reagir ao estado com seletores `peer-*`.
- Rótulo: `<Label htmlFor>` / `<FieldLabel htmlFor>` apontando para o `id` do Checkbox, ou dentro de `Field orientation="horizontal"` (ver `references/field.md`).
- Integração com formulário: `Controller` do react-hook-form ou `FormField` da lib (ver `components/forms/form-components.md`).
- Cartão selecionável: `FieldLabel` envolvendo um `Field` com o Checkbox (padrão "choice card" em `references/field.md`).

> A API difere entre as versões (estado misto, `onCheckedChange`, atributos de estado). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/checkbox`. A raiz é um `<span role="checkbox">` com um `<input>` oculto (não é mais `<button>`).

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `checked` | `boolean` | — | Controlado. **Só boolean.** |
| `defaultChecked` | `boolean` | `false` | Não controlado. |
| `onCheckedChange` | `(checked: boolean, eventDetails) => void` | — | Mudança. |
| `indeterminate` | `boolean` | `false` | Estado misto (substitui `checked="indeterminate"`). |
| `name` / `value` / `required` / `form` | — | — | Integração com `<form>` nativo, na raiz. |
| `uncheckedValue` | `string` | — | Valor enviado quando desmarcado. |
| `parent` | `boolean` | `false` | Checkbox-pai num `CheckboxGroup` do Base UI. |
| `disabled` / `readOnly` | `boolean` | `false` | — |
| `id` | `string` | — | Id do input (para `htmlFor`). |
| `inputRef` | `Ref<HTMLInputElement>` | — | Ref do input oculto. |

Estado: `data-checked`, `data-unchecked`, `data-indeterminate`, `data-disabled` (e `data-invalid`, `data-dirty`… dentro de Field do Base UI). Seletores de consumidor: `peer-data-checked:`, `data-checked:` — não `data-[state=checked]:`.

Visual: foco `ring-2 ring-ring/30`, sem sombra, área de toque ampliada (`after:-inset-x-3 after:-inset-y-2`), estilos `group-has` para Field/FieldLabel. Ícone `CheckIcon`.

```tsx
"use client";

import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@blips/ui/components/field";
import { useState } from "react";

const modulos = [
  { id: "contratos", label: "Contratos" },
  { id: "financeiro", label: "Financeiro" },
];

export function PermissoesModulos() {
  const [selecionados, setSelecionados] = useState<string[]>(["contratos"]);
  const todos = selecionados.length === modulos.length;
  const alguns = selecionados.length > 0 && !todos;

  return (
    <FieldGroup className="max-w-sm gap-3">
      <Field orientation="horizontal">
        <Checkbox
          id="modulos-todos"
          checked={todos}
          indeterminate={alguns}
          onCheckedChange={(checked) =>
            setSelecionados(checked ? modulos.map((m) => m.id) : [])
          }
        />
        <FieldLabel htmlFor="modulos-todos">Todos os módulos</FieldLabel>
      </Field>
      {modulos.map((m) => (
        <Field key={m.id} orientation="horizontal" className="ps-6">
          <Checkbox
            id={`modulo-${m.id}`}
            checked={selecionados.includes(m.id)}
            onCheckedChange={(checked) =>
              setSelecionados((atual) =>
                checked ? [...atual, m.id] : atual.filter((id) => id !== m.id)
              )
            }
          />
          <FieldLabel htmlFor={`modulo-${m.id}`} className="font-normal">
            {m.label}
          </FieldLabel>
        </Field>
      ))}

      <Field orientation="horizontal">
        <Checkbox id="termos" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="termos">Aceito os termos e condições</FieldLabel>
          <FieldDescription>Você pode revogar a qualquer momento.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
```

## v2.x — Radix

Primitiva: `@radix-ui/react-checkbox`. A raiz é um `<button role="checkbox">`.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `checked` | `boolean \| "indeterminate"` | — | Controlado; `"indeterminate"` para estado misto. |
| `defaultChecked` | `boolean \| "indeterminate"` | — | Não controlado. |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | — | Mudança. |
| `disabled` / `required` | `boolean` | `false` | — |
| `name` / `value` | `string` | `value="on"` | Formulário. |
| `id` | `string` | — | Para `<Label htmlFor>`. |

Estado: `data-state="checked" | "unchecked" | "indeterminate"`, `data-disabled`. Seletores: `data-[state=checked]:`, `peer-data-[state=checked]:`.

Visual: `shadow-xs`, foco `ring-[3px] ring-ring/50`. Ícone `Check` (`size-3.5`).

```tsx
"use client"

import { Checkbox } from "@blips/ui/components/checkbox"
import { Label } from "@blips/ui/components/label"

export function Termos({
  todos,
  alguns,
  marcarTodos,
}: {
  todos: boolean
  alguns: boolean
  marcarTodos: (marcar: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="termos" />
        <Label htmlFor="termos">Aceito os termos e condições</Label>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox id="termos-2" defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor="termos-2">Aceito os termos e condições</Label>
          <p className="text-sm text-muted-foreground">
            Você pode revogar a qualquer momento.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="todos"
          checked={alguns ? "indeterminate" : todos}
          onCheckedChange={(checked) => marcarTodos(checked === true)}
        />
        <Label htmlFor="todos">Todos os módulos</Label>
      </div>

      <Label className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/5">
        <Checkbox id="notificacoes" defaultChecked />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">Ativar notificações</p>
          <p className="text-sm text-muted-foreground">
            Você pode ativar ou desativar a qualquer momento.
          </p>
        </div>
      </Label>
    </div>
  )
}
```

## Exemplos na docs

`checkbox-demo`, `checkbox-with-text`, `checkbox-disabled`, `checkbox-indeterminate`, `checkbox-group`, `checkbox-invalid` (v3).
