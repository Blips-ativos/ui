# Sonner

Import: `@blips/ui/components/sonner` (o `Toaster`) e `sonner` (a função `toast`).

Notificações efêmeras (toasts) com a lib `sonner`: confirmação de ação ("Cliente
salvo"), erro não bloqueante, progresso de promessa. Para erro que exige ação,
use Alert ou Alert Dialog. Na v3 existe também um Toast sobre Base UI
(`toast.md`); o padrão do projeto continua sendo o Sonner, a menos que o repo já
use o outro.

Export (igual nas duas versões): `Toaster`.

## Notas comuns

- Monte **um** `<Toaster />` na raiz (layout) e dispare com `toast(...)` importado de `sonner`.
- O `Toaster` lê o tema do `next-themes` (`useTheme`) e usa as cores do tema (`--popover`, `--border`, `--radius`). Aceita todas as props do `Toaster` do sonner (`position`, `richColors`, `expand`, `duration`, `closeButton`, `toastOptions`…).
- API do `toast`: `toast(msg)`, `toast.success`, `toast.error`, `toast.info`, `toast.warning`, `toast.loading`, `toast.promise(promise, { loading, success, error })`, `toast.dismiss(id?)`. Opções: `description`, `action: { label, onClick }`, `cancel`, `duration`, `id` (deduplicar), `position`, `classNames`.
- Textos em pt-BR, curtos, no passado para confirmação ("Contrato enviado").

API igual na v2.x e na v3.x.

Detecção de versão: `SKILL.md`, Passo 0. Diferenças transversais entre as versões: `v2-vs-v3.md`.

Diferença só nos ícones Phosphor do `Toaster`:

| Tipo | v2.x — Radix | v3.x — Base UI |
|---|---|---|
| success | `CheckCircle` | `CheckCircleIcon` |
| info | `Info` | `InfoIcon` |
| warning | `Warning` | `WarningIcon` |
| error | `WarningOctagon` | `XCircleIcon` |
| loading | `CircleNotch` girando | `SpinnerIcon` girando |

```tsx
// app/layout.tsx
import { Toaster } from "@blips/ui/components/sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

```tsx
"use client";

import { toast } from "sonner";
import { Button } from "@blips/ui/components/button";

export function AcoesComToast({
  desfazer,
  enviarContrato,
}: {
  desfazer: () => void;
  enviarContrato: () => Promise<unknown>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Cliente salvo", {
            description: "Os dados já aparecem na listagem.",
            action: { label: "Desfazer", onClick: desfazer },
          })
        }
      >
        Salvar
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(enviarContrato(), {
            loading: "Enviando contrato...",
            success: "Contrato enviado",
            error: "Não foi possível enviar o contrato",
          })
        }
      >
        Enviar contrato
      </Button>
    </div>
  );
}
```

> Cuidado ao usar o Toast da v3 no mesmo arquivo: `@blips/ui/components/toast` também exporta `Toaster` e `toast`. Não importe os dois com o mesmo nome (use alias, ex. `import { toast as sonnerToast } from "sonner"`).

## Exemplos na docs

`sonner-demo`, `sonner-types` (em `apps/docs/examples/`, escritos para a v3).
