"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@blips/ui/components/attachment";
import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@blips/ui/components/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select";
import { Textarea } from "@blips/ui/components/textarea";
import {
  CheckCircleIcon,
  ImageIcon,
  PaperPlaneTiltIcon,
  XIcon,
} from "@phosphor-icons/react";
import { type FormEvent, useState } from "react";

import { equipamentosDoCliente } from "./data";

export function BlockGarantia() {
  const [equipamento, setEquipamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [comFoto, setComFoto] = useState(true);
  const [enviado, setEnviado] = useState(false);

  const podeEnviar = equipamento !== "" && descricao.trim().length > 0;

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (podeEnviar) setEnviado(true);
  }

  function novoChamado() {
    setEquipamento("");
    setDescricao("");
    setComFoto(true);
    setEnviado(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Abrir chamado de garantia</CardTitle>
        <CardDescription>
          Resposta da assistência técnica em até 1 dia útil.
        </CardDescription>
      </CardHeader>
      {/* Live region montada desde o início: anuncia a abertura do chamado. */}
      <span role="status" className="sr-only">
        {enviado ? "Chamado GAR-3307 aberto." : ""}
      </span>
      {enviado ? (
        <>
          <CardContent
            aria-hidden
            className="flex flex-col items-center gap-2 py-6 text-center"
          >
            <CheckCircleIcon className="size-6 text-success" />
            <p className="font-medium">Chamado GAR-3307 aberto</p>
            <p className="text-muted-foreground">
              Avisaremos pelo WhatsApp quando o técnico for designado.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={novoChamado}>
              Abrir outro chamado
            </Button>
          </CardFooter>
        </>
      ) : (
        <form onSubmit={enviar} className="flex flex-col gap-(--card-spacing)">
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="garantia-equipamento">
                  Equipamento
                </FieldLabel>
                <NativeSelect
                  id="garantia-equipamento"
                  className="w-full"
                  required
                  value={equipamento}
                  onChange={(evento) => setEquipamento(evento.target.value)}
                >
                  <NativeSelectOption value="">
                    Selecione o equipamento
                  </NativeSelectOption>
                  {equipamentosDoCliente.map((opcao) => (
                    <NativeSelectOption key={opcao.valor} value={opcao.valor}>
                      {opcao.rotulo}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="garantia-descricao">
                  O que aconteceu?
                </FieldLabel>
                <Textarea
                  id="garantia-descricao"
                  required
                  placeholder="Ex.: o forno não passa de 120 °C desde ontem."
                  value={descricao}
                  onChange={(evento) => setDescricao(evento.target.value)}
                />
                <FieldDescription>
                  Inclua quando começou e se aparece algum código de erro.
                </FieldDescription>
              </Field>
              {comFoto && (
                <Attachment size="sm" className="w-full">
                  <AttachmentMedia>
                    <ImageIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>painel-do-forno.jpg</AttachmentTitle>
                    <AttachmentDescription>JPG · 1,8 MB</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction
                      aria-label="Remover painel-do-forno.jpg"
                      onClick={() => setComFoto(false)}
                    >
                      <XIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              )}
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={!podeEnviar}>
              <PaperPlaneTiltIcon data-icon="inline-start" />
              Enviar chamado
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
