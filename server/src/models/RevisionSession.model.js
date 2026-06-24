import mongoose from 'mongoose';
import {
  REVISION_LIMITS,
  REVISION_RESULTS,
  SESSION_TYPES,
} from '../constants/revision.js';

const { Schema } = mongoose;

const revisionSessionSchema = new Schema(
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
    revisionScheduleId: {
      type: Schema.Types.ObjectId,
      ref: 'RevisionSchedule',
      required: [true, 'Revision schedule ID is required.'],
    },
    sessionType: {
      type: String,
      required: [true, 'Revision session type is required.'],
      enum: {
        values: Object.values(SESSION_TYPES),
        message: 'Revision session type is not supported.',
      },
      default: SESSION_TYPES.SCHEDULED,
    },
    result: {
      type: String,
      required: [true, 'Revision result is required.'],
      enum: {
        values: Object.values(REVISION_RESULTS),
        message: 'Revision result is not supported.',
      },
    },
    durationMinutes: {
      type: Number,
      default: 0,
      min: [0, 'Revision duration cannot be negative.'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [
        REVISION_LIMITS.NOTE_MAX_LENGTH,
        `Notes must be at most ${REVISION_LIMITS.NOTE_MAX_LENGTH} characters.`,
      ],
    },
    feedback: {
      type: String,
      trim: true,
      maxlength: [
        REVISION_LIMITS.FEEDBACK_MAX_LENGTH,
        `Feedback must be at most ${REVISION_LIMITS.FEEDBACK_MAX_LENGTH} characters.`,
      ],
    },
    completedAt: {
      type: Date,
      required: [true, 'Revision completion date is required.'],
    },
  },
  {
    collection: 'revision_sessions',
    timestamps: true,
  },
);

// User timelines and future streak calculations need efficient completion-date queries.
revisionSessionSchema.index({ userId: 1, completedAt: -1 });

// Problem and schedule indexes support future revision histories and retention evidence.
revisionSessionSchema.index({ problemId: 1 });
revisionSessionSchema.index({ revisionScheduleId: 1 });

// Session type filtering keeps future manual, scheduled, and AI-recommended analysis cheap.
revisionSessionSchema.index({ sessionType: 1 });

export const RevisionSession = mongoose.model(
  'RevisionSession',
  revisionSessionSchema,
);
export { revisionSessionSchema };
