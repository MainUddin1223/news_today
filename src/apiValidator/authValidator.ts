import { NextFunction, Request, Response } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validator/auth.validator';

const registerUserApiValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = await registerUserSchema.validate(req.body);
  if (error) {
    next(error);
  }
  next();
};
const loginApiValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = await loginUserSchema.validate(req.body);
  if (error) {
    next(error);
  }
  next();
};

export { registerUserApiValidator, loginApiValidator };
