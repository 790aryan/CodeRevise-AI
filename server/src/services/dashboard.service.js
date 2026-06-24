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