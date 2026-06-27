import { Router } from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
  simulateRevision,
} from '../controllers/memorySimulator.controller.js';

const router = Router();

router.use(protect);

router.post(
  '/',
  simulateRevision,
);

export default router;