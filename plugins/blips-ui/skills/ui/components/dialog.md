# Dialog (Modal)

Padrão para criar modais usando Dialog + DialogBody.

## Table of Contents

- [Quando Usar](#quando-usar)
- [Quando Usar Seções](#quando-usar-seções)
- [Componentes Disponíveis](#componentes-disponíveis)
- [Estrutura Base (Simples)](#estrutura-base-simples)
- [Estrutura com Seções](#estrutura-com-seções)
- [Anatomia do Componente](#anatomia-do-componente)
- [Variações](#variações)
- [Diferenças entre Dialog e Sheet](#diferenças-entre-dialog-e-sheet)
- [Diretrizes](#diretrizes)
- [Arquivos de Referência](#arquivos-de-referência)

## Quando Usar

- Confirmações de ações (excluir, desativar)
- Formulários de criação/edição rápida
- Exibir informações que requerem atenção do usuário
- Seleções e configurações pontuais

## Quando Usar Seções

Use `DialogSection` e `DialogSectionTitle` **apenas quando o conteúdo se beneficia de separação visual**:

- ✅ Múltiplas categorias de informação
- ✅ Formulários complexos com grupos de campos distintos
- ✅ Conteúdo com seções condicionais

**Não use seções** para conteúdo simples:

- ❌ Formulários simples com poucos campos relacionados
- ❌ Confirmações de ação
- ❌ Quando uma única seção seria suficiente

## Componentes Disponíveis

| Componente           | Descrição                             |
| -------------------- | ------------------------------------- |
| `Dialog`             | Root do componente, controla abertura |
| `DialogTrigger`      | Elemento que abre o Dialog            |
| `DialogContent`      | Container principal do modal          |
| `DialogHeader`       | Cabeçalho com título e descrição      |
| `DialogTitle`        | Título do modal                       |
| `DialogDescription`  | Descrição/subtítulo do modal          |
| `DialogBody`         | Container para conteúdo scrollable    |
| `DialogSection`      | Seção com padding e borda inferior    |
| `DialogSectionTitle` | Título de cada seção                  |
| `DialogFooter`       | Rodapé para ações (botões)            |
| `DialogClose`        | Botão para fechar o modal             |

## Estrutura Base (Simples)

Para formulários e conteúdos simples, não use `DialogBody` nem seções:

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@blips/ui/components/dialog";
import { Button } from "@blips/ui/components/button";

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateItemDialog({
  open,
  onOpenChange,
}: CreateItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Item</DialogTitle>
          <DialogDescription>Preencha os dados do item.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">{/* Campos do formulário */}</div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Estrutura com Seções

Para conteúdos complexos com múltiplas categorias de informação:

```tsx
"use client";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogSectionTitle,
  DialogTitle,
} from "@blips/ui/components/dialog";
import { Button } from "@blips/ui/components/button";

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfigDialog({ open, onOpenChange }: ConfigDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Ajuste as configurações do sistema.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <DialogSection>
            <DialogSectionTitle>Informações Gerais</DialogSectionTitle>
            <div className="space-y-4">{/* Campos da seção */}</div>
          </DialogSection>

          <DialogSection>
            <DialogSectionTitle>Preferências</DialogSectionTitle>
            <div className="space-y-4">{/* Campos da seção */}</div>
          </DialogSection>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Anatomia do Componente

### 1. Dialog Root

```tsx
<Dialog open={open} onOpenChange={onOpenChange}>
```

- `open`: Controla se o modal está aberto
- `onOpenChange`: Callback para mudança de estado

### 2. DialogContent

```tsx
<DialogContent className="sm:max-w-lg">
```

**Largura máxima (padrão: `sm:max-w-lg`):**

```tsx
<DialogContent className="sm:max-w-sm">  // ~384px
<DialogContent className="sm:max-w-md">  // ~448px
<DialogContent className="sm:max-w-lg">  // ~512px (padrão)
<DialogContent className="sm:max-w-xl">  // ~576px
<DialogContent className="sm:max-w-2xl"> // ~672px
```

**Outras opções:**

- `showCloseButton={false}` para ocultar o X

### 3. DialogHeader

```tsx
<DialogHeader>
  <DialogTitle>Título do Modal</DialogTitle>
  <DialogDescription>Descrição ou contexto adicional.</DialogDescription>
</DialogHeader>
```

- Sempre inclua `DialogTitle` para acessibilidade
- `DialogDescription` é opcional mas recomendado

### 4. DialogBody

```tsx
{
  /* Simples - sem seções */
}
<DialogBody>
  <div className="space-y-4">{/* Conteúdo direto */}</div>
</DialogBody>;

{
  /* Com seções */
}
<DialogBody>
  <DialogSection>...</DialogSection>
  <DialogSection>...</DialogSection>
</DialogBody>;
```

- Container com `overflow-auto` para scroll
- Aplica margens negativas quando contém `DialogSection` para compensar padding do content
- Use para conteúdos que podem exceder a altura do viewport

### 5. DialogSection

```tsx
<DialogSection>
  <DialogSectionTitle>Título da Seção</DialogSectionTitle>
  <div className="space-y-4">{/* Conteúdo */}</div>
</DialogSection>
```

- Padding horizontal e vertical automático
- Borda inferior automática (exceto última seção)

### 6. DialogSectionTitle

```tsx
<DialogSectionTitle>Informações Gerais</DialogSectionTitle>
```

- Estilo: `text-muted-foreground text-sm font-medium mb-4`

### 7. DialogFooter

```tsx
<DialogFooter>
  <Button variant="outline" onClick={() => onOpenChange(false)}>
    Cancelar
  </Button>
  <Button onClick={handleSave}>Salvar</Button>
</DialogFooter>
```

- Layout flex com gap
- Botões alinhados à direita em desktop
- Empilhados em mobile (ordem reversa)

## Variações

### Dialog de Confirmação

Para confirmações simples, use `AlertDialog` ao invés de `Dialog`:

```tsx
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

<AlertDialog open={open} onOpenChange={onOpenChange}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
      <AlertDialogDescription>
        Tem certeza que deseja excluir este item?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

### Dialog com Formulário Simples

Para formulários simples, o form pode ficar dentro do content sem necessidade de classes especiais (Dialog não usa flex como Sheet):

```tsx
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar Item</DialogTitle>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register("name")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" {...register("description")} />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

**Nota**: Diferente do `Sheet`, o `DialogContent` usa `display: grid`, então não há necessidade de classes flex especiais no form.

### Dialog com Seções Condicionais

```tsx
<DialogBody>
  <DialogSection>
    <DialogSectionTitle>Informações Básicas</DialogSectionTitle>
    {/* ... */}
  </DialogSection>

  {hasAdvancedOptions && (
    <DialogSection>
      <DialogSectionTitle>Opções Avançadas</DialogSectionTitle>
      {/* ... */}
    </DialogSection>
  )}
</DialogBody>
```

### Dialog com Trigger

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Novo Item
    </Button>
  </DialogTrigger>
  <DialogContent>{/* ... */}</DialogContent>
</Dialog>
```

## Diferenças entre Dialog e Sheet

| Aspecto    | Dialog                       | Sheet                          |
| ---------- | ---------------------------- | ------------------------------ |
| Posição    | Centro da tela               | Lateral (direita/esquerda)     |
| Uso        | Ações pontuais, confirmações | Detalhes, formulários extensos |
| Fechamento | Click fora ou ESC            | Click fora, ESC ou botão X     |
| Scroll     | Interno ao content           | SheetBody com scroll           |
| Tamanho    | Fixo (max-width)             | Altura total da tela           |

## Diretrizes

### FAÇA

- Use `AlertDialog` para confirmações destrutivas
- Use `DialogBody` com `DialogSection` para conteúdo extenso
- Inclua `DialogTitle` para acessibilidade
- Use `DialogDescription` para contexto adicional
- Mantenha formulários simples sem seções

### NÃO FAÇA

- Não use `DialogSection` para conteúdo simples
- Não crie uma única seção - use o content diretamente
- Não esqueça de tratar estados de loading
- Não coloque conteúdo muito extenso (use Sheet)
- Não aninhe múltiplos modais

## Arquivos de Referência

- `packages/ui/src/components/dialog.tsx` - Componentes base
- `packages/ui/src/components/alert-dialog.tsx` - Variante para confirmações
- `apps/admin/app/(admin)/users/[id]/_components/study-plan/` - Exemplos de uso
