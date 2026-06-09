# Carousel

Import: `@blips/ui/components/carousel`

## Sub-components

| Export | Description |
|--------|-------------|
| `Carousel` | Root container. Wraps children in a `CarouselContext` provider. Renders a `<div>` with `role="region"` and `aria-roledescription="carousel"`. |
| `CarouselContent` | Scrollable content container. Uses Embla's viewport ref. Renders a flex container (`-ml-4` horizontal or `-mt-4 flex-col` vertical). |
| `CarouselItem` | Individual slide. Renders a `<div>` with `role="group"` and `aria-roledescription="slide"`. Full-width basis by default. |
| `CarouselPrevious` | Previous slide button. Absolutely positioned circular outline button with arrow icon. |
| `CarouselNext` | Next slide button. Absolutely positioned circular outline button with arrow icon. |
| `CarouselApi` (type) | Embla carousel API type for programmatic control. |

### Hook

| Hook | Description |
|------|-------------|
| `useCarousel()` | Access carousel context (api, scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation). Must be used within `<Carousel>`. |

## Props & Variants

### Carousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Scroll direction |
| `opts` | `EmblaCarouselOptions` | -- | Embla options (align, loop, slidesToScroll, etc.) |
| `plugins` | `EmblaCarouselPlugin[]` | -- | Embla plugins (autoplay, etc.) |
| `setApi` | `(api: CarouselApi) => void` | -- | Callback to receive the Embla API instance |

### CarouselItem Props

Use `className` with Tailwind `basis-*` utilities to control item width:

| Class | Effect |
|-------|--------|
| `basis-full` (default) | One item per view |
| `md:basis-1/2` | Two items per view on medium screens |
| `lg:basis-1/3` | Three items per view on large screens |

### CarouselPrevious / CarouselNext Props

Accepts all `Button` component props:

| Prop | Type | Default |
|------|------|---------|
| `variant` | Button variant | `"outline"` |
| `size` | Button size | `"icon"` |

## Dependencies

- `embla-carousel-react`
- `@phosphor-icons/react` (ArrowLeft, ArrowRight)

## Usage

### Basic Carousel

```tsx
import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### Multiple Items Per View (Size Control)

```tsx
import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### Vertical Orientation

```tsx
import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselOrientation() {
  return (
    <Carousel
      opts={{ align: "start" }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

## All Examples

- `carousel-demo` -- Basic horizontal carousel
- `carousel-size` -- Multiple items per view with responsive basis classes
- `carousel-spacing` -- Custom spacing between items
- `carousel-orientation` -- Vertical carousel
- `carousel-api` -- Programmatic control with CarouselApi (slide counter)
- `carousel-plugin` -- Autoplay plugin with mouse interaction

## All Example Variants

### carousel-demo

```tsx
import * as React from "react"

import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### carousel-size

```tsx
import * as React from "react"

import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### carousel-spacing

```tsx
import * as React from "react"

import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselSpacing() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### carousel-orientation

```tsx
import * as React from "react"

import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselOrientation() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### carousel-api

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

export default function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  )
}
```

### carousel-plugin

```tsx
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@blips/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel"

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

## Project Notes

- This project uses `@phosphor-icons/react` (ArrowLeft, ArrowRight).
- Navigation buttons are positioned at `-left-12` / `-right-12` (horizontal) or `-top-12` / `-bottom-12` (vertical). Ensure the parent has enough margin/padding for them.
