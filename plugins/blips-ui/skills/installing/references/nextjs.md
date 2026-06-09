# Setup @blips/ui — Next.js (App Router)

Procedimento verificado em Next 15 + React 19 (espelha o app de docs da
própria lib). Pressupõe App Router; para Pages Router o CSS entra em
`pages/_app.tsx` e os gotchas de RSC não se aplicam.

## 1. Instalar

```bash
pnpm add @blips/ui @phosphor-icons/react
pnpm add -D tailwindcss @tailwindcss/postcss postcss
```

`@phosphor-icons/react` entra como dep direta porque o código do app importa
ícones. Se o app for ter formulários, adicione também:

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

## 2. PostCSS

Crie `postcss.config.mjs` na raiz do app:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

> Não use `export { default } from "@blips/ui/postcss.config"` — o arquivo
> está fora do tarball nas versões ≤ 2.0.0 (bug conhecido). O conteúdo acima é
> idêntico e não depende da versão da lib.

## 3. transpilePackages (obrigatório)

Os exports de componentes da lib apontam para `.tsx` fonte — o Next precisa
compilá-los. Em `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // @blips/ui publica componentes como source .tsx — o Next compila o pacote.
  transpilePackages: ["@blips/ui"],
};

export default nextConfig;
```

Sem isso o build falha com erro de parse nos `.tsx` de node_modules.

**Pré-check do tsconfig**: `moduleResolution` precisa ser `"bundler"` (padrão
do Next 15+) ou `node16`+ — `"node"` **não resolve os subpath exports** da lib
(verificado em repo real). Se o repo ainda usa `"node"`, migre para
`"bundler"` (mudança mínima) e valide com `tsc --noEmit` completo antes de
seguir. Em repos com shadcn CLI antigo, ajuste também `components.json` →
`"tailwind": {"config": ""}` (convenção v4).

## 4. CSS global

`app/globals.css` (crie se não existir) com uma única linha:

```css
@import "@blips/ui/globals.css";
```

Isso já traz Tailwind, tw-animate-css, fontes (Inter/Quicksand/JetBrains
Mono), todos os tokens do tema e o dark mode. Não adicione `@import
"tailwindcss"` de novo, não copie tokens, não crie `tailwind.config.js`, não
adicione `@source` (a auto-detecção cobre o app).

No `app/layout.tsx`:

```tsx
import "./globals.css";
```

e `className="antialiased"` no `<body>` — background, cor e fonte vêm do
`@layer base` da lib.

CSS pré-existente do app: mantenha os `@import`/regras legados **depois** do
import do globals, e migre gradualmente.

## 5. Exemplo de uso

Página Server Component (padrão do App Router):

```tsx
import { Button } from "@blips/ui/components/button";
import { ChatCircleText } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Central de Ajuda
      </h1>
      <Button>
        <ChatCircleText />
        Abrir chamado
      </Button>
    </main>
  );
}
```

Gotchas RSC (verificados):

- **Ícones em Server Components**: importe de
  `@phosphor-icons/react/dist/ssr`. O entrypoint padrão usa Context e quebra
  em RSC. Em client components (`"use client"`), use `@phosphor-icons/react`.
- **Imports sempre por subpath** (`@blips/ui/components/<nome>`): o barrel
  `@blips/ui` compilado não tem `"use client"` e quebra o App Router.
- Componentes interativos da lib (Dialog, Dropdown, Form...) precisam viver em
  client components — mantenha-os como **folhas** client e o resto da página
  server.

## 6. Validar

```bash
pnpm build
```

Depois do build verde, confirme que o tema e o componente chegaram no output:

```bash
grep -o '#fcba28' .next/static/css/*.css | head -1     # token primary da marca
grep -o 'data-slot="button"' .next/server/app/index.html | head -1
```

Se o token não aparecer, o globals não está sendo importado; se o data-slot
não aparecer, o componente não está na página.

**Todas as rotas dinâmicas (ƒ no sumário do build)?** Não existe HTML
prerenderizado para o grep — valide em runtime (verificado em 2 repos reais):

```bash
pnpm start &   # ou node .next/standalone/server.js
curl -s http://localhost:3000/<rota-tocada> | grep -o 'data-slot="button"' | head -1
```

Se a rota depende de API/env, suba um stub mínimo ou use env dummy — registre
o que fez. Falha pré-existente de build por env ausente (ex.: secret de auth
em "Collecting page data") não é sua: rode com env dummy e compare a
assinatura pré/pós adoção.

## Monorepo (pnpm workspaces / turbo)

Tudo acima vale igual, mas **no app consumidor** (`apps/web` etc.):
`pnpm add` com `--filter <app>`, e `postcss.config.mjs`, `next.config.ts` e o
CSS global ficam no app — não na raiz do workspace.
