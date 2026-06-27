import { Router } from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
  processMemorySessionController,
} from '../controllers/memorySession.controller.js';

const router = Router();

router.use(protect);

/**
 * ======================================================
 * Memory Session (V9)
 * ======================================================
 *
 * Handles both:
 *
 * • Initial Learning
 * • Future Revisions
 *
 * The backend automatically determines whether this
 * is the user's first attempt.
 */

router.post(
  '/',
  processMemorySessionController,
);

export default router;