/**
 * ======================================================
 * Adaptive Revision Scheduler (V8 Fuzzed)
 * ======================================================
 *
 * Takes the raw predicted review day from the retention 
 * simulator and applies a slight randomization (fuzz) 
 * to prevent overwhelming "Review Spikes".
 */

export const calculateRevisionInterval = ({
  simulatedReviewDay,
}) => {
  if (simulatedReviewDay <= 1) {
    return 1;
  }

  // Apply a +/- 5% fuzz factor, with a minimum variation of 1 day for longer intervals
  const fuzzRange = Math.max(1, Math.round(simulatedReviewDay * 0.05));
  
  // Generate random number between -fuzzRange and +fuzzRange
  const fuzz = Math.floor(Math.random() * (fuzzRange * 2 + 1)) - fuzzRange;

  // Ensure we never schedule for 0 or negative days
  return Math.max(1, simulatedReviewDay + fuzz);
};