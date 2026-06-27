/**
 * ==========================================================
 * Memory Engine Benchmark
 * Second Review Scenario
 * ==========================================================
 */

export const secondReviewScenario = () => {
  return buildResult({
    scenario: 'Perfect Recall',

    actual:
        simulation.reviewDay,

    expectedRange: [2,4],
});
};