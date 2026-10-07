"use client";

import { Sandbox, SandboxHeader } from "@blips/ai/components/sandbox";

export default function AiSandboxEstados() {
  return (
    <div className="flex w-full max-w-xl flex-col">
      <Sandbox defaultOpen={false}>
        <SandboxHeader state="input-streaming" title="gerar_relatorio.py" />
      </Sandbox>
      <Sandbox defaultOpen={false}>
        <SandboxHeader state="input-available" title="consultar_bigquery.py" />
      </Sandbox>
      <Sandbox defaultOpen={false}>
        <SandboxHeader state="output-available" title="analise_parcelas.py" />
      </Sandbox>
      <Sandbox defaultOpen={false}>
        <SandboxHeader state="output-error" title="exportar_planilha.py" />
      </Sandbox>
    </div>
  );
}
