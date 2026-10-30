# StackTrace

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/stack-trace`

Stack trace de erro **JavaScript/Node** em cartão recolhível: cabeçalho com
tipo e mensagem do erro (extraídos da primeira linha), ações (copiar o trace
inteiro, caret de expandir) e a lista de frames com caminho clicável e frames
internos (`node_modules`, `node:`) esmaecidos. O componente recebe a string
crua (`error.stack`) e faz o parse sozinho. Adaptado do `stack-trace` do AI
Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para um erro que o agente encontrou ao rodar código JS/TS (teste,
  build, sandbox Node) ou que o app quer mostrar para quem depura, com
  clique no arquivo para abrir no editor/visualizador.
- **Não use** para traceback **Python** (o formato dos agentes Agno) ou de
  outras linguagens: o parser só reconhece linhas `at …` do V8; um traceback
  Python vira só a primeira linha como mensagem e "Nenhum frame na pilha".
  Mostre-o no `Terminal` (`terminal.md`) ou num `CodeBlock`
  (`code-block.md`).
- **Não use** para o erro de uma tool call no chat: o `ToolOutput` já mostra
  `errorText` (`tool.md`).
- **Não use** para mensagem de erro para o usuário final: isso é `Alert`
  (`../alert.md`) ou `Empty`, em linguagem de produto, sem pilha.

## Import

```tsx
import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from "@blips/ai/components/stack-trace";
```

## Peers exigidos

Nenhum além da @blips/ai (usa `Button` e `Collapsible` da @blips/ui e
`@phosphor-icons/react`). **Não usa `ansi-to-react`**, apesar de a tabela da
spec da fase 2 citá-lo junto do terminal: o arquivo não importa o pacote (nem
no upstream). Códigos de cor ANSI no trace aparecem crus. O componente não
importa `ai`.
Se o seu código usar tipos do AI SDK, `ai` é peer opcional só de tipos
(sempre `import type`, sem runtime): num projeto TypeScript, instale como
**devDependency** (`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

```bash
pnpm add @blips/ai
```

## API

| Componente | Props reais | Notas |
|---|---|---|
| `StackTrace` | `ComponentProps<"div">` + `trace: string` (obrigatório), `open?: boolean`, `defaultOpen?: boolean` (padrão `false`), `onOpenChange?: (open: boolean) => void`, `onFilePathClick?: (filePath: string, line?: number, column?: number) => void` | Raiz e contexto (`rounded-lg border bg-background font-mono text-sm`). Faz o parse de `trace`. **Não renderiza nada sozinho.** Aberto/fechado controlado ou não. |
| `StackTraceHeader` | props do `CollapsibleTrigger` (Base UI) | Trigger renderizado como `<div>` (`render={<div />}`, `nativeButton={false}`), porque contém botões. Clique ou Enter/Espaço alterna. |
| `StackTraceError` | `ComponentProps<"div">` | `WarningIcon` vermelho + `children` (tipo e mensagem). |
| `StackTraceErrorType` | `ComponentProps<"span">` | Tipo extraído (`TypeError`, `Error`…) ou `children`. Vazio se a 1ª linha não for `XError: msg`. |
| `StackTraceErrorMessage` | `ComponentProps<"span">` | Mensagem extraída (truncada numa linha) ou `children`. |
| `StackTraceActions` | `ComponentProps<"div">` | `role="group"`; impede que clique/Enter/Espaço nas ações alternem o cartão. |
| `StackTraceCopyButton` | props do `Button` da @blips/ui + `onCopy?`, `onError?: (error: Error) => void`, `timeout?: number` (padrão `2000`), `copyLabel?: string` (padrão `"Copiar stack trace"`), `copiedLabel?: string` (padrão `"Copiado"`) | Copia o `trace` cru. `aria-label` só sem `children`. Sem Clipboard API: `onError` com `"Área de transferência indisponível"`. |
| `StackTraceExpandButton` | `ComponentProps<"div">` | Só o caret que gira (não é botão: o header inteiro é o gatilho). |
| `StackTraceContent` | props do `CollapsibleContent` + `maxHeight?: number` (padrão `400`, px) | Área rolável com `border-t bg-muted/30`. |
| `StackTraceFrames` | `ComponentProps<"div">` + `showInternalFrames?: boolean` (padrão `true`), `emptyMessage?: ReactNode` (padrão `"Nenhum frame na pilha"`) | Lista os frames; caminho vira botão que chama `onFilePathClick` (desabilitado sem ele). |

Todos os tipos de props são exportados (`StackTraceProps`,
`StackTraceHeaderProps`, …, `StackTraceFramesProps`). O parser não é
exportado.

## Composição com a @blips/ui

- O cartão já usa `Button` (`variant="ghost"`, `size="icon"`) da @blips/ui no
  copiar; para outra ação no header (abrir issue, perguntar ao agente),
  ponha outro `Button` do mesmo jeito dentro do `StackTraceActions`, com
  `aria-label`.
- Num relatório de testes, ele cabe no lugar do `TestErrorStack` do
  `TestResults` (`test-results.md`) quando a falha traz `error.stack`.
- Abrir o arquivo clicado: `onFilePathClick` abre um `Sheet` (`../sheet.md`)
  com o `CodeBlock` do arquivo, destacando a linha.

## Exemplo v3 que compila

```tsx
"use client";

import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from "@blips/ai/components/stack-trace";

const trace = `TypeError: Cannot read properties of undefined (reading 'valor')
    at somarParcelas (src/financeiro/parcelas.ts:42:18)
    at calcularSaldo (src/financeiro/saldo.ts:17:10)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;

export function ErroDoBuild({
  abrirArquivo,
}: {
  abrirArquivo: (caminho: string, linha?: number) => void;
}) {
  return (
    <StackTrace
      defaultOpen
      onFilePathClick={(caminho, linha) => abrirArquivo(caminho, linha)}
      trace={trace}
    >
      <StackTraceHeader>
        <StackTraceError>
          <StackTraceErrorType />
          <StackTraceErrorMessage />
        </StackTraceError>
        <StackTraceActions>
          <StackTraceCopyButton />
          <StackTraceExpandButton />
        </StackTraceActions>
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames showInternalFrames={false} />
      </StackTraceContent>
    </StackTrace>
  );
}
```

## Armadilhas

- **Só formato V8.** Frames precisam começar com `at ` (Chrome/Node). Stack
  do Firefox/Safari (`fn@arquivo:1:2`) e traceback Python ficam sem frames.
  Para backends Python (Agno), mostre o traceback no `Terminal`.
- **Mensagem e frames do runtime ficam em inglês** (vêm do próprio erro);
  só os textos da interface (`emptyMessage`, rótulos do copiar) são pt-BR.
- **Frames repetidos** (recursão) têm o mesmo texto e geram aviso de `key`
  duplicada no console do React; deduplique o `trace` antes se isso
  acontecer muito.
- **`trace` copiado é o cru.** O botão copia exatamente a string recebida,
  inclusive caminhos absolutos da máquina; se o trace vem do servidor, limpe
  dados sensíveis antes de passar.
- **Não aninhe botão sem `StackTraceActions`.** Um botão solto no header
  também alterna o cartão ao ser clicado; o `StackTraceActions` corta a
  propagação.
- **Sem `onFilePathClick`, os caminhos ficam desabilitados** (sublinhado
  pontilhado, sem ação). É o esperado quando não há onde abrir o arquivo.
