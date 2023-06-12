import { NextFunction, Request, Response } from 'express';
import { adminValidator } from '../validator/admin.validator';
import ApiError from '../errorHandler/ApiError';

const { adminInvitationValidatorSchema } = adminValidator;

const inviteApiValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = await adminInvitationValidatorSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, 'message: error.message');
  }
  next();
};

export { inviteApiValidation };
