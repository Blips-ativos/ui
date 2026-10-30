# Native Select

Import: `@blips/ui/components/native-select`

> **Só existe na v3.x.** Em repo v2 (`@blips/ui` 2.x) este componente não existe:
> use um `<select>` nativo estilizado à mão, o `Select` da v2 (`select.md`), ou
> proponha a migração para a v3. Veja `v2-vs-v3.md`.

`<select>` nativo do navegador com o visual da lib e um caret Phosphor por cima.
Bom para formulários simples, mobile (abre o seletor do sistema), listas
estáticas e envio por `<form>` sem JavaScript. Para busca, itens ricos ou
seleção múltipla com resumo, use `Select` ou `Combobox`.

Exports: `NativeSelect`, `NativeSelectOption`, `NativeSelectOptGroup`.

| Componente | Elemento | Descrição |
|---|---|---|
| `NativeSelect` | `<div>` + `<select>` | Props: `Omit<React.ComponentProps<"select">, "size">` + `size` (`"default"` `h-7 text-xs/relaxed`, ou `"sm"` `h-6`). |
| `NativeSelectOption` | `<option>` | `value`, `disabled`, `label`. |
| `NativeSelectOptGroup` | `<optgroup>` | `label` (cabeçalho do grupo). |

- O **`className` vai para o `<div>` de fora** (o wrapper `w-fit`), não para o `<select>`; o `<select>` ocupa `w-full` do wrapper. Para largura total: `className="w-full"`.
- Todas as outras props (`value`, `onChange`, `name`, `id`, `disabled`, `required`, `aria-invalid`) vão para o `<select>`.
- Erro: `aria-invalid` (borda e anel `destructive`). Desabilitado: o wrapper fica com `opacity-50`.
- Placeholder: primeira opção com `value=""` (e `required` no select, se for obrigatório).
- Em react-hook-form: `{...form.register("estado")}` ou `{...field}` direto no `NativeSelect` (é um `<select>` de verdade).

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export function SeletorDeEstado() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="estado">Estado</FieldLabel>
      <NativeSelect id="estado" name="estado" className="w-full" required>
        <NativeSelectOption value="">Selecione um estado</NativeSelectOption>
        <NativeSelectOptGroup label="Sudeste">
          <NativeSelectOption value="sp">São Paulo</NativeSelectOption>
          <NativeSelectOption value="rj">Rio de Janeiro</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Sul">
          <NativeSelectOption value="pr">Paraná</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
      <FieldDescription>Onde fica a sua empresa.</FieldDescription>
    </Field>
  );
}
```

Tamanho pequeno e erro:

```tsx
<NativeSelect size="sm" aria-invalid defaultValue="">
  <NativeSelectOption value="">Escolha</NativeSelectOption>
  <NativeSelectOption value="a">Opção A</NativeSelectOption>
</NativeSelect>
```

## Exemplos na docs

`native-select-demo`, `native-select-groups`, `native-select-field`, `native-select-sizes`, `native-select-disabled`, `native-select-invalid` (em `apps/docs/examples/`).
