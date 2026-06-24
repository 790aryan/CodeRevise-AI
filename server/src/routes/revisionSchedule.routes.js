import { Router } from 'express';
import {
  createRevisionScheduleController,
  deleteRevisionScheduleController,
  getRevisionScheduleController,
  listRevisionSchedulesController,
  updateRevisionScheduleController,
} from '../controllers/revisionSchedule.controller.js';

export const revisionScheduleRouter = Router();

revisionScheduleRouter.post('/', createRevisionScheduleController);
revisionScheduleRouter.get('/', listRevisionSchedulesController);
revisionScheduleRouter.get('/:id', getRevisionScheduleController);
revisionScheduleRouter.patch('/:id', updateRevisionScheduleController);
revisionScheduleRouter.delete('/:id', deleteRevisionScheduleController);
