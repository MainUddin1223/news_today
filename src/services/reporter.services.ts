import mongoose from 'mongoose';
import ApiError from '../errorHandler/ApiError';
import { INewsReport, IUpdateReport } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';

const ObjectId = mongoose.Types.ObjectId;

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
    sub_category: sub_category,
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
const getStatics = async (id: mongoose.Types.ObjectId) => {
  const pipeline = [
    {
      $match: {
        reporterId: new ObjectId(id),
      },
    },
    {
      $group: {
        _id: null,
        totalCount: { $sum: 1 },
        pendingCount: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
        },
        rejectedCount: {
          $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] },
        },
        approvedCount: {
          $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalCount: 1,
        counts: {
          pending: '$pendingCount',
          rejected: '$rejectedCount',
          approved: '$approvedCount',
        },
      },
    },
  ];
  const result = await NewsReport.aggregate(pipeline);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayMatch = {
    $match: {
      createdAt: { $gte: today },
    },
  };
  const todayStatics = await NewsReport.aggregate([todayMatch, ...pipeline]);
  return { totalStatics: result[0], todayStatics: todayStatics[0] || {} };
};
const getHistory = async (id: mongoose.Types.ObjectId, date: Date) => {
  const result = await NewsReport.aggregate([
    {
      $match: {
        reporterId: new ObjectId(id),
        date,
      },
    },
  ]);
  return result;
};

export const reporterService = {
  createReport,
  updateReport,
  getStatics,
  getHistory,
};
