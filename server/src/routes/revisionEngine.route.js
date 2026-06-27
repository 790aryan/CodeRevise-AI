import { Router } from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { processRevisionController } from '../controllers/revisionEngine.controller.js';

const router = Router();

/**
 * POST /api/v1/revision-engine/:problemId
 */
router.post(
  '/:problemId',
  protect,
  processRevisionController,
);

export default router;