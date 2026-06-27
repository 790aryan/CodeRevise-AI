import { processRevision } from '../services/revisionEngine.service.js';

export const processRevisionController = async (
  req,
  res,
  next,
) => {
  try {
    const {
      confidence,
      timeTaken,
      hintLevel,
      result,
      attemptType,
      notes,
    } = req.body;

    const revision = await processRevision({
      userId: req.user._id,
      problemId: req.params.problemId,

      confidence,
      timeTaken,
      hintLevel,
      result,
      attemptType,
      notes,
    });

    return res.status(200).json(revision);
  } catch (error) {
    next(error);
  }
};