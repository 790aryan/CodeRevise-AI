import { Router } from 'express';
import {
  createProblemAttemptController,
  deleteProblemAttemptController,
  getProblemAttemptController,
  listProblemAttemptsController,
  updateProblemAttemptController,
} from '../controllers/problemAttempt.controller.js';

export const problemAttemptRouter = Router();

problemAttemptRouter.post('/', createProblemAttemptController);
problemAttemptRouter.get('/', listProblemAttemptsController);
problemAttemptRouter.get('/:id', getProblemAttemptController);
problemAttemptRouter.patch('/:id', updateProblemAttemptController);
problemAttemptRouter.delete('/:id', deleteProblemAttemptController);
