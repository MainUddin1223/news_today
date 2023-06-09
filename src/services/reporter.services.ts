import { INewsReport, IUpdateReport } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';

const createReport = async (data: INewsReport) => {
  try {
    const { title, subtitle, photos, description, category, status, user } =
      data;
    const report = new NewsReport({
      title,
      subtitle,
      reporterId: user.id,
      photos,
      description,
      category,
      status,
    });
    const result = await report.save();
    return result;
  } catch (error: unknown) {
    console.log(error);
    return error;
  }
};

const updateReport = async (data: IUpdateReport) => {
  const { title, subtitle, photos, description, reportId } = data;
  const result = await NewsReport.findOneAndUpdate(
    { reportId, status: 'pending' || 'rejected' },
    { $set: { status: 'pending', title, subtitle, photos, description } },
    { new: true }
  );
  return result;
};

export const reporterService = { createReport, updateReport };
