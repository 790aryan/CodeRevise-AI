import {
  MEMORY_DECAY,
  SCORE_LIMITS,
} from '../../../constants/scoring.constants.js';

/**
 * Restricts memory score within configured limits.
 */
const clampMemory = (
  value,
  min = SCORE_LIMITS.MIN,
  max = SCORE_LIMITS.MAX,
) => Math.max(min, Math.min(max, value));

/**
 * Validate input.
 */
const validateInputs = ({
  memoryScore,
  daysSinceLastReview,
  difficulty,
}) => {
  if (
    typeof memoryScore !== 'number' ||
    memoryScore < SCORE_LIMITS.MIN
  ) {
    throw new Error(
      'Memory score must be a non-negative number.',
    );
  }

  if (
    typeof daysSinceLastReview !== 'number' ||
    daysSinceLastReview < 0
  ) {
    throw new Error(
      'Days since last review must be a non-negative number.',
    );
  }

  if (!difficulty) {
    throw new Error('Problem difficulty is required.');
  }
};

/**
 * Returns the decay multiplier based on difficulty.
 */
const getDifficultyDecayMultiplier = (
  difficulty,
) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 0.8;

    case 'medium':
      return 1.0;

    case 'hard':
      return 1.2;

    default:
      return 1.0;
  }
};

/**
 * Calculates Effective Memory using an exponential
 * forgetting curve.
 *
 * effectiveMemory =
 * storedMemory × e^(-kt)
 */
export const calculateEffectiveMemory = ({
  memoryScore,
  daysSinceLastReview,
  difficulty = 'medium',
}) => {
  validateInputs({
    memoryScore,
    daysSinceLastReview,
    difficulty,
  });

  const decayRate =
    MEMORY_DECAY.DAILY_DECAY_RATE *
    getDifficultyDecayMultiplier(difficulty);

  const effectiveMemory =
    memoryScore *
    Math.exp(-decayRate * daysSinceLastReview);

  return Math.round(
    clampMemory(effectiveMemory) * 10,
  ) / 10;
};

/**
 * Utility helper.
 *
 * Calculates whole days since the last review.
 */
export const calculateDaysSinceReview = (
  lastReviewedAt,
) => {
  if (!(lastReviewedAt instanceof Date)) {
    throw new Error(
      'lastReviewedAt must be a Date object.',
    );
  }

  const milliseconds =
    Date.now() - lastReviewedAt.getTime();

  return Math.max(
    0,
    Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
  );
};

/**
 * Predicts whether the memory has crossed
 * the forgetting threshold.
 */
export const hasMemoryDecayed = ({
  memoryScore,
  daysSinceLastReview,
  difficulty = 'medium',
}) => {
  const effectiveMemory =
    calculateEffectiveMemory({
      memoryScore,
      daysSinceLastReview,
      difficulty,
    });

  return (
    effectiveMemory <=
    MEMORY_DECAY.MIN_EFFECTIVE_MEMORY
  );
};