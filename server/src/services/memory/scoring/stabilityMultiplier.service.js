/**
 * ==========================================================
 * CodeRevise AI Memory Engine V7
 * Stability Multiplier
 * ==========================================================
 *
 * Produces the effective stability multiplier.
 *
 * Philosophy:
 * - Good recall increases stability.
 * - Difficult recall increases stability more.
 * - Mature memories grow slower (diminishing returns).
 */

export const calculateStabilityMultiplier = ({
  retrievalQuality,
  retrievability,
  result,
  difficulty,
  currentStability,
}) => {
  /**
   * ------------------------------------------
   * Normalize
   * ------------------------------------------
   */

  const rq = Math.max(
    0,
    Math.min(100, retrievalQuality),
  );

  const rt = Math.max(
    0,
    Math.min(100, retrievability),
  );

  const stability = Math.max(
    1,
    currentStability,
  );

  /**
   * ------------------------------------------
   * Base Multiplier
   * ------------------------------------------
   */

  let base = 1;

  switch (result) {
    case 'mastered':
      base = 1.60;
      break;

    case 'solved':
      base = 1.35;
      break;

    case 'struggled':
      base = 1.00;
      break;

    default:
      base = 0.60;
  }

  /**
   * ------------------------------------------
   * Retrieval Quality Adjustment
   * ------------------------------------------
   *
   * ±0.10
   */

  base += ((rq - 50) / 50) * 0.10;

  /**
   * ------------------------------------------
   * Spacing Bonus
   * ------------------------------------------
   *
   * Lower retrievability
   * =
   * larger reward.
   */

  const spacingBonus =
    Math.pow(
      (100 - rt) / 100,
      1.5,
    ) * 0.20;

  if (
    result === 'mastered' ||
    result === 'solved'
  ) {
    base += spacingBonus;
  }

  /**
   * ------------------------------------------
   * Difficulty
   * ------------------------------------------
   */

  switch (
    (difficulty ?? 'medium').toLowerCase()
  ) {
    case 'easy':
      base -= 0.03;
      break;

    case 'hard':
      base += 0.05;
      break;
  }

  /**
   * ------------------------------------------
   * Diminishing Returns
   * ------------------------------------------
   *
   * This is the NEW part.
   */

  const diminishingFactor =
    1 /
    (
      1 +
      Math.log10(stability)
    );

  const effectiveMultiplier =
    1 +
    (base - 1) *
      diminishingFactor;

  /**
   * ------------------------------------------
   * Clamp
   * ------------------------------------------
   */

  return Number(
    Math.max(
      0.60,
      Math.min(
        1.80,
        effectiveMultiplier,
      ),
    ).toFixed(2),
  );
};