/** Light-only contrast layer applied after the shared physical front glass. */
export const LIGHT_GLASS_ACCENT_TUNING = Object.freeze({
  // Reescalados para o "b": a haste tem ~0.06 de largura, então a faixa interna
  // fica a ~1/4 dela da borda (no triângulo de lado 0.57 eram 0.052 / 0.034).
  bandCenter: 0.014,
  bandWidth: 0.01,
  bandStrength: 0.52,
  baseReflection: 0.05,
  rimStrength: 0.45,
  baseRimStrength: 0.28,
  environmentLodBias: 1.6,
  highlightStrength: 0.95,
});
