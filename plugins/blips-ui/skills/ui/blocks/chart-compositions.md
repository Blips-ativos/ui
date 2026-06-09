# Chart Compositions

## Overview

shadcn/ui charts are built on top of Recharts, wrapped with `ChartContainer`, `ChartTooltip`, and `ChartTooltipContent` from the `chart` primitive. All charts follow a Card + ChartContainer pattern with consistent theming via `ChartConfig`.

## Core Pattern

Every chart follows this structure:

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"

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

// Inside component:
<Card>
  <CardHeader>
    <CardTitle>Chart Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={chartConfig}>
      {/* Recharts component here */}
    </ChartContainer>
  </CardContent>
  <CardFooter>{/* Trend info */}</CardFooter>
</Card>
```

## Chart Types

| Type | Recharts Components | Use Case |
|------|-------------------|----------|
| Area | `AreaChart`, `Area` | Trends over time, stacked comparisons |
| Bar | `BarChart`, `Bar` | Comparisons, rankings, distributions |
| Line | `LineChart`, `Line` | Time series, continuous data |
| Pie | `PieChart`, `Pie` | Proportions, percentages |
| Radar | `RadarChart`, `Radar`, `PolarAngleAxis`, `PolarGrid` | Multi-dimensional comparisons |
| Radial | `RadialBarChart`, `RadialBar` | Progress, gauges |

---

## Area Charts

### chart-area-default: Simple Area

```tsx
"use client"

import { TrendUp } from "@phosphor-icons/react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>Showing total visitors for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
```

### chart-area-stacked: Stacked Area

Key difference: Multiple `Area` components with `stackId="a"`:

```tsx
<Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
<Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
```

Tooltip uses `indicator="dot"`.

### chart-area-interactive: Interactive with Time Range Filter

Key pattern: State-driven time range filtering with Select + ChartLegend:

```tsx
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/ui/card"
import {
  ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"

// chartData: daily entries from 2024-04-01 to 2024-06-30 with desktop + mobile

const chartConfig = {
  visitors: { label: "Visitors" },
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
            <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
            <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="mobile" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
            <Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

---

## Bar Charts

### chart-bar-default: Simple Bar

```tsx
"use client"

import { TrendUp } from "@phosphor-icons/react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
```

### chart-bar-multiple: Side-by-side Bars

Key difference: Two `Bar` components without `stackId`:

```tsx
<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
```

Tooltip uses `indicator="dashed"`.

### chart-bar-interactive: Interactive with Tab Switching

Key pattern: Clickable header tabs to switch active data series:

```tsx
const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop")

const total = React.useMemo(() => ({
  desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
  mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
}), [])

return (
  <Card className="py-0">
    <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
        <CardTitle>Bar Chart - Interactive</CardTitle>
        <CardDescription>Showing total visitors for the last 3 months</CardDescription>
      </div>
      <div className="flex">
        {["desktop", "mobile"].map((key) => {
          const chart = key as keyof typeof chartConfig
          return (
            <button
              key={chart}
              data-active={activeChart === chart}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => setActiveChart(chart)}
            >
              <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                {total[key as keyof typeof total].toLocaleString()}
              </span>
            </button>
          )
        })}
      </div>
    </CardHeader>
    <CardContent className="px-2 sm:p-6">
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
        <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32}
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          />
          <ChartTooltip content={
            <ChartTooltipContent className="w-[150px]" nameKey="views"
              labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            />
          } />
          <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)
```

---

## Line Charts

### chart-line-default: Simple Line

```tsx
<LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
  <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
</LineChart>
```

### chart-line-multiple: Multiple Lines

```tsx
<Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
<Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
```

### chart-line-interactive: Interactive with Tab Switching

Same pattern as chart-bar-interactive but with `LineChart` + `Line` instead of `BarChart` + `Bar`.

---

## Pie Charts

### chart-pie-simple: Simple Pie

```tsx
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

// In component:
<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
  <PieChart>
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Pie data={chartData} dataKey="visitors" nameKey="browser" />
  </PieChart>
</ChartContainer>
```

### chart-pie-donut: Donut Chart

Key difference: `innerRadius={60}` on Pie:

```tsx
<Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} />
```

For donut with center text, add `<Label>` inside `<Pie>`:
```tsx
<Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
  <Label
    content={({ viewBox }) => {
      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
        return (
          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
              {totalVisitors.toLocaleString()}
            </tspan>
            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
              Visitors
            </tspan>
          </text>
        )
      }
    }}
  />
</Pie>
```

### chart-pie-interactive: Interactive with Select

Uses `ChartStyle` for dynamic color injection, Select for month switching, and custom `shape` prop with `Sector`:

```tsx
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem, PieSectorShapeProps } from "recharts/types/polar/Pie"
import { ChartStyle } from "@/ui/chart"

// Dynamic shape renderer:
const renderPieShape = React.useCallback(
  ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
    if (index === activeIndex) {
      return (
        <g>
          <Sector {...props} outerRadius={outerRadius + 10} />
          <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
        </g>
      )
    }
    return <Sector {...props} outerRadius={outerRadius} />
  },
  [activeIndex]
)

// Usage:
<Card data-chart={id} className="flex flex-col">
  <ChartStyle id={id} config={chartConfig} />
  <CardHeader className="flex-row items-start space-y-0 pb-0">
    <div className="grid gap-1">
      <CardTitle>Pie Chart - Interactive</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </div>
    <Select value={activeMonth} onValueChange={setActiveMonth}>
      <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a value">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent align="end" className="rounded-xl">
        {months.map((key) => {
          const config = chartConfig[key as keyof typeof chartConfig]
          if (!config) return null
          return (
            <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
              <div className="flex items-center gap-2 text-xs">
                <span className="flex h-3 w-3 shrink-0 rounded-xs" style={{ backgroundColor: `var(--color-${key})` }} />
                {config?.label}
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  </CardHeader>
  <CardContent className="flex flex-1 justify-center pb-0">
    <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={desktopData} dataKey="desktop" nameKey="month" innerRadius={60} strokeWidth={5} shape={renderPieShape}>
          <Label content={/* center text */} />
        </Pie>
      </PieChart>
    </ChartContainer>
  </CardContent>
</Card>
```

---

## Radar Charts

### chart-radar-default: Simple Radar

```tsx
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
  <RadarChart data={chartData}>
    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    <PolarAngleAxis dataKey="month" />
    <PolarGrid />
    <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
  </RadarChart>
</ChartContainer>
```

### chart-radar-multiple: Multiple Radars

```tsx
<RadarChart data={chartData}>
  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
  <PolarAngleAxis dataKey="month" />
  <PolarGrid />
  <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
  <Radar dataKey="mobile" fill="var(--color-mobile)" />
</RadarChart>
```

---

## Radial Charts

### chart-radial-simple: Simple Radial Bar

```tsx
import { RadialBar, RadialBarChart } from "recharts"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
  <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="browser" />} />
    <RadialBar dataKey="visitors" background />
  </RadialBarChart>
</ChartContainer>
```

---

## Tooltip Customization

### chart-tooltip-default: Default Tooltip

Standard usage with stacked bars:

```tsx
<ChartTooltip content={<ChartTooltipContent />} cursor={false} defaultIndex={1} />
```

### chart-tooltip-advanced: Custom Formatter with Total

```tsx
<ChartTooltip
  content={
    <ChartTooltipContent
      hideLabel
      className="w-[180px]"
      formatter={(value, name, item, index) => (
        <>
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
            style={{ "--color-bg": `var(--color-${name})` } as React.CSSProperties}
          />
          {chartConfig[name as keyof typeof chartConfig]?.label || name}
          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
            {value}
            <span className="font-normal text-muted-foreground">kcal</span>
          </div>
          {/* Add total after the last item */}
          {index === 1 && (
            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
              Total
              <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
                {item.payload.running + item.payload.swimming}
                <span className="font-normal text-muted-foreground">kcal</span>
              </div>
            </div>
          )}
        </>
      )}
    />
  }
  cursor={false}
  defaultIndex={1}
/>
```

---

## ChartTooltipContent Props Reference

| Prop | Type | Description |
|------|------|-------------|
| `hideLabel` | boolean | Hides the tooltip label |
| `indicator` | `"line"` \| `"dot"` \| `"dashed"` | Indicator style next to values |
| `labelFormatter` | function | Custom label formatting |
| `nameKey` | string | Key to use for item names |
| `formatter` | function | Full custom rendering per item |
| `className` | string | Additional CSS classes |

## ChartConfig Color Variables

Charts use CSS variables from the theme:
- `var(--chart-1)` through `var(--chart-5)` for categorical data
- `var(--primary)` for single-series emphasis
- Colors are referenced via `var(--color-{key})` where key matches the chartConfig key
