import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { apiV1Router } from './routes/api.v1.routes.js';
import { requestLogger } from './middleware/requestLogger.middleware.js';
import { notFoundMiddleware } from './middleware/notFound.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import revisionEngineRoutes from './routes/revisionEngine.route.js';
import cookieParser from 'cookie-parser';
export const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json({ limit: '100kb' }));
app.use(requestLogger);
app.use(
  '/api/v1/revision-engine',
  revisionEngineRoutes,
);
app.use('/api/v1', apiV1Router);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeRevise AI API is running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
  });
});
app.use(notFoundMiddleware);
app.use(errorMiddleware);
