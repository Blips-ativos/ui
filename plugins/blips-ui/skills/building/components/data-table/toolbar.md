# Toolbar

Implementação de barra de ferramentas com filtros e ações.

> TanStack Table é igual nas duas versões da lib. Os exemplos usam a **v3.x — Base UI**
> (`render`, `indeterminate`, `data-popup-open`, ícones `*Icon`); em repo **v2.x — Radix**,
> aplique as trocas da seção [v2.x — Radix](#v2x--radix). Detecção de versão: Passo 0 do `SKILL.md` do building.

## Table of Contents

- [Estrutura Base](#estrutura-base)
- [Toolbar com Bulk Actions](#toolbar-com-bulk-actions)
- [Toolbar Server-Side (Padrão Admin App)](#toolbar-server-side-padrão-admin-app)
- [Componentes de Filtro Individuais](#componentes-de-filtro-individuais)
- [Actions Dropdown por Linha](#actions-dropdown-por-linha)
- [Exportação](#exportação)
- [Refresh Button](#refresh-button)
- [v3.x — Base UI](#v3x--base-ui)
- [v2.x — Radix](#v2x--radix)

## Estrutura Base

```tsx
// data-table-toolbar.tsx
"use client";

import { Table } from "@tanstack/react-table";
import { XIcon, MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react";

import { Button } from "@blips/ui/components/button";
import { Input } from "@blips/ui/components/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Busca */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] pl-8"
          />
        </div>

        {/* Filtros facetados */}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusOptions}
          />
        )}

        {/* Botão de limpar */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <Button size="sm" className="h-8">
          <PlusIcon className="mr-2 h-4 w-4" />
          Novo
        </Button>
      </div>
    </div>
  );
}
```

## Toolbar com Bulk Actions

```tsx
export function DataTableToolbar<TData>({
  table,
  onBulkDelete,
  onBulkExport,
}: DataTableToolbarProps<TData> & {
  onBulkDelete?: (ids: string[]) => void;
  onBulkExport?: (ids: string[]) => void;
}) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  if (hasSelection) {
    return (
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 rounded-md">
        <span className="text-sm text-muted-foreground">
          {selectedRows.length} item(s) selecionado(s)
        </span>
        <div className="flex items-center space-x-2">
          {onBulkExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const ids = selectedRows.map((row) => (row.original as any).id);
                onBulkExport(ids);
              }}
            >
              <DownloadSimpleIcon className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          )}
          {onBulkDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const ids = selectedRows.map((row) => (row.original as any).id);
                onBulkDelete(ids);
              }}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetRowSelection()}
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {/* Filtros normais */}
    </div>
  );
}
```

## Toolbar Server-Side (Padrão Admin App)

```tsx
// Toolbar controlada externamente para server-side filtering
interface ServerSideToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter?: string;
  onStatusFilterChange: (value: string | undefined) => void;
  onCreateClick: () => void;
}

export function ResourceToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onCreateClick,
}: ServerSideToolbarProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Busca com debounce no componente pai */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filtro de status */}
      <Select
        value={statusFilter ?? "all"}
        onValueChange={(v) => onStatusFilterChange(!v || v === "all" ? undefined : v)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="inactive">Inativo</SelectItem>
        </SelectContent>
      </Select>

      {/* Botão de criar */}
      <Button onClick={onCreateClick} className="ml-auto">
        <PlusIcon className="mr-2 h-4 w-4" />
        Novo
      </Button>
    </div>
  );
}
```

## Componentes de Filtro Individuais

### Filtro Toggle (Boolean/Presença)

Filtro tri-state compacto com `ButtonGroup` + `ButtonGroupText`. Ideal para filtros binários de presença/ausência.

```tsx
import { DataTableToggleFilter } from "@/components/data-table/data-table-toggle-filter";

// Na toolbar — estado controlado externamente
const [slaFilter, setSlaFilter] = useState<"with_sla" | "without_sla">();

<DataTableToggleFilter
  icon={TimerIcon}
  title="SLA"
  options={[
    { label: "Com SLA", value: "with_sla" },
    { label: "Sem SLA", value: "without_sla" },
  ]}
  value={slaFilter}
  onValueChange={setSlaFilter}
/>
```

Ciclo de clique: neutro → positivo (primary tint) → negativo (secondary) → neutro.

Veja detalhes completos em [filtering.md](filtering.md#filtro-toggle-booleanpresença).

### Filtro de Data Range

```tsx
import { CalendarIcon } from "@phosphor-icons/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { cn } from "@blips/ui/lib/utils";
import { Button } from "@blips/ui/components/button";
import { Calendar } from "@blips/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover";

interface DateRangeFilterProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
}

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          />
        }
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value?.from ? (
          value.to ? (
            <>
              {format(value.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
              {format(value.to, "dd/MM/yyyy", { locale: ptBR })}
            </>
          ) : (
            format(value.from, "dd/MM/yyyy", { locale: ptBR })
          )
        ) : (
          "Selecionar período"
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
```

### Filtro Boolean

```tsx
<Select
  value={hasUserFilter === undefined ? "all" : hasUserFilter ? "yes" : "no"}
  onValueChange={(v) => {
    setHasUserFilter(v === "all" ? undefined : v === "yes");
    setPage(1);
  }}
>
  <SelectTrigger className="w-[160px]">
    <SelectValue placeholder="Usuário vinculado" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">Todos</SelectItem>
    <SelectItem value="yes">Com usuário</SelectItem>
    <SelectItem value="no">Sem usuário</SelectItem>
  </SelectContent>
</Select>
```

## Actions Dropdown por Linha

```tsx
// {resource}-actions-dropdown.tsx
"use client";

import { useState } from "react";
import { DotsThreeIcon, EyeIcon, PencilIcon, TrashIcon, CopyIcon } from "@phosphor-icons/react";

import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@blips/ui/components/alert-dialog";

import { api } from "@/lib/api";
import { toast } from "sonner";

interface ActionsDropdownProps {
  resource: Resource;
  onAction: () => void;
}

export function ActionsDropdown({ resource, onAction }: ActionsDropdownProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const deleteMutation = api.resource.delete.useMutation({
    onSuccess: () => {
      toast.success("Excluído com sucesso");
      onAction();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
          <span className="sr-only">Abrir menu</span>
          <DotsThreeIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(resource.id)}
          >
            <CopyIcon className="mr-2 h-4 w-4" />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <EyeIcon className="mr-2 h-4 w-4" />
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este item? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate({ id: resource.id })}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
```

## Exportação

```tsx
// Botão de exportar na toolbar
<Button
  variant="outline"
  size="sm"
  onClick={() => {
    const data = table.getFilteredRowModel().rows.map((row) => row.original);
    exportToCSV(data, "export.csv");
  }}
>
  <DownloadSimpleIcon className="mr-2 h-4 w-4" />
  Exportar CSV
</Button>

// Função de exportação
function exportToCSV<T extends Record<string, any>>(data: T[], filename: string) {
  const headers = Object.keys(data[0] || {});
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
```

## Refresh Button

```tsx
<Button
  variant="outline"
  size="sm"
  onClick={() => refetch()}
  disabled={isLoading}
>
  <ArrowsClockwiseIcon className={cn("h-4 w-4", isLoading && "animate-spin")} />
</Button>
```

## v3.x — Base UI

- Triggers (`PopoverTrigger`, `DropdownMenuTrigger`) recebem o `Button` em `render`.
- `DropdownMenuLabel` dentro de `DropdownMenuGroup`.
- `Select` de status: o `SelectValue` mostra o `value` cru até abrir; passe `items` para o
  rótulo aparecer:

```tsx
const statusItems = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
]

<Select
  items={statusItems}
  value={statusFilter ?? "all"}
  onValueChange={(v) => onStatusFilterChange(!v || v === "all" ? undefined : v)}
>
  <SelectTrigger className="w-[140px]">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  <SelectContent>
    {statusItems.map((item) => (
      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

## v2.x — Radix

```tsx
// Filtro de data
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
      <CalendarIcon className="mr-2 h-4 w-4" />
      Selecionar período
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">{/* <Calendar mode="range" … /> */}</PopoverContent>
</Popover>

// Ações por linha
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <DotsThree className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Ações</DropdownMenuLabel>
    {/* ... */}
  </DropdownMenuContent>
</DropdownMenu>
```

- O `Select` de status mostra o texto do `SelectItem` sem precisar de `items`.
- Não importe o ícone e o componente com o mesmo nome `Calendar`: use `CalendarIcon` para o
  ícone (existe no Phosphor 2.1.10 da v2.x também) e `Calendar` para o componente.
