import mongoose from 'mongoose';
import { PROBLEM_LIMITS } from '../constants/problem.js';

const { Schema } = mongoose;

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Topic name is required.'],
      trim: true,
      maxlength: [
        PROBLEM_LIMITS.TOPIC_NAME_MAX_LENGTH,
        `Topic name must be at most ${PROBLEM_LIMITS.TOPIC_NAME_MAX_LENGTH} characters.`,
      ],
    },
    slug: {
      type: String,
      required: [true, 'Topic slug is required.'],
      trim: true,
      lowercase: true,
      maxlength: [
        PROBLEM_LIMITS.SLUG_MAX_LENGTH,
        `Topic slug must be at most ${PROBLEM_LIMITS.SLUG_MAX_LENGTH} characters.`,
      ],
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Topic slug must use lowercase letters, numbers, and hyphens.',
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [
        PROBLEM_LIMITS.TOPIC_DESCRIPTION_MAX_LENGTH,
        `Topic description must be at most ${PROBLEM_LIMITS.TOPIC_DESCRIPTION_MAX_LENGTH} characters.`,
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'topics',
    timestamps: true,
  },
);

// Slug is the stable machine-friendly topic identifier used by imports and future analytics.
topicSchema.index({ slug: 1 }, { unique: true });

// Name is unique to avoid duplicate concepts with different casing or spacing.
topicSchema.index({ name: 1 }, { unique: true });

export const Topic = mongoose.model('Topic', topicSchema);
export { topicSchema };
