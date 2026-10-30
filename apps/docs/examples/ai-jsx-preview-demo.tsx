"use client";

import {
  JSXPreview,
  JSXPreviewContent,
  JSXPreviewError,
} from "@blips/ai/components/jsx-preview";
import { Badge } from "@blips/ui/components/badge";
import type { ReactNode } from "react";

const jsx = `<div className="flex flex-col gap-3 rounded-lg border p-4">
  <div className="flex items-center justify-between">
    <span className="font-medium">Contrato CT-2026-0412</span>
    <Status>Ativo</Status>
  </div>
  <p className="text-muted-foreground text-sm">
    14 de 36 parcelas pagas. Próximo vencimento em {vencimento}.
  </p>
</div>`;

// Só os componentes listados aqui podem aparecer no JSX gerado.
const Status = ({ children }: { children?: ReactNode }) => (
  <Badge variant="secondary">{children}</Badge>
);

const components = { Status };
const bindings = { vencimento: "10/11/2026" };

export default function AiJsxPreviewDemo() {
  return (
    <div className="w-full max-w-md">
      <JSXPreview bindings={bindings} components={components} jsx={jsx}>
        <JSXPreviewContent />
        <JSXPreviewError />
      </JSXPreview>
    </div>
  );
}
