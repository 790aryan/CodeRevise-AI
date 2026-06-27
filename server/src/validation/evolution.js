import { processReviewEvent } from '../services/memory/engine/memoryEngine.service.js';

/**
 * ==========================================================
 * Memory Evolution Simulator
 * ==========================================================
 *
 * Simulates multiple reviews using the public
 * Memory Engine API.
 */

export const simulateEvolution = ({
  reviews = 10,
}) => {
  let memoryState = {
    strength: 1,
    stability: 3,
  };

  let retrievability = 100;

  const rows = [];

  for (
    let review = 1;
    review <= reviews;
    review++
  ) {
    /**
     * ------------------------------------------
     * Simulated Review Event
     * ------------------------------------------
     */
    const result =
      processReviewEvent({
        memoryState,

        reviewEvent: {
          confidence: 5,

          speedScore: 100,

          hintLevel: 'none',

          result: 'mastered',

          difficulty: 'easy',

          retrievability,
        },
      });

    /**
     * ------------------------------------------
     * Update Memory State
     * ------------------------------------------
     */
    memoryState =
      result.updatedMemoryState;

    /**
     * ------------------------------------------
     * Next Review Retrievability
     * ------------------------------------------
     */
retrievability =
  result.nextRetrievability;

    /**
     * ------------------------------------------
     * Store Benchmark Row
     * ------------------------------------------
     */
    rows.push({
      Review: review,

      Strength:
        memoryState.strength,

      Stability:
        memoryState.stability,

      RetrievalQuality:
        result.retrievalQuality,

      LearningGain:
        Number(
          result.learningGain.toFixed(2),
        ),

      Retrievability:
        Number(
          retrievability.toFixed(2),
        ),

      ReviewDay:
        result.simulation.reviewDay,
    });
  }

  console.table(rows);

  return rows;
};