import { IReviewNews } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';

const reviewReportService = async (data: IReviewNews) => {
  const { reportId, status, feedback, user } = data;
  console.log(reportId);
  const result = await NewsReport.findOneAndUpdate(
    { _id: reportId },
    { $set: { status, feedback, reviewerId: user._id } },
    { new: true }
  );
  return result;
};

export const editorServices = { reviewReportService };
