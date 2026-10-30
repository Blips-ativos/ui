# Marker

Import: `@blips/ui/components/marker`

> **Só existe na v3.x.** Num repo em `@blips/ui` 2.x este import não existe: use
> um `div` com `text-xs text-muted-foreground` (e `Separator` para a variante com
> linhas), ou proponha a migração para a v3 (ver `references/v2-vs-v3.md`).

Linha discreta de status/evento numa conversa ou linha do tempo: "Pensando…",
"Trabalhou por 42s", "Ana entrou na conversa", "Conversa compactada". Ícone
opcional, texto pequeno e esmaecido, variante com linhas dos lados.

## v3.x — Base UI

Exports: `Marker`, `MarkerIcon`, `MarkerContent`, `markerVariants`.

| Componente | Props / descrição |
|---|---|
| `Marker` | `variant?: "default" \| "separator" \| "border"` (padrão `default`; vira `data-variant`). `separator`: linhas horizontais dos dois lados do conteúdo (centralizado). `border`: borda inferior com `pb-2`. Aceita `render` (`useRender`) para virar `<a>`/`<button>` clicável. Base `text-xs/relaxed text-muted-foreground`, ícones `size-3.5`. |
| `MarkerIcon` | `span` `aria-hidden` para o ícone (ou `Spinner`). |
| `MarkerContent` | Texto; links sublinhados. Em `separator`, centralizado. |
| `markerVariants` | CVA exportado, para aplicar o visual em outro elemento. |

Regras:

- Status que muda (carregando, processando): `role="status"` no `Marker`, `Spinner` no `MarkerIcon` e `className="shimmer"` no `MarkerContent`.
- Clicável (expandir raciocínio, abrir detalhe): `render={<button type="button" />}` ou `render={<a href="…" />}`.
- Texto curto, em pt-BR, no passado para eventos concluídos ("Conversa compactada").

```tsx
"use client";

import { Marker, MarkerContent, MarkerIcon } from "@blips/ui/components/marker";
import { Spinner } from "@blips/ui/components/spinner";
import { CaretRightIcon, CheckIcon, ClockIcon, UserCircleIcon } from "@phosphor-icons/react";

export function EventosDaConversa() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Consultando contratos…</MarkerContent>
      </Marker>

      <Marker render={<button type="button" className="transition-colors hover:text-foreground" />}>
        <MarkerIcon>
          <ClockIcon />
        </MarkerIcon>
        <MarkerContent className="flex-1">Trabalhou por 42s</MarkerContent>
        <MarkerIcon>
          <CaretRightIcon />
        </MarkerIcon>
      </Marker>

      <Marker>
        <MarkerIcon>
          <UserCircleIcon />
        </MarkerIcon>
        <MarkerContent>Ana entrou na conversa</MarkerContent>
      </Marker>

      <Marker variant="separator">
        <MarkerIcon>
          <CheckIcon />
        </MarkerIcon>
        <MarkerContent>Conversa compactada</MarkerContent>
      </Marker>

      <Marker variant="border">
        <MarkerContent>Hoje</MarkerContent>
      </Marker>
    </div>
  );
}
```

Dentro de um `AccordionTrigger` serve como cabeçalho de um bloco recolhível (ex.:
"Raciocínio do agente").

## Exemplos na docs

`marker-demo`, `marker-separator`, `marker-border`, `marker-accordion`.
