"use client";

import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  CaretDownIcon,
  CheckIcon,
  CopyIcon,
  ShareIcon,
  SpeakerSlashIcon,
  TrashIcon,
  UserMinusIcon,
  WarningIcon,
} from "@phosphor-icons/react";

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Seguir</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Mais opções" />
          }
        >
          <CaretDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SpeakerSlashIcon />
              Silenciar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckIcon />
              Marcar como lida
            </DropdownMenuItem>
            <DropdownMenuItem>
              <WarningIcon />
              Denunciar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserMinusIcon />
              Bloquear usuário
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon />
              Compartilhar conversa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Copiar conversa
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Excluir conversa
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
