import { processReviewEvent } from '../../services/memory/engine/memoryEngine.service.js';

/**
 * ==========================================================
 * Benchmark
 * Cramming Detection
 * ==========================================================
 */

export const cramming = {
  name: 'Cramming',

  execute: () => {
    const memoryState = {
      strength: 2,
      stability: 10,
    };

    /**
     * ------------------------------------------
     * Immediate Review (Cramming)
     * ------------------------------------------
     */

    const crammingReview =
      processReviewEvent({
        memoryState,

        reviewEvent: {
          confidence: 5,
          speedScore: 100,
          hintLevel: 'none',
          result: 'mastered',
          difficulty: 'easy',

          // Memory is still almost perfect
          retrievability: 100,
        },
      });

    /**
     * ------------------------------------------
     * Properly Spaced Review
     * ------------------------------------------
     */

    const spacedReview =
      processReviewEvent({
        memoryState,

        reviewEvent: {
          confidence: 5,
          speedScore: 100,
          hintLevel: 'none',
          result: 'mastered',
          difficulty: 'easy',

          // User almost forgot it
          retrievability: 75,
        },
      });

    const pass =
      spacedReview.learningGain >
      crammingReview.learningGain;

    return {
      scenario: 'Cramming',

      expected:
        'Spaced Review > Immediate Review',

      actual:
        `${spacedReview.learningGain.toFixed(2)} > ${crammingReview.learningGain.toFixed(2)}`,

      pass,
    };
  },
};