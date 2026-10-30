# Commit

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/commit`

Cartão recolhível de um commit git: cabeçalho clicável com avatar de iniciais,
mensagem, hash, autor e data relativa em pt-BR ("ontem", "há 3 dias"), ações
(copiar o hash) e, aberto, a lista de arquivos com status `A`/`M`/`D`/`R`
colorido e contagem de linhas `+`/`-`. Tudo é composição: você monta o
cabeçalho e as linhas. Adaptado do `commit` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** quando o agente de código faz ou propõe um commit, ou para mostrar
  o histórico recente que ele consultou.
- **Não use** para o diff de um arquivo: `CodeBlock` (`code-block.md`) com
  `language="diff"`.
- **Não use** para uma árvore de arquivos navegável: `FileTree`
  (`file-tree.md`).
- **Não use** para o resultado de testes/CI desse commit: `TestResults`
  (`test-results.md`).

## Peers exigidos

Nenhum além da @blips/ai (usa `Avatar`, `Button`, `Collapsible` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as parts com o AI
SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Exports: `Commit`, `CommitHeader`, `CommitInfo`, `CommitMessage`,
`CommitMetadata`, `CommitHash`, `CommitSeparator`, `CommitTimestamp`,
`CommitAuthor`, `CommitAuthorAvatar`, `CommitActions`, `CommitCopyButton`,
`CommitContent`, `CommitFiles`, `CommitFile`, `CommitFileInfo`,
`CommitFileStatus`, `CommitFileIcon`, `CommitFilePath`, `CommitFileChanges`,
`CommitFileAdditions`, `CommitFileDeletions` e os tipos `*Props` de cada um.

| Componente | Props reais | Notas |
|---|---|---|
| `Commit` | props do `Collapsible` (`open`, `defaultOpen`, `onOpenChange`…) | `rounded-lg border bg-background`. **Começa fechado.** |
| `CommitHeader` | props do `CollapsibleTrigger` | Trigger renderizado como **`<div>`** (`nativeButton={false}`), `flex justify-between gap-4 p-3`, para poder conter botões. |
| `CommitAuthor` | props de `<div>` | `flex items-center` (envolve o avatar). |
| `CommitAuthorAvatar` | props do `Avatar` da @blips/ui + `initials: string` (obrigatório) | `size-8`, só `AvatarFallback` com as iniciais (não há imagem). |
| `CommitInfo` | props de `<div>` | `flex flex-1 flex-col`: mensagem em cima, metadados embaixo. |
| `CommitMessage` | props de `<span>` | `font-medium text-sm`. |
| `CommitMetadata` | props de `<div>` | `flex gap-2 text-muted-foreground text-xs`. |
| `CommitHash` | props de `<span>` | `GitCommitIcon` + `children` em `font-mono text-xs`. |
| `CommitSeparator` | props de `<span>` | `children` ou `"•"`. |
| `CommitTimestamp` | props de `<time>` + `date: Date` (obrigatório) | Data relativa em dias (`Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" })`), calculada **só no cliente** (vazio no SSR). `dateTime` ISO. `children` substitui. |
| `CommitActions` | props de `<div>` | `role="group"`; para a propagação de clique/tecla, então os botões dentro não abrem/fecham o cartão. |
| `CommitCopyButton` | props do `Button` + `hash: string` (obrigatório), `onCopy?: () => void`, `onError?: (error: Error) => void`, `timeout?: number` (`2000`), `copyLabel?: string` (`"Copiar hash do commit"`), `copiedLabel?: string` (`"Copiado"`) | Ghost `size-7`, `CopyIcon` → `CheckIcon`. `aria-label` = `copyLabel`/`copiedLabel` quando não há `children`. Sem clipboard, chama `onError`. |
| `CommitContent` | props do `CollapsibleContent` | `border-t p-3`. |
| `CommitFiles` | props de `<div>` | `space-y-1`. |
| `CommitFile` | props de `<div>` | Linha `flex justify-between`, `hover:bg-muted/50`. |
| `CommitFileInfo` | props de `<div>` | `flex min-w-0 gap-2` (status, ícone, caminho). |
| `CommitFileStatus` | props de `<span>` + `status: "added" \| "modified" \| "deleted" \| "renamed"` (obrigatório) | Letra `A`/`M`/`D`/`R` (ou `children`) em verde/amarelo/vermelho/azul. |
| `CommitFileIcon` | props do `FileIcon` do Phosphor | `size-3.5 text-muted-foreground`. |
| `CommitFilePath` | props de `<span>` | `truncate font-mono text-xs`. |
| `CommitFileChanges` | props de `<div>` | `flex gap-1 font-mono text-xs`. |
| `CommitFileAdditions` | props de `<span>` + `count: number` (obrigatório) | `+N` verde; **não renderiza com `count <= 0`**. |
| `CommitFileDeletions` | props de `<span>` + `count: number` (obrigatório) | `-N` vermelho; não renderiza com `count <= 0`. |

## Composição com a @blips/ui

- É um `Collapsible` da @blips/ui v3; o avatar é o `Avatar` e o botão de
  copiar é o `Button`. Estado aberto: `data-panel-open` no `CommitHeader`
  (já tem `group`).
- Vários commits: pilha `flex flex-col gap-2`, um `Commit` por item.
- Confirmação de cópia: `toast` da @blips/ui em `onCopy`.
- Num chat: no `MessageContent` do `Message` da @blips/ui, depois do
  `MessageResponse` que resume a mudança. Quem usa o `MessageResponse` instala os peers do Streamdown e, no CSS
  global, importa `streamdown/styles.css` e `katex/dist/katex.min.css` e
  declara `@source` do `dist` do `streamdown` e dos plugins `@streamdown/*`
  (setup em `message.md`).

## Exemplo v3 que compila

```tsx
"use client";

import {
  Commit,
  CommitActions,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileIcon,
  CommitFileInfo,
  CommitFilePath,
  CommitFileStatus,
  CommitFiles,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from "@blips/ai/components/commit";

type Arquivo = {
  caminho: string;
  status: "added" | "modified" | "deleted" | "renamed";
  adicoes: number;
  remocoes: number;
};

export function CommitDoAgente({
  hash,
  mensagem,
  autor,
  data,
  arquivos,
}: {
  hash: string;
  mensagem: string;
  autor: { nome: string; iniciais: string };
  data: Date;
  arquivos: Arquivo[];
}) {
  return (
    <Commit>
      <CommitHeader>
        <CommitAuthor>
          <CommitAuthorAvatar initials={autor.iniciais} />
        </CommitAuthor>
        <CommitInfo>
          <CommitMessage>{mensagem}</CommitMessage>
          <CommitMetadata>
            <CommitHash>{hash.slice(0, 7)}</CommitHash>
            <CommitSeparator />
            <span>{autor.nome}</span>
            <CommitSeparator />
            <CommitTimestamp date={data} />
          </CommitMetadata>
        </CommitInfo>
        <CommitActions>
          <CommitCopyButton hash={hash} />
        </CommitActions>
      </CommitHeader>
      <CommitContent>
        <CommitFiles>
          {arquivos.map((arquivo) => (
            <CommitFile key={arquivo.caminho}>
              <CommitFileInfo>
                <CommitFileStatus status={arquivo.status} />
                <CommitFileIcon />
                <CommitFilePath>{arquivo.caminho}</CommitFilePath>
              </CommitFileInfo>
              <CommitFileChanges>
                <CommitFileAdditions count={arquivo.adicoes} />
                <CommitFileDeletions count={arquivo.remocoes} />
              </CommitFileChanges>
            </CommitFile>
          ))}
        </CommitFiles>
      </CommitContent>
    </Commit>
  );
}
```

## Armadilhas

- **Começa fechado** (padrão do Collapsible): passe `defaultOpen` para já
  mostrar os arquivos.
- **Botões fora de `CommitActions` abrem/fecham o cartão** ao clicar: o
  cabeçalho inteiro é o trigger. Ponha toda ação dentro de `CommitActions`.
- **`CommitTimestamp` vem vazio no primeiro render** (SSR/hidratação) e só
  mostra a data depois do efeito; a granularidade é sempre **dias** ("hoje",
  "ontem", "há 40 dias"), nunca horas. Para outro formato, passe `children`.
- **`date` é `Date`**, não string: converta com `new Date(iso)`.
- **`date` igual no servidor e no cliente.** O `dateTime` (ISO) sai no SSR:
  uma data calculada no render com `Date.now()` (ex.: "ontem" =
  `new Date(Date.now() - dia)`) muda em milissegundos entre servidor e
  cliente e gera aviso de hidratação. Use a data real do commit (vinda da
  API) ou arredonde ao dia.
- `CommitFileAdditions`/`CommitFileDeletions` com `0` não aparecem (sem
  `+0`).
- As cores de status e de `+`/`-` usam paleta Tailwind fixa (verde, vermelho,
  amarelo, azul), não tokens: é intencional, como no upstream.
- `CommitAuthorAvatar` só tem fallback de iniciais; para foto, use
  `Avatar` + `AvatarImage` da @blips/ui direto dentro de `CommitAuthor`.
