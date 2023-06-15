import mongoose from 'mongoose';
import { IUserPaylod } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';
import {
  IReportPayload,
  ISubEditormatchCondition,
} from '../interface/subEditor.interface';
import { IReviewNews } from '../interface/newsReport.interface';

const ObjectId = mongoose.Types.ObjectId;

const getReports = async (data: IUserPaylod) => {
  const { category, sub_category } = data;
  const result = await NewsReport.aggregate([
    {
      $match: {
        category: category,
        sub_category: { $in: sub_category },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  return result;
};

const getReportById = async (data: IReportPayload) => {
  const { id, category, sub_category } = data;
  const matchCondition: ISubEditormatchCondition = {
    _id: new ObjectId(id),
    category,
  };

  if (sub_category && sub_category.length > 0) {
    matchCondition.sub_category = { $in: sub_category };
  }
  const result = await NewsReport.aggregate([
    {
      $match: matchCondition,
    },
  ]);
  return result;
};

const reviewReport = async (data: IReviewNews) => {
  const { reportId, status, feedback, user } = data;
  const { category, sub_category } = user;
  const matchCondition: ISubEditormatchCondition = {
    _id: new ObjectId(reportId),
    category,
  };

  if (sub_category && sub_category.length > 0) {
    matchCondition.sub_category = { $in: sub_category };
  }
  const result = await NewsReport.findOneAndUpdate(
    { ...matchCondition },
    {
      $set: {
        status,
        feedback,
        reviewerId: user._id,
      },
    }
  );
  return result;
};

export const subEditorService = { getReports, getReportById, reviewReport };
