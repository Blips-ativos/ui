"use client";

import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from "@blips/ai/components/stack-trace";

const trace = `TypeError: Cannot read properties of undefined (reading 'parcelas')
    at calcularSaldo (/app/src/financeiro/saldo.ts:42:18)
    at buscarContrato (/app/src/contratos/buscar.ts:17:9)
    at async Promise.all (index 0)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at Router.handle (/app/node_modules/express/lib/router/index.js:284:7)`;

export default function AiStackTraceDemo() {
  return (
    <div className="w-full max-w-2xl">
      <StackTrace defaultOpen trace={trace}>
        <StackTraceHeader>
          <StackTraceError>
            <StackTraceErrorType />
            <StackTraceErrorMessage />
          </StackTraceError>
          <StackTraceActions>
            <StackTraceCopyButton />
            <StackTraceExpandButton />
          </StackTraceActions>
        </StackTraceHeader>
        <StackTraceContent>
          <StackTraceFrames />
        </StackTraceContent>
      </StackTrace>
    </div>
  );
}
