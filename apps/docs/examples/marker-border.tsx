"use client";

import { Marker, MarkerContent, MarkerIcon } from "@blips/ui/components/marker";
import {
  FileTextIcon,
  GitBranchIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";

export default function MarkerBorderDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Marker variant="border">
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Mudou para release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <MagnifyingGlassIcon />
        </MarkerIcon>
        <MarkerContent>Revisou 8 arquivos relacionados</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Abriu as notas de implementação</MarkerContent>
      </Marker>
    </div>
  );
}
