# Chart

**Categoria:** Behavioral
**Dependências:** `recharts`
**"use client":** Não

## Exports

| Export | Tipo |
|---|---|
| `ChartContainer` | Component (forwardRef) |
| `ChartTooltip` | Component |
| `ChartTooltipContent` | Component (forwardRef) |
| `ChartLegend` | Component |
| `ChartLegendContent` | Component (forwardRef) |
| `ChartStyle` | Component |
| `ChartConfig` | Type |

## Uso

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@blips/ui"
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts"

const chartConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
}

<ChartContainer config={chartConfig} className="h-[300px]">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```
