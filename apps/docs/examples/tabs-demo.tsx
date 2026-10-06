"use client";

import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="password">Senha</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>
              Faça alterações na sua conta aqui. Clique em salvar quando
              terminar.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tabs-demo-name">Nome</Label>
              <Input id="tabs-demo-name" defaultValue="Ana Souza" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tabs-demo-username">Usuário</Label>
              <Input id="tabs-demo-username" defaultValue="@anasouza" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar alterações</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Senha</CardTitle>
            <CardDescription>
              Altere sua senha aqui. Depois de salvar, você será desconectado.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tabs-demo-current">Senha atual</Label>
              <Input id="tabs-demo-current" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tabs-demo-new">Nova senha</Label>
              <Input id="tabs-demo-new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar senha</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
