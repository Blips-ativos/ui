# Resizable

Import: `@blips/ui/components/resizable`

Painéis redimensionáveis por arraste (lista + detalhe, editor + preview). Usa
`react-resizable-panels` **v4** nas duas versões da lib.

Exports (iguais nas duas versões): `ResizablePanelGroup`, `ResizablePanel`,
`ResizableHandle`.

| Componente | Primitiva | Descrição |
|---|---|---|
| `ResizablePanelGroup` | `Group` | Contêiner `flex h-full w-full`; vertical vira `flex-col` (`aria-[orientation=vertical]`). |
| `ResizablePanel` | `Panel` | Um painel. |
| `ResizableHandle` | `Separator` | Linha de 1px entre painéis, com anel de foco. Prop da lib `withHandle` mostra uma alça visível. |

Props principais (react-resizable-panels v4):

| Componente | Props |
|---|---|
| `ResizablePanelGroup` | `orientation` (`"horizontal"` \| `"vertical"`, padrão horizontal), `onLayoutChange(layout)` (a cada movimento), `onLayoutChanged(layout)` (ao soltar; use para persistir), `defaultLayout`, `disabled`, `id`. O layout é um objeto `{ [idDoPainel]: tamanho }` (tipo `Layout`). |
| `ResizablePanel` | `id`, `defaultSize`, `minSize`, `maxSize` (prefira string com unidade, ex. `"30%"`), `collapsible`, `collapsedSize`. |
| `ResizableHandle` | `withHandle` (da lib), `id`. **Não tem `disabled`** na v4: para travar o redimensionamento, use `disabled` no `ResizablePanelGroup`. |

Na v4 não existem `direction`, `PanelGroup`, `PanelResizeHandle` nem
`onLayout(sizes[])` (eram da v2/v3 do react-resizable-panels). Para ler tamanhos,
dê `id` a cada painel.

API igual na v2.x e na v3.x.

Detecção de versão: `SKILL.md`, Passo 0. Diferenças transversais entre as versões: `v2-vs-v3.md`.

Diferença só visual: com `withHandle`, a v3 desenha uma barrinha (`h-6 w-1 rounded-lg bg-border`); a v2 desenha uma caixinha com o ícone `DotsSixVertical`.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@blips/ui/components/resizable";

export function ListaEDetalhe() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[320px] max-w-3xl rounded-lg border"
    >
      <ResizablePanel id="lista" defaultSize="35%" minSize="20%">
        <div className="flex h-full items-center justify-center p-6">Lista</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel id="detalhe" defaultSize="65%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="60%">
            <div className="flex h-full items-center justify-center p-6">Detalhe</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="40%">
            <div className="flex h-full items-center justify-center p-6">Histórico</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

Lendo o layout:

```tsx
import type { Layout } from "react-resizable-panels";

const [layout, setLayout] = React.useState<Layout>({});

<ResizablePanelGroup orientation="horizontal" onLayoutChange={setLayout}>
  <ResizablePanel id="esquerda" defaultSize="30%">
    {Math.round(layout.esquerda ?? 30)}%
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel id="direita" defaultSize="70%" />
</ResizablePanelGroup>
```

## Exemplos na docs

`resizable-demo`, `resizable-vertical`, `resizable-handle`, `resizable-controlled` (em `apps/docs/examples/`, escritos para a v3).
