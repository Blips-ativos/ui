"use client";

import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentOutput,
  AgentTool,
  type AgentToolProps,
  AgentTools,
} from "@blips/ai/components/agent";

// Ferramentas de exemplo como objetos simples (descrição + JSON Schema): o
// AgentTool só lê `description` e o schema. Num app com o AI SDK, passe o
// retorno de `tool({ ... })` direto.
type AgentToolDef = AgentToolProps["tool"];

const buscarContratos = {
  description: "Busca os contratos de locação de um cliente pelo CNPJ",
  inputSchema: {
    type: "object",
    properties: {
      cnpj: { type: "string", description: "CNPJ do cliente" },
      incluirEncerrados: { type: "boolean" },
    },
    required: ["cnpj"],
  },
} as unknown as AgentToolDef;

const abrirChamado = {
  description: "Abre um chamado de garantia para um equipamento",
  inputSchema: {
    type: "object",
    properties: {
      numeroSerie: { type: "string" },
      defeito: { type: "string", description: "Descrição do defeito" },
    },
    required: ["numeroSerie", "defeito"],
  },
} as unknown as AgentToolDef;

const schemaDeSaida = `type Resposta = {
  resumo: string
  contratos: { numero: string; status: "ativo" | "encerrado" }[]
  chamadoAberto?: string
}`;

export default function AiAgentDemo() {
  return (
    <div className="w-full max-w-lg">
      <Agent>
        <AgentHeader
          model="anthropic/claude-sonnet-4-5"
          name="Agente de suporte"
        />
        <AgentContent>
          <AgentInstructions>
            Você atende clientes da Blips pelo WhatsApp. Consulte os contratos
            antes de responder sobre parcelas e abra chamado só depois de
            confirmar o número de série do equipamento.
          </AgentInstructions>
          <AgentTools>
            <AgentTool tool={buscarContratos} value="buscar_contratos" />
            <AgentTool tool={abrirChamado} value="abrir_chamado" />
          </AgentTools>
          <AgentOutput schema={schemaDeSaida} />
        </AgentContent>
      </Agent>
    </div>
  );
}
