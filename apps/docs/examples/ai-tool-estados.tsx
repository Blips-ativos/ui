"use client";

import { Tool, ToolHeader, type ToolPart } from "@blips/ai/components/tool";

const estados: ToolPart["state"][] = [
  "input-streaming",
  "input-available",
  "approval-requested",
  "approval-responded",
  "output-available",
  "output-error",
  "output-denied",
];

export default function AiToolEstados() {
  return (
    <div className="flex w-full max-w-lg flex-col">
      {estados.map((state) => (
        <Tool key={state}>
          <ToolHeader state={state} type="tool-consultar_titulos" />
        </Tool>
      ))}
    </div>
  );
}
