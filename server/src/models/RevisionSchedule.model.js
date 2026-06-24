import mongoose from 'mongoose';
import {
  REVISION_RESULTS,
  REVISION_STATUSES,
  SPACED_REPETITION_INTERVALS_DAYS,
} from '../constants/revision.js';

const { Schema } = mongoose;

const revisionScheduleSchema = new Schema(
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
      required: [true, 'Revision status is required.'],
      enum: {
        values: Object.values(REVISION_STATUSES),
        message: 'Revision status is not supported.',
      },
      default: REVISION_STATUSES.SCHEDULED,
    },
    currentIntervalDays: {
      type: Number,
      default: SPACED_REPETITION_INTERVALS_DAYS[0],
      min: [0, 'Current interval cannot be negative.'],
    },
    nextRevisionAt: {
      type: Date,
      required: [true, 'Next revision date is required.'],
    },
    lastRevisionAt: {
      type: Date,
    },
    revisionCount: {
      type: Number,
      default: 0,
      min: [0, 'Revision count cannot be negative.'],
    },
    successfulRevisionCount: {
      type: Number,
      default: 0,
      min: [0, 'Successful revision count cannot be negative.'],
    },
    lastRevisionResult: {
      type: String,
      enum: {
        values: Object.values(REVISION_RESULTS),
        message: 'Last revision result is not supported.',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'revision_schedules',
    timestamps: true,
  },
);

// One active schedule record per user/problem keeps future spaced-repetition state deterministic.
revisionScheduleSchema.index({ userId: 1, problemId: 1 }, { unique: true });

// Due-list queries will be scoped by user and ordered by next revision date.
revisionScheduleSchema.index({ userId: 1, nextRevisionAt: 1 });

// Status filtering supports future revision queue views without scanning all schedules.
revisionScheduleSchema.index({ userId: 1, status: 1 });

// Problem-level lookups support future history and aggregate revision insights.
revisionScheduleSchema.index({ problemId: 1 });

export const RevisionSchedule = mongoose.model(
  'RevisionSchedule',
  revisionScheduleSchema,
);
export { revisionScheduleSchema };
