"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import { CheckIcon, CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function InputGroupButtonExample() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="https://x.com/blips" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copiar"
            title="Copiar"
            size="icon-xs"
            onClick={() => {
              void navigator.clipboard?.writeText("https://x.com/blips");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Cupom de desconto" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Aplicar</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Rascunho sem título" />
        <InputGroupAddon>
          <InputGroupButton variant="outline">Renomear</InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="secondary"
            size="icon-xs"
            aria-label="Excluir"
          >
            <TrashIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
