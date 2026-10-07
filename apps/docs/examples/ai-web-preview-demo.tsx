"use client";

import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from "@blips/ai/components/web-preview";
import {
  ArrowClockwiseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";

// A prévia usa srcDoc com HTML estático: nada é carregado da rede.
const html = `<!doctype html>
<html lang="pt-BR">
  <body style="font-family: system-ui, sans-serif; margin: 0; padding: 24px; color: #18181b;">
    <h1 style="font-size: 20px; margin: 0 0 8px;">Simulador de antecipação</h1>
    <p style="color: #71717a; margin: 0 0 16px;">Contrato CT-2026-0412 · 22 parcelas restantes</p>
    <div style="border: 1px solid #e4e4e7; border-radius: 8px; padding: 16px;">
      <strong>Valor para quitar hoje:</strong> R$ 31.480,00
    </div>
  </body>
</html>`;

const logs = [
  {
    level: "log" as const,
    message: "Página gerada pelo agente",
    timestamp: new Date(2026, 9, 6, 14, 32, 5),
  },
  {
    level: "warn" as const,
    message: "Taxa de desconto usando o valor padrão (1,2% a.m.)",
    timestamp: new Date(2026, 9, 6, 14, 32, 6),
  },
];

export default function AiWebPreviewDemo() {
  return (
    <div className="h-[420px] w-full max-w-2xl">
      <WebPreview defaultUrl="https://simulador.exemplo.com.br/antecipacao">
        <WebPreviewNavigation>
          <WebPreviewNavigationButton disabled tooltip="Voltar">
            <ArrowLeftIcon className="size-4" />
          </WebPreviewNavigationButton>
          <WebPreviewNavigationButton disabled tooltip="Avançar">
            <ArrowRightIcon className="size-4" />
          </WebPreviewNavigationButton>
          <WebPreviewNavigationButton tooltip="Recarregar">
            <ArrowClockwiseIcon className="size-4" />
          </WebPreviewNavigationButton>
          <WebPreviewUrl />
        </WebPreviewNavigation>
        <WebPreviewBody srcDoc={html} title="Prévia do simulador" />
        <WebPreviewConsole logs={logs} />
      </WebPreview>
    </div>
  );
}
