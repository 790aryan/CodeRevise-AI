import { Router } from 'express';
import {
  createTopicController,
  deleteTopicController,
  getTopicController,
  listTopicsController,
  updateTopicController,
} from '../controllers/topic.controller.js';

export const topicRouter = Router();

topicRouter.post('/', createTopicController);
topicRouter.get('/', listTopicsController);
topicRouter.get('/:id', getTopicController);
topicRouter.patch('/:id', updateTopicController);
topicRouter.delete('/:id', deleteTopicController);
