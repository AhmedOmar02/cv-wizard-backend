import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import APIError from '../classes/APIError';
import prisma from '../db/client';
import { SUCCESS } from '../constants/responseConstants';
import { Role } from '@prisma/client'

const { REGULAR } = Role;

export const register = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const { email,
    password,
    firstName,
    lastName,
    phoneNumber,
    city,
    country,
    linkedinUrl,
  } = req.body;

  // Check for existing email
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return next(new APIError(400, `Email ${email} is already registered`));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

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
      role: REGULAR,
      isVerified: true,
    },
  });

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      iss: process.env.JWT_ISS,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' },
  );

  res.cookie('token', token, {
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    status: SUCCESS,
    message: 'User Registered successfully',
  });
});

export const login = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const { id, email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ id }, { email }],
    },
  });

  if (!user) {
    return next(new APIError(401, 'Invalid id/email or password'));
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return next(new APIError(401, 'Invalid id/email or password'));
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      iss: process.env.JWT_ISS,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' },
  );

  res.cookie('token', token, {
    path: '/',
    httpOnly: true, // keep true for security
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({
    status: SUCCESS,
    message: 'Successfully logged in.',
    token,
  });
});
