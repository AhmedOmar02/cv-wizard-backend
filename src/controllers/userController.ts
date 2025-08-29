import { Request, Response, NextFunction } from 'express';
import prisma from '../db/client';
import { SUCCESS } from '../constants/responseConstants';
import errorHandler from '../utils/asyncErrorHandler';

const updateAuthenticatedUser = errorHandler(async(req: Request, res: Response, next: NextFunction) => {

  const updatedUser = await prisma.user.update({
    omit: {
      passwordHash: true,
    },
    where: {
      id: req.user.id,
    },
    data: req.body,
  });

  res.status(200).json({
    status: SUCCESS,
    message: 'User has been updated successfully',
    user: updatedUser,
  });

});

export {
  updateAuthenticatedUser,
}
