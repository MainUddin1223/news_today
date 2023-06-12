import { NextFunction, Request, Response } from 'express';
import { adminInvitationValidatorSchema } from '../validator/admin.validator';

const inviteApiValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = await adminInvitationValidatorSchema.validate(req.body);
  if (error) {
    next(error);
  }
  next();
};

export { inviteApiValidation };
