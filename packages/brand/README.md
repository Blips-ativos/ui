# @blips/brand

Ativos de marca da **Blips** — logos, b-mark, favicon e ícones — mais o
componente React `<Logo/>` (SVG inline, vetorial e recolorível).

Os vetores foram derivados dos ativos oficiais da Blips e conferidos contra os
originais. O amarelo da marca é `#FCBA28` (`oklch(0.82 0.1788 79.94)`, o mesmo
token `--primary` do `@blips/ui`).

## Componente `<Logo/>`

```tsx
import { Logo } from "@blips/brand";

// Logo completo — o texto usa currentColor, então adapta a light/dark sozinho
<Logo />
<Logo variant="full" className="h-8" />

// Só o b-mark (recolorível via currentColor)
<Logo variant="mark" className="size-8 text-primary" />

// b-mark no círculo amarelo (app-icon)
<Logo variant="mark-circle" className="size-10" />
```

| `variant`      | Conteúdo                                   | Cor                                         |
| -------------- | ------------------------------------------ | ------------------------------------------- |
| `full` (padrão)| Círculo amarelo + b branco + wordmark      | Texto em `currentColor`; círculo/b fixos    |
| `mark`         | Só o b-mark                                | `currentColor` (use `text-primary` p/ amarelo) |
| `mark-circle`  | b branco dentro do círculo amarelo         | Fixa (amarelo da marca)                     |

`<Logo/>` aceita todas as props de `<svg>`. Para uso decorativo (com texto ao
lado), passe `aria-hidden`.

## Cores

```ts
import { BLIPS_YELLOW, BLIPS_YELLOW_OKLCH } from "@blips/brand";
```

## Assets estáticos

Importáveis por caminho (`@blips/brand/assets/...`) para favicon, manifest, og
images, e-mails ou contextos não-React:

```
assets/
├── logo/
│   ├── blips-logo.svg          # wordmark, texto preto (fundo claro) — vetor
│   ├── blips-logo-white.svg    # wordmark, texto branco (fundo escuro) — vetor
│   ├── blips-logo.png          # 1436×463
│   └── blips-logo-white.png    # 1725×630
├── mark/
│   ├── blips-mark.svg          # b-mark recolorível (currentColor) — vetor
│   ├── blips-mark-circle.svg   # círculo amarelo + b branco — vetor
│   └── blips-mark.png          # 1956×1954, círculo, fundo transparente
└── favicon/
    ├── favicon.svg             # = mark-circle (vetorial)
    ├── favicon.ico             # 64×64
    ├── apple-touch-icon.png    # 180×180
    ├── icon-192.png            # 192×192
    └── icon-512.png            # 512×512
```

Exemplo (Next.js, `app/layout.tsx`):

```ts
import favicon from "@blips/brand/assets/favicon/favicon.svg";
```

> Vetores `blips-*.svg` e `blips-mark*.svg` são auto-traçados dos ativos
> oficiais. O wordmark "blips" é tipografia custom; o vetor é fiel mas não
> substitui o arquivo-mestre de design quando houver.
