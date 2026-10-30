# Combobox

Import: `@blips/ui/components/combobox`

> **Só existe na v3.x.** Num repo em `@blips/ui` 2.x este import não existe: use o
> padrão Popover + Command (`components/combobox.md` e `references/command.md`,
> seção v2.x).

Campo com busca e lista de opções (seleção única ou múltipla com chips), sobre o
`Combobox` do Base UI. Na v3 há duas formas de fazer "select com busca":

| Use | Quando |
|---|---|
| **`Combobox`** (esta reference) | O usuário digita no próprio campo; filtro local; multi-seleção com chips; agrupamento. |
| Popover + Command (`components/combobox.md`) | Gatilho com cara de botão que abre uma lista com busca; padrão herdado da v2. |

## v3.x — Base UI

Primitiva: `Combobox` de `@base-ui/react`.

Exports: `Combobox`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`,
`ComboboxItem`, `ComboboxGroup`, `ComboboxLabel`, `ComboboxCollection`,
`ComboboxEmpty`, `ComboboxSeparator`, `ComboboxChips`, `ComboboxChip`,
`ComboboxChipsInput`, `ComboboxTrigger`, `ComboboxValue`, `useComboboxAnchor`.

| Componente | Props / descrição |
|---|---|
| `Combobox` | É o `Combobox.Root`. `items` (lista ou grupos `{ value, items }`), `value`/`defaultValue`/`onValueChange(value, eventDetails)`, `multiple`, `inputValue`/`onInputValueChange`, `filter` (ou `null` para filtrar no servidor), `filteredItems`, `itemToStringLabel`/`itemToStringValue` (itens objeto), `isItemEqualToValue`, `autoHighlight`, `openOnInputClick` (padrão `true`), `limit`, `virtualized`, `modal` (padrão `false`), `name`/`required`/`disabled`/`readOnly`, `open`/`onOpenChange`. |
| `ComboboxInput` | `InputGroup` + input. `showTrigger` (padrão `true`, botão com `CaretDownIcon`), `showClear` (padrão `false`, botão com `XIcon` para limpar), `disabled`. `children` entram no `InputGroup` (ex.: `InputGroupAddon` com ícone). |
| `ComboboxContent` | Popup posicionado: `side` (`"bottom"`), `sideOffset` (`6`), `align` (`"start"`), `alignOffset` (`0`), `anchor` (para chips). Largura do anchor. |
| `ComboboxList` | Lista; aceita função render `(item) => <ComboboxItem …/>` sobre `items`. |
| `ComboboxItem` | `value`. Mostra `CheckIcon` à direita quando selecionado. |
| `ComboboxEmpty` | Mensagem sem resultados — **sempre inclua**. |
| `ComboboxGroup` / `ComboboxLabel` / `ComboboxCollection` | Grupo com `items`, rótulo e função render dos itens do grupo. |
| `ComboboxSeparator` | Linha entre grupos. |
| `ComboboxChips` / `ComboboxChip` / `ComboboxChipsInput` | Multi-seleção: contêiner (passe o `ref` do `useComboboxAnchor`), chip (`showRemove`, padrão `true`) e input dentro dos chips. |
| `ComboboxValue` | Renderiza o valor atual; com função `(values) => …` para desenhar os chips. |
| `ComboboxTrigger` | Botão que abre a lista (o `ComboboxInput` já usa). |
| `useComboboxAnchor()` | `ref` para ancorar o `ComboboxContent` nos chips. |

Regras:

- Texto de `placeholder` e `ComboboxEmpty` em pt-BR.
- Itens objeto: passe `itemToStringLabel` (o que aparece no input) e `isItemEqualToValue` quando a referência mudar entre renders.
- Busca no servidor: `filter={null}`, controle `inputValue`/`onInputValueChange` com debounce e passe os resultados em `items`.
- Dentro de Dialog/Sheet funciona sem ajuste (portal próprio).
- Num formulário com react-hook-form: `value={field.value}` + `onValueChange={field.onChange}` via `Controller`.

```tsx
"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@blips/ui/components/combobox";
import { Field, FieldLabel } from "@blips/ui/components/field";

const estados = ["Paraná", "Santa Catarina", "Rio Grande do Sul", "São Paulo"];

export function SelecionarEstado() {
  return (
    <Field className="w-64">
      <FieldLabel htmlFor="estado">Estado</FieldLabel>
      <Combobox items={estados}>
        <ComboboxInput id="estado" placeholder="Selecione o estado" showClear />
        <ComboboxContent>
          <ComboboxEmpty>Nenhum estado encontrado.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}

export function SelecionarEstados() {
  const anchor = useComboboxAnchor();

  return (
    <Combobox multiple autoHighlight items={estados} defaultValue={[estados[0]]}>
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(valores: string[]) => (
            <>
              {valores.map((valor) => (
                <ComboboxChip key={valor}>{valor}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Adicionar..." />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Nenhum estado encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
```

Agrupado:

```tsx
<Combobox items={grupos /* [{ value: "Sul", items: ["Paraná", …] }, …] */}>
  <ComboboxInput placeholder="Selecione o estado" />
  <ComboboxContent>
    <ComboboxEmpty>Nenhum estado encontrado.</ComboboxEmpty>
    <ComboboxList>
      {(grupo: { value: string; items: string[] }) => (
        <ComboboxGroup key={grupo.value} items={grupo.items}>
          <ComboboxLabel>{grupo.value}</ComboboxLabel>
          <ComboboxCollection>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxCollection>
          <ComboboxSeparator />
        </ComboboxGroup>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

## Exemplos na docs

`combobox-demo`, `combobox-multiple`, `combobox-groups`, `combobox-clear`, `combobox-custom`, `combobox-disabled`, `combobox-invalid`, `combobox-popup`.
