# Dialog (Modal)

Padrão para criar modais com `Dialog`.

> **Versão da lib:** confira a versão da `@blips/ui` do repo (ver o "Passo 0" do
> `SKILL.md` do building e `references/v2-vs-v3.md`). O conteúdo comum vale para as duas
> linhas; o que muda está em [v3.x — Base UI](#v3x--base-ui) e [v2.x — Radix](#v2x--radix).

## Table of Contents

- [Quando Usar](#quando-usar)
- [Componentes Disponíveis](#componentes-disponíveis)
- [Estrutura Base](#estrutura-base)
- [Conteúdo Longo e Agrupado](#conteúdo-longo-e-agrupado)
- [Anatomia do Componente](#anatomia-do-componente)
- [Variações](#variações)
- [Diferenças entre Dialog e Sheet](#diferenças-entre-dialog-e-sheet)
- [Diretrizes](#diretrizes)
- [v3.x — Base UI](#v3x--base-ui)
- [v2.x — Radix](#v2x--radix)
- [Arquivos de Referência](#arquivos-de-referência)

## Quando Usar

- Confirmações de ações (excluir, desativar) — nesse caso prefira `AlertDialog`
- Formulários de criação/edição rápida
- Exibir informações que requerem atenção do usuário
- Seleções e configurações pontuais

## Componentes Disponíveis

| Componente          | Descrição                                        |
| ------------------- | ------------------------------------------------ |
| `Dialog`            | Root do componente, controla abertura            |
| `DialogTrigger`     | Elemento que abre o Dialog                       |
| `DialogContent`     | Container principal do modal (inclui o X)        |
| `DialogHeader`      | Cabeçalho com título e descrição                 |
| `DialogTitle`       | Título do modal                                  |
| `DialogDescription` | Descrição/subtítulo do modal                     |
| `DialogFooter`      | Rodapé para ações (botões); `showCloseButton`    |
| `DialogClose`       | Fecha o modal                                    |
| `DialogPortal`, `DialogOverlay` | Peças internas, raramente usadas direto |

> Não existem `DialogBody`, `DialogSection` nem `DialogSectionTitle` em nenhuma das duas
> versões (essas extensões Blips existem só no `Sheet`). Para conteúdo longo, veja
> [Conteúdo Longo e Agrupado](#conteúdo-longo-e-agrupado).

## Estrutura Base

API igual na v2.x e na v3.x para este padrão controlado (`open` + `onOpenChange` recebendo
`setState` ou uma função `(open) => void`).

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@blips/ui/components/dialog";

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateItemDialog({ open, onOpenChange }: CreateItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar item</DialogTitle>
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

## Conteúdo Longo e Agrupado

Agrupe com títulos discretos e role só a área do meio. O `DialogContent` é `grid`, então
basta uma `div` com altura máxima e `overflow-y-auto`:

```tsx
<DialogContent className="sm:max-w-lg">
  <DialogHeader>
    <DialogTitle>Configurações</DialogTitle>
    <DialogDescription>Ajuste as configurações do sistema.</DialogDescription>
  </DialogHeader>

  <div className="-mx-4 max-h-[60vh] divide-y overflow-y-auto">
    <section className="space-y-4 px-4 py-4">
      <h3 className="text-xs font-medium text-muted-foreground">Informações gerais</h3>
      {/* Campos */}
    </section>
    {hasAdvancedOptions && (
      <section className="space-y-4 px-4 py-4">
        <h3 className="text-xs font-medium text-muted-foreground">Opções avançadas</h3>
        {/* Campos */}
      </section>
    )}
  </div>

  <DialogFooter>{/* Ações */}</DialogFooter>
</DialogContent>
```

O `-mx-*`/`px-*` acompanha o padding do `DialogContent`, que muda entre as versões
(`p-4` na v3.x, `p-6` na v2.x: troque `-mx-4 px-4` por `-mx-6 px-6` na v2.x).
Se o conteúdo não cabe num modal, use `Sheet`.

## Anatomia do Componente

### 1. Dialog Root

```tsx
<Dialog open={open} onOpenChange={onOpenChange}>
```

- `open`: controla se o modal está aberto
- `onOpenChange`: callback de mudança de estado (assinatura muda por versão, ver seções abaixo)

### 2. DialogContent

```tsx
<DialogContent className="sm:max-w-lg">
```

Largura máxima por `className` (o default muda por versão):

```tsx
<DialogContent className="sm:max-w-sm">  // ~384px (default na v3.x)
<DialogContent className="sm:max-w-md">  // ~448px
<DialogContent className="sm:max-w-lg">  // ~512px (default na v2.x)
<DialogContent className="sm:max-w-xl">  // ~576px
<DialogContent className="sm:max-w-2xl"> // ~672px
```

- `showCloseButton={false}` oculta o X (nas duas versões)

### 3. DialogHeader

```tsx
<DialogHeader>
  <DialogTitle>Título do modal</DialogTitle>
  <DialogDescription>Descrição ou contexto adicional.</DialogDescription>
</DialogHeader>
```

- Sempre inclua `DialogTitle` para acessibilidade
- `DialogDescription` é opcional mas recomendado

### 4. DialogFooter

```tsx
<DialogFooter>
  <Button variant="outline" onClick={() => onOpenChange(false)}>
    Cancelar
  </Button>
  <Button onClick={handleSave}>Salvar</Button>
</DialogFooter>
```

- Empilhado em mobile (ordem reversa), alinhado à direita em desktop
- `showCloseButton` adiciona um botão "Close" (texto em inglês, fixo na lib): prefira
  um `DialogClose` próprio com texto em pt-BR

## Variações

### Dialog de Confirmação

Para confirmações use `AlertDialog` (ver `references/alert-dialog.md`). Atenção: na v3.x o
`AlertDialogAction` **não fecha** o diálogo sozinho; na v2.x fecha.

### Dialog com Formulário Simples

O form pode ficar dentro do content sem classes especiais (o `DialogContent` é `grid`, não
`flex` como o `Sheet`):

```tsx
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar item</DialogTitle>
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
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

### Dialog com Trigger

A forma de transformar um `Button` em trigger muda por versão — ver
[v3.x](#v3x--base-ui) e [v2.x](#v2x--radix).

## Diferenças entre Dialog e Sheet

| Aspecto    | Dialog                       | Sheet                          |
| ---------- | ---------------------------- | ------------------------------ |
| Posição    | Centro da tela               | Lateral (direita/esquerda)     |
| Uso        | Ações pontuais, confirmações | Detalhes, formulários extensos |
| Fechamento | Clique fora, ESC ou X        | Clique fora, ESC ou X          |
| Scroll     | `div` com `overflow-y-auto`  | `SheetBody` com scroll         |
| Tamanho    | Fixo (max-width)             | Altura total da tela           |

## Diretrizes

### FAÇA

- Use `AlertDialog` para confirmações destrutivas
- Inclua `DialogTitle` para acessibilidade
- Use `DialogDescription` para contexto adicional
- Mantenha formulários simples sem agrupamentos
- Ajuste largura por `className` em vez de brigar com o tema

### NÃO FAÇA

- Não importe `DialogBody`/`DialogSection` (não existem)
- Não esqueça de tratar estados de loading
- Não coloque conteúdo muito extenso (use Sheet)
- Não aninhe múltiplos modais
- Não misture APIs das duas versões (`asChild` na v3.x, `render` na v2.x)

## v3.x — Base UI

Primitiva `@base-ui/react/dialog`. Densidade base-mira: `p-4`, `rounded-xl`,
`ring-1 ring-foreground/10`, default `sm:max-w-sm`, título `font-heading text-sm font-medium`,
X como `Button variant="ghost" size="icon-sm"` em `top-2 right-2`.

| Peça | Props relevantes |
|---|---|
| `Dialog` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `modal`, `disablePointerDismissal` |
| `DialogTrigger` / `DialogClose` | `render` (no lugar de `asChild`), `nativeButton`. Trigger aberto: `data-popup-open` |
| `DialogContent` (`Dialog.Popup`) | `showCloseButton`, `initialFocus`, `finalFocus`. Estado: `data-open`/`data-closed` |
| `DialogPortal` | `container`, `keepMounted` |

Não existem `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`,
`onOpenAutoFocus`, `onCloseAutoFocus` nem `forceMount`.

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import { PlusIcon } from "@phosphor-icons/react";

export function NovoItemDialog() {
  return (
    <Dialog
      onOpenChange={(open, eventDetails) => {
        // impedir fechar por clique fora, mantendo ESC
        if (!open && eventDetails.reason === "outside-press") eventDetails.cancel();
      }}
    >
      {/* o trigger JÁ é o Button: não aninhe <Button> dentro dele */}
      <DialogTrigger render={<Button />}>
        <PlusIcon data-icon="inline-start" />
        Novo item
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo item</DialogTitle>
        </DialogHeader>
        {/* ... */}
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

Para o comportamento "nunca fechar por clique fora", passe `disablePointerDismissal` no
`Dialog`. Seletores próprios: `data-open:`/`data-closed:` (`data-[state=open]:` não casa).

## v2.x — Radix

Primitiva `@radix-ui/react-dialog`. Densidade new-york: `p-6`, `rounded-lg border shadow-lg`,
default `sm:max-w-lg`, título `text-lg font-semibold`, X em `top-4 right-4`.

| Peça | Props relevantes |
|---|---|
| `Dialog` | `open`, `defaultOpen`, `onOpenChange(open)`, `modal` |
| `DialogTrigger` / `DialogClose` | `asChild` |
| `DialogContent` | `showCloseButton`, `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `onOpenAutoFocus`, `onCloseAutoFocus`, `forceMount`. Estado: `data-state="open" \| "closed"` |

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import { Plus } from "@phosphor-icons/react";

export function NovoItemDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Novo item
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Novo item</DialogTitle>
        </DialogHeader>
        {/* ... */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

Seletores próprios: `data-[state=open]:`/`data-[state=closed]:`.

## Arquivos de Referência

- `references/dialog.md` e `references/alert-dialog.md` — API completa por versão
- `references/v2-vs-v3.md` — diferenças transversais
- `packages/ui/src/components/dialog.tsx` — componente base
