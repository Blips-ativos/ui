# Schemas Zod - Referência

Defina schemas **localmente** no arquivo do formulário.

## Schema Básico

```typescript
const schema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres.' })
    .max(100, { message: 'O nome deve conter no máximo 100 caracteres.' }),

  email: z
    .string()
    .email({ message: 'O e-mail deve ser válido.' })
    .nullish(),

  active: z.boolean().default(true),
})

type FormValues = z.infer<typeof schema>
```

## Padrões de Validação

### Strings

```typescript
// Obrigatória com limites
name: z.string({ required_error: 'O nome é obrigatório.' }).min(3).max(100)

// Opcional nullable (pode ser null ou undefined)
email: z.string().email().nullish()

// Opcional (apenas undefined, não null)
nickname: z.string().optional()
```

### Números

```typescript
// Coerção de string para número (inputs retornam string)
capacity: z.coerce.number().min(1)

// Número inteiro
quantity: z.coerce.number().int().positive()

// Número com range
percentage: z.coerce.number().min(0).max(100)
```

### Booleanos

```typescript
// Com valor padrão
isActive: z.boolean().default(true)

// Obrigatório
acceptTerms: z.boolean().refine(val => val === true, {
  message: 'Você deve aceitar os termos.',
})
```

### Documentos Brasileiros

```typescript
// CPF com máscara
cpf: z.string()
  .length(14, { message: 'CPF inválido.' })
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido.' })
  .nullish()

// CNPJ com máscara
cnpj: z.string()
  .length(18, { message: 'CNPJ inválido.' })
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: 'CNPJ inválido.' })
  .nullish()

// CEP com máscara
cep: z.string()
  .length(9, { message: 'CEP inválido.' })
  .regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido.' })
  .nullish()

// Telefone com máscara
phone: z.string()
  .length(15, { message: 'Telefone inválido.' })
  .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Telefone inválido.' })
  .nullish()
```

### Enums

```typescript
// Enum simples
status: z.enum(['active', 'inactive', 'pending'], {
  required_error: 'Selecione um status.',
})

// Enum com valores customizados
type: z.enum(['individual', 'company'], {
  errorMap: () => ({ message: 'Selecione o tipo de pessoa.' }),
})
```

### Refinamentos

```typescript
// Validação customizada
price: z.string().refine(
  (val) => !isNaN(Number(val)) && Number(val) >= 0,
  { message: 'O valor deve ser maior ou igual a 0.' }
)

// Transform (converte valor antes de validar)
amount: z.string()
  .transform((val) => val.replace(/\D/g, ''))
  .pipe(z.string().min(1, 'Valor é obrigatório'))
```

### Objetos Aninhados

```typescript
// Objeto opcional
address: z.object({
  street: z.string().nullish(),
  number: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
}).optional()

// Objeto obrigatório com campos opcionais
contact: z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  phone: z.string().nullish(),
  email: z.string().email().nullish(),
})
```

### Arrays

```typescript
// Array de strings
tags: z.array(z.string()).min(1, 'Selecione pelo menos uma tag')

// Array de objetos
contacts: z.array(z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
})).min(1, 'Adicione pelo menos um contato')
```

## Validação Cross-Field

```typescript
const dateRangeSchema = z
  .object({
    startDate: z.string().min(1, 'Data inicial é obrigatória'),
    endDate: z.string().min(1, 'Data final é obrigatória'),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      if (new Date(data.endDate) <= new Date(data.startDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endDate'],
          message: 'A data final deve ser posterior à data inicial.',
        })
      }
    }
  })
```

## Validação Condicional

```typescript
const personSchema = z
  .object({
    type: z.enum(['individual', 'company']),
    cpf: z.string().nullish(),
    cnpj: z.string().nullish(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'individual' && !data.cpf) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cpf'],
        message: 'CPF é obrigatório para pessoa física.',
      })
    }
    if (data.type === 'company' && !data.cnpj) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cnpj'],
        message: 'CNPJ é obrigatório para pessoa jurídica.',
      })
    }
  })
```
