"use client";

import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentTool,
  type AgentToolProps,
  AgentTools,
} from "@blips/ai/components/agent";

// Ferramentas de exemplo como objetos simples (descrição + JSON Schema): o
// AgentTool só lê `description` e o schema. Num app com o AI SDK, passe o
// retorno de `tool({ ... })` direto.
type AgentToolDef = AgentToolProps["tool"];

// Sem `description`: o gatilho mostra o `emptyDescription`.
const consultarTrafego = {
  inputSchema: {
    type: "object",
    properties: { periodo: { type: "string", enum: ["dia", "semana", "mes"] } },
  },
} as unknown as AgentToolDef;

export default function AiAgentRotulos() {
  return (
    <div className="w-full max-w-lg">
      <Agent>
        <AgentHeader name="Agente de importação" />
        <AgentContent>
          <AgentInstructions label="Prompt de sistema">
            Responda só com dados da base de importação, sempre citando o
            período consultado.
          </AgentInstructions>
          <AgentTools
            defaultValue={["consultar_trafego"]}
            label="Ferramentas disponíveis"
          >
            <AgentTool
              emptyDescription="consultar_trafego (sem descrição)"
              tool={consultarTrafego}
              value="consultar_trafego"
            />
          </AgentTools>
        </AgentContent>
      </Agent>
    </div>
  );
}
