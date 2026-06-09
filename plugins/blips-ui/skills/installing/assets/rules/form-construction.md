---
paths:
  - "**/*.tsx"
description: Construção de formulários — react-hook-form + Zod + @blips/ui/components/form; mensagens pt-BR; client component folha.
---

# Formulários — react-hook-form + Zod

- Stack: `react-hook-form` + `zod` + `@hookform/resolvers` +
  `@blips/ui/components/form`. Instale os três como deps **diretas** do app.
- Formulário é client component **folha** (`"use client"`); a página em volta
  continua Server Component (quando App Router).
- Mensagens de validação do schema Zod em **pt-BR**.
- Submissão integra com a camada de dados do repo (respeite a convenção local
  de API), nunca fetch solto dentro do componente de campo.

## Exemplo mínimo

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@blips/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@blips/ui/components/form";
import { Input } from "@blips/ui/components/input";

const schema = z.object({
  nome: z.string().min(2, "Informe o nome completo"),
});

export function FormCliente({ onSubmit }: { onSubmit: (v: z.infer<typeof schema>) => void }) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
```

(Em repos React 17, troque os subpaths pelo barrel `@blips/ui` — ver
`component-imports.md`.)
