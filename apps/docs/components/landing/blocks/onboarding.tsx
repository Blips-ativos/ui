"use client";

import { Avatar, AvatarFallback } from "@blips/ui/components/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { Checkbox } from "@blips/ui/components/checkbox";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@blips/ui/components/progress";
import { useState } from "react";

import { etapasOnboarding } from "./data";

export function BlockOnboarding() {
  const [concluidas, setConcluidas] = useState<string[]>(() =>
    etapasOnboarding.filter((etapa) => etapa.concluida).map((etapa) => etapa.id)
  );

  const progresso = Math.round(
    (concluidas.length / etapasOnboarding.length) * 100
  );

  function alternar(id: string, marcada: boolean) {
    setConcluidas((atual) =>
      marcada ? [...atual, id] : atual.filter((item) => item !== id)
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding do cliente</CardTitle>
        <CardDescription>Café Esquina · contrato CT-2035</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={progresso}>
          <ProgressLabel>Implantação</ProgressLabel>
          <ProgressValue />
        </Progress>
        <FieldGroup className="gap-3">
          {etapasOnboarding.map((etapa) => {
            const id = `onboarding-${etapa.id}`;
            const marcada = concluidas.includes(etapa.id);
            return (
              <Field key={etapa.id} orientation="horizontal">
                <Checkbox
                  id={id}
                  checked={marcada}
                  onCheckedChange={(valor) => alternar(etapa.id, valor)}
                />
                <FieldLabel
                  htmlFor={id}
                  className={
                    marcada
                      ? "font-normal text-muted-foreground line-through"
                      : "font-normal"
                  }
                >
                  {etapa.titulo}
                </FieldLabel>
              </Field>
            );
          })}
        </FieldGroup>
      </CardContent>
      <CardFooter className="gap-2 border-t text-muted-foreground">
        <Avatar size="sm">
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <span>
          Responsável: <span className="text-foreground">Júlia Moraes</span>,
          Customer Success
        </span>
      </CardFooter>
    </Card>
  );
}
