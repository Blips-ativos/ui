# Sheet (Painel Lateral)

Padrão para criar painéis laterais usando Sheet + SheetBody.

> **Versão da lib:** confira a versão da `@blips/ui` do repo (ver o "Passo 0" do
> `SKILL.md` do building e `references/v2-vs-v3.md`). `SheetBody`, `SheetSection` e
> `SheetSectionTitle` são extensões Blips presentes nas duas linhas. O conteúdo comum vale
> para as duas; largura, trigger, padding e dismiss mudam e estão em
> [v3.x — Base UI](#v3x--base-ui) e [v2.x — Radix](#v2x--radix).

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
- [v3.x — Base UI](#v3x--base-ui)
- [v2.x — Radix](#v2x--radix)
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
      <SheetContent>
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
      <SheetContent>
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
<SheetContent side="right">
```

- Side: `side="right"` (padrão), `"left"`, `"top"`, `"bottom"`
- `showCloseButton={false}` para ocultar o X
- Largura padrão `sm:max-w-sm` (~384px) nas laterais. **Como sobrescrever muda por versão**:
  na v3.x o painel tem `data-side` e a largura precisa do seletor
  `sm:data-[side=right]:max-w-lg`; na v2.x não há `data-side` e basta `sm:max-w-lg`. Ver
  [v3.x](#v3x--base-ui) e [v2.x](#v2x--radix).

### 3. SheetHeader

```tsx
<SheetHeader>
  <SheetTitle className="flex items-center gap-2">
    <FileTextIcon className="size-4" />
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
- Aplica padding próprio quando NÃO contém `SheetSection` (`p-6` na v3.x, `p-4` na v2.x)
- Remove padding automaticamente quando contém `SheetSection`
- Deve envolver todo o conteúdo scrollável

### 5. SheetSection

```tsx
<SheetSection>
  <SheetSectionTitle>Título da Seção</SheetSectionTitle>
  <div className="space-y-4">{/* Conteúdo */}</div>
</SheetSection>
```

- Padding automático (`p-6` na v3.x, `p-4` na v2.x)
- Borda no topo automática (separa a primeira seção do header e cada seção da anterior)
- Use para agrupar informações relacionadas

### 6. SheetSectionTitle

```tsx
<SheetSectionTitle>Informações Gerais</SheetSectionTitle>
```

- Estilo: `text-muted-foreground font-medium mb-4` (`text-xs` na v3.x, `text-sm` na v2.x)
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

- Fixo na parte inferior (`mt-auto`)
- Sem borda automática
- Layout flex column com gap

## Padrões de Conteúdo

### Item com Ícone e Label

```tsx
<div className="flex items-start gap-3">
  <BuildingsIcon className="size-4 text-muted-foreground mt-0.5" />
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
        <WarningCircleIcon className="size-4 text-destructive mt-0.5" />
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
  <SheetContent>
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
  <SheetContent>
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

A forma de transformar um `Button` em trigger muda por versão — ver
[v3.x](#v3x--base-ui) e [v2.x](#v2x--radix).

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
      aria-label="Ver detalhes"
      onClick={() => handleViewItem(row.original)}
    >
      <EyeIcon />
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
- Não misture APIs das duas versões (`asChild` na v3.x, `render` na v2.x)
- Não adicione padding extra no `SheetBody` com seções
- Não esqueça de tratar estado vazio/null
- Não coloque formulários sem `SheetFooter` para ações
- Não use scroll manual - `SheetBody` já gerencia
- Não envolva `SheetBody`/`SheetFooter` em `<form>` sem a classe flex adequada

## v3.x — Base UI

Primitiva `Dialog` de `@base-ui/react`. Painel `bg-popover`, texto `text-xs/relaxed`,
header/body/section/footer com `p-6`, título `font-heading text-sm font-medium`, X como
`Button variant="ghost" size="icon-sm"`. Animação por `data-starting-style`/`data-ending-style`.

| Peça | Props relevantes |
|---|---|
| `Sheet` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `modal`, `disablePointerDismissal` |
| `SheetTrigger` / `SheetClose` | `render` (no lugar de `asChild`), `nativeButton` |
| `SheetContent` (`Dialog.Popup`) | `side`, `showCloseButton`, `initialFocus`, `finalFocus`. Emite `data-side` e `data-open`/`data-closed` |

Largura: o default vem de `data-[side=right]:sm:max-w-sm`, então a sobrescrita precisa do
mesmo seletor:

```tsx
// ✅ v3.x
<SheetContent className="sm:data-[side=right]:max-w-lg">
<SheetContent side="left" className="sm:data-[side=left]:max-w-lg">
<SheetContent side="bottom" className="data-[side=bottom]:max-h-[80vh]">

// ❌ não sobrescreve o default na v3.x
<SheetContent className="sm:max-w-lg">
```

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet";
import { EyeIcon } from "@phosphor-icons/react";

export function DetalhesSheet() {
  return (
    <Sheet>
      {/* o trigger JÁ é o Button: não aninhe <Button> dentro dele */}
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <EyeIcon data-icon="inline-start" />
        Ver detalhes
      </SheetTrigger>
      <SheetContent className="sm:data-[side=right]:max-w-lg">
        <SheetHeader>
          <SheetTitle>Detalhes</SheetTitle>
        </SheetHeader>
        <SheetBody>{/* ... */}</SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Fechar</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

Dismiss: não há `onPointerDownOutside`/`onEscapeKeyDown`. Use `disablePointerDismissal` no
`Sheet` ou `onOpenChange={(open, d) => { if (!open && d.reason === "outside-press") d.cancel(); }}`.
Seletores próprios: `data-open:`/`data-closed:` (`data-[state=open]:` não casa).

## v2.x — Radix

Primitiva `@radix-ui/react-dialog`. Painel `bg-background`, `gap-4`, header/body/section/
footer com `p-4`, título `font-semibold`, descrição `text-sm`. **Sem `data-side`**: o lado
vira classes condicionais.

| Peça | Props relevantes |
|---|---|
| `Sheet` | `open`, `defaultOpen`, `onOpenChange(open)`, `modal` |
| `SheetTrigger` / `SheetClose` | `asChild` |
| `SheetContent` | `side`, `showCloseButton`, `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `onOpenAutoFocus`, `onCloseAutoFocus`, `forceMount`. Estado: `data-state` |

Largura: o default é `sm:max-w-sm` simples, e o `cn` resolve a sobrescrita direta:

```tsx
// ✅ v2.x
<SheetContent className="sm:max-w-lg">
<SheetContent side="bottom" className="max-h-[80vh]">

// ❌ na v2.x não existe data-side: o seletor nunca casa
<SheetContent className="sm:data-[side=right]:max-w-lg">
```

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet";
import { Eye } from "@phosphor-icons/react";

export function DetalhesSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye />
          Ver detalhes
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Detalhes</SheetTitle>
        </SheetHeader>
        <SheetBody>{/* ... */}</SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

Dismiss: `onPointerDownOutside={(e) => e.preventDefault()}` no `SheetContent`.
Seletores próprios: `data-[state=open]:`/`data-[state=closed]:`.

## Arquivos de Referência

- `references/sheet.md` — API completa por versão
- `references/v2-vs-v3.md` — diferenças transversais
- `packages/ui/src/components/sheet.tsx` — componente base
