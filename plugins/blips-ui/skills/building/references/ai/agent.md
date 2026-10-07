# Agent

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/agent`

Cartão de configuração de um agente: cabeçalho com nome e modelo (`Badge`
mono), instruções (system prompt) num bloco cinza, ferramentas num `Accordion`
da @blips/ui (cada item mostra a descrição e, aberto, o JSON Schema de entrada
num `CodeBlock`) e o schema de saída como TypeScript realçado. Adaptado do
`agent` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para mostrar **como um agente está configurado**: painel de
  administração dos agentes, tela de "sobre este agente", revisão de um
  subagente que o supervisor vai acionar, comparação de versões.
- **Não use** para uma **chamada** de ferramenta durante a conversa (estado,
  argumentos, resultado): isso é `Tool` (`tool.md`).
- **Não use** para o raciocínio ou os passos do run: `Reasoning`
  (`reasoning.md`), `ChainOfThought` (`chain-of-thought.md`) ou `Plan`
  (`plan.md`).
- **Não use** como editor: o componente só exibe. Para editar instruções, use
  `Textarea`/`Field` da @blips/ui num formulário.

## Peers exigidos

- `shiki`: `AgentTool` e `AgentOutput` renderizam o `CodeBlock`
  (`code-block.md`), que importa o Shiki em runtime. Quem importa
  `@blips/ai/components/agent` precisa dele, mesmo sem ferramentas na tela.
- `ai`: peer opcional e **só de tipos** (`Tool`, a prop de `AgentTool`),
  nenhum código de runtime no componente. Como a @blips/ai publica o fonte
  `.tsx`, num projeto TypeScript instale como **devDependency**.

```bash
pnpm add @blips/ai shiki
pnpm add -D ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`.

## API

Exports: `Agent`, `AgentHeader`, `AgentContent`, `AgentInstructions`,
`AgentTools`, `AgentTool`, `AgentOutput` e os tipos `*Props` de cada um.
Todos são `memo`.

| Componente | Props reais | Notas |
|---|---|---|
| `Agent` | props de `<div>` | Moldura `not-prose w-full rounded-md border`. |
| `AgentHeader` | props de `<div>` + `name: string` (obrigatório), `model?: string` | `RobotIcon` + nome; `model` vira `Badge variant="secondary"` em `font-mono`. Não aceita `children` próprios (são ignorados, o conteúdo é fixo). |
| `AgentContent` | props de `<div>` | `space-y-4 p-4 pt-0`. |
| `AgentInstructions` | props de `<div>` + `children: string` (obrigatório), `label?: ReactNode` (`"Instruções"`) | `children` **tem de ser string**: vai num `<p>` dentro do bloco `bg-muted/50`. |
| `AgentTools` | props do `Accordion` da @blips/ui (Base UI: `multiple`, `defaultValue` em **array**, `value`, `onValueChange`) + `className?: string`, `label?: ReactNode` (`"Ferramentas"`) | O `className` vai no `<div>` externo, não no `Accordion` (por isso só string). O `Accordion` recebe `rounded-md border` fixo. |
| `AgentTool` | props do `AccordionItem` + `tool: Tool` (obrigatório), `emptyDescription?: ReactNode` (`"Sem descrição"`) | Passe `value` (identifica o item no `Accordion`). O gatilho mostra `tool.description` **só se for string**; senão, `emptyDescription`. O conteúdo é `JSON.stringify(tool.jsonSchema ?? tool.inputSchema)` num `CodeBlock language="json"`. |
| `AgentOutput` | props de `<div>` + `schema: string` (obrigatório), `label?: ReactNode` (`"Schema de saída"`) | `CodeBlock language="typescript"`: passe o tipo como texto. |

## Composição com a @blips/ui

- É composto de `Accordion`, `AccordionItem`, `AccordionTrigger`,
  `AccordionContent` e `Badge` da @blips/ui v3 (Base UI). O Accordion da v3
  não tem `type="single"`/`collapsible` do Radix: para abrir várias
  ferramentas, `multiple`; para abrir uma de início,
  `defaultValue={["buscar_contratos"]}`.
- Num painel de agentes: um `Agent` por card numa grade, ou dentro de um
  `Sheet` aberto a partir da lista (`components/sheet.md`).
- Ação extra no cabeçalho (editar, duplicar): o `AgentHeader` não aceita
  filhos; envolva-o num `div className="flex items-center justify-between"`
  com um `Button` da @blips/ui ao lado.

## Exemplo v3 que compila

As ferramentas vêm da camada de dados: um módulo que monta os objetos `Tool`
com `tool()`/`jsonSchema()` do AI SDK (se a definição vive num backend Python,
como no Agno, exponha o JSON Schema por API e embrulhe com `jsonSchema()`
ali). O arquivo de UI só importa o **tipo**.

```ts
// agente-tools.ts (camada de dados)
import { jsonSchema, tool } from "ai";

export const ferramentasDoAgente = {
  buscar_contratos: tool({
    description: "Busca os contratos de locação de um cliente pelo CNPJ",
    inputSchema: jsonSchema({
      type: "object",
      properties: { cnpj: { type: "string", description: "CNPJ do cliente" } },
      required: ["cnpj"],
    }),
  }),
  abrir_chamado: tool({
    description: "Abre um chamado de garantia para um equipamento",
    inputSchema: jsonSchema({
      type: "object",
      properties: {
        numeroSerie: { type: "string" },
        defeito: { type: "string" },
      },
      required: ["numeroSerie", "defeito"],
    }),
  }),
};
```

```tsx
// cartao-agente.tsx
"use client";

import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentOutput,
  AgentTool,
  AgentTools,
} from "@blips/ai/components/agent";
import type { Tool } from "ai";

const schemaDeSaida = `type Resposta = {
  resumo: string
  chamadoAberto?: string
}`;

export function CartaoAgente({
  instrucoes,
  ferramentas,
}: {
  instrucoes: string;
  ferramentas: Record<string, Tool>;
}) {
  return (
    <Agent>
      <AgentHeader model="anthropic/claude-sonnet-4-5" name="Agente de suporte" />
      <AgentContent>
        <AgentInstructions>{instrucoes}</AgentInstructions>
        <AgentTools multiple>
          {Object.entries(ferramentas).map(([nome, ferramenta]) => (
            <AgentTool key={nome} tool={ferramenta} value={nome} />
          ))}
        </AgentTools>
        <AgentOutput schema={schemaDeSaida} />
      </AgentContent>
    </Agent>
  );
}
```

## Armadilhas

- **`shiki` é obrigatório** para este import, mesmo que o cartão não mostre
  ferramentas nem schema: o módulo importa o `CodeBlock` estaticamente.
- **`AgentInstructions` só aceita string.** JSX como filho não compila; para
  instruções longas com markdown, use `MessageResponse` (`message.md`) fora
  do componente.
- **`tool.description` como função não aparece.** Na versão atual do AI SDK a
  descrição pode ser função (resolvida no run); o componente só exibe string
  e cai em `emptyDescription`. Resolva a descrição antes de passar.
- **Accordion da v3:** `defaultValue="abrir_chamado"` (string) não abre nada;
  use array. E não existe `type="single"`.
- **Duas cópias do `ai`** (monorepo com versões diferentes) fazem o `Tool` de
  uma não casar com o da outra: alinhe a versão do `ai` no workspace. O site
  de docs da Blips contorna isso com `as AgentToolProps["tool"]`; num app com
  uma cópia só, o objeto do `tool()` serve direto.
- O `className` do `AgentTools` vai no wrapper, não no `Accordion`; a borda do
  accordion é fixa.
- `"use client"`: os subcomponentes usam o `Accordion` (Base UI).
