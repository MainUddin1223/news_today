import { SortOrder } from 'mongoose';
import { INewsReport } from '../interface/newsReport.interface';
import NewsReport from '../models/newsReport.mo';
import {
  IGenericResponse,
  IPaginationOptions,
  filterType,
  paginationHelpers,
} from '../utilis/paigination';

const newsSearchField = ['title', 'description'];

const getNewsByCategoryService = async (
  category: string,
  sub_category: string
) => {
  console.log('------------------');
  const pipeline =
    sub_category == 'all'
      ? [
          {
            $match: {
              category,
            },
          },
          {
            $group: {
              _id: '$category',
              sub_categories: { $addToSet: '$sub_category' },
              news: {
                $push: {
                  _id: '$_id',
                  title: '$title',
                  subtitle: '$subtitle',
                  photos: '$photos',
                  description: '$description',
                  category: '$category',
                  sub_category: '$sub_category',
                  newsType: '$newsType',
                  publisedDate: '$publisedDate',
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              sub_categories: 1,
              news: 1,
            },
          },
        ]
      : [
          {
            $match: {
              sub_category,
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              subtitle: 1,
              photos: 1,
              description: 1,
              category: 1,
              sub_category: 1,
              newsType: 1,
              publishedDate: 1,
            },
          },
        ];
  const result = await NewsReport.aggregate([
    ...pipeline,
    {
      $sort: {
        publishedDate: -1,
      },
    },
  ]);
  return result;
};
const getAllNews = async (
  paignationOptions: IPaginationOptions,
  filter: filterType
): Promise<IGenericResponse<INewsReport[]>> => {
  const { searchTerm, ...filtersData } = filter;
  console.log(searchTerm);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: newsSearchField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
        status: 'approved',
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaignation(paignationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition =
    andCondition.length > 0 ? { $and: andCondition } : { status: 'approved' };
  const result = await NewsReport.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await NewsReport.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const publicServices = { getNewsByCategoryService, getAllNews };
