# Artifact

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/artifact`

Painel de um artefato gerado pelo agente (documento, código, relatório,
prévia): moldura com cabeçalho cinza (título, descrição, ações de ícone com
tooltip, botão de fechar) e área de conteúdo rolável. É só a casca: o
conteúdo é seu. Adaptado do `artifact` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para o resultado **produzido** pelo agente que merece um painel
  próprio, geralmente ao lado do chat: um código gerado, um rascunho de
  e-mail, uma tabela de recebíveis, um relatório.
- **Não use** para um trecho de código no meio da resposta: `CodeBlock`
  (`code-block.md`) dentro do `MessageResponse`.
- **Não use** para prévia de página web com barra de URL: `WebPreview`
  (`web-preview.md`).
- **Não use** como card genérico de app: `Card` da @blips/ui.

## Peers exigidos

Nenhum além da @blips/ai (usa `Button` e `Tooltip` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`. O que você colocar
no conteúdo pode ter peers próprios (ex.: `CodeBlock` → `shiki`).

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as parts com o AI
SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Exports: `Artifact`, `ArtifactHeader`, `ArtifactTitle`, `ArtifactDescription`,
`ArtifactActions`, `ArtifactAction`, `ArtifactClose`, `ArtifactContent` e os
tipos `*Props` de cada um.

| Componente | Props reais | Notas |
|---|---|---|
| `Artifact` | props de `<div>` | `flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm`. Dê altura (`h-full`, `h-[600px]`) para o conteúdo rolar. |
| `ArtifactHeader` | props de `<div>` | `flex items-center justify-between border-b bg-muted/50 px-4 py-3`. |
| `ArtifactTitle` | props de `<p>` | `font-medium text-sm`. |
| `ArtifactDescription` | props de `<p>` | `text-muted-foreground text-sm`. |
| `ArtifactActions` | props de `<div>` | `flex items-center gap-1`. |
| `ArtifactAction` | props do `Button` + `icon?: Icon` (componente Phosphor), `tooltip?: string`, `label?: string` | `variant="ghost"`, `size="sm"`, `size-8 p-0`. Com `icon`, renderiza o ícone (e ignora `children`). Texto `sr-only` = `label` ou, sem ele, `tooltip`. Com `tooltip`, envolve em `TooltipProvider` + `Tooltip` (`TooltipTrigger render={button}`). |
| `ArtifactClose` | props do `Button` + `label?: string` (`"Fechar"`) | Ghost `size-8` com `XIcon` (ou `children`); `label` é o `sr-only`. O fechamento é seu (`onClick`). |
| `ArtifactContent` | props de `<div>` | `flex-1 overflow-auto p-4`. |

## Composição com a @blips/ui

- Ações e fechar são `Button` da @blips/ui; o tooltip é o da @blips/ui v3
  (cada `ArtifactAction` com `tooltip` traz o próprio `TooltipProvider`).
- Layout típico: chat à esquerda e `Artifact` à direita num
  `ResizablePanelGroup` da @blips/ui, ou num `Sheet` no mobile
  (`components/sheet.md`).
- Conteúdo: `CodeBlock` (`code-block.md`) para código, `MessageResponse`
  (`message.md`) para markdown, `Table` da @blips/ui para dados. Quem usa o `MessageResponse` instala os peers do Streamdown e, no CSS
  global, importa `streamdown/styles.css` e `katex/dist/katex.min.css` e
  declara `@source` do `dist` do `streamdown` e dos plugins `@streamdown/*`
  (setup em `message.md`).
- Feedback de "copiado": `toast` da @blips/ui no `onClick` da ação.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactClose,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from "@blips/ai/components/artifact";
import { CopyIcon, DownloadSimpleIcon } from "@phosphor-icons/react";

export function RascunhoEmail({
  texto,
  onCopiar,
  onBaixar,
  onFechar,
}: {
  texto: string;
  onCopiar: () => void;
  onBaixar: () => void;
  onFechar: () => void;
}) {
  return (
    <Artifact className="h-[480px]">
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Rascunho de cobrança</ArtifactTitle>
          <ArtifactDescription>Gerado agora pelo agente</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={CopyIcon} onClick={onCopiar} tooltip="Copiar" />
          <ArtifactAction
            icon={DownloadSimpleIcon}
            onClick={onBaixar}
            tooltip="Baixar .txt"
          />
          <ArtifactClose onClick={onFechar} />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <p className="whitespace-pre-wrap text-sm">{texto}</p>
      </ArtifactContent>
    </Artifact>
  );
}
```

## Armadilhas

- **`icon` recebe o componente, não o elemento:** `icon={CopyIcon}`, não
  `icon={<CopyIcon />}`. É o tipo `Icon` do Phosphor (não `LucideIcon`).
- **Com `icon`, `children` é ignorado** no `ArtifactAction`.
- **Ação só com ícone precisa de nome acessível:** passe `tooltip` ou
  `label`; sem os dois, o `sr-only` fica vazio.
- **Sem altura, não rola.** O `ArtifactContent` é `flex-1 overflow-auto`:
  o `Artifact` precisa de altura definida pelo layout.
- `ArtifactClose` não fecha nada sozinho: controle a visibilidade no app.
