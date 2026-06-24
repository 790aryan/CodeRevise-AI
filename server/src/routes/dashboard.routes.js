import { Router } from 'express';
import { getSummary,getProgress, } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/summary', getSummary);
router.get('/progress', getProgress);

export default router;