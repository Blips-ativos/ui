"use client";

import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariableValue,
} from "@blips/ai/components/environment-variables";
import { useState } from "react";

export default function AiEnvironmentVariablesExport() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <EnvironmentVariables
        onShowValuesChange={setMostrar}
        showValues={mostrar}
      >
        <EnvironmentVariablesHeader>
          <EnvironmentVariablesTitle>
            Sandbox do agente
          </EnvironmentVariablesTitle>
          <EnvironmentVariablesToggle />
        </EnvironmentVariablesHeader>
        <EnvironmentVariablesContent>
          <EnvironmentVariable name="AGENT_NAME" value="nascimento">
            <EnvironmentVariableName />
            <EnvironmentVariableGroup>
              <EnvironmentVariableValue />
              <EnvironmentVariableCopyButton
                copyFormat="export"
                copyLabel="Copiar como export"
              />
            </EnvironmentVariableGroup>
          </EnvironmentVariable>
          <EnvironmentVariable name="HEALTH_PORT" value="8765" />
        </EnvironmentVariablesContent>
      </EnvironmentVariables>
      <p className="text-muted-foreground text-xs">
        Valores {mostrar ? "visíveis" : "ocultos"}.
      </p>
    </div>
  );
}
