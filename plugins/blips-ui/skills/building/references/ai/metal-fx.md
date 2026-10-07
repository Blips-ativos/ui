# Metal FX

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Anel de "metal líquido" animado em WebGL2 em volta de um botão, chip ou
ícone, mais metal dentro de letras (`MetalText`) e o selo de novidade
(`MetalBadge`). Envolve o pacote [`metal-fx`](https://metal.jakubantalik.com)
(Jakub Antalik / libraries.dev, MIT), que embute o shader `liquidMetal` da
Paper Shaders (Apache-2.0, `NOTICE` no pacote). Os wrappers `Blips*` aplicam
os padrões da marca: preset `gold` com a tinta trocada pelo `--primary`
#FCBA28, intensidade `0.9` e tema lido da @blips/ui.

## Quando usar (e quando não)

- **Use** para destacar **a** ação de IA principal da tela: o botão que liga o
  assistente, o enviar do prompt, um "Gerar com IA". Um por tela.
- **Use** `BlipsMetalBadge` para marcar uma funcionalidade de IA nova
  (rótulo `Novo`) e `BlipsMetalText` para um título curto de marca.
- **Não use** como indicador de "processando": o anel é permanente. Para
  "o agente está trabalhando aqui", use `border-beam.md` (com `active`); para
  um indicador ao lado de texto, `thinking-orbs.md`.
- **Não use** em listas ou em vários botões: um contexto WebGL compartilhado
  aguenta, mas a ênfase some e o preset é um só para a página (ver Armadilhas).
- **Não use** `BlipsMetalText` em texto corrido ou longo: é uma linha
  (`white-space: nowrap`) pintada em canvas.

## Import

```tsx
import {
  BLIPS_METAL_FX_DEFAULTS,
  BLIPS_METAL_PRESET,
  BLIPS_METAL_TEXT_DEFAULTS,
  BlipsMetalBadge,
  BlipsMetalFx,
  BlipsMetalText,
  isMetalFxSupported,
  MetalBadge, // originais, sem os padrões Blips
  MetalFx,
  MetalText,
  type BlipsMetalFxProps,
  type MetalFxReflectionTarget,
} from "@blips/ai/fx/metal-fx";
```

Prefira sempre os `Blips*`. O `MetalFx` cru vem com `chromatic` (azulado) e
tema só por `prefers-color-scheme`, fora da marca. Também são reexportados
`PRESETS`, `METAL_TEXT_DEFAULTS`, `METAL_BADGE_DEFAULTS`, `useMetalBend`,
`useMetalTextReflection` e os tipos `MetalFxProps`, `MetalFxVariant`,
`MetalFxPreset`, `MetalFxTheme`, `MetalBadgeCore`, `TextInnerShadow`,
`PresetMode`, `PresetName`, `PresetTheme`.

## Peers exigidos

Nenhum: `metal-fx` é dependência da `@blips/ai`. Componente client
(`"use client"` no arquivo da lib). Exige WebGL2 no navegador: sem ele, o filho
aparece sem o anel (`isMetalFxSupported()` diz qual é o caso). No SSR sai um
contêiner transparente; o WebGL liga no cliente.

O componente não importa `ai`: não é preciso instalá-lo.

## API

### `BlipsMetalFx`

Aceita todas as props do `MetalFx`; qualquer prop explícita vence o padrão
Blips. Encaminha `ref` para a `<div>` raiz (`display: inline-flex`).

| Prop | Tipo | Padrão Blips (upstream) | Notas |
|---|---|---|---|
| `children` | `ReactNode` | **obrigatório** | Um único elemento (botão, link, div). Medido por `ResizeObserver`; continua clicável. |
| `brandTint` | `boolean` | `true` | Prop Blips. Tinta do shader no #FCBA28. **Global** (ver Armadilhas). |
| `variant` | `"button" \| "circle"` | `"button"` | `button`: anel de 1 px para pílula; `circle`: anel de 2 px para botão de ícone. |
| `preset` | `"chromatic" \| "silver" \| "gold"` | `"gold"` (`"chromatic"`) | Só vale com `brandTint={false}` em todos da página. |
| `theme` | `"dark" \| "light" \| "auto"` | tema da @blips/ui (`"auto"`) | Sem a prop, lê `data-theme`/classe `.dark` no `<html>` ao vivo. No servidor, `light`. |
| `strength` | `number` 0–1 | `0.9` (`1`) | Opacidade do anel e do halo; o shader segue animando. |
| `glowGain` | `number` | `1` | Multiplica só o halo. |
| `paused` | `boolean` | `false` | Congela o quadro atual. |
| `borderRadius` | `number` (px) | lido do filho | Passe quando a detecção errar. |
| `normalizeHostStyles` | `boolean` | `true` | Neutraliza borda/outline/sombra do filho para não brigar com o anel. |
| `reflectionTargets` | `ReadonlyArray<RefObject \| { ref, strength }>` | — | Vizinhos que recebem reflexo do metal. Só no tema escuro. |
| `disableGlow` | `boolean` | `false` | Tira o halo; o anel fica. |
| `innerShadow` | `boolean \| { offsetY, blur, alpha, color }` | desligado | Brilho na borda interna de cima do anel. |
| `shaderScale` | `number` | da variante (`1.6` / `1.3`) | Zoom do padrão do metal. |
| `ringCssPx` | `number` (px) | da variante (`1` / `2`) | Espessura do anel. |
| `scale` | `number` | `1` | Só se o elemento estiver ampliado (ex.: `zoom: 2`). |
| `mask`, `glowMode` | `MaskFn`, `"mask" \| "ring"` | —, `"mask"` | Máscara própria (metal em glifos); avançado. |
| `className`, `style`, demais props de `<div>` | | | Vão para o contêiner. |

### `BlipsMetalText`

Props do `MetalText`, com `font` e `color` **opcionais** (obrigatórias no
original) e `brandTint`/tema como acima.

| Prop | Tipo | Padrão Blips (upstream) |
|---|---|---|
| `children` | `string` | **obrigatório** |
| `font` | `string` (shorthand CSS `font`) | `"600 24px/1.2 var(--font-sans, Inter), sans-serif"` (obrigatório) |
| `color` | `string` | `"var(--foreground)"` (obrigatório) |
| `strength` | `number` | `1` |
| `metalOpacity` | `number` 0–1 | `0.62` |
| `shaderScale` | `number` | `2.8` |
| `glow` / `glowGain` | `boolean` / `number` | `false` / `2.5` |
| `innerShadow` | `TextInnerShadow \| null` | do upstream (`null` desliga) |
| `reflectionTargets`, `className` | | — |

### `BlipsMetalBadge`

Props do `MetalBadge`, com `brandTint`/tema como acima.

| Prop | Tipo | Padrão Blips (upstream) |
|---|---|---|
| `children` | `string` | `"Novo"` (`"New"`) |
| `scale` | `number` | `1` (pílula de 45×25 px) |
| `strength`, `metalOpacity`, `shaderScale` | `number` | `1`, `0.8`, `1.6` |
| `core`, `gradient`, `glow` | | do upstream |
| `textColor` | `string` | `"#323232"` (o fundo do selo é branco nos dois temas) |
| `reflectionTargets` | | — |

## Composição com a @blips/ui

- Envolva o `Button` da @blips/ui direto. Para `variant="button"`, dê ao
  botão `className="rounded-full"`; para `variant="circle"`, use
  `size="icon"` + `rounded-full`.
- `variant="secondary"` ou `"outline"` no botão deixa o anel aparecer; o
  `default` (fundo `--primary`) compete com a tinta amarela.
- No prompt, envolva só o botão de enviar (`variant="circle"`) e passe o ref
  dos botões vizinhos em `reflectionTargets`.
- `BlipsMetalBadge` ao lado de um `SidebarMenuButton` ou de um título; não
  use `Badge` da @blips/ui por baixo, o selo já é a pílula.

## Exemplo v3 que compila

```tsx
"use client";

import { BlipsMetalBadge, BlipsMetalFx } from "@blips/ai/fx/metal-fx";
import { Button } from "@blips/ui/components/button";
import { ArrowUpIcon, PaperclipIcon, SparkleIcon } from "@phosphor-icons/react";
import { useRef } from "react";

export function AtivarAssistente({ onAtivar }: { onAtivar: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <BlipsMetalFx>
        <Button className="rounded-full" onClick={onAtivar} variant="secondary">
          <SparkleIcon />
          Ativar o assistente
        </Button>
      </BlipsMetalFx>
      <BlipsMetalBadge />
    </div>
  );
}

export function EnviarPrompt() {
  const anexoRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex items-center gap-2">
      <Button aria-label="Anexar" ref={anexoRef} size="icon" variant="ghost">
        <PaperclipIcon />
      </Button>
      <BlipsMetalFx reflectionTargets={[anexoRef]} variant="circle">
        <Button
          aria-label="Enviar"
          className="rounded-full"
          size="icon"
          variant="secondary"
        >
          <ArrowUpIcon />
        </Button>
      </BlipsMetalFx>
    </div>
  );
}
```

## Armadilhas

- **O preset é global.** O `metal-fx` usa um único contexto WebGL e um único
  preset para a página. Com um `Blips*` montado (com `brandTint`), **todo**
  `MetalFx`/`MetalText`/`MetalBadge` da página sai na tinta da marca; quando o
  último desmonta, volta o preset do upstream. Não dá para ter um anel `silver`
  e outro amarelo ao mesmo tempo. Para usar `preset`, passe
  `brandTint={false}` em todos.
- **`MetalText` e `MetalBadge` crus forçam `chromatic`.** Sem um `Blips*`
  montado, eles trocam o preset da página para o azulado. Use as versões
  `Blips*`.
- **`theme="auto"` explícito** volta ao comportamento do upstream (só
  `prefers-color-scheme`) e ignora o toggle de tema do app. Omita a prop.
- **Mais de um filho** ou fragmento quebra a medição: o wrapper espera um
  único elemento.
- **Filho sem raio** faz o anel sair quadrado. Arredonde o filho
  (`rounded-full`) ou passe `borderRadius`.
- **Reflexo no claro** não aparece: `reflectionTargets` só age no tema escuro.
- **Sem WebGL2** (alguns navegadores corporativos, VMs) não há anel; não
  dependa do efeito para comunicar estado.
- O selo e o texto são canvas: dê o rótulo em `children` (vira `aria-label`).
