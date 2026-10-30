# Chart

Import: `@blips/ui/components/chart`

Wrappers do shadcn para gráficos Recharts: tema por variáveis CSS, tooltip e
legenda estilizados.

Exports (iguais nas duas versões): `ChartContainer`, `ChartTooltip`,
`ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle` e o tipo
`ChartConfig`. O hook interno `useChart` **não** é exportado.

## Notas comuns

| Export | Descrição |
|---|---|
| `ChartContainer` | Raiz: provê o `ChartConfig`, injeta as variáveis `--color-<chave>` e envolve o gráfico em `ResponsiveContainer`. Classe base `flex aspect-video justify-center text-xs`. |
| `ChartTooltip` | O `Tooltip` do Recharts. Use com `content={<ChartTooltipContent />}`. |
| `ChartTooltipContent` | Tooltip estilizado: `hideLabel`, `hideIndicator`, `indicator` (`"dot" \| "line" \| "dashed"`, padrão `"dot"`), `nameKey`, `labelKey`, `labelFormatter`, `formatter`, `labelClassName`, `color`. |
| `ChartLegend` | O `Legend` do Recharts. Use com `content={<ChartLegendContent />}`. |
| `ChartLegendContent` | Legenda estilizada: `hideIcon`, `nameKey`, `verticalAlign` (`"top" \| "bottom"`, padrão `"bottom"`). |
| `ChartStyle` | Gera o `<style>` com as variáveis por tema (uso interno). |

`ChartConfig` mapeia cada chave dos dados para `{ label?, icon?, color? }` ou
`{ label?, icon?, theme: { light, dark } }`:

```ts
const chartConfig = {
  receita: { label: "Receita", color: "var(--chart-1)" },
  despesa: { label: "Despesa", color: "var(--chart-2)" },
} satisfies ChartConfig;
```

Regras do projeto (valem nas duas versões):

- Sempre envolva o gráfico em `ChartContainer` e dê altura mínima: `className="min-h-[200px] w-full"`.
- Cores: tokens do tema (`var(--chart-1)` … `var(--chart-5)`) no config e `var(--color-<chave>)` nos elementos (`fill`, `stroke`). Nunca hex hardcoded.
- Use `satisfies ChartConfig`.
- Tooltip/legenda: sempre os wrappers da lib, nunca o conteúdo padrão do Recharts.
- Valores monetários no `formatter`: `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`.
- Guias de composição: `components/charts/*.md`; blocos prontos: `blocks/chart-compositions.md`.

> A API difere entre as versões (recharts 2 vs 3, tipos do tooltip/legenda, `initialDimension`). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Usa **recharts 3** (3.10.x). Quem escreve código Recharts direto no gráfico segue a API do recharts 3 (props/tipos removidos do 2, `Customized` etc.: ver o guia de migração do recharts 3).

- `ChartContainer` ganhou `initialDimension?: { width: number; height: number }` (padrão `320x200`), repassado ao `ResponsiveContainer` — define a medida da renderização inicial/SSR, antes de medir o contêiner.
- `ChartTooltipContent` tipado com `DefaultTooltipContentProps` do recharts 3; `ChartLegendContent` recebe `DefaultLegendContentProps`. `formatter`/`labelFormatter` tipados contra o recharts 2 podem precisar de ajuste.
- O tooltip agora mostra valor `0` (antes era escondido) e valores não numéricos via `String()`. Container `min-w-32 text-xs/relaxed`.
- No recharts 3, `accessibilityLayer` já vem ligado por padrão nos gráficos; não precisa passar.

```tsx
"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@blips/ui/components/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const chartData = [
  { mes: "Janeiro", receita: 18600, despesa: 8000 },
  { mes: "Fevereiro", receita: 30500, despesa: 20000 },
  { mes: "Março", receita: 23700, despesa: 12000 },
];

const chartConfig = {
  receita: { label: "Receita", color: "var(--chart-1)" },
  despesa: { label: "Despesa", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function GraficoReceita() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="mes"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent formatter={(value) => brl.format(Number(value))} />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="receita" fill="var(--color-receita)" radius={4} />
        <Bar dataKey="despesa" fill="var(--color-despesa)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
```

## v2.x — Radix

Usa **recharts 2** (2.15.x). Não existe `initialDimension`.

- `ChartTooltipContent` usa os tipos do `Tooltip` do recharts 2; `ChartLegendContent` recebe `Pick<LegendProps, "payload" | "verticalAlign">`.
- O tooltip esconde valor `0` (`item.value && …`). Container `min-w-[8rem] text-xs`.
- Passe `accessibilityLayer` no gráfico raiz (`BarChart`, `LineChart`…) para os atributos ARIA.

```tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@blips/ui/components/chart"

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

const chartData = [
  { mes: "Janeiro", receita: 18600, despesa: 8000 },
  { mes: "Fevereiro", receita: 30500, despesa: 20000 },
  { mes: "Março", receita: 23700, despesa: 12000 },
]

const chartConfig = {
  receita: { label: "Receita", color: "var(--chart-1)" },
  despesa: { label: "Despesa", color: "var(--chart-2)" },
} satisfies ChartConfig

export function GraficoReceita() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="mes"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          content={<ChartTooltipContent formatter={(value) => brl.format(Number(value))} />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="receita" fill="var(--color-receita)" radius={4} />
        <Bar dataKey="despesa" fill="var(--color-despesa)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

## Exemplos na docs

`chart-demo`, `chart-example`, `chart-example-axis`, `chart-example-grid`, `chart-example-tooltip`, `chart-example-legend`, `chart-tooltip`, `chart-area`, `chart-line`, `chart-pie`, `chart-radar`, `chart-radial` (v3, recharts 3).
