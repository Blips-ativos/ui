/// <reference path="../vendor/voice-glow/env.d.ts" />

// O voice-glow do upstream lê a constante de build `__VOICE_SURFACE__` (liga os visuais
// `look="dots"` / `"lines"`, ainda não lançados). O build do libraries.dev a troca por `false`
// via `define` do Vite; aqui o fonte é consumido direto (tsup, Next com `transpilePackages`),
// sem `define`, e a primeira leitura (no módulo `index.ts` da cópia) quebraria com
// `ReferenceError`. Este módulo define o global como `false` antes da cópia ser avaliada: o
// wrapper `src/fx/voice-glow.tsx` o importa antes de `../vendor/voice-glow` e chama
// `ensureVoiceGlowEnv()` no topo, o que também impede o bundler de descartá-lo
// (`sideEffects: false`). Se um bundler definir a constante, a troca dele vence.
// A referência acima leva a declaração de tipo da constante a quem consome o fonte (o
// `env.d.ts` da cópia não é importado por ninguém e ficaria fora do typecheck do app).

type VoiceGlowScope = typeof globalThis & { __VOICE_SURFACE__?: boolean };

/** Garante `__VOICE_SURFACE__ === false` quando ninguém a definiu. Idempotente. */
export function ensureVoiceGlowEnv(): boolean {
  const scope = globalThis as VoiceGlowScope;
  if (typeof scope.__VOICE_SURFACE__ !== "boolean") {
    scope.__VOICE_SURFACE__ = false;
  }
  return scope.__VOICE_SURFACE__;
}

ensureVoiceGlowEnv();
