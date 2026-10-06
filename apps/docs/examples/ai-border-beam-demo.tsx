"use client";

import { BlipsBorderBeam } from "@blips/ai/fx/border-beam";
import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { useState } from "react";

export default function AiBorderBeamDemo() {
  const [ativo, setAtivo] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <BlipsBorderBeam active={ativo}>
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Salvador está analisando</CardTitle>
            <CardDescription>
              Consultando o contrato e o histórico de pagamentos do cliente.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-xs">
            Isso costuma levar poucos segundos.
          </CardContent>
        </Card>
      </BlipsBorderBeam>
      <Button onClick={() => setAtivo((v) => !v)} variant="outline">
        {ativo ? "Pausar" : "Retomar"}
      </Button>
    </div>
  );
}
