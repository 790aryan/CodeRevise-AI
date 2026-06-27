import { Router } from 'express';
import {
  login,
  logout,
  me,
  refresh,
  register,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

export const authRouter = Router();
authRouter.get(
  '/me',
  protect,
  me,
);
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);
authRouter.get('/me', me);