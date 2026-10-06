# Input OTP

Import: `@blips/ui/components/input-otp`

Campo de código de uso único (verificação por SMS/e-mail, 2FA), um caractere por
caixa. Usa a lib `input-otp` nas duas versões (não é primitiva Radix nem Base UI).

Exports (iguais nas duas versões): `InputOTP`, `InputOTPGroup`, `InputOTPSlot`,
`InputOTPSeparator`.

| Componente | Descrição |
|---|---|
| `InputOTP` | `OTPInput` da lib `input-otp`. Props: `maxLength` (obrigatório), `value`, `onChange(value)`, `onComplete(value)`, `pattern` (regex, ex. `REGEXP_ONLY_DIGITS` de `input-otp`), `disabled`, `id`, e `containerClassName` (classes do contêiner das caixas). |
| `InputOTPGroup` | Agrupa caixas coladas (bordas compartilhadas). |
| `InputOTPSlot` | Uma caixa; `index` (obrigatório) é a posição do caractere. Mostra caret piscando quando ativa. |
| `InputOTPSeparator` | Traço (ícone Phosphor de menos) entre grupos, com `role="separator"`. |

## Notas comuns

- Um `InputOTPSlot` por posição, de `0` a `maxLength - 1`.
- Em formulário: `FormControl` envolvendo o `InputOTP`, com `{...field}` (veja `form.md`); ou `Field` + `FieldLabel htmlFor` com o `id` do `InputOTP`.
- Erro: `aria-invalid` nos slots.

API igual na v2.x e na v3.x.

Detecção de versão: `SKILL.md`, Passo 0. Diferenças transversais entre as versões: `v2-vs-v3.md`.

Diferenças visuais e de padrão:

| | v2.x — Radix | v3.x — Base UI |
|---|---|---|
| Espaço entre grupos | `gap-2` no contêiner | **sem gap** (marcador inerte `cn-input-otp`): passe `containerClassName="gap-2"` se quiser espaço |
| Caixa | `h-9 w-9 text-sm shadow-xs` | `size-7 text-xs/relaxed bg-input/20`, anel ativo `ring-2 ring-ring/30` |
| Grupo | sem estilo de erro | `rounded-md` + anel `destructive` quando um filho tem `aria-invalid` |
| Corretor | — | `spellCheck={false}` forçado |
| Ícone do separador | `Minus` | `MinusIcon` |

```tsx
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Field, FieldLabel } from "@blips/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@blips/ui/components/input-otp";

export function CodigoDeVerificacao() {
  const [codigo, setCodigo] = React.useState("");

  return (
    <Field>
      <FieldLabel htmlFor="codigo">Código enviado por SMS</FieldLabel>
      <InputOTP
        id="codigo"
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={codigo}
        onChange={setCodigo}
        onComplete={(v) => verificar(v)}
        containerClassName="gap-2"
      >
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
    </Field>
  );
}
```

Em repo v2 o exemplo vale igual (o `Field` também existe na v2); o `containerClassName="gap-2"` é dispensável lá, porque já é o padrão.

## Exemplos na docs

`input-otp-demo`, `input-otp-pattern`, `input-otp-separator`, `input-otp-controlled`, `input-otp-form`, `input-otp-invalid` (em `apps/docs/examples/`, escritos para a v3).
