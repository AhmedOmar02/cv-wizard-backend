import { Router } from 'express';
import requestValidator from '../middlewares/requestVaildator';
import { registerSchema } from '../validators/validate.auth';
import { notAllowedMethod } from '../middlewares/notAllowedHandler';
import { register } from '../controllers/authController';

const authRouter = Router();

authRouter.route('/register')
  .post(
    requestValidator({ bodySchema: registerSchema }),
    register,
  )
  .all(notAllowedMethod);

export default authRouter;
