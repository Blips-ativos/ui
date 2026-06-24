# Sheet (Painel Lateral)

Padrão para criar painéis laterais usando Sheet + SheetBody.

## Table of Contents

- [Quando Usar](#quando-usar)
- [Quando Usar Seções](#quando-usar-seções)
- [Componentes Disponíveis](#componentes-disponíveis)
- [Estrutura Base (Simples)](#estrutura-base-simples)
- [Estrutura com Seções](#estrutura-com-seções)
- [Anatomia do Componente](#anatomia-do-componente)
- [Padrões de Conteúdo](#padrões-de-conteúdo)
- [Variações](#variações)
- [Uso com Tabelas (Data Table)](#uso-com-tabelas-data-table)
- [Formulários com react-hook-form](#formulários-com-react-hook-form)
- [Diretrizes](#diretrizes)
- [Arquivos de Referência](#arquivos-de-referência)

## Quando Usar

- Exibir detalhes de um item selecionado
- Formulários de edição rápida
- Visualização de informações sem navegar para outra página
- Painéis de configuração ou filtros avançados

## Quando Usar Seções

Use `SheetSection` e `SheetSectionTitle` **apenas quando o conteúdo se beneficia de separação visual**:

- ✅ Múltiplas categorias de informação (ex: "Informações Gerais" + "Tópicos" + "Metadados")
- ✅ Formulários complexos com grupos de campos distintos
- ✅ Detalhes com seções condicionais (ex: mostrar "Erro" apenas quando há erro)

**Não use seções** para conteúdo simples:

- ❌ Formulários simples com poucos campos relacionados
- ❌ Conteúdo único sem divisão lógica
- ❌ Quando uma única seção seria suficiente

## Componentes Disponíveis

| Componente          | Descrição                             |
| ------------------- | ------------------------------------- |
| `Sheet`             | Root do componente, controla abertura |
| `SheetTrigger`      | Elemento que abre o Sheet             |
| `SheetContent`      | Container principal do painel         |
| `SheetHeader`       | Cabeçalho com título e descrição      |
| `SheetTitle`        | Título do painel                      |
| `SheetDescription`  | Descrição/subtítulo do painel         |
| `SheetBody`         | Container scrollable para o conteúdo  |
| `SheetSection`      | Seção com padding e borda no topo     |
| `SheetSectionTitle` | Título de cada seção                  |
| `SheetFooter`       | Rodapé para ações (botões)            |
| `SheetClose`        | Botão para fechar o painel            |

## Estrutura Base (Simples)

Para formulários e conteúdos simples, use apenas `SheetBody`:

```tsx
"use client";

import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@blips/ui/components/sheet";
import { Button } from "@blips/ui/components/button";

interface EditItemSheetProps {
  item: Item;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditItemSheet({
  item,
  open,
  onOpenChange,
}: EditItemSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:data-[side=right]:max-w-md">
        <SheetHeader>
          <SheetTitle>Editar Item</SheetTitle>
          <SheetDescription>Atualize os dados do item.</SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="space-y-4">{/* Campos do formulário */}</div>
        </SheetBody>

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Estrutura com Seções

Para conteúdos complexos com múltiplas categorias de informação:

```tsx
"use client";

import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetSection,
  SheetSectionTitle,
  SheetTitle,
} from "@blips/ui/components/sheet";

interface ItemDetailsSheetProps {
  item: Item | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemDetailsSheet({
  item,
  open,
  onOpenChange,
}: ItemDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:data-[side=right]:max-w-lg">
        <SheetHeader>
          <SheetTitle>Detalhes do Item</SheetTitle>
          <SheetDescription>{item?.name ?? "Carregando..."}</SheetDescription>
        </SheetHeader>

        {item && (
          <SheetBody>
            <SheetSection>
              <SheetSectionTitle>Informações Gerais</SheetSectionTitle>
              <div className="space-y-4">{/* Conteúdo da seção */}</div>
            </SheetSection>

            <SheetSection>
              <SheetSectionTitle>Configurações</SheetSectionTitle>
              <div className="space-y-4">{/* Conteúdo da seção */}</div>
            </SheetSection>
          </SheetBody>
        )}
      </SheetContent>
    </Sheet>
  );
}
```

## Anatomia do Componente

### 1. Sheet Root

```tsx
<Sheet open={open} onOpenChange={onOpenChange}>
```

- `open`: Controla se o painel está aberto
- `onOpenChange`: Callback para mudança de estado

### 2. SheetContent

```tsx
<SheetContent className="sm:data-[side=right]:max-w-lg">
```

**Largura máxima:**

O `SheetContent` usa `data-side` attribute, então para sobrescrever a largura máxima padrão (`sm:max-w-sm`), use o seletor específico:

```tsx
// ✅ Correto - usa data attribute selector
<SheetContent className="sm:data-[side=right]:max-w-lg">
<SheetContent className="sm:data-[side=right]:max-w-xl">
<SheetContent className="sm:data-[side=right]:max-w-2xl">

// ❌ Incorreto - não sobrescreve o padrão
<SheetContent className="sm:max-w-lg">
```

Tamanhos disponíveis:

- `sm:data-[side=right]:max-w-sm` (padrão, ~384px)
- `sm:data-[side=right]:max-w-md` (~448px)
- `sm:data-[side=right]:max-w-lg` (~512px)
- `sm:data-[side=right]:max-w-xl` (~576px)
- `sm:data-[side=right]:max-w-2xl` (~672px)

Para outros lados, ajuste o seletor:

- `sm:data-[side=left]:max-w-lg`
- `data-[side=bottom]:max-h-[80vh]`
- `data-[side=top]:max-h-[50vh]`

**Outras opções:**

- Side: `side="right"` (padrão), `"left"`, `"top"`, `"bottom"`
- `showCloseButton={false}` para ocultar o X

### 3. SheetHeader

```tsx
<SheetHeader>
  <SheetTitle className="flex items-center gap-2">
    <FileText className="size-5" />
    Detalhes do Item
  </SheetTitle>
  <SheetDescription>{item?.name ?? "Carregando..."}</SheetDescription>
</SheetHeader>
```

- Sempre inclua `SheetTitle` para acessibilidade
- `SheetDescription` é opcional mas recomendado

### 4. SheetBody

```tsx
{
  /* Simples - sem seções */
}
<SheetBody>
  <div className="space-y-4">{/* Conteúdo direto */}</div>
</SheetBody>;

{
  /* Com seções */
}
<SheetBody>
  <SheetSection>...</SheetSection>
  <SheetSection>...</SheetSection>
</SheetBody>;
```

- Container com `overflow-auto` para scroll
- Aplica padding `p-4` quando NÃO contém `SheetSection`
- Remove padding automaticamente quando contém `SheetSection`
- Deve envolver todo o conteúdo scrollável

### 5. SheetSection

```tsx
<SheetSection>
  <SheetSectionTitle>Título da Seção</SheetSectionTitle>
  <div className="space-y-4">{/* Conteúdo */}</div>
</SheetSection>
```

- Padding automático (`p-4`)
- Borda no topo automática (separa a primeira seção do header e cada seção da anterior)
- Use para agrupar informações relacionadas

### 6. SheetSectionTitle

```tsx
<SheetSectionTitle>Informações Gerais</SheetSectionTitle>
```

- Estilo: `text-muted-foreground text-sm font-medium mb-4`
- Use para identificar cada seção

### 7. SheetFooter (opcional)

```tsx
<SheetFooter>
  <Button variant="outline" onClick={() => onOpenChange(false)}>
    Cancelar
  </Button>
  <Button onClick={handleSave}>Salvar</Button>
</SheetFooter>
```

- Fixo na parte inferior
- Borda superior automática
- Layout flex column com gap

## Padrões de Conteúdo

### Item com Ícone e Label

```tsx
<div className="flex items-start gap-3">
  <Building2 className="size-4 text-muted-foreground mt-0.5" />
  <div>
    <p className="text-sm font-medium">Label</p>
    <p className="text-sm text-muted-foreground">Valor</p>
  </div>
</div>
```

### Lista de Cards

```tsx
<div className="space-y-3">
  {items.map((item, index) => (
    <div key={index} className="p-3 rounded-lg border bg-muted/30">
      <div className="flex items-start gap-2">
        <ItemIcon className="size-4 text-muted-foreground mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {item.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
```

### Status com Badge

```tsx
<div className="flex items-center justify-between">
  <span className="text-sm text-muted-foreground">Status</span>
  <Badge variant={status.variant} className="gap-1">
    <StatusIcon className="size-3" />
    {status.label}
  </Badge>
</div>
```

### Mensagem de Erro

```tsx
{
  hasError && (
    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
      <div className="flex items-start gap-2">
        <AlertCircle className="size-4 text-destructive mt-0.5" />
        <div>
          <p className="text-sm font-medium text-destructive">Título do erro</p>
          <p className="text-sm text-muted-foreground mt-1">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}
```

### Timestamps

```tsx
<div className="space-y-1 text-xs text-muted-foreground">
  {item.createdAt && (
    <p>
      Criado em:{" "}
      {format(new Date(item.createdAt), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      })}
    </p>
  )}
  {item.updatedAt && (
    <p>
      Atualizado em:{" "}
      {format(new Date(item.updatedAt), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      })}
    </p>
  )}
</div>
```

## Variações

### Sheet com Seções Condicionais

```tsx
<SheetBody>
  {/* Seção sempre visível */}
  <SheetSection>
    <SheetSectionTitle>Status</SheetSectionTitle>
    {/* ... */}
  </SheetSection>

  {/* Seção condicional */}
  {item.details && (
    <SheetSection>
      <SheetSectionTitle>Detalhes</SheetSectionTitle>
      {/* ... */}
    </SheetSection>
  )}

  {/* Seção com lista */}
  {item.items?.length > 0 && (
    <SheetSection>
      <SheetSectionTitle>Itens ({item.items.length})</SheetSectionTitle>
      {/* ... */}
    </SheetSection>
  )}
</SheetBody>
```

### Sheet com Formulário Simples

Para formulários com poucos campos relacionados, não use seções:

```tsx
<Sheet open={open} onOpenChange={onOpenChange}>
  <SheetContent className="sm:data-[side=right]:max-w-md">
    <SheetHeader>
      <SheetTitle>Editar Item</SheetTitle>
      <SheetDescription>Atualize os dados do item.</SheetDescription>
    </SheetHeader>

    <form
      onSubmit={handleSubmit}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <SheetBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register("description")} />
          </div>
          {/* Mais campos */}
        </div>
      </SheetBody>

      <SheetFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </SheetFooter>
    </form>
  </SheetContent>
</Sheet>
```

**IMPORTANTE**: O elemento `<form>` deve ter `className="flex flex-1 flex-col overflow-hidden"` para preservar o layout flex do `SheetContent`. Sem isso, o `SheetBody` não terá scroll correto e o `SheetFooter` não ficará fixo na parte inferior.

### Sheet com Formulário Complexo

Para formulários com grupos de campos distintos, use seções:

```tsx
<Sheet open={open} onOpenChange={onOpenChange}>
  <SheetContent className="sm:data-[side=right]:max-w-lg">
    <SheetHeader>
      <SheetTitle>Configurar Plano</SheetTitle>
    </SheetHeader>

    <form
      onSubmit={handleSubmit}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <SheetBody>
        <SheetSection>
          <SheetSectionTitle>Informações Básicas</SheetSectionTitle>
          <div className="space-y-4">{/* Campos de informações */}</div>
        </SheetSection>

        <SheetSection>
          <SheetSectionTitle>Configurações</SheetSectionTitle>
          <div className="space-y-4">{/* Campos de configuração */}</div>
        </SheetSection>

        <SheetSection>
          <SheetSectionTitle>Observações</SheetSectionTitle>
          <Textarea {...register("notes")} />
        </SheetSection>
      </SheetBody>

      <SheetFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </SheetFooter>
    </form>
  </SheetContent>
</Sheet>
```

### Sheet com Trigger

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="sm">
      <Eye className="size-4 mr-2" />
      Ver detalhes
    </Button>
  </SheetTrigger>
  <SheetContent>{/* ... */}</SheetContent>
</Sheet>
```

## Uso com Tabelas (Data Table)

Padrão comum: Sheet para exibir detalhes de uma linha da tabela.

```tsx
// No componente da tabela
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
const [sheetOpen, setSheetOpen] = useState(false);

const handleViewItem = (item: Item) => {
  setSelectedItem(item);
  setSheetOpen(true);
};

// Coluna de ações
{
  id: "actions",
  cell: ({ row }) => (
    <Button
      variant="outline"
      size="icon"
      onClick={() => handleViewItem(row.original)}
    >
      <Eye className="size-4" />
    </Button>
  ),
}

// No JSX
<ItemDetailsSheet
  item={selectedItem}
  open={sheetOpen}
  onOpenChange={setSheetOpen}
/>
```

## Formulários com react-hook-form

Quando usar `Form` do react-hook-form com Sheet, o elemento `<form>` deve envolver `SheetBody` e `SheetFooter` para que o submit funcione corretamente. **Porém**, isso quebra o layout flex do `SheetContent`.

### Solução

Adicione `className="flex flex-1 flex-col overflow-hidden"` ao elemento `<form>`:

```tsx
<Form {...form}>
  <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className="flex flex-1 flex-col overflow-hidden"
  >
    <SheetBody>{/* Campos do formulário */}</SheetBody>
    <SheetFooter>{/* Botões */}</SheetFooter>
  </form>
</Form>
```

### Por que isso é necessário?

O `SheetContent` usa `display: flex` com `flex-direction: column`. Quando você adiciona um elemento `<form>` como filho intermediário:

- ❌ **Sem a classe**: O form usa `display: block` por padrão, quebrando o layout flex. O `SheetBody` não fará scroll e o `SheetFooter` não ficará fixo na parte inferior.
- ✅ **Com a classe**: O form participa corretamente do layout flex, preservando o scroll do `SheetBody` e a posição fixa do `SheetFooter`.

## Diretrizes

### FAÇA

- Use `SheetBody` para todo conteúdo scrollável
- Use `SheetSection` **apenas** quando houver múltiplas categorias de informação
- Use formulários simples sem seções (apenas `SheetBody` + `div.space-y-4`)
- Inclua `SheetTitle` e `SheetDescription` para acessibilidade
- Use seções condicionais para conteúdo opcional
- Mantenha consistência visual entre seções
- Use ícones para contextualizar informações
- Adicione `className="flex flex-1 flex-col overflow-hidden"` em elementos `<form>` que envolvem `SheetBody`/`SheetFooter`

### NÃO FAÇA

- Não use `SheetSection` para conteúdo único ou simples
- Não crie uma única seção dentro do `SheetBody` - use o body diretamente
- Não use `Separator` manual - `SheetSection` já tem borda
- Não adicione padding extra no `SheetBody` com seções
- Não esqueça de tratar estado vazio/null
- Não coloque formulários sem `SheetFooter` para ações
- Não use scroll manual - `SheetBody` já gerencia
- Não envolva `SheetBody`/`SheetFooter` em `<form>` sem a classe flex adequada

## Arquivos de Referência

- `packages/ui/src/components/sheet.tsx` - Componentes base
- `apps/admin/app/(admin)/users/[id]/_components/tabs/uploads-tab.tsx` - Exemplo com detalhes de upload
- `apps/admin/app/(admin)/disciplines/_components/discipline-details-sheet.tsx` - Exemplo com detalhes de disciplina
