# Alert

Import: `@blips/ui/components/alert`

Mensagem em destaque dentro da página (não é toast nem modal). `div` com
`role="alert"`. Sem primitiva Base UI/Radix: só HTML + CVA nas duas versões.

## Notas comuns

- Variantes: `default` (`bg-card text-card-foreground`) e `destructive` (`bg-card text-destructive`, descrição em `text-destructive/90`). **Não existe variante `info`** — para tons informativos, use `default` com ícone ou ajuste por `className`.
- Ícone Phosphor como **filho direto** de `Alert` vira a primeira coluna do grid; título e descrição vão para a segunda.
- `alertVariants` não é exportado.

> A API difere entre as versões (export `AlertAction` só na v3). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Exports: `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction`.

| Componente | Descrição |
|---|---|
| `Alert` | `variant?: "default" \| "destructive"`. Base: `grid gap-0.5 rounded-lg border px-2 py-1.5 text-xs/relaxed`; com svg vira `grid-cols-[auto_1fr]`, ícone `size-3.5` (se não tiver `size-*`) ocupando 2 linhas. Com `AlertAction`, reserva `pr-18`. |
| `AlertTitle` | `font-medium`; vai para a coluna 2 quando há ícone. Sem `line-clamp`: títulos longos quebram linha. |
| `AlertDescription` | `text-xs/relaxed text-balance text-muted-foreground`; links sublinhados; `mb-4` entre parágrafos. |
| `AlertAction` | **Novo.** Slot `absolute top-1.5 right-2` para uma ação (ex.: botão de fechar ou "Desfazer"). |

### Exemplos

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@blips/ui/components/alert";
import { Button } from "@blips/ui/components/button";
import { CheckCircleIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react";

export function AlertaSucesso() {
  return (
    <Alert>
      <CheckCircleIcon />
      <AlertTitle>Alterações salvas</AlertTitle>
      <AlertDescription>O cadastro do cliente foi atualizado.</AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-xs" aria-label="Fechar">
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  );
}

export function AlertaPagamento() {
  return (
    <Alert variant="destructive">
      <WarningCircleIcon />
      <AlertTitle>Não foi possível processar o pagamento.</AlertTitle>
      <AlertDescription>
        <p>
          Confira os seus <a href="#cobranca">dados de cobrança</a> e tente novamente.
        </p>
        <ul className="list-inside list-disc">
          <li>Confira os dados do cartão</li>
          <li>Verifique se há saldo suficiente</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
```

## v2.x — Radix

Exports: `Alert`, `AlertTitle`, `AlertDescription` (não há `AlertAction`).

| Componente | Descrição |
|---|---|
| `Alert` | `variant?: "default" \| "destructive"`. Base: `grid grid-cols-[0_1fr] gap-y-0.5 rounded-lg border px-4 py-3 text-sm`; com svg, `grid-cols-[calc(var(--spacing)*4)_1fr] gap-x-3` e ícone `size-4`. |
| `AlertTitle` | `col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight` (título longo é cortado em 1 linha). |
| `AlertDescription` | `col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground`. |

### Exemplos

```tsx
import { CheckCircle, WarningCircle } from "@phosphor-icons/react"
import { Alert, AlertDescription, AlertTitle } from "@blips/ui/components/alert"

export function AlertaSucesso() {
  return (
    <Alert>
      <CheckCircle />
      <AlertTitle>Alterações salvas</AlertTitle>
      <AlertDescription>O cadastro do cliente foi atualizado.</AlertDescription>
    </Alert>
  )
}

export function AlertaPagamento() {
  return (
    <Alert variant="destructive">
      <WarningCircle />
      <AlertTitle>Não foi possível processar o pagamento.</AlertTitle>
      <AlertDescription>
        <p>Confira os dados de cobrança e tente novamente.</p>
        <ul className="list-inside list-disc text-sm">
          <li>Confira os dados do cartão</li>
          <li>Verifique se há saldo suficiente</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}
```

Para uma ação no canto na v2, posicione manualmente: `<Alert className="relative pr-12">` + um `Button` com `className="absolute top-2 right-2"`.

## Exemplos na docs

`alert-demo`, `alert-basic`, `alert-destructive`, `alert-action` (v3).
