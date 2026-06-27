import { UserProblemStats } from '../../../models/UserProblemStats.model.js';
import { getMemoryAnalytics } from './memoryAnalytics.service.js';
import { generateAICoach } from './aiCoach.service.js';
import { generateLearningDNA } from './learningDNA.service.js';
import { generateLearningReport } from './learningReport.service.js';
import { generateMemoryBattle } from './memoryBattle.service.js';

export async function getProblemAnalytics({
  userId,
  problemId,
}) {

  console.log("USER:", userId.toString());
  console.log("PROBLEM:", problemId);

  const stats = await UserProblemStats.findOne({
    user: userId,
    problem: problemId,
  }).lean();

  console.log("FOUND STATS:");
  console.log(stats);

  if (!stats) {
    const allStats = await UserProblemStats.find().lean();

    console.log("ALL USER PROBLEM STATS:");
    console.log(allStats);

    return null;
  }

const analytics = getMemoryAnalytics({
  memoryState: {
    strength: stats.memoryStrength,
    stability: stats.stability,
    retrievability: 100,
  },
});

analytics.trend = stats.trend;

const learningDNA = generateLearningDNA(stats);

const learningReport =
  generateLearningReport({
    stats,
  });

const memoryBattle = generateMemoryBattle({
  memoryState: {
    strength: stats.memoryStrength,
    stability: stats.stability,
    retrievability: 100,
  },
});


return {
  ...analytics,
  aiCoach: generateAICoach({
    analytics,
  }),
  learningDNA,
  learningReport,
  memoryBattle,
};
}