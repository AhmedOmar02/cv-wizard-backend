import { Router } from 'express';
import requestValidator from '../middlewares/requestVaildator';
import { notAllowedMethod } from '../middlewares/notAllowedHandler';
import { authenticate } from '../middlewares/auth.middleware';
import { updateUserSchema } from '../validators/validate.user';
import { updateAuthenticatedUser } from '../controllers/userController';

const userRouter = Router();

userRouter.route('/me')
  .patch(
    authenticate,
    requestValidator({ bodySchema: updateUserSchema }),
    updateAuthenticatedUser,
  )
  .all(notAllowedMethod);

export default userRouter;
