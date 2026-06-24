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