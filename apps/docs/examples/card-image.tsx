import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { PlusIcon } from "@phosphor-icons/react";

export default function CardWithImage() {
  return (
    <Card className="relative w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
      {/* biome-ignore lint/performance/noImgElement: demo estática fora do next/image */}
      <img
        src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop"
        alt="Foto de mymind no Unsplash"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />
      <CardHeader>
        <CardTitle>Paisagem</CardTitle>
        <CardDescription>
          Uma vista que captura a essência da beleza natural.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <PlusIcon data-icon="inline-start" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}
