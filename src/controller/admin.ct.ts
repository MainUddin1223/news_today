import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../interface/auth.interface';
import NewsReport from '../models/newsReport.mo';
import { inviteForRole } from '../services/admin.services';
import UserInfo from '../models/userInfo.mo';
import catchAsync from '../errorHandler/catchAsync';

const inviteEmployeeForRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await inviteForRole(data);
    res.status(200).send(result);
    next();
  }
);
// const approveEmplyeeForRole = async (req: Request, res: Response) => {
//   const id = req.query.id as string;
//   try {
//     const result = await approveForRole(id);
//     res.status(200).send(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

const getStuffByRole = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { role, limit = 50, page = 1 } = req.query;
    const limitValue = parseInt(limit.toString());
    const pageValue = parseInt(page.toString());
    const result = await UserInfo.aggregate([
      {
        $match: {
          role: role,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] },
        },
      },
      {
        $project: {
          userId: 0,
          'user.id': 0,
          'user.password': 0,
        },
      },
      {
        $skip: (pageValue - 1) * limitValue,
      },
      {
        $limit: limitValue,
      },
    ]);
    res.status(200).send(result);
    next();
  }
);

const getReportsByStatus = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { status } = req.query;
    const result = await NewsReport.aggregate([
      {
        $match: {
          status,
        },
      },
      {
        $sort: {
          publishedDate: -1,
        },
      },
    ]);
    res.status(200).send(result);
    next();
  }
);

export const andminRoutes = {
  getStuffByRole,
  getReportsByStatus,
  inviteEmployeeForRole,
};
