# Máscaras de Input - Referência

As funções de máscara são utilitários do seu app (não fazem parte de `@blips/ui`). Os exemplos importam de `@/lib/masks` — ajuste o caminho para onde sua aplicação as define.

## Funções Disponíveis

```typescript
import {
  maskCPF,        // XXX.XXX.XXX-XX
  maskCNPJ,       // XX.XXX.XXX/XXXX-XX
  maskCPFCNPJ,    // Auto-detecta CPF ou CNPJ pelo tamanho
  maskCEP,        // XXXXX-XXX
  maskPhone,      // (XX) XXXXX-XXXX (celular)
  maskLandline,   // (XX) XXXX-XXXX (fixo)
  maskCurrency,   // R$ X.XXX,XX
  maskCreditCard, // XXXX XXXX XXXX XXXX
  maskDate,       // DD/MM/AAAA
  onlyNumbers,    // Remove caracteres não-numéricos
  currencyToCents,// Converte "R$ 1.234,56" para 123456
  centsToDisplay, // Converte 123456 para "R$ 1.234,56"
} from '@/lib/masks'
```

## Uso com FormField

### CPF

```typescript
import { maskCPF } from '@/lib/masks'

<FormField
  control={form.control}
  name="cpf"
  render={({ field }) => (
    <FormItem>
      <FormLabel>CPF</FormLabel>
      <FormControl>
        <Input
          placeholder="000.000.000-00"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskCPF(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### CNPJ

```typescript
import { maskCNPJ } from '@/lib/masks'

<FormField
  control={form.control}
  name="cnpj"
  render={({ field }) => (
    <FormItem>
      <FormLabel>CNPJ</FormLabel>
      <FormControl>
        <Input
          placeholder="00.000.000/0000-00"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskCNPJ(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### CPF/CNPJ Auto-detectado

```typescript
import { maskCPFCNPJ } from '@/lib/masks'

<FormField
  control={form.control}
  name="document"
  render={({ field }) => (
    <FormItem>
      <FormLabel>CPF ou CNPJ</FormLabel>
      <FormControl>
        <Input
          placeholder="CPF ou CNPJ"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskCPFCNPJ(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Telefone Celular

```typescript
import { maskPhone } from '@/lib/masks'

<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Celular</FormLabel>
      <FormControl>
        <Input
          placeholder="(00) 00000-0000"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskPhone(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Telefone Fixo

```typescript
import { maskLandline } from '@/lib/masks'

<FormField
  control={form.control}
  name="landline"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Telefone Fixo</FormLabel>
      <FormControl>
        <Input
          placeholder="(00) 0000-0000"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskLandline(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### CEP

```typescript
import { maskCEP } from '@/lib/masks'

<FormField
  control={form.control}
  name="cep"
  render={({ field }) => (
    <FormItem>
      <FormLabel>CEP</FormLabel>
      <FormControl>
        <Input
          placeholder="00000-000"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskCEP(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Moeda (BRL)

```typescript
import { maskCurrency } from '@/lib/masks'

<FormField
  control={form.control}
  name="price"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Valor</FormLabel>
      <FormControl>
        <Input
          placeholder="R$ 0,00"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskCurrency(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Cartão de Crédito

```typescript
import { maskCreditCard } from '@/lib/masks'

<FormField
  control={form.control}
  name="cardNumber"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Número do Cartão</FormLabel>
      <FormControl>
        <Input
          placeholder="0000 0000 0000 0000"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskCreditCard(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Data (DD/MM/AAAA)

```typescript
import { maskDate } from '@/lib/masks'

<FormField
  control={form.control}
  name="birthDate"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Data de Nascimento</FormLabel>
      <FormControl>
        <Input
          placeholder="00/00/0000"
          {...field}
          value={field.value ?? ''}
          onChange={(e) => field.onChange(maskDate(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Utilitários

### Converter Moeda para Centavos

```typescript
import { currencyToCents, centsToDisplay } from '@/lib/masks'

// Para enviar ao backend (converte para centavos)
const cents = currencyToCents('R$ 1.234,56') // 123456

// Para exibir (converte de centavos para display)
const display = centsToDisplay(123456) // "R$ 1.234,56"
```

### Remover Formatação

```typescript
import { onlyNumbers } from '@/lib/masks'

// Remove tudo que não é número
const digits = onlyNumbers('(11) 99999-9999') // "11999999999"
const cpfDigits = onlyNumbers('123.456.789-00') // "12345678900"
```

## Arquivo de Referência

Defina e exporte estas funções no seu app (ex.: `src/lib/masks/index.ts`).
