# Panel

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/panel`

Caixa flutuante posicionada sobre o viewport do `Canvas` (`canvas.md`): o
`Panel` do React Flow com o visual da @blips/ui (`m-4 rounded-md border
bg-card p-1 overflow-hidden`). Fica parada enquanto o usuário move e dá zoom
no grafo.

## Quando usar (e quando não)

- **Use** para ações e informação do canvas inteiro: botões (adicionar nó,
  exportar, tela cheia, salvar), legenda, título do fluxo, status da execução.
- **Não use** para ações de **um** nó: isso é `Toolbar` (`toolbar.md`), que
  aparece junto do nó selecionado.
- **Não use** para zoom: isso é `Controls` (`controls.md`).
- **Não use** fora do canvas (barra de ferramentas da página): é um `div`
  absoluto dentro do viewport do React Flow. Fora dele, use `ButtonGroup` ou
  `Card` da @blips/ui.

## Peers exigidos

`@xyflow/react` (^12), com o CSS `@xyflow/react/dist/style.css` importado uma
vez pelo app (detalhes em `canvas.md`).

```bash
pnpm add @blips/ai @xyflow/react
```

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

Exports: `Panel` e o tipo `PanelProps` (= `ComponentProps` do `Panel` do React
Flow: props de `div` + `position`).

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `position` | `PanelPosition` | `"top-left"` | `"top-left"`, `"top-center"`, `"top-right"`, `"bottom-left"`, `"bottom-center"`, `"bottom-right"`, `"center-left"`, `"center-right"`. |
| `className` | `string` | — | Mesclado com `cn` depois de `m-4 overflow-hidden rounded-md border bg-card p-1`. |
| `children` | `ReactNode` | — | Sem texto padrão. |
| demais | props de `div` | — | `aria-label`, `role`, `style`… |

## Composição com a @blips/ui

- Botões: `Button` da @blips/ui `variant="ghost"`, `size="icon-sm"`, ícone
  Phosphor `*Icon` e `aria-label` pt-BR; com `Tooltip` da @blips/ui
  (`render={<Button … />}` no trigger, v3) quando o ícone não for óbvio.
- Vários botões: `ButtonGroup` da @blips/ui dentro do `Panel`, ou `flex gap-1`
  direto no `className`.
- Status: `Badge` ou `Shimmer` (`shimmer.md`) num `Panel` em
  `position="top-center"`.
- Para tirar a moldura (só o conteúdo flutuando), sobrescreva:
  `className="border-none bg-transparent p-0"`.

## Exemplo v3

```tsx
"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Panel } from "@blips/ai/components/panel";
import { Badge } from "@blips/ui/components/badge";
import { Button } from "@blips/ui/components/button";
import { FloppyDiskIcon, PlusIcon } from "@phosphor-icons/react";
import type { Node as FlowNode } from "@xyflow/react";

const nodes: FlowNode[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Gatilho: nova mensagem" },
  },
];

export function CanvasComPainel({
  onAdicionar,
  onSalvar,
}: {
  onAdicionar: () => void;
  onSalvar: () => void;
}) {
  return (
    <div className="h-80 w-full rounded-lg border">
      <Canvas nodes={nodes}>
        <Panel
          className="flex items-center gap-2 px-3 py-2"
          position="top-left"
        >
          <span className="font-medium text-xs">Atendimento financeiro</span>
          <Badge variant="secondary">rascunho</Badge>
        </Panel>
        <Panel className="flex gap-1" position="top-right">
          <Button
            aria-label="Adicionar etapa"
            onClick={onAdicionar}
            size="icon-sm"
            variant="ghost"
          >
            <PlusIcon />
          </Button>
          <Button
            aria-label="Salvar fluxo"
            onClick={onSalvar}
            size="icon-sm"
            variant="ghost"
          >
            <FloppyDiskIcon />
          </Button>
        </Panel>
      </Canvas>
    </div>
  );
}
```

## Armadilhas

- Fora de um `<ReactFlow>`/`Canvas` não funciona (precisa do store do React
  Flow).
- **`m-4` fixa** afasta da borda; dois `Panel` no mesmo `position` se
  sobrepõem. Agrupe o conteúdo num só ou use cantos diferentes.
- `Controls` também é um painel (padrão `"bottom-left"`): não ponha um `Panel`
  no mesmo canto.
- `overflow-hidden` corta popovers/menus **que não usam portal**. Os da
  @blips/ui (`DropdownMenu`, `Popover`, `Tooltip`) usam portal e funcionam.
