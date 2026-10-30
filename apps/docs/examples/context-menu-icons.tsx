"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@blips/ui/components/context-menu";
import {
  ClipboardIcon,
  CopyIcon,
  ScissorsIcon,
  TrashIcon,
} from "@phosphor-icons/react";

export default function ContextMenuIcons() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-[2/0.5] w-full max-w-sm items-center justify-center rounded-lg border text-sm">
        Clique com o botão direito aqui
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon />
            Copiar
          </ContextMenuItem>
          <ContextMenuItem>
            <ScissorsIcon />
            Recortar
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardIcon />
            Colar
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <TrashIcon />
            Excluir
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
