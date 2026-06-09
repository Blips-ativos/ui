---
name: building-components
description: Skill especializada na criação de componentes para a plataforma Blips UI
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
argument-hint: [component-name] [--category=primitive|compound|composition|behavioral]
---

# Building Components — @blips/ui

Skill para criação de componentes na plataforma Blips. Define os padrões de arquitetura, convenções e regras de construção para toda a biblioteca de componentes.

> **Progressive Disclosure:** Este arquivo contém as regras e padrões de alto nível.
> Para referências detalhadas de uso e props de cada componente, consulte a pasta `references/`.

---

## Stack Tecnológica

| Ferramenta | Versão / Info |
|---|---|
| React | ^17 \|\| ^18 \|\| ^19 |
| Tailwind CSS | v4 (CSS-first, `@theme` blocks) |
| Build | tsup (ESM + CJS, dts, sourcemaps, treeshake) |
| Radix UI | Primitives acessíveis headless |
| CVA | class-variance-authority para variantes |
| Class merge | `clsx` + `tailwind-merge` via `cn()` |
| Ícones | @phosphor-icons/react |
| Linter | Biome |
| Monorepo | pnpm + Turborepo |

---

## Anatomia de um Componente

Todo componente em `@blips/ui` segue esta estrutura canônica:

```tsx
// 1. Diretiva (se necessário)
"use client"

// 2. Imports — React sempre primeiro, depois Radix, terceiros, internos
import * as React from "react"
import * as PrimitiveName from "@radix-ui/react-primitive-name"
import { cva, type VariantProps } from "class-variance-authority"
import { IconName } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { OtherComponent } from "@/components/other-component"

// 3. Variantes (se aplicável)
const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})

// 4. Interface de Props (quando há extensão customizada)
export interface ComponentProps
  extends React.ComponentPropsWithoutRef<"element">,
    VariantProps<typeof componentVariants> {
  asChild?: boolean
}

// 5. Componente com forwardRef
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "element"
    return (
      <Comp
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

// 6. Exports nomeados
export { Component, componentVariants }
```

---

## Taxonomia de Componentes

### 1. Primitivos
Componentes atômicos com um único elemento raiz. Podem ter variantes via `cva`.

**Quando usar:** Elementos UI básicos reutilizáveis (botões, inputs, badges).

**Padrão obrigatório:**
- `React.forwardRef`
- `cn()` para merge de classes
- `displayName`
- Props estendem o elemento HTML nativo

**Referência:** `references/primitives.md`

**Componentes:** `Button`, `Input`, `Textarea`, `Label`, `Badge`, `Separator`, `Skeleton`, `Spinner`, `Kbd`, `Switch`, `Checkbox`, `Slider`, `Progress`, `Toggle`

---

### 2. Compostos (Compound)
Componentes multi-parte com sub-componentes (Root + partes). Geralmente wrappam Radix primitives.

**Quando usar:** Elementos UI complexos com múltiplas partes compostas (dialog, card, accordion).

**Padrão obrigatório:**
- Cada parte é um `forwardRef` separado
- Exportar Root + todas as sub-partes
- Usar Radix primitives para comportamento
- `displayName` em todos os sub-componentes

**Referência:** `references/compound.md`

**Componentes:** `Card`, `Dialog`, `Sheet`, `AlertDialog`, `Accordion`, `Tabs`, `Table`, `DropdownMenu`, `ContextMenu`, `Menubar`, `NavigationMenu`, `HoverCard`, `Popover`, `Tooltip`, `Select`, `RadioGroup`, `Breadcrumb`, `Pagination`, `Command`, `Carousel`, `ScrollArea`, `InputOTP`, `ToggleGroup`, `Collapsible`, `Resizable`

---

### 3. Composição (Composition)
Componentes que compõem outros componentes `@blips/ui` para criar padrões de UI mais ricos.

**Quando usar:** Quando o componente precisa orquestrar múltiplos componentes existentes.

**Padrão obrigatório:**
- Importar componentes internos via `@/components/*`
- Usar `data-slot` para identificação CSS
- Delegar estilos ao `cn()` sem sobrescrever base dos sub-componentes
- Variantes podem usar `cva` ou condicionais

**Referência:** `references/composition.md`

**Componentes:** `InputGroup`, `ButtonGroup`, `Drawer`, `Sonner (Toaster)`, `Calendar`

---

### 4. Comportamentais (Behavioral)
Componentes/hooks que gerenciam estado complexo via React Context.

**Quando usar:** Quando o componente precisa compartilhar estado entre sub-componentes ou tem lógica de UI complexa.

**Padrão obrigatório:**
- `React.createContext` com tipo explícito
- Hook `useComponentName()` com guard de contexto
- Provider como componente `forwardRef`
- Memoização via `useMemo`/`useCallback`
- `"use client"` obrigatório

**Referência:** `references/behavioral.md`

**Componentes:** `Sidebar`, `Form`, `Chart`

---

## Regras de Criação

### R1 — `forwardRef` é Padrão
Todo componente que renderiza um elemento DOM DEVE usar `React.forwardRef`. Exceções: componentes puramente funcionais sem DOM (provedores de contexto como `Form = FormProvider`).

### R2 — `cn()` para Toda Classe
NUNCA use `className` direto. Sempre passe pelo `cn()`:
```tsx
// CORRETO
className={cn("base-class", className)}

// INCORRETO
className={`base-class ${className}`}
```

### R3 — `displayName` Obrigatório
Todo componente criado com `forwardRef` DEVE definir `displayName`:
```tsx
Component.displayName = "Component"
// Para Radix wrappers:
Component.displayName = PrimitiveName.Root.displayName
```

### R4 — Variantes com `cva`
Quando um componente tem variações visuais (variant, size, etc.), use `class-variance-authority`:
```tsx
const variants = cva("base", {
  variants: { variant: {...}, size: {...} },
  defaultVariants: { variant: "default", size: "default" },
})
```
Exportar as variantes para reuso em outros componentes (ex: `buttonVariants` usado em `AlertDialogAction`, `PaginationLink`).

### R5 — `asChild` com Radix Slot
Quando o componente precisa ser polimórfico (trocar o elemento renderizado), use o padrão `asChild`:
```tsx
import { Slot } from "@radix-ui/react-slot"

interface Props extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const Comp = asChild ? Slot : "element"
```

### R6 — `"use client"` Criterioso
Adicionar `"use client"` APENAS quando o componente usa:
- `useState`, `useEffect`, `useRef` com side effects
- Event handlers diretos
- Browser APIs (`window`, `document`)
- Hooks de terceiros que requerem client

**Não precisa** de `"use client"`:
- Componentes puramente declarativos (Card, Table, Badge)
- Re-exports de primitives (quando o primitive já tem a diretiva)

### R7 — Tokens Semânticos de Cor
NUNCA use cores Tailwind diretas (`bg-blue-500`). Use os tokens semânticos:
```
background, foreground, card, popover, primary, secondary,
muted, accent, destructive, border, input, ring
```
E suas variantes `-foreground`. Para sidebar: tokens `sidebar-*`.

### R8 — Imports com Path Aliases
Imports internos usam aliases definidos no tsconfig:
```tsx
import { cn } from "@/lib/utils"           // utilitários
import { Button } from "@/components/button" // componentes irmãos
import { useIsMobile } from "@/hooks/use-mobile" // hooks
```

### R9 — Sem Default Exports
Todo export é **nomeado**. Nunca use `export default`.

### R10 — Naming Convention
| Item | Convenção | Exemplo |
|---|---|---|
| Arquivo | kebab-case | `button-group.tsx` |
| Componente | PascalCase | `ButtonGroup` |
| Variantes cva | camelCase + "Variants" | `buttonGroupVariants` |
| Hook | camelCase com "use" | `useSidebar` |
| Tipo/Interface | PascalCase + "Props" | `ButtonProps` |
| Contexto | PascalCase + "Context" | `SidebarContext` |

### R11 — Index Barrel Export
Todo novo componente DEVE ser adicionado ao `src/index.ts`:
```tsx
export { NewComponent, NewComponentSub, newComponentVariants } from "./components/new-component"
```

### R12 — Acessibilidade
- Componentes interativos DEVEM ter `aria-label` ou conteúdo textual acessível
- Usar `role` apropriado quando o elemento semântico não for suficiente
- Textos apenas visuais devem ter `<span className="sr-only">`
- Indicadores de foco via `focus-visible:ring-*`
- Usar `disabled:pointer-events-none disabled:opacity-50` para estados desabilitados

---

## Workflow de Criação

Ao receber um pedido para criar um componente:

### Passo 1: Classificar
Determine a categoria do componente (primitivo, composto, composição, comportamental).

### Passo 2: Consultar Referências
Leia o arquivo de referência da categoria em `references/`:
- `references/primitives.md` — padrões e exemplos de primitivos
- `references/compound.md` — padrões e exemplos de compostos
- `references/composition.md` — padrões e exemplos de composição
- `references/behavioral.md` — padrões e exemplos de comportamentais
- `references/theming.md` — tokens, CSS variables, dark mode
- `references/patterns.md` — padrões cross-cutting (cva, forwardRef, Radix)

### Passo 3: Verificar Dependências
Consulte o arquivo `references/dependencies.md` para saber quais dependências externas estão disponíveis e quando usar cada uma.

### Passo 4: Implementar
Siga a anatomia canônica e as regras de criação (R1-R12).

### Passo 5: Registrar
1. Criar o arquivo em `packages/ui/src/components/[nome].tsx`
2. Adicionar exports em `packages/ui/src/index.ts`
3. Se for um componente do registry, adicionar em `packages/ui/registry/default/ui/[nome].tsx`

### Passo 6: Validar
- Verificar que todos os `displayName` estão definidos
- Verificar que `cn()` é usado em toda className
- Verificar que não há imports circulares
- Verificar que tokens semânticos são usados (sem cores hardcoded)
- Rodar `pnpm check` para validar com Biome

---

## Referência Rápida de Componentes Existentes

| Componente | Categoria | Radix | CVA | Context | "use client" |
|---|---|---|---|---|---|
| Accordion | Compound | Yes | No | No | No |
| Alert | Primitive | No | Yes | No | No |
| AlertDialog | Compound | Yes | No | No | No |
| AspectRatio | Primitive | Yes | No | No | No |
| Avatar | Compound | Yes | No | No | Yes |
| Badge | Primitive | No | Yes | No | No |
| Breadcrumb | Compound | No* | No | No | No |
| Button | Primitive | Slot | Yes | No | No |
| ButtonGroup | Composition | Slot | Yes | No | No |
| Calendar | Composition | No | No | No | Yes |
| Card | Compound | No | No | No | No |
| Carousel | Compound | No | No | Yes | No |
| Chart | Behavioral | No | No | Yes | No |
| Checkbox | Primitive | Yes | No | No | No |
| Collapsible | Compound | Yes | No | No | Yes |
| Command | Compound | No | No | No | No |
| ContextMenu | Compound | Yes | No | No | No |
| Dialog | Compound | Yes | No | No | Yes |
| Drawer | Composition | No | No | No | No |
| DropdownMenu | Compound | Yes | No | No | Yes |
| Form | Behavioral | Slot | No | Yes | Yes |
| HoverCard | Compound | Yes | No | No | No |
| Input | Primitive | No | No | No | No |
| InputGroup | Composition | No | Yes | No | No |
| InputOTP | Compound | No | No | No | No |
| Kbd | Primitive | No | No | No | No |
| Label | Primitive | Yes | Yes | No | Yes |
| Menubar | Compound | Yes | No | No | No |
| NavigationMenu | Compound | Yes | Yes | No | No |
| Pagination | Compound | No | No | No | No |
| Popover | Compound | Yes | No | No | No |
| Progress | Primitive | Yes | No | No | Yes |
| RadioGroup | Compound | Yes | No | No | No |
| Resizable | Compound | No | No | No | Yes |
| ScrollArea | Compound | Yes | No | No | No |
| Select | Compound | Yes | No | No | Yes |
| Separator | Primitive | Yes | No | No | No |
| Sheet | Compound | Yes* | Yes | No | Yes |
| Sidebar | Behavioral | Slot | Yes | Yes | Yes |
| Skeleton | Primitive | No | No | No | No |
| Slider | Primitive | Yes | No | No | No |
| Sonner | Composition | No | No | No | Yes |
| Spinner | Primitive | No | No | No | No |
| Switch | Primitive | Yes | No | No | No |
| Table | Compound | No | No | No | No |
| Tabs | Compound | Yes | No | No | No |
| Textarea | Primitive | No | No | No | No |
| Toggle | Primitive | Yes | Yes | No | No |
| ToggleGroup | Compound | Yes | No | Yes | Yes |
| Tooltip | Compound | Yes | No | No | Yes |

*Breadcrumb usa `@radix-ui/react-slot` para `asChild`, não primitives de comportamento.*
*Sheet reusa `@radix-ui/react-dialog` como base.*
