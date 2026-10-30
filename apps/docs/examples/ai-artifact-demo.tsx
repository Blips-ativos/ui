"use client";

import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from "@blips/ai/components/artifact";
import {
  CopyIcon,
  DownloadSimpleIcon,
  PlayIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";

const codigo = `def calcular_parcela(valor: float, meses: int, taxa: float) -> float:
    """Parcela fixa pela tabela Price."""
    if taxa == 0:
        return valor / meses
    fator = (1 + taxa) ** meses
    return valor * taxa * fator / (fator - 1)`;

export default function AiArtifactDemo() {
  return (
    <Artifact className="w-full max-w-xl">
      <ArtifactHeader>
        <div>
          <ArtifactTitle>calcular_parcela.py</ArtifactTitle>
          <ArtifactDescription>Gerado há 2 minutos</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={PlayIcon} tooltip="Executar" />
          <ArtifactAction icon={CopyIcon} tooltip="Copiar" />
          <ArtifactAction icon={DownloadSimpleIcon} tooltip="Baixar" />
          <ArtifactAction icon={ShareNetworkIcon} tooltip="Compartilhar" />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent className="p-0">
        <pre className="overflow-x-auto p-4 font-mono text-xs">{codigo}</pre>
      </ArtifactContent>
    </Artifact>
  );
}
