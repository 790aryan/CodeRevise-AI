/**
 * ======================================================
 * Retention Probability
 * ======================================================
 *
 * Implements the Ebbinghaus exponential forgetting curve.
 *
 * Formula:
 *
 * R(t) = e^(-t / S)
 *
 * where:
 *
 * R = retention probability
 * t = days since last review
 * S = memory strength (days)
 */

export const calculateRetentionProbability = ({
  memoryStrength,
  daysSinceReview,
}) => {
  if (memoryStrength <= 0) {
    return 0;
  }

  const retention = Math.exp(
    -daysSinceReview / memoryStrength,
  );

  return Number(
    (retention * 100).toFixed(2),
  );
};