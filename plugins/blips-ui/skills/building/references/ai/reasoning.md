# Reasoning

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Bloco recolhível com o raciocínio do modelo ("Pensando…" / "Pensou por 4 s").
Abre sozinho quando o streaming começa, mede a duração e fecha sozinho 1 s
depois que o streaming termina. O conteúdo é markdown renderizado pelo
Streamdown. Adaptado do `reasoning` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para a parte `reasoning` de uma mensagem do assistente (AI SDK:
  `ReasoningUIPart`; AgentOS do Agno: eventos de raciocínio do run), um bloco
  por parte.
- **Não use** para uma lista de passos com status (buscando, consultando,
  redigindo): isso é `chain-of-thought.md`.
- **Não use** para o indicador "digitando" sem texto de raciocínio: use
  `Shimmer` (`@blips/ai/components/shimmer`), o `Marker` da @blips/ui ou o
  `BlipsThinkingOrb` (`thinking-orbs.md`).
- **Não use** para a resposta final: ela vai em `MessageResponse`
  (`@blips/ai/components/message`).

## Import

```tsx
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
  useReasoning,
} from "@blips/ai/components/reasoning";
```

Nunca `import … from "@blips/ai"`: não existe barrel.

## Peers exigidos

O componente importa o Streamdown em runtime. Sem estes pacotes no
`package.json` do app, o build quebra:

```bash
pnpm add @blips/ai streamdown @streamdown/code @streamdown/math @streamdown/mermaid @streamdown/cjk
```

Como o `ReasoningContent` renderiza com o Streamdown, valem os mesmos estilos
do `MessageResponse`: `@import "streamdown/styles.css"` e os `@source` do
`dist` do Streamdown e dos plugins no CSS do app (ver "Estilos do Streamdown"
em `message.md`).

O componente não importa `ai`. O pacote só entra se você tipar as parts com
`ReasoningUIPart`, como no exemplo: peer opcional e só de tipos (sempre
`import type`), e como a @blips/ai publica o fonte `.tsx`, num projeto
TypeScript instale como **devDependency** (`pnpm add -D ai`).

## API

| Componente | Props reais | Notas |
|---|---|---|
| `Reasoning` | `isStreaming?: boolean` (padrão `false`), `open?`, `defaultOpen?`, `onOpenChange?: (open: boolean) => void`, `duration?: number` (segundos), mais as props do `Collapsible` da @blips/ui (Base UI) e da `<div>` | `defaultOpen` padrão = `isStreaming`. `defaultOpen={false}` bloqueia a abertura automática. `onOpenChange` recebe só o booleano (o `eventDetails` do Base UI é descartado). `duration` controlada substitui a medição interna. Classe base: `not-prose mb-4`. |
| `ReasoningTrigger` | `getThinkingMessage?: (isStreaming: boolean, duration?: number) => ReactNode`, mais as props do `CollapsibleTrigger` | Sem `children`, desenha `BrainIcon` + mensagem + `CaretDownIcon` girando. Com `children`, você desenha tudo. |
| `ReasoningContent` | `children: string` (obrigatório, markdown), mais as props do `CollapsibleContent` | Renderiza `<Streamdown>` com os plugins `cjk`, `code`, `math`, `mermaid`. Não aceita JSX como filho. |
| `useReasoning()` | retorna `{ isStreaming, isOpen, setIsOpen, duration }` | Para triggers customizados. Lança erro fora de `Reasoning`. |

## Composição com a @blips/ui

- Fica dentro do `MessageContent` do `Message` da @blips/ui (reexportado por
  `@blips/ai/components/message`), **antes** do `MessageResponse`, sem
  `Bubble`: raciocínio não é balão.
- Alinhamento da linha: `messageAlign(message.role)` no `align` do `Message`.
- `isStreaming` vem do app: no AI SDK, `status === "streaming"` **e** a parte é
  a última da última mensagem; no AgentOS, entre o primeiro e o último evento
  de raciocínio do run. O mapeamento é do app, não da lib.
- Os estados de abrir/fechar usam o `Collapsible` da @blips/ui: seletores
  `data-open`/`data-closed`, nunca `data-[state=open]`.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@blips/ai/components/reasoning";
import { Shimmer } from "@blips/ai/components/shimmer";
import type { ReasoningUIPart } from "ai";

// O ReasoningTrigger é um <button>: use <span> (e Shimmer as="span"), não <p>.
const mensagemDeRaciocinio = (isStreaming: boolean, duration?: number) => {
  if (isStreaming || duration === 0) {
    return (
      <Shimmer as="span" duration={1}>
        Pensando…
      </Shimmer>
    );
  }
  if (duration === undefined) {
    return <span>Pensou por alguns segundos</span>;
  }
  return <span>Pensou por {duration} s</span>;
};

export function RaciocinioDoAgente({
  part,
  isLastPart,
  isStreaming,
}: {
  part: ReasoningUIPart;
  isLastPart: boolean;
  isStreaming: boolean;
}) {
  return (
    <Reasoning className="w-full" isStreaming={isStreaming && isLastPart}>
      <ReasoningTrigger getThinkingMessage={mensagemDeRaciocinio} />
      <ReasoningContent>{part.text}</ReasoningContent>
    </Reasoning>
  );
}
```

## Armadilhas

- **Textos padrão em inglês.** Sem `getThinkingMessage`, aparece
  "Thinking..." / "Thought for N seconds". Em produto pt-BR, passe sempre uma
  função como `mensagemDeRaciocinio` acima.
- **`isStreaming` em todas as partes.** Passar o `status` do chat cru para
  todos os blocos reabre raciocínios antigos. Restrinja à última parte da
  última mensagem.
- **Não fecha durante o streaming.** Enquanto `isStreaming` for `true` (e
  sem `defaultOpen={false}`), o efeito de auto-abertura reabre o bloco no
  mesmo instante em que a pessoa clica para fechar. Se precisar permitir
  fechar no meio, passe `defaultOpen={false}` (perde a auto-abertura) ou
  controle com `open` + `onOpenChange`.
- **Fecha sozinho uma vez.** Depois do auto-close, o bloco não fecha de novo
  sozinho; se o usuário reabrir, fica aberto. Para controle total, use
  `open` + `onOpenChange`.
- **`children` não-string em `ReasoningContent`** não compila. Para conteúdo
  rico, monte com `CollapsibleContent` da @blips/ui dentro do `Reasoning`.
- **`<p>` dentro do trigger.** O `ReasoningTrigger` renderiza um `<button>`
  (`CollapsibleTrigger` do Base UI); o `getThinkingMessage` padrão devolve
  `<p>`, que é HTML inválido ali. Na sua função, devolva `<span>` e
  `<Shimmer as="span">`.
- **Peers esquecidos.** `streamdown` e os quatro `@streamdown/*` são
  opcionais no `package.json` da lib, mas obrigatórios para quem importa
  este componente.
