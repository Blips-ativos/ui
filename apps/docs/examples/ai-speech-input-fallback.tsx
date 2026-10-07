"use client";

import { SpeechInput } from "@blips/ai/components/speech-input";
import { useState } from "react";

// No Firefox e no Safari, sem Web Speech API, o SpeechInput grava com o
// MediaRecorder e entrega o áudio em `onAudioRecorded`. Num app real, o Blob
// vai para um serviço de transcrição; aqui a resposta é fixa e nada sai da página.
async function transcreverSimulado(audio: Blob): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return `Quero a segunda via do boleto de outubro (${Math.round(audio.size / 1024)} KB de áudio).`;
}

export default function AiSpeechInputFallback() {
  const [texto, setTexto] = useState("");

  return (
    <div className="flex w-full max-w-md items-center gap-3">
      <SpeechInput
        labels={{
          processing: "Enviando áudio",
          start: "Gravar mensagem",
          stop: "Parar gravação",
        }}
        onAudioRecorded={transcreverSimulado}
        onTranscriptionChange={setTexto}
      />
      <p className="flex-1 text-sm">
        {texto || (
          <span className="text-muted-foreground">Nenhuma gravação ainda.</span>
        )}
      </p>
    </div>
  );
}
