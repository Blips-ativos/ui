"use client";

import type { PersonaState } from "@blips/ai/components/persona";
import { Persona } from "@blips/ai/components/persona";
import { Button } from "@blips/ui/components/button";
import { useState } from "react";

const estados: { state: PersonaState; rotulo: string }[] = [
  { rotulo: "Parada", state: "idle" },
  { rotulo: "Ouvindo", state: "listening" },
  { rotulo: "Pensando", state: "thinking" },
  { rotulo: "Falando", state: "speaking" },
  { rotulo: "Dormindo", state: "asleep" },
];

// O estado vem do app (por exemplo, do ciclo de um agente de voz); aqui ele é
// escolhido nos botões. O .riv da variante é carregado do blob da Vercel.
export default function AiPersonaDemo() {
  const [estado, setEstado] = useState<PersonaState>("idle");

  return (
    <div className="flex flex-col items-center gap-6">
      <Persona className="size-32" state={estado} variant="obsidian" />
      <div className="flex flex-wrap justify-center gap-2">
        {estados.map(({ state, rotulo }) => (
          <Button
            aria-pressed={estado === state}
            key={state}
            onClick={() => setEstado(state)}
            size="sm"
            variant={estado === state ? "default" : "outline"}
          >
            {rotulo}
          </Button>
        ))}
      </div>
    </div>
  );
}
