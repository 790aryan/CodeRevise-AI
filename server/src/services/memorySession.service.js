import { processRevision } from './revisionEngine.service.js';

export async function processMemorySession({
  userId,
  problemId,
  confidence,
  timeTaken,
  hintLevel,
  result,
  attemptType,
  notes = '',
}) {
  return processRevision({
    userId,
    problemId,
    confidence,
    timeTaken,
    hintLevel,
    result,
    attemptType,
    notes,
  });
}