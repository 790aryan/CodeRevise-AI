import { EXPECTED_SOLVE_TIME } from '../../../constants/scoring.constants.js';

/**
 * -------------------------------------------------------
 * Calculate Speed Score
 * -------------------------------------------------------
 *
 * Converts raw solving time into a normalized
 * score between 0 and 100.
 */
export const calculateSpeedScore = ({
  difficulty,
  timeTaken,
}) => {
  const expectedTime =
    EXPECTED_SOLVE_TIME[
      difficulty.toUpperCase()
    ];

  if (!expectedTime || timeTaken <= 0) {
    return 0;
  }

  const ratio =
    expectedTime / timeTaken;

  const speedScore =
    Math.round(
      Math.min(
        100,
        Math.max(
          0,
          ratio * 100,
        ),
      ),
    );

  return speedScore;
};