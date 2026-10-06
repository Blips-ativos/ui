# Field

Import: `@blips/ui/components/field`

Primitiva de layout para campos de formulário acessíveis, sem acoplar a nenhuma
biblioteca de formulário: funciona com `<form>` nativo, React Hook Form, TanStack
Form ou server actions do Next.

Exports: `Field`, `FieldContent`, `FieldDescription`, `FieldError`, `FieldGroup`,
`FieldLabel`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldTitle`.

API igual na v2.x e na v3.x.

## Sub-componentes

| Componente | Descrição |
|---|---|
| `Field` | `div role="group"`, `data-slot="field"`, `data-orientation`. Prop `orientation`. |
| `FieldLabel` | `<Label>` da lib. Pode envolver um `Field` inteiro (padrão "choice card"). |
| `FieldTitle` | Título visual que não é `<label>`. |
| `FieldDescription` | Texto de ajuda (`text-xs/relaxed text-muted-foreground`). |
| `FieldError` | Erro com `role="alert"`. Aceita `errors` ou `children`. |
| `FieldGroup` | Pilha vertical de campos, com container query (`@container/field-group`). |
| `FieldSet` | `<fieldset>` semântico. |
| `FieldLegend` | `<legend>`; `variant?: "legend" \| "label"` (`data-variant`). |
| `FieldSeparator` | Separador entre grupos; `children` opcional vira texto sobre a linha ("ou"). |
| `FieldContent` | Coluna de label + descrição ao lado do controle (layout horizontal). |

## Props

**Field**

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` | `vertical`: label acima; `horizontal`: lado a lado (checkbox/switch); `responsive`: vertical no estreito, horizontal a partir de `@md` do `FieldGroup`. |
| `data-invalid` | `boolean` | — | Pinta o campo de destrutivo. Combine com `aria-invalid` no controle. |
| `data-disabled` | `boolean` | — | Reduz a opacidade de label/descrição. |

**FieldError**

| Prop | Tipo | Descrição |
|---|---|---|
| `errors` | `Array<{ message?: string } \| undefined>` | Ex.: `[fieldState.error]` do RHF. Deduplica por mensagem e descarta erros sem mensagem (personalização Blips); sem nenhuma mensagem, não renderiza nada. Uma mensagem vira texto; várias, uma lista. |
| `children` | `ReactNode` | Conteúdo direto (tem precedência). |

## Diferenças de estilo entre versões

A API é a mesma; mudam densidade e um seletor:

| | v3.x — Base UI | v2.x — Radix |
|---|---|---|
| Espaçamento | `FieldGroup`/`FieldSet` `gap-4`, `FieldContent` `gap-0.5`, `FieldLegend` `mb-2` | `gap-6`, `gap-1`, `mb-3` |
| Tipografia | `FieldTitle`, `FieldSeparator`, `FieldError` em `text-xs/relaxed` | `text-sm` |
| Choice card selecionado | `has-data-checked` (Checkbox/Radio do Base UI); card interno `p-2` com hover e ring de foco | `has-data-[state=checked]` (Radix); card interno `p-4` |
| Controles compostos | Checkbox/Radio/Switch/Select da v3 (ver as references) | Os da v2 |

Na v3, um controle próprio que só emite `data-state="checked"` não aciona o destaque do choice card.

## Exemplo

Ícones no padrão v3; o markup do Field é o mesmo nas duas versões — só os controles
compostos seguem a API da versão (ver `references/checkbox.md`, `references/select.md`…).

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  razaoSocial: z.string().min(3, "Informe a razão social."),
  plano: z.enum(["pro", "enterprise"]),
});

export function CadastroEmpresa() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { razaoSocial: "", plano: "pro" },
  });

  return (
    <form onSubmit={form.handleSubmit(salvar)} className="max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Dados da empresa</FieldLegend>
          <FieldDescription>Usados na emissão das notas.</FieldDescription>
          <FieldGroup>
            <Controller
              name="razaoSocial"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="razao-social">Razão social</FieldLabel>
                  <Input
                    {...field}
                    id="razao-social"
                    aria-invalid={fieldState.invalid}
                    placeholder="Padaria Pão Quente Ltda."
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Field orientation="horizontal">
              <Checkbox id="mesmo-endereco" defaultChecked />
              <FieldLabel htmlFor="mesmo-endereco" className="font-normal">
                Endereço de cobrança igual ao de entrega
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend variant="label">Plano</FieldLegend>
          <Controller
            name="plano"
            control={form.control}
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <FieldLabel htmlFor="plano-pro">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Pro</FieldTitle>
                      <FieldDescription>Para times em crescimento.</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="pro" id="plano-pro" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="plano-enterprise">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Enterprise</FieldTitle>
                      <FieldDescription>Suporte dedicado e SLA.</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="enterprise" id="plano-enterprise" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Salvar</Button>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
```

`type="submit"` explícito no botão de envio: na v3 o `Button` é `type="button"` por padrão; na v2 o `type="button"` do Cancelar evita envio acidental.

Layout responsivo: `<Field orientation="responsive">` dentro de um `FieldGroup` — label e controle empilham no estreito e ficam lado a lado a partir de `@md` do grupo.

Guias de formulário: `components/forms/forms.md`, `components/forms/form-components.md`.

## Exemplos na docs

`field-demo`, `field-input`, `field-checkbox`, `field-radio`, `field-switch`, `field-slider`, `field-select`, `field-choice-card`, `field-responsive`, `field-error` (v3).
