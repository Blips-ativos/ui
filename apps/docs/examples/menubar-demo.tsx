"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@blips/ui/components/menubar";
import * as React from "react";

export default function MenubarDemo() {
  const [showBookmarks, setShowBookmarks] = React.useState(false);
  const [showFullUrls, setShowFullUrls] = React.useState(true);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              Nova aba <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Nova janela <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Nova janela anônima</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Compartilhar</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Link por e-mail</MenubarItem>
              <MenubarItem>Mensagens</MenubarItem>
              <MenubarItem>Notas</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Imprimir... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>Recortar</MenubarItem>
            <MenubarItem>Copiar</MenubarItem>
            <MenubarItem>Colar</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Exibir</MenubarTrigger>
        <MenubarContent className="w-64">
          <MenubarCheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
          >
            Sempre mostrar a barra de favoritos
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={showFullUrls}
            onCheckedChange={setShowFullUrls}
          >
            Sempre mostrar URLs completas
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Recarregar <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Forçar recarga <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Tela cheia</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Ocultar barra lateral</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
