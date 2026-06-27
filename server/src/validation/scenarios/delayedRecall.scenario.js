import { processReviewEvent } from '../../services/memory/engine/memoryEngine.service.js';

/**
 * ==========================================================
 * Benchmark
 * Delayed Recall
 * ==========================================================
 *
 * A successful recall after memory has weakened
 * should strengthen stability more than an
 * immediate successful recall.
 */

export const delayedRecall = {
  name: 'Delayed Recall',

  execute: () => {
    const memoryState = {
      strength: 2,
      stability: 10,
    };

    /**
     * Fresh memory
     */
    const immediateReview =
      processReviewEvent({
        memoryState,

        reviewEvent: {
          confidence: 5,
          speedScore: 100,
          hintLevel: 'none',
          result: 'mastered',
          difficulty: 'easy',

          retrievability: 95,
        },
      });

    /**
     * Nearly forgotten memory
     */
    const delayedReview =
      processReviewEvent({
        memoryState,

        reviewEvent: {
          confidence: 5,
          speedScore: 100,
          hintLevel: 'none',
          result: 'mastered',
          difficulty: 'easy',

          retrievability: 45,
        },
      });

    const immediateGain =
      immediateReview.updatedMemoryState.stability;

    const delayedGain =
      delayedReview.updatedMemoryState.stability;

    return {
      scenario: 'Delayed Recall',

      expected:
        'Delayed Stability > Immediate Stability',

      actual:
        `${delayedGain.toFixed(2)} > ${immediateGain.toFixed(2)}`,

      pass:
        delayedGain > immediateGain,
    };
  },
};