# Shimmer

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/shimmer`

Texto com um brilho que atravessa da direita para a esquerda em loop: o
"Pensando…", "Buscando contratos…", "Gerando resposta…" de um agente enquanto o
primeiro token não chega. Feito com `motion` (gradiente em `background-clip:
text`), usando os tokens `--color-muted-foreground` e `--color-background` do
tema da @blips/ui.

## Quando usar (e quando não)

- **Use** para status transitório de IA, curto, em uma linha: entre o envio
  (`status === "submitted"`) e o primeiro part de texto; no título de um
  `Reasoning`/`Tool` em andamento.
- **Não use** para carregamento de dados de página: isso é `Skeleton` ou
  `Spinner` da @blips/ui.
- **Não use** para status permanente ("Trabalhou por 42s"): isso é `Marker` da
  @blips/ui (`../marker.md`), estático.
- Para um indicador visual (não texto) de "pensando", veja `ThinkingOrbs`
  (`@blips/ai/fx/thinking-orbs`).

## Peers exigidos

Nenhum. `motion` já é dependência da @blips/ai.

## API

Export: `Shimmer` (memo) e o tipo `TextShimmerProps`.

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `children` | `string` | — | **Só string**: o tamanho do texto calcula a largura do brilho. JSX não compila. |
| `as` | `ElementType` | `"p"` | Elemento renderizado (via `motion.create`, com cache por tag). Use `"span"` dentro de frase/botão. |
| `className` | `string` | — | Mesclado com `cn`. A cor base vem do gradiente; não use `text-*` para colorir (o texto é transparente). |
| `duration` | `number` | `2` | Segundos por passada. |
| `spread` | `number` | `2` | Largura do brilho = `children.length * spread` px. |

## Composição com a @blips/ui

- Dentro de uma mensagem do assistente: `Message` + `MessageContent` da @blips/ui
  com o `Shimmer` no lugar do `MessageResponse` enquanto não há texto.
- Dentro de `Marker`: `<Marker><MarkerContent><Shimmer as="span">…</Shimmer></MarkerContent></Marker>`
  quando quiser o espaçamento/ícone do Marker com o brilho.
- Tamanho de fonte herdado: o `Message` da @blips/ui já é `text-xs/relaxed`.

## Exemplo v3

```tsx
"use client";

import { Shimmer } from "@blips/ai/components/shimmer";
import { Message, MessageContent } from "@blips/ui/components/message";

export function AgentePensando({ etapa }: { etapa?: string }) {
  return (
    <Message>
      <MessageContent>
        <Shimmer as="span" duration={1.5}>
          {etapa ?? "Pensando…"}
        </Shimmer>
      </MessageContent>
    </Message>
  );
}
```

## Armadilhas

- `children` precisa ser `string`. `<Shimmer>Buscando {n} contratos</Shimmer>`
  vira array e não compila: monte a string antes (template literal).
- O padrão é `<p>`: dentro de `<p>`, `<button>` ou `<span>` gera HTML inválido.
  Passe `as="span"`.
- Não mantenha o Shimmer depois que o texto começou a chegar: troque pelo
  `MessageResponse`. Shimmer eterno parece travamento.
- `prefers-reduced-motion` não é tratado pelo componente: se o app precisa
  respeitar, renderize texto estático (`text-muted-foreground`) nesse caso.
- Textos de status em pt-BR, com reticências (`…`).
