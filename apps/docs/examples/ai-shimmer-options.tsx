"use client";

import { Shimmer } from "@blips/ai/components/shimmer";

export default function AiShimmerOptions() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Shimmer as="h3" className="font-semibold text-lg">
        Gerando o relatório do mês
      </Shimmer>
      <Shimmer className="text-sm" duration={1}>
        Consultando contratos (duration=1)
      </Shimmer>
      <Shimmer className="text-sm" duration={4}>
        Lendo a base de conhecimento (duration=4)
      </Shimmer>
      <Shimmer className="text-sm" spread={5}>
        Brilho mais largo (spread=5)
      </Shimmer>
      <p className="text-sm">
        Status:{" "}
        <Shimmer as="span" className="text-sm">
          chamando a ferramenta de financeiro
        </Shimmer>
      </p>
    </div>
  );
}
