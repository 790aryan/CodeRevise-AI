import mongoose from 'mongoose';
import {
  ATTEMPT_TYPES,
  CONFIDENCE_LIMITS,
  HINT_LEVELS,
  REVISION_RESULTS,
} from '../constants/revision.constants.js';

const { Schema } = mongoose;

const userProblemStatsSchema = new Schema(
  {
    // ===============================================
    // Identity
    // ===============================================
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
    },

    problem: {
      type: Schema.Types.ObjectId,
      ref: 'Problem',
      required: [true, 'Problem is required.'],
    },

    // ===============================================
    // Attempt Statistics
    // ===============================================
    attempts: {
      type: Number,
      default: 0,
      min: [0, 'Attempts cannot be negative.'],
    },

    successfulAttempts: {
      type: Number,
      default: 0,
      min: [0, 'Successful attempts cannot be negative.'],
    },

    failedAttempts: {
      type: Number,
      default: 0,
      min: [0, 'Failed attempts cannot be negative.'],
    },

    currentSuccessStreak: {
      type: Number,
      default: 0,
      min: [0, 'Current success streak cannot be negative.'],
    },

    bestSuccessStreak: {
      type: Number,
      default: 0,
      min: [0, 'Best success streak cannot be negative.'],
    },

    // ===============================================
    // Time Statistics
    // ===============================================
    totalTimeSpent: {
      type: Number,
      default: 0,
      min: [0, 'Total time spent cannot be negative.'],
    },

    averageTime: {
      type: Number,
      default: 0,
      min: [0, 'Average time cannot be negative.'],
    },

    fastestTime: {
      type: Number,
      default: null,
      min: [0, 'Fastest time cannot be negative.'],
    },

    slowestTime: {
      type: Number,
      default: null,
      min: [0, 'Slowest time cannot be negative.'],
    },

    // ===============================================
    // Confidence Statistics
    // ===============================================
    averageConfidence: {
      type: Number,
      default: 0,
      min: [
        CONFIDENCE_LIMITS.MIN,
        `Confidence cannot be less than ${CONFIDENCE_LIMITS.MIN}.`,
      ],
      max: [
        CONFIDENCE_LIMITS.MAX,
        `Confidence cannot exceed ${CONFIDENCE_LIMITS.MAX}.`,
      ],
    },

    highestConfidence: {
      type: Number,
      default: null,
      min: [
        CONFIDENCE_LIMITS.MIN,
        `Confidence cannot be less than ${CONFIDENCE_LIMITS.MIN}.`,
      ],
      max: [
        CONFIDENCE_LIMITS.MAX,
        `Confidence cannot exceed ${CONFIDENCE_LIMITS.MAX}.`,
      ],
    },

    lowestConfidence: {
      type: Number,
      default: null,
      min: [
        CONFIDENCE_LIMITS.MIN,
        `Confidence cannot be less than ${CONFIDENCE_LIMITS.MIN}.`,
      ],
      max: [
        CONFIDENCE_LIMITS.MAX,
        `Confidence cannot exceed ${CONFIDENCE_LIMITS.MAX}.`,
      ],
    },

    // ===============================================
    // Intelligence Scores
    // ===============================================
    memoryScore: {
      type: Number,
      default: 0,
      min: [0, 'Memory score cannot be negative.'],
      max: [100, 'Memory score cannot exceed 100.'],
    },

    memoryStrength: {
      type: Number,
      default: 2,
      min: [0, 'Memory strength cannot be negative.'],
    },
    
    stability: {
      type: Number,
      default: 1,
      min: [1, 'Stability must be at least 1.'],
    },

    masteryScore: {
      type: Number,
      default: 0,
      min: [0, 'Mastery score cannot be negative.'],
      max: [100, 'Mastery score cannot exceed 100.'],
    },

    learningVelocity: {
      type: Number,
      default: 0,
    },

    // ===============================================
    // Revision Planning
    // ===============================================
    recommendedRevisionInterval: {
      type: Number,
      default: 1,
      min: [1, 'Revision interval must be at least 1 day.'],
    },

    nextRevisionDate: {
      type: Date,
      default: null,
    },

    predictedForgetDate: {
      type: Date,
      default: null,
    },

    // ===============================================
    // AI
    // ===============================================
    requiresAIIntervention: {
      type: Boolean,
      default: false,
    },

    lastAIRecommendationAt: {
      type: Date,
      default: null,
    },

    // ===============================================
    // Last Review Snapshot
    // ===============================================
    lastReview: {
      confidence: {
        type: Number,
        min: CONFIDENCE_LIMITS.MIN,
        max: CONFIDENCE_LIMITS.MAX,
      },

      hintLevel: {
        type: String,
        enum: Object.values(HINT_LEVELS),
      },

      timeTaken: {
        type: Number,
        min: 0,
      },

      result: {
        type: String,
        enum: Object.values(REVISION_RESULTS),
      },

      attemptType: {
        type: String,
        enum: Object.values(ATTEMPT_TYPES),
      },
    },

    // ===============================================
    // Trend Data
    // Maintained as a maximum 5-item sliding window
    // by revisionEngine.service.js
    // ===============================================
    trend: {
      confidence: {
        type: [Number],
        default: [],
      },

      memoryScore: {
        type: [Number],
        default: [],
      },

      masteryScore: {
        type: [Number],
        default: [],
      },

      speedScore: {
        type: [Number],
        default: [],
      },
    },

    // ===============================================
    // Metadata
    // ===============================================
    lastReviewedAt: {
      type: Date,
      default: null,
    },

    lastResult: {
      type: String,
      enum: Object.values(REVISION_RESULTS),
      default: null,
    },

    lastAttemptType: {
      type: String,
      enum: Object.values(ATTEMPT_TYPES),
      default: null,
    },

    statsVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    collection: 'user_problem_stats',
    timestamps: true,
    versionKey: false,
  }
);

// ===============================================
// Indexes
// ===============================================

// One document per user/problem
userProblemStatsSchema.index(
  {
    user: 1,
    problem: 1,
  },
  {
    unique: true,
  },
);

// Dashboard: weakest problems
userProblemStatsSchema.index({
  user: 1,
  memoryScore: 1,
});

// Dashboard: today's revisions
userProblemStatsSchema.index({
  user: 1,
  nextRevisionDate: 1,
});

// AI recommendations
userProblemStatsSchema.index({
  user: 1,
  requiresAIIntervention: 1,
});

// Dashboard sorting
userProblemStatsSchema.index({
  user: 1,
  masteryScore: -1,
});

// Recent activity
userProblemStatsSchema.index({
  user: 1,
  lastReviewedAt: -1,
});

export const UserProblemStats = mongoose.model(
  'UserProblemStats',
  userProblemStatsSchema,
);

export { userProblemStatsSchema };