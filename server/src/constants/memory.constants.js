/**
 * ==========================================================
 * CodeRevise AI Memory Engine V6
 * Global Constants
 * ==========================================================
 */

export const MEMORY = {
  /**
   * Retention threshold (%)
   * Below this value, the scheduler recommends a review.
   */
  RETENTION_THRESHOLD: 85,

  /**
   * Maximum simulation window.
   */
  MAX_SIMULATION_DAYS: 365,

  /**
   * Initial memory state for a newly solved problem.
   */
  INITIAL: {
    STRENGTH: 1.0,
    STABILITY: 3.0,
  },

  /**
   * Hard safety bounds.
   */
  LIMITS: {
    MIN_STRENGTH: 1,
    MAX_STRENGTH: 100,

    MIN_STABILITY: 1,
    MAX_STABILITY: 3650, // ~10 years
  },

  /**
   * Diminishing returns tuning.
   */
  DIMINISHING: {
    LOG_BASE: 10,
  },
};