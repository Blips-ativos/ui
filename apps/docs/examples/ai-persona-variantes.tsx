"use client";

import type { PersonaProps } from "@blips/ai/components/persona";
import { Persona } from "@blips/ai/components/persona";

const variantes: NonNullable<PersonaProps["variant"]>[] = [
  "obsidian",
  "command",
  "glint",
  "halo",
  "mana",
  "opal",
];

export default function AiPersonaVariantes() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {variantes.map((variante) => (
        <div className="flex flex-col items-center gap-2" key={variante}>
          <Persona state="idle" variant={variante} />
          <span className="font-mono text-muted-foreground text-xs">
            {variante}
          </span>
        </div>
      ))}
    </div>
  );
}
