# Regras da @blips/ai — consulte ao revisar UI de IA

Vale só para apps que declaram (ou têm instalada) a `@blips/ai`: componentes de
interface de agente (conversa, resposta em streaming, raciocínio, ferramentas,
fontes, prompt, efeitos) sobre a `@blips/ui` **v3.x**. O `check.mjs` reporta
estas regras na dimensão **`blips-ai`** e devolve `blipsAi: {version, declared}`
no JSON.

## Fatos (não inverta)

- **Não existe barrel `@blips/ai`.** Os exports são só subpaths:
  `@blips/ai/components/<nome>`, `@blips/ai/fx/<nome>` e `@blips/ai/styles.css`.
  Um barrel puxaria todos os peers opcionais e quebraria quem não os instalou.
  Nunca recomende "importar do pacote raiz".
- **A casca da mensagem é da @blips/ui.** `@blips/ai/components/message`
  reexporta `Message`, `MessageContent`, `MessageAvatar`, `MessageHeader`,
  `MessageFooter` e `MessageGroup` da `@blips/ui` com a mesma identidade. Importar
  `Message` de qualquer um dos dois subpaths é correto. O lado é
  `align="start" | "end"` (`messageAlign(role)`); `from=` não existe.
- **Componentes apresentacionais.** Recebem `parts`/`state`/`status`; o
  mapeamento do AI SDK ou de eventos próprios (AgentOS do Agno) fica no app.
- **Peers opcionais no pacote, obrigatórios no app que importa o componente:**

  | Subpath | Peers |
  | --- | --- |
  | `components/message` | `streamdown`, `@streamdown/{code,math,mermaid,cjk}`, `ai` |
  | `components/reasoning` | `streamdown`, `@streamdown/{code,math,mermaid,cjk}` |
  | `components/code-block` | `shiki` |
  | `components/tool` | `shiki`, `ai` |
  | `components/conversation`, `confirmation`, `context`, `prompt-input` | `ai` |
  | demais (`shimmer`, `suggestion`, `sources`, `chain-of-thought`, `inline-citation`, `fx/*`) | — |

  `ai` é peer opcional **só de tipos** (o pacote não usa runtime dele). Como o
  pacote publica o fonte `.tsx`, o `tsc` do app compila esses arquivos e dá
  TS2307 sem `ai` (verificado): em projeto TypeScript, `pnpm add -D ai`. Só vai
  para `dependencies` se o **código do app** usar runtime do `ai` (ex.:
  `DefaultChatTransport`); o `@ai-sdk/react` já traz o runtime dele. Com
  `node_modules/@blips/ai` presente, o check recalcula a tabela a partir do
  fonte instalado.
- **CSS do Streamdown é exigido** por quem usa `MessageResponse` (`message`) ou
  `ReasoningContent` (`reasoning`): `@import "streamdown/styles.css";` (ou
  `import "streamdown/styles.css"` no JS) e `@source "…/node_modules/streamdown/dist/*.js"`,
  mais um `@source` por plugin instalado (`@streamdown/code`, `math`, `mermaid`,
  `cjk`), como no README do pacote. Esses `@source` são legítimos (conteúdo fora
  da auto-detecção): não reporte como "@source defensivo" (o check já isenta).
- Textos padrão em inglês ("No messages yet", "Thinking...", "Used N sources",
  rótulos do `Tool`) vêm do upstream. Tela pt-BR que não os sobrescreve é
  **aviso** de conteúdo (julgamento), não erro de API.

## Regras

| # | Regra | Como o check acusa | Severidade |
| --- | --- | --- | --- |
| 1 | **Import por subpath.** Nada de `from "@blips/ai"`, caminho interno (`@blips/ai/src/…`, `/dist/…`) ou subpath que não está nos exports | literal | bloqueante |
| 2 | **Peers declarados.** Cada componente importado tem os peers dele em `dependencies`/`devDependencies` do app | mapa por subpath | bloqueante |
| 3 | **`ai` só como tipo.** Tipos do AI SDK (`UIMessage`, `ChatStatus`, `ToolUIPart`…) com `import type` (ou `type` inline) | literal | aviso |
| 3b | Runtime do `ai` (`DefaultChatTransport`…) num arquivo que renderiza componentes da @blips/ai: confirme que é a camada de dados (transport/`useChat`), não lógica dentro de componente | heurística (`verify`) | aviso |
| 4 | **Não recriar bolha/mensagem/lista de chat.** Componente `ChatBubble`/`ChatMessage`/`MessageList`/… que não compõe `Message`/`Bubble` (@blips/ui) nem `Conversation`/`MessageResponse` (@blips/ai) | heurística (`verify`) | aviso → bloqueante se confirmado |
| 4b | Balão/alinhamento por `role === "user"` à mão (`bg-…`, `ms-auto`, `justify-end`, `flex-row-reverse`) | heurística (`verify`) | aviso → bloqueante se confirmado |
| 4c | Rolagem de chat à mão (`scrollIntoView`, `scrollTop = scrollHeight`) em vez de `Conversation` / `MessageScroller` | heurística (`verify`) | aviso |
| 4d | Markdown da resposta com `react-markdown`/`marked`/`markdown-to-jsx`/`markdown-it` em vez de `MessageResponse` | heurística (`verify`) | aviso |
| 4e | Cópia do AI Elements via CLI (`components/ai-elements/*`) convivendo com a @blips/ai | literal | bloqueante |
| 4f | `<Message from=…>` (API do AI Elements) | literal | bloqueante |
| 5 | **Gate de versão.** @blips/ai exige `@blips/ui` ^3 e React 19 | `package.json` | bloqueante |
| 6 | **CSS.** `@import "@blips/ai/styles.css"` presente e **depois** de `@import "@blips/ui/globals.css"` | literal | bloqueante |
| 7 | **CSS do Streamdown** (app importa `message` ou `reasoning`): `@source` do `streamdown/dist` em algum CSS | literal | bloqueante |
| 7b | idem: `streamdown/styles.css` importado (CSS ou JS) | literal | aviso |

"aviso → bloqueante se confirmado": o check é heurístico; o revisor lê o
arquivo e, confirmada a recriação (ex.: um `div` com balão próprio no lugar do
`Bubble`), promove a bloqueante. Um `ChatMessage` do app que **compõe** a casca
oficial (percorre `message.parts` e renderiza `Message` + `Bubble` +
`MessageResponse`) é o padrão certo, não violação: o check já não o acusa.

## Correções que a review deve apontar

| Violação | Correção |
| --- | --- |
| Barrel / caminho interno / subpath inexistente | `@blips/ai/components/<x>` conforme os exports; tabela em `building/SKILL.md` §Componentes de IA |
| Peer faltando | `pnpm add <peers>` (ou `-D ai`); tabela em `installing/references/blips-ai.md` |
| Tipo do `ai` como valor | `import type { UIMessage } from "ai"` |
| Bolha/lista recriada, `from=`, scroll ou markdown à mão | `building/components/ai-chat.md`: `Conversation` + `Message align={messageAlign(role)}` + `Bubble` (usuário) + `MessageResponse` (assistente) |
| Cópia do AI Elements | Trocar os imports por `@blips/ai/components/<x>` e remover `components/ai-elements` |
| CSS fora de ordem/ausente | `@import "@blips/ui/globals.css";` e logo abaixo `@import "@blips/ai/styles.css";` |
| CSS do Streamdown ausente | `@import "streamdown/styles.css";` + `@source "../node_modules/streamdown/dist/*.js";` (e um por plugin instalado; ajuste os `../` até o `node_modules`) |

## Prova (fixtures versionadas)

`scripts/fixtures/ai-pass` (segue as regras) e `scripts/fixtures/ai-fail`
(viola cada uma). Rode a partir da skill:

```bash
node scripts/check.mjs scripts/fixtures/ai-pass   # total: 0
node scripts/check.mjs scripts/fixtures/ai-fail   # 17 achados, todos blips-ai
```
