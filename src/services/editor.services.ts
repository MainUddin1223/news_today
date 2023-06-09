import mongoose from 'mongoose';
import { IReviewNews } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';

const reviewReportService = async (data: IReviewNews) => {
  const { reportId, status, feedback, user } = data;
  const objectIdReportId = new mongoose.Types.ObjectId(reportId);
  const result = await NewsReport.findOneAndUpdate(
    { _id: objectIdReportId, category: user.category },
    { $set: { status, feedback, reviewerId: user.id } },
    { new: true }
  );
  return result;
};

export const editorServices = { reviewReportService };
