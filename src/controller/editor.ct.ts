import { Response } from 'express';
import { AuthenticatedRequest } from '../interface/auth.interface';
import { editorServices } from '../services/editor.services';

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

export const editorController = {
  reviewReportsByEditor,
};
