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
- `plugins/` — Claude Code plugin marketplace (`blips-templates`, `blips-ui`);
  not app code.
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

# Release (changesets)
pnpm changeset && pnpm version-packages && pnpm release
```

## Conventions & gotchas

- **Tailwind v4, CSS-first** (`@theme` in `globals.css`) — no `tailwind.config.js`.
- In components import `cn` from the **relative** `../lib/utils`, never the
  `@/lib/utils` alias — the tsup build has no path alias and it breaks the bundle.
- Component pattern: function components (no `forwardRef`) with `data-slot`
  attributes and **CVA** variants. Use the **`building-components` skill**
  (`.claude/skills/building-components/`) when creating components.
- Internal imports use **`@blips/*`** (this repo), not `@workspace/*`.
- **Two registry build scripts** must stay in sync: `packages/ui/scripts/build-registry.js`
  (package) and `apps/docs/scripts/build-registry.ts` (docs site, runs before dev/build).
- Biome formatting: double quotes, semicolons, 2-space indent, line width 80,
  `es5` trailing commas.
- React peer range: `^17 || ^18 || ^19`.
- Comments/code in **pt-BR**; commit messages in **English** (Conventional Commits).
