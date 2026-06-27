/**
 * ==========================================================
 * Benchmark Assertions
 * ==========================================================
 */

export const checkRange = (
  value,
  min,
  max,
) => {
  return value >= min && value <= max;
};

export const benchmarkResult = ({
  name,
  actual,
  expected,
}) => {
  const pass = checkRange(
    actual,
    expected[0],
    expected[1],
  );

  return {
    Scenario: name,

    Expected: `${expected[0]}-${expected[1]}`,

    Actual: actual,

    Result: pass
      ? 'PASS'
      : 'FAIL',

    pass,
  };
};