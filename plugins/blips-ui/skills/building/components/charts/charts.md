# Charts - Reference

Guide for creating charts using Recharts with shadcn/ui components.

> **Versão da lib:** a v2.x usa **recharts 2** (2.15.x) e a v3.x usa **recharts 3** (3.10.x).
> A API de `ChartContainer`/`ChartTooltip`/`ChartLegend` é a mesma; mudam os tipos do recharts,
> alguns defaults e props removidas — ver [v3.x — Base UI](#v3x--base-ui) e
> [v2.x — Radix](#v2x--radix). Detecção de versão: Passo 0 do `SKILL.md` do building.

## Sub-References

| Resource | File | When to use |
|----------|------|-------------|
| Theming | [theming.md](theming.md) | CSS variables, hex/hsl/oklch colors |
| Tooltip | [tooltip.md](tooltip.md) | Customize tooltips |
| Legend | [legend.md](legend.md) | Add legends |

---

## Instalacao

O `chart` já vem na `@blips/ui` (`@blips/ui/components/chart`) — não rode `shadcn add`. Os
gráficos importam `Bar`, `XAxis` etc. direto de `recharts`, então o app precisa de `recharts`
na **mesma major da lib**: `recharts@^3` na v3.x, `recharts@2.15.x` na v2.x.

Os tokens `--chart-1` a `--chart-5` já vêm no `globals.css` da lib. Só sobrescreva se precisar
de outra paleta:

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
import { MonitorIcon } from "@phosphor-icons/react"
import { type ChartConfig } from "@blips/ui/components/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: MonitorIcon,
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
<LabelList className="fill-(--color-desktop)" />
```

---

## Acessibilidade

`accessibilityLayer` dá suporte a teclado e leitores de tela. No recharts 3 (v3.x) ele já é
`true` por padrão; no recharts 2 (v2.x) precisa ser passado:

```tsx
<BarChart accessibilityLayer data={chartData}>
```

---

## Diretrizes

### FACA

- **Defina `min-h-[VALUE]` no ChartContainer** - Obrigatorio para responsividade
- **Use `accessibilityLayer`** - Melhora acessibilidade (obrigatório passar na v2.x; default na v3.x)
- **Use CSS variables para cores** - Suporta dark mode automaticamente
- **Defina `chartConfig` tipado** - Use `satisfies ChartConfig`
- **Use componentes shadcn para Tooltip/Legend** - Consistencia visual

### NAO FACA

- **Nao esqueca min-height** - Chart nao renderiza sem altura definida
- **Nao use cores hardcoded** - Prefira `var(--color-KEY)` ou `var(--chart-N)`
- **Nao importe Recharts tooltip/legend** - Use `ChartTooltip`/`ChartLegend`
- **Nao esqueca `vertical={false}` no CartesianGrid** - Padrao visual

---

## v3.x — Base UI

- **recharts 3.10.x.** Siga o guia de migração do recharts 3 em código que usa a API do
  recharts direto: algumas props/tipos foram removidos ou renomeados, o estado interno passou
  para hooks (`useActiveTooltipLabel`, `useIsTooltipActive`…) e `Customized` deixou de ser
  necessário (componentes próprios podem ser filhos diretos do gráfico; ele ainda é exportado).
- `ChartContainer` ganhou `initialDimension` (`{ width, height }`, default `320x200`),
  repassado ao `ResponsiveContainer` para a primeira renderização/SSR sem medida.
- `ChartTooltipContent` é tipado com `DefaultTooltipContentProps` do recharts 3 e
  `ChartLegendContent` com `DefaultLegendContentProps`. Um `formatter`/`labelFormatter` tipado
  contra o recharts 2 pode precisar de ajuste de tipo.
- Conteúdo customizado de tooltip: tipe com `TooltipContentProps` (recharts 3), não
  `TooltipProps`.
- O tooltip agora mostra valores `0` (antes o zero sumia) e converte não-números com
  `String()`; container `min-w-32 text-xs/relaxed`.
- `accessibilityLayer` já é `true` por padrão.

```tsx
import type { TooltipContentProps } from "recharts"

function VendasTooltip({ active, payload, label }: TooltipContentProps<number, string>) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg bg-popover px-2.5 py-1.5 text-xs ring-1 ring-foreground/10">
      {label}: {payload[0].value}
    </div>
  )
}

<ChartContainer config={chartConfig} initialDimension={{ width: 600, height: 300 }}>
  <BarChart data={chartData}>
    <ChartTooltip content={VendasTooltip} />
  </BarChart>
</ChartContainer>
```

## v2.x — Radix

- **recharts 2.15.x.** `ChartLegendContent` recebe `Pick<LegendProps, "payload" | "verticalAlign">`.
- Sem `initialDimension` no `ChartContainer`.
- Conteúdo customizado de tooltip: tipe com `TooltipProps<ValueType, NameType>`.
- O tooltip esconde valores `0` (`item.value && …`); container `min-w-[8rem] text-xs`.
- Passe `accessibilityLayer` explicitamente.

```tsx
import type { TooltipProps } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

function VendasTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl">
      {label}: {payload[0].value}
    </div>
  )
}

<ChartContainer config={chartConfig} className="min-h-[300px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <ChartTooltip content={<VendasTooltip />} />
  </BarChart>
</ChartContainer>
```

---

## Arquivos de Referencia

- `packages/ui/src/components/chart.tsx`
