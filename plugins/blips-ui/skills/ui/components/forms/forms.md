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
| Zod Schemas | [schemas-reference.md](schemas-reference.md) | Validations, types, regex |
| UI Components | [components-reference.md](components-reference.md) | Input, Select, Switch, Textarea |
| Input Masks | [masks-reference.md](masks-reference.md) | CPF, CNPJ, phone, currency |
| File Upload | [upload-reference.md](upload-reference.md) | Upload with drag-and-drop |
| Form Arrays | [arrays-reference.md](arrays-reference.md) | Dynamic field lists |

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
// Componente pai (Sheet)
export function EntityCreateSheet({ children }: Props) {
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
      <SheetTrigger asChild>{children}</SheetTrigger>
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
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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

## Arquivos de Referência

- `packages/ui/src/components/form.tsx`
- `packages/ui/src/components/sheet.tsx`
- `packages/ui/src/hooks/use-file-upload.ts`
- Máscaras de input: utilitário do seu app (ver [masks.md](masks.md))
