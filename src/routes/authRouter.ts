import { Router } from 'express';
import requestValidator from '../middlewares/requestVaildator';
import { registerSchema, loginSchema } from '../validators/validate.auth';
import { notAllowedMethod } from '../middlewares/notAllowedHandler';
import { login, register } from '../controllers/authController';

const authRouter = Router();

authRouter.route('/register')
  .post(
    requestValidator({ bodySchema: registerSchema }),
    register,
  )
  .all(notAllowedMethod);

authRouter.route('/login')
  .post(
    requestValidator({ bodySchema: loginSchema }),
    login,
  );

export default authRouter;
