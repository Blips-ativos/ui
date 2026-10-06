# Table

Import: `@blips/ui/components/table`

Tabela HTML estilizada. Para listas com ordenação, filtro, paginação e seleção,
monte um Data Table com TanStack Table sobre estes componentes (guias em
`components/data-table/`, listados no `SKILL.md`).

Exports (iguais nas duas versões): `Table`, `TableHeader`, `TableBody`,
`TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.

| Componente | Elemento | Estilo base |
|---|---|---|
| `Table` | `<table>` dentro de um `div` com `overflow-x-auto` | `w-full caption-bottom` |
| `TableHeader` | `<thead>` | `[&_tr]:border-b` |
| `TableBody` | `<tbody>` | última linha sem borda |
| `TableFooter` | `<tfoot>` | `border-t bg-muted/50 font-medium` |
| `TableRow` | `<tr>` | `border-b hover:bg-muted/50`; `data-state="selected"` pinta `bg-muted` |
| `TableHead` | `<th>` | `h-10 px-2 font-medium whitespace-nowrap`; coluna de checkbox sem padding direito |
| `TableCell` | `<td>` | `p-2 whitespace-nowrap` |
| `TableCaption` | `<caption>` | `mt-4 text-muted-foreground` |

Todos aceitam os atributos HTML do elemento (`colSpan`, etc.) e `className`.

## Notas comuns

- Números e valores: alinhe à direita (`className="text-right"`) e use `tabular-nums`.
- Valores em reais: formate com `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` (ou o helper do projeto), nunca concatenando `"R$ "`.
- Estado vazio: uma linha com `TableCell colSpan={colunas}` e mensagem (ou `Empty`, veja `empty.md`); carregando: linhas de `Skeleton`.
- Linha selecionada: `data-state={row.getIsSelected() && "selected"}` (vale nas duas versões: é atributo próprio da tabela, não da primitiva).

API igual na v2.x e na v3.x.

São componentes HTML puros, sem primitiva.

Diferenças visuais: v3 usa `text-xs` na tabela e na legenda (v2: `text-sm`); a v3
tirou o `translate-y-[2px]` do checkbox nas células e ganhou
`has-aria-expanded:bg-muted/50` na linha (linha com conteúdo expandido fica
destacada).

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const faturas = [
  { id: "FAT001", status: "Paga", metodo: "Pix", valor: 250 },
  { id: "FAT002", status: "Pendente", metodo: "Boleto", valor: 150 },
  { id: "FAT003", status: "Vencida", metodo: "Cartão", valor: 350 },
];

export function TabelaDeFaturas() {
  return (
    <Table>
      <TableCaption>Faturas recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Fatura</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Método</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {faturas.map((f) => (
          <TableRow key={f.id}>
            <TableCell className="font-medium">{f.id}</TableCell>
            <TableCell>{f.status}</TableCell>
            <TableCell>{f.metodo}</TableCell>
            <TableCell className="text-right tabular-nums">{brl.format(f.valor)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">{brl.format(750)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

### Peças de Data Table que mudam entre versões

A tabela em si é igual; o que muda são os componentes que vão dentro das
colunas (checkbox de seleção, menu de ações). Estrutura completa, ordenação,
filtro e paginação: `components/data-table/*.md`.

> Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Checkbox com estado misto usa a prop `indeterminate` (o `checked` é só boolean);
o trigger do menu usa `render`.

```tsx
import type { ColumnDef } from "@tanstack/react-table";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { Button } from "@blips/ui/components/button";
import { Checkbox } from "@blips/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";

export const colunas: ColumnDef<Pagamento>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(v)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(v)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // … colunas de dados
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <DotsThreeIcon />
          <span className="sr-only">Abrir menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              Copiar ID
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
```

## v2.x — Radix

Checkbox com estado misto usa `checked="indeterminate"`; o trigger do menu usa
`asChild`; `DropdownMenuLabel` pode ficar solto.

```tsx
import type { ColumnDef } from "@tanstack/react-table"
import { DotsThree } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"

export const colunas: ColumnDef<Pagamento>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // … colunas de dados
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <DotsThree />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.id)}
          >
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
```

## Exemplos na docs

`table-demo`, `table-actions`, `table-badges` (em `apps/docs/examples/`, escritos para a v3).
