import { Tabs, TabsList, TabsTrigger } from "@blips/ui/components/tabs";

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Início</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Desabilitada
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
