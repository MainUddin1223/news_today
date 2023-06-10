import { INewsReport, IUpdateReport } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';

const createReport = async (data: INewsReport) => {
  try {
    const { title, subtitle, photos, description, user } = data;
    const report = new NewsReport({
      title,
      subtitle,
      reporterId: user._id,
      photos,
      description,
      category: user.category,
      status: 'pending',
    });
    const result = await report.save();
    return result;
  } catch (error: unknown) {
    console.log(error);
    return error;
  }
};

const updateReport = async (data: IUpdateReport) => {
  const { title, subtitle, photos, description, reportId, user } = data;
  const result = await NewsReport.findOneAndUpdate(
    { _id: reportId, reporterId: user?._id, status: 'pending' || 'rejected' },
    { $set: { status: 'pending', title, subtitle, photos, description } },
    { new: true }
  );
  return result;
};

export const reporterService = { createReport, updateReport };
