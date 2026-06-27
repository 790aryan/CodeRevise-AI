import {
  EXPECTED_SOLVE_TIME,
  HINT_SCORES,
  MEMORY_SCORE_WEIGHTS,
  RESULT_SCORES,
  SCORE_LIMITS,
} from '../../../constants/scoring.constants.js';

/**
 * Validate input.
 */
const validateInputs = ({
  confidence,
  timeTaken,
  hintLevel,
  result,
  difficulty,
}) => {
  if (typeof confidence !== 'number') {
    throw new Error('Confidence must be a number.');
  }

  if (typeof timeTaken !== 'number' || timeTaken < 0) {
    throw new Error('Time taken must be a non-negative number.');
  }

  if (!hintLevel) {
    throw new Error('Hint level is required.');
  }

  if (!result) {
    throw new Error('Revision result is required.');
  }

  if (!difficulty) {
    throw new Error('Problem difficulty is required.');
  }
};

/**
 * Confidence (1–5 → 20–100)
 */
const calculateConfidenceScore = (confidence) =>
  (confidence / 5) * 100;

/**
 * Hint score
 */
const calculateHintScore = (hintLevel) =>
  HINT_SCORES[hintLevel.toUpperCase()] ?? 0;

/**
 * Revision result score
 */
const calculateResultScore = (result) =>
  RESULT_SCORES[result.toUpperCase()] ?? 0;

/**
 * Speed score
 */
const calculateSpeedScore = (timeTaken, difficulty) => {
  const expectedTime =
    EXPECTED_SOLVE_TIME[difficulty.toUpperCase()] ??
    EXPECTED_SOLVE_TIME.MEDIUM;

  if (timeTaken <= expectedTime) {
    return 100;
  }

  return Math.max(0, (expectedTime / timeTaken) * 100);
};

/**
 * Consistency score
 */
const calculateConsistencyScore = (currentSuccessStreak = 0) =>
  Math.min(currentSuccessStreak * 20, 100);

/**
 * Clamp score between configured limits.
 */
const clampScore = (score) =>
  Math.max(
    SCORE_LIMITS.MIN,
    Math.min(SCORE_LIMITS.MAX, score),
  );

/**
 * Calculates Memory Score (0–100)
 */
export const calculateMemoryScore = ({
  confidence,
  timeTaken,
  hintLevel,
  result,
  currentSuccessStreak = 0,
  difficulty = 'medium',
}) => {
  validateInputs({
    confidence,
    timeTaken,
    hintLevel,
    result,
    difficulty,
  });

  const confidencePoints =
    calculateConfidenceScore(confidence) *
    MEMORY_SCORE_WEIGHTS.CONFIDENCE;

  const speedPoints =
    calculateSpeedScore(timeTaken, difficulty) *
    MEMORY_SCORE_WEIGHTS.SPEED;

  const hintPoints =
    calculateHintScore(hintLevel) *
    MEMORY_SCORE_WEIGHTS.HINT_USAGE;

  const resultPoints =
    calculateResultScore(result) *
    MEMORY_SCORE_WEIGHTS.RESULT;

  const consistencyPoints =
    calculateConsistencyScore(currentSuccessStreak) *
    MEMORY_SCORE_WEIGHTS.CONSISTENCY;

  const total =
    confidencePoints +
    speedPoints +
    hintPoints +
    resultPoints +
    consistencyPoints;

  return Math.round(clampScore(total) * 10) / 10;
};