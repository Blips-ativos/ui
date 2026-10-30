import { Badge } from "@blips/ui/components/badge";
import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item";
import { Progress, ProgressValue } from "@blips/ui/components/progress";
import { cn } from "@blips/ui/lib/utils";
import {
  ArrowsClockwiseIcon,
  SnowflakeIcon,
  ThermometerHotIcon,
  WifiHighIcon,
  WifiSlashIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";

import { type EstadoEquipamento, frota } from "./data";

const ESTADO: Record<
  EstadoEquipamento,
  { rotulo: string; classe: string; Icone: typeof WifiHighIcon }
> = {
  online: {
    rotulo: "Online",
    classe: "bg-success/10 text-success",
    Icone: WifiHighIcon,
  },
  offline: {
    rotulo: "Offline",
    classe: "bg-destructive/10 text-destructive",
    Icone: WifiSlashIcon,
  },
  manutencao: {
    rotulo: "Em manutenção",
    classe: "bg-muted text-muted-foreground",
    Icone: WrenchIcon,
  },
};

export function BlockFrota() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frota de equipamentos</CardTitle>
        <CardDescription>Telemetria dos sensores IoT</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="Atualizar frota">
            <ArrowsClockwiseIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-2">
          {frota.map((equipamento) => {
            const estado = ESTADO[equipamento.estado];
            const bateriaBaixa = equipamento.bateria < 20;
            return (
              <Item key={equipamento.serie} variant="outline" role="listitem">
                <ItemMedia
                  variant="icon"
                  className="size-8 rounded-md bg-muted text-muted-foreground"
                >
                  {equipamento.nome.startsWith("Forno") ? (
                    <ThermometerHotIcon />
                  ) : (
                    <SnowflakeIcon />
                  )}
                </ItemMedia>
                <ItemContent className="min-w-0">
                  <ItemTitle>{equipamento.nome}</ItemTitle>
                  <ItemDescription className="line-clamp-1">
                    {equipamento.local}
                  </ItemDescription>
                </ItemContent>
                <Badge className={estado.classe}>
                  <estado.Icone data-icon="inline-start" />
                  {estado.rotulo}
                </Badge>
                <ItemFooter className="text-muted-foreground">
                  <span>
                    {equipamento.serie} · sinal {equipamento.ultimoSinal}
                  </span>
                  <Progress
                    value={equipamento.bateria}
                    aria-label={`Bateria do sensor ${equipamento.serie}`}
                    className={cn(
                      "w-24 flex-nowrap items-center gap-2",
                      bateriaBaixa &&
                        "[&_[data-slot=progress-indicator]]:bg-destructive"
                    )}
                  >
                    <ProgressValue className="order-last shrink-0" />
                  </Progress>
                </ItemFooter>
              </Item>
            );
          })}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
