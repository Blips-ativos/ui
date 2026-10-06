# Theming - Referencia

Configuracao de cores e temas para charts.

API igual na v2.x e na v3.x. Os tokens `--chart-1` a `--chart-5` já vêm no `globals.css` da
`@blips/ui` nas duas versões; o passo 1 abaixo só é necessário para trocar a paleta.

## CSS Variables (Recomendado)

### 1. Defina as cores no CSS

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
<LabelList className="fill-(--color-desktop)" />
<text className="fill-(--color-mobile)" />
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
