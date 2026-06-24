import mongoose from 'mongoose';
import {
  MISTAKE_TYPES,
  PROBLEM_LIMITS,
  PROBLEM_STATUSES,
} from '../constants/problem.js';

const { Schema } = mongoose;

const problemAttemptSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required.'],
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: 'Problem',
      required: [true, 'Problem ID is required.'],
    },
    status: {
      type: String,
      required: [true, 'Problem attempt status is required.'],
      enum: {
        values: Object.values(PROBLEM_STATUSES),
        message: 'Problem attempt status is not supported.',
      },
      default: PROBLEM_STATUSES.NOT_STARTED,
    },
    attemptCount: {
      type: Number,
      default: 0,
      min: [0, 'Attempt count cannot be negative.'],
    },
    successfulAttemptCount: {
      type: Number,
      default: 0,
      min: [0, 'Successful attempt count cannot be negative.'],
    },
    timeSpentMinutes: {
      type: Number,
      default: 0,
      min: [0, 'Time spent cannot be negative.'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [
        PROBLEM_LIMITS.NOTES_MAX_LENGTH,
        `Notes must be at most ${PROBLEM_LIMITS.NOTES_MAX_LENGTH} characters.`,
      ],
    },
    mistakeType: {
      type: String,
      enum: {
        values: Object.values(MISTAKE_TYPES),
        message: 'Mistake type is not supported.',
      },
    },
    lastAttemptedAt: {
      type: Date,
    },
    lastSolvedAt: {
      type: Date,
    },
  },
  {
    collection: 'problem_attempts',
    timestamps: true,
  },
);

// One attempt aggregate per user/problem keeps progress tracking deterministic for future revision logic.
problemAttemptSchema.index({ userId: 1, problemId: 1 }, { unique: true });

// User-facing dashboards will filter attempts by status and recent activity.
problemAttemptSchema.index({ userId: 1, status: 1 });
problemAttemptSchema.index({ userId: 1, lastAttemptedAt: -1 });

// Problem lookups support future aggregate popularity and solve-history views.
problemAttemptSchema.index({ problemId: 1 });

export const ProblemAttempt = mongoose.model(
  'ProblemAttempt',
  problemAttemptSchema,
);
export { problemAttemptSchema };
