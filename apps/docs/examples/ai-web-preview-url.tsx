"use client";

import {
  WebPreview,
  WebPreviewBody,
  WebPreviewNavigation,
  WebPreviewUrl,
} from "@blips/ai/components/web-preview";
import { useState } from "react";

const paginas: Record<string, string> = {
  "/": "Início",
  "/contratos": "Lista de contratos",
  "/financeiro": "Resumo financeiro",
};

const montarHtml = (titulo: string) => `<!doctype html>
<html lang="pt-BR">
  <body style="font-family: system-ui, sans-serif; padding: 24px; color: #18181b;">
    <h1 style="font-size: 20px; margin: 0;">${titulo}</h1>
  </body>
</html>`;

export default function AiWebPreviewUrl() {
  const [url, setUrl] = useState("/");
  const titulo = paginas[url] ?? "Página não encontrada";

  return (
    <div className="flex h-[280px] w-full max-w-2xl flex-col gap-2">
      <WebPreview defaultUrl="/" onUrlChange={setUrl}>
        <WebPreviewNavigation>
          <WebPreviewUrl placeholder="Digite /contratos ou /financeiro e tecle Enter" />
        </WebPreviewNavigation>
        <WebPreviewBody srcDoc={montarHtml(titulo)} />
      </WebPreview>
      <p className="text-muted-foreground text-xs">
        URL atual: <code>{url}</code>
      </p>
    </div>
  );
}
