import { Router } from 'express';
import {
  createRevisionSessionController,
  deleteRevisionSessionController,
  getRevisionSessionController,
  listRevisionSessionsController,
  updateRevisionSessionController,
} from '../controllers/revisionSession.controller.js';

export const revisionSessionRouter = Router();

revisionSessionRouter.post('/', createRevisionSessionController);
revisionSessionRouter.get('/', listRevisionSessionsController);
revisionSessionRouter.get('/:id', getRevisionSessionController);
revisionSessionRouter.patch('/:id', updateRevisionSessionController);
revisionSessionRouter.delete('/:id', deleteRevisionSessionController);
