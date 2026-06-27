import { processReviewEvent } from '../../services/memory/engine/memoryEngine.service.js';
import { buildResult } from '../benchmarkUtils.js';

export const failedRecall = {
  name: 'Failed Recall',

  execute: () => {
    const memoryState = {
      strength: 2,
      stability: 10,
    };

    const result =
      processReviewEvent({
        memoryState,

        reviewEvent: {
          confidence: 1,
          speedScore: 20,
          hintLevel: 'editorial',
          result: 'failed',
          difficulty: 'easy',
          retrievability: 40,
        },
      });

    return buildResult({
      scenario: 'Failed Recall',

      actual: result.updatedMemoryState.stability,

      // Stability should shrink or grow only slightly,
      // but should never collapse to zero.
      expectedRange: [8, 11],
    });
  },
};