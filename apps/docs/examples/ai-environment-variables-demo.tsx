"use client";

import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariableRequired,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariableValue,
} from "@blips/ai/components/environment-variables";

const variaveis = [
  {
    nome: "DATABASE_URL",
    obrigatoria: true,
    valor: "postgresql://agente:segredo@localhost:5432/agentes",
  },
  {
    nome: "LITELLM_BASE_URL",
    obrigatoria: true,
    valor: "https://litellm.exemplo.com.br",
  },
  { nome: "LANGFUSE_PUBLIC_KEY", obrigatoria: false, valor: "pk-lf-0a1b2c3d" },
  { nome: "LOG_LEVEL", obrigatoria: false, valor: "info" },
];

export default function AiEnvironmentVariablesDemo() {
  return (
    <EnvironmentVariables className="w-full max-w-xl">
      <EnvironmentVariablesHeader>
        <EnvironmentVariablesTitle />
        <EnvironmentVariablesToggle />
      </EnvironmentVariablesHeader>
      <EnvironmentVariablesContent>
        {variaveis.map((v) => (
          <EnvironmentVariable key={v.nome} name={v.nome} value={v.valor}>
            <EnvironmentVariableGroup>
              <EnvironmentVariableName />
              {v.obrigatoria && <EnvironmentVariableRequired />}
            </EnvironmentVariableGroup>
            <EnvironmentVariableGroup className="min-w-0">
              <EnvironmentVariableValue className="truncate" />
              <EnvironmentVariableCopyButton />
            </EnvironmentVariableGroup>
          </EnvironmentVariable>
        ))}
      </EnvironmentVariablesContent>
    </EnvironmentVariables>
  );
}
