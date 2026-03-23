import express from 'express';
import { env } from '../config/env.js';
import { getHealth } from '../controllers/healthController.js';
import authRouter from './authRoutes.js';
import bookingRouter from './bookingRoutes.js';
import paymentRouter from './paymentRoutes.js';
import tourRouter from './tourRoutes.js';

/**
 * Gắn toàn bộ nhóm route vào Express app theo tiền tố API chung.
 */
export function registerRoutes(app) {
  const apiRouter = express.Router();

  apiRouter.get('/health', getHealth);
  apiRouter.use('/auth', authRouter);
  apiRouter.use('/tours', tourRouter);
  apiRouter.use('/bookings', bookingRouter);
  apiRouter.use('/payments', paymentRouter);

  app.use(env.apiPrefix, apiRouter);
}
