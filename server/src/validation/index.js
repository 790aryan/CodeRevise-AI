import { runScenario } from './benchmarkRunner.js';
import { perfectRecall } from './scenarios/perfectRecall.scenario.js';
import { failedRecall } from './scenarios/failedRecall.scenario.js';
import { cramming } from './scenarios/cramming.scenario.js';
import { delayedRecall } from './scenarios/delayedRecall.scenario.js';
import { difficultyScaling } from './scenarios/difficultyScaling.scenario.js';
import { longTermStability } from './scenarios/longTermStability.scenario.js';
/**
 * ==========================================================
 * CodeRevise AI Memory Engine Benchmark Suite
 * ==========================================================
 */

const scenarios = [
  perfectRecall,
  failedRecall,
  cramming,
  delayedRecall,
  difficultyScaling,
  longTermStability,
];

let passed = 0;

console.log(
  '\n==========================================================',
);

console.log(
  '        CodeRevise AI Memory Engine Benchmark',
);

console.log(
  '==========================================================',
);

for (const scenario of scenarios) {
  const success =
    runScenario({
      scenario: scenario.name,
      execute: scenario.execute,
    });

  if (success) {
    passed++;
  }
}

console.log(
  '==========================================================',
);

console.log(
  `Total Passed : ${passed}/${scenarios.length}`,
);

console.log(
  `Overall Score : ${(
    (passed / scenarios.length) *
    100
  ).toFixed(0)}%`,
);

console.log(
  '==========================================================\n',
);