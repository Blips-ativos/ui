# WebPreview

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/web-preview`

Mini navegador para mostrar uma página gerada ou publicada pelo agente: barra
de navegação com botões de ícone (com tooltip), campo de URL (Enter navega),
`iframe` com `sandbox` e um console recolhível com logs coloridos por nível e
horário em pt-BR. A URL é estado interno do componente, partindo de
`defaultUrl`. Adaptado do `web-preview` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para a prévia de uma página/app que o agente gerou (deploy de
  preview, HTML de um relatório, protótipo), com URL e logs do console.
- **Não use** para um trecho de UI em JSX: isso é o `JSXPreview`
  (`jsx-preview.md`), sem `iframe`.
- **Não use** para o código da página: isso é o `CodeBlock`
  (`code-block.md`) ou o `Artifact` (`artifact.md`) com abas.
- **Não use** para link para fonte consultada: isso é `Sources`/
  `InlineCitation` (`sources.md`, `inline-citation.md`).
- **Não use** para embutir sites de terceiros que você não controla: muitos
  bloqueiam `iframe` (`X-Frame-Options`/CSP) e a prévia fica em branco.

## Import

```tsx
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from "@blips/ai/components/web-preview";
```

## Peers exigidos

Nenhum além da @blips/ai (usa `Button`, `Collapsible`, `Input` e `Tooltip` da
@blips/ui e `@phosphor-icons/react`). O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

## API

| Componente | Props reais | Notas |
|---|---|---|
| `WebPreview` | `ComponentProps<"div">` + `defaultUrl?: string` (padrão `""`), `onUrlChange?: (url: string) => void` | Raiz e contexto (`flex size-full flex-col rounded-lg border bg-card`). **Não há prop `url` controlada**: a URL muda pelo `WebPreviewUrl` (Enter) e avisa em `onUrlChange`. Precisa de altura no pai. |
| `WebPreviewNavigation` | `ComponentProps<"div">` | Barra `flex gap-1 border-b p-2`. |
| `WebPreviewNavigationButton` | props do `Button` da @blips/ui + `tooltip?: string` | Botão `ghost` 32px com `Tooltip` (já traz o próprio `TooltipProvider`); o texto do `tooltip` vira o `aria-label` padrão. `children` é o ícone. |
| `WebPreviewUrl` | props do `Input` da @blips/ui | Campo com a URL do contexto; Enter grava a URL (e chama `onUrlChange`). Padrões: `placeholder="Digite a URL..."`, `aria-label="URL"`. Com `value`/`onChange` próprios, vira controlado por você. |
| `WebPreviewBody` | `ComponentProps<"iframe">` + `loading?: ReactNode` | `iframe` com `src` = `src` da prop ou a URL do contexto; `title` padrão `"Prévia"`; `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"` (sobrescrevível). Aceita `srcDoc`. **`loading` é inutilizável no tipo** (colide com o atributo `loading` do iframe, ver Armadilhas). |
| `WebPreviewConsole` | `ComponentProps<"div">` + `logs?: { level: "log" \| "warn" \| "error"; message: string; timestamp: Date }[]`, `label?: ReactNode` (padrão `"Console"`), `emptyMessage?: ReactNode` (padrão `"Nenhuma saída no console"`) | `Collapsible` no rodapé (fechado por padrão); `children` entram depois dos logs. |

Tipos exportados: `WebPreviewProps`, `WebPreviewNavigationProps`,
`WebPreviewNavigationButtonProps`, `WebPreviewUrlProps`, `WebPreviewBodyProps`,
`WebPreviewConsoleProps` e `WebPreviewContextValue`.

## Composição com a @blips/ui

- Ícones de navegação: Phosphor `ArrowLeftIcon`, `ArrowRightIcon`,
  `ArrowClockwiseIcon`, `ArrowSquareOutIcon` (`size-4`) dentro de
  `WebPreviewNavigationButton`, com `tooltip` em pt-BR.
- Carregando: `Skeleton` ou `Spinner` da @blips/ui num overlay seu
  (`absolute` sobre a área da prévia), mostrado enquanto o seu estado diz que
  o iframe não terminou (`onLoad` do `WebPreviewBody`).
- Painel lateral ao chat: `ResizablePanelGroup` (`../resizable.md`) com a
  conversa de um lado e o `WebPreview` do outro (como um "canvas").
- Prévia + código: `Tabs` da @blips/ui ou `Artifact` (`artifact.md`).

## Exemplo v3 que compila

```tsx
"use client";

import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from "@blips/ai/components/web-preview";
import { Spinner } from "@blips/ui/components/spinner";
import { ArrowClockwiseIcon, ArrowSquareOutIcon } from "@phosphor-icons/react";
import { useState } from "react";

type Log = {
  level: "log" | "warn" | "error";
  message: string;
  timestamp: Date;
};

export function PreviaDoDeploy({
  urlInicial,
  logs,
}: {
  urlInicial: string;
  logs: Log[];
}) {
  const [url, setUrl] = useState(urlInicial);
  const [carregando, setCarregando] = useState(true);
  const [versao, setVersao] = useState(0);

  return (
    <div className="h-[480px] w-full">
      <WebPreview
        defaultUrl={urlInicial}
        onUrlChange={(nova) => {
          setUrl(nova);
          setCarregando(true);
        }}
      >
        <WebPreviewNavigation>
          <WebPreviewNavigationButton
            onClick={() => {
              setCarregando(true);
              setVersao((v) => v + 1);
            }}
            tooltip="Recarregar"
          >
            <ArrowClockwiseIcon className="size-4" />
          </WebPreviewNavigationButton>
          <WebPreviewUrl />
          <WebPreviewNavigationButton
            onClick={() => window.open(url, "_blank", "noopener")}
            tooltip="Abrir em nova aba"
          >
            <ArrowSquareOutIcon className="size-4" />
          </WebPreviewNavigationButton>
        </WebPreviewNavigation>
        {/* overlay próprio: a prop `loading` do WebPreviewBody não tipa */}
        <div className="relative flex flex-1 flex-col">
          <WebPreviewBody
            key={versao}
            onLoad={() => setCarregando(false)}
            title="Prévia do deploy"
          />
          {carregando && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <Spinner />
            </div>
          )}
        </div>
        <WebPreviewConsole logs={logs} />
      </WebPreview>
    </div>
  );
}
```

## Armadilhas

- **Sem altura, não aparece.** A raiz é `size-full` e o iframe `flex-1`:
  envolva num pai com altura definida (`h-[480px]`, `h-dvh`, painel
  redimensionável).
- **`allow-scripts` + `allow-same-origin` na mesma origem anula o sandbox.**
  Conteúdo servido do **mesmo domínio do app** pode remover o próprio
  sandbox e acessar cookies/DOM do app. Sirva páginas geradas por IA em outra
  origem (subdomínio de preview) ou passe um `sandbox` mais restrito
  (ex.: `sandbox="allow-scripts"`) ao `WebPreviewBody`.
- **URL não é controlada.** Trocar `defaultUrl` depois da montagem não muda a
  página. Para navegar por código, remonte com `key` ou passe `src`
  diretamente ao `WebPreviewBody` (que tem prioridade sobre a URL do
  contexto).
- **`timestamp` precisa ser `Date`.** Logs vindos de JSON trazem string; sem
  converter (`new Date(log.timestamp)`), o console quebra ao renderizar.
- **Recarregar não existe pronto.** Os botões são só apresentação: o
  comportamento (voltar, recarregar, abrir) é do app. Recarregar = remontar o
  `WebPreviewBody` (`key`), como no exemplo.
- **`className` no `WebPreviewNavigationButton`/`WebPreviewUrl` substitui o
  estilo padrão** (o spread vem depois): repita `h-8 w-8 p-0` / `h-8 flex-1
  text-sm` se for customizar.
- **A prop `loading` do `WebPreviewBody` não compila com JSX.** Ela é a
  interseção do `loading` nativo do iframe (`"eager" | "lazy"`) com
  `ReactNode`, então um elemento dá `TS2322` (herdado do upstream). Mostre o
  carregamento num overlay seu, como no exemplo.
- **Logs do iframe não chegam sozinhos.** O console só mostra o que você
  passar em `logs`; capturar `console.*` da página exige `postMessage` da
  própria página gerada.
