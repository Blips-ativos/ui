"use client";

import { SpeechInput } from "@blips/ai/components/speech-input";
import { useState } from "react";

export default function AiSpeechInputDemo() {
  const [texto, setTexto] = useState("");

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <SpeechInput
        onTranscriptionChange={(trecho) =>
          setTexto((atual) => (atual ? `${atual} ${trecho}` : trecho))
        }
        size="icon-lg"
      />
      <p className="min-h-10 w-full rounded-md border p-3 text-sm">
        {texto || (
          <span className="text-muted-foreground">
            Clique no microfone e fale. O texto reconhecido aparece aqui.
          </span>
        )}
      </p>
    </div>
  );
}
