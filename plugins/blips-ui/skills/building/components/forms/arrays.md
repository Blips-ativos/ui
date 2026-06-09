# Form Arrays - Referência

Campos dinâmicos usando controle manual com `field.value` e `field.onChange`.

**NÃO use `useFieldArray`** - prefira o controle manual para maior flexibilidade.

## Table of Contents

- [Schema para Array](#schema-para-array)
- [Componente Completo](#componente-completo)
- [Helpers Reutilizáveis](#helpers-reutilizáveis)
- [Uso dos Helpers](#uso-dos-helpers)
- [Array de Strings Simples (Tags)](#array-de-strings-simples-tags)
- [Validação por Item](#validação-por-item)

## Schema para Array

```typescript
const schema = z.object({
  contacts: z.array(z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.string().email().nullish(),
  })).min(1, 'Adicione pelo menos um contato'),
})

type FormValues = z.infer<typeof schema>
```

## Componente Completo

```typescript
import { Plus, Trash } from '@phosphor-icons/react'
import { maskPhone } from '@/lib/masks'

function ContactsForm({ formRef, onSubmit }: FormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contacts: [{ name: '', phone: '', email: null }],
    },
  })

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="contacts"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Contatos</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    field.onChange([
                      ...field.value,
                      { name: '', phone: '', email: null }
                    ])
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>

              <div className="space-y-3">
                {field.value.map((contact, index) => (
                  <div key={index} className="flex gap-2 items-start p-3 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Input
                        placeholder="Nome"
                        value={contact.name}
                        onChange={(e) => {
                          const newContacts = [...field.value]
                          newContacts[index] = { ...contact, name: e.target.value }
                          field.onChange(newContacts)
                        }}
                      />
                      <Input
                        placeholder="(00) 00000-0000"
                        value={contact.phone}
                        onChange={(e) => {
                          const newContacts = [...field.value]
                          newContacts[index] = { ...contact, phone: maskPhone(e.target.value) }
                          field.onChange(newContacts)
                        }}
                      />
                      <Input
                        placeholder="email@exemplo.com"
                        value={contact.email ?? ''}
                        onChange={(e) => {
                          const newContacts = [...field.value]
                          newContacts[index] = { ...contact, email: e.target.value || null }
                          field.onChange(newContacts)
                        }}
                      />
                    </div>
                    {field.value.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          field.onChange(field.value.filter((_, i) => i !== index))
                        }}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
```

## Helpers Reutilizáveis

```typescript
// Adicionar item
function addItem<T>(field: { value: T[]; onChange: (v: T[]) => void }, newItem: T) {
  field.onChange([...field.value, newItem])
}

// Remover item por índice
function removeItem<T>(field: { value: T[]; onChange: (v: T[]) => void }, index: number) {
  field.onChange(field.value.filter((_, i) => i !== index))
}

// Atualizar item por índice
function updateItem<T>(
  field: { value: T[]; onChange: (v: T[]) => void },
  index: number,
  updates: Partial<T>
) {
  const newItems = [...field.value]
  newItems[index] = { ...newItems[index], ...updates }
  field.onChange(newItems)
}

// Mover item (reordenar)
function moveItem<T>(
  field: { value: T[]; onChange: (v: T[]) => void },
  fromIndex: number,
  toIndex: number
) {
  const newItems = [...field.value]
  const [removed] = newItems.splice(fromIndex, 1)
  newItems.splice(toIndex, 0, removed)
  field.onChange(newItems)
}

// Duplicar item
function duplicateItem<T>(field: { value: T[]; onChange: (v: T[]) => void }, index: number) {
  const newItems = [...field.value]
  newItems.splice(index + 1, 0, { ...newItems[index] })
  field.onChange(newItems)
}
```

## Uso dos Helpers

```typescript
<FormField
  control={form.control}
  name="items"
  render={({ field }) => (
    <FormItem>
      <div className="flex justify-between">
        <FormLabel>Itens</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem(field, { name: '', quantity: 1 })}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-2">
        {field.value.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item.name}
              onChange={(e) => updateItem(field, index, { name: e.target.value })}
            />
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(field, index, { quantity: Number(e.target.value) })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => duplicateItem(field, index)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            {field.value.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(field, index)}
              >
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <FormMessage />
    </FormItem>
  )}
/>
```

## Array de Strings Simples (Tags)

```typescript
const schema = z.object({
  tags: z.array(z.string().min(1)).min(1, 'Adicione pelo menos uma tag'),
})

<FormField
  control={form.control}
  name="tags"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tags</FormLabel>
      <div className="flex flex-wrap gap-2">
        {field.value.map((tag, index) => (
          <Badge key={index} variant="secondary" className="gap-1">
            {tag}
            <button
              type="button"
              onClick={() => removeItem(field, index)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          placeholder="Nova tag + Enter"
          className="w-32"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              const value = e.currentTarget.value.trim()
              if (value && !field.value.includes(value)) {
                addItem(field, value)
                e.currentTarget.value = ''
              }
            }
          }}
        />
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Validação por Item

Para exibir erros específicos de cada item:

```typescript
<FormField
  control={form.control}
  name="contacts"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Contatos</FormLabel>

      {field.value.map((contact, index) => {
        // Pega erros específicos do item
        const errors = form.formState.errors.contacts?.[index]

        return (
          <div key={index} className="space-y-2 p-3 border rounded">
            <Input
              value={contact.name}
              onChange={(e) => updateItem(field, index, { name: e.target.value })}
              className={errors?.name ? 'border-destructive' : ''}
            />
            {errors?.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}

            <Input
              value={contact.phone}
              onChange={(e) => updateItem(field, index, { phone: e.target.value })}
              className={errors?.phone ? 'border-destructive' : ''}
            />
            {errors?.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
        )
      })}

      {/* Erro geral do array (ex: "mínimo 1 item") */}
      <FormMessage />
    </FormItem>
  )}
/>
```
