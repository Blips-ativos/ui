"use client";

import {
  Transcription,
  TranscriptionSegment,
} from "@blips/ai/components/transcription";
import { Button } from "@blips/ui/components/button";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

// Formato de `TranscriptionResult["segments"]` do AI SDK (experimental_transcribe).
const segmentos = [
  { endSecond: 2.4, startSecond: 0, text: "Olá, aqui é a Marina," },
  { endSecond: 4.8, startSecond: 2.4, text: "da Padaria Pão Dourado." },
  { endSecond: 7.6, startSecond: 4.8, text: "O forno parou de esquentar" },
  { endSecond: 9.9, startSecond: 7.6, text: "desde ontem à noite" },
  { endSecond: 12.5, startSecond: 9.9, text: "e eu queria abrir um chamado" },
  { endSecond: 14.2, startSecond: 12.5, text: "de garantia." },
  { endSecond: 16.8, startSecond: 14.2, text: "O contrato é o 2024-0187." },
];

const duracao = 16.8;

// Simula a reprodução: avança o tempo sem áudio de verdade.
export default function AiTranscriptionDemo() {
  const [tempo, setTempo] = useState(0);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    if (!tocando) {
      return;
    }
    const timer = setInterval(() => {
      setTempo((atual) => Math.min(atual + 0.1, duracao));
    }, 100);
    return () => clearInterval(timer);
  }, [tocando]);

  useEffect(() => {
    if (tempo >= duracao) {
      setTocando(false);
    }
  }, [tempo]);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button
          aria-label={tocando ? "Pausar" : "Reproduzir"}
          onClick={() => {
            if (tempo >= duracao) {
              setTempo(0);
            }
            setTocando((atual) => !atual);
          }}
          size="icon"
          variant="outline"
        >
          {tocando ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <span className="text-muted-foreground text-xs tabular-nums">
          {tempo.toFixed(1)} s / {duracao.toFixed(1)} s
        </span>
      </div>
      <Transcription currentTime={tempo} onSeek={setTempo} segments={segmentos}>
        {(segmento, indice) => (
          <TranscriptionSegment
            index={indice}
            key={segmento.startSecond}
            segment={segmento}
          />
        )}
      </Transcription>
    </div>
  );
}
