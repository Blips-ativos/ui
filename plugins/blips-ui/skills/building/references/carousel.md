# Carousel

Import: `@blips/ui/components/carousel`

Carrossel sobre `embla-carousel-react` (nas duas versões).

## Notas comuns

| Export | Descrição |
|---|---|
| `Carousel` | Raiz com contexto. `div` `role="region"` `aria-roledescription="carousel"`; setas do teclado navegam. |
| `CarouselContent` | Viewport (`overflow-hidden`) + trilho flex (`-ml-4`, ou `-mt-4 flex-col` na vertical). |
| `CarouselItem` | Slide: `role="group"`, `basis-full` (`pl-4`/`pt-4`). |
| `CarouselPrevious` / `CarouselNext` | `Button` `variant="outline"` redondo, posicionado fora do trilho (`-left-12`/`-right-12`, ou `-top-12`/`-bottom-12` na vertical). Desabilita quando não dá para rolar. |
| `CarouselApi` (tipo) | API do Embla para controle programático. |

Props do `Carousel`:

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direção. |
| `opts` | opções do Embla | — | `align`, `loop`, `slidesToScroll`… |
| `plugins` | plugins do Embla | — | Ex.: `embla-carousel-autoplay` (dependência do app). |
| `setApi` | `(api: CarouselApi) => void` | — | Recebe a API do Embla. |

- Itens por vista: `className="md:basis-1/2 lg:basis-1/3"` no `CarouselItem`.
- Espaçamento: `-ml-1` no `CarouselContent` + `pl-1` no `CarouselItem`.
- As setas ficam fora do trilho: deixe margem/padding no pai (ou reposicione por `className`).
- O texto sr-only das setas vem em inglês ("Previous slide"/"Next slide"); passe `aria-label` em pt-BR se a tela exigir.

> A API difere entre as versões (tamanho das setas, `useCarousel`, `render`). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

- Exporta também o hook **`useCarousel()`** (`api`, `scrollPrev`, `scrollNext`, `canScrollPrev`, `canScrollNext`, `orientation`) para setas/indicadores próprios. Lança erro fora de `<Carousel>`.
- `CarouselPrevious`/`CarouselNext`: `size` padrão `"icon-sm"` (`size-6`); para o tamanho antigo use `size="icon-lg"`. Ícones `CaretLeftIcon`/`CaretRightIcon` (não giram em RTL). Posição horizontal `inset-y-0 my-auto`. Herdam a API do Button do Base UI (`render`, sem `asChild`).

```tsx
"use client";

import { Card, CardContent } from "@blips/ui/components/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel";
import * as React from "react";

export function GaleriaEquipamentos() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [atual, setAtual] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setTotal(api.scrollSnapList().length);
    setAtual(api.selectedScrollSnap() + 1);
    api.on("select", () => setAtual(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Slide anterior" />
        <CarouselNext aria-label="Próximo slide" />
      </Carousel>
      <p className="py-2 text-center text-xs text-muted-foreground">
        Slide {atual} de {total}
      </p>
    </div>
  );
}
```

Seta própria com o hook:

```tsx
import { Button } from "@blips/ui/components/button";
import { useCarousel } from "@blips/ui/components/carousel";

function ContadorSlides() {
  const { canScrollNext, scrollNext } = useCarousel();
  return (
    <Button variant="ghost" size="sm" disabled={!canScrollNext} onClick={scrollNext}>
      Próximo
    </Button>
  );
}
```

## v2.x — Radix

- **Não exporta `useCarousel`**: setas/indicadores próprios precisam usar `setApi` e a API do Embla.
- `CarouselPrevious`/`CarouselNext`: `size` padrão `"icon"` com classe fixa `size-8`. Ícones `ArrowLeft`/`ArrowRight`. Posição horizontal `top-1/2 -translate-y-1/2`. Aceitam `asChild` (Button v2).

```tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@blips/ui/components/carousel"

export function GaleriaEquipamentos() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [atual, setAtual] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setTotal(api.scrollSnapList().length)
    setAtual(api.selectedScrollSnap() + 1)
    api.on("select", () => setAtual(api.selectedScrollSnap() + 1))
  }, [api])

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {atual} de {total}
      </div>
    </div>
  )
}
```

Vertical (igual nas duas, troque só o markup da versão): `<Carousel orientation="vertical" opts={{ align: "start" }} className="w-full max-w-xs">` com `<CarouselContent className="-mt-1 h-[200px]">` e itens `className="pt-1 md:basis-1/2"`.

Autoplay: `import Autoplay from "embla-carousel-autoplay"`; `const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))`; `<Carousel plugins={[plugin.current]} onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>`.

## Exemplos na docs

`carousel-demo`, `carousel-size`, `carousel-spacing`, `carousel-orientation`, `carousel-api` (v3).
