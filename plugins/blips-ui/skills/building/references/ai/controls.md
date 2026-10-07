# Controls

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/controls`

Os controles de zoom do React Flow (aproximar, afastar, enquadrar, travar
interação) com o visual da @blips/ui: caixa `bg-card` com borda e `rounded-md`,
botões transparentes que ganham `bg-secondary` no hover, sem sombra. Vive
dentro do `Canvas` (`canvas.md`).

## Quando usar (e quando não)

- **Use** em canvas grandes, que o usuário precisa navegar.
- **Não use** num canvas pequeno e fixo (prévia de 3 nós com `fitView`): os
  controles só ocupam espaço.
- **Não use** para botões próprios (exportar, tela cheia, adicionar nó): isso é
  `Panel` (`panel.md`) com `Button` da @blips/ui. Botões extras **dentro** dos
  Controls cabem como `ControlButton` do `@xyflow/react` (filho do `Controls`).

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

Exports: `Controls` e o tipo `ControlsProps` (= `ComponentProps` do `Controls`
do React Flow). Todas as props do React Flow passam direto; as mais usadas:

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `aria-label` | `string` | `"Controles do canvas"` | **Mudança da Blips**: o React Flow usaria o inglês "Control Panel". |
| `position` | `PanelPosition` | `"bottom-left"` | `"top-left"`, `"top-center"`, `"top-right"`, `"bottom-left"`, `"bottom-center"`, `"bottom-right"`, `"center-left"`, `"center-right"`. |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | |
| `showZoom` | `boolean` | `true` | Botões de aproximar/afastar. |
| `showFitView` | `boolean` | `true` | Botão de enquadrar. |
| `showInteractive` | `boolean` | `true` | Cadeado que trava arrastar/selecionar. Desligue em canvas só de leitura. |
| `fitViewOptions` | `FitViewOptions` | — | Ex.: `{ padding: 0.2 }`. |
| `onZoomIn` / `onZoomOut` / `onFitView` / `onInteractiveChange` | callbacks | — | Rodam **além** da ação padrão. |
| `className` | `string` | — | Mesclado com `cn` depois das classes da Blips. |
| `children` | `ReactNode` | — | Botões extras (`ControlButton` do `@xyflow/react`). |

Os **rótulos dos botões** não são props do `Controls`: vêm do `ariaLabelConfig`
do `<ReactFlow>`, ou seja, do `Canvas`.

## Composição com a @blips/ui

- O visual já usa `bg-card`, `border` e `hover:bg-secondary` da @blips/ui. Para
  um botão extra, use `ControlButton` com ícone Phosphor `*Icon` (`size={14}`)
  e `title`/`aria-label` em pt-BR. Não ponha um `Button` da @blips/ui dentro do
  `Controls`: o seletor `[&>button]` só estiliza `<button>` filho direto.
- Para não colidir com um `Panel` no mesmo canto, escolha `position`
  diferentes.

## Exemplo v3

```tsx
"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Controls } from "@blips/ai/components/controls";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import type { Node as FlowNode } from "@xyflow/react";
import { ControlButton } from "@xyflow/react";

const nodes: FlowNode[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Recebe mensagem" } },
  { id: "2", position: { x: 0, y: 120 }, data: { label: "Responde cliente" } },
];

const rotulos = {
  "controls.zoomIn.ariaLabel": "Aproximar",
  "controls.zoomOut.ariaLabel": "Afastar",
  "controls.fitView.ariaLabel": "Enquadrar",
  "controls.interactive.ariaLabel": "Travar ou destravar o canvas",
};

export function CanvasComControles({ onExportar }: { onExportar: () => void }) {
  return (
    <div className="h-80 w-full rounded-lg border">
      <Canvas ariaLabelConfig={rotulos} nodes={nodes}>
        <Controls fitViewOptions={{ padding: 0.2 }} showInteractive={false}>
          <ControlButton
            aria-label="Exportar imagem"
            onClick={onExportar}
            title="Exportar imagem"
          >
            <DownloadSimpleIcon size={14} />
          </ControlButton>
        </Controls>
      </Canvas>
    </div>
  );
}
```

## Armadilhas

- **Botões em inglês por padrão** ("Zoom In", "Zoom Out", "Fit View", "Toggle
  Interactivity"): o `Controls` da @blips/ai só traduz o rótulo do painel.
  Passe `ariaLabelConfig` em pt-BR no `Canvas`, como no exemplo.
- Fora de um `<ReactFlow>`/`Canvas` o componente lança erro (precisa do store).
- As classes usam `!important` (`shadow-none!`, `bg-transparent!`,
  `border-none!`) para vencer o CSS do React Flow. Para mudar o fundo de um
  botão, também use `!`: `className="[&>button]:bg-muted!"`.
- O cadeado (`showInteractive`) só faz sentido em canvas editável; em leitura,
  desligue para não sugerir uma ação que não muda nada visível.
