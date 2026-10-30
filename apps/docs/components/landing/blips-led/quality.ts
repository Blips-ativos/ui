/**
 * Qualidade automática da cena: mede o intervalo entre quadros e, se a GPU não
 * acompanha, reduz a resolução do raycast (a passada mais cara por quadro).
 *
 * Blips (sem origem no vgpu). Só desce, nunca sobe na mesma sessão — subir de
 * volta faria a qualidade oscilar. O intervalo de quadros é o do rAF (CPU): não
 * separa GPU de vsync, então o critério é absoluto (abaixo de ~48 fps
 * sustentados), não relativo à taxa da tela. Navegador que limita o rAF a
 * 30 fps (modo economia) também desce — nesse caso economizar é o certo.
 */

/** Frações da simulação para o alvo do raycast, da melhor para a mais barata. */
export const RAYCAST_SCALE_TIERS = [0.5, 0.4, 0.3] as const;

/** Quadros descartados depois de (re)começar o loop, de um rebuild ou de descer. */
const WARMUP_FRAMES = 30;
/** Janela da mediana. */
const WINDOW_FRAMES = 90;
/** Mediana acima disto (ms) desce um nível: ~48 fps. */
const SLOW_FRAME_MS = 21;
/** Intervalos acima disto (ms) são soluços (aba, GC, rebuild), não carga. */
const OUTLIER_FRAME_MS = 100;

export interface QualityGovernor {
  /** Intervalo do último quadro, em ms. */
  sample(intervalMs: number): void;
  /** Recomeça a medida (loop retomado, resize). */
  reset(): void;
}

export function createQualityGovernor(
  onScale: (scale: number) => void
): QualityGovernor {
  let tier = 0;
  let warmup = WARMUP_FRAMES;
  const samples: number[] = [];

  const reset = () => {
    warmup = WARMUP_FRAMES;
    samples.length = 0;
  };

  return {
    reset,
    sample(intervalMs) {
      if (tier >= RAYCAST_SCALE_TIERS.length - 1) return;
      if (warmup > 0) {
        warmup--;
        return;
      }
      if (!(intervalMs > 0) || intervalMs > OUTLIER_FRAME_MS) return;
      samples.push(intervalMs);
      if (samples.length < WINDOW_FRAMES) return;
      const sorted = [...samples].sort((a, b) => a - b);
      const median = sorted[sorted.length >> 1] ?? 0;
      samples.length = 0;
      if (median <= SLOW_FRAME_MS) return;
      tier++;
      reset();
      onScale(RAYCAST_SCALE_TIERS[tier] ?? RAYCAST_SCALE_TIERS[0]);
    },
  };
}
