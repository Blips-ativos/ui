---
paths:
  - "**/*.tsx"
  - "**/*.ts"
description: Regras de import dos componentes @blips/ui — subpath vs barrel conforme a versão do React do repo.
---

# Imports da @blips/ui

## Regra por versão do React

| React do repo | Como importar |
| --- | --- |
| 18 ou 19 | **Subpath**: `import { Button } from "@blips/ui/components/button"` |
| 17 | **Barrel**: `import { Button } from "@blips/ui"` |

Por quê (verificado na lib): o barrel compilado (`dist/index.js`) não contém
as diretivas `"use client"` — importar componentes client por ele quebra o
Next App Router. Os subpaths entregam o fonte `.tsx`, que compila e typechecka
em React 18/19 (no Next, exige `transpilePackages: ["@blips/ui"]`); em React
17 o `tsc` falha contra `@types/react@17`, por isso a exceção do barrel.

## Sempre

- `cn` vem de `@blips/ui/lib/utils`.
- Um subpath por componente: `@blips/ui/components/dialog`,
  `@blips/ui/components/form`...
- Dependências que o código do app importa são deps **diretas** do app
  (`@phosphor-icons/react`, `react-hook-form`, `zod`...) — com pnpm, não
  dependa de transitivas da lib.

## Nunca

- Importar caminhos internos (`@blips/ui/src/...`, `@blips/ui/dist/...`).
- Misturar barrel e subpath no mesmo repo.
- Reinstalar o que a lib já traz (Radix, CVA, clsx, tailwind-merge, cmdk,
  recharts, sonner...) — só vire dep direta o que o app importa diretamente.
