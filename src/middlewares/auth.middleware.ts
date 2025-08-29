import { Request, Response, NextFunction } from 'express';
import APIError from '../classes/APIError';
import errorHandler from '../utils/asyncErrorHandler';
import { decodeJwt } from '../utils/jwt';
import prisma from '../db/client';

const authenticate = errorHandler(async(req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return next(new APIError(401, 'Unauthorized, No token provided'));
  }

  const payload = decodeJwt(token, next);

  // fetch the user from the database
  const user = await prisma.user.findFirst({
    where: {
      id: payload?.sub,
    },
  });

  if (!user){
    return next(new APIError(401, 'Invalid JWT'))
  }

  req.user = user;
  next();
});

const getTokenFromRequest = (req: Request): string | null => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    [, token] = authHeader.split(' ');
  }
  // If the authorization header doesn't exist, try getting it from the cookies
  if (!token) {
    token = req.cookies.token;
  }
  return token;
};

export { authenticate };
