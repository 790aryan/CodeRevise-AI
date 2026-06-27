import { getProblemAnalytics } from '../services/memory/analytics/problemAnalytics.service.js';

export async function getProblemAnalyticsController(
  req,
  res,
  next,
) {
  try {
const analytics =
  await getProblemAnalytics({
    userId: req.user._id,
    problemId: req.params.problemId,
  });

    res.json(analytics);
  } catch (error) {
    next(error);
  }
}