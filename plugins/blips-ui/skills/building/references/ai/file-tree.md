# FileTree

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/file-tree`

Árvore de arquivos em `font-mono`: pastas recolhíveis (`Collapsible` da
@blips/ui) com caret e ícone de pasta aberta/fechada, arquivos com ícone
trocável, seleção de um caminho e ações por linha. Expansão e seleção são
identificadas pelo `path` de cada item. Adaptado do `file-tree` do AI Elements
(Apache-2.0).

## Quando usar (e quando não)

- **Use** para mostrar os arquivos que o agente criou, leu ou alterou (um
  projeto gerado, o resultado de um `ls` de sandbox, os arquivos de um commit
  em árvore), com clique para abrir o arquivo num painel ao lado.
- **Não use** para a lista plana de arquivos de um commit com `+/-`: isso é o
  `Commit` (`commit.md`).
- **Não use** para os arquivos tocados por uma tarefa dentro do plano do
  agente: isso é `TaskItemFile` (`task.md`).
- **Não use** como navegação do app (menu lateral com pastas): isso é a
  `Sidebar` da @blips/ui (`../../components/sidebar/sidebar.md`).
- **Não use** para árvores enormes (milhares de nós): o componente renderiza
  tudo, sem virtualização nem carregamento sob demanda.

## Import

```tsx
import {
  FileTree,
  FileTreeActions,
  FileTreeFile,
  FileTreeFolder,
  FileTreeIcon,
  FileTreeName,
} from "@blips/ai/components/file-tree";
```

## Peers exigidos

Nenhum além da @blips/ai (usa `Collapsible` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`.
Se o seu código usar tipos do AI SDK, `ai` é peer opcional só de tipos
(sempre `import type`, sem runtime): num projeto TypeScript, instale como
**devDependency** (`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

```bash
pnpm add @blips/ai
```

## API

| Componente | Props reais | Notas |
|---|---|---|
| `FileTree` | `HTMLAttributes<HTMLDivElement>` (sem `onSelect` nativo) + `expanded?: Set<string>`, `defaultExpanded?: Set<string>` (padrão `new Set()`), `onExpandedChange?: (expanded: Set<string>) => void`, `selectedPath?: string`, `onSelect?: (path: string) => void` | Raiz `role="tree"`, moldura `rounded-lg border bg-background font-mono text-sm`. `expanded` controla; sem ele, o estado interno parte de `defaultExpanded`. A seleção é **só controlada**: sem `selectedPath`, nada fica destacado. |
| `FileTreeFolder` | `HTMLAttributes<HTMLDivElement>` + `path: string`, `name: string`, `expandLabel?: string` (padrão `"Expandir pasta"`), `collapseLabel?: string` (padrão `"Recolher pasta"`) | `role="treeitem"` com `aria-expanded`/`aria-selected`. O **caret** abre/fecha (`aria-label` = rótulo + `name`); o **nome** chama `onSelect(path)` e não abre a pasta. `children` são os itens da subárvore (`role="group"`, recuo com borda à esquerda). |
| `FileTreeFile` | `HTMLAttributes<HTMLDivElement>` + `path: string`, `name: string`, `icon?: ReactNode` (padrão `FileIcon` cinza) | `role="treeitem"`, clique, Enter ou Espaço chamam `onSelect(path)`. **Com `children`, o conteúdo padrão (espaçador, ícone, nome) some**: monte a linha inteira. |
| `FileTreeIcon` | `HTMLAttributes<HTMLSpanElement>` | `<span className="shrink-0">` para o ícone numa linha montada à mão. |
| `FileTreeName` | `HTMLAttributes<HTMLSpanElement>` | `<span className="truncate">` para o nome. |
| `FileTreeActions` | `HTMLAttributes<HTMLDivElement>` | `ml-auto`, `role="group"`; para o clique e a tecla de propagarem, então o botão de ação não seleciona a linha. |

Todos os tipos de props são exportados (`FileTreeProps`, `FileTreeFolderProps`,
`FileTreeFileProps`, `FileTreeIconProps`, `FileTreeNameProps`,
`FileTreeActionsProps`).

## Composição com a @blips/ui

- Ações por linha: `Button` da @blips/ui com `size="icon-sm"`,
  `variant="ghost"` e `aria-label` dentro do `FileTreeActions`; para várias
  ações, um `DropdownMenu` (`../dropdown-menu.md`) com o trigger
  `render={<Button … />}`.
- Painel "árvore + arquivo": `ResizablePanelGroup` (`../resizable.md`) com a
  `FileTree` à esquerda e o `CodeBlock` da @blips/ai (`code-block.md`) do
  arquivo selecionado à direita.
- Dentro do chat, coloque a árvore no `MessageContent` do `Message` da
  @blips/ui, sem `Bubble` (é saída do agente, não balão).

## Exemplo v3 que compila

```tsx
"use client";

import {
  FileTree,
  FileTreeActions,
  FileTreeFile,
  FileTreeFolder,
  FileTreeIcon,
  FileTreeName,
} from "@blips/ai/components/file-tree";
import { Button } from "@blips/ui/components/button";
import { DownloadSimpleIcon, FileCodeIcon } from "@phosphor-icons/react";
import { useState } from "react";

export function ArquivosGerados({
  onBaixar,
}: {
  onBaixar: (path: string) => void;
}) {
  const [selecionado, setSelecionado] = useState("src/agente.py");

  return (
    <FileTree
      className="w-full max-w-sm"
      defaultExpanded={new Set(["src", "src/tools"])}
      onSelect={setSelecionado}
      selectedPath={selecionado}
    >
      <FileTreeFolder name="src" path="src">
        <FileTreeFile
          icon={<FileCodeIcon className="size-4 text-muted-foreground" />}
          name="agente.py"
          path="src/agente.py"
        />
        <FileTreeFolder name="tools" path="src/tools">
          <FileTreeFile name="titulos.py" path="src/tools/titulos.py">
            <span className="size-4 shrink-0" />
            <FileTreeIcon>
              <FileCodeIcon className="size-4 text-muted-foreground" />
            </FileTreeIcon>
            <FileTreeName>titulos.py</FileTreeName>
            <FileTreeActions>
              <Button
                aria-label="Baixar titulos.py"
                onClick={() => onBaixar("src/tools/titulos.py")}
                size="icon-sm"
                variant="ghost"
              >
                <DownloadSimpleIcon />
              </Button>
            </FileTreeActions>
          </FileTreeFile>
        </FileTreeFolder>
      </FileTreeFolder>
      <FileTreeFile name="pyproject.toml" path="pyproject.toml" />
    </FileTree>
  );
}
```

## Armadilhas

- **`Set` novo a cada render.** `defaultExpanded={new Set([...])}` só é lido
  na montagem, então tudo bem inline. Já o `expanded` controlado precisa vir
  de estado (`useState<Set<string>>`); um `new Set()` inline trava a árvore,
  porque cada clique é descartado no render seguinte.
- **Seleção sem estado.** Passar só `onSelect` não destaca nada: o destaque
  vem de `selectedPath`. Guarde o caminho em estado, como no exemplo.
- **Clicar no nome da pasta não abre.** Só o caret alterna; o nome seleciona.
  Se a pasta deve abrir ao selecionar, faça isso no seu `onSelect` (controle
  `expanded`).
- **`children` no `FileTreeFile` substitui tudo.** Ao acrescentar ações,
  remonte espaçador (`<span className="size-4 shrink-0" />`), ícone e nome, ou
  a linha fica desalinhada das pastas.
- **`path` único.** Expansão e seleção usam o `path` como chave; dois itens
  com o mesmo caminho abrem e destacam juntos. Use o caminho completo, não só
  o nome.
- **Sem navegação por setas.** Os itens recebem foco por Tab e o arquivo
  responde a Enter/Espaço, mas não há a navegação por setas de um tree view
  completo. Para árvores longas, avalie se a lista cabe numa `Table` ou num
  `Command` com busca.
