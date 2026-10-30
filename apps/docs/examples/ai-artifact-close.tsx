"use client";

import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactClose,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from "@blips/ai/components/artifact";
import { Button } from "@blips/ui/components/button";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function AiArtifactClose() {
  const [aberto, setAberto] = useState(true);

  if (!aberto) {
    return (
      <Button onClick={() => setAberto(true)} variant="outline">
        Reabrir resumo
      </Button>
    );
  }

  return (
    <Artifact className="w-full max-w-md">
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Resumo do contrato CT-2026-0412</ArtifactTitle>
          <ArtifactDescription>
            Documento gerado pelo agente
          </ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction
            icon={ArrowsClockwiseIcon}
            label="Gerar de novo"
            tooltip="Gerar de novo"
          />
          <ArtifactClose onClick={() => setAberto(false)} />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent className="space-y-2 text-sm">
        <p>Locação de 36 meses, com 14 parcelas pagas e nenhuma em atraso.</p>
        <p className="text-muted-foreground">
          Garantia ativa até março de 2028. Próximo vencimento em 10/11.
        </p>
      </ArtifactContent>
    </Artifact>
  );
}
