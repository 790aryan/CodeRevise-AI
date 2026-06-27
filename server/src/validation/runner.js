/**
 * ==========================================================
 * CodeRevise AI Memory Engine
 * Validation Runner
 * ==========================================================
 *
 * Executes all validation scenarios.
 */

export const runScenario = ({
  name,
  execute,
}) => {
  console.log(
    '\n======================================',
  );

  console.log(`Scenario : ${name}`);

  console.log(
    '======================================',
  );

  const result = execute();

console.table([
  {
    Scenario:
      result.Scenario,

    Expected:
      result.Expected,

    Actual:
      result.Actual,

    Result:
      result.Result,
  },
]);

if (result.pass) {
  console.log(
    '✅ Scenario Passed\n',
  );
} else {
  console.log(
    '❌ Scenario Failed\n',
  );
}

  return result;
};