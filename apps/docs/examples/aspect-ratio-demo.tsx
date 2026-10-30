import { AspectRatio } from "@blips/ui/components/aspect-ratio";
import Image from "next/image";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Foto de Drew Beamer"
          fill
          className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </AspectRatio>
    </div>
  );
}
