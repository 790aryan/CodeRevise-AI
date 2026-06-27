import mongoose from 'mongoose';
import {
  ATTEMPT_TYPES,
  CONFIDENCE_LIMITS,
  HINT_LEVELS,
  REVISION_RESULTS,
} from '../constants/revision.constants.js';

const { Schema } = mongoose;

const revisionSessionSchema = new Schema(
  {
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

sessionNumber: {
  type: Number,
  required: [true, 'Session number is required.'],
  min: [1, 'Session number must be at least 1.'],
},

result: {
  type: String,
  required: [true, 'Revision result is required.'],
  enum: {
    values: Object.values(REVISION_RESULTS),
    message: 'Invalid revision result.',
  },
},

confidence: {
  type: Number,
  required: [true, 'Confidence is required.'],
  min: [
    CONFIDENCE_LIMITS.MIN,
    `Confidence cannot be less than ${CONFIDENCE_LIMITS.MIN}.`,
  ],
  max: [
    CONFIDENCE_LIMITS.MAX,
    `Confidence cannot exceed ${CONFIDENCE_LIMITS.MAX}.`,
  ],
},
timeTaken: {
  type: Number,
  required: [true, 'Time taken is required.'],
  min: [0, 'Time taken cannot be negative.'],
},

hintLevel: {
  type: String,
  required: [true, 'Hint level is required.'],
  enum: {
    values: Object.values(HINT_LEVELS),
    message: 'Invalid hint level.',
  },
  default: HINT_LEVELS.NONE,
},

attemptType: {
  type: String,
  required: [true, 'Attempt type is required.'],
  enum: {
    values: Object.values(ATTEMPT_TYPES),
    message: 'Invalid attempt type.',
  },
  default: ATTEMPT_TYPES.REVISION,
},

    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters.'],
      default: '',
    },

    isCooldownMerge: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'revision_sessions',
    timestamps: true,
    versionKey: false,
  },
);

// ===============================================
// Indexes
// ===============================================

// User's revision timeline
revisionSessionSchema.index({ user: 1, createdAt: -1 });

// Problem history
revisionSessionSchema.index({ problem: 1, createdAt: -1 });

// User's history for a specific problem
revisionSessionSchema.index({ user: 1, problem: 1, createdAt: -1 });

// Analytics
revisionSessionSchema.index({ attemptType: 1 });
revisionSessionSchema.index({ result: 1 });

export const RevisionSession = mongoose.model(
  'RevisionSession',
  revisionSessionSchema,
);

export { revisionSessionSchema };