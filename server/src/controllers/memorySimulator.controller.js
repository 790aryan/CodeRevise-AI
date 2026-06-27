import { processRevision } from '../services/revisionEngine.service.js';

export async function simulateRevision(
  req,
  res,
  next,
) {
  try {
    const prediction =
      await processRevision({
        simulate: true,

        userId: req.user._id,

        problemId:
          req.body.problemId,

        confidence:
          req.body.confidence,

        timeTaken:
          req.body.timeTaken,

        hintLevel:
          req.body.hintLevel,

        result:
          req.body.result,

        attemptType:
          req.body.attemptType,

        notes:
          req.body.notes ?? '',
      });

    res.json(prediction);
  } catch (error) {
    next(error);
  }
}