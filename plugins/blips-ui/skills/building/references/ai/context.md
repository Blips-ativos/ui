# Context (uso da janela de contexto)

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/context`

Indicador de quanto da janela de contexto do modelo a conversa já ocupa: um
botão com a porcentagem e um anel de progresso que, ao passar o mouse, abre um
cartão com tokens usados/total, barra de progresso, detalhamento por entrada,
saída, raciocínio e cache, e custo estimado em USD (via `tokenlens`).

## Quando usar (e quando não)

- **Use** em telas de agente para gente técnica (playground, console interno,
  depuração de prompt) onde o consumo de tokens importa.
- **Não use** em chat para cliente final: porcentagem de contexto e custo em
  dólar não dizem nada para quem pergunta do boleto.
- **Não use** como barra de progresso genérica: isso é `Progress` da @blips/ui.
- **Não use** como fonte de custo oficial: o preço vem do catálogo embutido do
  `tokenlens`, não da fatura. Custo real de LLM na Blips está no LiteLLM.

## Peers exigidos

Nenhum peer de runtime. `tokenlens` é dependência da @blips/ai.

`ai` é peer opcional e só de tipos (`LanguageModelUsage`), nenhum código de
runtime. Como a @blips/ai publica o fonte `.tsx`, num projeto TypeScript
instale como **devDependency** para o compilador resolver o tipo:

```bash
pnpm add @blips/ai
pnpm add -D ai
```

## API

| Export | Props | Notas |
|---|---|---|
| `Context` | Props do `HoverCard` da @blips/ui (Base UI `PreviewCard.Root`: `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`) + `usedTokens: number`, `maxTokens: number`, `usage?: LanguageModelUsage`, `modelId?: string` | Provider dos dados. **Não** aceita `openDelay`/`closeDelay`. |
| `ContextTrigger` | Props do `Button` + `delay?: number` (0), `closeDelay?: number` (0) | Sem `children`: o próprio `Button` (`variant="ghost"`) vira o trigger, com "% usado" + anel. Com `children`: conteúdo dentro do trigger padrão (`<a>`) e as props de `Button` são ignoradas. |
| `ContextContent` | Props do `HoverCardContent` (`side`, `sideOffset`, `align`, `alignOffset`, `className` string ou função) | `min-w-60 divide-y p-0`. Vai num Portal. |
| `ContextContentHeader` | `ComponentProps<"div">` | Padrão: porcentagem, `usados / total` compacto e `Progress`. `children` substitui. |
| `ContextContentBody` | `ComponentProps<"div">` | `p-3`; coloque as linhas de uso aqui. |
| `ContextContentFooter` | `ComponentProps<"div">` | Padrão: "Total cost" + custo total em USD (`bg-secondary`). `children` substitui. |
| `ContextInputUsage` | `ComponentProps<"div">` | Linha "Input": `usage.inputTokens` + custo. Some se for 0. |
| `ContextOutputUsage` | `ComponentProps<"div">` | Linha "Output": `usage.outputTokens`. Some se for 0. |
| `ContextReasoningUsage` | `ComponentProps<"div">` | Linha "Reasoning": `usage.outputTokenDetails.reasoningTokens`. Some se for 0. |
| `ContextCacheUsage` | `ComponentProps<"div">` | Linha "Cache": `usage.inputTokenDetails.cacheReadTokens`. Some se for 0. |

`usage` segue o `LanguageModelUsage` do AI SDK 6/7 (`inputTokens`,
`outputTokens`, `outputTokenDetails.reasoningTokens`,
`inputTokenDetails.cacheReadTokens`). Com eventos próprios (AgentOS/LiteLLM),
monte esse objeto no app a partir das métricas do run.

## Composição com a @blips/ui

- Por baixo: `HoverCard` (PreviewCard), `Progress` e `Button` da @blips/ui.
- Lugar natural: `PromptInputTools` (`prompt-input.md`) ou o cabeçalho da tela
  do chat, ao lado do seletor de modelo.
- Para o cartão inteiro em pt-BR, passe `children` em `ContextContentFooter` e
  nas linhas de uso, formatando com `Intl.NumberFormat("pt-BR")`. Atenção: nas
  linhas de uso (`ContextInputUsage` etc.), `children` substitui a linha
  inteira, sem a `<div>` de layout (`className` e demais props são
  ignorados) e sem a regra de sumir com 0: monte a linha completa (ex.:
  `<div className="flex items-center justify-between text-xs">`). No
  `ContextContentFooter`/`ContextContentHeader` a `<div>` com as classes se
  mantém.

## Exemplo v3

```tsx
"use client";

import {
  Context,
  ContextCacheUsage,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextTrigger,
} from "@blips/ai/components/context";
import type { LanguageModelUsage } from "ai";

const tokens = new Intl.NumberFormat("pt-BR", { notation: "compact" });

export function UsoDeContexto({
  usage,
  maxTokens,
}: {
  usage: LanguageModelUsage;
  maxTokens: number;
}) {
  const usados = (usage.inputTokens ?? 0) + (usage.outputTokens ?? 0);

  return (
    <Context
      maxTokens={maxTokens}
      modelId="openai:gpt-4.1"
      usage={usage}
      usedTokens={usados}
    >
      <ContextTrigger aria-label="Uso da janela de contexto" size="sm" />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody className="space-y-1">
          <ContextInputUsage />
          <ContextOutputUsage />
          <ContextReasoningUsage />
          <ContextCacheUsage />
        </ContextContentBody>
        <ContextContentFooter>
          <span className="text-muted-foreground">Tokens na conversa</span>
          <span>{tokens.format(usados)}</span>
        </ContextContentFooter>
      </ContextContent>
    </Context>
  );
}
```

## Armadilhas

- Rótulos e números padrão estão em **inglês e en-US/USD** ("Total cost",
  "Input", "$0.00", "12.5%"). Em tela pt-BR, sobrescreva com `children`
  (footer e linhas) ou aceite conscientemente.
- **Custo `$0.00`** quando não há `modelId` ou quando o id não existe no
  catálogo do `tokenlens`, o que é o caso dos nomes de deployment do LiteLLM
  (ex.: `salvador-default`). O formato é `provedor:modelo` com dois-pontos
  (`openai:gpt-4.1`, `anthropic:claude-sonnet-4-20250514`; o `tokenlens` 1.3
  também resolve `openai/gpt-4.1`), e modelos recentes podem não estar no
  catálogo (em 2026-10, `anthropic:claude-sonnet-4-5` não resolvia).
  Confira o custo antes de exibir, ou esconda o rodapé.
- `maxTokens` é seu: o componente não sabe o tamanho da janela do modelo.
  `maxTokens={0}` gera `∞%` (ou `NaN%` com `usedTokens={0}`) e quebra o anel.
- `usedTokens` também é seu: decida se conta só a entrada do último turno
  (o que de fato ocupa a janela) ou entrada + saída.
- Os campos antigos `usage.reasoningTokens` / `usage.cachedInputTokens` (AI
  SDK 5) não são lidos: use os `*TokenDetails`.
- Componentes filhos fora de `<Context>` lançam "Context components must be used
  within Context".
- Não confunda com o `Context` do React: o nome vem do AI Elements. Num arquivo
  que também usa `createContext`, renomeie no import se ajudar a leitura
  (`import { Context as UsoDeContexto }`).
