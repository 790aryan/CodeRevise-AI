/**
 * ==========================================================
 * CodeRevise AI Memory Engine V6
 * Learning Gain
 * ==========================================================
 *
 * Converts today's revision quality into
 * a learning gain value.
 *
 * Output:
 *   0–100
 */

export const calculateLearningGain = ({
  retrievalQuality,
  retrievability,
}) => {
  /**
   * ------------------------------------------
   * Retrieval Success
   * ------------------------------------------
   *
   * Better recall today generally improves memory.
   */

  const retrievalComponent =
    (retrievalQuality / 100) * 70;

  /**
   * ------------------------------------------
   * Spacing Effect
   * ------------------------------------------
   *
   * If the memory was difficult to retrieve
   * (low retrievability), today's review is
   * more valuable.
   */

  const spacingComponent =
    ((100 - retrievability) / 100) * 30;

  /**
   * ------------------------------------------
   * Final Learning Gain
   * ------------------------------------------
   */

  const gain =
    retrievalComponent +
    spacingComponent;

  return Number(
    Math.max(
      0,
      Math.min(100, gain),
    ).toFixed(2),
  );
};