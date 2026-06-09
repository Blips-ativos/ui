"use client";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@blips/ui/components/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export default function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
