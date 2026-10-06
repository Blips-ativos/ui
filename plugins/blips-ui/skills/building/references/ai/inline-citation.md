# Inline Citation

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Citação dentro do texto: o trecho citado ganha destaque no hover e, ao lado,
um badge com o domínio da fonte (`ajuda.blips.com.br +1`). Passar o mouse
abre um `HoverCard` com carrossel das fontes (título, URL, descrição,
citação literal). Adaptado do `inline-citation` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** quando a resposta liga afirmações específicas a fontes (RAG com
  metadados de trecho, busca web com citações).
- **Não use** para a lista geral de fontes da resposta: isso é
  `sources.md`.
- **Não use** como único acesso à fonte em mobile: o `HoverCard` não abre de
  forma confiável no toque. Combine com `Sources`.
- **Não use** dentro do markdown do `MessageResponse` sem um renderer
  próprio: o Streamdown não gera esses componentes; você monta o JSX.

## Import

```tsx
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationQuote,
  InlineCitationSource,
  InlineCitationText,
} from "@blips/ai/components/inline-citation";
```

## Peers exigidos

Nenhum além de `@blips/ai` + `@blips/ui` ^3 (o carrossel é o `Carousel` da
@blips/ui, que já traz o Embla).

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

| Componente | Props reais | Notas |
|---|---|---|
| `InlineCitation` | props de `<span>` | Raiz `group inline`. |
| `InlineCitationText` | props de `<span>` | Trecho citado; `group-hover:bg-accent`. |
| `InlineCitationCard` | props do `HoverCard` da @blips/ui (`PreviewCard.Root`: `open`, `defaultOpen`, `onOpenChange`) | Os atrasos **não** ficam aqui. |
| `InlineCitationCardTrigger` | `sources: string[]` (**obrigatório**, URLs), `delay?: number` (ms, padrão `0`), `closeDelay?: number` (ms, padrão `0`), mais props do `Badge` | Mostra o hostname da 1ª URL + `+N`. URL inválida aparece crua; lista vazia mostra "unknown". As props extras vão para o `Badge` (secundário, `rounded-full ml-1`). |
| `InlineCitationCardBody` | props do `HoverCardContent` (`side`, `sideOffset`, `align`, …) | `relative w-80 p-0`. |
| `InlineCitationCarousel` | props do `Carousel` da @blips/ui (`opts`, `orientation`, `plugins`) | Guarda a API do Embla num contexto para Index/Prev/Next. |
| `InlineCitationCarouselContent` | props de `<div>` | `CarouselContent`. |
| `InlineCitationCarouselItem` | props de `<div>` | `CarouselItem` com `space-y-2 p-4 pl-8`. |
| `InlineCitationCarouselHeader` | props de `<div>` | Faixa `bg-secondary rounded-t-md p-2`. |
| `InlineCitationCarouselIndex` | props de `<div>` | Sem `children`: "atual/total". |
| `InlineCitationCarouselPrev` / `InlineCitationCarouselNext` | props de `<button>` | Botões crus com `ArrowLeftIcon`/`ArrowRightIcon`; `aria-label` padrão "Previous"/"Next". |
| `InlineCitationSource` | `title?`, `url?`, `description?` (strings), mais props de `<div>` | Título truncado, URL, descrição em 3 linhas; `children` depois. |
| `InlineCitationQuote` | props de `<blockquote>` | Itálico com borda à esquerda. |

## Composição com a @blips/ui

- O texto da resposta com citações é JSX seu, dentro do `MessageContent` do
  `Message` da @blips/ui (no `Bubble` ou não, conforme o layout). Para o resto
  do markdown, siga com `MessageResponse`.
- O card é o `HoverCard` da @blips/ui (Base UI `PreviewCard`): os atrasos
  ficam no trigger (`delay`/`closeDelay`), não na raiz.
- Use em conjunto com `Sources` no fim da mensagem para quem está no toque.

## Exemplo v3 que compila

```tsx
"use client";

import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationQuote,
  InlineCitationSource,
  InlineCitationText,
} from "@blips/ai/components/inline-citation";

const fontes = [
  {
    title: "Política de garantia 2026",
    url: "https://ajuda.blips.com.br/garantia",
    description: "Cobertura de 12 meses para defeitos de fabricação.",
    trecho: "O prazo de atendimento é de até 5 dias úteis.",
  },
  {
    title: "Contrato de locação",
    url: "https://ajuda.blips.com.br/contrato",
    description: "Cláusulas de manutenção preventiva.",
    trecho: "A manutenção preventiva é semestral.",
  },
];

export function RespostaComCitacao() {
  return (
    <p className="text-sm">
      O atendimento de garantia acontece em{" "}
      <InlineCitation>
        <InlineCitationText>até 5 dias úteis</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={fontes.map((f) => f.url)} />
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselHeader>
                <InlineCitationCarouselPrev aria-label="Fonte anterior" />
                <InlineCitationCarouselNext aria-label="Próxima fonte" />
                <InlineCitationCarouselIndex />
              </InlineCitationCarouselHeader>
              <InlineCitationCarouselContent>
                {fontes.map((fonte) => (
                  <InlineCitationCarouselItem key={fonte.url}>
                    <InlineCitationSource
                      description={fonte.description}
                      title={fonte.title}
                      url={fonte.url}
                    />
                    <InlineCitationQuote>{fonte.trecho}</InlineCitationQuote>
                  </InlineCitationCarouselItem>
                ))}
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      .
    </p>
  );
}
```

## Armadilhas

- **`aria-label` em inglês nas setas.** Passe `aria-label` pt-BR em
  `InlineCitationCarouselPrev`/`Next` (a prop do consumidor vence).
- **Não passe `setApi` ao `InlineCitationCarousel`**: o seu sobrescreve o
  interno, e Index/Prev/Next param de funcionar.
- **`openDelay` não existe.** No Base UI o nome é `delay`, e fica no
  `InlineCitationCardTrigger`.
- **Hover não abre no toque.** Não esconda informação essencial só no card.
