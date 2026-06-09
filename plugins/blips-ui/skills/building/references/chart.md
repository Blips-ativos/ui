# Chart

Import: `@blips/ui/components/chart`

## Sub-components

| Export | Description |
|--------|-------------|
| `ChartContainer` | Root wrapper. Provides `ChartConfig` context, injects CSS color variables, and wraps children in Recharts' `ResponsiveContainer`. |
| `ChartTooltip` | Re-export of Recharts' `Tooltip` component. Use with `ChartTooltipContent` as its `content` prop. |
| `ChartTooltipContent` | Styled tooltip content. Reads chart config for labels, colors, and icons. Supports indicator styles (dot, line, dashed). |
| `ChartLegend` | Re-export of Recharts' `Legend` component. Use with `ChartLegendContent` as its `content` prop. |
| `ChartLegendContent` | Styled legend content. Renders color swatches with labels from chart config. |
| `ChartStyle` | Internal component that generates `<style>` tags for CSS color variables per theme (light/dark). |

### Types

| Type | Description |
|------|-------------|
| `ChartConfig` | Configuration object mapping data keys to `{ label?, icon?, color? }` or `{ label?, icon?, theme: { light, dark } }`. |

### Hook

| Hook | Description |
|------|-------------|
| `useChart()` | Access chart context (`config`). Must be used within `<ChartContainer>`. |

## Props & Variants

### ChartContainer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `ChartConfig` | Yes | Maps data keys to labels, colors, and optional icons |
| `children` | `ResponsiveContainer` children | Yes | Recharts chart component (BarChart, LineChart, etc.) |
| `id` | `string` | No | Custom chart ID (auto-generated if omitted) |
| `className` | `string` | No | Additional classes. Default includes `flex aspect-video justify-center text-xs` |

### ChartConfig Structure

```typescript
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",        // single color for both themes
  },
  mobile: {
    label: "Mobile",
    theme: {                  // per-theme colors
      light: "#60a5fa",
      dark: "#3b82f6",
    },
  },
} satisfies ChartConfig
```

Colors become CSS variables: `--color-desktop`, `--color-mobile`. Reference them in chart components as `fill="var(--color-desktop)"`.

### ChartTooltipContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideLabel` | `boolean` | `false` | Hide the tooltip label/header |
| `hideIndicator` | `boolean` | `false` | Hide the color indicator |
| `indicator` | `"dot"` \| `"line"` \| `"dashed"` | `"dot"` | Indicator style |
| `nameKey` | `string` | -- | Override the key used for item names |
| `labelKey` | `string` | -- | Override the key used for the tooltip label |
| `labelFormatter` | `(value, payload) => ReactNode` | -- | Custom label formatter |
| `formatter` | Recharts formatter | -- | Custom value formatter |

### ChartLegendContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideIcon` | `boolean` | `false` | Hide color icons |
| `nameKey` | `string` | -- | Override the key used for legend item names |
| `verticalAlign` | `"top"` \| `"bottom"` | `"bottom"` | Vertical alignment (adds padding accordingly) |

## Dependencies

- `recharts` (v3.8.0)
- `@phosphor-icons/react`

## Usage

### Basic Bar Chart

```tsx
"use client"

import { Bar, BarChart } from "recharts"
import {
  ChartContainer,
  type ChartConfig,
} from "@blips/ui/components/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

### Bar Chart with Axis, Grid, Tooltip and Legend

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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function Component() {
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

## All Examples

- `chart-bar-demo` -- Basic bar chart (no axis)
- `chart-bar-demo-axis` -- Bar chart with XAxis and CartesianGrid
- `chart-bar-demo-grid` -- Bar chart with CartesianGrid only
- `chart-bar-demo-tooltip` -- Bar chart with ChartTooltip
- `chart-bar-demo-legend` -- Bar chart with ChartTooltip and ChartLegend
- `chart-tooltip-demo` -- Visual tooltip indicator styles showcase (dot, line, dashed)

## Project Notes

- Always wrap Recharts charts in `ChartContainer` -- it provides the `ResponsiveContainer` and CSS variable injection.
- Color references use `var(--color-KEY)` where KEY matches the `ChartConfig` object keys.
- The `accessibilityLayer` prop on chart components (BarChart, LineChart, etc.) adds proper ARIA attributes.
