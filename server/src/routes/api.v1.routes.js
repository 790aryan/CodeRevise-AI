import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import dashboardRouter from './dashboard.routes.js';
import { healthRouter } from './health.routes.js';
import { problemAttemptRouter } from './problemAttempt.routes.js';
import { problemRouter } from './problem.routes.js';
import { revisionScheduleRouter } from './revisionSchedule.routes.js';
import { revisionSessionRouter } from './revisionSession.routes.js';
import { topicRouter } from './topic.routes.js';
import problemAnalyticsRoutes
from './problemAnalytics.routes.js';
import memorySessionRouter from './memorySession.routes.js';
import memorySimulatorRouter
from './memorySimulator.routes.js';
export const apiV1Router = Router();

apiV1Router.use('/auth', authRouter);
apiV1Router.use('/health', healthRouter);
apiV1Router.use('/topics', topicRouter);
apiV1Router.use('/problems', problemRouter);
apiV1Router.use('/problem-attempts', problemAttemptRouter);
apiV1Router.use('/revision-schedules', revisionScheduleRouter);
apiV1Router.use('/revision-sessions', revisionSessionRouter);
apiV1Router.use('/dashboard', dashboardRouter);
apiV1Router.use(
  '/problem-analytics',
  problemAnalyticsRoutes,
);
apiV1Router.use(
  '/memory-session',
  memorySessionRouter,
);
apiV1Router.use(
  '/memory-simulator',
  memorySimulatorRouter,
);