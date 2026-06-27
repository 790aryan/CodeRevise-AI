import { addDays } from '../../../utils/date.utils.js';

/**
 * =====================================================
 * Predict Forget Date
 * =====================================================
 *
 * Predicts when the user is likely to forget
 * the problem after the next scheduled revision.
 */
export const calculatePredictedForgetDate = ({
  nextRevisionDate,
  memoryScore,
}) => {
  let extraDays = 1;

  if (memoryScore >= 90) {
    extraDays = 14;
  } else if (memoryScore >= 80) {
    extraDays = 7;
  } else if (memoryScore >= 60) {
    extraDays = 4;
  } else if (memoryScore >= 40) {
    extraDays = 2;
  }

  return addDays(nextRevisionDate, extraDays);
};