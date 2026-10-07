"use client";

import {
  JSXPreview,
  JSXPreviewContent,
} from "@blips/ai/components/jsx-preview";

// Trecho parcial, como chega no meio do streaming: as tags abertas ficam sem
// fechamento e a última está cortada. Com isStreaming, o JSXPreview descarta a
// tag incompleta e fecha as abertas antes de renderizar.
const parcial = `<div className="flex flex-col gap-2 rounded-lg border p-4">
  <span className="font-medium">Resumo do atendimento</span>
  <ul className="list-disc pl-5 text-muted-foreground text-sm">
    <li>Cliente pediu a segunda via do boleto</li>
    <li>Boleto reenviado por e-mail</li>
    <li className="te`;

export default function AiJsxPreviewStreaming() {
  return (
    <div className="w-full max-w-md">
      <JSXPreview isStreaming jsx={parcial}>
        <JSXPreviewContent />
      </JSXPreview>
    </div>
  );
}
