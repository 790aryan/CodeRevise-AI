import { processReviewEvent } from '../../services/memory/engine/memoryEngine.service.js';

/**
 * ==========================================================
 * Benchmark
 * Long-Term Stability
 * ==========================================================
 *
 * Simulates many reviews to ensure the memory
 * engine remains numerically stable.
 */

export const longTermStability = {
  name: 'Long-Term Stability',

  execute: () => {
    let memoryState = {
      strength: 1,
      stability: 3,
    };

    let retrievability = 100;

    let previousStrength = memoryState.strength;
    let previousStability = memoryState.stability;
    let previousReviewDay = 0;

    let pass = true;

    for (let review = 1; review <= 100; review++) {

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

      memoryState =
        result.updatedMemoryState;

      retrievability =
        result.simulation.reviewRetention;

      const reviewDay =
        result.simulation.reviewDay;

      /**
       * Strength should never decrease
       */
      if (
        memoryState.strength <
        previousStrength
      ) {
        pass = false;
      }

      /**
       * Stability should never decrease
       */
      if (
        memoryState.stability <
        previousStability
      ) {
        pass = false;
      }

      /**
       * Review interval should never shrink
       */
      if (
        reviewDay <
        previousReviewDay
      ) {
        pass = false;
      }

      previousStrength =
        memoryState.strength;

      previousStability =
        memoryState.stability;

      previousReviewDay =
        reviewDay;
    }

    return {
      scenario:
        'Long-Term Stability',

      expected:
        'Monotonic Growth',

      actual:
        `Strength=${memoryState.strength.toFixed(2)}, Stability=${memoryState.stability.toFixed(2)}, ReviewDay=${previousReviewDay}`,

      pass,
    };
  },
};