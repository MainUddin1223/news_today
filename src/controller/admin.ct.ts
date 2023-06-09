import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../interface/auth.interface';
import NewsReport from '../models/newsReport.mo';
import {
  getHistory,
  getOverallStatics,
  inviteForRole,
} from '../services/admin.services';
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

const getReporters = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { limit = 50, page = 1 } = req.query;
    const limitValue = parseInt(limit.toString());
    const pageValue = parseInt(page.toString());
    const result = await UserInfo.aggregate([
      {
        $match: {
          role: 'reporter',
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
const getEditors = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { limit = 50, page = 1 } = req.query;
    const limitValue = parseInt(limit.toString());
    const pageValue = parseInt(page.toString());
    const result = await UserInfo.aggregate([
      {
        $match: {
          role: { $in: ['editor', 'sub-editor'] },
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
  async (req: AuthenticatedRequest, res: Response) => {
    // const { status } = req.query;
    const result = await NewsReport.aggregate([
      // {
      //   $match: {
      //     status,
      //   },
      // },
      {
        $sort: {
          publishedDate: -1,
        },
      },
    ]);
    res.status(200).send(result);
  }
);

const overallStatics = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const result = await getOverallStatics();
    res.status(200).send(result);
  }
);

const getoneWeekHistory = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { page = 1 } = req.params;

    const result = await getHistory(Number(page));
    res.status(200).send(result);
  }
);

export const andminRoutes = {
  getReporters,
  getReportsByStatus,
  inviteEmployeeForRole,
  overallStatics,
  getoneWeekHistory,
  getEditors,
};
