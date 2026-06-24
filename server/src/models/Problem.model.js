import mongoose from 'mongoose';
import {
  ALL_PROBLEM_DIFFICULTIES,
  PLATFORMS,
  PROBLEM_LIMITS,
} from '../constants/problem.js';

const { Schema } = mongoose;

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Problem title is required.'],
      trim: true,
      maxlength: [
        PROBLEM_LIMITS.TITLE_MAX_LENGTH,
        `Problem title must be at most ${PROBLEM_LIMITS.TITLE_MAX_LENGTH} characters.`,
      ],
    },
    slug: {
      type: String,
      required: [true, 'Problem slug is required.'],
      trim: true,
      lowercase: true,
      maxlength: [
        PROBLEM_LIMITS.SLUG_MAX_LENGTH,
        `Problem slug must be at most ${PROBLEM_LIMITS.SLUG_MAX_LENGTH} characters.`,
      ],
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Problem slug must use lowercase letters, numbers, and hyphens.',
      ],
    },
    platform: {
      type: String,
      required: [true, 'Problem platform is required.'],
      enum: {
        values: Object.values(PLATFORMS),
        message: 'Problem platform is not supported.',
      },
    },
    platformProblemId: {
      type: String,
      required: [true, 'Platform problem ID is required.'],
      trim: true,
      maxlength: [
        PROBLEM_LIMITS.PLATFORM_PROBLEM_ID_MAX_LENGTH,
        `Platform problem ID must be at most ${PROBLEM_LIMITS.PLATFORM_PROBLEM_ID_MAX_LENGTH} characters.`,
      ],
    },
    problemUrl: {
      type: String,
      required: [true, 'Problem URL is required.'],
      trim: true,
      maxlength: [
        PROBLEM_LIMITS.PROBLEM_URL_MAX_LENGTH,
        `Problem URL must be at most ${PROBLEM_LIMITS.PROBLEM_URL_MAX_LENGTH} characters.`,
      ],
      validate: {
        validator(value) {
          try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol);
          } catch {
            return false;
          }
        },
        message: 'Problem URL must be a valid HTTP or HTTPS URL.',
      },
    },
    difficulty: {
      type: String,
      required: [true, 'Problem difficulty is required.'],
      enum: {
        values: ALL_PROBLEM_DIFFICULTIES,
        message: 'Problem difficulty is not supported.',
      },
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
      },
    ],
    isPremium: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'problems',
    timestamps: true,
  },
);

// Slug supports stable problem URLs and human-readable lookups.
problemSchema.index({ slug: 1 });

// Platform identity prevents duplicate imported problems from LeetCode or Codeforces.
problemSchema.index(
  { platform: 1, platformProblemId: 1 },
  { unique: true },
);

// Difficulty and topic indexes support future filtering, roadmaps, and readiness scoring.
problemSchema.index({ difficulty: 1 });
problemSchema.index({ topics: 1 });

export const Problem = mongoose.model('Problem', problemSchema);
export { problemSchema };
