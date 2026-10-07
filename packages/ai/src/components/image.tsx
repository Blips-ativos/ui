// Adaptado de vercel/ai-elements (packages/elements/src/image.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { cn } from "@blips/ui/lib/utils";
import type { GeneratedFile } from "ai";

// O upstream tipava com `Experimental_GeneratedImage`, que no `ai` v7 é só um
// alias depreciado de `GeneratedFile` (sai no v8). O formato é o mesmo.
export type ImageProps = GeneratedFile & {
  className?: string;
  alt?: string;
};

export const Image = ({
  base64,
  uint8Array: _uint8Array,
  mediaType,
  // Metadado do provedor não é atributo de DOM: fica fora do <img>.
  providerMetadata: _providerMetadata,
  alt = "Imagem gerada",
  className,
  ...props
}: ImageProps) => (
  <img
    {...props}
    alt={alt}
    className={cn("h-auto max-w-full overflow-hidden rounded-md", className)}
    src={`data:${mediaType};base64,${base64}`}
  />
);
