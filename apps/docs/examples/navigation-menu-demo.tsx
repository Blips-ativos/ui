"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@blips/ui/components/navigation-menu";
import {
  CheckCircleIcon,
  CircleIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import type * as React from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/components/alert-dialog",
    description:
      "Um diálogo modal que interrompe o usuário com conteúdo importante e espera uma resposta.",
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    description:
      "Pré-visualiza o conteúdo disponível por trás de um link ao passar o mouse.",
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    description:
      "Exibe um indicador do progresso de uma tarefa, normalmente como uma barra.",
  },
  {
    title: "Scroll Area",
    href: "/docs/components/scroll-area",
    description: "Área rolável com barra de rolagem estilizada.",
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description: "Seções de conteúdo em camadas, exibidas uma de cada vez.",
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    description:
      "Um popup com informações sobre um elemento quando ele recebe foco ou o mouse passa sobre ele.",
  },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Primeiros passos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Introdução">
                Componentes reutilizáveis construídos com Base UI e Tailwind
                CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Instalação">
                Como instalar as dependências e estruturar o seu app.
              </ListItem>
              <ListItem href="/docs/theming" title="Temas">
                Tokens de cor, tipografia e modo escuro.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Componentes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Com ícone</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <QuestionIcon />
                  Backlog
                </NavigationMenuLink>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CircleIcon />A fazer
                </NavigationMenuLink>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CheckCircleIcon />
                  Concluído
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/docs" />}
            className={navigationMenuTriggerStyle()}
          >
            Documentação
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href} />}>
        <div className="flex flex-col gap-1 text-xs">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  );
}
