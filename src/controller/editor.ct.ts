import { Response } from 'express';
import { AuthenticatedRequest } from '../interface/auth.interface';
import { editorServices } from '../services/editor.services';
import NewsReport from '../models/newsReport.mo';

const reviewReportsByEditor = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const reoportId = req.params.id as string;
  try {
    const result = await editorServices.reviewReportService({
      ...req.body,
      reoportId,
      user: req.user,
    });
    if (!result) {
      res.status(400).send({ success: false, message: 'Something went wrong' });
    }
  } catch (error) {
    console.log(error);
  }
};
const getallReports = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const category = req.user;
    const result = await NewsReport.find({ category });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

export const editorController = {
  reviewReportsByEditor,
  getallReports,
};
