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
import { Spinner } from "@blips/ui/components/spinner";
import {
  ArrowClockwiseIcon,
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  FileXIcon,
  XIcon,
} from "@phosphor-icons/react";

export default function AttachmentStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Attachment state="idle" className="w-full">
        <AttachmentMedia>
          <ClockIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>arquivo-selecionado.pdf</AttachmentTitle>
          <AttachmentDescription>Pronto para enviar</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remover arquivo-selecionado.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>design-system.zip</AttachmentTitle>
          <AttachmentDescription>Enviando · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancelar envio">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="processing" className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>pesquisa-mercado.pdf</AttachmentTitle>
          <AttachmentDescription>Processando documento</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error" className="w-full">
        <AttachmentMedia>
          <FileXIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>modelo-financeiro.xlsx</AttachmentTitle>
          <AttachmentDescription>
            Falha no envio. Tente de novo.
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Tentar de novo">
            <ArrowClockwiseIcon />
          </AttachmentAction>
          <AttachmentAction aria-label="Remover anexo">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done" className="w-full">
        <AttachmentMedia>
          <CheckIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>relatorio-final.pdf</AttachmentTitle>
          <AttachmentDescription>Enviado · 1,8 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  );
}
