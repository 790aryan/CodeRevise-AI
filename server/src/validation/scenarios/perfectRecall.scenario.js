import { processReviewEvent } from '../../services/memory/engine/memoryEngine.service.js';
import { buildResult } from '../benchmarkUtils.js';

/**
 * ==========================================================
 * Benchmark
 * Perfect Recall
 * ==========================================================
 */

export const perfectRecall = {
  name: 'Perfect Recall',

  execute: () => {
    let memoryState = {
      strength: 1,
      stability: 3,
    };

    const result =
      processReviewEvent({
        memoryState,

        reviewEvent: {
          confidence: 5,

          speedScore: 100,

          hintLevel: 'none',

          result: 'mastered',

          difficulty: 'easy',

          retrievability: 100,
        },
      });

    return buildResult({
      scenario: 'Perfect Recall',

      actual:
        result.simulation.reviewDay,

      expectedRange: [2, 4],
    });
  },
};