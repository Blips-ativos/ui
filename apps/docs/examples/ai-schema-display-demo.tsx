"use client";

import { SchemaDisplay } from "@blips/ai/components/schema-display";

export default function AiSchemaDisplayDemo() {
  return (
    <SchemaDisplay
      className="w-full max-w-2xl"
      description="Lista os contratos de um cliente, com o status de cada parcela."
      method="GET"
      parameters={[
        {
          description: "CNPJ do cliente, só dígitos.",
          location: "path",
          name: "cnpj",
          required: true,
          type: "string",
        },
        {
          description: "Inclui contratos encerrados no resultado.",
          location: "query",
          name: "incluirEncerrados",
          type: "boolean",
        },
      ]}
      path="/clientes/{cnpj}/contratos"
      responseBody={[
        {
          items: {
            name: "contrato",
            properties: [
              { name: "numero", required: true, type: "string" },
              {
                description: "ativo, encerrado ou em_atraso",
                name: "status",
                required: true,
                type: "string",
              },
              { name: "parcelasPagas", type: "integer" },
              { name: "parcelas", type: "integer" },
            ],
            type: "object",
          },
          name: "contratos",
          required: true,
          type: "array",
        },
        { description: "Total de contratos.", name: "total", type: "integer" },
      ]}
    />
  );
}
