import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs";

export default function TabsLine() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList variant="line">
        <TabsTrigger value="overview">Visão geral</TabsTrigger>
        <TabsTrigger value="analytics">Análises</TabsTrigger>
        <TabsTrigger value="reports" disabled>
          Relatórios
        </TabsTrigger>
      </TabsList>
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
