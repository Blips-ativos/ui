"use client";

import { Marker, MarkerContent, MarkerIcon } from "@blips/ui/components/marker";
import { Spinner } from "@blips/ui/components/spinner";
import {
  CaretRightIcon,
  ClockIcon,
  FileTextIcon,
  GitBranchIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";

const markerLink = (
  // biome-ignore lint/a11y/useAnchorContent: o conteúdo vem dos children, injetados pelo render
  <a href="#marker-demo" />
);

export default function MarkerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Marker>
        <MarkerContent>Um marcador simples</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Marcador com ícone</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Pensando…</MarkerContent>
      </Marker>
      <Marker render={markerLink}>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Marcador como link</MarkerContent>
      </Marker>
      <Marker
        render={
          <button
            type="button"
            className="transition-colors hover:text-foreground"
          />
        }
      >
        <MarkerIcon>
          <ClockIcon />
        </MarkerIcon>
        <MarkerContent className="flex-1">Trabalhou por 42s</MarkerContent>
        <MarkerIcon>
          <CaretRightIcon />
        </MarkerIcon>
      </Marker>
      <Marker>
        <MarkerIcon>
          <UserCircleIcon />
        </MarkerIcon>
        <MarkerContent>Rhea entrou na conversa</MarkerContent>
      </Marker>
    </div>
  );
}
