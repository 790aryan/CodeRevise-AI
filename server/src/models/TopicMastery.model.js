import mongoose from 'mongoose';

const { Schema } = mongoose;

const topicMasterySchema = new Schema(
  {
    // ===============================================
    // Identity
    // ===============================================
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
    },

    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic is required.'],
    },

    // ===============================================
    // Difficulty-wise Mastery
    // ===============================================
    easyMastery: {
      type: Number,
      default: 0,
      min: [0, 'Easy mastery cannot be negative.'],
      max: [100, 'Easy mastery cannot exceed 100.'],
    },

    mediumMastery: {
      type: Number,
      default: 0,
      min: [0, 'Medium mastery cannot be negative.'],
      max: [100, 'Medium mastery cannot exceed 100.'],
    },

    hardMastery: {
      type: Number,
      default: 0,
      min: [0, 'Hard mastery cannot be negative.'],
      max: [100, 'Hard mastery cannot exceed 100.'],
    },

    overallMastery: {
      type: Number,
      default: 0,
      min: [0, 'Overall mastery cannot be negative.'],
      max: [100, 'Overall mastery cannot exceed 100.'],
    },

// ===============================================
// Statistics
// ===============================================

problemsAttempted: {
  type: Number,
  default: 0,
  min: [0, 'Problems attempted cannot be negative.'],
},

problemsMastered: {
  type: Number,
  default: 0,
  min: [0, 'Problems mastered cannot be negative.'],
},

difficultyStats: {
  easy: {
    attempted: {
      type: Number,
      default: 0,
      min: [0, 'Easy attempted count cannot be negative.'],
    },
    mastered: {
      type: Number,
      default: 0,
      min: [0, 'Easy mastered count cannot be negative.'],
    },
  },

  medium: {
    attempted: {
      type: Number,
      default: 0,
      min: [0, 'Medium attempted count cannot be negative.'],
    },
    mastered: {
      type: Number,
      default: 0,
      min: [0, 'Medium mastered count cannot be negative.'],
    },
  },

  hard: {
    attempted: {
      type: Number,
      default: 0,
      min: [0, 'Hard attempted count cannot be negative.'],
    },
    mastered: {
      type: Number,
      default: 0,
      min: [0, 'Hard mastered count cannot be negative.'],
    },
  },
},

    // ===============================================
    // Trend
    // Maintained as a maximum 5-item sliding window
    // by revisionEngine.service.js
    // ===============================================
    trend: {
      mastery: {
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

    // ===============================================
    // AI
    // ===============================================
    requiresAIIntervention: {
      type: Boolean,
      default: false,
    },

    // ===============================================
    // Version
    // ===============================================
    statsVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    collection: 'topic_mastery',
    timestamps: true,
    versionKey: false,
  }
);

// ===============================================
// Indexes
// ===============================================

// One document per user/topic
topicMasterySchema.index(
  {
    user: 1,
    topic: 1,
  },
  {
    unique: true,
  },
);

// Dashboard: weakest/strongest topics
topicMasterySchema.index({
  user: 1,
  overallMastery: 1,
});

// AI recommendations
topicMasterySchema.index({
  user: 1,
  requiresAIIntervention: 1,
});

export const TopicMastery = mongoose.model(
  'TopicMastery',
  topicMasterySchema,
);

export { topicMasterySchema };