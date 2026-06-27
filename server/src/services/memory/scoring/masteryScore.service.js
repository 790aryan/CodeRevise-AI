import {
  MASTERY_SCORE_WEIGHTS,
  SCORE_LIMITS,
} from '../../../constants/scoring.constants.js';

/**
 * Restrict score to configured limits.
 */
const clamp = (
  value,
  min = SCORE_LIMITS.MIN,
  max = SCORE_LIMITS.MAX,
) => Math.max(min, Math.min(max, value));

/**
 * Validate input.
 */
const validateInputs = ({
  memoryScore,
  learningVelocity,
  currentSuccessStreak,
  successfulAttempts,
}) => {
  if (typeof memoryScore !== 'number' || memoryScore < 0) {
    throw new Error('Memory score must be a non-negative number.');
  }

  if (typeof learningVelocity !== 'number') {
    throw new Error('Learning velocity must be a number.');
  }

  if (
    typeof currentSuccessStreak !== 'number' ||
    currentSuccessStreak < 0
  ) {
    throw new Error(
      'Current success streak must be a non-negative number.',
    );
  }

  if (
    typeof successfulAttempts !== 'number' ||
    successfulAttempts < 0
  ) {
    throw new Error(
      'Successful attempts must be a non-negative number.',
    );
  }
};

/**
 * Experience Score
 *
 * Measures how much evidence we have that the user truly
 * understands the problem.
 *
 * Four successful revisions are considered sufficient
 * evidence to reach maximum experience.
 */
const calculateExperienceScore = (successfulAttempts) =>
  clamp(successfulAttempts * 25);

/**
 * Consistency Score
 *
 * Rewards consecutive successful revisions.
 *
 * Five consecutive successful revisions = 100.
 */
const calculateConsistencyScore = (
  currentSuccessStreak,
) => clamp(currentSuccessStreak * 20);

/**
 * Velocity Score
 *
 * Converts learning velocity (-100 to +100)
 * into a normalized score (0-100).
 */
const calculateVelocityScore = (
  learningVelocity,
) => clamp((learningVelocity + 100) / 2);

/**
 * Calculates Long-Term Mastery Score (0-100)
 */
export const calculateMasteryScore = ({
  memoryScore,
  learningVelocity = 0,
  currentSuccessStreak = 0,
  successfulAttempts = 0,
}) => {
  validateInputs({
    memoryScore,
    learningVelocity,
    currentSuccessStreak,
    successfulAttempts,
  });

  const weightedMemoryScore =
    clamp(memoryScore) *
    MASTERY_SCORE_WEIGHTS.MEMORY;

  const weightedConsistencyScore =
    calculateConsistencyScore(currentSuccessStreak) *
    MASTERY_SCORE_WEIGHTS.CONSISTENCY;

  const weightedExperienceScore =
    calculateExperienceScore(successfulAttempts) *
    MASTERY_SCORE_WEIGHTS.EXPERIENCE;

  const weightedVelocityScore =
    calculateVelocityScore(learningVelocity) *
    MASTERY_SCORE_WEIGHTS.LEARNING_VELOCITY;

  const masteryScore =
    weightedMemoryScore +
    weightedConsistencyScore +
    weightedExperienceScore +
    weightedVelocityScore;

  return Math.round(clamp(masteryScore) * 10) / 10;
};