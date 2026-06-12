# Design — Aba "Marca" nos docs (@blips/docs)

- **Data:** 2026-06-12
- **Status:** aprovado (design) — aguardando revisão da spec
- **Repo:** `frontend/ui` · site: `apps/docs` (fumadocs, Next 16, `output: "export"`)

## Contexto e objetivo

Criar uma aba **"Marca"** no site de documentação para servir de vitrine única
do branding da Blips: logos e b-mark renderizados ao vivo (componente `<Logo/>`
do `@blips/brand`), cores da marca, download dos arquivos e diretrizes de uso.
Hoje os docs têm duas abas ("Componentes", "Skills"); esta é a terceira.

## Decisões (já alinhadas)

- **Conteúdo:** 4 seções — Logos+símbolo ao vivo, Cores, Downloads, Diretrizes.
- **Estrutura:** página única rolável (`brand/index.mdx`), com TOC automático.
- **Abordagem A (híbrida):** reusar `<ComponentPreview>` para os exemplos de
  código do `<Logo/>`; criar 2 componentes custom só para o que ele não cobre
  (cores e downloads).
- **Rótulo da aba:** "Marca".

## Não-objetivos (YAGNI)

- "Baixar tudo (.zip)".
- Troca de tema (dark) dentro da página.
- Geração on-the-fly de PNG/og-image.
- Reescrever o `ComponentPreview` ou o pipeline de registry.

## Arquitetura (unidades)

### U1 — Navegação
`apps/docs/components/site-header.tsx` → adicionar em `NAV_ITEMS`:
`{ label: "Marca", href: "/docs/brand", match: "/docs/brand" }`. Não há outra
mudança de routing (fumadocs resolve `/docs/brand` pela árvore de conteúdo).

### U2 — Conteúdo MDX
- `apps/docs/content/docs/brand/index.mdx` — a página (frontmatter
  `title: Marca`, `description`), seções `## Logo`, `## Cores`, `## Downloads`,
  `## Diretrizes de uso`.
- `apps/docs/content/docs/brand/meta.json` → `{ "title": "Marca", "pages": ["index"] }`.
- `apps/docs/content/docs/meta.json` — incluir `"brand"` em `pages`.

### U3 — Dependência + sincronização de assets (SSG-safe)
- `apps/docs/package.json`: adicionar `"@blips/brand": "workspace:*"`.
- `packages/brand/package.json`: adicionar `"./package.json": "./package.json"`
  ao `exports` (1 linha; padrão), para o sync script resolver o pacote — hoje o
  exports map não expõe e `require.resolve("@blips/brand/package.json")` falha.
- `apps/docs/scripts/sync-brand-assets.ts`: copia
  `packages/brand/assets/**` → `apps/docs/public/brand/**` (limpa o destino
  antes; idempotente). Resolve a raiz do pacote via
  `path.dirname(require.resolve("@blips/brand/package.json"))` + `/assets`.
- Encaixe nos scripts (dev e build):
  `tsx scripts/sync-brand-assets.ts && tsx scripts/build-registry.ts && next …`.
- Downloads e qualquer `<img>`/favicon referenciam `/brand/...` (arquivo
  estático real no export). `apps/docs/public/brand/` é gerado → adicionar ao
  `.gitignore` **raiz** (mesmo padrão de `apps/docs/lib/__registry__.ts`).

### U4 — `<ColorTokens/>` (client)
`apps/docs/components/brand/color-tokens.tsx`. Renderiza o swatch do amarelo da
marca com: hex `#FCBA28`, OKLCH `oklch(0.82 0.1788 79.94)`, nome do token
(`--primary`). Botão **copiar** por valor (Phosphor `Copy`, feedback via
`sonner`). Importa `BLIPS_YELLOW` / `BLIPS_YELLOW_OKLCH` de `@blips/brand` (fonte
única — sem hardcode no docs). Sem props na v1.

### U5 — `<BrandAssets/>` (server)
`apps/docs/components/brand/brand-assets.tsx`. Grid de cards agrupados por
categoria; cada card = miniatura do asset sobre **tile claro e escuro** +
nome + formato + botão **baixar** (`<a href="/brand/..." download>`, Phosphor
`DownloadSimple`, `aria-label` descritivo). Dados num manifesto estático local
(array tipado). Sem estado/efeito; SSG puro.

Manifesto de assets (espelha `packages/brand/assets/`):

| Grupo | Arquivos |
| --- | --- |
| Logos | `logo/blips-logo.svg`, `logo/blips-logo-white.svg`, `logo/blips-logo.png`, `logo/blips-logo-white.png` |
| Símbolo | `mark/blips-mark.svg`, `mark/blips-mark-circle.svg`, `mark/blips-mark.png` |
| Favicon & ícones | `favicon/favicon.svg`, `favicon/favicon.ico`, `favicon/apple-touch-icon.png`, `favicon/icon-192.png`, `favicon/icon-512.png` |

### U6 — Demos ao vivo (registry)
`apps/docs/examples/`: `logo-full.tsx`, `logo-mark.tsx`, `logo-mark-circle.tsx`,
`logo-recolor.tsx` (este com `className="text-primary"`). Cada um
`export default` um demo usando `Logo` de `@blips/brand`. O `build-registry.ts`
já varre `examples/*.tsx` → consumo via `<ComponentPreview name="logo-full"/>`.

### Registro MDX
`apps/docs/components/mdx-components.tsx`: registrar `ColorTokens` e
`BrandAssets` no mapa `mdxComponents` (ao lado de `ComponentPreview`, `Kbd`).

## Estrutura da página (`brand/index.mdx`)

1. **Intro** — uma linha sobre a identidade Blips + o amarelo.
2. **## Logo** — `<ComponentPreview name="logo-full" />`,
   `logo-mark`, `logo-mark-circle`, `logo-recolor`; tabela curta da API
   (`variant`: `full|mark|mark-circle`; props de `<svg>`; `currentColor`).
3. **## Cores** — `<ColorTokens />`.
4. **## Downloads** — `<BrandAssets />`.
5. **## Diretrizes de uso** — clear-space, fundos permitidos, contraste mínimo,
   do's & don'ts (não distorcer, não recolorir o círculo amarelo, não rotacionar,
   não aplicar sombra). Texto editorial; pode usar `<Logo/>` em mini-exemplos.

## Restrições e fatos

- **SSG**: tudo estático; sem rota dinâmica, API ou SSR. Downloads = arquivos
  reais em `public/brand/`.
- **Tema**: docs em light por padrão. `<Logo variant="full">` usa `currentColor`
  no wordmark → texto escuro no docs (ok). Tiles claro+escuro no `<BrandAssets/>`
  cobrem a leitura em ambos os fundos.
- **Ícones**: somente `@phosphor-icons/react` (regra do repo; lucide é bloqueado
  pelo Biome).
- **Cor**: nenhum hex hardcoded no docs — `<ColorTokens/>` importa de
  `@blips/brand`.
- **Registry**: só adiciona `examples/*.tsx` (lado docs); não mexe no registry
  do `@blips/ui`.

## Acessibilidade

- `<Logo/>` já expõe `role="img"`/`aria-label`.
- Botões de ícone (copiar, baixar) com `aria-label` textual.
- `<img>` de assets com `alt` descritivo.
- Tiles de preview com contraste suficiente; estados de foco visíveis nos botões.

## Verificação (definição de pronto)

- `pnpm --filter @blips/docs build` (roda sync-assets + registry + next export) ✓
- `typecheck` ✓ · `biome check apps/docs` ✓
- `public/brand/**` populado; links de download resolvem no `out/`.
- Página `/docs/brand/` renderiza as 4 seções; previews ao vivo OK; copiar e
  baixar funcionam.
- **Gate `blips-ui:reviewing`** sobre `components/brand/*` e os `examples/*`.
- Conferência visual da página (light) — logos, swatch, grid de download.

## Decisões resolvidas (eram pontas soltas)

- **Resolução de `packages/brand/assets` no sync**: via
  `path.dirname(require.resolve("@blips/brand/package.json")) + "/assets"`,
  habilitado pelo novo export `"./package.json"` em `@blips/brand` (ver U3).
- **`public/brand/` versionado?** Não — gerado pelo sync; adicionar
  `apps/docs/public/brand/` ao `.gitignore` raiz (mesmo padrão de
  `apps/docs/lib/__registry__.ts`).

## Riscos

- O build do docs passa a depender do build do `@blips/brand` (`^build` no
  turbo já cobre a ordem; o sync só copia `assets/`, que não dependem do
  `dist/`, então funciona mesmo sem o pacote buildado).
