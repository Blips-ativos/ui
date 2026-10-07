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
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

const frameworks = [
  { label: "Selecione", value: null },
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Astro", value: "astro" },
  { label: "Nuxt.js", value: "nuxt" },
];

export default function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Criar projeto</CardTitle>
        <CardDescription>
          Publique o seu novo projeto em um clique.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="card-project-name">Nome</FieldLabel>
              <Input id="card-project-name" placeholder="Nome do projeto" />
            </Field>
            <Field>
              <FieldLabel htmlFor="card-framework">Framework</FieldLabel>
              <Select items={frameworks}>
                <SelectTrigger id="card-framework" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {frameworks.map((item) => (
                      <SelectItem key={item.label} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Publicar</Button>
      </CardFooter>
    </Card>
  );
}
