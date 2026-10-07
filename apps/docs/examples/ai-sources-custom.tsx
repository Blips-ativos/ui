"use client";

import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@blips/ai/components/sources";
import { CaretDownIcon, FilePdfIcon, GlobeIcon } from "@phosphor-icons/react";

const fontes = [
  {
    href: "https://example.com/contrato-locacao.pdf",
    title: "Contrato de locação — cláusula 7",
    tipo: "pdf",
  },
  {
    href: "https://example.com/central-de-ajuda/garantia",
    title: "Central de ajuda — Garantia do equipamento",
    tipo: "web",
  },
] as const;

export default function AiSourcesCustom() {
  return (
    <Sources defaultOpen>
      <SourcesTrigger count={fontes.length}>
        <span className="font-medium">
          Baseado em {fontes.length} documentos
        </span>
        <CaretDownIcon className="size-4" />
      </SourcesTrigger>
      <SourcesContent>
        {fontes.map((fonte) => (
          <Source
            className="flex items-center gap-2 rounded-md border px-2 py-1.5 text-foreground hover:bg-muted"
            href={fonte.href}
            key={fonte.href}
          >
            {fonte.tipo === "pdf" ? (
              <FilePdfIcon className="size-4 text-muted-foreground" />
            ) : (
              <GlobeIcon className="size-4 text-muted-foreground" />
            )}
            <span className="font-medium">{fonte.title}</span>
          </Source>
        ))}
      </SourcesContent>
    </Sources>
  );
}
