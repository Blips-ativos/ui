# Chain of Thought

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Linha do tempo recolhível dos passos que o agente executou: cada passo com
ícone, rótulo, descrição opcional e status (`complete`, `active`, `pending`),
com espaço para resultados de busca (badges) e imagens. Adaptado do
`chain-of-thought` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para mostrar o plano/progresso de um agente em passos discretos
  ("Buscando o contrato", "Consultando os títulos", "Redigindo"), vindos de
  eventos de ferramenta ou de etapas do seu backend.
- **Não use** para o texto livre de raciocínio do modelo: isso é
  `reasoning.md`.
- **Não use** para mostrar entrada e saída de uma chamada de ferramenta: isso
  é `tool.md`. Um passo pode resumir a tool; o detalhe fica no `Tool`.
- **Não use** como stepper de formulário/onboarding: não é interativo por passo.

## Import

```tsx
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "@blips/ai/components/chain-of-thought";
```

## Peers exigidos

Nenhum além de `@blips/ai` + `@blips/ui` ^3. Ícones de passo vêm de
`@phosphor-icons/react` (já é dependência da lib).

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

| Componente | Props reais | Notas |
|---|---|---|
| `ChainOfThought` | `open?`, `defaultOpen?` (padrão `false`), `onOpenChange?: (open: boolean) => void`, mais props de `<div>` | Provedor de estado; renderiza `div.not-prose w-full space-y-4`. |
| `ChainOfThoughtHeader` | props do `CollapsibleTrigger` | `children` é o título (padrão "Chain of Thought", em inglês). Sempre desenha `BrainIcon` + título + `CaretDownIcon`. |
| `ChainOfThoughtContent` | props do `CollapsibleContent` | Abre/fecha conforme o estado do `ChainOfThought`. |
| `ChainOfThoughtStep` | `label: ReactNode` (obrigatório), `description?: ReactNode`, `icon?: Icon` do Phosphor (padrão `DotIcon`), `status?: "complete" \| "active" \| "pending"` (padrão `"complete"`), mais props de `<div>` | `active` = `text-foreground`; `complete` = `text-muted-foreground`; `pending` = `text-muted-foreground/50`. `children` aparece abaixo do rótulo. |
| `ChainOfThoughtSearchResults` | props de `<div>` | Linha `flex-wrap` para os badges. |
| `ChainOfThoughtSearchResult` | props do `Badge` da @blips/ui | Fixo em `variant="secondary"`. |
| `ChainOfThoughtImage` | `caption?: string`, mais props de `<div>` | Moldura `bg-muted rounded-lg` com altura máxima de 22rem; a imagem é o `children`. |

## Composição com a @blips/ui

- Vai no `MessageContent` do `Message` (de `@blips/ui/components/message`,
  também reexportado por `@blips/ai/components/message`), acima do
  `MessageResponse`, sem `Bubble`.
- Ícones: passe o **componente** Phosphor (`icon={MagnifyingGlassIcon}`), não
  o elemento (`icon={<MagnifyingGlassIcon />}`).
- `ChainOfThoughtSearchResult` é um `Badge`: para link, use o `render` do
  Base UI (`render={<a href={url} />}`), não `asChild`.
- O status de cada passo é derivado no app (ex.: tool `input-available` →
  `active`; `output-available` → `complete`; ainda não chamada → `pending`).

## Exemplo v3 que compila

```tsx
"use client";

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "@blips/ai/components/chain-of-thought";
import {
  DatabaseIcon,
  MagnifyingGlassIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";

export function PassosDoAgente() {
  return (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader>Como o agente chegou à resposta</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep
          icon={MagnifyingGlassIcon}
          label="Buscando o contrato do cliente"
          status="complete"
        >
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult>CT-2026-0412</ChainOfThoughtSearchResult>
            <ChainOfThoughtSearchResult>CT-2025-1187</ChainOfThoughtSearchResult>
          </ChainOfThoughtSearchResults>
        </ChainOfThoughtStep>
        <ChainOfThoughtStep
          description="Parcelas de setembro e outubro"
          icon={DatabaseIcon}
          label="Consultando os títulos em aberto"
          status="active"
        />
        <ChainOfThoughtStep
          icon={NotePencilIcon}
          label="Redigindo a resposta"
          status="pending"
        />
      </ChainOfThoughtContent>
    </ChainOfThought>
  );
}
```

## Armadilhas

- **Título padrão em inglês.** Sempre passe `children` no
  `ChainOfThoughtHeader`.
- **Header e Content precisam do mesmo `ChainOfThought` pai.** Cada um cria
  o próprio `Collapsible` interno e lê o estado do contexto; fora do
  `ChainOfThought` lança erro.
- **Fechado por padrão.** `defaultOpen` é `false`; durante o streaming,
  normalmente você quer `defaultOpen` ou `open` controlado.
- **Ícone Lucide** não serve: o tipo é o `Icon` do Phosphor.
