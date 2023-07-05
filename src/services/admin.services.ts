import { PipelineStage } from 'mongoose';
import ApiError from '../errorHandler/ApiError';
import { IInviteForRole } from '../interface/auth.interface';
import User from '../models/auth.mo';
import NewsReport from '../models/newsReport.mo';
import UserInfo from '../models/userInfo.mo';

const inviteForRole = async (data: IInviteForRole) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    const userInfo = await UserInfo.findOneAndUpdate(
      { userId: user._id },
      {
        $set: {
          invitation: true,
          role: data.role,
          category: data.category,
          sub_category: data.sub_category,
          approval: 'pending',
        },
      },
      { new: true }
    );
    return userInfo;
  } else {
    throw new ApiError(500, 'The email not registered yet');
  }
};

const getOverallStatics = async () => {
  const pipeline = [
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

const getHistory = async (page: number) => {
  console.log(page);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  // Query the collection with aggregation
  const pipeline: Array<PipelineStage> = [
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $project: {
        status: 1,
        createdAt: 1,
      },
    },
  ];
  const result = await NewsReport.aggregate(pipeline);

  const groupedData = result.reduce((acc, obj) => {
    const createdAt =
      obj.createdAt instanceof Date
        ? obj.createdAt.toISOString().split('T')[0]
        : String(obj.createdAt);
    if (!acc[createdAt]) {
      acc[createdAt] = []; // Create an array for the date if it doesn't exist
    }
    acc[createdAt].push(obj); // Push the object into the array for the corresponding date
    return acc;
  }, {});
  const data = [];
  for (const date in groupedData) {
    data.push(groupedData[date]);
  }

  return data;
};

export { inviteForRole, getOverallStatics, getHistory };
