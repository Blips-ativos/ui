# Menubar
**Categoria:** Compound | **Deps:** `@radix-ui/react-menubar`, `lucide-react` | **"use client":** Não

Exports: Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal, MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut

Usage:
```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut } from "@blips/ui"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```
