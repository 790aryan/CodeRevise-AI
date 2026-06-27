import { Router } from 'express';
import {
  createProblemController,
  deleteProblemController,
  getProblemController,
  listProblemsController,
  updateProblemController,
  fetchProblemDetailsController,
  checkProblemExistsController,
} from '../controllers/problem.controller.js';

export const problemRouter = Router();

problemRouter.post('/', createProblemController);
problemRouter.post('/fetch-details', fetchProblemDetailsController);
problemRouter.get('/', listProblemsController);
problemRouter.get(
  '/exists',
  checkProblemExistsController
);
problemRouter.get('/:id', getProblemController);
problemRouter.patch('/:id', updateProblemController);
problemRouter.delete('/:id', deleteProblemController);
