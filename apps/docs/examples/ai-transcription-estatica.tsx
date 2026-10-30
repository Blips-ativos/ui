"use client";

import {
  Transcription,
  TranscriptionSegment,
} from "@blips/ai/components/transcription";

const segmentos = [
  { endSecond: 3.1, startSecond: 0, text: "Bom dia, preciso remarcar" },
  { endSecond: 5.6, startSecond: 3.1, text: "a visita do técnico" },
  { endSecond: 8.2, startSecond: 5.6, text: "para quinta-feira à tarde." },
];

// Sem `onSeek`, os trechos não são clicáveis; `currentTime` fixo marca o
// trecho ativo (o segundo) e os já lidos.
export default function AiTranscriptionEstatica() {
  return (
    <Transcription className="max-w-md" currentTime={4} segments={segmentos}>
      {(segmento, indice) => (
        <TranscriptionSegment
          index={indice}
          key={segmento.startSecond}
          segment={segmento}
        />
      )}
    </Transcription>
  );
}
