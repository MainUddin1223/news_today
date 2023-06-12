import ApiError from '../errorHandler/ApiError';
import { INewsReport, IUpdateReport } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';

const createReport = async (data: INewsReport) => {
  const { title, subtitle, photos, description, sub_category, user } = data;
  if (
    user?.sub_category?.length &&
    !user.sub_category?.includes(sub_category)
  ) {
    throw new ApiError(500, 'You can not post in this category');
  }
  const report = new NewsReport({
    title,
    subtitle,
    reporterId: user._id,
    photos,
    description,
    category: user.category,
    sub_category: user.sub_category,
    status: 'pending',
  });
  const result = await report.save();
  if (result) {
    return result;
  } else {
    throw new ApiError(500, 'Something went wrong');
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
