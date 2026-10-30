"use client";

import {
  SchemaDisplay,
  SchemaDisplayContent,
  SchemaDisplayDescription,
  SchemaDisplayExample,
  SchemaDisplayHeader,
  SchemaDisplayMethod,
  SchemaDisplayPath,
  SchemaDisplayRequest,
  SchemaDisplayResponse,
} from "@blips/ai/components/schema-display";

const corpo = [
  {
    description: "Identificador do contrato.",
    name: "contratoId",
    required: true,
    type: "string",
  },
  {
    description: "Nova data de vencimento (AAAA-MM-DD).",
    name: "vencimento",
    required: true,
    type: "string",
  },
  {
    name: "motivo",
    type: "string",
  },
];

const exemplo = `{
  "id": "PR-2026-0098",
  "status": "aprovada"
}`;

export default function AiSchemaDisplayComposicao() {
  return (
    <SchemaDisplay
      className="w-full max-w-2xl"
      description="Pede a prorrogação do vencimento de uma parcela."
      method="POST"
      path="/prorrogacoes"
      requestBody={corpo}
      requiredLabel="obrigatória"
    >
      <SchemaDisplayHeader>
        <SchemaDisplayMethod />
        <SchemaDisplayPath />
      </SchemaDisplayHeader>
      <SchemaDisplayDescription />
      <SchemaDisplayContent>
        <SchemaDisplayRequest label="Dados da prorrogação" />
        <SchemaDisplayResponse label="Exemplo de resposta">
          <div className="pt-4">
            <SchemaDisplayExample>{exemplo}</SchemaDisplayExample>
          </div>
        </SchemaDisplayResponse>
      </SchemaDisplayContent>
    </SchemaDisplay>
  );
}
