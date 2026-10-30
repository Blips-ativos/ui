# Spinner

Import: `@blips/ui/components/spinner`

Indicador de carregamento girando (`size-4 animate-spin`), com `role="status"` e
`aria-label="Loading"`. Props: `React.ComponentProps<"svg">`; tamanho e cor por
`className` (`size-6`, `text-muted-foreground`). Para placeholder de conteúdo, use
Skeleton.

Export (igual nas duas versões): `Spinner`.

## Notas comuns

- Sobrescreva o `aria-label` em pt-BR quando fizer sentido: `<Spinner aria-label="Carregando" />`.
- Em botão de envio: desabilite o botão e coloque o Spinner antes do texto.
- Funciona em `Badge`, `InputGroupAddon`, `Empty` e `Item`.

> A API é a mesma nas duas versões; muda o ícone e o jeito de espaçar ícone em botão. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Ícone Phosphor `SpinnerIcon` (raios). Tem `data-slot="spinner"`. Em `Button`,
marque com `data-icon="inline-start"` para o padding certo.

```tsx
import { Button } from "@blips/ui/components/button";
import { Spinner } from "@blips/ui/components/spinner";

export function SalvarCarregando() {
  return (
    <div className="flex items-center gap-4">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Salvando...
      </Button>
      <Button variant="outline" size="icon" disabled>
        <Spinner />
        <span className="sr-only">Carregando</span>
      </Button>
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
}
```

Quem quiser o arco antigo da v2 usa o ícone direto: `<CircleNotchIcon className="animate-spin" />`.

## v2.x — Radix

Ícone Phosphor `CircleNotch` (arco). Sem `data-slot`. O `Button` ajusta o padding
sozinho quando tem `svg` filho.

```tsx
import { Button } from "@blips/ui/components/button"
import { Spinner } from "@blips/ui/components/spinner"

export function SalvarCarregando() {
  return (
    <div className="flex items-center gap-4">
      <Button disabled>
        <Spinner />
        Salvando...
      </Button>
      <Button variant="outline" size="icon" disabled>
        <Spinner />
        <span className="sr-only">Carregando</span>
      </Button>
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  )
}
```

## Exemplos na docs

`spinner-demo`, `spinner-button`, `spinner-badge`, `spinner-input-group`, `spinner-empty`, `spinner-size` (em `apps/docs/examples/`, escritos para a v3).
