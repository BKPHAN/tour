import { Router } from 'express';
import { createPayment, getPayment } from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const paymentRouter = Router();

paymentRouter.use(authenticate);
paymentRouter.get('/:bookingId', getPayment);
paymentRouter.post('/', createPayment);

export default paymentRouter;
