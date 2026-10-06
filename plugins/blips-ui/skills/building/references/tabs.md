# Tabs

Import: `@blips/ui/components/tabs`

Alterna entre painéis de conteúdo relacionados no mesmo contexto (visão geral /
histórico / configurações). Para alternar um valor (filtro, visualização) sem
painel, use Toggle Group; para navegar entre páginas, links.

Exports (iguais nas duas versões): `Tabs`, `TabsList`, `TabsTrigger`,
`TabsContent`, `tabsListVariants`.

## Notas comuns

- `TabsList` tem a prop `variant`: `"default"` (pílula com fundo `bg-muted`) ou `"line"` (sublinhado, fundo transparente).
- `Tabs` aceita `orientation` (`"horizontal"` padrão, ou `"vertical"`); a lib repassa à primitiva e põe `data-orientation`. Vertical: lista em coluna, triggers alinhados à esquerda.
- Cada `TabsTrigger` e `TabsContent` precisa de um `value` correspondente.
- Ícones no trigger são Phosphor; trigger só com ícone precisa de `aria-label`.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/tabs`. `TabsTrigger` é `Tabs.Tab`; `TabsContent` é `Tabs.Panel`.

| Componente | Props |
|---|---|
| `Tabs` | `value` / `defaultValue` (qualquer tipo; **sem `defaultValue`, começa no índice 0**), `onValueChange(value, eventDetails)`, `orientation`. |
| `TabsList` | `variant`, **`activateOnFocus`** (padrão `false`: setas só movem o foco, Enter/Espaço ativa), `loopFocus`. |
| `TabsTrigger` | `value`, `disabled`, `render`. Ícone com texto: `data-icon="inline-start"`/`"inline-end"`. |
| `TabsContent` | `value`, **`keepMounted`** (no lugar de `forceMount`). |

Visual: lista `h-8`, trigger `text-xs px-1.5`, conteúdo `text-xs/relaxed`.
Estado: trigger ativo `data-active`; estilos internos usam `data-horizontal`/`data-vertical`.

```tsx
import { ChartBarIcon, GearIcon } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs";

export function AbasDoContrato() {
  return (
    <Tabs defaultValue="resumo" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="resumo">
          <ChartBarIcon data-icon="inline-start" />
          Resumo
        </TabsTrigger>
        <TabsTrigger value="configuracoes">
          <GearIcon data-icon="inline-start" />
          Configurações
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resumo">
        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>Situação atual do contrato.</CardDescription>
          </CardHeader>
          <CardContent>…</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="configuracoes">…</TabsContent>
    </Tabs>
  );
}
```

Sublinhado e com ativação automática ao focar (como era no Radix):

```tsx
<Tabs defaultValue="todos">
  <TabsList variant="line" activateOnFocus>
    <TabsTrigger value="todos">Todos</TabsTrigger>
    <TabsTrigger value="abertos">Abertos</TabsTrigger>
  </TabsList>
</Tabs>
```

### Armadilhas

- `activationMode` não existe no `Tabs`: use `activateOnFocus` no `TabsList` (o padrão agora é manual).
- `data-[state=active]:` não casa: use `data-active:` (ex.: `group-data-active:`).
- `forceMount` não existe: `keepMounted`.

## v2.x — Radix

Primitiva: `@radix-ui/react-tabs`.

| Componente | Props |
|---|---|
| `Tabs` | `value` / `defaultValue` (**string**; sem `defaultValue`, nenhum painel fica ativo), `onValueChange(value: string)`, `orientation`, **`activationMode`** (`"automatic"` padrão, ou `"manual"`), `dir`. |
| `TabsList` | `variant`, `loop`. |
| `TabsTrigger` | `value`, `disabled`, `asChild`. |
| `TabsContent` | `value`, `forceMount`. |

Visual: lista `h-9`, trigger `text-sm px-2`.
Estado: trigger ativo `data-state="active"`; orientação `data-[orientation=*]`.

```tsx
import { ChartBar, Gear } from "@phosphor-icons/react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs"

export function AbasDoContrato() {
  return (
    <Tabs defaultValue="resumo" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="resumo">
          <ChartBar />
          Resumo
        </TabsTrigger>
        <TabsTrigger value="configuracoes">
          <Gear />
          Configurações
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resumo">…</TabsContent>
      <TabsContent value="configuracoes">…</TabsContent>
    </Tabs>
  )
}
```

## Exemplos na docs

`tabs-demo`, `tabs-line`, `tabs-vertical`, `tabs-icons`, `tabs-icon-only`, `tabs-disabled`, `tabs-dropdown` (em `apps/docs/examples/`, escritos para a v3).
