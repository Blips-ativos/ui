"use client";

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@blips/ui/components/menubar";
import {
  FileIcon,
  FloppyDiskIcon,
  FolderIcon,
  GearIcon,
  QuestionIcon,
  TrashIcon,
} from "@phosphor-icons/react";

export default function MenubarIcons() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FileIcon />
            Novo arquivo <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <FolderIcon />
            Abrir pasta
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <FloppyDiskIcon />
            Salvar <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Mais</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              <GearIcon />
              Configurações
            </MenubarItem>
            <MenubarItem>
              <QuestionIcon />
              Ajuda
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              <TrashIcon />
              Excluir
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
