# Image FX

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Mosaico animado em WebGL que ocupa o lugar de uma imagem enquanto ela é
gerada e a revela (dissolvendo célula a célula) quando fica pronta. Envolve o
pacote [`img-fx`](https://image.jakubantalik.com) (Jakub Antalik /
libraries.dev, MIT); o `BlipsImageGeneration` aplica os padrões da marca:
paleta dos presets re-tingida para o `--primary` #FCBA28 (escuro) e para o
âmbar de `--chart-4` (claro), fundo no token `--card`, tema lido da @blips/ui
e células menores para a densidade mira.

## Quando usar (e quando não)

- **Use** como placeholder de uma imagem que o agente está gerando (tool de
  geração de imagem, capa, ilustração) e para revelar o resultado quando a
  URL chegar.
- **Use** `triggerRegenerate` no "gerar outra": a imagem atual se desfaz no
  mosaico e a próxima entra.
- **Não use** como skeleton de imagem comum carregando da rede: use
  `Skeleton` da @blips/ui. O efeito diz "IA criando", não "carregando".
- **Não use** em muitos cartões ao mesmo tempo (grades longas): um contexto
  WebGL é compartilhado, mas cada instância custa GPU. Prefira poucos.
- Para indicar trabalho do agente em volta de um cartão, use
  `border-beam.md`; ao lado de texto, `thinking-orbs.md`.

## Import

```tsx
import {
  BLIPS_IMG_FX_CARD_BG,
  BLIPS_IMG_FX_DEFAULTS,
  BLIPS_IMG_FX_PALETTES,
  BlipsImageGeneration,
  ImageGeneration, // original, sem os padrões Blips
  setFrameRate,
  setMaxDpr,
  type BlipsImageGenerationProps,
  type BlipsImgFxTone,
  type CyclePhase,
  type ImageGenerationHandle,
  type ImageGenerationPreset,
} from "@blips/ai/fx/img-fx";
```

Prefira sempre `BlipsImageGeneration`. O `ImageGeneration` cru vem em cinza,
com fundo `#0f0f0f`/`#f5f5f5`, fora dos tokens da @blips/ui.

## Peers exigidos

- **`three` (`>=0.149.0`)** — peer opcional da `@blips/ai`, mas **exigido**
  por este efeito: `pnpm add three`. Sem ele, o import de
  `@blips/ai/fx/img-fx` quebra o build. O `img-fx` em si já é dependência da
  `@blips/ai`.
- Componente client (`"use client"` no arquivo da lib). No SSR sai só o
  contêiner com o filho; o WebGL liga no cliente.

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

`BlipsImageGeneration` aceita todas as props do `ImageGeneration` original
(mais as de `<div>`, exceto `children`); qualquer prop explícita vence o
padrão Blips. Encaminha `ref` como `ImageGenerationHandle`.

| Prop | Tipo | Padrão Blips (upstream) | Notas |
|---|---|---|---|
| `children` | `ReactNode` | **obrigatório** | Um único filho; define tamanho e raio. O mosaico pinta **por cima** dele. |
| `tone` | `"primary" \| "neutral"` | `"primary"` (só Blips) | `neutral` mantém a paleta cinza do upstream. Ignorado se `colors` vier. |
| `preset` | `"pixels-organic" \| "pixels-mechanic" \| "sweep-gradient"` | `"pixels-organic"` | `sweep-gradient` é a faixa diagonal, leitura mais direta de "gerando". |
| `theme` | `"auto" \| "dark" \| "light"` | tema da @blips/ui (`auto`) | Sem a prop ou com `auto`, lê `data-theme`/classe `.dark` no `<html>` e passa fixo ao original; no servidor e na hidratação, `light`. |
| `pixelScale` | `number` | `0.75` (`1`) | Tamanho da célula; `2` = mais grossa. |
| `strength` | `number` 0–1 | `0.9` (`1`) | Opacidade do mosaico. |
| `cardBg` | `string` (cor CSS) | `--card`: `#ffffff` / `#171717` (do preset) | Fundo do contêiner e referência de contraste do shader. Passe hex/`rgb()`; `var(--x)` não é resolvido pelo shader. |
| `colors` | `(string \| null \| undefined)[]` (até 7) | `BLIPS_IMG_FX_PALETTES[preset][tema]` | Slot `null` mantém a cor do preset. |
| `images` | `string \| string[]` | `[]` | Pool da revelação; sorteia sem repetir a última. |
| `autoReveal` | `boolean` | `false` | Ciclo automático mosaico → imagem → mosaico. |
| `revealDelayRange` | `[number, number]` (s) | `[2, 4]` | Intervalo entre revelações. |
| `revealInitialDelay` | `number \| [number, number]` (s) | 0–1,5 s aleatório | Atraso da 1ª revelação. |
| `revealHoldMs` | `number \| [number, number]` | `2000` | Tempo da imagem visível. |
| `revealFadeOutMs` | `number` | `300` | Fade de volta ao mosaico. |
| `borderRadius` | `number` (px) | lido do 1º filho | Passe quando a detecção errar. |
| `paused` | `boolean` | `false` | Congela shader e ciclo. |
| `onCycle` | `(e: { phase: CyclePhase; src: string \| null }) => void` | — | Fases `idle`, `reveal`, `visible`, `hide`. |
| `excludeSrcs` | `() => string[] \| Set<string> \| null \| undefined` | — | Evita a mesma imagem em dois cartões ao mesmo tempo. |
| `className`, `style`, demais props de `<div>` | | | Vão para o contêiner. |

`ImageGenerationHandle` (pelo `ref`):

| Membro | O que faz |
|---|---|
| `triggerReveal({ hold?: "auto" \| "manual" })` | Revela uma imagem; `manual` mantém visível até `triggerHide()`. No-op sem `images` ou com revelação em curso. |
| `triggerHide()` | Volta ao mosaico. |
| `triggerRegenerate({ durationMs?, tintFromImage?, autoReveal? })` | Desfaz a imagem atual e revela a próxima (padrão 4000 ms). No-op sem imagem visível. |
| `isImageActive()` | `true` nas fases `reveal`, `visible`, `hide`. Não é reativo: para rótulo de botão, guarde a fase de `onCycle` em estado. |
| `element` | A `<div>` raiz. |

`BLIPS_IMG_FX_DEFAULTS` (`preset`, `pixelScale`, `strength`),
`BLIPS_IMG_FX_PALETTES` e `BLIPS_IMG_FX_CARD_BG` servem para dar ao
`ImageGeneration` cru a mesma aparência. `setFrameRate(fps)` (padrão 10,
até 60) e `setMaxDpr(dpr)` (padrão `1.25`) são globais da página.

## Composição com a @blips/ui

- O filho é a "moldura" da imagem: um `div` com `rounded-xl border bg-card`
  e tamanho fixo (`size-64`, `aspect-square w-full`). O contêiner é
  `inline-block`; para ocupar a largura, dê `className="block w-full"` ao
  wrapper e `w-full` ao filho.
- Dentro de `Card`, coloque o efeito no `CardContent` e os botões
  (`Button` "Gerar outra", "Descartar") no `CardFooter`.
- Amarre ao estado da tool de imagem: enquanto `state` não é
  `output-available` (AI SDK) ou o evento de tool do AgentOS não terminou,
  deixe o mosaico; quando a URL chegar, ponha-a em `images` e chame
  `triggerReveal({ hold: "manual" })` num efeito.
- A imagem final, depois de revelada, pode continuar no efeito (fica
  visível) ou ser trocada pelo componente `image` da @blips/ai.

## Exemplo v3 que compila

```tsx
"use client";

import {
  BlipsImageGeneration,
  type CyclePhase,
  type ImageGenerationHandle,
} from "@blips/ai/fx/img-fx";
import { Button } from "@blips/ui/components/button";
import { useEffect, useRef, useState } from "react";

export function ImagemGerada({ url }: { url?: string }) {
  const ref = useRef<ImageGenerationHandle>(null);
  const [fase, setFase] = useState<CyclePhase>("idle");

  useEffect(() => {
    if (url) ref.current?.triggerReveal({ hold: "manual" });
  }, [url]);

  return (
    <div className="flex flex-col items-start gap-3">
      <BlipsImageGeneration
        images={url ? [url] : []}
        onCycle={(e) => setFase(e.phase)}
        ref={ref}
      >
        <div className="size-64 rounded-xl border bg-card" />
      </BlipsImageGeneration>
      <Button
        disabled={fase !== "visible"}
        onClick={() => ref.current?.triggerHide()}
        variant="outline"
      >
        Descartar
      </Button>
    </div>
  );
}
```

## Armadilhas

- **Esquecer `three`.** É peer opcional da `@blips/ai` (outros componentes
  não precisam), mas este efeito não roda sem ele.
- **`theme` fixo** (`"dark"`/`"light"`) ignora o toggle de tema do app.
  Omita a prop.
- **`cardBg` com `var(--card)`** pinta o fundo certo, mas o shader não
  resolve `var()` e perde a referência de contraste. Use hex ou `rgb()`.
- **`images` recriado a cada render** (array literal novo) reenvia o pool ao
  ciclo a cada render; memorize (`useMemo`) quando vier de estado.
- **Imagem de outra origem sem CORS**: a revelação funciona, mas o
  `triggerRegenerate` não consegue amostrar a cor e usa a paleta do preset.
- **Cores fora da marca.** Evite `colors` arbitrárias; o amarelo é a
  assinatura de IA da Blips.
- O efeito pausa sozinho fora da tela (`IntersectionObserver`); não monte
  e desmonte para economizar, use `paused`.
