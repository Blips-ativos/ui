# Sources

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Lista recolhível das fontes que embasaram a resposta ("3 fontes
consultadas"), cada uma um link que abre em nova aba. Adaptado do `sources`
do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** abaixo (ou acima) da resposta do assistente para listar as parts
  `source-url` (AI SDK) ou os documentos do RAG/busca que o seu backend
  devolve.
- **Não use** para citar a fonte de um trecho específico do texto: isso é
  `inline-citation.md`.
- **Não use** para anexos enviados pelo usuário: isso é `Attachment` da
  @blips/ui.

## Import

```tsx
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@blips/ai/components/sources";
```

## Peers exigidos

Nenhum. O componente não importa `ai`. O pacote só entra se você tipar as
parts com `SourceUrlUIPart`/`UIMessage`, como no exemplo: peer opcional e só de
tipos (sempre `import type`), e como a @blips/ai publica o fonte `.tsx`, num
projeto TypeScript instale como **devDependency** (`pnpm add -D ai`).

## API

| Componente | Props reais | Notas |
|---|---|---|
| `Sources` | props do `Collapsible` da @blips/ui (`open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `disabled`, `render`) | `not-prose mb-4 text-primary text-xs`. Fechado por padrão. |
| `SourcesTrigger` | `count: number` (**obrigatório**), `getLabel?: (count) => ReactNode`, mais props do `CollapsibleTrigger` | Sem `children`: `getLabel(count)` + `CaretDownIcon`; padrão pt-BR "Usou N fonte"/"Usou N fontes". Com `children`, substitui tudo (inclusive o caret). |
| `SourcesContent` | props do `CollapsibleContent` | `mt-3 flex w-fit flex-col gap-2`. |
| `Source` | props de `<a>` (`href`, `title`, …) | `target="_blank" rel="noreferrer"`. Sem `children`: `BookIcon` + `title`. |

## Composição com a @blips/ui

- Dentro do `MessageContent` do `Message` da @blips/ui, fora do `Bubble`;
  normalmente depois do `MessageResponse` e antes do `MessageFooter`.
- Filtre as parts no app: `message.parts.filter(p => p.type === "source-url")`.
  `source-document` (sem URL) não cabe no `Source` padrão; renderize com
  `children` próprios.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@blips/ai/components/sources";
import type { SourceUrlUIPart, UIMessage } from "ai";

export function FontesDaResposta({ message }: { message: UIMessage }) {
  const fontes = message.parts.filter(
    (part): part is SourceUrlUIPart => part.type === "source-url"
  );
  if (fontes.length === 0) {
    return null;
  }
  return (
    <Sources>
      <SourcesTrigger
        count={fontes.length}
        getLabel={(count) =>
          count === 1 ? "1 fonte consultada" : `${count} fontes consultadas`
        }
      />
      <SourcesContent>
        {fontes.map((fonte) => (
          <Source href={fonte.url} key={fonte.sourceId} title={fonte.title ?? fonte.url} />
        ))}
      </SourcesContent>
    </Sources>
  );
}
```

## Armadilhas

- **Prefira `getLabel` a `children` para trocar o texto.** O padrão já é
  pt-BR com singular/plural. `getLabel` troca só o texto e mantém o caret;
  com `children`, o caret some (inclua um `CaretDownIcon` se quiser mantê-lo).
- **`count` é obrigatório** mesmo com `children` (tipo exige).
- **Nada com lista vazia.** O componente não se esconde sozinho; retorne
  `null` quando não houver fontes.
- **`className` no `Source` substitui a classe base** (`flex items-center
  gap-2`), porque não passa por `cn`. Se trocar, repita essas classes.
