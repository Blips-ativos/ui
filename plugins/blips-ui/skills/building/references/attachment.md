# Attachment

Import: `@blips/ui/components/attachment`

> **Só existe na v3.x.** Num repo em `@blips/ui` 2.x este import não existe: monte
> o cartão de arquivo com `div` + `Button` da v2, ou proponha a migração para a v3
> (ver `references/v2-vs-v3.md`).

Cartão de anexo/arquivo com estados de envio (selecionado, enviando, processando,
erro, concluído). Feito para chat, upload em formulário e listas de documentos.
Só HTML + CVA (`AttachmentTrigger` usa `useRender`).

## v3.x — Base UI

Exports: `Attachment`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentContent`,
`AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction`,
`AttachmentTrigger`. (`attachmentVariants`/`attachmentMediaVariants` não são exportados.)

| Componente | Props / descrição |
|---|---|
| `Attachment` | `state?: "idle" \| "uploading" \| "processing" \| "error" \| "done"` (padrão `"done"`, vira `data-state`), `size?: "default" \| "sm" \| "xs"`, `orientation?: "horizontal" \| "vertical"` (padrão `horizontal`). `idle` tem borda tracejada; `error`, borda destrutiva. |
| `AttachmentMedia` | `variant?: "icon" \| "image"` (padrão `icon`). Quadrado `w-10` (`w-8` no `sm`, `w-7` no `xs`; largura total no vertical). `image`: `<img>` com `object-cover`, opaca até `done`/`idle`. Em `error`, fundo destrutivo. Aceita `Spinner`. |
| `AttachmentContent` | Coluna de título + descrição. |
| `AttachmentTitle` | `span` truncado; em `uploading`/`processing` ganha `shimmer`. |
| `AttachmentDescription` | `span` truncado `text-xs text-muted-foreground` (destrutivo em `error`). |
| `AttachmentActions` | Área de ações; no vertical, fica no canto superior direito. |
| `AttachmentAction` | `Button` com `variant="ghost"` e `size="icon-xs"` por padrão (aceita todas as props do Button). **Precisa de `aria-label`.** |
| `AttachmentTrigger` | Botão (ou `render`) invisível que cobre o cartão inteiro (`absolute inset-0 z-10`) para abrir/visualizar; `type="button"` por padrão. As ações ficam acima dele (`z-20`). |
| `AttachmentGroup` | Fila horizontal rolável com snap e `scroll-fade-x`. |

Regras:

- Mostre tamanho e tipo na descrição em pt-BR (`"PDF · 2,4 MB"`), progresso em `uploading` (`"Enviando · 64%"`) e o motivo em `error` com ação de tentar de novo.
- Use `Spinner` no `AttachmentMedia` durante `uploading`.
- Um `AttachmentTrigger` por cartão; para link, `render={<a href="…" aria-label="Abrir arquivo.pdf" />}`.

```tsx
"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@blips/ui/components/attachment";
import { Spinner } from "@blips/ui/components/spinner";
import { ArrowClockwiseIcon, FileTextIcon, FileXIcon, XIcon } from "@phosphor-icons/react";

export function AnexosDoChamado() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>nota-fiscal.pdf</AttachmentTitle>
          <AttachmentDescription>Enviando · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancelar envio">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>

      <Attachment state="error" className="w-full">
        <AttachmentMedia>
          <FileXIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>planilha-pecas.xlsx</AttachmentTitle>
          <AttachmentDescription>Falha no envio. Tente de novo.</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Tentar de novo">
            <ArrowClockwiseIcon />
          </AttachmentAction>
          <AttachmentAction aria-label="Remover anexo">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>

      <Attachment className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>contrato-assinado.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 820 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentTrigger render={<a href="/arquivos/42" aria-label="Abrir contrato-assinado.pdf" />} />
      </Attachment>
    </div>
  );
}

// Miniaturas de imagem, em fila rolável
<AttachmentGroup>
  {fotos.map((foto) => (
    <Attachment key={foto.id} orientation="vertical" size="sm">
      <AttachmentMedia variant="image">
        <img src={foto.url} alt={foto.nome} />
      </AttachmentMedia>
    </Attachment>
  ))}
</AttachmentGroup>
```

## Exemplos na docs

`attachment-demo`, `attachment-states`, `attachment-sizes`, `attachment-vertical`, `attachment-image`, `attachment-trigger`.
