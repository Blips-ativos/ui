"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@blips/ui/components/menubar";
import * as React from "react";

export default function MenubarRadio() {
  const [user, setUser] = React.useState<string>("benoit");
  const [theme, setTheme] = React.useState<string>("system");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Perfis</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={user} onValueChange={setUser}>
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Editar...</MenubarItem>
          <MenubarItem inset>Adicionar perfil...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Tema</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="light">Claro</MenubarRadioItem>
            <MenubarRadioItem value="dark">Escuro</MenubarRadioItem>
            <MenubarRadioItem value="system">Sistema</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
