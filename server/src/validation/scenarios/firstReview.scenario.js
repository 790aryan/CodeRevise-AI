/**
 * ==========================================================
 * Memory Engine Validation
 * First Review Scenario
 * ==========================================================
 *
 * Expected behaviour:
 *
 * ✔ New memory
 * ✔ High confidence
 * ✔ Fast solve
 * ✔ Memory should improve
 * ✔ Review interval should be short
 */

export const firstReviewScenario = () => {
  return buildResult({
    scenario: 'Perfect Recall',

    actual:
        simulation.reviewDay,

    expectedRange: [2,4],
});
};