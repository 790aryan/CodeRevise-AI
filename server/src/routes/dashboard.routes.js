import { Router } from 'express';

import {
  getSummary,
  getProgress,
  getActivity,
  getDifficulty,
  getWeakTopicsController,
  getPlatformController,
  getStreak,
  getAccuracyController,
  getRevisionQueueController,
} from '../controllers/dashboard.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

/**
 * =====================================================
 * Dashboard
 * =====================================================
 */

router.get('/summary', getSummary);

router.get('/progress', getProgress);

router.get('/activity', getActivity);

router.get('/difficulty', getDifficulty);

router.get('/weak-topics', getWeakTopicsController);

router.get('/platforms', getPlatformController);

router.get('/streak', getStreak);

router.get('/accuracy', getAccuracyController);

/**
 * =====================================================
 * Revision Queue (V8)
 * =====================================================
 */

router.get(
  '/revision-queue',
  getRevisionQueueController,
);

export default router;