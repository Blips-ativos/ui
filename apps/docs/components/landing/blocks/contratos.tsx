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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

import { brl, contratos, type StatusContrato } from "./data";

/** Badge por status: tons por token, sem cor solta. */
function StatusBadge({ status }: { status: StatusContrato }) {
  if (status === "ativo") {
    return <Badge className="bg-success/10 text-success">Ativo</Badge>;
  }
  if (status === "atraso") {
    return <Badge variant="destructive">Em atraso</Badge>;
  }
  return <Badge variant="outline">Encerrado</Badge>;
}

export function BlockContratos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contratos de locação</CardTitle>
        <CardDescription>5 contratos mais recentes</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <PlusIcon data-icon="inline-start" />
            Novo
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-(--card-spacing)">Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-(--card-spacing) text-right">
                Mensalidade
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contratos.map((contrato) => (
              <TableRow key={contrato.id}>
                <TableCell className="pl-(--card-spacing) whitespace-normal">
                  <div className="font-medium">{contrato.cliente}</div>
                  <div className="text-muted-foreground">
                    {contrato.equipamento}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={contrato.status} />
                </TableCell>
                <TableCell className="pr-(--card-spacing) text-right tabular-nums">
                  {brl.format(contrato.mensalidade)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
