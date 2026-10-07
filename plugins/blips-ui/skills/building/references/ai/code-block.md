# CodeBlock

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/code-block`

Bloco de código com realce de sintaxe pelo **Shiki** (temas `github-light` e
`github-dark` fixos, trocando com o tema da página), números de linha opcionais,
cabeçalho com nome do arquivo, botão de copiar e seletor de linguagem. Mostra o
texto cru na hora e troca pelo realçado quando o Shiki carrega (com cache por
código + linguagem).

## Quando usar (e quando não)

- **Use** para código ou JSON que o agente produziu fora do markdown: entrada e
  saída de uma tool (o `Tool` da @blips/ai já usa o `CodeBlock` por dentro),
  artefato gerado, payload de depuração.
- **Não use** para código **dentro** da resposta em markdown: o
  `MessageResponse` (`message.md`) já realça blocos ```` ``` ```` com o plugin
  `@streamdown/code`.
- **Não use** para código de documentação estática do app: aí é o realce do
  seu pipeline (MDX/rehype), sem Shiki no cliente.
- Para um trecho curto inline (`nome_da_tool`), use `<code>` com
  `font-mono text-xs`, não CodeBlock.

## Peers exigidos

`shiki` (^4). O import é estático: importar `@blips/ai/components/code-block`
(ou `@blips/ai/components/tool`, que depende dele) **sem** `shiki` instalado
quebra o build.

```bash
pnpm add @blips/ai shiki
```

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

| Export | Props | Notas |
|---|---|---|
| `CodeBlock` | `HTMLAttributes<HTMLDivElement>` + `code: string`, `language: BundledLanguage`, `showLineNumbers?: boolean` (`false`) | Raiz completa: provê o `code` para o botão de copiar, renderiza `children` (o header) **antes** do código. |
| `CodeBlockContainer` | `HTMLAttributes<HTMLDivElement>` + `language: string` | Moldura `rounded-md border bg-background`, `data-language`, `content-visibility: auto`. Para montar à mão. |
| `CodeBlockHeader` | `HTMLAttributes<HTMLDivElement>` | Faixa `border-b bg-muted/80 px-3 py-2 text-xs`, `justify-between`. |
| `CodeBlockTitle` | `HTMLAttributes<HTMLDivElement>` | Lado esquerdo do header (ícone + nome). |
| `CodeBlockFilename` | `HTMLAttributes<HTMLSpanElement>` | Nome em `font-mono`. |
| `CodeBlockActions` | `HTMLAttributes<HTMLDivElement>` | Lado direito do header (copiar, linguagem). |
| `CodeBlockContent` | `code`, `language`, `showLineNumbers?` | Só o corpo realçado (sem moldura). Não lê contexto. |
| `CodeBlockCopyButton` | Props do `Button` (sem `onCopy`/`onError` nativos) + `onCopy?: () => void`, `onError?: (error: Error) => void`, `timeout?: number` (2000), `copyLabel?: string` ("Copiar código"), `copiedLabel?: string` ("Copiado") | `variant="ghost"`, `size="icon"`; troca `CopyIcon` por `CheckIcon` por `timeout` ms. Só funciona **dentro** de `CodeBlock`. Sem `children`, o `aria-label` é `copyLabel`/`copiedLabel` conforme o estado. |
| `CodeBlockLanguageSelector` / `…Trigger` / `…Value` / `…Content` / `…Item` | `Select` da @blips/ui (Base UI) | Trigger `h-7` sem borda. `Content` com `align="end"` e `alignItemWithTrigger={false}`. A troca de linguagem é estado seu: passe o valor para o `language` do `CodeBlock`. |
| `highlightCode(code, language, callback?)` | → `TokenizedCode \| null` | Função de baixo nível: retorna do cache na hora ou chama `callback` quando o Shiki termina. |

`BundledLanguage` é o tipo do Shiki (`"ts"`, `"tsx"`, `"json"`, `"python"`,
`"sql"`, `"bash"`…): `import type { BundledLanguage } from "shiki"`.

## Composição com a @blips/ui

- Botões são o `Button` da @blips/ui (copiar) e o `Select` v3 (linguagem), com
  `render` em vez de `asChild` e `onValueChange(value, eventDetails)`.
- Dentro de um `Tool`, `Collapsible` ou `Card` da @blips/ui, sem moldura extra:
  o CodeBlock já tem borda.
- Feedback de cópia: além do ícone, um `toast("Código copiado")` do `Sonner`
  no `onCopy`, se a tela pedir.

## Exemplo v3

```tsx
"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
} from "@blips/ai/components/code-block";
import { FileCodeIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { BundledLanguage } from "shiki";

const linguagens: { label: string; value: BundledLanguage }[] = [
  { label: "SQL", value: "sql" },
  { label: "JSON", value: "json" },
];

const consulta = `SELECT contrato_id, vencimento, valor
FROM recebiveis
WHERE cliente_id = :cliente
ORDER BY vencimento
LIMIT 3;`;

export function ConsultaGerada() {
  const [linguagem, setLinguagem] = useState<BundledLanguage>("sql");

  return (
    <CodeBlock code={consulta} language={linguagem} showLineNumbers>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon size={14} />
          <CodeBlockFilename>consulta-recebiveis.sql</CodeBlockFilename>
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockLanguageSelector
            items={linguagens}
            onValueChange={(valor) => {
              const achada = linguagens.find((l) => l.value === valor);
              if (achada) {
                setLinguagem(achada.value);
              }
            }}
            value={linguagem}
          >
            <CodeBlockLanguageSelectorTrigger aria-label="Linguagem">
              <CodeBlockLanguageSelectorValue />
            </CodeBlockLanguageSelectorTrigger>
            <CodeBlockLanguageSelectorContent>
              {linguagens.map((l) => (
                <CodeBlockLanguageSelectorItem key={l.value} value={l.value}>
                  {l.label}
                </CodeBlockLanguageSelectorItem>
              ))}
            </CodeBlockLanguageSelectorContent>
          </CodeBlockLanguageSelector>
          <CodeBlockCopyButton />
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  );
}
```

## Armadilhas

- **`shiki` é obrigatório** para este subpath e para `tool`, embora seja peer
  opcional do pacote: declare-o no `package.json` do app.
- `CodeBlockCopyButton` fora de `CodeBlock` copia string vazia (o contexto tem
  `code: ""` por padrão). Não use com `CodeBlockContainer` + `CodeBlockContent`
  montados à mão.
- O botão de copiar já tem `aria-label` pt-BR. Para outro texto, use
  `copyLabel`/`copiedLabel`; um `aria-label` direto fica fixo e não muda para
  "copiado".
- `onCopy`/`onError` são do componente (`() => void` e `(error: Error) =>
  void`), não os eventos nativos de clipboard do `<button>`. Sem Clipboard API
  (HTTP sem TLS, iframe sem permissão), cai em `onError`.
- Os temas são fixos (`github-light`/`github-dark`); não há prop para trocar.
  O modo escuro depende da classe `dark` no ancestral (tema da @blips/ui).
- Mudar `language` dispara um novo realce assíncrono: durante o carregamento
  aparece o texto cru. É esperado, não é bug.
- O `className` em forma de função não é repassado ao `Button` da @blips/ui no
  `CodeBlockCopyButton`: use string.
