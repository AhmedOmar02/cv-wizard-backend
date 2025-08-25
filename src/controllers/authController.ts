import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { catchAsync } from '../utils/catchAsync';
import APIError from '../classes/APIError';
import prisma from '../db/client';
import { SUCCESS } from '../constants/responseConstants';


export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName, phoneNumber, city, country, linkedinUrl, role } = req.body;

  // Check for existing email
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return next(new APIError(400, `Email ${email} is already registered`));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //const confirmationCode = crypto.randomBytes(8).toString('hex');

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      city,
      country,
      linkedinUrl,
      role,
      isVerified: true,
    },
  });

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      iss: process.env.JWT_ISS,
      partial: true,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  });

  res.status(201).json({
    status: SUCCESS,
    message: `Registered successfully, a verification link has been sent to ${email}`,
  });
});
