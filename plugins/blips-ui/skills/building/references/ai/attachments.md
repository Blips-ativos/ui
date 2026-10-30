# Attachments (IA)

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/attachments`

Camada de IA por cima do `Attachment` da @blips/ui (`../attachment.md`):
desenha as partes de arquivo do AI SDK (`FileUIPart`) e de documento-fonte
(`SourceDocumentUIPart`) como anexos, escolhendo prévia (imagem, vídeo ou
ícone por tipo), nome e botão de remover a partir da própria parte, em três
layouts (`grid`, `inline`, `list`). A casca **não é recriada**: `Attachment`,
`AttachmentMedia`, `AttachmentContent`, `AttachmentTitle`,
`AttachmentDescription`, `AttachmentAction`, `AttachmentActions`,
`AttachmentGroup` e `AttachmentTrigger` são reexportados da @blips/ui com a
mesma identidade.

> **Diferença do AI Elements:** lá o item se chama `Attachment` e recebe
> `data`/`onRemove`. Aqui `Attachment` é a casca da @blips/ui (sem `data`) e o
> item de IA é o **`AttachmentPart`**.

## Quando usar (e quando não)

- **Use** para mostrar os arquivos de uma mensagem do chat (as partes
  `type: "file"` do `UIMessage`), os anexos pendentes na caixa de envio e
  documentos citados pelo agente (`source-document`).
- **Não use** para um upload com progresso, erro e "tentar de novo" (envio
  para S3, formulário de chamado): isso é o `Attachment` da @blips/ui direto,
  com `state="uploading"` etc. O `AttachmentPart` não deriva estado de envio.
- **Não use** para fontes da web (URLs) citadas na resposta: isso é `Sources`
  (`sources.md`) ou `InlineCitation` (`inline-citation.md`).
- Imagem gerada pelo modelo, em tamanho grande: `Image` (`image.md`).

## Peers exigidos

Nenhum de runtime. O arquivo faz `import type { FileUIPart,
SourceDocumentUIPart } from "ai"` para tipar `AttachmentData`.

```bash
pnpm add @blips/ai
pnpm add -D ai
```

`ai` é peer opcional e só de tipos. Como a @blips/ai publica o fonte `.tsx`,
num projeto TypeScript o compilador do app precisa resolver esses tipos:
instale como **devDependency**. Sem ele, o `tsc` acusa `Cannot find module 'ai'`
dentro de `@blips/ai/src/components/attachments.tsx`.

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`.

## API

Tipos: `AttachmentData` = `(FileUIPart | SourceDocumentUIPart) & { id: string }`;
`AttachmentMediaCategory` = `"image" | "video" | "audio" | "document" |
"source" | "unknown"`; `AttachmentVariant` = `"grid" | "inline" | "list"`;
`AttachmentLabels` = `{ attachment, image, source }`. Não há tipo
`AttachmentProps`: para a casca, use `ComponentProps<typeof Attachment>`.

| Export | Props | Notas |
|---|---|---|
| `Attachments` | `HTMLAttributes<HTMLDivElement>` + `variant?: AttachmentVariant` (`"grid"`), `labels?: Partial<AttachmentLabels>` | Contêiner e provider. `grid`: `flex-wrap ml-auto w-fit` (alinhado à direita, como mensagem do usuário); `inline`: `flex-wrap`; `list`: coluna. Textos padrão: "Anexo", "Imagem", "Fonte". |
| `AttachmentPart` | Props do `Attachment` da @blips/ui **sem** `orientation`/`size` + `data: AttachmentData`, `onRemove?: () => void` | O item. A variante vira a forma da casca: `grid` → vertical; `inline` → horizontal `xs` `min-w-0`; `list` → horizontal `w-full`. Aceita `state`, `className` etc. |
| `AttachmentPreview` | `HTMLAttributes<HTMLDivElement>` + `fallbackIcon?: ReactNode` | `AttachmentMedia`: `<img>` (imagem com `url`), `<video muted>` (vídeo com `url`) ou ícone Phosphor por categoria (`ImageIcon`, `VideoIcon`, `MusicNotesIcon`, `FileTextIcon`, `GlobeIcon`, `PaperclipIcon`). `alt` = `filename` ou `labels.image`. |
| `AttachmentInfo` | `HTMLAttributes<HTMLDivElement>` + `showMediaType?: boolean` (`false`) | `AttachmentContent` + `AttachmentTitle` (nome via `getAttachmentLabel`) + `AttachmentDescription` com o `mediaType`. **Não renderiza nada em `grid`.** |
| `AttachmentRemove` | Props do `AttachmentAction` + `label?: string` ("Remover") | Só aparece se o `AttachmentPart` tiver `onRemove`. Clique: `stopPropagation`, seu `onClick`, depois `onRemove`. Em `grid`, canto superior direito; em `grid`/`inline`, visível no hover ou foco. `children` troca o `XIcon`. |
| `AttachmentHoverCard` | Props do `HoverCard` + `openDelay?`, `closeDelay?` (ms, padrão `0`) | Prévia ao passar o mouse; os atrasos vão ao trigger por contexto. |
| `AttachmentHoverCardTrigger` | Props do `HoverCardTrigger` (`delay`, `closeDelay` têm prioridade) | Use `render={<AttachmentPart … />}`. |
| `AttachmentHoverCardContent` | Props do `HoverCardContent` | `align="start"`, `w-auto p-2`. |
| `AttachmentEmpty` | `HTMLAttributes<HTMLDivElement>` | Texto padrão "Nenhum anexo". |
| `getMediaCategory(data)` | → `AttachmentMediaCategory` | Por `mediaType` (`image/`, `video/`, `audio/`, `application/` e `text/` = documento); `source-document` = `"source"`. |
| `getAttachmentLabel(data, labels?)` | → `string` | `title`/`filename` da parte, ou o texto padrão. |
| `useAttachmentsContext()` / `useAttachmentContext()` | — | Para peças próprias: `{ labels, variant }` / `{ data, mediaCategory, onRemove, variant }` (este lança fora de `AttachmentPart`). |

## Composição com a @blips/ui

- **Mensagem do usuário**: `Attachments variant="grid"` acima do `Bubble`,
  dentro do `MessageContent` com `align="end"` (`message.md`). O `ml-auto` do
  grid já cola à direita.
- **Caixa de envio**: `Attachments variant="inline"` no `PromptInputHeader`,
  com `usePromptInputAttachments()` (`prompt-input.md`): os `files` já são
  `FileUIPart & { id }`, o formato de `AttachmentData`.
- **Lista de documentos citados**: `variant="list"` com `showMediaType`.
- Estado de envio (enviando, erro) vem da casca: passe `state` no
  `AttachmentPart`.

## Exemplo v3

```tsx
"use client";

import {
  type AttachmentData,
  AttachmentInfo,
  AttachmentPart,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@blips/ai/components/attachments";
import {
  Message,
  MessageContent,
  messageAlign,
} from "@blips/ai/components/message";
import {
  PromptInputHeader,
  usePromptInputAttachments,
} from "@blips/ai/components/prompt-input";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import type { UIMessage } from "ai";

// Partes de arquivo do AI SDK não têm id: derive um estável da mensagem.
function anexosDa(mensagem: UIMessage): AttachmentData[] {
  return mensagem.parts.flatMap((parte, indice) =>
    parte.type === "file" ? [{ ...parte, id: `${mensagem.id}-${indice}` }] : []
  );
}

export function MensagemDoUsuario({ mensagem }: { mensagem: UIMessage }) {
  const anexos = anexosDa(mensagem);
  const texto = mensagem.parts
    .flatMap((parte) => (parte.type === "text" ? [parte.text] : []))
    .join("\n");

  return (
    <Message align={messageAlign(mensagem.role)}>
      <MessageContent>
        {anexos.length > 0 && (
          <Attachments variant="grid">
            {anexos.map((anexo) => (
              <AttachmentPart data={anexo} key={anexo.id}>
                <AttachmentPreview />
              </AttachmentPart>
            ))}
          </Attachments>
        )}
        <Bubble>
          <BubbleContent>{texto}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}

// Dentro do <PromptInput>: anexos pendentes, com remover.
export function AnexosPendentes() {
  const { files, remove } = usePromptInputAttachments();
  if (files.length === 0) {
    return null;
  }
  return (
    <PromptInputHeader>
      <Attachments variant="inline">
        {files.map((arquivo) => (
          <AttachmentPart
            data={arquivo}
            key={arquivo.id}
            onRemove={() => remove(arquivo.id)}
          >
            <AttachmentPreview />
            <AttachmentInfo />
            <AttachmentRemove
              label={`Remover ${arquivo.filename ?? "anexo"}`}
            />
          </AttachmentPart>
        ))}
      </Attachments>
    </PromptInputHeader>
  );
}
```

## Armadilhas

- **`<Attachment data={…}>` não compila.** É o nome do AI Elements; aqui
  `Attachment` é a casca da @blips/ui. Use `AttachmentPart`.
- **`id` é obrigatório** em `AttachmentData`, e as partes `file` do
  `UIMessage` não têm: derive um estável (`${mensagem.id}-${indice}`), não
  `Math.random()`.
- **`AttachmentInfo` some no `grid`** (retorna `null`): o grid é só prévia.
  Para nome visível, use `inline` ou `list`.
- **Sem `onRemove`, sem botão.** `AttachmentRemove` retorna `null` quando o
  `AttachmentPart` não recebe `onRemove`; em mensagem já enviada isso é o
  desejado.
- **Imagem sem `url` vira ícone.** Prévia só aparece com `data.url` (data URL,
  blob URL ou URL assinada). URL assinada que expirou mostra imagem quebrada:
  renove no servidor ao carregar o histórico.
- **Arquivo de cliente é dado sensível.** Não ponha URL pública permanente de
  documento de cliente em `url`; use URL assinada de curta duração.
- Peças (`AttachmentPreview`, `AttachmentInfo`, `AttachmentRemove`) fora de um
  `AttachmentPart` lançam erro. `Attachments` é opcional: sem ele, a variante
  é `grid`.
- `AttachmentPart` é uma `div`: como trigger de `AttachmentHoverCard`, dê
  `tabIndex={0}` para o teclado alcançar a prévia.
- Não recrie a casca com `div rounded-lg border` + `img`: é o `Attachment` da
  @blips/ui (ou o `AttachmentPart`, quando o dado é uma parte do AI SDK).
- O pacote é apresentacional: upload, conversão para `FileUIPart` e
  armazenamento ficam no app (no `PromptInput`, já vêm prontos).
