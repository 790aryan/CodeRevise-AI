const INTERVALS = {
  again: 1,
  hard: 3,
  good: 7,
  easy: 14,
};

export function calculateNextRevision(result) {
  const days = INTERVALS[result] ?? 1;

  const nextRevisionAt = new Date();

  nextRevisionAt.setDate(
    nextRevisionAt.getDate() + days,
  );

  return {
    currentIntervalDays: days,
    nextRevisionAt: nextRevisionAt.toISOString(),
  };
}