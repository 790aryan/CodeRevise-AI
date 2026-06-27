import { simulateRetention } from '../simulation/retentionSimulator.service.js';

/**
 * ==========================================================
 * CodeRevise AI Memory Analytics V8
 * ==========================================================
 *
 * Converts the internal memory state into dashboard-ready
 * analytics.
 *
 * This service NEVER mutates memory.
 */

export const getMemoryAnalytics = ({
  memoryState,
}) => {
  const simulation = simulateRetention({
    memoryState,
  });

  const nextRevisionIn = simulation.reviewDay;

  const nextRevisionDate = new Date();
  nextRevisionDate.setDate(
    nextRevisionDate.getDate() +
      nextRevisionIn,
  );

  const predictedForgetDate = new Date();
  predictedForgetDate.setDate(
    predictedForgetDate.getDate() +
      Math.round(
        memoryState.stability,
      ),
  );

  return {
    strength: Number(
      memoryState.strength.toFixed(2),
    ),

    stability: Number(
      memoryState.stability.toFixed(2),
    ),

    retrievability: Number(
      (
        memoryState.retrievability ??
        100
      ).toFixed(2),
    ),

    memoryHealth:
      calculateMemoryHealth(
        memoryState,
      ),

    memoryStage:
      calculateMemoryStage(
        memoryState.stability,
      ),

    forgetRisk:
      calculateForgetRisk(
        nextRevisionIn,
      ),

    nextRevisionIn,

    nextRevisionDate,

    predictedForgetDate,

    currentRetention:
      simulation.reviewRetention,

    timeline:
      simulation.timeline,
  };
};

/**
 * ==========================================================
 * Memory Health
 * ==========================================================
 */

function calculateMemoryHealth(
  memoryState,
) {
  const normalizedStrength =
    Math.min(
      memoryState.strength / 40,
      1,
    );

  const normalizedStability =
    Math.min(
      Math.log10(
        memoryState.stability + 1,
      ) / 4,
      1,
    );

  const health =
    normalizedStrength * 40 +
    normalizedStability * 60;

  return Number(
    health.toFixed(1),
  );
}

/**
 * ==========================================================
 * Memory Stage
 * ==========================================================
 */

function calculateMemoryStage(
  stability,
) {
  if (stability < 7)
    return 'Fragile';

  if (stability < 30)
    return 'Growing';

  if (stability < 120)
    return 'Strong';

  if (stability < 365)
    return 'Long-Term';

  return 'Mastered';
}

/**
 * ==========================================================
 * Forget Risk
 * ==========================================================
 */

function calculateForgetRisk(
  nextRevision,
) {
  if (nextRevision <= 3)
    return 'High';

  if (nextRevision <= 10)
    return 'Medium';

  return 'Low';
}