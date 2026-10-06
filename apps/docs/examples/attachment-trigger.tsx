"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@blips/ui/components/attachment";
import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import {
  CopyIcon,
  DownloadIcon,
  FileSearchIcon,
  FileTextIcon,
  XIcon,
} from "@phosphor-icons/react";
import * as React from "react";

// O <a> fica vazio: o AttachmentTrigger cobre o anexo inteiro e o nome
// acessível vem do aria-label.
const contractLink = (
  // biome-ignore lint/a11y/useAnchorContent: o conteúdo vem dos children, injetados pelo render
  <a href="#attachment-trigger" aria-label="Abrir revisao-contrato.pdf" />
);

export default function AttachmentTriggerDemo() {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {visible ? (
        <Attachment className="w-full">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>revisao-contrato.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 820 KB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Baixar anexo">
              <DownloadIcon />
            </AttachmentAction>
            <AttachmentAction
              aria-label="Remover anexo"
              onClick={() => setVisible(false)}
            >
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger render={contractLink} />
        </Attachment>
      ) : (
        <Button variant="outline" onClick={() => setVisible(true)}>
          Restaurar anexo
        </Button>
      )}
      <Dialog>
        <Attachment className="w-full">
          <AttachmentMedia>
            <FileSearchIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>resumo-pesquisa.pdf</AttachmentTitle>
            <AttachmentDescription>
              Abrir pré-visualização
            </AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Copiar link">
              <CopyIcon />
            </AttachmentAction>
          </AttachmentActions>
          <DialogTrigger
            render={
              <AttachmentTrigger aria-label="Pré-visualizar resumo-pesquisa.pdf" />
            }
          />
        </Attachment>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>resumo-pesquisa.pdf</DialogTitle>
            <DialogDescription>
              O AttachmentTrigger pode abrir um dialog enquanto as ações do
              anexo continuam acessíveis.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
