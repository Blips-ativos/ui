# Open In Chat

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/open-in-chat`

Menu "Abrir no chat": um `DropdownMenu` da @blips/ui com itens que abrem um
chat externo numa aba nova, já com a pergunta preenchida na URL. Provedores
prontos: ChatGPT, Claude, T3 Chat, Scira, v0 e Cursor, cada um com o logotipo
e o título em pt-BR ("Abrir no Claude"…). A consulta vem de `query` no
`OpenIn` e vai para todos os itens por contexto.

## Quando usar (e quando não)

- **Use** em conteúdo público ou de documentação (página de docs, artigo da
  base de conhecimento, snippet de código) para o leitor continuar a dúvida
  no assistente que preferir.
- **Não use** em telas com dados de cliente ou internos (conversa do
  Salvador, contrato, financeiro): a consulta inteira vai na URL para um
  serviço de terceiros. Ver Armadilhas.
- **Não use** para trocar o modelo do **seu** agente: isso é `ModelSelector`
  (`model-selector.md`) ou o `PromptInputSelect` (`prompt-input.md`).
- Para "copiar a pergunta", um `Button` com `navigator.clipboard` basta; para
  compartilhar link interno, `DropdownMenu` comum da @blips/ui.

## Peers exigidos

Nenhum. Só @blips/ui (`dropdown-menu`, `button`) e ícones Phosphor.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. O componente não importa `ai`; se o seu
código usar tipos do AI SDK, `ai` entra só como **devDependency**
(`pnpm add -D ai`, sempre `import type`).

## API

| Export | Props | Notas |
|---|---|---|
| `OpenIn` | Props do `DropdownMenu` (Base UI) + `query: string` | Raiz e provider da consulta. |
| `OpenInTrigger` | Props do `DropdownMenuTrigger` | Elemento padrão `render={<Button type="button" variant="outline" />}`; conteúdo padrão "Abrir no chat" + `CaretDownIcon`. `children` troca o **conteúdo**; `render` troca o **elemento**. |
| `OpenInContent` | Props do `DropdownMenuContent` | `align="start"`, `w-[240px]`. |
| `OpenInLabel` | Props do `DropdownMenuLabel` | É `Menu.GroupLabel`: precisa de `DropdownMenuGroup` em volta. |
| `OpenInSeparator` | Props do `DropdownMenuSeparator` | |
| `OpenInItem` | Props do `DropdownMenuItem` | Item genérico, para um destino que não está na lista (ver exemplo). |
| `OpenInChatGPT` | Props do `DropdownMenuItem` | `chatgpt.com/?hints=search&prompt=…` |
| `OpenInClaude` | idem | `claude.ai/new?q=…` |
| `OpenInT3` | idem | `t3.chat/new?q=…` (ícone `ChatCircleIcon`) |
| `OpenInScira` | idem | `scira.ai/?q=…` |
| `OpenInv0` | idem | `v0.app?q=…` (o "v" é minúsculo no nome do export) |
| `OpenInCursor` | idem | `cursor.com/link/prompt?text=…` |

Os seis itens de provedor renderizam `<a href target="_blank" rel="noopener">`
com ícone, título e `ArrowSquareOutIcon`; `children` troca só o título. Cada
um tem seu tipo `*Props` (`OpenInClaudeProps`…). Fora de um `OpenIn`, lançam
erro.

## Composição com a @blips/ui

- O gatilho é o `Button outline` da @blips/ui; para um botão de ícone, passe
  `render={<Button size="icon-sm" variant="ghost" aria-label="Abrir no chat" />}`
  e um ícone Phosphor em `children`.
- Agrupe com `DropdownMenuGroup` da @blips/ui (obrigatório para o
  `OpenInLabel`) e separe com `OpenInSeparator`.
- Em blocos de código: ao lado das ações do `CodeBlock` (`code-block.md`),
  com o código em `query`.

## Exemplo v3

```tsx
"use client";

import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInItem,
  OpenInLabel,
  OpenInSeparator,
  OpenInTrigger,
} from "@blips/ai/components/open-in-chat";
import { DropdownMenuGroup } from "@blips/ui/components/dropdown-menu";
import { ArrowSquareOutIcon, BookOpenIcon } from "@phosphor-icons/react";

export function ContinuarNoChat({ pergunta }: { pergunta: string }) {
  const urlBase = `https://docs.exemplo.com/busca?${new URLSearchParams({
    q: pergunta,
  })}`;

  return (
    <OpenIn query={pergunta}>
      <OpenInTrigger />
      <OpenInContent>
        <DropdownMenuGroup>
          <OpenInLabel>Continuar a conversa em</OpenInLabel>
          <OpenInClaude />
          <OpenInChatGPT />
          <OpenInCursor>Abrir no Cursor (código)</OpenInCursor>
        </DropdownMenuGroup>
        <OpenInSeparator />
        <OpenInItem
          render={
            // biome-ignore lint/a11y/useAnchorContent: o Base UI injeta os filhos do item no <a>.
            <a href={urlBase} rel="noopener noreferrer" target="_blank" />
          }
        >
          <BookOpenIcon />
          <span className="flex-1">Buscar na documentação</span>
          <ArrowSquareOutIcon />
        </OpenInItem>
      </OpenInContent>
    </OpenIn>
  );
}
```

## Armadilhas

- **A consulta vai inteira na URL, para um terceiro.** Fica no histórico do
  navegador, em logs de proxy e no serviço de destino. Nunca passe em `query`
  mensagem de cliente, CPF, contrato, valores ou contexto interno do agente.
- **`OpenInLabel` fora de `DropdownMenuGroup` quebra ao abrir o menu**
  ("MenuGroupContext is missing"): é um `Menu.GroupLabel` do Base UI.
- **`children` no gatilho não troca mais o elemento.** No AI Elements (Radix)
  o filho do trigger virava o gatilho inteiro; aqui o elemento vem de
  `render`. `<OpenInTrigger><Button …/></OpenInTrigger>` gera botão dentro de
  botão.
- **Itens de provedor ignoram `render`.** O `<a>` com a URL do provedor é
  aplicado por último. Para outro destino, use `OpenInItem` com seu próprio
  `render={<a … />}`.
- URLs longas: navegadores e servidores cortam por volta de 2 mil a 8 mil
  caracteres. Para trechos grandes (arquivo inteiro), resuma antes de pôr em
  `query`.
- Os formatos de URL são dos provedores e podem mudar sem aviso. Se um item
  parar de preencher a pergunta, o link ainda abre o serviço, só que vazio.
- Os logotipos são marcas de terceiros copiadas do upstream: não use os SVGs
  fora deste menu.
