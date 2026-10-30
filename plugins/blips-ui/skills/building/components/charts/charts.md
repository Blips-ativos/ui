# Charts - Reference

Guide for creating charts using Recharts with shadcn/ui components.

## Sub-References

| Resource | File | When to use |
|----------|------|-------------|
| Theming | [theming-reference.md](theming-reference.md) | CSS variables, hex/hsl/oklch colors |
| Tooltip | [tooltip-reference.md](tooltip-reference.md) | Customize tooltips |
| Legend | [legend-reference.md](legend-reference.md) | Add legends |

---

## Instalacao

```bash
pnpm dlx shadcn@latest add chart
```

Adicione as cores no CSS:

```css
@layer base {
  :root {
    --chart-1: oklch(0.905 0.182 98.111);
    --chart-2: oklch(0.795 0.184 86.047);
    --chart-3: oklch(0.681 0.162 75.834);
    --chart-4: oklch(0.554 0.135 66.442);
    --chart-5: oklch(0.476 0.114 61.907);
  }

  .dark {
    --chart-1: oklch(0.905 0.182 98.111);
    --chart-2: oklch(0.795 0.184 86.047);
    --chart-3: oklch(0.681 0.162 75.834);
    --chart-4: oklch(0.554 0.135 66.442);
    --chart-5: oklch(0.476 0.114 61.907);
  }
}
```

---

## Estrutura Basica

```tsx
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@blips/ui/components/chart"

// 1. Defina os dados
const chartData = [
  { month: "Janeiro", desktop: 186, mobile: 80 },
  { month: "Fevereiro", desktop: 305, mobile: 200 },
  { month: "Marco", desktop: 237, mobile: 120 },
]

// 2. Configure labels e cores
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// 3. Renderize o chart
export function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

---

## ChartConfig

O `ChartConfig` define labels, icones e cores para o chart:

```tsx
import { Monitor } from "@phosphor-icons/react"
import { type ChartConfig } from "@blips/ui/components/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    color: "var(--chart-1)",
    // OU tema com light/dark
    theme: {
      light: "#2563eb",
      dark: "#dc2626",
    },
  },
} satisfies ChartConfig
```

---

## Uso de Cores

### Em Componentes

```tsx
<Bar dataKey="desktop" fill="var(--color-desktop)" />
```

### Em Dados

```tsx
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
```

### Com Tailwind

```tsx
<LabelList className="fill-[--color-desktop]" />
```

---

## Acessibilidade

Adicione `accessibilityLayer` para suporte a teclado e leitores de tela:

```tsx
<BarChart accessibilityLayer data={chartData}>
```

---

## Diretrizes

### FACA

- **Defina `min-h-[VALUE]` no ChartContainer** - Obrigatorio para responsividade
- **Use `accessibilityLayer`** - Melhora acessibilidade
- **Use CSS variables para cores** - Suporta dark mode automaticamente
- **Defina `chartConfig` tipado** - Use `satisfies ChartConfig`
- **Use componentes shadcn para Tooltip/Legend** - Consistencia visual

### NAO FACA

- **Nao esqueca min-height** - Chart nao renderiza sem altura definida
- **Nao use cores hardcoded** - Prefira `var(--color-KEY)` ou `var(--chart-N)`
- **Nao importe Recharts tooltip/legend** - Use `ChartTooltip`/`ChartLegend`
- **Nao esqueca `vertical={false}` no CartesianGrid** - Padrao visual

---

## Arquivos de Referencia

- `packages/ui/src/components/chart.tsx`
