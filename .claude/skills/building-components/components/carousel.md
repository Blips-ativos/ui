# Carousel

**Categoria:** Compound (Behavioral)
**Dependências:** `embla-carousel-react`, `lucide-react`, `@/components/button`
**"use client":** Não

## Exports

| Export | Tipo |
|---|---|
| `Carousel` | Component (forwardRef) |
| `CarouselContent` | Component (forwardRef) |
| `CarouselItem` | Component (forwardRef) |
| `CarouselPrevious` | Component (forwardRef) |
| `CarouselNext` | Component (forwardRef) |
| `CarouselApi` | Type |

## Uso

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@blips/ui"

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {items.map((item, index) => (
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

// Partial items visible
<CarouselItem className="basis-1/3">...</CarouselItem>

// With options
<Carousel opts={{ align: "start", loop: true }}>...</Carousel>

// Vertical
<Carousel orientation="vertical">...</Carousel>

// Access API
const [api, setApi] = useState<CarouselApi>()
<Carousel setApi={setApi}>...</Carousel>
```
