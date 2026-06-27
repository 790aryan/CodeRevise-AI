import {
  getDashboardSummary,
  getDashboardProgress,
  getRecentActivity,
  getDifficultyBreakdown,
  getWeakTopics,
  getPlatformDistribution,
  getCurrentStreak,
  getAccuracy,
} from '../services/dashboard.service.js';

import { getRevisionQueue } from '../services/memory/analytics/revisionQueue.service.js';

export async function getSummary(req, res, next) {
  try {
    const summary =
      await getDashboardSummary();

    res.json(summary);
  } catch (error) {
    next(error);
  }
}

export async function getProgress(req, res, next) {
  try {
    const progress =
      await getDashboardProgress();

    res.json(progress);
  } catch (error) {
    next(error);
  }
}

export async function getActivity(req, res, next) {
  try {
    const activity =
      await getRecentActivity();

    res.json(activity);
  } catch (error) {
    next(error);
  }
}

export async function getDifficulty(req, res, next) {
  try {
    const difficulty =
      await getDifficultyBreakdown();

    res.json(difficulty);
  } catch (error) {
    next(error);
  }
}

export async function getWeakTopicsController(
  req,
  res,
  next,
) {
  try {
    const topics =
      await getWeakTopics();

    res.json(topics);
  } catch (error) {
    next(error);
  }
}

export async function getPlatformController(
  req,
  res,
  next,
) {
  try {
    const platforms =
      await getPlatformDistribution();

    res.json(platforms);
  } catch (error) {
    next(error);
  }
}

export async function getStreak(
  req,
  res,
  next,
) {
  try {
    const streak =
      await getCurrentStreak();

    res.json({
      streak,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAccuracyController(
  req,
  res,
  next,
) {
  try {
    const accuracy =
      await getAccuracy();

    res.json({
      accuracy,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * =====================================================
 * Revision Queue
 * =====================================================
 */

export async function getRevisionQueueController(
  req,
  res,
  next,
) {
  try {
    const queue =
      await getRevisionQueue();

    res.json(queue);
  } catch (error) {
    next(error);
  }
}