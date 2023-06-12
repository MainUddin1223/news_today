import { NextFunction, Request, Response } from 'express';
import userService from '../services/auth.services';
import User from '../models/auth.mo';
import { AuthenticatedRequest } from '../interface/auth.interface';
import catchAsync from '../errorHandler/catchAsync';

const { userRegisterService, loginUserService } = userService;
const registerUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already exists with this email.',
      });
    }
    const result = await userRegisterService(req.body);
    res.status(200).send({ result });
    next();
  }
);

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginUserService(req.body);
    res.status(result.status).send(result);
    next();
  } catch (error) {
    next(error);
  }
};

const afterLoginAuth = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const email = req.user?.email || '';
    const existingUser = await User.aggregate([
      {
        $match: {
          email,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: 'user-infos',
          localField: '_id',
          foreignField: 'userId',
          as: 'userinfo',
        },
      },
      {
        $addFields: {
          userinfo: { $arrayElemAt: ['$userinfo', 0] },
        },
      },
      {
        $project: {
          email: 1,
          name: 1,
          userinfo: {
            role: 1,
          },
        },
      },
    ]);

    res.status(200).send(existingUser[0]);
    next();
  }
);

export const authApi = { registerUser, loginUser, afterLoginAuth };
