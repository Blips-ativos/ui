"use client";

import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs";
import { DotsThreeOutlineIcon } from "@phosphor-icons/react";

export default function TabsDropdown() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" className="size-8" />}
          >
            <DotsThreeOutlineIcon />
            <span className="sr-only">Mais opções</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Exportar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Arquivar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border p-4">
        <TabsContent value="overview">
          Veja as métricas do painel e os principais indicadores.
        </TabsContent>
        <TabsContent value="analytics">
          Análises detalhadas e insights sobre os seus dados.
        </TabsContent>
        <TabsContent value="reports">
          Gere e consulte relatórios personalizados.
        </TabsContent>
      </div>
    </Tabs>
  );
}
