"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@blips/ai/components/reasoning";
import { Button } from "@blips/ui/components/button";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";

const raciocinio = `O cliente quer saber se pode antecipar as parcelas do contrato.

1. Primeiro, confiro o status do contrato: **ativo**, 14 de 36 parcelas pagas.
2. Depois, verifico se há título em atraso. Nenhum.
3. Pela regra comercial, a antecipação vale para parcelas a vencer, com desconto proporcional.

Posso responder que sim e oferecer a simulação.`;

const palavras = raciocinio.split(" ");

// Simula o streaming: revela uma palavra a cada 60 ms. Nada é buscado da rede.
function useStreamingSimulado(onFim: () => void) {
  const [visiveis, setVisiveis] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisiveis((atual) => Math.min(atual + 1, palavras.length));
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const isStreaming = visiveis < palavras.length;

  useEffect(() => {
    if (!isStreaming) {
      onFim();
    }
  }, [isStreaming, onFim]);

  return { isStreaming, texto: palavras.slice(0, visiveis).join(" ") };
}

function Simulacao({ onFim }: { onFim: () => void }) {
  const { isStreaming, texto } = useStreamingSimulado(onFim);

  return (
    <Reasoning isStreaming={isStreaming}>
      <ReasoningTrigger />
      <ReasoningContent>{texto}</ReasoningContent>
    </Reasoning>
  );
}

export default function AiReasoningDemo() {
  const [rodada, setRodada] = useState(0);
  const [terminou, setTerminou] = useState(false);
  const aoTerminar = useCallback(() => setTerminou(true), []);

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Simulacao key={rodada} onFim={aoTerminar} />
      <Button
        className="self-start"
        disabled={!terminou}
        onClick={() => {
          setTerminou(false);
          setRodada((r) => r + 1);
        }}
        variant="outline"
      >
        <ArrowClockwiseIcon data-icon="inline-start" />
        Repetir
      </Button>
    </div>
  );
}
