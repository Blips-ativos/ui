"use client";

import { Badge } from "@blips/ui/components/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@blips/ui/components/chart";
import { TrendUpIcon } from "@phosphor-icons/react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { brl, percentual, receitaMensal } from "./data";

const chartConfig = {
  receita: {
    label: "Receita",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const atual = receitaMensal.at(-1)?.receita ?? 0;
const anterior = receitaMensal.at(-2)?.receita ?? atual;
const variacao = anterior ? (atual - anterior) / anterior : 0;

export function BlockReceita() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Receita recorrente · outubro</CardDescription>
        <CardTitle className="text-2xl tabular-nums">
          {brl.format(atual)}
        </CardTitle>
        <CardAction>
          <Badge className="bg-success/10 text-success tabular-nums">
            <TrendUpIcon data-icon="inline-start" />
            {percentual.format(variacao)}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto min-h-[160px] w-full"
        >
          <AreaChart
            data={receitaMensal}
            margin={{ left: 16, right: 16, top: 4 }}
          >
            <defs>
              <linearGradient
                id="preenchimento-receita"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-receita)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-receita)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(valor) => (
                    <span className="font-medium tabular-nums">
                      {brl.format(Number(valor))}
                    </span>
                  )}
                />
              }
            />
            <Area
              dataKey="receita"
              type="monotone"
              fill="url(#preenchimento-receita)"
              stroke="var(--color-receita)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
