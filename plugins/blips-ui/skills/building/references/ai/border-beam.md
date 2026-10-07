# Border Beam

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Feixe de luz animado que percorre a borda de um elemento (ou pulsa em volta
dele) para sinalizar "o agente está trabalhando aqui". Envolve o pacote
[`border-beam`](https://libraries.dev/beam) (Jakub Antalik / libraries.dev, MIT);
o `BlipsBorderBeam` aplica os padrões da marca: paleta `gold` (a mais próxima
do `--primary` #FCBA28), variação de matiz curta, brilho contido e tema
lido da @blips/ui.

## Quando usar (e quando não)

- **Use** para destacar, durante um processamento de IA, o cartão do agente,
  o campo do prompt ou o botão que disparou a geração. Ligue com `active` só
  enquanto houver trabalho.
- **Não use** como decoração permanente nem em vários elementos ao mesmo
  tempo: o efeito perde o sentido de "isto está vivo agora".
- **Não use** como indicador de carregamento de dados comuns: use `Spinner`
  ou `Skeleton` da @blips/ui.
- Para um indicador pequeno ao lado de texto ("Pensando…"), use
  `thinking-orbs.md`.

## Import

```tsx
import {
  BLIPS_BORDER_BEAM_DEFAULTS,
  BlipsBorderBeam,
  BorderBeam, // original, sem os padrões Blips
  type BlipsBorderBeamProps,
} from "@blips/ai/fx/border-beam";
```

Prefira sempre `BlipsBorderBeam`. O `BorderBeam` cru vem com `colorful` e
tema `dark` por padrão, fora da marca.

## Peers exigidos

Nenhum: `border-beam` é dependência da `@blips/ai`. Componente client
(`"use client"` no arquivo da lib).

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

`BlipsBorderBeam` aceita todas as props do `BorderBeam` original; qualquer
prop explícita vence o padrão Blips. Encaminha `ref` para a `<div>` raiz.

| Prop | Tipo | Padrão Blips (upstream) | Notas |
|---|---|---|---|
| `children` | `ReactNode` | **obrigatório** | O elemento que recebe o feixe. |
| `size` | `"sm" \| "md" \| "line" \| "pulse-outside" \| "pulse-inner"` | `"md"` | `sm`: botão/compacto; `md`: borda inteira de cartão; `line`: brilho que corre só na base; `pulse-*`: respira sem girar (fora ou dentro da borda). |
| `colorVariant` | `"colorful" \| "mono" \| "ocean" \| "sunset" \| "forest" \| "candy" \| "ice" \| "gold"` | `"gold"` (`colorful`) | Fique no `gold`; `mono` é aceitável em superfícies neutras. |
| `theme` | `"dark" \| "light" \| "auto"` | tema da @blips/ui (`dark`) | Sem a prop, lê `data-theme`/classe `.dark` no `<html>` e segue mudanças ao vivo; cai para `prefers-color-scheme`. No servidor, `light`. |
| `hueRange` | `number` (graus) | `12` (`30`) | Faixa da animação de matiz. |
| `glowSize` | `number` | `0.85` (`1`) | Multiplica o raio do halo. |
| `strength` | `number` 0–1 | `0.85` (`1`) | Opacidade do efeito (não afeta os filhos). |
| `active` | `boolean` | `true` | Liga/desliga com fade. |
| `duration` | `number` (s) | `1.96` (`2.4` em `line`) | Velocidade da volta. |
| `staticColors` | `boolean` | `false` | Desliga a variação de matiz. |
| `borderRadius` | `number` (px) | detecta do 1º filho | Passe quando a detecção errar. |
| `brightness`, `saturation` | `number` | presets do upstream | Ajuste fino; evite. |
| `css` | `string` | — | CSS extra; `{id}` vira o id da instância. |
| `onActivate`, `onDeactivate` | `() => void` | — | Fim do fade-in / fade-out. |
| `className`, `style`, demais props de `<div>` | | | Vão para o contêiner. |

`BLIPS_BORDER_BEAM_DEFAULTS` exporta os padrões (`size`, `colorVariant`,
`hueRange`, `glowSize`, `strength`) para quem precisar do `BorderBeam` cru
com a mesma aparência.

## Composição com a @blips/ui

- Envolva o componente da @blips/ui direto (`Card`, `Button`, o
  `InputGroup` do prompt); o raio é detectado do primeiro filho. Dê ao
  wrapper o mesmo arredondamento (`className="rounded-xl"` para `Card`).
- Ligue com o estado do chat: `active={status === "streaming"}` (AI SDK) ou
  enquanto o run do AgentOS estiver aberto.
- Em botão, use `size="sm"`.

## Exemplo v3 que compila

```tsx
"use client";

import { BlipsBorderBeam } from "@blips/ai/fx/border-beam";
import { Button } from "@blips/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@blips/ui/components/card";

export function CartaoDoAgente({ respondendo }: { respondendo: boolean }) {
  return (
    <BlipsBorderBeam active={respondendo} className="rounded-xl">
      <Card>
        <CardHeader>
          <CardTitle>Salvador</CardTitle>
        </CardHeader>
        <CardContent>
          {respondendo ? "Respondendo…" : "Pronto para ajudar."}
        </CardContent>
      </Card>
    </BlipsBorderBeam>
  );
}

export function BotaoGerando() {
  return (
    <BlipsBorderBeam size="sm">
      <Button>Gerando resumo</Button>
    </BlipsBorderBeam>
  );
}
```

## Armadilhas

- **`theme="auto"` explícito** volta ao comportamento do upstream (só
  `prefers-color-scheme`) e ignora o toggle de tema do app. Omita a prop.
- **Sempre ligado.** Sem `active`, o feixe gira para sempre. Amarre ao estado
  de processamento.
- **Filho sem raio próprio** faz o feixe sair quadrado. Passe `borderRadius`
  ou arredonde o filho.
- **Cores fora da marca.** Evite trocar `colorVariant` para `colorful`,
  `candy` etc.; o amarelo é a assinatura de IA da Blips.
- O upstream respeita `prefers-reduced-motion`; não force animação extra por
  cima.
