import { Tabs, TabsList, TabsTrigger } from "@blips/ui/components/tabs";
import {
  GearIcon,
  HouseIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";

export default function TabsIconOnly() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home" aria-label="Início">
          <HouseIcon />
        </TabsTrigger>
        <TabsTrigger value="search" aria-label="Buscar">
          <MagnifyingGlassIcon />
        </TabsTrigger>
        <TabsTrigger value="settings" aria-label="Configurações">
          <GearIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
