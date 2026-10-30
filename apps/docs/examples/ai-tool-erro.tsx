"use client";

import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@blips/ai/components/tool";

export default function AiToolErro() {
  return (
    <div className="w-full max-w-lg">
      <Tool defaultOpen>
        <ToolHeader
          state="output-error"
          toolName="consultar_telemetria"
          type="dynamic-tool"
        />
        <ToolContent>
          <ToolInput input={{ equipamento: "BLP-88213" }} />
          <ToolOutput
            errorText="Equipamento sem leitura de telemetria nas últimas 24 horas."
            output={undefined}
          />
        </ToolContent>
      </Tool>
    </div>
  );
}
