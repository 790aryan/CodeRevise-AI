export function generateLearningReport({
  stats,
}) {
  const strengths = [];

  const weaknesses = [];

  /**
   * ============================
   * Strengths
   * ============================
   */

  if (stats.memoryScore >= 90) {
    strengths.push(
      'Excellent retrieval ability.',
    );
  }

  if (stats.masteryScore >= 85) {
    strengths.push(
      'Learns new concepts quickly.',
    );
  }

  if (stats.stability >= 120) {
    strengths.push(
      'Outstanding long-term retention.',
    );
  }

  if (
    stats.currentSuccessStreak >= 5
  ) {
    strengths.push(
      'Maintains consistent revision quality.',
    );
  }

  /**
   * ============================
   * Weaknesses
   * ============================
   */

  if (
    stats.averageConfidence < 3
  ) {
    weaknesses.push(
      'Confidence is lower than actual performance.',
    );
  }

  if (
    stats.failedAttempts >
    stats.successfulAttempts / 2
  ) {
    weaknesses.push(
      'Needs more retrieval practice.',
    );
  }

  if (
    stats.averageTime > 900
  ) {
    weaknesses.push(
      'Problem solving speed can improve.',
    );
  }

  if (
    stats.lastReview?.hintLevel ===
    'editorial'
  ) {
    weaknesses.push(
      'Heavy editorial usage reduces learning efficiency.',
    );
  }

  /**
   * ============================
   * Personality
   * ============================
   */

  let personality =
    'Balanced Learner';

  if (
    stats.memoryStrength >= 25 &&
    stats.stability >= 365
  ) {
    personality =
      'Memory Master';
  }

  else if (
    stats.averageTime <= 500
  ) {
    personality =
      'Rapid Learner';
  }

  else if (
    stats.masteryScore >= 90
  ) {
    personality =
      'Deep Thinker';
  }

  /**
   * ============================
   * Prediction
   * ============================
   */

  const retentionPrediction =
    Math.min(
      99,
      Math.round(
        stats.memoryScore *
          0.65 +
          stats.masteryScore *
            0.35,
      ),
    );

  /**
   * ============================
   * Recommendation
   * ============================
   */

  let recommendation =
    'Continue normal spaced repetition.';

  if (
    stats.averageTime > 900
  ) {
    recommendation =
      'Practice solving without looking at hints to improve speed.';
  }

  if (
    stats.memoryScore >= 95
  ) {
    recommendation =
      'Delay the next revision and focus on weaker topics.';
  }

  const revisionsRemaining =
    Math.max(
      0,
      Math.ceil(
        (100 -
          stats.masteryScore) /
          10,
      ),
    );

  return {
    personality,

    strengths,

    weaknesses,

    retentionPrediction,

    recommendation,

    revisionsRemaining,
  };
}