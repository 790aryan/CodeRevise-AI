import { processReviewEvent } from '../../services/memory/engine/memoryEngine.service.js';

export const difficultyScaling = {
  name: 'Difficulty Scaling',

  execute: () => {
    const memoryState = {
      strength: 2,
      stability: 10,
    };

    const easy = processReviewEvent({
      memoryState,
      reviewEvent: {
        confidence: 5,
        speedScore: 100,
        hintLevel: 'none',
        result: 'mastered',
        difficulty: 'easy',
        retrievability: 80,
      },
    });

    const medium = processReviewEvent({
      memoryState,
      reviewEvent: {
        confidence: 5,
        speedScore: 100,
        hintLevel: 'none',
        result: 'mastered',
        difficulty: 'medium',
        retrievability: 80,
      },
    });

    const hard = processReviewEvent({
      memoryState,
      reviewEvent: {
        confidence: 5,
        speedScore: 100,
        hintLevel: 'none',
        result: 'mastered',
        difficulty: 'hard',
        retrievability: 80,
      },
    });

    const easyStability = easy.updatedMemoryState.stability;
    const mediumStability = medium.updatedMemoryState.stability;
    const hardStability = hard.updatedMemoryState.stability;

    return {
      scenario: 'Difficulty Scaling',
      expected: 'Hard > Medium > Easy',
      actual: `${hardStability.toFixed(2)} > ${mediumStability.toFixed(2)} > ${easyStability.toFixed(2)}`,
      pass:
        hardStability > mediumStability &&
        mediumStability > easyStability,
    };
  },
};