# PackageInfo

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/package-info`

Cartão de um pacote de dependência: nome com ícone, `Badge` do tipo de mudança
(major, minor, patch, adicionado, removido), versão atual → nova, descrição e
lista de dependências. Sem `children`, monta cabeçalho e versão sozinho a
partir das props da raiz. Adaptado do `package-info` do AI Elements
(Apache-2.0).

## Quando usar (e quando não)

- **Use** quando o agente propõe ou aplica mudanças de dependência: "subir o
  `next` de 15.5 para 16.0", "adicionar `zod`", "remover `moment`", um resumo
  de PR do Renovate/Dependabot.
- **Não use** para o comando de instalação: isso é o `Snippet`
  (`snippet.md`) com botão de copiar.
- **Não use** para o diff do `package.json`: isso é o `CodeBlock`
  (`code-block.md`, `language="diff"`) ou o `Commit` (`commit.md`).
- **Não use** como catálogo de produtos/itens genéricos: o visual (ícone de
  pacote, fonte mono, tipos semver) é específico de dependência; use `Card`
  ou `Item` da @blips/ui.

## Import

```tsx
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from "@blips/ai/components/package-info";
```

## Peers exigidos

Nenhum além da @blips/ai (usa `Badge` da @blips/ui e `@phosphor-icons/react`).
O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

## API

`changeType` aceita `"major" | "minor" | "patch" | "added" | "removed"` (tipo
interno, não exportado: escreva o literal).

| Componente | Props reais | Notas |
|---|---|---|
| `PackageInfo` | `HTMLAttributes<HTMLDivElement>` + `name: string` (obrigatório), `currentVersion?: string`, `newVersion?: string`, `changeType?` | Raiz e contexto (`rounded-lg border bg-background p-4`). **Sem `children`**: cabeçalho (nome + badge, se houver `changeType`) e versão (se houver alguma). **Com `children`**: só eles; monte o cabeçalho você mesmo. |
| `PackageInfoHeader` | `HTMLAttributes<HTMLDivElement>` | Linha `flex justify-between` para nome e badge. |
| `PackageInfoName` | `HTMLAttributes<HTMLDivElement>` | `PackageIcon` + `name` do contexto em mono (`children` substitui o texto). |
| `PackageInfoChangeType` | `HTMLAttributes<HTMLDivElement>` (repassadas ao `Badge`) | `null` sem `changeType`. Rótulos padrão: `Major`, `Minor`, `Patch`, `Adicionado`, `Removido`, com ícone e cor por tipo; `children` troca o texto. |
| `PackageInfoVersion` | `HTMLAttributes<HTMLDivElement>` | `null` sem versões. `atual → nova` (só a que existir); `children` substitui. |
| `PackageInfoDescription` | `HTMLAttributes<HTMLParagraphElement>` | Parágrafo `text-muted-foreground text-sm`. |
| `PackageInfoContent` | `HTMLAttributes<HTMLDivElement>` | Área abaixo com `border-t`. |
| `PackageInfoDependencies` | `HTMLAttributes<HTMLDivElement>` + `label?: ReactNode` (padrão `"Dependências"`) | Título em caixa alta + lista. |
| `PackageInfoDependency` | `HTMLAttributes<HTMLDivElement>` + `name: string`, `version?: string` | Linha nome ↔ versão em mono; `children` substitui. |

Todos os tipos de props são exportados (`PackageInfoProps`,
`PackageInfoHeaderProps`, …, `PackageInfoDependencyProps`).

## Composição com a @blips/ui

- Vários pacotes: uma pilha (`flex flex-col gap-3`) de `PackageInfo`, ou
  dentro de um `Collapsible`/`Accordion` da @blips/ui quando a lista é longa.
- Aprovação da mudança (o agente vai mexer no `package.json`): ponha o cartão
  dentro do `ToolContent` e o `Confirmation` (`confirmation.md`) logo abaixo.
- Ações (abrir changelog, ver no npm): `Button` `variant="ghost"` com
  `size="icon-sm"` e `aria-label` dentro do `PackageInfoHeader`, ao lado do
  badge.

## Exemplo v3 que compila

```tsx
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from "@blips/ai/components/package-info";

export function AtualizacoesPropostas() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {/* Atalho: sem children, monta cabeçalho e versão */}
      <PackageInfo
        changeType="patch"
        currentVersion="4.5.0"
        name="shiki"
        newVersion="4.5.2"
      />

      {/* Composto: descrição e dependências */}
      <PackageInfo
        changeType="major"
        currentVersion="15.5.4"
        name="next"
        newVersion="16.0.1"
      >
        <PackageInfoHeader>
          <PackageInfoName />
          <PackageInfoChangeType />
        </PackageInfoHeader>
        <PackageInfoVersion />
        <PackageInfoDescription>
          Versão major: revise as mudanças de cache e de middleware antes do
          merge.
        </PackageInfoDescription>
        <PackageInfoContent>
          <PackageInfoDependencies label="Peers afetados">
            <PackageInfoDependency name="react" version="^19.2.0" />
            <PackageInfoDependency name="react-dom" version="^19.2.0" />
          </PackageInfoDependencies>
        </PackageInfoContent>
      </PackageInfo>

      <PackageInfo changeType="removed" currentVersion="2.30.1" name="moment" />
    </div>
  );
}
```

## Armadilhas

- **`children` desliga o layout padrão.** Ao passar descrição ou
  dependências, o cabeçalho e a versão somem se você não os remontar
  (`PackageInfoHeader` + `PackageInfoName` + `PackageInfoChangeType` +
  `PackageInfoVersion`), como no exemplo.
- **Major/Minor/Patch ficam em inglês de propósito** (termos do semver);
  `Adicionado`/`Removido` são pt-BR. Para outro texto, passe `children` ao
  `PackageInfoChangeType`, não recrie o badge.
- **Cores fixas por tipo.** O badge usa classes de cor do upstream
  (`bg-red-100`, `bg-green-100`…), não tokens; não tente "corrigir" com
  `className` de cor por cima de cada tipo, a menos que o app tenha um tema
  próprio para isso.
- **Versão é texto.** O componente não compara nem valida semver: o
  `changeType` é o app que decide (ex.: com `semver.diff`).
