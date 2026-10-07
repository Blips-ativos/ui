# Empty

Import: `@blips/ui/components/empty`

Estado vazio: o que mostrar quando não há dados (lista vazia, busca sem resultado,
primeiro uso, erro recuperável). Só HTML + CVA, sem primitiva.

Exports: `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`,
`EmptyContent`.

API igual na v2.x e na v3.x.

| Componente | Descrição |
|---|---|
| `Empty` | Raiz: `flex flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance`. |
| `EmptyHeader` | `max-w-sm`, centralizado, `gap-1`. |
| `EmptyMedia` | Slot de ícone/avatar. `variant?: "default" \| "icon"` (`data-variant`). `default`: sem fundo; `icon`: quadrado `size-8 rounded-md bg-muted` com svg `size-4`. `data-slot="empty-media"`. |
| `EmptyTitle` | `text-sm font-medium tracking-tight` (na v3 também `font-heading`). |
| `EmptyDescription` | `<p>` `text-xs/relaxed text-muted-foreground`, links sublinhados. |
| `EmptyContent` | Área de ações abaixo do header, `max-w-sm`, `gap-2`. |

Customizações comuns:

- Borda tracejada visível: `className="border border-dashed"`.
- Fundo em gradiente: `className="h-full bg-gradient-to-b from-muted/50 from-30% to-background"`.
- Ocupar a área: `className="h-full"`.

Regras do projeto:

- Toda lista/tabela/busca trata o estado vazio (e o de erro) — nunca uma área em branco.
- Texto em pt-BR, dizendo o que aconteceu e o que fazer; ação principal no `EmptyContent`.
- Busca sem resultado: ofereça limpar os filtros.

Exemplo (ícones no padrão v3; numa v2 use os nomes sem sufixo, ex.: `FolderPlus`, e
`<Button asChild>` no lugar de `render` no link):

```tsx
import { Button } from "@blips/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@blips/ui/components/empty";
import { FolderPlusIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

export function SemContratos() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlusIcon />
        </EmptyMedia>
        <EmptyTitle>Nenhum contrato ainda</EmptyTitle>
        <EmptyDescription>
          Os contratos deste cliente aparecem aqui. Crie o primeiro para começar.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Novo contrato</Button>
          <Button variant="outline">Importar</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}

export function BuscaSemResultado({ onLimpar }: { onLimpar: () => void }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MagnifyingGlassIcon />
        </EmptyMedia>
        <EmptyTitle>Nenhum resultado</EmptyTitle>
        <EmptyDescription>Nenhum cliente corresponde aos filtros aplicados.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={onLimpar}>
          Limpar filtros
        </Button>
      </EmptyContent>
    </Empty>
  );
}
```

`EmptyMedia` com avatar (`variant="default"`): coloque um `Avatar` (ou `AvatarGroup`) dentro dele.

## Exemplos na docs

`empty-demo`, `empty-outline`, `empty-search`, `empty-error` (v3).
