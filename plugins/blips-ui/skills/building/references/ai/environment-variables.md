# EnvironmentVariables

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/environment-variables`

Lista de variáveis de ambiente: cabeçalho com título ("Variáveis de
ambiente") e um `Switch` que mostra/oculta os valores, linhas com nome em
mono e valor mascarado (`•`, até 20), selo "Obrigatória" e botão de copiar
(valor, nome ou linha `export NOME="valor"`). Adaptado do
`environment-variables` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** quando o agente lista as variáveis que um projeto, deploy ou
  integração precisa (geradas, faltando, para conferir), com a opção de
  revelar e copiar.
- **Não use** para segredos reais que o usuário não deveria ver: mascarar
  na tela **não** protege nada, o valor está no DOM e no estado. Mande do
  servidor só o que pode ser exibido (ou um valor já truncado).
- **Não use** como formulário para editar variáveis: `Field` + `Input` da
  @blips/ui.
- **Não use** para um comando de uma linha: `Snippet` (`snippet.md`).

## Peers exigidos

Nenhum além da @blips/ai (usa `Badge`, `Button`, `Switch` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as parts com o AI
SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Exports: `EnvironmentVariables`, `EnvironmentVariablesHeader`,
`EnvironmentVariablesTitle`, `EnvironmentVariablesToggle`,
`EnvironmentVariablesContent`, `EnvironmentVariable`,
`EnvironmentVariableGroup`, `EnvironmentVariableName`,
`EnvironmentVariableValue`, `EnvironmentVariableRequired`,
`EnvironmentVariableCopyButton` e os tipos `*Props` de cada um.

| Componente | Props reais | Notas |
|---|---|---|
| `EnvironmentVariables` | props de `<div>` + `showValues?: boolean`, `defaultShowValues?: boolean` (`false`), `onShowValuesChange?: (show: boolean) => void` | Moldura `rounded-lg border bg-background`; provê o contexto de visibilidade. |
| `EnvironmentVariablesHeader` | props de `<div>` | `flex justify-between border-b px-4 py-3`. |
| `EnvironmentVariablesTitle` | props de `<h3>` | `children` ou **"Variáveis de ambiente"**. |
| `EnvironmentVariablesToggle` | props do `Switch` da @blips/ui | `EyeIcon`/`EyeSlashIcon` + `Switch` com `aria-label="Mostrar valores"`, ligado ao contexto. `className` (só string) vai no wrapper. |
| `EnvironmentVariablesContent` | props de `<div>` | `divide-y`. |
| `EnvironmentVariable` | props de `<div>` + `name: string`, `value: string` (obrigatórios) | Linha `flex justify-between gap-4 px-4 py-3`; provê `name`/`value` aos filhos. Sem `children`, mostra nome à esquerda e valor à direita. |
| `EnvironmentVariableGroup` | props de `<div>` | `flex items-center gap-2` para agrupar dentro da linha. |
| `EnvironmentVariableName` | props de `<span>` | `children` ou o `name` da linha, `font-mono text-sm`. |
| `EnvironmentVariableValue` | props de `<span>` | `children` ou o `value`; oculto vira `•` × `min(tamanho, 20)` com `select-none`. |
| `EnvironmentVariableRequired` | props do `Badge` | `variant="secondary"`, `children` ou **"Obrigatória"**. |
| `EnvironmentVariableCopyButton` | props do `Button` + `copyFormat?: "value" \| "name" \| "export"` (`"value"`), `onCopy?: () => void`, `onError?: (error: Error) => void`, `timeout?: number` (`2000`), `copyLabel?: string` (`"Copiar"`), `copiedLabel?: string` (`"Copiado"`) | Ghost `size-6`, `CopyIcon` → `CheckIcon`. `export` copia `export NOME="valor"`. Copia o valor real mesmo com os valores ocultos. |

## Composição com a @blips/ui

- O toggle é o `Switch` da @blips/ui v3 (Base UI: `onCheckedChange(checked,
  details)`), o selo é `Badge` e a cópia é `Button`.
- Confirmação de cópia: `toast` da @blips/ui em `onCopy`.
- Muitas variáveis: envolva o `EnvironmentVariablesContent` num `ScrollArea`
  da @blips/ui com altura máxima.
- Num chat: no `MessageContent` do `Message` da @blips/ui, ou dentro de um
  `Artifact` (`artifact.md`) quando faz parte de um setup gerado.

## Exemplo v3 que compila

```tsx
"use client";

import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariableRequired,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariableValue,
} from "@blips/ai/components/environment-variables";

const variaveis = [
  { name: "LITELLM_BASE_URL", value: "https://litellm.exemplo.com.br", required: true },
  { name: "LANGFUSE_HOST", value: "https://obs.exemplo.com.br", required: true },
  { name: "LOG_LEVEL", value: "info", required: false },
];

export function VariaveisDoAgente() {
  return (
    <EnvironmentVariables>
      <EnvironmentVariablesHeader>
        <EnvironmentVariablesTitle />
        <EnvironmentVariablesToggle />
      </EnvironmentVariablesHeader>
      <EnvironmentVariablesContent>
        {variaveis.map((v) => (
          <EnvironmentVariable key={v.name} name={v.name} value={v.value}>
            <EnvironmentVariableGroup>
              <EnvironmentVariableName />
              {v.required && <EnvironmentVariableRequired />}
            </EnvironmentVariableGroup>
            <EnvironmentVariableGroup>
              <EnvironmentVariableValue />
              <EnvironmentVariableCopyButton copyFormat="export" />
            </EnvironmentVariableGroup>
          </EnvironmentVariable>
        ))}
      </EnvironmentVariablesContent>
    </EnvironmentVariables>
  );
}
```

## Armadilhas

- **Ocultar não é segurança.** O valor real está no DOM/estado e o botão de
  copiar copia o valor mesmo oculto. Nunca mande segredo de produção para o
  cliente só para mascarar.
- **Não sobrescreva `checked`/`onCheckedChange` no
  `EnvironmentVariablesToggle`**: as props são espalhadas depois das do
  componente e quebram a ligação com o contexto. Para controlar, use
  `showValues` + `onShowValuesChange` na raiz.
- **Os subcomponentes de linha precisam de `EnvironmentVariable` acima**
  (é ele que dá `name`/`value`); fora dele, nome e valor saem vazios (não há
  erro).
- O mascaramento tem no máximo 20 `•`, independentemente do tamanho real
  (não revela o comprimento de valores longos).
- Com `children` no `EnvironmentVariable`, o layout padrão some: monte nome,
  valor e botões você mesmo, como no exemplo.
