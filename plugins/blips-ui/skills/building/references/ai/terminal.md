# Terminal

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/terminal`

Saída de terminal em painel escuro (`bg-zinc-950`, nos dois temas): cabeçalho
com título e ícone, status enquanto roda, botões de copiar e limpar, e a
saída em `<pre>` com **cores ANSI** renderizadas (`ansi-to-react`), cursor
piscando durante o streaming e rolagem automática para o fim. Sem `children`,
monta o layout padrão. Adaptado do `terminal` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para a saída de um comando que o agente executou (build, testes,
  `pip install`, script), inclusive em streaming, e para logs com cor.
- **Use** também para traceback Python ou de outras linguagens, que o
  `StackTrace` não sabe interpretar.
- **Não use** para o código que foi executado: isso é o `CodeBlock`
  (`code-block.md`). Código + saída juntos: `Sandbox` (`sandbox.md`) com o
  `Terminal` numa aba.
- **Não use** para um comando que o usuário vai copiar e rodar: isso é o
  `Snippet` (`snippet.md`).
- **Não use** para resultado estruturado de testes: isso é o `TestResults`
  (`test-results.md`); o `Terminal` mostra a saída crua.
- **Não use** como terminal interativo: não há entrada, só exibição.

## Import

```tsx
import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from "@blips/ai/components/terminal";
```

## Peers exigidos

- `ansi-to-react` (import estático no arquivo do componente, licença
  BSD-3-Clause): sem ele, o build quebra com módulo não encontrado em
  `node_modules/@blips/ai/src/components/terminal.tsx`, mesmo que a saída não
  tenha cor.

```bash
pnpm add @blips/ai ansi-to-react
```

Faixa aceita pelo pacote: `ansi-to-react ^6`. O componente não importa `ai`.

Se o seu código usar tipos do AI SDK, `ai` é peer opcional só de tipos
(sempre `import type`, sem runtime): num projeto TypeScript, instale como
**devDependency** (`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.
## API

| Componente | Props reais | Notas |
|---|---|---|
| `Terminal` | `HTMLAttributes<HTMLDivElement>` + `output: string` (obrigatório), `isStreaming?: boolean` (padrão `false`), `autoScroll?: boolean` (padrão `true`), `onClear?: () => void` | Raiz e contexto, `rounded-lg border bg-zinc-950 text-zinc-100`. **Sem `children`**: header (título, status, copiar, limpar se houver `onClear`) + conteúdo. **Com `children`**: só eles. |
| `TerminalHeader` | `HTMLAttributes<HTMLDivElement>` | Faixa `justify-between` com borda inferior. |
| `TerminalTitle` | `HTMLAttributes<HTMLDivElement>` | `TerminalWindowIcon` + `children` (padrão `"Terminal"`). |
| `TerminalStatus` | `HTMLAttributes<HTMLDivElement>` | Só aparece com `isStreaming`; **vazio por padrão**: passe o conteúdo (ex.: `Spinner` + "Executando"). |
| `TerminalActions` | `HTMLAttributes<HTMLDivElement>` | Grupo de botões. |
| `TerminalCopyButton` | props do `Button` da @blips/ui + `onCopy?`, `onError?: (error: Error) => void`, `timeout?: number` (padrão `2000`), `copyLabel?: string` (padrão `"Copiar saída"`), `copiedLabel?: string` (padrão `"Copiado"`) | Copia `output` (com os códigos ANSI). Sem Clipboard API: `onError` com `"Área de transferência indisponível"`. |
| `TerminalClearButton` | props do `Button` + `label?: string` (padrão `"Limpar terminal"`) | Chama `onClear` da raiz; **some sem `onClear`**. |
| `TerminalContent` | `HTMLAttributes<HTMLDivElement>` | `max-h-96 overflow-auto`, rola ao fim a cada mudança de `output` (se `autoScroll`). Sem `children`: `<pre>` com `<Ansi>` + cursor no streaming. |

Todos os tipos de props são exportados (`TerminalProps`,
`TerminalHeaderProps`, …, `TerminalContentProps`).

## Composição com a @blips/ui

- Status: `Spinner` da @blips/ui (`../spinner.md`) + texto dentro do
  `TerminalStatus`.
- Dentro de uma tool call de execução, ponha o `Terminal` como `output` do
  `ToolOutput` (elemento React é renderizado como está) ou numa aba do
  `Sandbox`.
- Altura: troque `max-h-96` por `className="max-h-[…]"` no `TerminalContent`
  (composto) quando o painel tiver altura própria.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from "@blips/ai/components/terminal";
import { Spinner } from "@blips/ui/components/spinner";
import { useState } from "react";

const saidaInicial =
  "$ make check\n\u001b[32m✓\u001b[0m ruff check\n\u001b[32m✓\u001b[0m mypy src\n\u001b[33m!\u001b[0m pytest: 1 teste ignorado\n";

export function SaidaDoComando({ emExecucao }: { emExecucao: boolean }) {
  const [saida, setSaida] = useState(saidaInicial);

  return (
    <Terminal
      isStreaming={emExecucao}
      onClear={() => setSaida("")}
      output={saida}
    >
      <TerminalHeader>
        <TerminalTitle>blips-salvador</TerminalTitle>
        <div className="flex items-center gap-2">
          <TerminalStatus>
            <Spinner className="size-3" />
            Executando
          </TerminalStatus>
          <TerminalActions>
            <TerminalCopyButton />
            <TerminalClearButton />
          </TerminalActions>
        </div>
      </TerminalHeader>
      <TerminalContent />
    </Terminal>
  );
}
```

## Armadilhas

- **Esquecer o `ansi-to-react`** quebra o build mesmo para saída sem cor.
- **`output` é a saída inteira, não o pedaço.** No streaming, acumule no app
  (`setSaida((s) => s + pedaco)`) e passe a string completa; o componente não
  concatena.
- **`isStreaming` precisa voltar a `false`** ao fim do comando, senão o
  cursor pisca para sempre e o `TerminalStatus` não some.
- **Escuro nos dois temas, cores `zinc` fixas.** É proposital (aparência de
  terminal); não troque por tokens da @blips/ui achando que é bug. Botões
  extras no header precisam das mesmas classes (`text-zinc-400
  hover:bg-zinc-800 hover:text-zinc-100`) para não sumirem no fundo.
- **Saída enorme trava a aba.** Tudo é renderizado (sem virtualização);
  mantenha só as últimas N linhas no estado do app para logs longos.
- **Copiar leva os códigos ANSI** junto da saída (é a string crua); remova-os
  no app se o destino for texto puro.
- **`onClear` inline muda o contexto a cada render**; tudo bem para uso
  normal, mas para saída em alta frequência memoize com `useCallback`.
