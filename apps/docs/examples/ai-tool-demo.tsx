"use client";

import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@blips/ai/components/tool";

const input = { cnpj: "12.345.678/0001-90", incluirEncerrados: false };

const output = {
  contratos: [
    {
      numero: "CT-2026-0412",
      status: "ativo",
      parcelasPagas: 14,
      parcelas: 36,
    },
  ],
};

export default function AiToolDemo() {
  return (
    <div className="w-full max-w-lg">
      <Tool defaultOpen>
        <ToolHeader
          state="output-available"
          title="buscar_contratos"
          type="tool-buscar_contratos"
        />
        <ToolContent>
          <ToolInput input={input} />
          <ToolOutput errorText={undefined} output={output} />
        </ToolContent>
      </Tool>
    </div>
  );
}
