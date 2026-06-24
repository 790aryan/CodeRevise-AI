import { Router } from 'express';
import {
  createProblemController,
  deleteProblemController,
  getProblemController,
  listProblemsController,
  updateProblemController,
} from '../controllers/problem.controller.js';

export const problemRouter = Router();

problemRouter.post('/', createProblemController);
problemRouter.get('/', listProblemsController);
problemRouter.get('/:id', getProblemController);
problemRouter.patch('/:id', updateProblemController);
problemRouter.delete('/:id', deleteProblemController);
