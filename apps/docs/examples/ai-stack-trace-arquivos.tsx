"use client";

import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from "@blips/ai/components/stack-trace";
import { useState } from "react";

const trace = `RangeError: Valor de parcela fora do intervalo permitido
    at validarParcela (/app/src/financeiro/parcela.ts:88:11)
    at gerarCronograma (/app/src/financeiro/cronograma.ts:31:5)
    at Object.<anonymous> (/app/node_modules/vitest/dist/runner.js:120:3)
    at node:internal/main/run_main_module:28:49`;

export default function AiStackTraceArquivos() {
  const [aberto, setAberto] = useState("");

  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <StackTrace
        defaultOpen
        onFilePathClick={(arquivo, linha, coluna) =>
          setAberto(`${arquivo}, linha ${linha}, coluna ${coluna}`)
        }
        trace={trace}
      >
        <StackTraceHeader>
          <StackTraceError>
            <StackTraceErrorType />
            <StackTraceErrorMessage />
          </StackTraceError>
          <StackTraceActions>
            <StackTraceExpandButton />
          </StackTraceActions>
        </StackTraceHeader>
        <StackTraceContent>
          <StackTraceFrames showInternalFrames={false} />
        </StackTraceContent>
      </StackTrace>
      <p aria-live="polite" className="min-h-5 text-muted-foreground text-xs">
        {aberto ? `Abrir ${aberto}` : "Clique num arquivo para abri-lo."}
      </p>
    </div>
  );
}
