import { ProblemAttempt } from '../models/ProblemAttempt.model.js';
import { RevisionSchedule } from '../models/RevisionSchedule.model.js';
import { RevisionSession } from '../models/RevisionSession.model.js';

export async function getDashboardSummary() {
  const [
    solvedProblems,
    attemptedProblems,
    revisionSchedules,
    completedRevisions,
  ] = await Promise.all([
    ProblemAttempt.countDocuments({
      status: 'solved',
    }),

    ProblemAttempt.countDocuments(),

    RevisionSchedule.countDocuments(),

    RevisionSession.countDocuments(),
  ]);

  const activeRevisions = await RevisionSchedule.countDocuments({
  isActive: true,
});

const dueRevisions = await RevisionSchedule.countDocuments({
  nextRevisionAt: {
    $lte: new Date(),
  },
});

return {
  solvedProblems,
  attemptedProblems,
  revisionSchedules,
  completedRevisions,
  activeRevisions,
  dueRevisions,
};
}


export async function getDashboardProgress() {
  const now = new Date();

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

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