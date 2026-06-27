
// ======================================================
// Score Limits
// ======================================================
export const SCORE_LIMITS = Object.freeze({
  MIN: 0,
  MAX: 100,
});

// ======================================================
// Memory Score Weights (Total = 1.0)
// ======================================================
export const MEMORY_SCORE_WEIGHTS = Object.freeze({
  CONFIDENCE: 0.30,
  SPEED: 0.20,
  HINT_USAGE: 0.20,
  RESULT: 0.20,
  CONSISTENCY: 0.10,
});

// ======================================================
// Mastery Score Weights (Total = 1.0)
// ======================================================
export const MASTERY_SCORE_WEIGHTS = Object.freeze({
  MEMORY: 0.40,
  CONSISTENCY: 0.20,
  EXPERIENCE: 0.20,
  LEARNING_VELOCITY: 0.20,
});

// ======================================================
// Learning Velocity Weights (Total = 1.0)
// ======================================================
export const LEARNING_VELOCITY_WEIGHTS = Object.freeze({
  CONFIDENCE_IMPROVEMENT: 0.35,
  SPEED_IMPROVEMENT: 0.25,
  HINT_REDUCTION: 0.20,
  RESULT_IMPROVEMENT: 0.20,
});

// ======================================================
// Hint Usage Scores
// ======================================================
export const HINT_SCORES = Object.freeze({
  NONE: 100,
  SMALL: 80,
  MAJOR: 50,
  EDITORIAL: 20,
});

// ======================================================
// Revision Result Scores
// ======================================================
export const RESULT_SCORES = Object.freeze({
  FORGOT: 20,
  STRUGGLED: 50,
  SOLVED: 80,
  MASTERED: 100,
});

// ======================================================
// Revision Interval Limits (Days)
// ======================================================
export const REVISION_INTERVAL_LIMITS = Object.freeze({
  MIN_DAYS: 1,
  MAX_DAYS: 90,
});

// ======================================================
// Memory Decay Configuration
// ======================================================
export const MEMORY_DECAY = Object.freeze({
  DAILY_DECAY_RATE: 0.015,
  MIN_EFFECTIVE_MEMORY: 5,
});

// ======================================================
// AI Intervention Thresholds
// ======================================================
export const AI_INTERVENTION = Object.freeze({
  MEMORY_THRESHOLD: 40,
  CONFIDENCE_THRESHOLD: 2,
  MASTERY_THRESHOLD: 35,
});

// ======================================================
// Learning Velocity Classification
// ======================================================
export const LEARNING_VELOCITY = Object.freeze({
  VERY_SLOW: 20,
  SLOW: 40,
  NORMAL: 60,
  FAST: 80,
  VERY_FAST: 100,
});



// ======================================================
// Difficulty Expected Solve Time (Seconds)
// ======================================================
export const EXPECTED_SOLVE_TIME = Object.freeze({
  EASY: 10 * 60,
  MEDIUM: 25 * 60,
  HARD: 45 * 60,
});


export const TREND = Object.freeze({
  MAX_POINTS: 5,
});


export const RESULT_RANK = Object.freeze({
  FORGOT: 1,
  STRUGGLED: 2,
  SOLVED: 3,
  MASTERED: 4,
});

export const HINT_RANK = Object.freeze({
  EDITORIAL: 1,
  MAJOR: 2,
  SMALL: 3,
  NONE: 4,
});


export const REVISION_LIMITS = Object.freeze({
  COOLDOWN_HOURS: 12,
});

export const MASTERY_THRESHOLDS = Object.freeze({
  MASTERED: 80,
});