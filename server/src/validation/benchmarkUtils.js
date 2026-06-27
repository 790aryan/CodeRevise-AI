/**
 * ==========================================================
 * CodeRevise AI Memory Engine
 * Benchmark Utilities
 * ==========================================================
 */

/**
 * Checks whether a value lies within an expected range.
 */
export const checkRange = (
  value,
  min,
  max,
) => {
  return value >= min && value <= max;
};

/**
 * Builds a standardized benchmark result.
 */
export const buildResult = ({
  scenario,
  actual,
  expectedRange,
}) => {
  const pass = checkRange(
    actual,
    expectedRange[0],
    expectedRange[1],
  );

  return {
    scenario,

    expected:
      `${expectedRange[0]}-${expectedRange[1]}`,

    actual,

    pass,
  };
};