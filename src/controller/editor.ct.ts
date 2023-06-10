import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../interface/auth.interface';
import { editorServices } from '../services/editor.services';
import NewsReport from '../models/newsReport.mo';
import catchAsync from '../errorHandler/catchAsync';

const reviewReportsByEditor = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const reportId = req.params.id as string;
    const result = await editorServices.reviewReportService({
      ...req.body,
      reportId,
      user: req.user,
    });
    if (!result) {
      res.status(400).send({ success: false, message: 'Something went wrong' });
    }
    res.status(200).send(result);
    next();
  }
);
const getallReports = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const result = await NewsReport.find({ category: user?.category });
    res.status(200).send(result);
    next();
  }
);

export const editorController = {
  reviewReportsByEditor,
  getallReports,
};
