# Legend - Referencia

Customizacao de legendas em charts.

## Uso Basico

```tsx
import { ChartLegend, ChartLegendContent } from "@blips/ui/components/chart"

<ChartLegend content={<ChartLegendContent />} />
```

---

## Props do ChartLegendContent

| Prop | Tipo | Descricao |
|------|------|-----------|
| `nameKey` | string | Config/data key para os nomes |
| `verticalAlign` | `top` \| `bottom` | Posicao vertical |
| `align` | `left` \| `center` \| `right` | Alinhamento horizontal |

---

## Posicionamento

### Topo (padrao)

```tsx
<ChartLegend content={<ChartLegendContent />} />
```

### Inferior

```tsx
<ChartLegend
  verticalAlign="bottom"
  content={<ChartLegendContent />}
/>
```

---

## Keys Customizadas

Use `nameKey` para mapear dados com estrutura diferente:

```tsx
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  chrome: {
    label: "Google Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Apple Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

```tsx
<ChartLegend content={<ChartLegendContent nameKey="browser" />} />
```

Resultado: Exibe "Google Chrome" e "Apple Safari" na legenda (do config).

---

## Exemplo com Pie Chart

```tsx
import { Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@blips/ui/components/chart"

const chartData = [
  { categoria: "alimentacao", valor: 1200, fill: "var(--color-alimentacao)" },
  { categoria: "transporte", valor: 800, fill: "var(--color-transporte)" },
  { categoria: "lazer", valor: 400, fill: "var(--color-lazer)" },
  { categoria: "outros", valor: 300, fill: "var(--color-outros)" },
]

const chartConfig = {
  valor: {
    label: "Valor",
  },
  alimentacao: {
    label: "Alimentacao",
    color: "var(--chart-1)",
  },
  transporte: {
    label: "Transporte",
    color: "var(--chart-2)",
  },
  lazer: {
    label: "Lazer",
    color: "var(--chart-3)",
  },
  outros: {
    label: "Outros",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function ExpensesPieChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="categoria" />}
        />
        <Pie
          data={chartData}
          dataKey="valor"
          nameKey="categoria"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="categoria" />}
        />
      </PieChart>
    </ChartContainer>
  )
}
```

---

## Exemplo com Bar Chart

```tsx
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@blips/ui/components/chart"

const chartData = [
  { mes: "Jan", receita: 4000, despesa: 2400 },
  { mes: "Fev", receita: 3000, despesa: 1398 },
  { mes: "Mar", receita: 2000, despesa: 9800 },
]

const chartConfig = {
  receita: {
    label: "Receita",
    color: "var(--chart-1)",
  },
  despesa: {
    label: "Despesa",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="mes"
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="receita" fill="var(--color-receita)" radius={4} />
        <Bar dataKey="despesa" fill="var(--color-despesa)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

---

## Arquivo de Referencia

- `packages/ui/src/components/chart.tsx`
