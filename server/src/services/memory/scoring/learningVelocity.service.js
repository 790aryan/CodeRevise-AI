import {
  EXPECTED_SOLVE_TIME,
  HINT_RANK,
  LEARNING_VELOCITY_WEIGHTS,
  RESULT_RANK,
} from '../../../constants/scoring.constants.js';

const clamp = (value, min = -100, max = 100) =>
  Math.max(min, Math.min(max, value));

const validateInputs = ({ current, previous, difficulty }) => {
  if (!difficulty) {
    throw new Error('Problem difficulty is required.');
  }

  if (!previous) {
    return false;
  }

  const required = [
    'confidence',
    'timeTaken',
    'hintLevel',
    'result',
  ];

  for (const key of required) {
    if (current[key] === undefined || previous[key] === undefined) {
      throw new Error(`Missing required field: ${key}`);
    }
  }

  return true;
};

const calculateConfidenceDelta = (current, previous) => {
  return ((current - previous) / 4) * 100;
};

const calculateSpeedDelta = (
  currentTime,
  previousTime,
  difficulty,
) => {
  const expected =
    EXPECTED_SOLVE_TIME[difficulty.toUpperCase()] ??
    EXPECTED_SOLVE_TIME.MEDIUM;

  const delta = previousTime - currentTime;

  return clamp((delta / expected) * 100);
};

const calculateHintDelta = (
  currentHint,
  previousHint,
) => {
  const current =
    HINT_RANK[currentHint.toUpperCase()] ?? 1;

  const previous =
    HINT_RANK[previousHint.toUpperCase()] ?? 1;

  return ((current - previous) / 3) * 100;
};

const calculateResultDelta = (
  currentResult,
  previousResult,
) => {
  const current =
    RESULT_RANK[currentResult.toUpperCase()] ?? 1;

  const previous =
    RESULT_RANK[previousResult.toUpperCase()] ?? 1;

  return ((current - previous) / 3) * 100;
};

export const calculateLearningVelocity = ({
  current,
  previous,
  difficulty = 'medium',
}) => {
  const hasPrevious = validateInputs({
    current,
    previous,
    difficulty,
  });

  if (!hasPrevious) {
    return 0;
  }

  const confidence =
    calculateConfidenceDelta(
      current.confidence,
      previous.confidence,
    ) *
    LEARNING_VELOCITY_WEIGHTS.CONFIDENCE_IMPROVEMENT;

  const speed =
    calculateSpeedDelta(
      current.timeTaken,
      previous.timeTaken,
      difficulty,
    ) *
    LEARNING_VELOCITY_WEIGHTS.SPEED_IMPROVEMENT;

  const hint =
    calculateHintDelta(
      current.hintLevel,
      previous.hintLevel,
    ) *
    LEARNING_VELOCITY_WEIGHTS.HINT_REDUCTION;

  const result =
    calculateResultDelta(
      current.result,
      previous.result,
    ) *
    LEARNING_VELOCITY_WEIGHTS.RESULT_IMPROVEMENT;

  const velocity =
    confidence +
    speed +
    hint +
    result;

  return Math.round(clamp(velocity) * 10) / 10;
};