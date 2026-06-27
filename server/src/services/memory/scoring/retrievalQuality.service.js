/**
 * ==========================================================
 * CodeRevise AI Memory Engine V8
 * Retrieval Quality (Patched)
 * ==========================================================
 *
 * Measures the quality of today's recall.
 * Output: 0–100
 */

export const calculateRetrievalQuality = ({
  confidence,
  speedScore,
  hintLevel,
  result,
}) => {
  // Confidence (50%)
  const confidenceScore = (confidence / 5) * 50;

  // Speed (30%)
  const speedContribution = (speedScore / 100) * 30;

  // Hint Penalty
  const hintPenalty = {
    none: 0,
    small: 5,
    major: 12,
    editorial: 20,
  };

  // Result Bonus (20%) - Adjusted to allow a max score of 100
  const resultBonus = {
    mastered: 20,
    solved: 10,
    struggled: 0,
    failed: -10,
  };

  let score =
    confidenceScore +
    speedContribution +
    (resultBonus[result] ?? 0) -
    (hintPenalty[hintLevel] ?? 0);

  score = Math.max(0, Math.min(100, score));

  return Number(score.toFixed(2));
};