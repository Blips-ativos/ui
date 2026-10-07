# Snippet

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/snippet`

Comando ou trecho de **uma linha** num campo somente leitura com botão de
copiar, montado sobre o `InputGroup` da @blips/ui (addons à esquerda/direita,
input `readOnly` com o `code`). O botão troca o ícone por um check por
`timeout` ms após copiar. Adaptado do `snippet` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para um comando que o usuário vai colar no terminal
  (`pnpm add @blips/ai`, `make deploy-prod`), um ID/URL/token público para
  copiar, ou um trecho curto que o agente sugeriu.
- **Não use** para código de várias linhas: isso é o `CodeBlock`
  (`code-block.md`), com realce e copiar.
- **Não use** para saída de comando executado: isso é o `Terminal`
  (`terminal.md`).
- **Não use** para segredo (senha, chave privada, token de API): isso é o
  `EnvironmentVariables` (`environment-variables.md`), que esconde o valor.
- **Não use** como campo editável: o input é `readOnly` e fixo no `code`.
  Para entrada, use `InputGroup` + `InputGroupInput` da @blips/ui direto.

## Import

```tsx
import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from "@blips/ai/components/snippet";
```

## Peers exigidos

Nenhum além da @blips/ai (usa `InputGroup` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`.
Se o seu código usar tipos do AI SDK, `ai` é peer opcional só de tipos
(sempre `import type`, sem runtime): num projeto TypeScript, instale como
**devDependency** (`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

```bash
pnpm add @blips/ai
```

## API

| Componente | Props reais | Notas |
|---|---|---|
| `Snippet` | props do `InputGroup` da @blips/ui (`ComponentProps<"div">`) + `code: string` (obrigatório) | Raiz e contexto, `font-mono`. **Não renderiza nada sozinho**: componha addons, input e botão. |
| `SnippetAddon` | props do `InputGroupAddon` (`align?: "inline-start" \| "inline-end" \| "block-start" \| "block-end"`, padrão `"inline-start"`) | Repasse direto. Para o botão de copiar à direita, `align="inline-end"`. |
| `SnippetText` | props do `InputGroupText` (`ComponentProps<"span">`) | Prefixo em `text-muted-foreground` (ex.: `$`, `>`). |
| `SnippetInput` | props do `InputGroupInput` **sem `value` e `readOnly`** | Mostra o `code` do contexto, sempre somente leitura. |
| `SnippetCopyButton` | props do `InputGroupButton` (Button do Base UI, sem `type`; `size` padrão aqui `"icon-sm"`) + `onCopy?: () => void`, `onError?: (error: Error) => void`, `timeout?: number` (padrão `2000`) | Copia o `code` com a Clipboard API. `aria-label` e `title` padrão `"Copiar"` (sobrescrevíveis). `children` substitui o ícone. Sem Clipboard API, chama `onError` com `"API da área de transferência indisponível"`. |

Todos os tipos de props são exportados (`SnippetProps`, `SnippetAddonProps`,
`SnippetTextProps`, `SnippetInputProps`, `SnippetCopyButtonProps`).

## Composição com a @blips/ui

- Feedback de cópia além do ícone: `onCopy={() => toast.success("Comando
  copiado")}` com o `Sonner` da @blips/ui (`../sonner.md`).
- Vários gerenciadores (pnpm/npm/yarn): `Tabs` da @blips/ui com um `Snippet`
  por aba, cada um com seu `code`.
- Na resposta do agente, vai no `MessageContent` do `Message` da @blips/ui,
  abaixo do `MessageResponse`, quando o comando merece destaque fora do
  markdown. Quem usa o `MessageResponse` instala os peers do Streamdown e, no CSS
  global, importa `streamdown/styles.css` e `katex/dist/katex.min.css` e
  declara `@source` do `dist` do `streamdown` e dos plugins `@streamdown/*`
  (setup em `message.md`).

## Exemplo v3 que compila

```tsx
"use client";

import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from "@blips/ai/components/snippet";
import { toast } from "sonner";

export function ComandoDeInstalacao() {
  return (
    <Snippet className="max-w-md" code="pnpm add @blips/ai shiki">
      <SnippetAddon>
        <SnippetText>$</SnippetText>
      </SnippetAddon>
      <SnippetInput aria-label="Comando de instalação" />
      <SnippetAddon align="inline-end">
        <SnippetCopyButton
          aria-label="Copiar comando"
          onCopy={() => toast.success("Comando copiado")}
          onError={() => toast.error("Não foi possível copiar")}
        />
      </SnippetAddon>
    </Snippet>
  );
}
```

## Armadilhas

- **Botão fora de `SnippetAddon`.** O `SnippetCopyButton` e o `SnippetText`
  dependem do layout do `InputGroup`; soltos ao lado do input, desalinham.
  Sempre dentro de um `SnippetAddon` (o botão com `align="inline-end"`).
- **Copiar só funciona em contexto seguro** (HTTPS ou `localhost`). Em HTTP
  ou iframe sem permissão, a Clipboard API falta ou rejeita: trate `onError`,
  senão o clique não dá retorno nenhum.
- **Clique repetido não copia de novo** enquanto o check está visível
  (`timeout`); é proposital.
- **Linha única.** Quebras de linha no `code` são achatadas pelo `<input>`;
  para várias linhas, `CodeBlock`.
- **`aria-label` do input.** O `SnippetInput` não tem rótulo próprio; passe
  `aria-label` descrevendo o conteúdo para leitores de tela.
