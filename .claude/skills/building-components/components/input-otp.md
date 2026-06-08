# InputOTP

**Categoria:** Compound | **Deps:** `input-otp`, `lucide-react` | **"use client":** Não

## Exports

`InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`

## Uso

### Input de OTP básico (6 dígitos)

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@blips/ui"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### Input de OTP controlado

```tsx
const [otp, setOtp] = React.useState("")

<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### OTP com restrição de padrão (apenas dígitos)

```tsx
import { REGEXP_ONLY_DIGITS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### OTP com restrição de padrão (alfanumérico)

```tsx
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### OTP em um formulário

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@blips/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const schema = z.object({
  otp: z.string().length(6, "O OTP deve ter 6 dígitos"),
})

function OTPForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha de uso único</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Verificar</Button>
      </form>
    </Form>
  )
}
```

### OTP com estilização personalizada

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup className="gap-3">
    <InputOTPSlot index={0} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={1} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={2} className="border-2 border-primary rounded-lg" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup className="gap-3">
    <InputOTPSlot index={3} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={4} className="border-2 border-primary rounded-lg" />
    <InputOTPSlot index={5} className="border-2 border-primary rounded-lg" />
  </InputOTPGroup>
</InputOTP>
```

## Padrões disponíveis

O pacote `input-otp` fornece vários padrões regex para validação:

- `REGEXP_ONLY_DIGITS`: Apenas dígitos (0-9)
- `REGEXP_ONLY_CHARS`: Apenas letras (a-z, A-Z)
- `REGEXP_ONLY_DIGITS_AND_CHARS`: Alfanumérico (0-9, a-z, A-Z)

## Props & Variants

### InputOTP
- `maxLength`: number - Maximum OTP length (required)
- `value`: string - OTP value (controlled)
- `onChange`: (value: string) => void - Change handler
- `disabled`: boolean - Disable input
- `pattern`: RegExp - Regex pattern to validate input
- `pushPasswordManagerStrategy`: 'increase' | 'append' | undefined - Password manager handling strategy
- `render`: (props: any) => ReactNode - Custom render function
- `container`: ElementType - Custom container component
- `children`: ReactNode - OTP slots and groups

### InputOTPGroup
- `children`: ReactNode - OTP slots
- `className`: string - Custom CSS classes

Normalmente renderizado como um container flex com espaçamento entre os slots.

### InputOTPSlot
- `index`: number - Slot index (0-based, required)
- `className`: string - Custom CSS classes
- `disabled`: boolean - Disable slot
- `hasCaret`: boolean - Show input caret (default: true)

Estilização especial:
- Mostra um ponto de placeholder quando vazio: `•`
- Mostra o caractere quando preenchido
- Exibe o caret no foco por padrão
- Anel de foco acessível na navegação por teclado

### InputOTPSeparator
- `children`: ReactNode - Separator content (typically unused)
- `className`: string - Custom CSS classes

Normalmente renderiza como um separador visual (traço ou espaço) entre grupos.

## Comportamento

- **Avanço automático**: Move automaticamente para o próximo slot quando um dígito é inserido
- **Backspace automático**: Pressionar backspace move para o slot anterior
- **Suporte a colar**: Permite colar o valor completo do OTP de uma vez
- **Navegação por teclado**: As setas movem entre os slots
- **Gerenciamento de foco**: A tecla Tab navega pelos slots em sequência
- **Compatível com mobile**: Tamanho e espaçamento de slots adequados ao toque
- **Acessibilidade**: Suporte completo a teclado e leitores de tela

## Casos de uso comuns

### Verificar e-mail

```tsx
<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### Autenticação de dois fatores (2FA)

```tsx
<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### Código com múltiplos caracteres

```tsx
<InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOTPGroup className="gap-2">
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>
```
