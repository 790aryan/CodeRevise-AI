/**
 * ======================================================
 * Memory Strength
 * ======================================================
 *
 * Converts revision performance into
 * a long-term memory strength.
 *
 * Unit:
 * days
 */

export const calculateMemoryStrength = ({
  memoryScore,
  masteryScore,
  successfulAttempts,
  currentSuccessStreak,
}) => {
  const baseStrength = 2;

  const scoreMultiplier =
    1 + memoryScore / 100;

  const masteryMultiplier =
    1 + masteryScore / 120;

  const experienceMultiplier =
    1 +
    Math.log2(
      successfulAttempts + 1,
    ) / 5;

  const streakMultiplier =
    1 +
    currentSuccessStreak / 20;

  const strength =
    baseStrength *
    scoreMultiplier *
    masteryMultiplier *
    experienceMultiplier *
    streakMultiplier;

  return Number(
    strength.toFixed(2),
  );
};