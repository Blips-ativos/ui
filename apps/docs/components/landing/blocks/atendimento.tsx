"use client";

import { Avatar, AvatarFallback } from "@blips/ui/components/avatar";
import { Badge } from "@blips/ui/components/badge";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@blips/ui/components/bubble";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import { Marker, MarkerContent, MarkerIcon } from "@blips/ui/components/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@blips/ui/components/message";
import { ArrowUpIcon, FileTextIcon, RobotIcon } from "@phosphor-icons/react";
import { type FormEvent, Fragment, useState } from "react";

import { conversa, type MensagemAtendimento } from "./data";

/** Agrupa mensagens seguidas do mesmo autor para empilhar os balões. */
function agruparPorAutor(mensagens: MensagemAtendimento[]) {
  const grupos: MensagemAtendimento[][] = [];
  for (const mensagem of mensagens) {
    const ultimo = grupos.at(-1);
    if (ultimo && ultimo[0]?.autor === mensagem.autor) ultimo.push(mensagem);
    else grupos.push([mensagem]);
  }
  return grupos;
}

export function BlockAtendimento() {
  const [mensagens, setMensagens] = useState(conversa);
  const [rascunho, setRascunho] = useState("");

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const texto = rascunho.trim();
    if (!texto) return;
    setMensagens((atuais) => [
      ...atuais,
      {
        id: `local-${atuais.length}`,
        autor: "cliente",
        texto,
        horario: "agora",
      },
    ]);
    setRascunho("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atendimento</CardTitle>
        <CardDescription>Padaria Trigo Dourado · WhatsApp</CardDescription>
        <CardAction>
          <Badge variant="secondary">
            <RobotIcon data-icon="inline-start" />
            Salvador
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Marker variant="separator">
          <MarkerContent>Hoje</MarkerContent>
        </Marker>
        {agruparPorAutor(mensagens).map((grupo, indice) => {
          const primeira = grupo[0];
          if (!primeira) return null;
          const doAgente = primeira.autor === "agente";
          return (
            <Fragment key={primeira.id}>
              {/* Evento da ferramenta: o agente consultou a fatura antes de responder. */}
              {indice === 1 && (
                <Marker>
                  <MarkerIcon>
                    <FileTextIcon />
                  </MarkerIcon>
                  <MarkerContent>
                    Salvador consultou a fatura FAT-11872
                  </MarkerContent>
                </Marker>
              )}
              <Message align={doAgente ? "start" : "end"}>
                {doAgente && (
                  <MessageAvatar>
                    <Avatar size="sm">
                      <AvatarFallback>
                        <RobotIcon className="size-3.5" />
                      </AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                )}
                <MessageContent>
                  <MessageHeader className={doAgente ? "" : "justify-end"}>
                    <span>{doAgente ? "Salvador" : "Cliente"}</span>
                    <span className="font-normal tabular-nums">
                      {primeira.horario}
                    </span>
                  </MessageHeader>
                  <BubbleGroup>
                    {grupo.map((mensagem) => (
                      <Bubble
                        key={mensagem.id}
                        variant={doAgente ? "muted" : "default"}
                      >
                        <BubbleContent>{mensagem.texto}</BubbleContent>
                      </Bubble>
                    ))}
                  </BubbleGroup>
                </MessageContent>
              </Message>
            </Fragment>
          );
        })}
      </CardContent>
      <CardFooter>
        <form onSubmit={enviar} className="w-full">
          <InputGroup className="h-8">
            <InputGroupInput
              aria-label="Mensagem para o Salvador"
              placeholder="Escreva uma mensagem…"
              value={rascunho}
              onChange={(evento) => setRascunho(evento.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="submit"
                variant="default"
                size="icon-sm"
                className="rounded-full"
                aria-label="Enviar mensagem"
                disabled={!rascunho.trim()}
              >
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardFooter>
    </Card>
  );
}
