# TestResults

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/test-results`

Relatório de uma execução de testes: cabeçalho com badges de contagem
(aprovados, com falha, ignorados) e duração, barra de progresso, suítes
recolhíveis com ícone de status e contagens, testes com duração e caixa de
erro (mensagem + pilha). Textos e durações em pt-BR (`850 ms`, `2,38 s`).
Adaptado do `test-results` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** quando o agente roda a suíte (pytest, Vitest, Jest) e você quer um
  resultado navegável: o que passou, o que falhou e por quê.
- **Não use** para a saída crua do runner: isso é o `Terminal`
  (`terminal.md`); os dois combinam (relatório + aba com o log).
- **Não use** para um erro isolado com pilha clicável: isso é o
  `StackTrace` (`stack-trace.md`).
- **Não use** para checklist de tarefas do agente: isso é `Task`/`Plan`
  (`task.md`, `plan.md`), cujos itens não têm semântica de teste.

## Import

```tsx
import {
  Test,
  TestDuration,
  TestError,
  TestErrorMessage,
  TestErrorStack,
  TestName,
  TestResults,
  TestResultsContent,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsProgress,
  TestResultsSummary,
  TestStatus,
  TestSuite,
  TestSuiteContent,
  TestSuiteName,
  TestSuiteStats,
  type TestResultsLabels,
} from "@blips/ai/components/test-results";
```

## Peers exigidos

Nenhum além da @blips/ai (usa `Badge` e `Collapsible` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

## API

Status de suíte/teste: `"passed" | "failed" | "skipped" | "running"` (tipo
interno; escreva o literal). Resumo:
`{ passed: number; failed: number; skipped: number; total: number; duration?: number }`
(ms; tipo interno, não exportado).

| Componente | Props reais | Notas |
|---|---|---|
| `TestResults` | `HTMLAttributes<HTMLDivElement>` + `summary?` | Raiz e contexto (`rounded-lg border bg-background`). **Sem `children`**: só o cabeçalho (resumo + duração), se houver `summary`. Com `children`: só eles. |
| `TestResultsHeader` | `HTMLAttributes<HTMLDivElement>` | Faixa `justify-between` com `border-b`. |
| `TestResultsSummary` | `HTMLAttributes<HTMLDivElement>` + `labels?: Partial<TestResultsLabels>` | Badges: aprovados sempre; com falha e ignorados só se > 0. Padrão `"aprovados"`, `"com falha"`, `"ignorados"`. `null` sem `summary`. |
| `TestResultsDuration` | `HTMLAttributes<HTMLSpanElement>` | `summary.duration` formatado; **some se for `0` ou ausente**. |
| `TestResultsProgress` | `HTMLAttributes<HTMLDivElement>` + `formatLabel?: (passed, total) => ReactNode` (padrão `"{passed}/{total} testes aprovados"`) | Barra verde/vermelha + rótulo + `%`. Com `total` 0, mostra 0% (sem `NaN`). |
| `TestResultsContent` | `HTMLAttributes<HTMLDivElement>` | `space-y-2 p-4` para progresso e suítes. |
| `TestSuite` | props do `Collapsible` da @blips/ui + `name: string`, `status` (ambos obrigatórios) | Moldura `rounded-lg border`. Fechada por padrão (`defaultOpen` para abrir). |
| `TestSuiteName` | props do `CollapsibleTrigger` | `<button>` com caret, ícone do status e `name` (ou `children`). |
| `TestSuiteStats` | `HTMLAttributes<HTMLDivElement>` + `passed?`, `failed?`, `skipped?` (padrão `0`), `labels?: Partial<TestResultsLabels>` | Contagens coloridas, só as > 0. `ml-auto`. |
| `TestSuiteContent` | props do `CollapsibleContent` | Lista `divide-y` dos testes. |
| `Test` | `HTMLAttributes<HTMLDivElement>` + `name: string`, `status` (obrigatórios), `duration?: number` (ms) | Linha `flex items-center`. **Sem `children`**: status + nome + duração. Com `children`: só eles. |
| `TestStatus` | `HTMLAttributes<HTMLSpanElement>` | Ícone do status do `Test` (ou `children`). |
| `TestName` | `HTMLAttributes<HTMLSpanElement>` | Nome do `Test` (ou `children`). |
| `TestDuration` | `HTMLAttributes<HTMLSpanElement>` | `"1.234 ms"`; `null` sem `duration`. |
| `TestError` | `HTMLAttributes<HTMLDivElement>` | Caixa vermelha `mt-2 rounded-md p-3`. |
| `TestErrorMessage` | `HTMLAttributes<HTMLParagraphElement>` | Mensagem em destaque. |
| `TestErrorStack` | `HTMLAttributes<HTMLPreElement>` | `<pre>` mono rolável. |

`TestResultsLabels` = `{ passed: string; failed: string; skipped: string }`.
Todos os tipos de props são exportados (`TestResultsProps`, …,
`TestErrorStackProps`).

## Composição com a @blips/ui

- Cabeçalho da suíte com contagens na mesma linha: um `div` `flex
  items-center` com `TestSuiteName className="flex-1"` e `TestSuiteStats` ao
  lado. **Não** ponha as contagens dentro do `TestSuiteName` (é um botão).
- Falha com pilha JS clicável: troque o `TestErrorStack` pelo `StackTrace`
  (`stack-trace.md`).
- Relatório + log: `Tabs` da @blips/ui (ou `Sandbox`) com o `TestResults`
  numa aba e o `Terminal` na outra.
- No chat, vai no `MessageContent` do `Message` da @blips/ui, sem `Bubble`.

## Exemplo v3 que compila

```tsx
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

const resumo = { passed: 41, failed: 1, skipped: 2, total: 44, duration: 8312 };

export function RelatorioDeTestes() {
  return (
    <TestResults className="w-full max-w-2xl" summary={resumo}>
      <TestResultsHeader>
        <TestResultsSummary />
        <TestResultsDuration />
      </TestResultsHeader>
      <TestResultsContent>
        <TestResultsProgress />
        <TestSuite defaultOpen name="tests/test_titulos.py" status="failed">
          <div className="flex items-center">
            <TestSuiteName className="flex-1" />
            <TestSuiteStats className="pr-4" failed={1} passed={6} />
          </div>
          <TestSuiteContent>
            <Test
              duration={14}
              name="lista títulos em aberto"
              status="passed"
            />
            <div className="px-4 py-2">
              <Test
                className="px-0 py-0"
                duration={230}
                name="calcula juros de atraso"
                status="failed"
              />
              <TestError>
                <TestErrorMessage>
                  AssertionError: esperado 4320.00, recebido 4302.00
                </TestErrorMessage>
                <TestErrorStack>
                  {
                    "tests/test_titulos.py:58: in test_juros\n    assert total == 4320.00"
                  }
                </TestErrorStack>
              </TestError>
            </div>
          </TestSuiteContent>
        </TestSuite>
        <TestSuite name="tests/test_contratos.py" status="passed">
          <div className="flex items-center">
            <TestSuiteName className="flex-1" />
            <TestSuiteStats className="pr-4" passed={35} skipped={2} />
          </div>
          <TestSuiteContent>
            <Test name="busca por CNPJ" status="passed" />
            <Test name="busca por e-mail" status="skipped" />
          </TestSuiteContent>
        </TestSuite>
      </TestResultsContent>
    </TestResults>
  );
}
```

## Armadilhas

- **`TestError` dentro do `Test` não funciona bem.** `Test` é uma linha
  `flex items-center` e, com `children`, perde o layout padrão. Ponha o
  `TestError` **depois** do `Test`, num `div` com o padding da linha
  (`px-4 py-2`) e o `Test` com `className="px-0 py-0"`, como no exemplo.
- **Os números são do app.** O componente não soma nada: `summary` e as
  contagens de cada `TestSuiteStats` vêm do relatório do runner (JSON do
  pytest/Vitest). Se não baterem, a tela mente.
- **Durações em milissegundos.** Passar segundos (`duration={8.3}`) mostra
  `8,3 ms`.
- **`duration: 0` esconde a duração do cabeçalho** (checagem falsy); já
  `TestDuration` com `0` mostra `0 ms`.
- **Status `running`** só existe para suíte/teste (ícone pulsando); o resumo
  não tem contagem de "executando". Durante a execução, atualize `summary`
  aos poucos ou mostre o `Terminal`.
- **Cores fixas** (green/red/yellow/blue do upstream), não tokens; é o
  esperado.
