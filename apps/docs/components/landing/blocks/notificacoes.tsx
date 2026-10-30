"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@blips/ui/components/field";
import { Switch } from "@blips/ui/components/switch";
import { Fragment, useState } from "react";

import { preferenciasNotificacao } from "./data";

export function BlockNotificacoes() {
  const [ativos, setAtivos] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      preferenciasNotificacao.map((preferencia) => [
        preferencia.id,
        preferencia.ativo,
      ])
    )
  );

  const quantidade = Object.values(ativos).filter(Boolean).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
        <CardDescription aria-live="polite">
          {quantidade} de {preferenciasNotificacao.length} avisos ligados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-3">
          {preferenciasNotificacao.map((preferencia, indice) => {
            const id = `notificacao-${preferencia.id}`;
            return (
              <Fragment key={preferencia.id}>
                {indice > 0 && <FieldSeparator />}
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor={id}>{preferencia.titulo}</FieldLabel>
                    <FieldDescription>{preferencia.descricao}</FieldDescription>
                  </FieldContent>
                  <Switch
                    id={id}
                    checked={ativos[preferencia.id] ?? false}
                    onCheckedChange={(ligado) =>
                      setAtivos((atual) => ({
                        ...atual,
                        [preferencia.id]: ligado,
                      }))
                    }
                  />
                </Field>
              </Fragment>
            );
          })}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
