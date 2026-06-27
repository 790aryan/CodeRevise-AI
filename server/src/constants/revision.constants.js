
// ===============================================
// Revision Results
// ===============================================

export const REVISION_RESULTS = Object.freeze({
  FORGOT: 'forgot',
  STRUGGLED: 'struggled',
  SOLVED: 'solved',
  MASTERED: 'mastered',
});

// Helper array for Mongoose Schema validation
export const REVISION_RESULT_VALUES = Object.values(REVISION_RESULTS);

// ===============================================
// Hint Levels
// ===============================================

export const HINT_LEVELS = Object.freeze({
  NONE: 'none',
  SMALL: 'small',
  MAJOR: 'major',
  EDITORIAL: 'editorial',
});

export const HINT_LEVEL_VALUES = Object.values(HINT_LEVELS);

// ===============================================
// Attempt Types
// ===============================================

export const ATTEMPT_TYPES = Object.freeze({
  FIRST_SOLVE: 'first_solve',
  REVISION: 'revision',
  CONTEST: 'contest',
  MOCK_INTERVIEW: 'mock_interview',
});

export const ATTEMPT_TYPE_VALUES = Object.values(ATTEMPT_TYPES);

// ===============================================
// Confidence Limits
// ===============================================

export const CONFIDENCE_LIMITS = Object.freeze({
  MIN: 1,
  MAX: 5,
});

