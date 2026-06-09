# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Overview

`blips-ui` is the standalone **Blips UI component library** — a Turborepo +
pnpm monorepo. Components mirror shadcn/ui on Radix primitives and are
published as `@blips/ui`.

## Layout

- `packages/ui/` — `@blips/ui` library. Source in `src/{components,hooks,lib}`,
  `globals.css`, barrel `src/index.ts`. Built with **tsup** (ESM+CJS+dts).
- `packages/tailwind-config/` — `@blips/tailwind-config`, shared Tailwind v4 config.
- `apps/docs/` — fumadocs documentation site.
- `plugins/` — Claude Code plugin marketplace (`blips-ui`); not app code.
- `packages/ui/registry/` + `registry.json` — shadcn registry definitions.

## Commands (run from repo root)

```bash
pnpm install
pnpm dev              # turbo dev --filter='@blips/*'
pnpm build            # turbo build
pnpm check            # biome check (lint + format)
pnpm check:fix        # biome check --write
pnpm typecheck        # turbo typecheck
pnpm test             # turbo test
pnpm registry:build   # build @blips/ui shadcn registry

# Per package
pnpm --filter @blips/ui build      # tsup
pnpm --filter @blips/ui dev        # tsup --watch

# Release: run the `/release` Claude command (opens the release PR).
# Local manual publish (rarely needed): pnpm release
```

## Versioning

Two independent release tracks — bump them separately. **Always release through
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

## Conventions & gotchas

- **Tailwind v4, CSS-first** (`@theme` in `globals.css`) — no `tailwind.config.js`.
- In components import `cn` from the **relative** `../lib/utils`, never the
  `@/lib/utils` alias — the tsup build has no path alias and it breaks the bundle.
- Component pattern: function components (no `forwardRef`) with `data-slot`
  attributes and **CVA** variants. Use the **`blips-ui:building` skill**
  (`plugins/blips-ui/skills/building/`) when creating components.
- **Icons: `@phosphor-icons/react` is the standard** (weight `regular`, the
  default — don't pass `weight`). Never import `lucide-react` — a Biome
  `noRestrictedImports` rule blocks it. Use Phosphor names (`CaretDown`, `X`,
  `MagnifyingGlass`, `Check`, `Circle`, `DotsThree`…), not Lucide names.
- Internal imports use **`@blips/*`** (this repo), not `@workspace/*`.
- **Two registry build scripts** must stay in sync: `packages/ui/scripts/build-registry.js`
  (package) and `apps/docs/scripts/build-registry.ts` (docs site, runs before dev/build).
- **`apps/docs` is a static export** (`output: "export"` → `out/`): keep it
  fully SSG (no API routes / SSR / dynamic). Deployed to Firebase Hosting
  (`apps/docs/firebase.json`). MDX is styled via `components/mdx-components.tsx`
  (shadcn-style map), **not** fumadocs' `prose`.
- Biome formatting: double quotes, semicolons, 2-space indent, line width 80,
  `es5` trailing commas.
- React peer range: `^17 || ^18 || ^19`.
- Comments/code in **pt-BR**; commit messages in **English** (Conventional Commits).
