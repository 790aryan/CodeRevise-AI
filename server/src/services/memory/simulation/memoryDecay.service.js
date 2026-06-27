/**
 * ==========================================================
 * CodeRevise AI Memory Engine V6
 * Memory Decay
 * ==========================================================
 *
 * Computes the probability that the user
 * still remembers a problem TODAY.
 *
 * Nothing is stored.
 * Retrievability is derived from:
 *
 * - Memory Strength
 * - Stability
 * - Time Since Last Review
 */

export const calculateRetrievability = ({
  strength,
  stability,
  lastReviewedAt,
}) => {
  /**
   * ------------------------------------------
   * First Review
   * ------------------------------------------
   */

  if (!lastReviewedAt) {
    return 100;
  }

  /**
   * ------------------------------------------
   * Days Since Review
   * ------------------------------------------
   */

  const elapsedDays =
    (Date.now() -
      new Date(lastReviewedAt).getTime()) /
    (1000 * 60 * 60 * 24);

  /**
   * ------------------------------------------
   * Decay Constant
   * ------------------------------------------
   */

  const decayConstant =
    strength *
    Math.sqrt(stability);

  /**
   * ------------------------------------------
   * Forgetting Curve
   * ------------------------------------------
   */

  const retrievability =
    Math.exp(
      -elapsedDays /
        decayConstant,
    ) * 100;

  return Number(
    Math.max(
      0,
      Math.min(
        100,
        retrievability,
      ),
    ).toFixed(2),
  );
};