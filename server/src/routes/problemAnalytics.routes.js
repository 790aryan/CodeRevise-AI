import { Router } from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
  getProblemAnalyticsController,
} from '../controllers/problemAnalytics.controller.js';


const router = Router();

router.use(protect);

router.get(
  '/:problemId',
  getProblemAnalyticsController,
);

export default router;