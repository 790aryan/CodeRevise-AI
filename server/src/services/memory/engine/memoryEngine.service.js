import { calculateRetrievalQuality } from '../scoring/retrievalQuality.service.js';
import { calculateLearningGain } from '../scoring/learningGain.service.js';
import { updateMemoryState } from '../engine/memoryUpdate.service.js';
import { simulateRetention } from '../simulation/retentionSimulator.service.js';
/**
 * ==========================================================
 * CodeRevise AI Memory Engine V8
 * ==========================================================
 *
 * Public API for the entire memory engine.
 *
 * Input:
 *      Review Event
 *
 * Output:
 *      Updated Memory
 *      Next Review
 */

export const processReviewEvent = ({
  memoryState,

  reviewEvent,
}) => {
  /**
   * ------------------------------------------
   * 1. Retrieval Quality
   * ------------------------------------------
   */

  const retrievalQuality =
    calculateRetrievalQuality({
      confidence:
        reviewEvent.confidence,

      speedScore:
        reviewEvent.speedScore,

      hintLevel:
        reviewEvent.hintLevel,

      result:
        reviewEvent.result,
    });

  /**
   * ------------------------------------------
   * 2. Learning Gain
   * ------------------------------------------
   */

  const learningGain =
    calculateLearningGain({
      retrievalQuality,

      retrievability:
        reviewEvent.retrievability,
    });

  /**
   * ------------------------------------------
   * 3. Update Memory
   * ------------------------------------------
   */

  const updatedMemoryState =
    updateMemoryState({
      memoryState,

      learningGain,

      retrievalQuality,

      retrievability:
        reviewEvent.retrievability,

      result:
        reviewEvent.result,

      difficulty:
        reviewEvent.difficulty,
    });

  /**
   * ------------------------------------------
   * 4. Simulate Future
   * ------------------------------------------
   */

const simulation =
  simulateRetention({
    memoryState: updatedMemoryState,
  });

const nextRetrievability =
  simulation.reviewRetention;

  return {
    retrievalQuality,

    learningGain,

    updatedMemoryState,

    simulation,

    nextRetrievability,
  };
};