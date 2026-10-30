"use client";

import {
  TestResults,
  TestResultsContent,
  TestResultsProgress,
} from "@blips/ai/components/test-results";

const summary = {
  passed: 212,
  failed: 0,
  skipped: 1,
  total: 213,
  duration: 8410,
};

export default function AiTestResultsResumo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      {/* Sem children: o cabeçalho com o resumo e a duração é montado sozinho. */}
      <TestResults summary={summary} />
      <TestResults summary={{ ...summary, failed: 3, passed: 209 }}>
        <TestResultsContent>
          <TestResultsProgress
            formatLabel={(passed, total) => `${passed} de ${total} passaram`}
          />
        </TestResultsContent>
      </TestResults>
    </div>
  );
}
