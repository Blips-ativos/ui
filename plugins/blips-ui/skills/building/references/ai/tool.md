# Tool

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Cartão recolhível de uma chamada de ferramenta do agente: nome, badge de
status (7 estados do AI SDK), parâmetros em JSON e resultado ou erro, com
realce de sintaxe pelo `CodeBlock` (Shiki). Adaptado do `tool` do AI
Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para cada part `tool-*` ou `dynamic-tool` de uma mensagem (AI SDK),
  ou para cada evento de tool call do seu backend (AgentOS do Agno:
  `ToolCallStarted`/`ToolCallCompleted` mapeados para `state`).
- **Não use** para pedir aprovação antes de executar: isso é
  `confirmation.md` (pode ficar dentro do `ToolContent`).
- **Não use** para resumir vários passos em linha do tempo: isso é
  `chain-of-thought.md`.
- **Não use** para bloco de código solto: use `CodeBlock`
  (`@blips/ai/components/code-block`).

## Import

```tsx
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
  getStatusBadge,
  toolStatusLabels,
  type ToolPart,
  type ToolStatusLabels,
} from "@blips/ai/components/tool";
```

## Peers exigidos

- `shiki` (o `ToolInput`/`ToolOutput` usam o `CodeBlock`, que importa o Shiki
  em runtime): `pnpm add shiki`.
- `ai`: peer opcional e só de tipos (`ToolPart` = `ToolUIPart |
  DynamicToolUIPart`), nenhum código de runtime. Como a @blips/ai publica o
  fonte `.tsx`, num projeto TypeScript o compilador precisa resolver esses
  tipos: instale como **devDependency**. No seu código, sempre `import type`.

```bash
pnpm add @blips/ai shiki
pnpm add -D ai
```

## API

| Componente | Props reais | Notas |
|---|---|---|
| `Tool` | props do `Collapsible` da @blips/ui (`open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `className` string ou função de estado) | Moldura `rounded-md border mb-4`, classe `group` (o caret gira com `group-data-open:`). |
| `ToolHeader` | `type` (`` `tool-${nome}` `` ou `"dynamic-tool"`), `state` (`ToolPart["state"]`), `toolName` (obrigatório só com `"dynamic-tool"`, proibido nos outros), `title?: string`, `statusLabels?: Partial<ToolStatusLabels>`, `className?` | Nome exibido = `title` ou o `type` sem o prefixo `tool-` (ou `toolName`). **Não aceita outras props** nem `children`. |
| `ToolContent` | props do `CollapsibleContent` | `space-y-4 p-4`, animação de entrada/saída. |
| `ToolInput` | `input: ToolPart["input"]`, `label?: ReactNode` (padrão "Parâmetros"), mais props de `<div>` | Título + `JSON.stringify(input, null, 2)` em JSON. |
| `ToolOutput` | `output: ToolPart["output"]`, `errorText: ToolPart["errorText"]` (**ambos obrigatórios**, pode ser `undefined`), `label?: ReactNode` (padrão "Resultado"), `errorLabel?: ReactNode` (padrão "Erro"), mais props de `<div>` | Retorna `null` se ambos forem falsy. Objeto → JSON formatado; string → `CodeBlock` com `language="json"`; elemento React → renderizado como está. Título `label` ou `errorLabel`. |
| `getStatusBadge(state, labels?)` | função | `Badge` secundário com ícone + rótulo do estado (`labels` sobrescreve, parcial). |
| `toolStatusLabels` | `ToolStatusLabels` | Rótulos padrão pt-BR por estado. |

Estados e rótulos padrão (pt-BR, trocáveis por `statusLabels`):
`input-streaming` Pendente · `input-available` Executando ·
`approval-requested` Aguardando aprovação · `approval-responded` Respondida ·
`output-available` Concluída · `output-denied` Negada · `output-error` Erro.

## Composição com a @blips/ui

- Vai no `MessageContent` do `Message` da @blips/ui, na ordem das parts, sem
  `Bubble`. Um `Tool` por part.
- Aprovação humana: coloque o `Confirmation` (`confirmation.md`) dentro do
  `ToolContent`, passando `part.approval` e `part.state`.
- Para um resultado amigável em vez de JSON, passe um elemento como `output`
  (ex.: um `Table` da @blips/ui); o `ToolOutput` aplica `[&_table]:w-full`.
- Em eventos próprios (Agno), monte um objeto com a mesma forma:
  `{ type: "dynamic-tool", toolName, state, input, output, errorText }`.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
  type ToolPart,
} from "@blips/ai/components/tool";

export function ChamadaDeFerramenta({ part }: { part: ToolPart }) {
  return (
    <Tool defaultOpen={part.state === "output-error"}>
      {part.type === "dynamic-tool" ? (
        <ToolHeader state={part.state} toolName={part.toolName} type={part.type} />
      ) : (
        <ToolHeader state={part.state} type={part.type} />
      )}
      <ToolContent>
        <ToolInput input={part.input} />
        <ToolOutput errorText={part.errorText} output={part.output} />
      </ToolContent>
    </Tool>
  );
}

export function ToolEstatica() {
  return (
    <Tool>
      <ToolHeader
        state="output-available"
        title="Consultar títulos"
        type="tool-consultar_titulos"
      />
      <ToolContent>
        <ToolInput input={{ contrato: "CT-2026-0412" }} />
        <ToolOutput
          errorText={undefined}
          output={{ emAberto: 2, total: "R$ 3.480,00" }}
        />
      </ToolContent>
    </Tool>
  );
}
```

## Armadilhas

- **Trocar rótulos sem reimplementar.** Os textos padrão já são pt-BR. Para
  outro texto, use `statusLabels` (parcial: só os estados que mudam) e
  `label`/`errorLabel` no `ToolInput`/`ToolOutput`; não remonte o cartão no app.
- **Union discriminada no `ToolHeader`.** Passar `part.type` genérico não
  compila: separe `dynamic-tool` (com `toolName`) das tools estáticas, como
  no exemplo.
- **`output` falsy some.** `0`, `""` ou `false` como resultado fazem o
  `ToolOutput` não renderizar. Embrulhe (`{ valor: 0 }`).
- **`input` em `input-streaming`** pode estar parcial ou `undefined`; o JSON
  mostra o que chegou. Considere não abrir o cartão até `input-available`.
- **Esquecer o `shiki`** quebra o build mesmo que você nunca abra o cartão.
