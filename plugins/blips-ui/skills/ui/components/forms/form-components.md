# Componentes UI - Referência

Componentes de `@blips/ui` para uso em formulários.

## Table of Contents

- [FormControl - Comportamento Importante](#formcontrol---comportamento-importante)
- [Input](#input)
- [Select](#select)
- [Switch](#switch)
- [Textarea](#textarea)
- [Checkbox](#checkbox)
- [ButtonGroup com Input (+/-)](#buttongroup-com-input-)
- [Layout em Grid](#layout-em-grid)
- [Campos Condicionais](#campos-condicionais)

## FormControl - Comportamento Importante

O `FormControl` é responsável por:
- Aplicar **foco visual** no input quando clicado
- Aplicar **cores de erro** (borda vermelha) quando há erro de validação
- Conectar o input ao sistema de acessibilidade (aria-describedby, aria-invalid)

### Regras do FormControl

1. **Envolva apenas UM componente de input** por FormControl
2. **Não envolva botões** - apenas inputs, selects, textareas, switches, checkboxes
3. **Pode haver múltiplos FormControls** em um único FormField

```typescript
// ✅ CORRETO - FormControl envolve apenas o Input
<FormField
  name="quantity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Quantidade</FormLabel>
      <ButtonGroup>
        <Button type="button" variant="outline" onClick={decrement}>
          <Minus className="size-4" />
        </Button>
        <FormControl>
          <Input type="number" {...field} />
        </FormControl>
        <Button type="button" variant="outline" onClick={increment}>
          <Plus className="size-4" />
        </Button>
      </ButtonGroup>
      <FormMessage />
    </FormItem>
  )}
/>

// ❌ ERRADO - FormControl envolvendo ButtonGroup inteiro (incluindo botões)
<FormField
  name="quantity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Quantidade</FormLabel>
      <FormControl>
        <ButtonGroup>
          <Button>-</Button>
          <Input {...field} />
          <Button>+</Button>
        </ButtonGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Múltiplos FormControls por FormField

Útil quando há inputs compostos:

```typescript
// Dois inputs em um único campo (ex: range de valores)
<FormField
  name="priceRange"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Faixa de Preço</FormLabel>
      <div className="flex gap-2 items-center">
        <FormControl>
          <Input
            type="number"
            placeholder="Mínimo"
            value={field.value?.min ?? ''}
            onChange={(e) => field.onChange({ ...field.value, min: e.target.value })}
          />
        </FormControl>
        <span>até</span>
        <FormControl>
          <Input
            type="number"
            placeholder="Máximo"
            value={field.value?.max ?? ''}
            onChange={(e) => field.onChange({ ...field.value, max: e.target.value })}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

---

## Input

```typescript
import { Input } from '@blips/ui/components/input'

// Input básico
<FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Nome</FormLabel>
      <FormControl>
        <Input placeholder="Digite o nome" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// Input com campo nullable (IMPORTANTE: sempre use ?? '')
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>E-mail</FormLabel>
      <FormControl>
        <Input
          type="email"
          placeholder="email@exemplo.com"
          {...field}
          value={field.value ?? ''}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// Input de data
<FormField
  control={form.control}
  name="birthDate"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Data de nascimento</FormLabel>
      <FormControl>
        <Input type="date" {...field} value={field.value ?? ''} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// Input numérico
<FormField
  control={form.control}
  name="quantity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Quantidade</FormLabel>
      <FormControl>
        <Input type="number" min={1} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Select

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@blips/ui/components/select'

<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Categoria</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="option1">Opção 1</SelectItem>
          <SelectItem value="option2">Opção 2</SelectItem>
          <SelectItem value="option3">Opção 3</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

// Select com dados dinâmicos
<FormField
  control={form.control}
  name="categoryId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Categoria</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Switch

```typescript
import { Switch } from '@blips/ui/components/switch'

// Switch inline com descrição
<FormField
  control={form.control}
  name="active"
  render={({ field }) => (
    <FormItem className="flex items-center justify-between rounded-lg border p-3">
      <div className="space-y-0.5">
        <FormLabel>Ativo</FormLabel>
        <FormDescription className="text-xs">
          Itens inativos não aparecem para os usuários
        </FormDescription>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
    </FormItem>
  )}
/>

// Switch simples
<FormField
  control={form.control}
  name="notifications"
  render={({ field }) => (
    <FormItem className="flex items-center gap-3">
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <FormLabel className="!mt-0">Receber notificações</FormLabel>
    </FormItem>
  )}
/>
```

## Textarea

```typescript
import { Textarea } from '@blips/ui/components/textarea'

<FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Descrição</FormLabel>
      <FormControl>
        <Textarea
          placeholder="Digite a descrição..."
          rows={4}
          {...field}
          value={field.value ?? ''}
        />
      </FormControl>
      <FormDescription>Máximo de 500 caracteres</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Checkbox

```typescript
import { Checkbox } from '@blips/ui/components/checkbox'

<FormField
  control={form.control}
  name="acceptTerms"
  render={({ field }) => (
    <FormItem className="flex items-start gap-3">
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>Aceito os termos de uso</FormLabel>
        <FormDescription>
          Ao marcar, você concorda com nossos termos.
        </FormDescription>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

## ButtonGroup com Input (+/-)

Use `ButtonGroup` para inputs numéricos com botões de incremento/decremento:

```typescript
import { Button } from '@blips/ui/components/button'
import { ButtonGroup } from '@blips/ui/components/button-group'
import { Minus, Plus } from '@phosphor-icons/react'

<FormField
  control={form.control}
  name="quantity"
  render={({ field }) => {
    const currentValue = field.value ? parseInt(field.value, 10) : 0
    const handleIncrement = () =>
      field.onChange(String(Math.min(currentValue + 1, 100)))
    const handleDecrement = () =>
      field.onChange(String(Math.max(currentValue - 1, 0)))

    return (
      <FormItem>
        <FormLabel>Quantidade</FormLabel>
        <ButtonGroup>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={currentValue <= 0}
          >
            <Minus className="size-4" />
          </Button>
          <FormControl>
            <Input
              type="number"
              min={0}
              max={100}
              className="w-20 text-center rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...field}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={currentValue >= 100}
          >
            <Plus className="size-4" />
          </Button>
        </ButtonGroup>
        <FormMessage />
      </FormItem>
    )
  }}
/>
```

### Notas importantes:

- **`type="button"`** nos botões evita submit do form
- **`FormControl`** envolve apenas o `Input`, não os botões
- **`rounded-none`** no Input para bordas conectadas ao ButtonGroup
- **`[appearance:textfield]`** remove spinners nativos do input number
- **Handlers de incremento** ficam dentro do render para acesso ao `field`

---

## Layout em Grid

```typescript
// Duas colunas
<div className="grid grid-cols-2 gap-4">
  <FormField name="firstName" ... />
  <FormField name="lastName" ... />
</div>

// Três colunas
<div className="grid grid-cols-3 gap-4">
  <FormField name="city" ... />
  <FormField name="state" ... />
  <FormField name="zipCode" ... />
</div>

// Responsivo
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <FormField name="email" ... />
  <FormField name="phone" ... />
</div>

// Campo ocupando toda largura
<div className="grid grid-cols-2 gap-4">
  <FormField name="shortName" ... />
  <FormField name="category" ... />
  <div className="col-span-2">
    <FormField name="description" ... />
  </div>
</div>
```

## Campos Condicionais

```typescript
function ConditionalForm({ formRef, onSubmit }: FormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const personType = form.watch('personType')
  const hasDiscount = form.watch('hasDiscount')

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="personType" ... />

        {personType === 'individual' && (
          <FormField name="cpf" ... />
        )}

        {personType === 'company' && (
          <>
            <FormField name="cnpj" ... />
            <FormField name="tradeName" ... />
          </>
        )}

        <FormField name="hasDiscount" ... />

        {hasDiscount && (
          <FormField name="discountPercentage" ... />
        )}
      </form>
    </Form>
  )
}
```
