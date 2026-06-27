import { UserProblemStats } from '../../../models/UserProblemStats.model.js';
import { Problem } from '../../../models/Problem.model.js';
import { getMemoryAnalytics } from './memoryAnalytics.service.js';

/**
 * ==========================================================
 * CodeRevise AI V8
 * Revision Queue
 * ==========================================================
 *
 * Returns all problems sorted by priority.
 */

export const getRevisionQueue = async () => {
  const stats = await UserProblemStats.find()
    .populate({
      path: 'problem',
      model: Problem,
    })
    .lean();

  const queue = stats.map((item) => {
    const analytics = getMemoryAnalytics({
      memoryState: {
        strength: item.memoryStrength ?? 1,
        stability: item.stability ?? 3,
        retrievability: 100,
      },
    });

    return {
      id: item.problem?._id,

      title: item.problem?.title,

      difficulty:
        item.problem?.difficulty,

      platform:
        item.problem?.platform,

      nextRevisionIn:
        analytics.nextRevisionIn,

      forgetRisk:
        analytics.forgetRisk,

      memoryHealth:
        analytics.memoryHealth,

      memoryStage:
        analytics.memoryStage,

      strength:
        analytics.strength,

      stability:
        analytics.stability,

      retrievability:
        analytics.retrievability,
    };
  });

  queue.sort(
    (a, b) =>
      a.nextRevisionIn -
      b.nextRevisionIn,
  );

  return queue;
};