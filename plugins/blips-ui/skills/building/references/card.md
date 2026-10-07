# Card

Import: `@blips/ui/components/card`

Contêiner com cabeçalho, conteúdo e rodapé. Só HTML (`div`s com `data-slot`), sem
primitiva, nas duas versões.

Exports (iguais nas duas versões): `Card`, `CardHeader`, `CardTitle`,
`CardDescription`, `CardAction`, `CardContent`, `CardFooter`.

## Notas comuns

| Componente | Descrição |
|---|---|
| `Card` | Raiz `flex flex-col`, `bg-card`, `data-slot="card"`. |
| `CardHeader` | Grid; quando tem `CardAction`, vira `grid-cols-[1fr_auto]`. Com `className="border-b"`, ganha padding inferior. Container query `@container/card-header`. |
| `CardTitle` | Título (`div`, não `h*` — passe a semântica se precisar: `<CardTitle role="heading" aria-level={2}>` ou um `<h2>` dentro). |
| `CardDescription` | Texto `text-muted-foreground`. |
| `CardAction` | Ação no canto superior direito do header (`col-start-2 row-span-2`). |
| `CardContent` | Corpo com padding horizontal. |
| `CardFooter` | `flex items-center`; com `className="border-t"`, ganha padding superior. |

- Todos são componentes de função com `data-slot` (não há `forwardRef` nem `data-role`).
- Em dashboards, use `CardAction` para menu/filtro do card em vez de flex manual no header.

> A API difere entre as versões (prop `size` e espaçamento só na v3). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `size` (no `Card`) | `"default" \| "sm"` | `"default"` | Espaçamento interno via `--card-spacing`: 16px (`default`) ou 12px (`sm`). `data-size`. |

Visual base-mira: `rounded-lg`, `ring-1 ring-foreground/10` (sem `border` e sem `shadow`), `overflow-hidden`, texto base `text-xs/relaxed`. `CardTitle`: `font-heading text-sm font-medium`. `CardDescription`: `text-xs/relaxed`. `CardHeader` `gap-1`, com 2 linhas só quando há `CardDescription`.

- Para mudar o espaçamento, prefira `className="[--card-spacing:--spacing(6)]"` a sobrescrever `px-*`/`py-*`.
- `<img>` como primeiro/último filho ganha cantos arredondados, e o card tira o padding superior quando a imagem vem primeiro.

```tsx
import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export function CardLogin() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>Informe o seu e-mail para entrar</CardDescription>
        <CardAction>
          <Button variant="link">Criar conta</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="form-login">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input id="email" type="email" placeholder="voce@exemplo.com" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="senha">Senha</FieldLabel>
              <Input id="senha" type="password" required />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="form-login" className="w-full">
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
}

// Card compacto de métrica
<Card size="sm">
  <CardHeader>
    <CardDescription>Receita do mês</CardDescription>
    <CardTitle className="text-2xl tabular-nums">R$ 48.230,00</CardTitle>
  </CardHeader>
</Card>
```

## v2.x — Radix

Sem prop `size`. Espaçamento fixo: `py-6`, `gap-6`, `px-6` nas seções.

Visual new-york: `rounded-xl border shadow-sm`. `CardTitle`: `leading-none font-semibold`. `CardDescription`: `text-sm`. `CardHeader`: `gap-2`, sempre `grid-rows-[auto_auto]`.

```tsx
import { Button } from "@blips/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export function CardLogin() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>Informe o seu e-mail para entrar</CardDescription>
        <CardAction>
          <Button variant="link">Criar conta</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="form-login">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="voce@exemplo.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="form-login" className="w-full">
          Entrar
        </Button>
      </CardFooter>
    </Card>
  )
}

// Card de métrica (menos padding)
<Card className="gap-2 py-4">
  <CardHeader className="px-4">
    <CardDescription>Receita do mês</CardDescription>
    <CardTitle className="text-2xl tabular-nums">R$ 48.230,00</CardTitle>
  </CardHeader>
</Card>
```

## Exemplos na docs

`card-demo`, `card-with-form` (v3).
