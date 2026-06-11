# Setup @blips/ui — Vite (SPA React)

Procedimento verificado em Vite 7 com React 19 e React 17.

## 1. Instalar

```bash
pnpm add @blips/ui @phosphor-icons/react
pnpm add -D tailwindcss @tailwindcss/vite
```

`@phosphor-icons/react` como dep direta porque o app importa ícones. Para
formulários, adicione `react-hook-form zod @hookform/resolvers`.

Aviso esperado do pnpm 10: "Ignored build scripts: esbuild" — inofensivo (o
binário vem por optionalDependencies). Em projetos React 17, peer warnings de
`cmdk`/`sonner`/`react-resizable-panels` também são esperados (ver seção
React 17).

## 2. Plugin do Tailwind v4

Em `vite.config.ts`, o plugin first-party (não use PostCSS no Vite):

```ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## 3. CSS de entrada

No topo do CSS importado pelo `main.tsx` (ex.: `src/index.css`):

```css
@import "@blips/ui/globals.css";
```

Traz Tailwind, tw-animate-css, fontes (Inter/Quicksand/JetBrains Mono),
tokens do tema e dark mode. Não adicione `@import "tailwindcss"` de novo, não
copie tokens, não crie `tailwind.config.js`, não adicione `@source` (a
auto-detecção do v4 cobre o `src/` — verificado no CSS gerado).

CSS legado do app: mantenha **abaixo** do import durante a migração — o
cascade preserva as telas antigas.

Opcional (perf): preconnect das fontes no `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

## 4. Exemplo de uso (React 18/19 — subpath)

```tsx
import { Button } from "@blips/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@blips/ui/components/card";
import { Plus } from "@phosphor-icons/react";

export function App() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Clientes recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>
            <Plus />
            Novo cliente
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
```

## React 17 (legado)

A lib suporta React 17 (peer `^17`), com três diferenças **verificadas**:

1. **Imports pelo barrel**, não por subpath:

   ```tsx
   import { Alert, AlertDescription, AlertTitle, Button } from "@blips/ui";
   ```

   Subpath entrega o `.tsx` fonte, e o `tsc --noEmit` do projeto o checa
   contra `@types/react@17` → falha com TS2322 (`LegacyRef` incompatível) no
   próprio `button.tsx`. O barrel usa `dist/index.d.ts` (coberto por
   `skipLibCheck`) e é tree-shakeable. Não há App Router em React 17, então a
   limitação de `"use client"` do barrel não se aplica.

2. **Não use `Command`, `Toaster` (sonner) e `Resizable`** — as deps dessas
   três pedem React 18+. Os peer warnings no install referem-se a elas; os
   demais componentes funcionam (smoke test com `renderToStaticMarkup` em
   React 17.0.2 verificado).

3. **Não atualize o React** para "resolver" os warnings — a adoção da lib não
   exige upgrade; isso é decisão à parte do time.

Quirks conhecidos (não são bugs seus — não persiga):

- **vitest + React 17**: o Node ESM não resolve `react/jsx-runtime`
  extensionless (React 17 não tem export map) ao importar o barrel ESM em
  testes — ajustes locais (`deps.optimizer`, alias, `fallbackCJS`) não
  resolvem de forma limpa. Valide a renderização por bundle SSR do Vite
  (`renderToStaticMarkup`) ou pelo grep do bundle, e não crie infra de teste
  nova só para isso.
- **Phosphor em `require` cru do Node**: o packaging (`type: module` +
  `.cjs.js`) quebra fora de bundlers — irrelevante para o app (Vite resolve).

## 5. Validar

```bash
pnpm build
```

Com o build verde, confirme o tema e as utilities no output:

```bash
CSS=$(ls dist/assets/*.css)
grep -o '#fcba28' "$CSS" | head -1      # token primary da marca
grep -o 'max-w-2xl' "$CSS" | head -1    # utility usada pelo app (ajuste à sua)
```

Se o token não aparecer, o globals não está na cadeia de imports do entry; se
as utilities do app não aparecerem, o CSS de entrada não está sendo importado
pelo `main.tsx`.
