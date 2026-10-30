"use client";

// Fixture que FALHA de propósito: componentes das fases 2–3 sem os peers no
// package.json, canvas sem o CSS do React Flow e jsx-preview sem o override.
import { Canvas } from "@blips/ai/components/canvas";
import { JSXPreview, JSXPreviewContent } from "@blips/ai/components/jsx-preview";
import { Terminal } from "@blips/ai/components/terminal";
import { BlipsImageGeneration } from "@blips/ai/fx/img-fx";

export function Flow({ jsx, output }: { jsx: string; output: string }) {
  return (
    <div className="grid gap-4">
      <Canvas edges={[]} nodes={[]} />
      <JSXPreview jsx={jsx}>
        <JSXPreviewContent />
      </JSXPreview>
      <Terminal output={output} />
      <BlipsImageGeneration />
    </div>
  );
}
