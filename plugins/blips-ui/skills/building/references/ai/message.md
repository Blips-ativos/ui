# Message (IA): MessageResponse, ações e ramos

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/message`

Camada de IA por cima do `Message` da @blips/ui (`../message.md`): renderiza a
resposta do modelo em markdown com streaming (`MessageResponse`, sobre o
Streamdown), barra de ações (copiar, refazer, avaliar) e navegação entre ramos
de resposta (regenerações). A casca da mensagem **não é recriada**: `Message`,
`MessageContent`, `MessageAvatar`, `MessageHeader`, `MessageFooter` e
`MessageGroup` são reexportados da @blips/ui com a mesma identidade.

## Quando usar (e quando não)

- **Use** para a resposta de um agente/LLM que chega em markdown (títulos,
  listas, tabelas, código, fórmulas, mermaid), com ou sem streaming.
- **Use** `MessageBranch` quando o app guarda várias versões da mesma resposta
  ("1 de 3").
- **Não use** `MessageResponse` para a mensagem do usuário: ela é texto puro e
  vai num `Bubble` da @blips/ui (`../bubble.md`).
- **Não use** para chat humano-humano (suporte, comentários): fica só com
  `Message` + `Bubble` da @blips/ui, sem Streamdown.
- Status "Pensando…" é `Shimmer` (`shimmer.md`) ou `Marker` da @blips/ui; o
  raciocínio do modelo é o `Reasoning`; chamadas de ferramenta, o `Tool`.

## Peers exigidos

`streamdown` + `@streamdown/code` + `@streamdown/math` + `@streamdown/mermaid` +
`@streamdown/cjk`. O arquivo importa os quatro plugins no nível do módulo:
importar `@blips/ai/components/message` **sem** eles instalados quebra o build,
mesmo que você só use `MessageAction`.

```bash
pnpm add @blips/ai streamdown @streamdown/code @streamdown/math @streamdown/mermaid @streamdown/cjk
pnpm add -D ai
```

`ai` é peer opcional e só de tipos: o arquivo importa `UIMessage` (em
`messageAlign`), nenhum código de runtime. Como a @blips/ai publica o fonte
`.tsx`, num projeto TypeScript o compilador do app precisa resolver esse tipo:
instale como **devDependency** (`pnpm add -D ai`). Sem ele, o build/`tsc`
acusa `Cannot find module 'ai'` dentro de `@blips/ai/src/components/message.tsx`.

### Estilos do Streamdown

Quem usa o `MessageResponse` precisa importar o CSS do Streamdown e fazer o
Tailwind do app varrer o `dist` do Streamdown e dos plugins (as classes que
ele gera não estão no `@blips/ai/styles.css`). Ajuste os `../` conforme a
posição do seu CSS em relação ao `node_modules`:

```css
@import "@blips/ui/globals.css";
@import "@blips/ai/styles.css";
@import "streamdown/styles.css";
@import "katex/dist/katex.min.css"; /* pnpm add katex: o @streamdown/math é sempre carregado e não injeta o CSS do KaTeX */
@source "../node_modules/streamdown/dist/*.js";
@source "../node_modules/@streamdown/code/dist/*.js";
@source "../node_modules/@streamdown/math/dist/*.js";
@source "../node_modules/@streamdown/mermaid/dist/*.js";
@source "../node_modules/@streamdown/cjk/dist/*.js";
```

## API

Reexports da @blips/ui (props em `../message.md`): `Message` (`align: "start" |
"end"`), `MessageAvatar`, `MessageContent`, `MessageHeader`, `MessageFooter`,
`MessageGroup`. O tipo `MessageProps` do AI Elements **não** é exportado: use
`ComponentProps<typeof Message>`.

| Export | Props | Notas |
|---|---|---|
| `messageAlign(role)` | `role: UIMessage["role"]` → `"start" \| "end"` | `"user"` → `"end"`; `assistant`/`system` → `"start"`. Substitui o `from={role}` do upstream. |
| `MessageResponse` | Props do `Streamdown` (`children: string`, `isAnimating`, `mode`, `parseIncompleteMarkdown`, `components`, `controls`, `caret`, `shikiTheme`, `className`…) | Plugins `cjk`, `code`, `math`, `mermaid` já ligados. `memo` que só re-renderiza quando `children` ou `isAnimating` mudam. |
| `MessageActions` | `ComponentProps<"div">` | Linha `flex items-center gap-1` (`data-slot="message-actions"`). |
| `MessageAction` | Props do `Button` + `tooltip?: string`, `label?: string` | Padrão `variant="ghost"`, `size="icon-sm"`. `label` (ou `tooltip`) vira texto `sr-only`. Com `tooltip`, envolve num `Tooltip` com `TooltipTrigger render={button}`. |
| `MessageToolbar` | `ComponentProps<"div">` | Linha `mt-4 flex justify-between` para ações + seletor de ramo. |
| `MessageBranch` | `HTMLAttributes<HTMLDivElement>` + `defaultBranch?: number` (0), `onBranchChange?: (index) => void` | Provider dos ramos. |
| `MessageBranchContent` | `HTMLAttributes<HTMLDivElement>` | Cada filho **elemento** é um ramo; mostra só o atual. Dê `key` a cada filho. |
| `MessageBranchSelector` | Props do `ButtonGroup` | Some (retorna `null`) com 1 ramo só. |
| `MessageBranchPrevious` / `MessageBranchNext` | Props do `Button` | Ícones `CaretLeftIcon`/`CaretRightIcon`; `aria-label` "Ramo anterior"/"Próximo ramo". Navegação circular. |
| `MessageBranchPage` | Props do `ButtonGroupText` | Mostra "1 de 3"; `children` substitui o texto. |

## Composição com a @blips/ui

- O lado vem do `align` do `Message` (`data-align`), não de classe `.is-user`:
  `<Message align={messageAlign(m.role)}>`.
- Usuário: `Bubble` (padrão `bg-primary`) dentro do `MessageContent`. O
  `MessageContent` não pinta balão nenhum.
- Assistente: `MessageResponse` direto no `MessageContent` (sem balão, como
  ChatGPT/Claude) ou dentro de `Bubble variant="ghost"` se quiser o alinhamento
  de header/footer do Bubble.
- Ações e toolbar ganham `data-slot`, então com `align="end"` o `MessageContent`
  da @blips/ui as alinha à direita sozinho.
- Densidade é a da @blips/ui (`text-xs/relaxed`), não a `text-sm` do AI Elements.

## Exemplo v3

```tsx
"use client";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
  messageAlign,
} from "@blips/ai/components/message";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import {
  ArrowClockwiseIcon,
  CopyIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";

const versoes = [
  "O boleto de **novembro** vence em `10/11/2026`, no valor de R$ 1.240,00.",
  "Seu próximo vencimento é **10/11/2026**:\n\n| Parcela | Valor |\n|---|---|\n| 12/36 | R$ 1.240,00 |",
];

export function RespostaDoAgente({ transmitindo }: { transmitindo: boolean }) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <Message align={messageAlign("user")}>
        <MessageContent>
          <Bubble>
            <BubbleContent>Quando vence meu próximo boleto?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>

      <Message align={messageAlign("assistant")}>
        <MessageContent>
          <MessageBranch>
            <MessageBranchContent>
              {versoes.map((texto) => (
                <MessageResponse isAnimating={transmitindo} key={texto}>
                  {texto}
                </MessageResponse>
              ))}
            </MessageBranchContent>
            <MessageToolbar>
              <MessageActions>
                <MessageAction label="Copiar" tooltip="Copiar resposta">
                  <CopyIcon />
                </MessageAction>
                <MessageAction label="Gerar de novo" tooltip="Gerar de novo">
                  <ArrowClockwiseIcon />
                </MessageAction>
                <MessageAction label="Resposta útil" tooltip="Resposta útil">
                  <ThumbsUpIcon />
                </MessageAction>
              </MessageActions>
              <MessageBranchSelector>
                <MessageBranchPrevious />
                <MessageBranchPage />
                <MessageBranchNext />
              </MessageBranchSelector>
            </MessageToolbar>
          </MessageBranch>
        </MessageContent>
      </Message>
    </div>
  );
}
```

## Armadilhas

- **Não existe `from`**: `<Message from="user">` não compila. Use
  `align={messageAlign(role)}`.
- **Não importe `Message` de dois lugares** pensando que são diferentes: o de
  `@blips/ai/components/message` é o mesmo da @blips/ui. Escolha um import por
  arquivo.
- **Não recrie o balão do usuário** com `div bg-secondary rounded px-4 py-3`
  (era o visual do upstream): é `Bubble`.
- `MessageResponse` é memoizado só por `children` e `isAnimating`: trocar
  `className`, `components` ou `controls` depois do primeiro render **não**
  re-renderiza. Defina essas props estáveis desde o início (ou mude a `key`).
- Passe `isAnimating` enquanto o texto ainda chega (`status === "streaming"` na
  última mensagem) e `false` depois; sem isso o caret/animação do Streamdown
  não liga nem desliga.
- `MessageBranchContent` ignora nós que não são elemento (texto solto, `null`,
  `false`): só conta como ramo o que for JSX.
- `MessageAction` é um `Button` Base UI: troca de elemento com `render`, nunca
  `asChild`.
- **Markdown sem estilo** (tabelas, blocos de código e controles do
  Streamdown sem as classes do Tailwind): faltou o
  `@import "streamdown/styles.css"` ou os `@source` do `dist` do Streamdown e
  dos plugins (seção "Estilos do Streamdown").
- O pacote é apresentacional: transforme `UIMessage.parts` em JSX no app (ver
  `../../components/ai-chat.md`); `MessageResponse` recebe a string do part
  `text`, não o `UIMessage`.
