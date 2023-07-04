import { NextFunction, Response } from 'express';
import newsReportValidator from '../validator/newsReport.validator';
import { AuthenticatedRequest } from '../interface/auth.interface';
import { reporterService } from '../services/reporter.services';
import NewsReport from '../models/newsReport.mo';
import UserInfo from '../models/userInfo.mo';
import { IUserPaylod } from '../interface/newsReport.interface';
import catchAsync from '../errorHandler/catchAsync';
import mongoose from 'mongoose';

const { newsReportSchema } = newsReportValidator;

const invitation = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as IUserPaylod;
    const result = await UserInfo.findOneAndUpdate(
      { userId: user._id, invitation: true },
      { $set: { status: 'accepted', approval: 'approved', invitation: false } },
      { new: true }
    );
    res.status(200).send(result);
  }
);

const createReport = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { error } = newsReportSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const result = await reporterService.createReport({
      ...req.body,
      user: req.user,
    });
    res.status(200).send({ result });
    next();
  }
);
const updateReport = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { error } = newsReportSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const reportId = req.params.id as string;
    const result = await reporterService.updateReport({
      ...req.body,
      reportId,
      user: req.user,
    });
    res.status(200).send({ result });
    next();
  }
);

const getMyAllReports = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const reporterId = req.user?._id;
    const result = await NewsReport.find({ reporterId });
    res.status(200).send({ result });
    next();
  }
);

const getReportsCategory = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const category = 'sports';
    // const category = req.body.category
    const result = await NewsReport.find({ category });
    res.status(200).send(result);
    next();
  }
);

const getReportById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const reportId = req.params.id as string;

    const result = await NewsReport.findOne({ _id: reportId });
    res.status(200).send(result);
  }
);
const getStatics = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const reportId = req.user?._id as mongoose.Types.ObjectId;
    const result = await reporterService.getStatics(reportId);
    res.status(200).send(result);
  }
);
const getHistory = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const reportId = req.user?.id as mongoose.Types.ObjectId;
    const dateParam = req.query.date as string; // Assuming 'date' is the name of the parameter
    const dateObject = new Date(dateParam);

    const result = await reporterService.getHistory(reportId, dateObject);
    res.status(200).send(result);
  }
);

export const ReporterController = {
  createReport,
  getMyAllReports,
  getReportsCategory,
  updateReport,
  invitation,
  getReportById,
  getStatics,
  getHistory,
};
