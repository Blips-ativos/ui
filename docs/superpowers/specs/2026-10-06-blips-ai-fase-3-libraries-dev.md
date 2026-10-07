# @blips/ai — fase 3: demais pacotes do libraries.dev

Data: 2026-10-06 · Branch: `feat/blips-ai` · Base: fases 1 e 2, cujas decisões valem aqui.

## Objetivo

Completar o libraries.dev (`Jakubantalik/Libraries.dev`, MIT, commit `9f59769`) no `@blips/ai`: os 5
pacotes que faltam, somados aos 2 da fase 1, dão os 7.

## Escopo (5)

| Pacote | Versão | Como entra | Dependência própria |
|---|---|---|---|
| `liquid-gooey` | 0.2.2 | dependência npm + wrapper `src/fx/liquid-gooey.tsx` | — |
| `metal-fx` | 2.0.11 | dependência npm + wrapper `src/fx/metal-fx.tsx` | — (embute shaders da Paper Shaders, Apache-2.0; o `NOTICE` viaja no próprio pacote) |
| `img-fx` | 0.5.1 | dependência npm + wrapper `src/fx/img-fx.tsx` | `three` (peer opcional do `@blips/ai`) |
| `voice-glow` | 0.3.0 | **cópia** em `src/vendor/voice-glow/` + wrapper `src/fx/voice-glow.tsx` | — |
| `bot-avatars` | 0.2.2 | **cópia** em `src/vendor/bot-avatars/` + wrapper `src/fx/bot-avatars.tsx` | — |

`voice-glow` e `bot-avatars` existem no repositório do libraries.dev mas não estão publicados no npm.

## Decisões

- **Wrappers** seguem o padrão da fase 1 (`border-beam`, `thinking-orbs`): reexportam o componente e os
  tipos do original e expõem um componente com padrões Blips (paleta a partir do `#FCBA28` e dos tokens
  da `@blips/ui`, tamanhos da densidade mira), aceitando todas as props do original para sobrescrever.
  Cabeçalho: `// Envolve <pacote> (Jakubantalik/Libraries.dev, MIT). Padrões Blips: …`.
- **Cópias (`src/vendor/`)**: o `src/` do upstream copiado **sem modificação**, mais o `LICENSE` original e um
  `README.md` curto com origem, versão e commit (`9f59769`), para atualizar trocando a pasta inteira. Por
  ser código de terceiros mantido idêntico, `src/vendor/**` fica fora do Biome (via `biome.json`); o
  typecheck continua cobrindo a pasta, e o que o TypeScript estrito do repo exigir entra só nos wrappers
  ou num `// @ts-nocheck` documentado no arquivo copiado, nunca reescrevendo o código.
- **Licenças**: `THIRD_PARTY_NOTICES.md` já traz a MIT do libraries.dev; acrescenta a menção ao `NOTICE` da
  Paper Shaders (Apache-2.0) que o `metal-fx` carrega.
- **Sem conteúdo Pro** (exports do Studio, presets Pro).
- **APIs do navegador** (`voice-glow` usa microfone/Web Audio; os efeitos usam WebGL/canvas): nada de acessar
  `window` no render; no SSR o componente renderiza o contêiner e liga o efeito no cliente.

## Aceite da fase 3

1. Os 5 em `packages/ai/src/fx/` (e as 2 cópias em `src/vendor/` com `LICENSE`); os 7 do libraries.dev
   presentes no total.
2. `pnpm typecheck`, `pnpm --filter @blips/ai build` e build do site verdes; Biome limpo em `packages/ai`
   (exceto `src/vendor/**`, excluído de propósito).
3. Uma página de docs e uma `references/ai/<nome>.md` por efeito; `SKILL.md` atualizado; `three` documentado
   como peer do `img-fx`.
4. Teste de fumaça final com **todos** os componentes do `@blips/ai` (fases 1, 2 e 3).
5. Revisão adversarial da fase com achados confirmados corrigidos.
