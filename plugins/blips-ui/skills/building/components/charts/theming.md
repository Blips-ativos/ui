# Theming - Referencia

Configuracao de cores e temas para charts.

## CSS Variables (Recomendado)

### 1. Defina as cores no CSS

```css
@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}
```

### 2. Use no ChartConfig

```tsx
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
```

---

## Cores Diretas (hex, hsl, oklch)

Voce pode definir cores diretamente no config:

```tsx
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(220, 98%, 61%)",
  },
  tablet: {
    label: "Tablet",
    color: "oklch(0.6 0.118 184.704)",
  },
} satisfies ChartConfig
```

---

## Tema Light/Dark

Para cores diferentes entre temas:

```tsx
const chartConfig = {
  desktop: {
    label: "Desktop",
    theme: {
      light: "#2563eb",
      dark: "#dc2626",
    },
  },
} satisfies ChartConfig
```

---

## Usando Cores nos Componentes

### Padrao: var(--color-KEY)

O `ChartContainer` injeta as cores como CSS variables no formato `--color-{key}`:

```tsx
// chartConfig.desktop.color -> var(--color-desktop)
<Bar dataKey="desktop" fill="var(--color-desktop)" />
<Line dataKey="desktop" stroke="var(--color-desktop)" />
<Area dataKey="desktop" fill="var(--color-desktop)" />
```

### Nos Dados

```tsx
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
]

const chartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
} satisfies ChartConfig
```

### Com Tailwind

```tsx
<LabelList className="fill-[--color-desktop]" />
<text className="fill-[--color-mobile]" />
```

---

## Exemplo Completo com Theming

```tsx
import { Bar, BarChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@blips/ui/components/chart"

const chartData = [
  { name: "Jan", receita: 4000, despesa: 2400 },
  { name: "Fev", receita: 3000, despesa: 1398 },
  { name: "Mar", receita: 2000, despesa: 9800 },
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

export function FinanceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={chartData}>
        <ChartTooltip content={<ChartTooltipContent />} />
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
- `globals.css`
