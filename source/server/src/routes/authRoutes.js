import { Router } from 'express';
import { getProfile, login, register } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', authenticate, getProfile);

export default authRouter;
