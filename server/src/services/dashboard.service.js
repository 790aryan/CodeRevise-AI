import { ProblemAttempt } from '../models/ProblemAttempt.model.js';
import { RevisionSchedule } from '../models/RevisionSchedule.model.js';
import { RevisionSession } from '../models/RevisionSession.model.js';
import { getMemoryAnalytics } from './memory/analytics/memoryAnalytics.service.js';
import { UserProblemStats } from '../models/UserProblemStats.model.js';

export async function getDashboardSummary() {
const [
  solvedProblems,
  attemptedProblems,
  revisionSchedules,
  completedRevisions,
  bestMemory,
] = await Promise.all([
  ProblemAttempt.countDocuments({
    status: 'solved',
  }),

  ProblemAttempt.countDocuments(),

  RevisionSchedule.countDocuments(),

  RevisionSession.countDocuments(),

  UserProblemStats.findOne()
    .sort({
      stability: -1,
    })
    .lean(),
]);

  const activeRevisions = await RevisionSchedule.countDocuments({
  isActive: true,
});

const dueRevisions = await RevisionSchedule.countDocuments({
  nextRevisionAt: {
    $lte: new Date(),
  },
});
const memoryAnalytics =
  getMemoryAnalytics({
    memoryState: {
      strength:
        bestMemory?.memoryStrength ?? 1,

      stability:
        bestMemory?.stability ?? 3,

      retrievability: 100,
    },
  });
return {
  solvedProblems,
  attemptedProblems,
  revisionSchedules,
  completedRevisions,
  activeRevisions,
  dueRevisions,
  memoryAnalytics,
};
}


export async function getDashboardProgress() {
  const today = new Date();

  const dailyActivity = [];

  for (let i = 6; i >= 0; i--) {
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);
    start.setDate(today.getDate() - i);

    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const [attempts, revisions] = await Promise.all([
      ProblemAttempt.countDocuments({
        createdAt: {
          $gte: start,
          $lt: end,
        },
      }),

      RevisionSession.countDocuments({
        createdAt: {
          $gte: start,
          $lt: end,
        },
      }),
    ]);

    dailyActivity.push({
      day: start.toLocaleDateString('en-US', {
        weekday: 'short',
      }),
      attempts,
      revisions,
    });
  }

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [
    attemptsLast7Days,
    revisionsLast7Days,
    attemptsLast30Days,
    revisionsLast30Days,
  ] = await Promise.all([
    ProblemAttempt.countDocuments({
      createdAt: {
        $gte: sevenDaysAgo,
      },
    }),

    RevisionSession.countDocuments({
      createdAt: {
        $gte: sevenDaysAgo,
      },
    }),

    ProblemAttempt.countDocuments({
      createdAt: {
        $gte: thirtyDaysAgo,
      },
    }),

    RevisionSession.countDocuments({
      createdAt: {
        $gte: thirtyDaysAgo,
      },
    }),
  ]);

  return {
    last7Days: {
      attempts: attemptsLast7Days,
      revisions: revisionsLast7Days,
    },

    last30Days: {
      attempts: attemptsLast30Days,
      revisions: revisionsLast30Days,
    },

    dailyActivity,
  };
}
export async function getRecentActivity() {
  const problemAttempts = await ProblemAttempt.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const revisionSessions = await RevisionSession.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const activities = [
    ...problemAttempts.map((attempt) => ({
      type: 'problem_attempt',
      id: attempt._id,
      problemId: attempt.problemId,
      createdAt: attempt.createdAt,
    })),

    ...revisionSessions.map((session) => ({
      type: 'revision_session',
      id: session._id,
      problemId: session.problemId,
      createdAt: session.createdAt,
    })),
  ];

  activities.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return {
    activities: activities.slice(0, 20),
  };
}

export async function getDifficultyBreakdown() {
  const attempts = await ProblemAttempt.find()
    .populate('problemId', 'difficulty')
    .lean();

  const breakdown = {};

  for (const attempt of attempts) {
    const difficulty = attempt.problemId?.difficulty;

    if (!difficulty) {
      continue;
    }

    breakdown[difficulty] = (breakdown[difficulty] || 0) + 1;
  }

  return breakdown;
}

export async function getWeakTopics() {
  const attempts = await ProblemAttempt.find()
    .populate({
      path: 'problemId',
      populate: {
        path: 'topics',
        select: 'name',
      },
    })
    .lean();

  const topicScores = {};

  for (const attempt of attempts) {
    const topics = attempt.problemId?.topics || [];

    for (const topic of topics) {
      const topicName = topic.name;

      if (!topicName) {
        continue;
      }

      if (!topicScores[topicName]) {
        topicScores[topicName] = 0;
      }

      if (attempt.status === 'solved') {
        topicScores[topicName] += 1;
      }

      if (attempt.status === 'needs_revision') {
        topicScores[topicName] -= 2;
      }

      if (attempt.mistakeType) {
        topicScores[topicName] -= 1;
      }
    }
  }

  return Object.entries(topicScores)
    .map(([topic, score]) => ({
      topic,
      score,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);
}

export async function getPlatformDistribution() {
  const attempts = await ProblemAttempt.find()
    .populate('problemId', 'platform')
    .lean();

  const platforms = {};

  for (const attempt of attempts) {
    const platform =
      attempt.problemId?.platform ?? 'Unknown';

    platforms[platform] =
      (platforms[platform] ?? 0) + 1;
  }

  return Object.entries(platforms).map(
    ([platform, count]) => ({
      platform,
      count,
    }),
  );
}

export async function getCurrentStreak() {
  const attempts = await ProblemAttempt.find(
    {},
    'createdAt',
  ).lean();

  const revisions = await RevisionSession.find(
    {},
    'createdAt',
  ).lean();

  const activityDates = new Set();

  [...attempts, ...revisions].forEach((item) => {
    const date = new Date(item.createdAt);

    date.setHours(0, 0, 0, 0);

    activityDates.add(date.getTime());
  });

  let streak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  while (activityDates.has(today.getTime())) {
    streak++;

    today.setDate(today.getDate() - 1);
  }

  return streak;
}

export async function getAccuracy() {
  const totalAttempts = await ProblemAttempt.countDocuments();

  const solvedAttempts = await ProblemAttempt.countDocuments({
    status: 'solved',
  });

  if (totalAttempts === 0) {
    return 0;
  }

  return Math.round(
    (solvedAttempts / totalAttempts) * 100,
  );
}