import { MEMORY } from '../../../constants/memory.constants.js';
import { calculateStabilityMultiplier } from '../scoring/stabilityMultiplier.service.js';

/**
 * ==========================================================
 * CodeRevise AI Memory Engine V6
 * Memory State Update
 * ==========================================================
 *
 * Updates the user's memory state after every review.
 *
 * Responsibilities:
 * - Update encoding strength
 * - Update long-term stability
 * - Preserve immutable fields
 */

export const updateMemoryState = ({
  memoryState,

  learningGain,

  retrievalQuality,
  retrievability,

  result,
  difficulty,
}) => {
  /**
   * --------------------------------------------------
   * Current State
   * --------------------------------------------------
   */

  const currentStrength =
    memoryState?.strength ??
    MEMORY.INITIAL.STRENGTH;

  const currentStability =
    memoryState?.stability ??
    MEMORY.INITIAL.STABILITY;

  /**
   * --------------------------------------------------
   * Strength Update
   * --------------------------------------------------
   *
   * Strength represents encoding quality.
   * It improves slowly and eventually saturates.
   */

  let strength =
    currentStrength +
    (learningGain / 100) * 0.30;

  strength = Math.max(
    MEMORY.LIMITS.MIN_STRENGTH,
    Math.min(
      MEMORY.LIMITS.MAX_STRENGTH,
      strength,
    ),
  );

  /**
   * --------------------------------------------------
   * Stability Multiplier
   * --------------------------------------------------
   */
console.log('=== INPUT TO updateMemoryState ===');
console.log({
  memoryState,
  learningGain,
  retrievalQuality,
  retrievability,
  result,
  difficulty,
});


  const stabilityMultiplier =
    calculateStabilityMultiplier({
      retrievalQuality,
      retrievability,
      result,
      difficulty,
      currentStability,
    });
console.log('=== STABILITY MULTIPLIER ===');
console.log({
  currentStability,
  stabilityMultiplier,
});
  /**
   * --------------------------------------------------
   * Stability Update
   * --------------------------------------------------
   *
   * Instead of exponential multiplication,
   * we use diminishing-return growth.
   */

  const growth =
    (stabilityMultiplier - 1) *
    Math.sqrt(currentStability);
console.log('=== GROWTH ===');
console.log({
  growth,
  finalStability: currentStability + growth,
});
  let stability =
    currentStability + growth;

  stability = Math.max(
    MEMORY.LIMITS.MIN_STABILITY,
    Math.min(
      MEMORY.LIMITS.MAX_STABILITY,
      stability,
    ),
  );

  /**
   * --------------------------------------------------
   * Debug
   * --------------------------------------------------
   */
const DEBUG_MEMORY_ENGINE = true;

if (DEBUG_MEMORY_ENGINE) {
  console.log({
    previousStrength:
      currentStrength,

    previousStability:
      currentStability,

    learningGain,

    retrievalQuality,

    retrievability,

    stabilityMultiplier,

    newStrength:
      Number(strength.toFixed(2)),

    newStability:
      Number(stability.toFixed(2)),
  });
}
  /**
   * --------------------------------------------------
   * Updated State
   * --------------------------------------------------
   */

  return {
    strength:
      Number(strength.toFixed(2)),

    stability:
      Number(stability.toFixed(2)),

    lastReviewedAt:
      new Date(),
  };
};