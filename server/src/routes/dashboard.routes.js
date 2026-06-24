import { Router } from 'express';
import { getSummary,getProgress,getRecentActivityController, } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/summary', getSummary);
router.get('/progress', getProgress);
router.get('/recent-activity', getRecentActivityController);
export default router;