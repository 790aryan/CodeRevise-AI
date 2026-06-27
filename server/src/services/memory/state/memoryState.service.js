

/**
 * ==========================================================
 * CodeRevise AI Memory Engine V4
 * Memory State Service
 * ==========================================================
 *
 * Creates the internal memory representation
 * for a single problem.
 *
 * This object becomes the single source of truth
 * for all future intelligence calculations.
 */

export const createMemoryState = ({
  stats,
}) => {
  return {
    /**
     * Long-term durability of memory.
     *
     * Unit:
     * Days
     */
    strength:
      stats?.memoryStrength ?? 3,

    /**
     * Resistance to forgetting.
     *
     * Higher stability means
     * memory decays more slowly.
     */
    stability:
      stats?.stability ?? 1,


    /**
     * Last successful review.
     */
    lastReviewedAt:
      stats?.lastReviewedAt ?? null,
  };
};