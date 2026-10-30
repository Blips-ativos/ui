"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command";
import {
  CalculatorIcon,
  CalendarBlankIcon,
  CreditCardIcon,
  GearIcon,
  SmileyIcon,
  UserIcon,
} from "@phosphor-icons/react";

export default function CommandDemo() {
  return (
    <Command className="rounded-xl shadow-md ring-1 ring-foreground/10 md:min-w-[450px]">
      <CommandInput placeholder="Digite um comando ou pesquise..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>
            <CalendarBlankIcon />
            <span>Calendário</span>
          </CommandItem>
          <CommandItem>
            <SmileyIcon />
            <span>Buscar emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <CalculatorIcon />
            <span>Calculadora</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configurações">
          <CommandItem>
            <UserIcon />
            <span>Perfil</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCardIcon />
            <span>Faturamento</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon />
            <span>Configurações</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
