# Button

Import: `@blips/ui/components/button`

Botão com variantes CVA. Exports: `Button`, `buttonVariants`.

## Notas comuns

- `variant`: `default` (padrão), `outline`, `secondary`, `ghost`, `destructive`, `link`.
- `size`: `default` (padrão), `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
- **Não existe prop `loading`.** Estado de carregamento: `disabled` + `<Spinner />` dentro do botão (ver exemplos).
- Botão só de ícone (`size="icon*"`) precisa de `aria-label`.
- Svgs são dimensionados automaticamente por `[&_svg:not([class*='size-'])]:size-*` conforme o `size`.
- `buttonVariants({ variant, size })` aplica o visual a outro elemento (`<a>`, `Link`).
- Ícones Phosphor, nunca lucide.

> A API difere entre as versões (`render`/`nativeButton` vs `asChild`; `type` padrão; densidade). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/button`. Props: `ButtonPrimitive.Props & VariantProps<typeof buttonVariants>`.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | ver acima | `"default"` | Visual. |
| `size` | ver acima | `"default"` | Tamanho. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Troca o elemento (substitui `asChild`). |
| `nativeButton` | `boolean` | `true` | Passe `false` quando `render` não for um `<button>` (ex.: `<a>`, `Link`). Sem isso o Base UI aplica semântica de botão nativo e avisa no console. |
| `focusableWhenDisabled` | `boolean` | `false` | Mantém o foco por teclado quando desabilitado. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | **O Base UI define `type="button"`**. Botão de envio de formulário precisa de `type="submit"` explícito. |
| `className` / `style` | `string` ou função do estado | — | Aceitam função `(state) => …`. |

Não emite mais `data-variant`/`data-size` (só `data-slot="button"`).

Visual base-mira (compacto):

| size | altura / ícone |
|---|---|
| `default` | `h-7`, `text-xs/relaxed`, svg `size-3.5` |
| `xs` | `h-5`, `text-[0.625rem]`, svg `size-2.5` |
| `sm` | `h-6`, svg `size-3` |
| `lg` | `h-8`, svg `size-4` |
| `icon` / `icon-xs` / `icon-sm` / `icon-lg` | `size-7` / `size-5` / `size-6` / `size-8` |

`destructive` é tonal (`bg-destructive/10 text-destructive`); `outline` sem `bg-background`/sombra; gap ícone-texto `gap-1`; `translate-y-px` ao clicar. O padding lateral com ícone depende de marcar o ícone com `data-icon="inline-start"` ou `data-icon="inline-end"`.

```tsx
import { Button } from "@blips/ui/components/button";
import { Spinner } from "@blips/ui/components/spinner";
import { ArrowRightIcon, ArrowUpIcon, PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";

export function Botoes({ salvando }: { salvando: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Salvar</Button>
      <Button variant="outline">
        <PlusIcon data-icon="inline-start" />
        Novo cliente
      </Button>
      <Button variant="secondary">
        Continuar <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="destructive">Excluir</Button>
      <Button variant="outline" size="icon" aria-label="Enviar">
        <ArrowUpIcon />
      </Button>

      {/* Carregando */}
      <Button type="submit" disabled={salvando}>
        {salvando && <Spinner data-icon="inline-start" />}
        Salvar
      </Button>

      {/* Link com visual de botão */}
      <Button variant="link" nativeButton={false} render={<Link href="/painel" />}>
        Ir para o painel
      </Button>
    </div>
  );
}
```

`buttonVariants` direto num link (sem trocar o elemento do Button):

```tsx
import { buttonVariants } from "@blips/ui/components/button";

<a href="/relatorio" className={buttonVariants({ variant: "outline", size: "sm" })}>
  Baixar relatório
</a>
```

## v2.x — Radix

Props: `React.ComponentProps<"button"> & VariantProps & { asChild?: boolean }`. `asChild` usa `Slot` de `@radix-ui/react-slot`.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | ver acima | `"default"` | Visual. |
| `size` | ver acima | `"default"` | Tamanho. |
| `asChild` | `boolean` | `false` | Aplica o visual ao filho único (ex.: `Link`). |
| `type` | `"button" \| "submit" \| "reset"` | padrão do HTML | Sem `type`, dentro de `<form>` o botão **envia** o formulário. Use `type="button"` em botões que não são de envio. |

Emite `data-slot="button"`, `data-variant` e `data-size`.

Visual new-york:

| size | altura |
|---|---|
| `default` | `h-9 px-4 py-2` (`has-[>svg]:px-3`) |
| `xs` | `h-6 text-xs`, svg `size-3` |
| `sm` | `h-8` |
| `lg` | `h-10` |
| `icon` / `icon-xs` / `icon-sm` / `icon-lg` | `size-9` / `size-6` / `size-8` / `size-10` |

Base `text-sm gap-2`, svg `size-4`. `destructive` é sólido (`bg-destructive text-white`); `outline` tem `bg-background shadow-xs`. Padding com ícone é automático (`has-[>svg]`).

```tsx
import Link from "next/link"
import { ArrowRight, ArrowUp, Plus } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import { Spinner } from "@blips/ui/components/spinner"

export function Botoes({ salvando }: { salvando: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button">Salvar rascunho</Button>
      <Button variant="outline">
        <Plus />
        Novo cliente
      </Button>
      <Button variant="secondary">
        Continuar <ArrowRight />
      </Button>
      <Button variant="destructive">Excluir</Button>
      <Button variant="outline" size="icon" aria-label="Enviar">
        <ArrowUp />
      </Button>

      {/* Carregando */}
      <Button type="submit" disabled={salvando}>
        {salvando && <Spinner />}
        Salvar
      </Button>

      {/* Link com visual de botão */}
      <Button asChild variant="link">
        <Link href="/painel">Ir para o painel</Link>
      </Button>
    </div>
  )
}
```

## Exemplos na docs

`button-demo`, `button-variants`, `button-size`, `button-with-icon`, `button-icon`, `button-loading`, `button-render`, `button-rounded`, `button-invalid`, `button-default`, `button-secondary`, `button-outline`, `button-ghost`, `button-destructive`, `button-link` (v3).
