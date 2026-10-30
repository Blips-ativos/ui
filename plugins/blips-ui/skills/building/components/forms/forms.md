# Forms - Reference

Guide for creating forms with react-hook-form, Zod validation, and the project's Form components.

## Stack

- **React Hook Form** with `useForm` hook
- **Zod** for schema validation
- **Form components** from `@blips/ui/components/form`
- **formRef pattern** for parent-controlled submission

## Sub-References

| Resource | File | When to use |
|----------|------|-------------|
| Zod Schemas | [schemas.md](schemas.md) | Validations, types, regex |
| UI Components | [form-components.md](form-components.md) | Input, Select, Switch, Textarea |
| Input Masks | [masks.md](masks.md) | CPF, CNPJ, phone, currency |
| File Upload | [upload.md](upload.md) | Upload with drag-and-drop |
| Form Arrays | [arrays.md](arrays.md) | Dynamic field lists |

> **Versão da lib:** react-hook-form, Zod, `Form`/`FormField`/`FormItem`/`FormLabel`/
> `FormControl`/`FormMessage` têm o mesmo uso na v2.x e na v3.x. O que muda (trigger do Sheet,
> `Select`, densidade) está em [v3.x — Base UI](#v3x--base-ui) e [v2.x — Radix](#v2x--radix).
> Detecção de versão: Passo 0 do `SKILL.md` do building.

---

## Estrutura Básica

```typescript
'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@blips/ui/components/form'
import { Input } from '@blips/ui/components/input'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email().nullish(),
})

type FormValues = z.infer<typeof schema>

interface EntityFormProps {
  formRef?: React.RefObject<HTMLFormElement | null>
  defaultValues?: Partial<FormValues>
  onSubmit: (values: FormValues) => Promise<void> | void
}

export function EntityForm({ formRef, defaultValues, onSubmit }: EntityFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: null, ...defaultValues },
  })

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
```

---

## Padrão FormRef (Sheet/Dialog)

O `formRef` permite que o botão de submit fique fora do `<form>`:

```typescript
// Componente pai (Sheet) — v3.x; na v2.x o trigger usa asChild (ver seção v2.x)
export function EntityCreateSheet({ children }: { children: React.ReactElement }) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [open, setOpen] = React.useState(false)

  const { mutateAsync, isPending } = api.entity.create.useMutation({
    onSuccess: () => {
      toast.success('Criado com sucesso!')
      setOpen(false)
    },
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={children} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Entidade</SheetTitle>
        </SheetHeader>

        <SheetBody>
          <EntityForm formRef={formRef} onSubmit={(v) => mutateAsync({ data: v })} />
        </SheetBody>

        <SheetFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => formRef.current?.requestSubmit()} disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            Salvar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

---

## Diretrizes

### FAÇA

- Use português para mensagens de erro e labels
- Use `formRef` quando o form estiver em Dialog/Sheet
- Defina schemas localmente no arquivo do formulário
- Use `.nullish()` para campos opcionais que podem ser null
- Use `value={field.value ?? ''}` para campos nullable
- Use grid layouts para organizar campos
- Envolva apenas o(s) input(s) com `FormControl`, não componentes auxiliares

### NÃO FAÇA

- Não use `useImperativeHandle` - use ref direta
- Não coloque o botão submit dentro do form em Dialog/Sheet
- Não esqueça do `FormMessage` para exibir erros
- Não use mensagens de erro em inglês
- Não use `useFieldArray` - prefira controle manual
- Não envolva componentes inteiros com `FormControl` - apenas o input dentro dele

---

## v3.x — Base UI

- Trigger do Sheet recebendo um elemento do pai: `<SheetTrigger render={children} />`
  (`children: React.ReactElement`). Se o pai mandar um `<Button>`, ele vira o trigger.
- `FormControl` usa `useRender` + `mergeProps`: aceita um filho (`<FormControl><Input /></FormControl>`)
  ou `render` (`<FormControl render={<Input />} />`). Um `id` no filho sobrescreve o do campo e
  quebra o `htmlFor` do `FormLabel`: não passe `id` no input.
- `FormDescription`/`FormMessage` em `text-xs/relaxed` (densidade base-mira).
- `Spinner` (`@blips/ui/components/spinner`) com `data-icon="inline-start"` dentro do Button.
- `Select` precisa de `items` para mostrar o rótulo antes de abrir — ver `form-components.md`.

## v2.x — Radix

```tsx
export function EntityCreateSheet({ children }: { children: React.ReactNode }) {
  // ...
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      {/* ... */}
      <Button onClick={() => formRef.current?.requestSubmit()} disabled={isPending}>
        {isPending && <Spinner />}
        Salvar
      </Button>
    </Sheet>
  )
}
```

- `FormControl` usa o `Slot` do Radix (um único filho elemento; sem `render`).
- `FormDescription`/`FormMessage` em `text-sm`.

---

## Arquivos de Referência

- `packages/ui/src/components/form.tsx`
- `packages/ui/src/components/sheet.tsx`
- Máscaras de input: utilitário do seu app (ver [masks.md](masks.md))
