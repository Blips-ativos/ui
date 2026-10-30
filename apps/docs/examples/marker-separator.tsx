"use client";

import { Marker, MarkerContent, MarkerIcon } from "@blips/ui/components/marker";
import { Spinner } from "@blips/ui/components/spinner";
import { CheckIcon } from "@phosphor-icons/react";

export default function MarkerSeparatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Marker variant="separator">
        <MarkerContent>Trabalhou por 42s</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Compactando a conversa</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent className="shimmer">Lendo 4 arquivos</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <CheckIcon />
        </MarkerIcon>
        <MarkerContent>Conversa compactada</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          Com um <a href="#marker-separator">link para saber mais</a>
        </MarkerContent>
      </Marker>
    </div>
  );
}
