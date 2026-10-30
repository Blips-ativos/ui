import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs";

export default function TabsVertical() {
  return (
    <Tabs
      defaultValue="account"
      orientation="vertical"
      className="w-full max-w-md"
    >
      <TabsList>
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="password">Senha</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
      </TabsList>
      <div className="flex-1 rounded-md border p-4">
        <TabsContent value="account">
          Gerencie suas preferências de conta e as informações do perfil.
        </TabsContent>
        <TabsContent value="password">
          Atualize sua senha para manter a conta segura. Use uma senha forte,
          com letras, números e símbolos.
        </TabsContent>
        <TabsContent value="notifications">
          Configure como você recebe notificações e alertas.
        </TabsContent>
      </div>
    </Tabs>
  );
}
