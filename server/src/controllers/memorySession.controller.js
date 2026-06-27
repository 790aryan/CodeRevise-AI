import {
  processMemorySession,
} from '../services/memorySession.service.js';

export async function processMemorySessionController(
  req,
  res,
  next,
) {
  try {
    const result =
      await processMemorySession({
        userId: req.user._id,
        ...req.body,
      });

    res.json(result);
  } catch (error) {
    next(error);
  }
}