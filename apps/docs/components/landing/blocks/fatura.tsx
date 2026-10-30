"use client";

import { Badge } from "@blips/ui/components/badge";
import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { Separator } from "@blips/ui/components/separator";
import {
  ArrowCounterClockwiseIcon,
  CheckIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { brl, dataLonga, fatura } from "./data";

type Decisao = "pendente" | "aprovada" | "recusada";

const MENSAGEM_DECISAO: Record<Decisao, string> = {
  pendente: "",
  aprovada: "Fatura enviada ao cliente.",
  recusada: "Fatura devolvida ao financeiro.",
};

export function BlockFatura() {
  const [decisao, setDecisao] = useState<Decisao>("pendente");

  const subtotal = fatura.itens.reduce((soma, item) => soma + item.valor, 0);
  const total = subtotal - fatura.desconto;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fatura {fatura.numero}</CardTitle>
        <CardDescription>
          {fatura.cliente} · vence em {dataLonga.format(fatura.vencimento)}
        </CardDescription>
        <CardAction>
          {decisao === "aprovada" && (
            <Badge className="bg-success/10 text-success">Aprovada</Badge>
          )}
          {decisao === "recusada" && (
            <Badge variant="destructive">Recusada</Badge>
          )}
          {decisao === "pendente" && (
            <Badge variant="outline">Em revisão</Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {fatura.itens.map((item) => (
            <li
              key={item.descricao}
              className="flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="font-medium">{item.descricao}</div>
                <div className="text-muted-foreground">{item.detalhe}</div>
              </div>
              <span className="shrink-0 tabular-nums">
                {brl.format(item.valor)}
              </span>
            </li>
          ))}
        </ul>
        <Separator />
        <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="text-right tabular-nums">{brl.format(subtotal)}</dd>
          <dt className="text-muted-foreground">Desconto pontualidade</dt>
          <dd className="text-right tabular-nums">
            −{brl.format(fatura.desconto)}
          </dd>
          <dt className="font-medium">Total</dt>
          <dd className="text-right text-sm font-medium tabular-nums">
            {brl.format(total)}
          </dd>
        </dl>
      </CardContent>
      {/* Live region montada desde o início: só o texto muda com a decisão. */}
      <span role="status" className="sr-only">
        {MENSAGEM_DECISAO[decisao]}
      </span>
      <CardFooter className="justify-end gap-2">
        {decisao === "pendente" ? (
          <>
            <Button variant="outline" onClick={() => setDecisao("recusada")}>
              <XIcon data-icon="inline-start" />
              Recusar
            </Button>
            <Button onClick={() => setDecisao("aprovada")}>
              <CheckIcon data-icon="inline-start" />
              Aprovar
            </Button>
          </>
        ) : (
          <>
            <span className="me-auto text-muted-foreground" aria-hidden>
              {MENSAGEM_DECISAO[decisao]}
            </span>
            <Button variant="ghost" onClick={() => setDecisao("pendente")}>
              <ArrowCounterClockwiseIcon data-icon="inline-start" />
              Desfazer
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
