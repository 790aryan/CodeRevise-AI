import { MEMORY } from '../../../constants/memory.constants.js';

/**
 * ==========================================================
 * CodeRevise AI Memory Engine V6
 * Retention Simulator
 * ==========================================================
 *
 * Simulates future memory retention and determines
 * the optimal next review day.
 *
 * It stops when retention falls below the configured
 * threshold.
 */

export const simulateRetention = ({
  memoryState,
  threshold = MEMORY.RETENTION_THRESHOLD,
  maxDays = MEMORY.MAX_SIMULATION_DAYS,
}) => {
  const timeline = [];

  const stability =
    memoryState.stability;

const DECAY_SCALE = 4;

const decayConstant =
    stability *
    DECAY_SCALE;

  let reviewDay = maxDays;
  let reviewRetention = 0;

  for (
    let day = 0;
    day <= maxDays;
    day++
  ) {
    const retention =
      Math.exp(
        -day /
          decayConstant,
      ) * 100;

    const roundedRetention =
      Number(
        retention.toFixed(2),
      );

    timeline.push({
      day,
      retention:
        roundedRetention,
    });

    /**
     * ------------------------------------------
     * Stop when threshold reached
     * ------------------------------------------
     */

    if (
      roundedRetention <=
      threshold
    ) {
      reviewDay = day;
      reviewRetention =
        roundedRetention;

      break;
    }
  }

  return {
    reviewDay,
    reviewRetention,
    timeline,
  };
};