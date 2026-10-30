import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { cn } from "@blips/ui/lib/utils";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import { indicadores, percentual } from "./data";

export function BlockIndicadores() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores</CardTitle>
        <CardDescription>
          Outubro de 2026 · comparado a setembro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border ring-1 ring-border">
          {indicadores.map((indicador) => {
            const subiu = indicador.variacao > 0;
            // Variação boa ou ruim depende do indicador: inadimplência caindo é bom.
            const melhorou = indicador.subirEhRuim ? !subiu : subiu;
            const Seta = subiu ? ArrowUpRightIcon : ArrowDownRightIcon;
            return (
              <div
                key={indicador.id}
                className="flex flex-col gap-1 bg-card p-3"
              >
                <dt className="text-muted-foreground">{indicador.rotulo}</dt>
                <dd className="text-lg font-medium tabular-nums">
                  {indicador.valor}
                </dd>
                <dd
                  className={cn(
                    "flex items-center gap-0.5 tabular-nums",
                    melhorou ? "text-success" : "text-destructive"
                  )}
                >
                  <Seta className="size-3" aria-hidden />
                  <span>
                    <span className="sr-only">
                      {melhorou ? "Melhora de " : "Piora de "}
                    </span>
                    {percentual.format(indicador.variacao)}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </CardContent>
    </Card>
  );
}
