import { Router } from 'express';
import {
  login,
  logout,
  me,
  refresh,
  register,
} from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);
authRouter.get('/me', me);