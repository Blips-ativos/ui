"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import { CaretDownIcon, DotsThreeIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function InputGroupDropdown() {
  const [country, setCountry] = useState("+55");

  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Nome do arquivo" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="Mais opções"
                  size="icon-xs"
                />
              }
            >
              <DotsThreeIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Copiar caminho</DropdownMenuItem>
              <DropdownMenuItem>Abrir local</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="tel" placeholder="(11) 91234-5678" />
        <InputGroupAddon>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton className="text-muted-foreground tabular-nums" />
              }
            >
              {country} <CaretDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-16"
              sideOffset={10}
              alignOffset={-8}
            >
              <DropdownMenuItem onClick={() => setCountry("+55")}>
                +55
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCountry("+1")}>
                +1
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCountry("+351")}>
                +351
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
