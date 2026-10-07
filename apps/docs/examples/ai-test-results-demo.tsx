"use client";

import {
  Test,
  TestError,
  TestErrorMessage,
  TestErrorStack,
  TestResults,
  TestResultsContent,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsProgress,
  TestResultsSummary,
  TestSuite,
  TestSuiteContent,
  TestSuiteName,
  TestSuiteStats,
} from "@blips/ai/components/test-results";

const summary = {
  passed: 11,
  failed: 1,
  skipped: 1,
  total: 13,
  duration: 2384,
};

export default function AiTestResultsDemo() {
  return (
    <div className="w-full max-w-2xl">
      <TestResults summary={summary}>
        <TestResultsHeader>
          <TestResultsSummary />
          <TestResultsDuration />
        </TestResultsHeader>
        <TestResultsContent>
          <TestResultsProgress />
          <TestSuite
            defaultOpen
            name="financeiro/parcelas.test.ts"
            status="failed"
          >
            <div className="flex items-center">
              <TestSuiteName className="flex-1" />
              <TestSuiteStats className="pr-4" failed={1} passed={3} />
            </div>
            <TestSuiteContent>
              <Test
                duration={12}
                name="soma as parcelas pagas"
                status="passed"
              />
              <Test
                duration={8}
                name="ignora parcelas canceladas"
                status="passed"
              />
              <Test
                duration={41}
                name="calcula juros de atraso"
                status="passed"
              />
              <div className="px-4 py-2">
                <Test
                  className="px-0 py-0"
                  duration={1120}
                  name="antecipa as parcelas restantes"
                  status="failed"
                />
                <TestError>
                  <TestErrorMessage>
                    Esperado R$ 4.320,00, recebido R$ 4.302,00
                  </TestErrorMessage>
                  <TestErrorStack>
                    {
                      "at Object.<anonymous> (src/financeiro/parcelas.test.ts:58:23)"
                    }
                  </TestErrorStack>
                </TestError>
              </div>
            </TestSuiteContent>
          </TestSuite>
          <TestSuite name="contratos/buscar.test.ts" status="passed">
            <div className="flex items-center">
              <TestSuiteName className="flex-1" />
              <TestSuiteStats className="pr-4" passed={1} skipped={1} />
            </div>
            <TestSuiteContent>
              <Test duration={6} name="busca por CNPJ" status="passed" />
              <Test name="busca por e-mail do responsável" status="skipped" />
            </TestSuiteContent>
          </TestSuite>
        </TestResultsContent>
      </TestResults>
    </div>
  );
}
