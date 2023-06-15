import { Response } from 'express';
import catchAsync from '../errorHandler/catchAsync';
import { AuthenticatedRequest } from '../interface/auth.interface';
import { subEditorService } from '../services/subEditor.services';
import { IUserPaylod } from '../interface/newsReport.interface';
import { IReportPayload } from '../interface/subEditor.interface';

const getReports = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const result = await subEditorService.getReports(req.user as IUserPaylod);
    res.status(200).send(result);
  }
);
const getReportById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const result = await subEditorService.getReportById({
      ...req.user,
      id,
    } as IReportPayload);
    res.status(200).send(result);
  }
);

const reviewReportsBySubEditor = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const reportId = req.params.id as string;
    const result = await subEditorService.reviewReport({
      ...req.body,
      reportId,
      user: req.user,
    });
    if (!result) {
      res.status(400).send({ success: false, message: 'Something went wrong' });
    }
    res.status(200).send(result);
  }
);

export const subEditorController = {
  getReports,
  getReportById,
  reviewReportsBySubEditor,
};
