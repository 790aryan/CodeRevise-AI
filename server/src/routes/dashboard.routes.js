import { Router } from 'express';
import { getSummary,getProgress,getRecentActivityController,getDifficultyBreakdownController, } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/summary', getSummary);
router.get('/progress', getProgress);
router.get('/recent-activity', getRecentActivityController);
router.get(
  '/difficulty-breakdown',
  getDifficultyBreakdownController,
);
export default router;