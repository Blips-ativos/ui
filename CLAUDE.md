# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Overview

`blips-ui` is the standalone **Blips UI component library** — a Turborepo +
pnpm monorepo. Components mirror shadcn/ui on **Base UI** primitives
(`@base-ui/react`, shadcn style **`base-mira`**) and are published as
`@blips/ui`. Since v3 there is no `@radix-ui/*` and no `vaul` in the lib.

## Layout

- `packages/ui/` — `@blips/ui` library. Source in `src/{components,hooks,lib}`,
  `globals.css`, barrel `src/index.ts`. Built with **tsup** (ESM+CJS+dts).
- `packages/ai/` — `@blips/ai`: componentes de interface de agente (port do AI
  Elements, Apache-2.0, + wrappers do libraries.dev, MIT) que **compõem** a
  `@blips/ui` (peer `^3`). Só subpaths (`@blips/ai/components/*`, `@blips/ai/fx/*`),
  **sem barrel**: um barrel puxaria os peers opcionais (streamdown, shiki…).
  CSS próprio `@blips/ai/styles.css` (só `@source`), importado depois do
  `@blips/ui/globals.css`. Arquivo portado começa com cabeçalho de origem;
  licença `MIT AND Apache-2.0` com `THIRD_PARTY_NOTICES.md`. Specs em
  `docs/superpowers/specs/2026-10-06-blips-ai-fase-*.md`.
  `packages/ai/src/vendor/` (voice-glow, bot-avatars) é cópia **sem modificação**
  do libraries.dev (fora do npm), com `LICENSE` e `README.md` de origem, excluída
  do Biome em `biome.json`: não edite, atualize trocando a pasta inteira; as
  adaptações Blips ficam nos wrappers em `src/fx/`.
- `packages/tailwind-config/` — `@blips/tailwind-config`, shared Tailwind v4 config.
- `apps/docs/` — fumadocs documentation site.
- `plugins/` — Claude Code plugin marketplace (`blips-ui`); not app code.
- `packages/ui/registry/` + `registry.json` — shadcn registry definitions.
  `registry/default/{ui,hooks}/` and `registry/index.ts` are a **generated copy**
  of `src/` (relative imports rewritten to `@/lib/utils` / `@/hooks/*`) — never
  edit them by hand; see the registry gotcha below.

## Commands (run from repo root)

```bash
pnpm install
pnpm dev              # turbo dev --filter='@blips/*'
pnpm build            # turbo build
pnpm check            # biome check (lint + format)
pnpm check:fix        # biome check --write
pnpm typecheck        # turbo typecheck
pnpm test             # turbo test
pnpm registry:build   # build @blips/ui shadcn registry (fails if registry/ drifted from src/)
pnpm --filter @blips/ui exec node scripts/build-registry.js --sync  # regenerate registry/ from src/

# Per package
pnpm --filter @blips/ui build      # tsup
pnpm --filter @blips/ui dev        # tsup --watch

# Release: run the `/release` Claude command (opens the release PR).
# Local manual publish (rarely needed): pnpm release
```

## Versioning

Three independent release tracks — bump them separately. **Always release through
the `/release` command, never by hand-merging `staging → main`.**

**Mandatory order inside `/release` (don't reorder):** define version → bump the
track's file(s) → **commit** the bump → **push `staging`** → **only then** open
the PR with the version in its title. The push must precede `gh pr create` so the
PR contains the bump commit and its title matches the versioned files (otherwise
the `verify` job fails at merge).

- **npm (`@blips/ui`) + docs site** — released via the **`/release` Claude
  command** (`.claude/commands/release.md`) + the **`release.yml`** workflow.
  `/release` reads conventional commits, bumps `packages/ui/package.json`,
  commits + pushes the bump to `staging`, then opens a PR `staging → main`
  titled **`release: vX.Y.Z`** (deterministic convention — the workflow parses
  the version from the title). Merging that PR triggers the workflow: tag `vX.Y.Z` + GitHub Release, publish `@blips/ui` to
  npm via **Trusted Publishing (OIDC — no token; needs npm ≥ 11.5.1 / Node ≥
  22.14)**, and build + deploy the docs (SSG export) to **Firebase Hosting**
  (project `blips-ui`). CI needs the `FIREBASE_SERVICE_ACCOUNT` secret, the
  `FIREBASE_PROJECT_ID` var, and the npm trusted publisher registered for
  workflow `release.yml`.
- **Marketplace plugin (`blips-ui`)** — also released via **`/release`** (pick
  scope `plugin`), but on its **own track**: it bumps the `version` in **both**
  `plugins/blips-ui/.claude-plugin/plugin.json` **and** its entry in
  `.claude-plugin/marketplace.json` (must stay in sync — the workflow fails the
  plugin release otherwise) and opens a PR titled **`release-plugin: vX.Y.Z`**.
  Merging it tags **`plugin-vX.Y.Z`** + a GitHub Release — **no npm/docs**
  (decoupled by the PR-title prefix; `release-plugin:` doesn't match the npm
  trigger `release: v`). The plugin is git-distributed: the bump landing on
  `main` is what makes it live, so **always bump on every release** or the
  Claude Code cache keeps the stale version. Marketplace repo is `Blips-ativos/ui`
  (push with the `BernardoBlips` `gh` account / `GITHUB_TOKEN`). For a combined
  release, `/release` scope `ambos` rides the plugin bump in the `release: v…`
  PR and the workflow tags `plugin-v…` too.
- **Brand package (`@blips/brand`)** — released via **`/release`** (pick scope
  `brand`) on its **own track**: bumps `packages/brand/package.json` and opens a
  PR titled **`release-brand: vX.Y.Z`**. Merging it builds `@blips/brand`,
  publishes it to npm via **Trusted Publishing (OIDC)**, and tags
  **`brand-vX.Y.Z`** — **no docs/plugin** (decoupled by the PR-title prefix).
  Needs its own **npm trusted publisher** registered for workflow `release.yml`
  (scope `@blips`); the very first publish may need a manual `npm publish` if the
  package doesn't exist yet. Consumed inside the monorepo via `workspace:*` (no
  publish needed there); publishing is only for **other repos** to use it.
- **AI package (`@blips/ai`)** — released via **`/release`** (pick scope `ai`) on
  its **own track**: bumps `packages/ai/package.json` and opens a PR titled
  **`release-ai: vX.Y.Z`**. Merging it builds and publishes `@blips/ai` via
  **Trusted Publishing (OIDC)** and tags **`ai-vX.Y.Z`** — no docs/plugin. Needs
  its own npm trusted publisher (scope `@blips`, workflow `release.yml`); the
  first publish may need a manual `npm publish`. If a release needs a newer
  `@blips/ui`, publish the UI first (peer `^3`).

## Conventions & gotchas

- **Tailwind v4, CSS-first** (`@theme` in `globals.css`) — no `tailwind.config.js`.
- In components import `cn` from the **relative** `../lib/utils`, never the
  `@/lib/utils` alias — the tsup build has no path alias and it breaks the bundle.
- Component pattern: function components (no `forwardRef`) with `data-slot`
  attributes and **CVA** variants, on **Base UI** primitives
  (`@base-ui/react/<part>`). Polymorphism is Base UI's **`render` prop**
  (`useRender` + `mergeProps`), **not `asChild`** — e.g.
  `<Button nativeButton={false} render={<Link href="…" />}>`. State attributes
  are Base UI's (`data-open`, `data-closed`, `data-checked`, `data-active`…),
  not Radix `data-state=…`. Use the **`blips-ui:building` skill**
  (`plugins/blips-ui/skills/building/`) when creating components.
- **Canonical class reference = the shadcn CLI output** for preset
  **`b6GMQNVCs`** (style `base-mira`, Phosphor icons, translucent menu — see
  `packages/ui/components.json`). When adding or updating a component, generate
  it with the shadcn CLI on that preset and reapply the Blips customizations on
  top; don't hand-tune classes away from what the CLI emits.
- **Density is `mira`** (compact): controls are `h-7` by default (`sm` `h-6`,
  `lg` `h-8`), text `text-xs`, icons `size-3.5`. This is intentional — don't
  "fix" sizes back to new-york/default proportions.
- **shadcn utilities are embedded in `globals.css`** (a copy of
  `shadcn/tailwind.css`: the `data-open/closed/checked/…` variants,
  `no-scrollbar`, `scroll-fade*`, `shimmer*`, accordion keyframes) instead of
  `@import "shadcn/tailwind.css"`, so the lib has no runtime dependency on the
  shadcn CLI. When upgrading shadcn, recopy that block.
- **Icons: `@phosphor-icons/react` is the standard** (weight `regular`, the
  default — don't pass `weight`). Never import `lucide-react` — a Biome
  `noRestrictedImports` rule blocks it. Use Phosphor names **with the `Icon`
  suffix** (`CaretDownIcon`, `XIcon`, `MagnifyingGlassIcon`, `CheckIcon`,
  `CircleIcon`, `DotsThreeIcon`…) — the unsuffixed names (`CaretDown`, `X`…)
  are **deprecated** in Phosphor 2.1.x. Never use Lucide names.
- **Charts: recharts 3** (pinned `3.10.1`). recharts 2 APIs/types don't apply
  (e.g. tooltip/legend payload types changed) — follow `chart.tsx`.
- Internal imports use **`@blips/*`** (this repo), not `@workspace/*`.
- **Two registry build scripts**, different jobs:
  `packages/ui/scripts/build-registry.js` builds the **shadcn registry**
  (`public/r/*.json`) from `registry/`, and `apps/docs/scripts/build-registry.ts`
  builds the **docs examples registry** (`apps/docs/lib/__registry__.ts`, runs
  before docs dev/build). The first one also guards `registry/` against drift:
  without flags it **fails** if the copy in `registry/default/`, `registry/index.ts`
  or the `dependencies`/`registryDependencies` of `registry.json` don't match
  `src/`. After changing anything in `packages/ui/src/{components,hooks,index.ts}`
  run it with **`--sync`** (copies the files, rewrites imports, derives the deps
  from the imports — `recharts` gets the version pinned in `package.json`) and
  then `pnpm check:fix` on `registry.json`. A new component also needs a new
  item (`name` + `description`) in `registry.json`, or `--sync` fails.
- **`apps/docs` is a static export** (`output: "export"` → `out/`): keep it
  fully SSG (no API routes / SSR / dynamic). Deployed to Firebase Hosting
  (`apps/docs/firebase.json`). MDX is styled via `components/mdx-components.tsx`
  (shadcn-style map), **not** fumadocs' `prose`.
- Biome formatting: double quotes, semicolons, 2-space indent, line width 80,
  `es5` trailing commas.
- React peer range: `^17 || ^18 || ^19`.
- Comments/code in **pt-BR**; commit messages in **pt-BR** too (Conventional
  Commits, `type(scope): descrição no imperativo`) — org rule since 2026-09;
  older history is in English.
