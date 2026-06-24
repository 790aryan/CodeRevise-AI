import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { apiV1Router } from './routes/api.v1.routes.js';
import { requestLogger } from './middleware/requestLogger.middleware.js';
import { notFoundMiddleware } from './middleware/notFound.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json({ limit: '100kb' }));
app.use(requestLogger);

app.use('/api/v1', apiV1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
