import mongoose from 'mongoose';

import { Problem } from '../models/Problem.model.js';
import { RevisionSession } from '../models/RevisionSession.model.js';
import { UserProblemStats } from '../models/UserProblemStats.model.js';
import { TopicMastery } from '../models/TopicMastery.model.js';
import { calculateSpeedScore } from './memory/scoring/speedScore.service.js';
import {
  calculateMemoryScore,
} from './memory/scoring/memoryScore.service.js';

import {
  calculateLearningVelocity,
} from './memory/scoring/learningVelocity.service.js';

import {
  calculateMasteryScore,
} from './memory/scoring/masteryScore.service.js';

import {
  calculateRevisionRecommendation,
} from './memory/scoring/revisionRecommendation.service.js';
import { calculateMemoryStrength } from './memory/state/memoryStrength.service.js';
import { calculateRevisionInterval } from './memory/simulation/scheduler.service.js';
import {
  REVISION_LIMITS,
  MASTERY_THRESHOLDS,
} from '../constants/scoring.constants.js';

import {
  addDays,
} from '../utils/date.utils.js';
import { calculatePredictedForgetDate } from './memory/simulation/forgetPrediction.service.js';
import { createMemoryState } from './memory/state/memoryState.service.js';
import { calculateRetrievalQuality } from './memory/scoring/retrievalQuality.service.js';

import { calculateLearningGain } from './memory/scoring/learningGain.service.js';

import { updateMemoryState } from './memory/engine/memoryUpdate.service.js';
import {calculateRetrievability} from './memory/simulation/memoryDecay.service.js'
import { simulateRetention } from './memory/simulation/retentionSimulator.service.js';
import { getMemoryAnalytics } from './memory/analytics/memoryAnalytics.service.js';

/**
 * ==========================================================
 * Load Context
 * ==========================================================
 *
 * Fetches all data required by the revision engine before
 * any calculations begin.
 */
const loadRevisionContext = async ({
  userId,
  problemId,
}) => {
  const problem = await Problem.findById(problemId).lean();

  if (!problem) {
    throw new Error('Problem not found.');
  }

  if (!problem.difficulty) {
    throw new Error(
      'Problem difficulty is required.',
    );
  }

  const stats =
    await UserProblemStats.findOne({
      user: userId,
      problem: problemId,
    }).lean();

  return {
    problem,
    stats,
    isFirstAttempt: !stats,
  };
};

/**
 * ==========================================================
 * Detect Cooldown
 * ==========================================================
 *
 * Prevents users from inflating mastery by repeatedly
 * revising the same problem within the cooldown window.
 */
const detectCooldown = async ({
  userId,
  problemId,
}) => {
  const lastSession =
    await RevisionSession.findOne({
      user: userId,
      problem: problemId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

  if (!lastSession) {
    return {
      isCooldown: false,
      lastSession: null,
    };
  }

  const elapsedHours =
    (
      Date.now() -
      new Date(lastSession.createdAt).getTime()
    ) /
    (1000 * 60 * 60);

  return {
    isCooldown:
      elapsedHours <
      REVISION_LIMITS.COOLDOWN_HOURS,
    lastSession,
  };
};

/**
 * ==========================================================
 * Calculate Revision Scores
 * ==========================================================
 *
 * Executes the complete scoring pipeline.
 *
 * No database writes occur here.
 */
const calculateRevisionScores = ({
  problem,
  stats,
  currentAttempt,
  updatedMemoryState,
}) => {
  const isSuccess =
    currentAttempt.result === 'solved' ||
    currentAttempt.result === 'mastered';

  const currentSuccessStreak =
    isSuccess
      ? (stats?.currentSuccessStreak ?? 0) + 1
      : 0;

  const successfulAttempts =
    (stats?.successfulAttempts ?? 0) +
    (isSuccess ? 1 : 0);

  const memoryScore =
    calculateMemoryScore({
      ...currentAttempt,
      currentSuccessStreak,
      difficulty: problem.difficulty,
    });

  const learningVelocity =
    calculateLearningVelocity({
      current: currentAttempt,
      previous: stats?.lastReview ?? null,
      difficulty: problem.difficulty,
    });

  const masteryScore =
    calculateMasteryScore({
      memoryScore,
      learningVelocity,
      currentSuccessStreak,
      successfulAttempts,
    });

    const memoryStrength =
  calculateMemoryStrength({
    memoryScore,
    masteryScore,
    successfulAttempts,
    currentSuccessStreak,
  });

const {
  requiresAIIntervention,
} = calculateRevisionRecommendation({
   memoryState:
        updatedMemoryState,
});

const recommendedRevisionInterval =
  calculateRevisionInterval({
    memoryStrength,
  });

  return {
    isSuccess,

    currentSuccessStreak,

    successfulAttempts,

    memoryScore,
    memoryStrength,
    learningVelocity,

    masteryScore,

    recommendedRevisionInterval,

    requiresAIIntervention,
  };
};

/**
 * ==========================================================
 * Save Revision Session
 * ==========================================================
 *
 * Persists a revision attempt.
 *
 * If the revision falls within the cooldown period,
 * the previous RevisionSession is updated instead of
 * creating a new one.
 */
const saveRevisionSession = async ({
  session,
  cooldown,

  userId,
  problemId,

  attemptNumber,

  currentAttempt,

  attemptType,

  notes = '',
}) => {
  if (cooldown.isCooldown) {
    const revisionSession =
      await RevisionSession.findByIdAndUpdate(
        cooldown.lastSession._id,
        {
          $set: {
            result: currentAttempt.result,
            confidence: currentAttempt.confidence,
            timeTaken: currentAttempt.timeTaken,
            hintLevel: currentAttempt.hintLevel,
            attemptType,
            notes,
            isCooldownMerge: true,
          },
        },
        {
          new: true,
          session,
        },
      );

    return {
      merged: true,
      revisionSession,
    };
  }

  const [revisionSession] =
    await RevisionSession.create(
      [
        {
          user: userId,
          problem: problemId,

          sessionNumber: attemptNumber,

          result: currentAttempt.result,
          confidence: currentAttempt.confidence,
          timeTaken: currentAttempt.timeTaken,
          hintLevel: currentAttempt.hintLevel,

          attemptType,
          notes,
        },
      ],
      {
        session,
      },
    );

  return {
    merged: false,
    revisionSession,
  };
};

/**
 * ==========================================================
 * Update User Problem Statistics
 * ==========================================================
 *
 * Maintains the live intelligence document for a problem.
 */
const updateUserProblemStats = async ({
  session,
  userId,
  problemId,
   problem,
  stats,

  scores,

  currentAttempt,
   attemptType,
   updatedMemoryState,

}) => {
  const now = new Date();

  const attempts =
    (stats?.attempts ?? 0) + 1;

  const failedAttempts =
    (stats?.failedAttempts ?? 0) +
    (scores.isSuccess ? 0 : 1);

  const totalTimeSpent =
    (stats?.totalTimeSpent ?? 0) +
    currentAttempt.timeTaken;

  const averageTime =
    totalTimeSpent / attempts;

  const averageConfidence =
    (
      (
        (stats?.averageConfidence ?? 0) *
          (attempts - 1)
      ) +
      currentAttempt.confidence
    ) / attempts;

    const highestConfidence =
  stats?.highestConfidence == null
    ? currentAttempt.confidence
    : Math.max(
        stats.highestConfidence,
        currentAttempt.confidence,
      );

const lowestConfidence =
  stats?.lowestConfidence == null
    ? currentAttempt.confidence
    : Math.min(
        stats.lowestConfidence,
        currentAttempt.confidence,
      );

  const fastestTime =
    stats?.fastestTime == null
      ? currentAttempt.timeTaken
      : Math.min(
          stats.fastestTime,
          currentAttempt.timeTaken,
        );

  const slowestTime =
    stats?.slowestTime == null
      ? currentAttempt.timeTaken
      : Math.max(
          stats.slowestTime,
          currentAttempt.timeTaken,
        );
const speedScore = calculateSpeedScore({
  difficulty: problem.difficulty,
  timeTaken: currentAttempt.timeTaken,
});
  const bestSuccessStreak =
    Math.max(
      stats?.bestSuccessStreak ?? 0,
      scores.currentSuccessStreak,
    );

  const nextRevisionDate =
    addDays(
      now,
      scores.recommendedRevisionInterval,
    );
    const predictedForgetDate =
  calculatePredictedForgetDate({
    nextRevisionDate,
    memoryScore: scores.memoryScore,
  });
  return UserProblemStats.findOneAndUpdate(
    {
      user: userId,
      problem: problemId,
    },
    {
      $set: {
        attempts,

        successfulAttempts:
          scores.successfulAttempts,

        failedAttempts,

        totalTimeSpent,

        averageTime,

        averageConfidence,
        
        highestConfidence,

        lowestConfidence,

        fastestTime,

        slowestTime,

        currentSuccessStreak:
          scores.currentSuccessStreak,

        bestSuccessStreak,

        memoryScore:
          scores.memoryScore,

        memoryStrength:
          updatedMemoryState.strength,

        stability:
          updatedMemoryState.stability,

        masteryScore:
          scores.masteryScore,

        learningVelocity:
          scores.learningVelocity,

        recommendedRevisionInterval:
          scores.recommendedRevisionInterval,

        nextRevisionDate,
        predictedForgetDate,
        requiresAIIntervention:
          scores.requiresAIIntervention,

        lastReview: {
          ...currentAttempt,
          attemptType,
        },

        lastReviewedAt: now,

        lastResult:
          currentAttempt.result,
        lastAttemptType: attemptType,
      },

      $push: {
        'trend.confidence': {
          $each: [
            currentAttempt.confidence,
          ],
          $slice: -5,
        },

        'trend.memoryScore': {
          $each: [
            scores.memoryScore,
          ],
          $slice: -5,
        },

        'trend.masteryScore': {
          $each: [
            scores.masteryScore,
          ],
          $slice: -5,
        },
        'trend.speedScore': {
          $each: [speedScore],
          $slice: -5,
        },
      },
    },
    {
      new: true,
      upsert: true,
      session,
    },
  );
};


/**
 * ==========================================================
 * Update Topic Mastery
 * ==========================================================
 *
 * Updates mastery intelligence for every topic associated
 * with the revised problem.
 */
const updateTopicMastery = async ({
  session,
  userId,
  problem,

  stats,
  isFirstAttempt,

  scores,
}) => {
  if (!problem.topics?.length) {
    return;
  }

  const now = new Date();

  const difficulty =
    problem.difficulty.toLowerCase();

  const masteredForFirstTime =
    scores.masteryScore >=
      MASTERY_THRESHOLDS.MASTERED &&
    (!stats ||
      (stats.masteryScore ?? 0) <
        MASTERY_THRESHOLDS.MASTERED);

  await Promise.all(
    problem.topics.map(async (topicId) => {
      let topicStats =
        await TopicMastery.findOne({
          user: userId,
          topic: topicId,
        }).session(session);

      /**
       * ------------------------------------------
       * First Topic Record
       * ------------------------------------------
       */
      if (!topicStats) {
        topicStats =
          new TopicMastery({
            user: userId,
            topic: topicId,
          });
      }

      /**
       * ------------------------------------------
       * Attempts
       * ------------------------------------------
       */
      if (isFirstAttempt) {
        topicStats.problemsAttempted++;

        topicStats.difficultyStats[
          difficulty
        ].attempted++;
      }

      /**
       * ------------------------------------------
       * Mastered
       * ------------------------------------------
       */
      if (masteredForFirstTime) {
        topicStats.problemsMastered++;

        topicStats.difficultyStats[
          difficulty
        ].mastered++;
      }

      /**
       * ------------------------------------------
       * Difficulty Mastery
       * ------------------------------------------
       */
      topicStats[
        `${difficulty}Mastery`
      ] = scores.masteryScore;

      /**
       * ------------------------------------------
       * Weighted Overall Mastery
       * ------------------------------------------
       */

      const easyWeight =
        topicStats.difficultyStats.easy
          .attempted;

      const mediumWeight =
        topicStats.difficultyStats.medium
          .attempted;

      const hardWeight =
        topicStats.difficultyStats.hard
          .attempted;

      const totalWeight =
        easyWeight +
        mediumWeight +
        hardWeight;

      if (totalWeight > 0) {
        topicStats.overallMastery =
          (
            topicStats.easyMastery *
              easyWeight +
            topicStats.mediumMastery *
              mediumWeight +
            topicStats.hardMastery *
              hardWeight
          ) / totalWeight;
      }
      /**
 * ------------------------------------------
 * Mastery Trend
 * ------------------------------------------
 */
topicStats.trend.mastery.push(
  scores.masteryScore,
);

// Keep only the latest 5 values
if (topicStats.trend.mastery.length > 5) {
  topicStats.trend.mastery.shift();
}
      topicStats.lastReviewedAt =
        now;

      await topicStats.save({
        session,
      });
    }),
  );
};

/**
 * ==========================================================
 * Process Revision
 * ==========================================================
 *
 * Main entry point for the Adaptive Revision Engine.
 *
 * Responsibilities:
 * - Load context
 * - Detect cooldown
 * - Calculate intelligence scores
 * - Persist all changes inside one MongoDB transaction
 */
export const processRevision = async ({
  simulate = false,
  userId,
  problemId,
  confidence,
  timeTaken,
  hintLevel,
  result,
  attemptType,
  notes = '',
}) => {
  /**
   * ----------------------------------------------------------
   * Load Context
   * ----------------------------------------------------------
   */
  const context = await loadRevisionContext({
    userId,
    problemId,
  });

  const {
    problem,
    stats,
    isFirstAttempt,
  } = context;

  const memoryState =
  createMemoryState({
    stats,
  });

  memoryState.retrievability =
  calculateRetrievability({
    memoryState,
  });

   /**
   * ----------------------------------------------------------
   * Current Attempt
   * ----------------------------------------------------------
   */
  const currentAttempt = {
    confidence,
    timeTaken,
    hintLevel,
    result,
  };
const speedScore =
  calculateSpeedScore({
    difficulty: problem.difficulty,
    timeTaken,
  });
 const retrievalQuality =
  calculateRetrievalQuality({
    confidence,

    speedScore,

    hintLevel,

    result,
  });

  const spacingMultiplier = 1;


const learningGain =
  calculateLearningGain({
    retrievalQuality,

    retrievability:
      memoryState.retrievability,
  });
console.log('=== BEFORE updateMemoryState ===');
console.log({
  memoryState,
  learningGain,
  retrievalQuality,
  retrievability: memoryState.retrievability,
});

const updatedMemoryState =
  updateMemoryState({
    memoryState,

    learningGain,

    retrievalQuality,

    retrievability:
      memoryState.retrievability,

    result,

    difficulty:
      problem.difficulty,
  });
const retentionSimulation =
  simulateRetention({
    memoryState:
      updatedMemoryState,
  });
console.log({
  previousMemoryState: memoryState,

  updatedMemoryState,

  retrievalQuality,

  learningGain,

  retentionSimulation,
});

  /**
   * ----------------------------------------------------------
   * Detect Cooldown
   * ----------------------------------------------------------
   */
  const cooldown = await detectCooldown({
    userId,
    problemId,
  });


//   const cooldown = {
//   isCooldown: false,
//   lastSession: null,
// };

 

  /**
   * ----------------------------------------------------------
   * Calculate Scores
   * ----------------------------------------------------------
   */
  const scores =
    calculateRevisionScores({
      problem,
      stats,
      currentAttempt,
      updatedMemoryState,
    });

    scores.recommendedRevisionInterval = calculateRevisionInterval({
    simulatedReviewDay: retentionSimulation.reviewDay
  });
  
  /**
   * ----------------------------------------------------------
   * MongoDB Transaction
   * ----------------------------------------------------------
   */
let session = null;

if (!simulate) {
  session =
    await mongoose.startSession();
}

  try {
  /**
   * ===========================================
   * AI Simulation Mode
   * ===========================================
   */
  if (simulate) {
    return {
      success: true,

      simulated: true,

      message:
        'Revision simulated successfully.',

      memoryState:
        updatedMemoryState,

      analytics: getMemoryAnalytics({
        memoryState:
          updatedMemoryState,
      }),

      scores,

      retentionSimulation,
    };
  }

  const resultData =
    await session.withTransaction(
      async () => {
        /**
         * Save Revision Session
         */
        const revisionResult =
          await saveRevisionSession({
            session,

            cooldown,

            userId,
            problemId,

            attemptNumber:
              (stats?.attempts ?? 0) + 1,

            currentAttempt,

            attemptType,

            notes,
          });

        /**
         * Anti-Cramming
         */
        if (revisionResult.merged) {
          return {
            merged: true,

            message:
              'Revision completed. This attempt was merged into the previous revision because it occurred within the cooldown period.',

            revisionSession:
              revisionResult.revisionSession,
          };
        }

        /**
         * Update Stats
         */
        const updatedStats =
          await updateUserProblemStats({
            session,

            userId,

            problemId,

            problem,

            stats,

            scores,

            currentAttempt,

            attemptType,

            updatedMemoryState,
          });

        /**
         * Update Topic Mastery
         */
        await updateTopicMastery({
          session,

          userId,

          problem,

          stats,

          isFirstAttempt,

          scores,
        });

        return {
          merged: false,

          message:
            'Revision processed successfully.',

          stats: updatedStats,
        };
      },
    );

  return {
    success: true,

    ...(resultData ?? {}),
  };
} catch (error) {
  throw error;
} finally {
  if (session) {
    await session.endSession();
  }
}}