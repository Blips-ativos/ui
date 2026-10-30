import { AspectRatio } from "@blips/ui/components/aspect-ratio";
import Image from "next/image";

export default function AspectRatioSquare() {
  return (
    <div className="w-full max-w-48">
      <AspectRatio ratio={1} className="rounded-lg bg-muted">
        <Image
          src="https://avatar.vercel.sh/blips"
          alt="Imagem quadrada"
          fill
          className="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  );
}
