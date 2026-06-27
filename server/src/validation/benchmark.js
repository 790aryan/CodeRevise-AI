import { runScenario } from './runner.js';
import { firstReviewScenario } from './scenarios/firstReview.scenario.js';
import { secondReviewScenario } from './scenarios/secondReview.scenario.js';
import { updateMemoryState } from '../services/memory/engine/memoryUpdate.service.js';
import { simulateRetention } from '../services/memory/simulation/retentionSimulator.service.js';
import {
  benchmarkResult,
} from './utils/assertion.js';
/**
 * ==========================================================
 * Memory Engine Benchmark
 * ==========================================================
 */

const executeSecondReview = () => {
  const scenario = secondReviewScenario();

  const input = scenario.input;

  const updatedMemoryState =
    updateMemoryState({
      memoryState: input.initialMemory,

      learningGain: input.learningGain,

      retrievalQuality: input.retrievalQuality,

      retrievability: input.retrievability,

      result: input.result,

      difficulty: input.difficulty,
    });

  const simulation =
    simulateRetention({
      memoryState: updatedMemoryState,
    });

return benchmarkResult({
  name: scenario.name,

  actual: simulation.reviewDay,

  expected:
    scenario.expected
      .reviewDayRange,
});
};

/**
 * ==========================================================
 * Run Benchmarks
 * ==========================================================
 */

export const runBenchmarks =
  () => {
runScenario({
  name: 'Second Review',

  execute: executeSecondReview,
});
  };