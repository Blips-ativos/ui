"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@blips/ui/components/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";
import {
  ArrowUpIcon,
  CheckIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";

export default function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Buscar..." />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 resultados</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="exemplo.com.br" className="pl-1!" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
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
            <TooltipContent>O endereço precisa ser público.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Pergunte, busque ou converse..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
            aria-label="Anexar"
          >
            <PlusIcon />
          </InputGroupButton>
          <InputGroupText className="ml-auto">52% usado</InputGroupText>
          <InputGroupButton
            variant="default"
            className="rounded-full"
            size="icon-xs"
          >
            <ArrowUpIcon />
            <span className="sr-only">Enviar</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="@usuario" defaultValue="@blips" />
        <InputGroupAddon align="inline-end">
          <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckIcon className="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
