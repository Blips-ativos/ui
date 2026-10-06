"use client";

import { Button } from "@blips/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@blips/ui/components/drawer";

const PARAGRAPHS = [
  "As alterações são salvas automaticamente enquanto você digita.",
  "A entrega costuma levar de três a cinco dias úteis, conforme a sua região e a forma de envio escolhida.",
  "Usamos o seu e-mail para notificações da conta e atualizações de pedidos. Você pode alterá-lo a qualquer momento nas configurações do perfil.",
  "A autenticação em dois fatores adiciona uma camada extra de segurança. Com ela ativa, você informa um código do aplicativo autenticador além da senha.",
  "Reembolsos são processados em até dez dias úteis depois que recebemos a devolução. O item precisa estar sem uso e na embalagem original.",
  "Última atualização em 12 de março de 2026.",
];

const items = Array.from({ length: 20 }, (_, index) => ({
  id: `paragrafo-${index}`,
  text: PARAGRAPHS[index % PARAGRAPHS.length],
}));

export default function DrawerScrollable() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        Conteúdo rolável
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Termos de uso</DrawerTitle>
          <DrawerDescription>
            O corpo rola; cabeçalho e rodapé ficam fixos.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {items.map((item) => (
            <p key={item.id} className="mb-4 leading-normal">
              {item.text}
            </p>
          ))}
        </div>
        <DrawerFooter>
          <Button>Aceitar</Button>
          <DrawerClose render={<Button variant="outline" />}>
            Cancelar
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
