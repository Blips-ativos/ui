# JSXPreview

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/jsx-preview`

Renderiza uma **string de JSX** gerada pelo modelo como interface de verdade,
via `react-jsx-parser` (sem `eval`). Durante o streaming, descarta a última tag
incompleta e fecha as tags abertas antes de renderizar; se o trecho atual
quebrar o parser, mostra a última versão que renderizou. Com o streaming
encerrado, o erro vai para o `JSXPreviewError` e para `onError`. Adaptado do
`jsx-preview` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para "generative UI" leve: o agente devolve um trecho de JSX
  (cartão de resumo, tabela, layout) e você quer mostrar o resultado
  renderizado, inclusive enquanto chega.
- **Não use** para mostrar o código-fonte: isso é o `CodeBlock`
  (`code-block.md`). Para "código + resultado", ponha os dois em abas
  (`sandbox.md` ou `Tabs` da @blips/ui).
- **Não use** para uma página/app completo gerado (HTML, scripts, rotas):
  isso é o `WebPreview` (`web-preview.md`) com um `iframe` isolado.
- **Não use** para respostas em markdown: isso é o `MessageResponse`
  (`message.md`).
- **Não use** se a UI pode ser descrita por dados: prefira tool calls que
  devolvem JSON e componentes do app que os renderizam (tipado, testável,
  sem parser em runtime).

## Import

```tsx
import {
  JSXPreview,
  JSXPreviewContent,
  JSXPreviewError,
  useJSXPreview,
} from "@blips/ai/components/jsx-preview";
```

## Peers exigidos

- `react-jsx-parser` (import estático no arquivo do componente): sem ele, o
  build quebra com `TS2307`/módulo não encontrado em
  `node_modules/@blips/ai/src/components/jsx-preview.tsx`.

```bash
pnpm add @blips/ai react-jsx-parser
```

Faixa aceita pelo pacote: `react-jsx-parser ^2`. O componente não importa `ai`.

## API

| Export | Props reais | Notas |
|---|---|---|
| `JSXPreview` | `ComponentProps<"div">` + `jsx: string` (obrigatório), `isStreaming?: boolean` (padrão `false`), `components?: Record<string, ComponentType>` (o `components` do `react-jsx-parser`), `bindings?: Record<string, unknown>`, `onError?: (error: Error) => void` | Raiz e contexto (`div` `relative`). **Não renderiza nada sozinho**: ponha `JSXPreviewContent` (e `JSXPreviewError`) dentro. Trocar `jsx` zera o erro. |
| `JSXPreviewContent` | `ComponentProps<"div">` sem `children` | `div.jsx-preview-content` com o `JsxParser` (`renderInWrapper={false}`). Em streaming, erro silencioso + volta à última versão boa; fora dele, chama `onError` uma vez por `jsx`. |
| `JSXPreviewError` | `ComponentProps<"div">` + `children?: ReactNode \| ((error: Error) => ReactNode)` (declarado; **na prática só `ReactNode` compila**, ver Armadilhas) | Só aparece quando há erro (fora do streaming). Padrão: caixa `destructive` com `WarningCircleIcon` + `error.message` (texto do parser, em inglês). Passe `children` para a mensagem em pt-BR; para ler o erro, um filho com `useJSXPreview()`. |
| `useJSXPreview()` | hook | Lê o contexto (`jsx`, `processedJsx`, `isStreaming`, `error`…); lança erro fora do `JSXPreview`. |

Tipos exportados: `JSXPreviewProps`, `JSXPreviewContentProps`,
`JSXPreviewErrorProps`.

## Composição com a @blips/ui

- `components` é a ponte com o design system: exponha componentes da
  @blips/ui pelo nome que o modelo vai usar (`{ Badge, Button, Card,
  CardContent, CardHeader, CardTitle }`) e descreva essa lista no prompt.
  Classes Tailwind no JSX gerado só funcionam se já existirem no CSS do app
  (o scanner do Tailwind não vê strings que chegam em runtime); prefira os
  componentes às classes soltas.
- Dentro do chat, a prévia vai no `MessageContent` do `Message` da
  @blips/ui, no lugar da part de texto que contém o JSX (o app extrai o
  trecho; a lib não sabe onde ele está na resposta).
- Estado de carregamento antes do primeiro trecho: `Skeleton` da @blips/ui ou
  `Shimmer` (`shimmer.md`).

## Exemplo v3 que compila

```tsx
"use client";

import {
  JSXPreview,
  JSXPreviewContent,
  JSXPreviewError,
  useJSXPreview,
} from "@blips/ai/components/jsx-preview";
import { Badge } from "@blips/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import type { ComponentProps } from "react";

// Os componentes da @blips/ui (Base UI) não casam com o tipo `components` do
// react-jsx-parser: embrulhe cada um numa função que devolve JSX.
const componentes = {
  Badge: (p: ComponentProps<typeof Badge>) => <Badge {...p} />,
  Card: (p: ComponentProps<typeof Card>) => <Card {...p} />,
  CardContent: (p: ComponentProps<typeof CardContent>) => (
    <CardContent {...p} />
  ),
  CardHeader: (p: ComponentProps<typeof CardHeader>) => <CardHeader {...p} />,
  CardTitle: (p: ComponentProps<typeof CardTitle>) => <CardTitle {...p} />,
};

// Children em função não compilam no JSXPreviewError (ver Armadilhas): leia o
// erro pelo hook num filho.
function MensagemDeErro() {
  const { error } = useJSXPreview();
  return <span>Não foi possível renderizar a prévia: {error?.message}</span>;
}

export function PreviaGerada({
  jsx,
  emStreaming,
}: {
  jsx: string;
  emStreaming: boolean;
}) {
  return (
    <JSXPreview
      components={componentes}
      isStreaming={emStreaming}
      jsx={jsx}
      onError={(erro) => console.warn("JSX inválido do agente", erro)}
    >
      <JSXPreviewContent />
      <JSXPreviewError>
        <MensagemDeErro />
      </JSXPreviewError>
    </JSXPreview>
  );
}

// Uso: <PreviaGerada emStreaming={status === "streaming"} jsx={trecho} />
// com trecho = '<Card><CardHeader><CardTitle>Contrato CT-2026-0412</CardTitle></CardHeader><CardContent><Badge>Em dia</Badge></CardContent></Card>'
```

## Armadilhas

- **JSX do modelo é entrada não confiável.** O `react-jsx-parser` não executa
  código arbitrário e, por padrão, remove `<script>` e atributos `on*`, mas
  renderiza qualquer tag HTML (inclusive `<a href>`, `<img src>`, `<iframe>`)
  e o `JSXPreview` não expõe `componentsOnly`/`blacklistedTags`. Não renderize
  JSX vindo de terceiros sem revisão; para conteúdo realmente arbitrário, use
  `WebPreview` com `iframe` em outra origem.
- **`bindings` vira API para o modelo.** Tudo que você passa ali (funções,
  dados) pode ser chamado/lido pelo JSX gerado. Exponha só o necessário,
  nunca tokens, `fetch` ou setters de estado sensíveis.
- **`components` direto da @blips/ui não tipa.** O tipo do parser é
  `ComponentType` sem props; os componentes Base UI da @blips/ui (que devolvem
  `ReactElement<unknown>` via `useRender`) e qualquer componente com prop
  obrigatória dão `TS2322`. Embrulhe cada um numa arrow que devolve JSX, como
  no exemplo (verificado com `tsc`).
- **`children` em função no `JSXPreviewError` não compila.** O tipo é a
  interseção de `ComponentProps<"div">` (`children: ReactNode`) com a união
  que aceita função, então uma função dá `TS2322`. Use um filho que chama
  `useJSXPreview()` (o filho roda dentro do contexto), como no exemplo.
- **`isStreaming` precisa voltar a `false`.** Enquanto for `true`, erros ficam
  escondidos e as tags são autocompletadas; ligue ao status do stream
  (`status === "streaming"`), não deixe fixo.
- **`components`/`bindings` estáveis.** Objetos novos a cada render recriam o
  contexto e re-renderizam a prévia a cada token; declare fora do componente
  ou use `useMemo`.
- **Mensagem de erro em inglês.** O padrão do `JSXPreviewError` mostra o
  texto cru do parser; para quem usa o app, passe `children` em pt-BR.
