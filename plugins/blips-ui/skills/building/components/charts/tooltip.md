# Tooltip - Referencia

Customizacao de tooltips em charts.

## Uso Basico

```tsx
import { ChartTooltip, ChartTooltipContent } from "@blips/ui/components/chart"

<ChartTooltip content={<ChartTooltipContent />} />
```

---

## Props do ChartTooltipContent

| Prop | Tipo | Descricao |
|------|------|-----------|
| `labelKey` | string | Config/data key para o label |
| `nameKey` | string | Config/data key para o nome |
| `indicator` | `dot` \| `line` \| `dashed` | Estilo do indicador |
| `hideLabel` | boolean | Oculta o label |
| `hideIndicator` | boolean | Oculta o indicador |

---

## Estilos de Indicador

### Dot (padrao)

```tsx
<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
```

### Line

```tsx
<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
```

### Dashed

```tsx
<ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
```

---

## Ocultando Elementos

### Sem Label

```tsx
<ChartTooltip content={<ChartTooltipContent hideLabel />} />
```

### Sem Indicador

```tsx
<ChartTooltip content={<ChartTooltipContent hideIndicator />} />
```

### Ambos

```tsx
<ChartTooltip content={<ChartTooltipContent hideLabel hideIndicator />} />
```

---

## Keys Customizadas

Use `labelKey` e `nameKey` para mapear dados personalizados:

### Exemplo: Dados com estrutura diferente

```tsx
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Total de Visitantes",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

```tsx
<ChartTooltip
  content={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
/>
```

Resultado:
- Label: "Total de Visitantes"
- Nomes: "Chrome", "Safari" (do config)

---

## Formatando Valores

### Usando formatter do Recharts

```tsx
<ChartTooltip
  content={
    <ChartTooltipContent
      formatter={(value, name) => (
        <>
          <span>{name}: </span>
          <span className="font-bold">R$ {value.toLocaleString()}</span>
        </>
      )}
    />
  }
/>
```

---

## Exemplo Completo

```tsx
import { Line, LineChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@blips/ui/components/chart"

const chartData = [
  { mes: "Jan", vendas: 4000, meta: 3500 },
  { mes: "Fev", vendas: 3000, meta: 3500 },
  { mes: "Mar", vendas: 5000, meta: 3500 },
]

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "var(--chart-1)",
  },
  meta: {
    label: "Meta",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function SalesChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              labelKey="mes"
            />
          }
        />
        <Line
          type="monotone"
          dataKey="vendas"
          stroke="var(--color-vendas)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="meta"
          stroke="var(--color-meta)"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ChartContainer>
  )
}
```

---

## Arquivo de Referencia

- `packages/ui/src/components/chart.tsx`
