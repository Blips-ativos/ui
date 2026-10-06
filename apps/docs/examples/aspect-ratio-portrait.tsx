import { AspectRatio } from "@blips/ui/components/aspect-ratio";
import Image from "next/image";

export default function AspectRatioPortrait() {
  return (
    <div className="w-full max-w-40">
      <AspectRatio ratio={9 / 16} className="rounded-lg bg-muted">
        <Image
          src="https://avatar.vercel.sh/blips"
          alt="Imagem em retrato"
          fill
          className="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  );
}
