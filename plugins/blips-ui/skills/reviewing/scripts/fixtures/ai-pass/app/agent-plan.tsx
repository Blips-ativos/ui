"use client";

// Componentes das fases 2–3 sem peer: o check não pode acusá-los como subpath
// inexistente nem cobrar peer (prova do mapa estático, sem node_modules).
import {
  Plan,
  PlanContent,
  PlanDescription,
  PlanHeader,
  PlanTitle,
} from "@blips/ai/components/plan";
import { Snippet, SnippetCopyButton, SnippetInput } from "@blips/ai/components/snippet";
import { BlipsVoiceBeam } from "@blips/ai/fx/voice-glow";

export function AgentPlan({ title, steps }: { title: string; steps: string }) {
  return (
    <Plan defaultOpen>
      <PlanHeader>
        <PlanTitle>{title}</PlanTitle>
        <PlanDescription>Plano proposto pelo agente</PlanDescription>
      </PlanHeader>
      <PlanContent>
        {steps}
        <Snippet code="pnpm add @blips/ai">
          <SnippetInput />
          <SnippetCopyButton />
        </Snippet>
        <BlipsVoiceBeam />
      </PlanContent>
    </Plan>
  );
}
