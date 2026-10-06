# Tooltip - Referencia

Customizacao de tooltips em charts.

API igual na v2.x e na v3.x para as props de `ChartTooltipContent` deste guia; tipos do
recharts e alguns comportamentos mudam — ver [v3.x — Base UI](#v3x--base-ui) e
[v2.x — Radix](#v2x--radix).

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
| `formatter` / `labelFormatter` | função | Formata valor/label (tipos do recharts da versão) |

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

## v3.x — Base UI

- Tipos do recharts 3 (`DefaultTooltipContentProps<TooltipValueType, number | string>`): um
  `formatter` escrito contra o recharts 2 pode precisar de ajuste de tipo.
- Valor `0` aparece no tooltip; valores não numéricos aparecem via `String()`.
- Tooltip próprio: `TooltipContentProps` de `recharts` (ver `charts.md`).

```tsx
<ChartTooltip
  content={
    <ChartTooltipContent
      formatter={(value, name) => (
        <span>
          {name}: <span className="font-medium tabular-nums">{formatCurrency(Number(value))}</span>
        </span>
      )}
    />
  }
/>
```

## v2.x — Radix

- Tipos do recharts 2 (`TooltipProps<ValueType, NameType>`).
- Valor `0` **não** aparece no tooltip (a lib testa `item.value && …`): se zero importa, use
  `formatter` ou um tooltip próprio.

```tsx
<ChartTooltip
  content={
    <ChartTooltipContent
      formatter={(value, name) => (
        <span>
          {name}: <span className="font-medium tabular-nums">{formatCurrency(Number(value))}</span>
        </span>
      )}
    />
  }
/>
```

`formatCurrency` é o utilitário de moeda do app (Intl `pt-BR`/`BRL`), igual nas duas versões.

---

## Arquivo de Referencia

- `packages/ui/src/components/chart.tsx`
