# Aspect Ratio

Import: `@blips/ui/components/aspect-ratio`

Mantém uma proporção largura/altura fixa para o conteúdo (imagem, vídeo, mapa).
Export único: `AspectRatio`.

## Notas comuns

- Filhos com `absolute inset-0` / `size-full` / `fill` (Next `Image`) preenchem a caixa nas duas versões.
- Sem variantes nem CVA.

> A API difere entre as versões (`ratio` obrigatório e DOM diferente na v3). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Não usa primitiva: é uma `div` simples (`React.ComponentProps<"div"> & { ratio: number }`), segura em Server Component (sem `"use client"`).

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `ratio` | `number` | **obrigatório** | Proporção (`16 / 9`, `4 / 3`, `1`). Sem ela, não compila. |
| `className` | `string` | — | Vai direto para o elemento com a proporção (`relative aspect-(--ratio)`). |

A proporção vem do CSS `aspect-ratio` via variável `--ratio`. Não sobrescreva `--ratio`/`aspect-ratio` por `style`. Não há `asChild` nem `render`.

```tsx
import { AspectRatio } from "@blips/ui/components/aspect-ratio";
import Image from "next/image";

export function CapaProduto() {
  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
      <Image
        src="/capas/produto.jpg"
        alt="Foto do produto"
        fill
        className="object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </AspectRatio>
  );
}

// Quadrado
<AspectRatio ratio={1} className="rounded-md bg-muted">
  <img src="/avatar.jpg" alt="Avatar" className="size-full rounded-md object-cover" />
</AspectRatio>
```

## v2.x — Radix

Primitiva: `@radix-ui/react-aspect-ratio` (`"use client"`).

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `ratio` | `number` | `1` | Proporção. Opcional. |
| `asChild` | `boolean` | `false` | Troca o elemento interno. |
| `className` | `string` | — | Vai para a `div` interna absoluta (o Radix renderiza um wrapper externo com `padding-bottom`). |

```tsx
import Image from "next/image"
import { AspectRatio } from "@blips/ui/components/aspect-ratio"

export function CapaProduto() {
  return (
    <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
      <Image
        src="/capas/produto.jpg"
        alt="Foto do produto"
        fill
        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </AspectRatio>
  )
}

// 4:3 para vídeo
<AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg bg-black">
  <iframe src="..." className="h-full w-full" />
</AspectRatio>
```

## Exemplos na docs

`aspect-ratio-demo`, `aspect-ratio-square`, `aspect-ratio-portrait` (v3).
