import { Card, CardContent } from "@blips/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blips/ui/components/carousel";

const slides = [1, 2, 3, 4, 5];

export default function CarouselOrientation() {
  return (
    <Carousel
      opts={{ align: "start" }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {slides.map((slide) => (
          <CarouselItem key={slide} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{slide}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
