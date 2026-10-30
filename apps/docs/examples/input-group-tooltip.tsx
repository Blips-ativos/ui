"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@blips/ui/components/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";
import { InfoIcon, QuestionIcon, StarIcon } from "@phosphor-icons/react";

export default function InputGroupTooltip() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Digite a senha" type="password" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  className="rounded-full"
                  size="icon-xs"
                  aria-label="Informações"
                />
              }
            >
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>Use ao menos 8 caracteres.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <Popover>
          <PopoverTrigger render={<InputGroupAddon />} nativeButton={false}>
            <InputGroupButton
              variant="secondary"
              size="icon-xs"
              aria-label="Ajuda"
            >
              <QuestionIcon />
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent align="start">
            <PopoverHeader>
              <PopoverTitle>Conexão não segura.</PopoverTitle>
              <PopoverDescription>
                Não informe dados sensíveis neste site.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <InputGroupAddon className="pl-1 text-muted-foreground">
          https://
        </InputGroupAddon>
        <InputGroupInput placeholder="exemplo.com.br" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Favoritar">
            <StarIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
