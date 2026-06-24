import { Router } from 'express';
import { APP } from '../constants/app.js';
import { config } from '../config/env.js';
import { getDatabaseStatus } from '../config/database.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  sendSuccess(response, {
    statusCode: HTTP_STATUS.OK,
    data: {
      service: APP.SERVICE_NAME,
      version: APP.API_VERSION,
      environment: config.nodeEnv,
      database: getDatabaseStatus(),
      uptime: process.uptime(),
    },
  });
});
