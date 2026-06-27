/**
 * ==========================================================
 * CodeRevise AI Memory Engine
 * Benchmark Runner
 * ==========================================================
 *
 * Runs one benchmark scenario and prints
 * a standardized report.
 */

export const runScenario = ({
  scenario,
  execute,
}) => {
  console.log(
    '\n====================================================',
  );

  console.log(
    `Scenario : ${scenario}`,
  );

  console.log(
    '====================================================\n',
  );

  const result = execute();

  console.table([
    {
      Scenario:
        result.scenario,

      Expected:
        result.expected,

      Actual:
        result.actual,

      Status: result.pass
        ? 'PASS'
        : 'FAIL',
    },
  ]);

  console.log('');

  return result.pass;
};