import NewsReport from '../models/newsReport.mo';

const getNewsByCategoryService = async (
  category: string,
  sub_category: string
) => {
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
export const publicServices = { getNewsByCategoryService };
