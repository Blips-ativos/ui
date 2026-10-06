import { Card, CardContent } from "@blips/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel";

const slides = [1, 2, 3, 4, 5];

export default function CarouselSize() {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="mx-auto w-full max-w-xs sm:max-w-sm"
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide} className="sm:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{slide}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:inline-flex" />
      <CarouselNext className="hidden sm:inline-flex" />
    </Carousel>
  );
}
